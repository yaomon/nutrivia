// Question set importer.
//
// Parses the common ways quiz questions get shared — CSV/TSV, Aiken (Moodle
// plain text), GIFT (Moodle), and JSON — into the game's question shape, then
// stores them as custom sets that behave exactly like the built-in ones.
//
// Custom questions get numbers from CUSTOM_BASE up, in per-set blocks, so they
// can never collide with the bundled banks (which top out in the 2000s).
const QuestionImport = (() => {
    "use strict";

    const STORE_KEY = "nutrivia_custom_sets";
    const CUSTOM_BASE = 90000;
    const SET_STRIDE = 2000; // room per imported set
    const MAX_OPTIONS = 4; // the board shows at most four choices
    const LETTERS = ["a", "b", "c", "d"];

    /* ================= parsing helpers ================= */

    // split rows on a delimiter, honouring "quoted, fields" and ""escapes""
    function splitDelimited(text, delim) {
        const rows = [];
        let row = [];
        let field = "";
        let quoted = false;
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            if (quoted) {
                if (c === '"') {
                    if (text[i + 1] === '"') {
                        field += '"';
                        i++;
                    } else quoted = false;
                } else field += c;
            } else if (c === '"') {
                quoted = true;
            } else if (c === delim) {
                row.push(field);
                field = "";
            } else if (c === "\n") {
                row.push(field);
                rows.push(row);
                row = [];
                field = "";
            } else if (c !== "\r") {
                field += c;
            }
        }
        if (field !== "" || row.length) {
            row.push(field);
            rows.push(row);
        }
        return rows.filter((r) => r.some((f) => f.trim() !== ""));
    }

    // Build a question from loose parts. Returns null if it can't be trusted.
    // `answer` may be a letter (B), a 1-based index, or the correct option text.
    function buildQuestion(questionText, options, answer) {
        const text = String(questionText || "").trim();
        let opts = (options || [])
            .map((o) => String(o == null ? "" : o).trim())
            .filter((o) => o !== "");
        if (!text || opts.length < 2) return null;

        // resolve which option is correct
        let idx = -1;
        const raw = String(answer == null ? "" : answer).trim();
        if (raw !== "") {
            const letter = raw.toLowerCase().replace(/[^a-z0-9]/g, "");
            if (/^[a-z]$/.test(letter)) {
                idx = letter.charCodeAt(0) - 97;
            } else if (/^\d+$/.test(letter)) {
                idx = parseInt(letter, 10) - 1; // 1-based in every format we take
            }
            if (idx < 0 || idx >= opts.length) {
                // fall back to matching the answer's text
                const hit = opts.findIndex(
                    (o) => o.toLowerCase() === raw.toLowerCase()
                );
                idx = hit;
            }
        }
        if (idx < 0 || idx >= opts.length) return null;

        // keep at most four options, always including the correct one
        if (opts.length > MAX_OPTIONS) {
            const correct = opts[idx];
            const others = opts.filter((_, i) => i !== idx).slice(0, MAX_OPTIONS - 1);
            opts = [correct].concat(others);
            idx = 0;
        }

        return {
            question: text,
            answers: opts.map((o, i) => ({ option: LETTERS[i], text: o })),
            correct_answer: LETTERS[idx],
        };
    }

    /* ================= format parsers ================= */
    // Each returns { questions: [...], skipped: n }

    function parseDelimited(text) {
        const firstLine = text.split(/\r?\n/, 1)[0] || "";
        const delim =
            (firstLine.match(/\t/g) || []).length >
            (firstLine.match(/,/g) || []).length
                ? "\t"
                : ",";
        const rows = splitDelimited(text, delim);
        if (!rows.length) return { questions: [], skipped: 0 };

        // header detection + column mapping
        let head = rows[0].map((h) => h.trim().toLowerCase());
        let body = rows;
        let qCol = 0;
        let aCol = -1;
        let optCols = null;

        const looksLikeHeader = head.some((h) =>
            /^(question|prompt|q)$/.test(h)
        );
        if (looksLikeHeader) {
            body = rows.slice(1);
            qCol = head.findIndex((h) => /^(question|prompt|q)$/.test(h));
            aCol = head.findIndex((h) =>
                /^(answer|correct|correct answer|key)$/.test(h)
            );
            optCols = [];
            head.forEach((h, i) => {
                if (i === qCol || i === aCol) return;
                if (/^(option ?[a-d1-4]|choice ?[a-d1-4]|[a-d]|[1-4])$/.test(h))
                    optCols.push(i);
            });
            if (!optCols.length) {
                // any remaining columns are options
                optCols = head
                    .map((_, i) => i)
                    .filter((i) => i !== qCol && i !== aCol);
            }
        }

        const questions = [];
        let skipped = 0;
        body.forEach((row) => {
            let q;
            if (looksLikeHeader) {
                q = buildQuestion(
                    row[qCol],
                    optCols.map((i) => row[i]),
                    aCol >= 0 ? row[aCol] : ""
                );
            } else {
                // assume: question, options..., answer(last)
                q = buildQuestion(
                    row[0],
                    row.slice(1, row.length - 1),
                    row[row.length - 1]
                );
            }
            if (q) questions.push(q);
            else skipped++;
        });
        return { questions, skipped };
    }

    // Aiken: question line, then "A. option" lines, then "ANSWER: B"
    function parseAiken(text) {
        const lines = text.split(/\r?\n/);
        const questions = [];
        let skipped = 0;
        let qText = [];
        let opts = [];
        let answer = "";

        function flush() {
            if (!qText.length && !opts.length) return;
            const q = buildQuestion(qText.join(" "), opts, answer);
            if (q) questions.push(q);
            else if (qText.length) skipped++;
            qText = [];
            opts = [];
            answer = "";
        }

        lines.forEach((line) => {
            const t = line.trim();
            if (!t) return;
            const ans = t.match(/^ANSWER\s*[:.]?\s*([A-Za-z])/i);
            if (ans) {
                answer = ans[1];
                flush();
                return;
            }
            const opt = t.match(/^([A-Za-z])[.)]\s+(.*)$/);
            if (opt && opts.length < 26) {
                opts.push(opt[2]);
                return;
            }
            if (opts.length) flush(); // a new question started without ANSWER
            qText.push(t);
        });
        flush();
        return { questions, skipped };
    }

    // GIFT: optional ::Title:: then text { =correct ~wrong ~wrong }
    function parseGIFT(text) {
        const questions = [];
        let skipped = 0;
        // strip // comments, then split on the closing brace of each block
        const clean = text.replace(/^\s*\/\/.*$/gm, "");
        const blocks = clean.match(/[^{}]*\{[^{}]*\}/g) || [];
        blocks.forEach((block) => {
            const open = block.indexOf("{");
            let stem = block.slice(0, open);
            const body = block.slice(open + 1, block.lastIndexOf("}"));
            stem = stem
                .replace(/::[^:]*::/g, "") // drop ::Title::
                .replace(/\[[a-z]+\]/gi, "") // drop [html] markers
                .replace(/\s+/g, " ")
                .trim();
            const opts = [];
            let correctIdx = -1;
            // each option starts with = (correct) or ~ (wrong)
            const parts = body.match(/[=~][^=~]*/g) || [];
            parts.forEach((p) => {
                const isCorrect = p[0] === "=";
                let val = p
                    .slice(1)
                    .replace(/#.*$/s, "") // strip feedback
                    .replace(/%[-\d.]+%/g, "") // strip weights
                    .replace(/\s+/g, " ")
                    .trim();
                if (!val) return;
                if (isCorrect && correctIdx < 0) correctIdx = opts.length;
                opts.push(val);
            });
            const q = buildQuestion(stem, opts, correctIdx + 1);
            if (q) questions.push(q);
            else if (stem) skipped++;
        });
        return { questions, skipped };
    }

    function parseJSONText(text) {
        let data = JSON.parse(text);
        if (!Array.isArray(data)) {
            // tolerate { questions: [...] } wrappers
            data = data.questions || data.items || data.data || [];
        }
        const questions = [];
        let skipped = 0;
        data.forEach((row) => {
            if (!row || typeof row !== "object") {
                skipped++;
                return;
            }
            const stem = row.question || row.prompt || row.q || row.text || "";
            let opts = row.options || row.choices || row.answers || row.a || [];
            let answer =
                row.correct_answer != null
                    ? row.correct_answer
                    : row.answer != null
                    ? row.answer
                    : row.correct != null
                    ? row.correct
                    : row.key;

            // the game's own shape: answers:[{option,text}], correct_answer:"c"
            if (Array.isArray(opts) && opts.length && typeof opts[0] === "object") {
                const letters = opts.map((o) => String(o.option || "").toLowerCase());
                const texts = opts.map((o) => o.text != null ? o.text : o.value);
                const byLetter = letters.indexOf(
                    String(answer || "").toLowerCase()
                );
                opts = texts;
                if (byLetter >= 0) answer = byLetter + 1;
            }
            const q = buildQuestion(stem, opts, answer);
            if (q) questions.push(q);
            else skipped++;
        });
        return { questions, skipped };
    }

    /* ================= detection + public parse ================= */

    function detectFormat(text) {
        const t = text.trim();
        if (!t) return null;
        if (t[0] === "[" || t[0] === "{") {
            // could be JSON or a GIFT block starting with {
            try {
                JSON.parse(t);
                return "json";
            } catch (e) {
                /* fall through */
            }
        }
        if (/^ANSWER\s*[:.]/im.test(t)) return "aiken";
        if (/\{[^{}]*[=~][^{}]*\}/.test(t)) return "gift";
        if (/[,\t]/.test(t.split(/\r?\n/, 1)[0] || "")) return "csv";
        return null;
    }

    const FORMAT_NAMES = {
        json: "JSON",
        csv: "CSV/TSV",
        aiken: "Aiken",
        gift: "GIFT",
    };

    // -> { ok, format, formatName, questions, skipped, error }
    function parse(text) {
        const format = detectFormat(text || "");
        if (!format)
            return {
                ok: false,
                error: "Couldn't recognise that format. Try CSV, Aiken, GIFT or JSON.",
            };
        try {
            const out =
                format === "json"
                    ? parseJSONText(text)
                    : format === "aiken"
                    ? parseAiken(text)
                    : format === "gift"
                    ? parseGIFT(text)
                    : parseDelimited(text);
            if (!out.questions.length)
                return {
                    ok: false,
                    format,
                    formatName: FORMAT_NAMES[format],
                    error:
                        "Read it as " +
                        FORMAT_NAMES[format] +
                        " but found no complete questions (each needs 2+ answers and a marked correct one).",
                };
            return {
                ok: true,
                format,
                formatName: FORMAT_NAMES[format],
                questions: out.questions,
                skipped: out.skipped,
            };
        } catch (e) {
            return { ok: false, error: "Couldn't parse that: " + e.message };
        }
    }

    /* ================= storage + registration ================= */

    function listSets() {
        try {
            return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function persist(sets) {
        localStorage.setItem(STORE_KEY, JSON.stringify(sets));
    }

    // make a stored set visible to the engine + the menu.
    // Defensive: this runs at page load over user-persisted data, so a
    // malformed entry must never take the whole game down with it.
    function register(set) {
        if (!set || !Array.isArray(set.questions) || typeof set.base !== "number")
            return false;
        set.questions = set.questions.filter(
            (q) =>
                q &&
                q.question &&
                Array.isArray(q.answers) &&
                q.answers.length >= 2 &&
                q.correct_answer
        );
        if (!set.questions.length) return false;
        set.questions.forEach((q, i) => {
            QUESTION_BANK.push({
                number: String(set.base + i),
                question: q.question,
                answers: q.answers,
                correct_answer: q.correct_answer,
            });
        });
        const lo = set.base;
        const hi = set.base + set.questions.length;
        QUESTION_SETS.push({
            id: set.id,
            icon: set.icon || "📥",
            name: set.name,
            // renderSets appends the question count itself
            desc: "imported",
            custom: true,
            match: (n) => n >= lo && n < hi,
        });
        return true;
    }

    function addSet(name, questions, icon) {
        const sets = listSets();
        const base = sets.reduce(
            (max, s) => Math.max(max, s.base + SET_STRIDE),
            CUSTOM_BASE
        );
        const set = {
            id: "custom_" + Date.now().toString(36),
            name: (name || "").trim() || "My Questions",
            icon: icon || "📥",
            base: base,
            created: Date.now(),
            questions: questions.slice(0, SET_STRIDE),
        };
        sets.push(set);
        persist(sets);
        register(set);
        return set;
    }

    function removeSet(id) {
        const sets = listSets().filter((s) => s.id !== id);
        persist(sets);
        // drop it from the live registries too
        const idx = QUESTION_SETS.findIndex((s) => s.id === id);
        if (idx >= 0) {
            const gone = QUESTION_SETS[idx];
            QUESTION_SETS.splice(idx, 1);
            for (let i = QUESTION_BANK.length - 1; i >= 0; i--) {
                if (gone.match(+QUESTION_BANK[i].number))
                    QUESTION_BANK.splice(i, 1);
            }
        }
    }

    // load everything saved previously — runs before game.js indexes the bank
    try {
        listSets().forEach(register);
    } catch (e) {
        console.warn("Custom question sets failed to load", e);
    }

    return {
        parse,
        listSets,
        addSet,
        removeSet,
        FORMAT_NAMES,
    };
})();
