// Combined question bank. Load new question files (domain1.js,
// japanese_n5.js, ...) before this script, concat them here, and give
// each file its own number range — sets.js and the engine only ever
// read from QUESTION_BANK.
const QUESTION_BANK = domain1_questions.concat(
    n5_questions,
    n4_questions,
    dietetics_questions
);
