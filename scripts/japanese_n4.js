// JLPT N4 question bank — kanji readings, vocabulary, grammar, and
// polite phrases a step up from N5. Numbers 1201+ (N5 owns 1001–1199).
const n4_questions = [
    // ---------- kanji readings ----------
    { number: "1201", question: "How do you read 「帰る」?", answers: [
        { option: "a", text: "かえる" }, { option: "b", text: "もどる" },
        { option: "c", text: "きえる" }, { option: "d", text: "おくる" },
    ], correct_answer: "a" },
    { number: "1202", question: "How do you read 「送る」?", answers: [
        { option: "a", text: "うける" }, { option: "b", text: "おくる" },
        { option: "c", text: "とどく" }, { option: "d", text: "はこぶ" },
    ], correct_answer: "b" },
    { number: "1203", question: "How do you read 「走る」?", answers: [
        { option: "a", text: "はいる" }, { option: "b", text: "のぼる" },
        { option: "c", text: "はしる" }, { option: "d", text: "とおる" },
    ], correct_answer: "c" },
    { number: "1204", question: "How do you read 「起きる」?", answers: [
        { option: "a", text: "おきる" }, { option: "b", text: "いきる" },
        { option: "c", text: "できる" }, { option: "d", text: "たてる" },
    ], correct_answer: "a" },
    { number: "1205", question: "How do you read 「寝る」?", answers: [
        { option: "a", text: "きる" }, { option: "b", text: "でる" },
        { option: "c", text: "とまる" }, { option: "d", text: "ねる" },
    ], correct_answer: "d" },
    { number: "1206", question: "How do you read 「働く」?", answers: [
        { option: "a", text: "うごく" }, { option: "b", text: "はたらく" },
        { option: "c", text: "つとめる" }, { option: "d", text: "ひらく" },
    ], correct_answer: "b" },
    { number: "1207", question: "How do you read 「急ぐ」?", answers: [
        { option: "a", text: "いそぐ" }, { option: "b", text: "およぐ" },
        { option: "c", text: "さわぐ" }, { option: "d", text: "ぬぐ" },
    ], correct_answer: "a" },
    { number: "1208", question: "How do you read 「曲がる」?", answers: [
        { option: "a", text: "さがる" }, { option: "b", text: "あがる" },
        { option: "c", text: "まがる" }, { option: "d", text: "ひろがる" },
    ], correct_answer: "c" },
    { number: "1209", question: "How do you read 「世界」?", answers: [
        { option: "a", text: "せかい" }, { option: "b", text: "せいかい" },
        { option: "c", text: "しゃかい" }, { option: "d", text: "せけん" },
    ], correct_answer: "a" },
    { number: "1210", question: "How do you read 「地図」?", answers: [
        { option: "a", text: "じず" }, { option: "b", text: "ちず" },
        { option: "c", text: "ちと" }, { option: "d", text: "じめん" },
    ], correct_answer: "b" },
    { number: "1211", question: "How do you read 「料理」?", answers: [
        { option: "a", text: "りょうり" }, { option: "b", text: "りょり" },
        { option: "c", text: "りょうきん" }, { option: "d", text: "しょくじ" },
    ], correct_answer: "a" },
    { number: "1212", question: "How do you read 「旅行」?", answers: [
        { option: "a", text: "りょうこう" }, { option: "b", text: "たびいき" },
        { option: "c", text: "りょこう" }, { option: "d", text: "りょっこう" },
    ], correct_answer: "c" },
    { number: "1213", question: "How do you read 「勉強」?", answers: [
        { option: "a", text: "べんきょう" }, { option: "b", text: "べんきょ" },
        { option: "c", text: "めんきょう" }, { option: "d", text: "べんとう" },
    ], correct_answer: "a" },
    { number: "1214", question: "How do you read 「質問」?", answers: [
        { option: "a", text: "しゅつもん" }, { option: "b", text: "しちもん" },
        { option: "c", text: "せつもん" }, { option: "d", text: "しつもん" },
    ], correct_answer: "d" },
    { number: "1215", question: "How do you read 「病気」?", answers: [
        { option: "a", text: "びょうき" }, { option: "b", text: "びょういん" },
        { option: "c", text: "へいき" }, { option: "d", text: "げんき" },
    ], correct_answer: "a" },
    { number: "1216", question: "How do you read 「薬」?", answers: [
        { option: "a", text: "くさ" }, { option: "b", text: "くすり" },
        { option: "c", text: "たばこ" }, { option: "d", text: "さけ" },
    ], correct_answer: "b" },
    { number: "1217", question: "How do you read 「映画」?", answers: [
        { option: "a", text: "えいご" }, { option: "b", text: "まんが" },
        { option: "c", text: "えいが" }, { option: "d", text: "えが" },
    ], correct_answer: "c" },
    { number: "1218", question: "How do you read 「音楽」?", answers: [
        { option: "a", text: "おんがく" }, { option: "b", text: "おとらく" },
        { option: "c", text: "おんかく" }, { option: "d", text: "いんがく" },
    ], correct_answer: "a" },
    { number: "1219", question: "How do you read 「図書館」?", answers: [
        { option: "a", text: "ずしょかん" }, { option: "b", text: "としょかん" },
        { option: "c", text: "とかいかん" }, { option: "d", text: "びじゅつかん" },
    ], correct_answer: "b" },
    { number: "1220", question: "How do you read 「兄弟」?", answers: [
        { option: "a", text: "あにおとうと" }, { option: "b", text: "けいだい" },
        { option: "c", text: "きょうだい" }, { option: "d", text: "しまい" },
    ], correct_answer: "c" },

    // ---------- vocabulary ----------
    { number: "1221", question: "What does 「うれしい」 mean?", answers: [
        { option: "a", text: "happy" }, { option: "b", text: "sad" },
        { option: "c", text: "angry" }, { option: "d", text: "tired" },
    ], correct_answer: "a" },
    { number: "1222", question: "What does 「かなしい」 mean?", answers: [
        { option: "a", text: "scary" }, { option: "b", text: "sad" },
        { option: "c", text: "lonely" }, { option: "d", text: "boring" },
    ], correct_answer: "b" },
    { number: "1223", question: "What does 「さびしい」 mean?", answers: [
        { option: "a", text: "noisy" }, { option: "b", text: "busy" },
        { option: "c", text: "lonely" }, { option: "d", text: "salty" },
    ], correct_answer: "c" },
    { number: "1224", question: "What does 「はずかしい」 mean?", answers: [
        { option: "a", text: "embarrassed" }, { option: "b", text: "proud" },
        { option: "c", text: "surprised" }, { option: "d", text: "nervous" },
    ], correct_answer: "a" },
    { number: "1225", question: "What does 「にがい」 mean?", answers: [
        { option: "a", text: "sweet" }, { option: "b", text: "sour" },
        { option: "c", text: "spicy" }, { option: "d", text: "bitter" },
    ], correct_answer: "d" },
    { number: "1226", question: "What does 「あまい」 mean?", answers: [
        { option: "a", text: "sweet" }, { option: "b", text: "salty" },
        { option: "c", text: "bitter" }, { option: "d", text: "bland" },
    ], correct_answer: "a" },
    { number: "1227", question: "What does 「つめたい」 mean?", answers: [
        { option: "a", text: "hot (to the touch)" }, { option: "b", text: "cold (to the touch)" },
        { option: "c", text: "soft" }, { option: "d", text: "sharp" },
    ], correct_answer: "b" },
    { number: "1228", question: "What does 「ぬるい」 mean?", answers: [
        { option: "a", text: "frozen" }, { option: "b", text: "boiling" },
        { option: "c", text: "lukewarm" }, { option: "d", text: "wet" },
    ], correct_answer: "c" },
    { number: "1229", question: "What does 「けしき」 mean?", answers: [
        { option: "a", text: "scenery" }, { option: "b", text: "weather" },
        { option: "c", text: "painting" }, { option: "d", text: "photograph" },
    ], correct_answer: "a" },
    { number: "1230", question: "What does 「おみやげ」 mean?", answers: [
        { option: "a", text: "luggage" }, { option: "b", text: "ticket" },
        { option: "c", text: "postcard" }, { option: "d", text: "souvenir" },
    ], correct_answer: "d" },
    { number: "1231", question: "What does 「ゆめ」 mean?", answers: [
        { option: "a", text: "dream" }, { option: "b", text: "sleep" },
        { option: "c", text: "hope" }, { option: "d", text: "night" },
    ], correct_answer: "a" },
    { number: "1232", question: "What does 「うそ」 mean?", answers: [
        { option: "a", text: "joke" }, { option: "b", text: "lie" },
        { option: "c", text: "secret" }, { option: "d", text: "story" },
    ], correct_answer: "b" },

    // ---------- grammar ----------
    { number: "1233", question: "Complete (experience): にほんへ いった ___ が あります。", answers: [
        { option: "a", text: "もの" }, { option: "b", text: "とき" },
        { option: "c", text: "こと" }, { option: "d", text: "ところ" },
    ], correct_answer: "c" },
    { number: "1234", question: "What does 「なっとうが たべられます」 mean?", answers: [
        { option: "a", text: "I can eat natto" }, { option: "b", text: "I must eat natto" },
        { option: "c", text: "I was fed natto" }, { option: "d", text: "I want to eat natto" },
    ], correct_answer: "a" },
    { number: "1235", question: "What does 「あした はやく いかなければなりません」 mean?", answers: [
        { option: "a", text: "I might go early tomorrow" }, { option: "b", text: "I must go early tomorrow" },
        { option: "c", text: "I don't have to go tomorrow" }, { option: "d", text: "I shouldn't go early tomorrow" },
    ], correct_answer: "b" },
    { number: "1236", question: "Complete (prohibition): ここで たばこを すっては ___。", answers: [
        { option: "a", text: "いけません" }, { option: "b", text: "なりました" },
        { option: "c", text: "ください" }, { option: "d", text: "かまいます" },
    ], correct_answer: "a" },
    { number: "1237", question: "Complete (doing two things at once): おんがくを きき ___ べんきょうします。", answers: [
        { option: "a", text: "そうに" }, { option: "b", text: "てから" },
        { option: "c", text: "たまま" }, { option: "d", text: "ながら" },
    ], correct_answer: "d" },
    { number: "1238", question: "What does 「あめが ふりそうです」 mean?", answers: [
        { option: "a", text: "I heard it will rain" }, { option: "b", text: "It looks like it's about to rain" },
        { option: "c", text: "It rained a lot" }, { option: "d", text: "It stopped raining" },
    ], correct_answer: "b" },
    { number: "1239", question: "Complete (listing activities): やすみのひは ほんを よん___、えいがを み___ します。", answers: [
        { option: "a", text: "だり／たり" }, { option: "b", text: "で／て" },
        { option: "c", text: "だら／たら" }, { option: "d", text: "だし／たし" },
    ], correct_answer: "a" },
    { number: "1240", question: "Complete (comparison): バスは でんしゃ ___ やすいです。", answers: [
        { option: "a", text: "ほど" }, { option: "b", text: "だけ" },
        { option: "c", text: "より" }, { option: "d", text: "でも" },
    ], correct_answer: "c" },
    { number: "1241", question: "In 「クラスで いちばん せが たかい」, what does 「いちばん」 mean?", answers: [
        { option: "a", text: "the most / number one" }, { option: "b", text: "a little" },
        { option: "c", text: "almost" }, { option: "d", text: "first time" },
    ], correct_answer: "a" },
    { number: "1242", question: "Complete (intention): らいねん にほんへ いく ___ です。", answers: [
        { option: "a", text: "ため" }, { option: "b", text: "つもり" },
        { option: "c", text: "こと" }, { option: "d", text: "ばかり" },
    ], correct_answer: "b" },
    { number: "1243", question: "Complete (possibility): あしたは あめ ___。", answers: [
        { option: "a", text: "かもしれません" }, { option: "b", text: "はずがありません" },
        { option: "c", text: "たがっています" }, { option: "d", text: "ことがあります" },
    ], correct_answer: "a" },
    { number: "1244", question: "Complete (advice): つかれていますね。はやく ねた ___ いいですよ。", answers: [
        { option: "a", text: "ことが" }, { option: "b", text: "ものが" },
        { option: "c", text: "ほうが" }, { option: "d", text: "だけが" },
    ], correct_answer: "c" },
    { number: "1245", question: "Complete (state, intransitive): まどが ___ います。", answers: [
        { option: "a", text: "あけて" }, { option: "b", text: "あいて" },
        { option: "c", text: "あけられ" }, { option: "d", text: "あき" },
    ], correct_answer: "b" },
    { number: "1246", question: "Complete (passive): ケーキは いもうとに たべ ___ ました。", answers: [
        { option: "a", text: "られ" }, { option: "b", text: "させ" },
        { option: "c", text: "たがり" }, { option: "d", text: "きれ" },
    ], correct_answer: "a" },
    { number: "1247", question: "Someone gave YOU a present: ともだちが わたしに プレゼントを ___。", answers: [
        { option: "a", text: "あげました" }, { option: "b", text: "もらいました" },
        { option: "c", text: "やりました" }, { option: "d", text: "くれました" },
    ], correct_answer: "d" },
    { number: "1248", question: "Complete (preparation in advance): りょこうのまえに きっぷを かって ___。", answers: [
        { option: "a", text: "おきます" }, { option: "b", text: "みます" },
        { option: "c", text: "いきます" }, { option: "d", text: "あります" },
    ], correct_answer: "a" },
    { number: "1249", question: "Complete (regret): しゅくだいを わすれて ___ ました。", answers: [
        { option: "a", text: "おき" }, { option: "b", text: "しまい" },
        { option: "c", text: "あり" }, { option: "d", text: "みせ" },
    ], correct_answer: "b" },
    { number: "1250", question: "Which is the honorific way to say the teacher IS in the classroom?", answers: [
        { option: "a", text: "せんせいは きょうしつに おります" }, { option: "b", text: "せんせいは きょうしつに ございます" },
        { option: "c", text: "せんせいは きょうしつに いらっしゃいます" }, { option: "d", text: "せんせいは きょうしつに まいります" },
    ], correct_answer: "c" },
    { number: "1251", question: "Complete (after doing): ごはんを たべた ___、はを みがきます。", answers: [
        { option: "a", text: "あとで" }, { option: "b", text: "まえに" },
        { option: "c", text: "あいだ" }, { option: "d", text: "うちに" },
    ], correct_answer: "a" },
    { number: "1252", question: "Complete (conditional): じかんが ___、いきません。", answers: [
        { option: "a", text: "なくたら" }, { option: "b", text: "ないたら" },
        { option: "c", text: "なかろう" }, { option: "d", text: "なかったら" },
    ], correct_answer: "d" },

    // ---------- counters, dates & polite phrases ----------
    { number: "1253", question: "What does 「一回」 (いっかい) mean?", answers: [
        { option: "a", text: "once / one time" }, { option: "b", text: "first floor" },
        { option: "c", text: "one person" }, { option: "d", text: "one piece" },
    ], correct_answer: "a" },
    { number: "1254", question: "「二十日」 (はつか) is which day of the month?", answers: [
        { option: "a", text: "the 2nd" }, { option: "b", text: "the 12th" },
        { option: "c", text: "the 20th" }, { option: "d", text: "the 22nd" },
    ], correct_answer: "c" },
    { number: "1255", question: "How do you read 「千円」?", answers: [
        { option: "a", text: "せんえん" }, { option: "b", text: "せんまんえん" },
        { option: "c", text: "まんえん" }, { option: "d", text: "ひゃくえん" },
    ], correct_answer: "a" },
    { number: "1256", question: "You say 「おだいじに」 to someone who is…", answers: [
        { option: "a", text: "getting married" }, { option: "b", text: "sick or injured" },
        { option: "c", text: "starting a trip" }, { option: "d", text: "taking an exam" },
    ], correct_answer: "b" },
    { number: "1257", question: "When do you say 「おつかれさまでした」?", answers: [
        { option: "a", text: "before starting work" }, { option: "b", text: "when waking up" },
        { option: "c", text: "before a meal" }, { option: "d", text: "when finishing work together" },
    ], correct_answer: "d" },
    { number: "1258", question: "What does 「おまたせしました」 mean?", answers: [
        { option: "a", text: "Sorry to keep you waiting" }, { option: "b", text: "Please wait a moment" },
        { option: "c", text: "I'm running late" }, { option: "d", text: "Thanks for coming" },
    ], correct_answer: "a" },
    { number: "1259", question: "A waiter takes your order and says:", answers: [
        { option: "a", text: "おかまいなく" }, { option: "b", text: "かしこまりました" },
        { option: "c", text: "ごめんください" }, { option: "d", text: "しつれいしました" },
    ], correct_answer: "b" },
    { number: "1260", question: "What does 「ひさしぶり」 mean?", answers: [
        { option: "a", text: "see you soon" }, { option: "b", text: "take care" },
        { option: "c", text: "long time no see" }, { option: "d", text: "nice to meet you" },
    ], correct_answer: "c" },
];
