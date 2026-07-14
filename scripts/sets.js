// Question set registry. Sets are slices of the question bank the player
// can mix into the pool before a run. To add a set (e.g. a new domain),
// add an entry — the pick-your-menu screen and engine find it automatically.
//
//   id:    stable key stored in the save file
//   match: (questionNumber) => bool, which bank questions belong to it
const QUESTION_SETS = [
    {
        id: "d1_first_course",
        icon: "🥗",
        name: "First Course",
        desc: "Domain 1 · 1–92",
        match: (n) => n >= 1 && n <= 92,
    },
    {
        id: "d1_second_helping",
        icon: "🍲",
        name: "Second Helping",
        desc: "Domain 1 · 93–184",
        match: (n) => n >= 93 && n <= 184,
    },
    {
        id: "d1_third_plate",
        icon: "🍖",
        name: "Third Plate",
        desc: "Domain 1 · 185–276",
        match: (n) => n >= 185 && n <= 276,
    },
    {
        id: "d1_dessert_cart",
        icon: "🍰",
        name: "Dessert Cart",
        desc: "Domain 1 · 277–366",
        match: (n) => n >= 277 && n <= 366,
    },
    {
        id: "jp_n5",
        icon: "🍣",
        name: "Japanese N5",
        desc: "JLPT N5 · vocab, kanji & grammar",
        match: (n) => n >= 1001 && n <= 1199,
    },
    {
        id: "jp_n4",
        icon: "🍱",
        name: "Japanese N4",
        desc: "JLPT N4 · kanji, vocab & grammar",
        match: (n) => n >= 1201 && n <= 1399,
    },
    {
        id: "dietetics",
        icon: "🩺",
        name: "Dietetics",
        desc: "RD exam · nutrition science & MNT",
        match: (n) => n >= 2001 && n <= 2999,
    },
];

// how many bank questions a set contains
function setQuestionCount(set) {
    return QUESTION_BANK.filter((q) => set.match(+q.number)).length;
}
