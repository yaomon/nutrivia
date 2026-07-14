// JLPT N5 question bank — vocabulary, kanji readings, particles, grammar,
// numbers/time, and set phrases. Numbers 1001+ so they never collide with
// the Domain 1 bank. Same shape as domain1.js questions.
const n5_questions = [
    // ---------- vocabulary: meaning ----------
    { number: "1001", question: "What does 「みず」 mean?", answers: [
        { option: "a", text: "fire" }, { option: "b", text: "water" },
        { option: "c", text: "tea" }, { option: "d", text: "milk" },
    ], correct_answer: "b" },
    { number: "1002", question: "What does 「ねこ」 mean?", answers: [
        { option: "a", text: "dog" }, { option: "b", text: "bird" },
        { option: "c", text: "cat" }, { option: "d", text: "horse" },
    ], correct_answer: "c" },
    { number: "1003", question: "What does 「いぬ」 mean?", answers: [
        { option: "a", text: "dog" }, { option: "b", text: "cat" },
        { option: "c", text: "fish" }, { option: "d", text: "cow" },
    ], correct_answer: "a" },
    { number: "1004", question: "What does 「ほん」 mean?", answers: [
        { option: "a", text: "pen" }, { option: "b", text: "desk" },
        { option: "c", text: "book" }, { option: "d", text: "bag" },
    ], correct_answer: "c" },
    { number: "1005", question: "What does 「くるま」 mean?", answers: [
        { option: "a", text: "bicycle" }, { option: "b", text: "train" },
        { option: "c", text: "bus" }, { option: "d", text: "car" },
    ], correct_answer: "d" },
    { number: "1006", question: "What does 「がっこう」 mean?", answers: [
        { option: "a", text: "hospital" }, { option: "b", text: "school" },
        { option: "c", text: "station" }, { option: "d", text: "shop" },
    ], correct_answer: "b" },
    { number: "1007", question: "What does 「せんせい」 mean?", answers: [
        { option: "a", text: "student" }, { option: "b", text: "doctor" },
        { option: "c", text: "teacher" }, { option: "d", text: "friend" },
    ], correct_answer: "c" },
    { number: "1008", question: "What does 「ともだち」 mean?", answers: [
        { option: "a", text: "family" }, { option: "b", text: "friend" },
        { option: "c", text: "neighbor" }, { option: "d", text: "teacher" },
    ], correct_answer: "b" },
    { number: "1009", question: "What does 「あさ」 mean?", answers: [
        { option: "a", text: "night" }, { option: "b", text: "noon" },
        { option: "c", text: "morning" }, { option: "d", text: "evening" },
    ], correct_answer: "c" },
    { number: "1010", question: "What does 「よる」 mean?", answers: [
        { option: "a", text: "morning" }, { option: "b", text: "night" },
        { option: "c", text: "afternoon" }, { option: "d", text: "spring" },
    ], correct_answer: "b" },
    { number: "1011", question: "What does 「たべもの」 mean?", answers: [
        { option: "a", text: "drinks" }, { option: "b", text: "food" },
        { option: "c", text: "clothes" }, { option: "d", text: "shoes" },
    ], correct_answer: "b" },
    { number: "1012", question: "What does 「のみもの」 mean?", answers: [
        { option: "a", text: "beverage" }, { option: "b", text: "food" },
        { option: "c", text: "dessert" }, { option: "d", text: "fruit" },
    ], correct_answer: "a" },
    { number: "1013", question: "What does 「でんわ」 mean?", answers: [
        { option: "a", text: "television" }, { option: "b", text: "radio" },
        { option: "c", text: "computer" }, { option: "d", text: "telephone" },
    ], correct_answer: "d" },
    { number: "1014", question: "What does 「とけい」 mean?", answers: [
        { option: "a", text: "clock" }, { option: "b", text: "calendar" },
        { option: "c", text: "mirror" }, { option: "d", text: "lamp" },
    ], correct_answer: "a" },
    { number: "1015", question: "What does 「かばん」 mean?", answers: [
        { option: "a", text: "hat" }, { option: "b", text: "shoe" },
        { option: "c", text: "bag" }, { option: "d", text: "coat" },
    ], correct_answer: "c" },
    { number: "1016", question: "What does 「めがね」 mean?", answers: [
        { option: "a", text: "glasses" }, { option: "b", text: "earrings" },
        { option: "c", text: "gloves" }, { option: "d", text: "watch" },
    ], correct_answer: "a" },
    { number: "1017", question: "What does 「きっぷ」 mean?", answers: [
        { option: "a", text: "wallet" }, { option: "b", text: "ticket" },
        { option: "c", text: "stamp" }, { option: "d", text: "coin" },
    ], correct_answer: "b" },
    { number: "1018", question: "What does 「えき」 mean?", answers: [
        { option: "a", text: "airport" }, { option: "b", text: "bus stop" },
        { option: "c", text: "harbor" }, { option: "d", text: "train station" },
    ], correct_answer: "d" },
    { number: "1019", question: "What does 「びょういん」 mean?", answers: [
        { option: "a", text: "hospital" }, { option: "b", text: "hair salon" },
        { option: "c", text: "hotel" }, { option: "d", text: "library" },
    ], correct_answer: "a" },
    { number: "1020", question: "What does 「ぎんこう」 mean?", answers: [
        { option: "a", text: "post office" }, { option: "b", text: "bank" },
        { option: "c", text: "city hall" }, { option: "d", text: "police station" },
    ], correct_answer: "b" },
    { number: "1021", question: "What does 「ゆうびんきょく」 mean?", answers: [
        { option: "a", text: "bank" }, { option: "b", text: "school" },
        { option: "c", text: "post office" }, { option: "d", text: "bookstore" },
    ], correct_answer: "c" },
    { number: "1022", question: "What does 「だいどころ」 mean?", answers: [
        { option: "a", text: "bathroom" }, { option: "b", text: "bedroom" },
        { option: "c", text: "garden" }, { option: "d", text: "kitchen" },
    ], correct_answer: "d" },
    { number: "1023", question: "What does 「へや」 mean?", answers: [
        { option: "a", text: "room" }, { option: "b", text: "house" },
        { option: "c", text: "door" }, { option: "d", text: "roof" },
    ], correct_answer: "a" },
    { number: "1024", question: "What does 「まど」 mean?", answers: [
        { option: "a", text: "wall" }, { option: "b", text: "window" },
        { option: "c", text: "floor" }, { option: "d", text: "ceiling" },
    ], correct_answer: "b" },
    { number: "1025", question: "What does 「さかな」 mean?", answers: [
        { option: "a", text: "meat" }, { option: "b", text: "vegetable" },
        { option: "c", text: "fish" }, { option: "d", text: "rice" },
    ], correct_answer: "c" },

    // ---------- kanji readings ----------
    { number: "1026", question: "How do you read 「山」?", answers: [
        { option: "a", text: "かわ" }, { option: "b", text: "やま" },
        { option: "c", text: "うみ" }, { option: "d", text: "そら" },
    ], correct_answer: "b" },
    { number: "1027", question: "How do you read 「川」?", answers: [
        { option: "a", text: "かわ" }, { option: "b", text: "やま" },
        { option: "c", text: "いけ" }, { option: "d", text: "みず" },
    ], correct_answer: "a" },
    { number: "1028", question: "How do you read 「人」?", answers: [
        { option: "a", text: "いぬ" }, { option: "b", text: "こども" },
        { option: "c", text: "ひと" }, { option: "d", text: "とも" },
    ], correct_answer: "c" },
    { number: "1029", question: "How do you read 「大きい」?", answers: [
        { option: "a", text: "ちいさい" }, { option: "b", text: "おおきい" },
        { option: "c", text: "たかい" }, { option: "d", text: "ひろい" },
    ], correct_answer: "b" },
    { number: "1030", question: "How do you read 「小さい」?", answers: [
        { option: "a", text: "ちいさい" }, { option: "b", text: "すくない" },
        { option: "c", text: "みじかい" }, { option: "d", text: "ほそい" },
    ], correct_answer: "a" },
    { number: "1031", question: "How do you read 「学生」?", answers: [
        { option: "a", text: "せんせい" }, { option: "b", text: "がっこう" },
        { option: "c", text: "がくせい" }, { option: "d", text: "せいと" },
    ], correct_answer: "c" },
    { number: "1032", question: "How do you read 「先生」?", answers: [
        { option: "a", text: "せんせい" }, { option: "b", text: "がくせい" },
        { option: "c", text: "せんぱい" }, { option: "d", text: "いしゃ" },
    ], correct_answer: "a" },
    { number: "1033", question: "How do you read 「電車」?", answers: [
        { option: "a", text: "じどうしゃ" }, { option: "b", text: "でんき" },
        { option: "c", text: "じてんしゃ" }, { option: "d", text: "でんしゃ" },
    ], correct_answer: "d" },
    { number: "1034", question: "How do you read 「時間」?", answers: [
        { option: "a", text: "じかん" }, { option: "b", text: "とき" },
        { option: "c", text: "じだい" }, { option: "d", text: "ふん" },
    ], correct_answer: "a" },
    { number: "1035", question: "How do you read 「今日」?", answers: [
        { option: "a", text: "きのう" }, { option: "b", text: "きょう" },
        { option: "c", text: "あした" }, { option: "d", text: "いま" },
    ], correct_answer: "b" },
    { number: "1036", question: "How do you read 「明日」?", answers: [
        { option: "a", text: "きょう" }, { option: "b", text: "きのう" },
        { option: "c", text: "あした" }, { option: "d", text: "あさ" },
    ], correct_answer: "c" },
    { number: "1037", question: "How do you read 「昨日」?", answers: [
        { option: "a", text: "きのう" }, { option: "b", text: "あした" },
        { option: "c", text: "きょう" }, { option: "d", text: "ゆうべ" },
    ], correct_answer: "a" },
    { number: "1038", question: "How do you read 「食べる」?", answers: [
        { option: "a", text: "のべる" }, { option: "b", text: "しゃべる" },
        { option: "c", text: "たべる" }, { option: "d", text: "くべる" },
    ], correct_answer: "c" },
    { number: "1039", question: "How do you read 「飲む」?", answers: [
        { option: "a", text: "よむ" }, { option: "b", text: "のむ" },
        { option: "c", text: "すむ" }, { option: "d", text: "やすむ" },
    ], correct_answer: "b" },
    { number: "1040", question: "How do you read 「見る」?", answers: [
        { option: "a", text: "きる" }, { option: "b", text: "でる" },
        { option: "c", text: "ねる" }, { option: "d", text: "みる" },
    ], correct_answer: "d" },
    { number: "1041", question: "How do you read 「聞く」?", answers: [
        { option: "a", text: "きく" }, { option: "b", text: "かく" },
        { option: "c", text: "いく" }, { option: "d", text: "ひらく" },
    ], correct_answer: "a" },
    { number: "1042", question: "How do you read 「行く」?", answers: [
        { option: "a", text: "きく" }, { option: "b", text: "いく" },
        { option: "c", text: "あるく" }, { option: "d", text: "はたらく" },
    ], correct_answer: "b" },
    { number: "1043", question: "How do you read 「白い」?", answers: [
        { option: "a", text: "くろい" }, { option: "b", text: "あかい" },
        { option: "c", text: "しろい" }, { option: "d", text: "あおい" },
    ], correct_answer: "c" },
    { number: "1044", question: "How do you read 「高い」?", answers: [
        { option: "a", text: "たかい" }, { option: "b", text: "やすい" },
        { option: "c", text: "ひくい" }, { option: "d", text: "ながい" },
    ], correct_answer: "a" },
    { number: "1045", question: "How do you read 「安い」?", answers: [
        { option: "a", text: "たかい" }, { option: "b", text: "やさしい" },
        { option: "c", text: "あんぜん" }, { option: "d", text: "やすい" },
    ], correct_answer: "d" },
    { number: "1046", question: "How do you read 「新しい」?", answers: [
        { option: "a", text: "あたらしい" }, { option: "b", text: "ふるい" },
        { option: "c", text: "めずらしい" }, { option: "d", text: "うれしい" },
    ], correct_answer: "a" },
    { number: "1047", question: "How do you read 「古い」?", answers: [
        { option: "a", text: "くろい" }, { option: "b", text: "ふるい" },
        { option: "c", text: "とおい" }, { option: "d", text: "まるい" },
    ], correct_answer: "b" },
    { number: "1048", question: "How do you read 「天気」?", answers: [
        { option: "a", text: "でんき" }, { option: "b", text: "げんき" },
        { option: "c", text: "てんき" }, { option: "d", text: "くうき" },
    ], correct_answer: "c" },
    { number: "1049", question: "How do you read 「元気」?", answers: [
        { option: "a", text: "げんき" }, { option: "b", text: "てんき" },
        { option: "c", text: "でんき" }, { option: "d", text: "きもち" },
    ], correct_answer: "a" },
    { number: "1050", question: "How do you read 「火曜日」?", answers: [
        { option: "a", text: "すいようび" }, { option: "b", text: "かようび" },
        { option: "c", text: "もくようび" }, { option: "d", text: "きんようび" },
    ], correct_answer: "b" },

    // ---------- particles & grammar ----------
    { number: "1051", question: "Choose the particle: わたし ___ がくせいです。", answers: [
        { option: "a", text: "を" }, { option: "b", text: "は" },
        { option: "c", text: "に" }, { option: "d", text: "で" },
    ], correct_answer: "b" },
    { number: "1052", question: "Choose the particle: まいにち ほん ___ よみます。", answers: [
        { option: "a", text: "を" }, { option: "b", text: "は" },
        { option: "c", text: "が" }, { option: "d", text: "へ" },
    ], correct_answer: "a" },
    { number: "1053", question: "Choose the particle: としょかん ___ べんきょうします。", answers: [
        { option: "a", text: "を" }, { option: "b", text: "が" },
        { option: "c", text: "で" }, { option: "d", text: "の" },
    ], correct_answer: "c" },
    { number: "1054", question: "Choose the particle: まいあさ 7じ ___ おきます。", answers: [
        { option: "a", text: "で" }, { option: "b", text: "を" },
        { option: "c", text: "と" }, { option: "d", text: "に" },
    ], correct_answer: "d" },
    { number: "1055", question: "Choose the particle: ともだち ___ はなします。", answers: [
        { option: "a", text: "と" }, { option: "b", text: "を" },
        { option: "c", text: "の" }, { option: "d", text: "へ" },
    ], correct_answer: "a" },
    { number: "1056", question: "Choose the particle: だれ ___ きましたか。", answers: [
        { option: "a", text: "を" }, { option: "b", text: "が" },
        { option: "c", text: "で" }, { option: "d", text: "は" },
    ], correct_answer: "b" },
    { number: "1057", question: "Choose the particle: バス ___ がっこうへ いきます。", answers: [
        { option: "a", text: "に" }, { option: "b", text: "を" },
        { option: "c", text: "で" }, { option: "d", text: "が" },
    ], correct_answer: "c" },
    { number: "1058", question: "Choose the particle: これは わたし ___ ほんです。", answers: [
        { option: "a", text: "の" }, { option: "b", text: "は" },
        { option: "c", text: "が" }, { option: "d", text: "を" },
    ], correct_answer: "a" },
    { number: "1059", question: "Choose the particle: らいしゅう きょうと ___ いきます。", answers: [
        { option: "a", text: "を" }, { option: "b", text: "が" },
        { option: "c", text: "で" }, { option: "d", text: "へ" },
    ], correct_answer: "d" },
    { number: "1060", question: "Choose the particle: りんご ___ ふたつ ください。", answers: [
        { option: "a", text: "が" }, { option: "b", text: "を" },
        { option: "c", text: "は" }, { option: "d", text: "に" },
    ], correct_answer: "b" },
    { number: "1061", question: "What is the polite present form of 「たべる」 (to eat)?", answers: [
        { option: "a", text: "たべます" }, { option: "b", text: "たべた" },
        { option: "c", text: "たべて" }, { option: "d", text: "たべない" },
    ], correct_answer: "a" },
    { number: "1062", question: "What is the polite negative of 「のみます」 (to drink)?", answers: [
        { option: "a", text: "のみました" }, { option: "b", text: "のまない" },
        { option: "c", text: "のみません" }, { option: "d", text: "のんで" },
    ], correct_answer: "c" },
    { number: "1063", question: "What is the polite past of 「いきます」 (to go)?", answers: [
        { option: "a", text: "いきません" }, { option: "b", text: "いきました" },
        { option: "c", text: "いって" }, { option: "d", text: "いく" },
    ], correct_answer: "b" },
    { number: "1064", question: "Which verb means a person or animal exists? 「こうえんに こどもが ___。」", answers: [
        { option: "a", text: "あります" }, { option: "b", text: "います" },
        { option: "c", text: "です" }, { option: "d", text: "します" },
    ], correct_answer: "b" },
    { number: "1065", question: "Which verb means a thing exists? 「つくえのうえに ほんが ___。」", answers: [
        { option: "a", text: "あります" }, { option: "b", text: "います" },
        { option: "c", text: "です" }, { option: "d", text: "みます" },
    ], correct_answer: "a" },
    { number: "1066", question: "Which word means a place far from both speaker and listener?", answers: [
        { option: "a", text: "ここ" }, { option: "b", text: "そこ" },
        { option: "c", text: "どこ" }, { option: "d", text: "あそこ" },
    ], correct_answer: "d" },
    { number: "1067", question: "Which word points to a thing near the listener?", answers: [
        { option: "a", text: "これ" }, { option: "b", text: "それ" },
        { option: "c", text: "あれ" }, { option: "d", text: "どれ" },
    ], correct_answer: "b" },
    { number: "1068", question: "Complete the question: これは ___ ですか。(What is this?)", answers: [
        { option: "a", text: "なん" }, { option: "b", text: "だれ" },
        { option: "c", text: "どこ" }, { option: "d", text: "いつ" },
    ], correct_answer: "a" },
    { number: "1069", question: "What is the negative form of 「たかい」 (expensive)?", answers: [
        { option: "a", text: "たかいじゃない" }, { option: "b", text: "たかくありない" },
        { option: "c", text: "たかくない" }, { option: "d", text: "たかではない" },
    ], correct_answer: "c" },
    { number: "1070", question: "Complete: しずか ___ まち (a quiet town)", answers: [
        { option: "a", text: "い" }, { option: "b", text: "な" },
        { option: "c", text: "の" }, { option: "d", text: "に" },
    ], correct_answer: "b" },
    { number: "1071", question: "How do you say 'I want to eat sushi'? 「すしを ___ です。」", answers: [
        { option: "a", text: "たべたい" }, { option: "b", text: "たべたく" },
        { option: "c", text: "たべましょう" }, { option: "d", text: "たべること" },
    ], correct_answer: "a" },
    { number: "1072", question: "How do you politely ask someone to write? 「ここに なまえを ___。」", answers: [
        { option: "a", text: "かきたいです" }, { option: "b", text: "かきましょう" },
        { option: "c", text: "かくです" }, { option: "d", text: "かいてください" },
    ], correct_answer: "d" },
    { number: "1073", question: "What is the て-form of 「のむ」 (to drink)?", answers: [
        { option: "a", text: "のみて" }, { option: "b", text: "のんで" },
        { option: "c", text: "のって" }, { option: "d", text: "のいで" },
    ], correct_answer: "b" },
    { number: "1074", question: "A sign says no photos. 「しゃしんを ___ ください。」", answers: [
        { option: "a", text: "とらないで" }, { option: "b", text: "とりないで" },
        { option: "c", text: "とってない" }, { option: "d", text: "とらなくて" },
    ], correct_answer: "a" },
    { number: "1075", question: "How do you say 'two people'?", answers: [
        { option: "a", text: "ににん" }, { option: "b", text: "ふたつ" },
        { option: "c", text: "ふたり" }, { option: "d", text: "にこ" },
    ], correct_answer: "c" },

    // ---------- numbers & time ----------
    { number: "1076", question: "What number is 「九」?", answers: [
        { option: "a", text: "6" }, { option: "b", text: "9" },
        { option: "c", text: "7" }, { option: "d", text: "10" },
    ], correct_answer: "b" },
    { number: "1077", question: "What number is 「十四」?", answers: [
        { option: "a", text: "40" }, { option: "b", text: "44" },
        { option: "c", text: "4" }, { option: "d", text: "14" },
    ], correct_answer: "d" },
    { number: "1078", question: "How do you say 4:30 (half past four)?", answers: [
        { option: "a", text: "よじはん" }, { option: "b", text: "しじはん" },
        { option: "c", text: "よんじはん" }, { option: "d", text: "よじさんじゅう" },
    ], correct_answer: "a" },
    { number: "1079", question: "「ようか」 is which day of the month?", answers: [
        { option: "a", text: "the 4th" }, { option: "b", text: "the 6th" },
        { option: "c", text: "the 8th" }, { option: "d", text: "the 10th" },
    ], correct_answer: "c" },
    { number: "1080", question: "「よっか」 is which day of the month?", answers: [
        { option: "a", text: "the 4th" }, { option: "b", text: "the 8th" },
        { option: "c", text: "the 14th" }, { option: "d", text: "the 24th" },
    ], correct_answer: "a" },
    { number: "1081", question: "How do you read 「一人」 (one person)?", answers: [
        { option: "a", text: "いちにん" }, { option: "b", text: "ひとり" },
        { option: "c", text: "いちり" }, { option: "d", text: "ひとつ" },
    ], correct_answer: "b" },
    { number: "1082", question: "How do you read 「三本」 (three pencils)?", answers: [
        { option: "a", text: "さんほん" }, { option: "b", text: "みほん" },
        { option: "c", text: "さんぼん" }, { option: "d", text: "さんぽん" },
    ], correct_answer: "c" },
    { number: "1083", question: "What number is 「百」?", answers: [
        { option: "a", text: "100" }, { option: "b", text: "1,000" },
        { option: "c", text: "10" }, { option: "d", text: "10,000" },
    ], correct_answer: "a" },
    { number: "1084", question: "What number is 「千」?", answers: [
        { option: "a", text: "100" }, { option: "b", text: "10,000" },
        { option: "c", text: "500" }, { option: "d", text: "1,000" },
    ], correct_answer: "d" },
    { number: "1085", question: "What number is 「一万」?", answers: [
        { option: "a", text: "1,000" }, { option: "b", text: "10,000" },
        { option: "c", text: "100,000" }, { option: "d", text: "100" },
    ], correct_answer: "b" },
    { number: "1086", question: "In 「3時半」, what does 「半」 mean?", answers: [
        { option: "a", text: "quarter past" }, { option: "b", text: "almost" },
        { option: "c", text: "half past" }, { option: "d", text: "exactly" },
    ], correct_answer: "c" },
    { number: "1087", question: "What does 「いま なんじですか。」 mean?", answers: [
        { option: "a", text: "What time is it now?" }, { option: "b", text: "What day is it today?" },
        { option: "c", text: "Where are you now?" }, { option: "d", text: "How old are you?" },
    ], correct_answer: "a" },
    { number: "1088", question: "「水曜日」 is which day of the week?", answers: [
        { option: "a", text: "Monday" }, { option: "b", text: "Thursday" },
        { option: "c", text: "Tuesday" }, { option: "d", text: "Wednesday" },
    ], correct_answer: "d" },

    // ---------- set phrases ----------
    { number: "1089", question: "What do you say right before eating?", answers: [
        { option: "a", text: "ごちそうさまでした" }, { option: "b", text: "いただきます" },
        { option: "c", text: "おなかがすいた" }, { option: "d", text: "かんぱい" },
    ], correct_answer: "b" },
    { number: "1090", question: "What do you say when leaving your home?", answers: [
        { option: "a", text: "いってきます" }, { option: "b", text: "ただいま" },
        { option: "c", text: "おかえりなさい" }, { option: "d", text: "いらっしゃいませ" },
    ], correct_answer: "a" },
    { number: "1091", question: "What do you say when you arrive back home?", answers: [
        { option: "a", text: "いってらっしゃい" }, { option: "b", text: "おじゃまします" },
        { option: "c", text: "ただいま" }, { option: "d", text: "おやすみ" },
    ], correct_answer: "c" },
    { number: "1092", question: "How do you reply to 「ただいま」?", answers: [
        { option: "a", text: "いってきます" }, { option: "b", text: "おかえりなさい" },
        { option: "c", text: "はじめまして" }, { option: "d", text: "ごめんください" },
    ], correct_answer: "b" },
    { number: "1093", question: "What do you say when meeting someone for the first time?", answers: [
        { option: "a", text: "おひさしぶりです" }, { option: "b", text: "おげんきですか" },
        { option: "c", text: "おつかれさま" }, { option: "d", text: "はじめまして" },
    ], correct_answer: "d" },
    { number: "1094", question: "What is the polite way to say good morning?", answers: [
        { option: "a", text: "おはようございます" }, { option: "b", text: "こんばんは" },
        { option: "c", text: "こんにちは" }, { option: "d", text: "おやすみなさい" },
    ], correct_answer: "a" },
    { number: "1095", question: "What is the polite way to say thank you?", answers: [
        { option: "a", text: "すみません" }, { option: "b", text: "どういたしまして" },
        { option: "c", text: "ありがとうございます" }, { option: "d", text: "おねがいします" },
    ], correct_answer: "c" },
    { number: "1096", question: "Which phrase means both 'excuse me' and 'sorry'?", answers: [
        { option: "a", text: "すみません" }, { option: "b", text: "そうですね" },
        { option: "c", text: "だいじょうぶ" }, { option: "d", text: "しつれいします" },
    ], correct_answer: "a" },
    { number: "1097", question: "What do you say before going to sleep?", answers: [
        { option: "a", text: "おはよう" }, { option: "b", text: "おやすみなさい" },
        { option: "c", text: "こんばんは" }, { option: "d", text: "さようなら" },
    ], correct_answer: "b" },
    { number: "1098", question: "What do you say after finishing a meal?", answers: [
        { option: "a", text: "いただきます" }, { option: "b", text: "おいしいです" },
        { option: "c", text: "おなかがいっぱい" }, { option: "d", text: "ごちそうさまでした" },
    ], correct_answer: "d" },
    { number: "1099", question: "What does 「さようなら」 mean?", answers: [
        { option: "a", text: "hello" }, { option: "b", text: "welcome" },
        { option: "c", text: "goodbye" }, { option: "d", text: "good night" },
    ], correct_answer: "c" },
    { number: "1100", question: "What do you say when handing something to someone ('here you go')?", answers: [
        { option: "a", text: "どうぞ" }, { option: "b", text: "どうも" },
        { option: "c", text: "ちょっと" }, { option: "d", text: "どれ" },
    ], correct_answer: "a" },

    // ---------- more vocabulary ----------
    { number: "1101", question: "What does 「あかい」 mean?", answers: [
        { option: "a", text: "blue" }, { option: "b", text: "red" },
        { option: "c", text: "white" }, { option: "d", text: "green" },
    ], correct_answer: "b" },
    { number: "1102", question: "What does 「あおい」 mean?", answers: [
        { option: "a", text: "blue" }, { option: "b", text: "yellow" },
        { option: "c", text: "red" }, { option: "d", text: "brown" },
    ], correct_answer: "a" },
    { number: "1103", question: "What does 「くろい」 mean?", answers: [
        { option: "a", text: "white" }, { option: "b", text: "gray" },
        { option: "c", text: "black" }, { option: "d", text: "dark blue" },
    ], correct_answer: "c" },
    { number: "1104", question: "What does 「ちち」 mean (talking about your own family)?", answers: [
        { option: "a", text: "my mother" }, { option: "b", text: "my father" },
        { option: "c", text: "my uncle" }, { option: "d", text: "my grandfather" },
    ], correct_answer: "b" },
    { number: "1105", question: "What does 「はは」 mean (talking about your own family)?", answers: [
        { option: "a", text: "my mother" }, { option: "b", text: "my aunt" },
        { option: "c", text: "my sister" }, { option: "d", text: "my grandmother" },
    ], correct_answer: "a" },
    { number: "1106", question: "What does 「あに」 mean?", answers: [
        { option: "a", text: "my younger brother" }, { option: "b", text: "my older sister" },
        { option: "c", text: "my cousin" }, { option: "d", text: "my older brother" },
    ], correct_answer: "d" },
    { number: "1107", question: "What does 「あね」 mean?", answers: [
        { option: "a", text: "my older sister" }, { option: "b", text: "my younger sister" },
        { option: "c", text: "my mother" }, { option: "d", text: "my aunt" },
    ], correct_answer: "a" },
    { number: "1108", question: "What does 「おとうと」 mean?", answers: [
        { option: "a", text: "my older brother" }, { option: "b", text: "my father" },
        { option: "c", text: "my younger brother" }, { option: "d", text: "my son" },
    ], correct_answer: "c" },
    { number: "1109", question: "What does 「いもうと」 mean?", answers: [
        { option: "a", text: "my older sister" }, { option: "b", text: "my younger sister" },
        { option: "c", text: "my daughter" }, { option: "d", text: "my niece" },
    ], correct_answer: "b" },
    { number: "1110", question: "What does 「あめ」 mean (weather)?", answers: [
        { option: "a", text: "snow" }, { option: "b", text: "wind" },
        { option: "c", text: "cloud" }, { option: "d", text: "rain" },
    ], correct_answer: "d" },
    { number: "1111", question: "What does 「ゆき」 mean?", answers: [
        { option: "a", text: "snow" }, { option: "b", text: "rain" },
        { option: "c", text: "ice" }, { option: "d", text: "fog" },
    ], correct_answer: "a" },
    { number: "1112", question: "What does 「かぜ」 mean (weather)?", answers: [
        { option: "a", text: "storm" }, { option: "b", text: "wind" },
        { option: "c", text: "thunder" }, { option: "d", text: "cloud" },
    ], correct_answer: "b" },
    { number: "1113", question: "What does 「はれ」 mean?", answers: [
        { option: "a", text: "rainy weather" }, { option: "b", text: "cloudy weather" },
        { option: "c", text: "sunny weather" }, { option: "d", text: "snowy weather" },
    ], correct_answer: "c" },
    { number: "1114", question: "What does 「ひこうき」 mean?", answers: [
        { option: "a", text: "airplane" }, { option: "b", text: "helicopter" },
        { option: "c", text: "ship" }, { option: "d", text: "rocket" },
    ], correct_answer: "a" },
    { number: "1115", question: "What does 「じてんしゃ」 mean?", answers: [
        { option: "a", text: "car" }, { option: "b", text: "motorcycle" },
        { option: "c", text: "train" }, { option: "d", text: "bicycle" },
    ], correct_answer: "d" },

    // ---------- more kanji readings ----------
    { number: "1116", question: "How do you read 「月曜日」?", answers: [
        { option: "a", text: "げつようび" }, { option: "b", text: "にちようび" },
        { option: "c", text: "どようび" }, { option: "d", text: "かようび" },
    ], correct_answer: "a" },
    { number: "1117", question: "How do you read 「木」 (tree)?", answers: [
        { option: "a", text: "ほん" }, { option: "b", text: "き" },
        { option: "c", text: "はな" }, { option: "d", text: "くさ" },
    ], correct_answer: "b" },
    { number: "1118", question: "How do you read 「金曜日」?", answers: [
        { option: "a", text: "きんようび" }, { option: "b", text: "ぎんようび" },
        { option: "c", text: "もくようび" }, { option: "d", text: "すいようび" },
    ], correct_answer: "a" },
    { number: "1119", question: "How do you read 「土曜日」?", answers: [
        { option: "a", text: "つちようび" }, { option: "b", text: "とようび" },
        { option: "c", text: "どようび" }, { option: "d", text: "だようび" },
    ], correct_answer: "c" },
    { number: "1120", question: "How do you read 「年」 (year, age)?", answers: [
        { option: "a", text: "とし" }, { option: "b", text: "つき" },
        { option: "c", text: "ひ" }, { option: "d", text: "とき" },
    ], correct_answer: "a" },
    { number: "1121", question: "How do you read 「何」 in 「何を たべますか」?", answers: [
        { option: "a", text: "なん" }, { option: "b", text: "どれ" },
        { option: "c", text: "なぜ" }, { option: "d", text: "なに" },
    ], correct_answer: "d" },
    { number: "1122", question: "How do you read 「外国」?", answers: [
        { option: "a", text: "がいこく" }, { option: "b", text: "そとくに" },
        { option: "c", text: "げこく" }, { option: "d", text: "がいごく" },
    ], correct_answer: "a" },
    { number: "1123", question: "How do you read 「毎日」?", answers: [
        { option: "a", text: "まいにち" }, { option: "b", text: "まいび" },
        { option: "c", text: "ごとにち" }, { option: "d", text: "まいじつ" },
    ], correct_answer: "a" },
    { number: "1124", question: "How do you read 「午前」?", answers: [
        { option: "a", text: "ごご" }, { option: "b", text: "ごぜん" },
        { option: "c", text: "うしまえ" }, { option: "d", text: "こぜん" },
    ], correct_answer: "b" },
    { number: "1125", question: "How do you read 「午後」?", answers: [
        { option: "a", text: "ごぜん" }, { option: "b", text: "ごこう" },
        { option: "c", text: "ごご" }, { option: "d", text: "ごのち" },
    ], correct_answer: "c" },
    { number: "1126", question: "How do you read 「会社」?", answers: [
        { option: "a", text: "かいしゃ" }, { option: "b", text: "がっこう" },
        { option: "c", text: "かいぎ" }, { option: "d", text: "しゃかい" },
    ], correct_answer: "a" },
    { number: "1127", question: "How do you read 「買う」?", answers: [
        { option: "a", text: "かう" }, { option: "b", text: "うる" },
        { option: "c", text: "はらう" }, { option: "d", text: "もらう" },
    ], correct_answer: "a" },
    { number: "1128", question: "How do you read 「読む」?", answers: [
        { option: "a", text: "のむ" }, { option: "b", text: "よむ" },
        { option: "c", text: "やすむ" }, { option: "d", text: "たのむ" },
    ], correct_answer: "b" },
    { number: "1129", question: "How do you read 「書く」?", answers: [
        { option: "a", text: "きく" }, { option: "b", text: "はく" },
        { option: "c", text: "おく" }, { option: "d", text: "かく" },
    ], correct_answer: "d" },
    { number: "1130", question: "How do you read 「話す」?", answers: [
        { option: "a", text: "はなす" }, { option: "b", text: "だす" },
        { option: "c", text: "わす" }, { option: "d", text: "かえす" },
    ], correct_answer: "a" },

    // ---------- more grammar ----------
    { number: "1131", question: "How do you suggest 'let's eat' politely?", answers: [
        { option: "a", text: "たべてください" }, { option: "b", text: "たべましょう" },
        { option: "c", text: "たべたいです" }, { option: "d", text: "たべます" },
    ], correct_answer: "b" },
    { number: "1132", question: "What does 「しゃしんを とってもいいですか」 ask?", answers: [
        { option: "a", text: "May I take a photo?" }, { option: "b", text: "Will you take my photo?" },
        { option: "c", text: "Is this a good photo?" }, { option: "d", text: "Do you like photos?" },
    ], correct_answer: "a" },
    { number: "1133", question: "What does 「もう たべました」 mean?", answers: [
        { option: "a", text: "I will eat more" }, { option: "b", text: "I ate too much" },
        { option: "c", text: "I already ate" }, { option: "d", text: "I want to eat again" },
    ], correct_answer: "c" },
    { number: "1134", question: "In 「まだ たべていません」, what does 「まだ」 mean?", answers: [
        { option: "a", text: "not yet" }, { option: "b", text: "already" },
        { option: "c", text: "never" }, { option: "d", text: "again" },
    ], correct_answer: "a" },
    { number: "1135", question: "Choose the particle: きのう えいが ___ みました。", answers: [
        { option: "a", text: "が" }, { option: "b", text: "に" },
        { option: "c", text: "を" }, { option: "d", text: "で" },
    ], correct_answer: "c" },
    { number: "1136", question: "In 「あついですから、まどを あけます」, what does 「から」 mean?", answers: [
        { option: "a", text: "but" }, { option: "b", text: "because" },
        { option: "c", text: "after" }, { option: "d", text: "if" },
    ], correct_answer: "b" },
    { number: "1137", question: "Which counter is used for flat things like paper? かみを 2___ ください。", answers: [
        { option: "a", text: "ほん" }, { option: "b", text: "こ" },
        { option: "c", text: "だい" }, { option: "d", text: "まい" },
    ], correct_answer: "d" },
    { number: "1138", question: "What does 「どのぐらい」 ask about?", answers: [
        { option: "a", text: "how long / how much" }, { option: "b", text: "which one" },
        { option: "c", text: "what kind" }, { option: "d", text: "whose" },
    ], correct_answer: "a" },
    { number: "1139", question: "What does 「うちから えきまで」 mean?", answers: [
        { option: "a", text: "at home and at the station" }, { option: "b", text: "from home to the station" },
        { option: "c", text: "near home and the station" }, { option: "d", text: "either home or the station" },
    ], correct_answer: "b" },
    { number: "1140", question: "Complete naturally: けさ、なにも ___。", answers: [
        { option: "a", text: "たべました" }, { option: "b", text: "たべます" },
        { option: "c", text: "たべませんでした" }, { option: "d", text: "たべたいです" },
    ], correct_answer: "c" },
    { number: "1141", question: "What does 「いっしょに」 mean?", answers: [
        { option: "a", text: "together" }, { option: "b", text: "alone" },
        { option: "c", text: "quickly" }, { option: "d", text: "slowly" },
    ], correct_answer: "a" },
    { number: "1142", question: "What does 「ごはんのまえに、てを あらいます」 mean?", answers: [
        { option: "a", text: "I wash my hands after meals" }, { option: "b", text: "I wash my hands during meals" },
        { option: "c", text: "I wash the rice before cooking" }, { option: "d", text: "I wash my hands before meals" },
    ], correct_answer: "d" },

    // ---------- more numbers, time & phrases ----------
    { number: "1143", question: "What number is 「六」?", answers: [
        { option: "a", text: "6" }, { option: "b", text: "8" },
        { option: "c", text: "9" }, { option: "d", text: "3" },
    ], correct_answer: "a" },
    { number: "1144", question: "What number is 「八」?", answers: [
        { option: "a", text: "6" }, { option: "b", text: "8" },
        { option: "c", text: "4" }, { option: "d", text: "10" },
    ], correct_answer: "b" },
    { number: "1145", question: "「ここのつ」 is how many things?", answers: [
        { option: "a", text: "5" }, { option: "b", text: "7" },
        { option: "c", text: "9" }, { option: "d", text: "10" },
    ], correct_answer: "c" },
    { number: "1146", question: "「はたち」 means what age?", answers: [
        { option: "a", text: "18 years old" }, { option: "b", text: "20 years old" },
        { option: "c", text: "28 years old" }, { option: "d", text: "8 years old" },
    ], correct_answer: "b" },
    { number: "1147", question: "What does 「いくらですか」 ask?", answers: [
        { option: "a", text: "How much does it cost?" }, { option: "b", text: "How many are there?" },
        { option: "c", text: "What time is it?" }, { option: "d", text: "How far is it?" },
    ], correct_answer: "a" },
    { number: "1148", question: "What does 「おいくつですか」 usually ask?", answers: [
        { option: "a", text: "How much is it?" }, { option: "b", text: "How many people?" },
        { option: "c", text: "What size?" }, { option: "d", text: "How old are you?" },
    ], correct_answer: "d" },
    { number: "1149", question: "What do you say when answering the phone?", answers: [
        { option: "a", text: "もしもし" }, { option: "b", text: "どうぞどうぞ" },
        { option: "c", text: "おーい" }, { option: "d", text: "こちらこそ" },
    ], correct_answer: "a" },
    { number: "1150", question: "A shop clerk greets you with:", answers: [
        { option: "a", text: "おじゃまします" }, { option: "b", text: "ただいま" },
        { option: "c", text: "いらっしゃいませ" }, { option: "d", text: "おかえりなさい" },
    ], correct_answer: "c" },
];
