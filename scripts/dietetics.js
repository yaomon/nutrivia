// Dietetics / Registered Dietitian exam-style question bank — nutrition
// science, medical nutrition therapy, the life cycle, and food science.
// Numbers 2001+ so they never collide with the other banks.
const dietetics_questions = [
    // ---------- macronutrients & energy ----------
    { number: "2001", question: "How many kilocalories does one gram of dietary fat provide?", answers: [
        { option: "a", text: "4 kcal" }, { option: "b", text: "7 kcal" },
        { option: "c", text: "2 kcal" }, { option: "d", text: "9 kcal" },
    ], correct_answer: "d" },
    { number: "2002", question: "How many kilocalories are in one gram of carbohydrate?", answers: [
        { option: "a", text: "4 kcal" }, { option: "b", text: "9 kcal" },
        { option: "c", text: "7 kcal" }, { option: "d", text: "5 kcal" },
    ], correct_answer: "a" },
    { number: "2003", question: "How many kilocalories does one gram of alcohol provide?", answers: [
        { option: "a", text: "4 kcal" }, { option: "b", text: "7 kcal" },
        { option: "c", text: "9 kcal" }, { option: "d", text: "0 kcal" },
    ], correct_answer: "b" },
    { number: "2004", question: "Which of these is an essential fatty acid?", answers: [
        { option: "a", text: "Oleic acid" }, { option: "b", text: "Palmitic acid" },
        { option: "c", text: "Linoleic acid" }, { option: "d", text: "Stearic acid" },
    ], correct_answer: "c" },
    { number: "2005", question: "Which amino acid is NOT considered essential for adults?", answers: [
        { option: "a", text: "Leucine" }, { option: "b", text: "Alanine" },
        { option: "c", text: "Lysine" }, { option: "d", text: "Valine" },
    ], correct_answer: "b" },
    { number: "2006", question: "A food described as a 'complete protein' contains:", answers: [
        { option: "a", text: "all nine essential amino acids in adequate amounts" }, { option: "b", text: "only plant-based amino acids" },
        { option: "c", text: "no cholesterol" }, { option: "d", text: "all twenty amino acids and fiber" },
    ], correct_answer: "a" },
    { number: "2007", question: "The primary storage form of glucose in the human liver and muscle is:", answers: [
        { option: "a", text: "Starch" }, { option: "b", text: "Triglyceride" },
        { option: "c", text: "Cellulose" }, { option: "d", text: "Glycogen" },
    ], correct_answer: "d" },
    { number: "2008", question: "Which type of fiber is known for lowering blood cholesterol and is found in oats and legumes?", answers: [
        { option: "a", text: "Insoluble fiber" }, { option: "b", text: "Lignin" },
        { option: "c", text: "Soluble fiber" }, { option: "d", text: "Cellulose" },
    ], correct_answer: "c" },
    { number: "2009", question: "Which lipoprotein is primarily responsible for carrying cholesterol from tissues back to the liver?", answers: [
        { option: "a", text: "LDL" }, { option: "b", text: "VLDL" },
        { option: "c", text: "Chylomicron" }, { option: "d", text: "HDL" },
    ], correct_answer: "d" },
    { number: "2010", question: "The Acceptable Macronutrient Distribution Range (AMDR) for carbohydrate is what percent of total calories?", answers: [
        { option: "a", text: "45–65%" }, { option: "b", text: "10–35%" },
        { option: "c", text: "20–35%" }, { option: "d", text: "60–80%" },
    ], correct_answer: "a" },

    // ---------- vitamins ----------
    { number: "2011", question: "Which vitamin deficiency causes scurvy?", answers: [
        { option: "a", text: "Vitamin A" }, { option: "b", text: "Vitamin C" },
        { option: "c", text: "Vitamin D" }, { option: "d", text: "Niacin" },
    ], correct_answer: "b" },
    { number: "2012", question: "A deficiency of niacin (vitamin B3) causes which disease?", answers: [
        { option: "a", text: "Beriberi" }, { option: "b", text: "Rickets" },
        { option: "c", text: "Pellagra" }, { option: "d", text: "Scurvy" },
    ], correct_answer: "c" },
    { number: "2013", question: "Which vitamin is required for the synthesis of clotting factors and is given to newborns?", answers: [
        { option: "a", text: "Vitamin K" }, { option: "b", text: "Vitamin E" },
        { option: "c", text: "Vitamin C" }, { option: "d", text: "Folate" },
    ], correct_answer: "a" },
    { number: "2014", question: "Thiamin (vitamin B1) deficiency classically leads to:", answers: [
        { option: "a", text: "Pellagra" }, { option: "b", text: "Night blindness" },
        { option: "c", text: "Goiter" }, { option: "d", text: "Beriberi" },
    ], correct_answer: "d" },
    { number: "2015", question: "Which vitamin, along with folate, is needed for red blood cell formation and is found almost exclusively in animal foods?", answers: [
        { option: "a", text: "Vitamin B6" }, { option: "b", text: "Vitamin C" },
        { option: "c", text: "Vitamin B12" }, { option: "d", text: "Biotin" },
    ], correct_answer: "c" },
    { number: "2016", question: "Deficiency of which vitamin during pregnancy increases the risk of neural tube defects?", answers: [
        { option: "a", text: "Folate" }, { option: "b", text: "Vitamin A" },
        { option: "c", text: "Vitamin D" }, { option: "d", text: "Vitamin K" },
    ], correct_answer: "a" },
    { number: "2017", question: "Which vitamin is synthesized in the skin upon exposure to sunlight?", answers: [
        { option: "a", text: "Vitamin A" }, { option: "b", text: "Vitamin C" },
        { option: "c", text: "Vitamin D" }, { option: "d", text: "Vitamin B12" },
    ], correct_answer: "c" },
    { number: "2018", question: "Which of the following is a fat-soluble vitamin?", answers: [
        { option: "a", text: "Vitamin C" }, { option: "b", text: "Vitamin A" },
        { option: "c", text: "Thiamin" }, { option: "d", text: "Riboflavin" },
    ], correct_answer: "b" },
    { number: "2019", question: "Vitamin A deficiency is a leading cause of:", answers: [
        { option: "a", text: "Hair loss" }, { option: "b", text: "Preventable childhood blindness" },
        { option: "c", text: "Bleeding gums" }, { option: "d", text: "Muscle cramps" },
    ], correct_answer: "b" },
    { number: "2020", question: "Which vitamin functions primarily as a fat-soluble antioxidant protecting cell membranes?", answers: [
        { option: "a", text: "Vitamin E" }, { option: "b", text: "Vitamin K" },
        { option: "c", text: "Folate" }, { option: "d", text: "Vitamin B6" },
    ], correct_answer: "a" },

    // ---------- minerals ----------
    { number: "2021", question: "Which mineral is the primary component of hemoglobin and whose deficiency causes microcytic anemia?", answers: [
        { option: "a", text: "Calcium" }, { option: "b", text: "Magnesium" },
        { option: "c", text: "Zinc" }, { option: "d", text: "Iron" },
    ], correct_answer: "d" },
    { number: "2022", question: "A deficiency of iodine most directly causes:", answers: [
        { option: "a", text: "Goiter" }, { option: "b", text: "Anemia" },
        { option: "c", text: "Osteoporosis" }, { option: "d", text: "Rickets" },
    ], correct_answer: "a" },
    { number: "2023", question: "Which mineral is the most abundant in the human body, stored mainly in bones and teeth?", answers: [
        { option: "a", text: "Potassium" }, { option: "b", text: "Sodium" },
        { option: "c", text: "Iron" }, { option: "d", text: "Calcium" },
    ], correct_answer: "d" },
    { number: "2024", question: "Which mineral is the major intracellular cation and is important for nerve and muscle function?", answers: [
        { option: "a", text: "Sodium" }, { option: "b", text: "Potassium" },
        { option: "c", text: "Chloride" }, { option: "d", text: "Calcium" },
    ], correct_answer: "b" },
    { number: "2025", question: "Heme iron, which is better absorbed than non-heme iron, is found in:", answers: [
        { option: "a", text: "Spinach and lentils" }, { option: "b", text: "Fortified cereals" },
        { option: "c", text: "Meat, poultry, and fish" }, { option: "d", text: "Whole grains" },
    ], correct_answer: "c" },
    { number: "2026", question: "Which nutrient enhances the absorption of non-heme iron when consumed in the same meal?", answers: [
        { option: "a", text: "Tannins" }, { option: "b", text: "Calcium" },
        { option: "c", text: "Fiber" }, { option: "d", text: "Vitamin C" },
    ], correct_answer: "d" },
    { number: "2027", question: "The main electrolyte associated with hypertension when consumed in excess is:", answers: [
        { option: "a", text: "Potassium" }, { option: "b", text: "Sodium" },
        { option: "c", text: "Magnesium" }, { option: "d", text: "Calcium" },
    ], correct_answer: "b" },
    { number: "2028", question: "Which trace mineral is a component of many enzymes and is important for wound healing and immune function?", answers: [
        { option: "a", text: "Zinc" }, { option: "b", text: "Selenium" },
        { option: "c", text: "Copper" }, { option: "d", text: "Fluoride" },
    ], correct_answer: "a" },

    // ---------- medical nutrition therapy ----------
    { number: "2029", question: "For a patient with celiac disease, which grain must be strictly avoided?", answers: [
        { option: "a", text: "Rice" }, { option: "b", text: "Corn" },
        { option: "c", text: "Wheat" }, { option: "d", text: "Quinoa" },
    ], correct_answer: "c" },
    { number: "2030", question: "The primary dietary approach recommended to manage hypertension is the:", answers: [
        { option: "a", text: "Ketogenic diet" }, { option: "b", text: "Low-residue diet" },
        { option: "c", text: "Gluten-free diet" }, { option: "d", text: "DASH diet" },
    ], correct_answer: "d" },
    { number: "2031", question: "A patient with chronic kidney disease not on dialysis often needs restriction of which nutrient?", answers: [
        { option: "a", text: "Carbohydrate" }, { option: "b", text: "Vitamin C" },
        { option: "c", text: "Fiber" }, { option: "d", text: "Phosphorus" },
    ], correct_answer: "d" },
    { number: "2032", question: "Which measure best reflects the effect of a food on blood glucose levels?", answers: [
        { option: "a", text: "Glycemic index" }, { option: "b", text: "Caloric density" },
        { option: "c", text: "Satiety index" }, { option: "d", text: "Nitrogen balance" },
    ], correct_answer: "a" },
    { number: "2033", question: "For a patient with lactose intolerance, which food is most likely to be tolerated?", answers: [
        { option: "a", text: "Fresh milk" }, { option: "b", text: "Ice cream" },
        { option: "c", text: "Sweetened condensed milk" }, { option: "d", text: "Aged hard cheese" },
    ], correct_answer: "d" },
    { number: "2034", question: "Which diet is the cornerstone of treatment for phenylketonuria (PKU)?", answers: [
        { option: "a", text: "Low-phenylalanine diet" }, { option: "b", text: "Low-sodium diet" },
        { option: "c", text: "High-protein diet" }, { option: "d", text: "Gluten-free diet" },
    ], correct_answer: "a" },
    { number: "2035", question: "For a patient with dysphagia, a dietitian would most likely recommend:", answers: [
        { option: "a", text: "Extra crunchy foods" }, { option: "b", text: "Thin liquids only" },
        { option: "c", text: "Texture-modified (thickened) foods and liquids" }, { option: "d", text: "A clear liquid diet indefinitely" },
    ], correct_answer: "c" },
    { number: "2036", question: "Which feeding route is preferred when a patient has a functioning GI tract but cannot eat by mouth?", answers: [
        { option: "a", text: "Parenteral (IV) nutrition" }, { option: "b", text: "Enteral (tube) feeding" },
        { option: "c", text: "Withholding all nutrition" }, { option: "d", text: "Peripheral IV fluids only" },
    ], correct_answer: "b" },
    { number: "2037", question: "A renal patient on dialysis who develops high potassium (hyperkalemia) should limit:", answers: [
        { option: "a", text: "White rice and pasta" }, { option: "b", text: "Bananas, oranges, and potatoes" },
        { option: "c", text: "Egg whites" }, { option: "d", text: "Olive oil" },
    ], correct_answer: "b" },
    { number: "2038", question: "The recommended first-line treatment for a mild hypoglycemic episode in a conscious diabetic patient is:", answers: [
        { option: "a", text: "A high-fat meal" }, { option: "b", text: "15 grams of fast-acting carbohydrate" },
        { option: "c", text: "A protein shake" }, { option: "d", text: "Nothing by mouth" },
    ], correct_answer: "b" },

    // ---------- assessment & life cycle ----------
    { number: "2039", question: "A Body Mass Index (BMI) in the range of 25.0–29.9 is classified as:", answers: [
        { option: "a", text: "Normal weight" }, { option: "b", text: "Underweight" },
        { option: "c", text: "Overweight" }, { option: "d", text: "Obese, class I" },
    ], correct_answer: "c" },
    { number: "2040", question: "Which lab value is commonly used as a long-term marker of blood glucose control?", answers: [
        { option: "a", text: "Fasting glucose" }, { option: "b", text: "Blood urea nitrogen" },
        { option: "c", text: "Serum albumin" }, { option: "d", text: "Hemoglobin A1c" },
    ], correct_answer: "d" },
    { number: "2041", question: "The first step of the Nutrition Care Process is:", answers: [
        { option: "a", text: "Nutrition diagnosis" }, { option: "b", text: "Nutrition intervention" },
        { option: "c", text: "Nutrition assessment" }, { option: "d", text: "Monitoring and evaluation" },
    ], correct_answer: "c" },
    { number: "2042", question: "Exclusive breastfeeding is generally recommended for approximately the first:", answers: [
        { option: "a", text: "12 months of life" }, { option: "b", text: "2 weeks of life" },
        { option: "c", text: "2 years of life" }, { option: "d", text: "6 months of life" },
    ], correct_answer: "d" },
    { number: "2043", question: "Which nutrient has the most increased requirement during pregnancy to support increased blood volume and fetal growth?", answers: [
        { option: "a", text: "Vitamin C" }, { option: "b", text: "Iron" },
        { option: "c", text: "Vitamin K" }, { option: "d", text: "Sodium" },
    ], correct_answer: "b" },
    { number: "2044", question: "A 24-hour dietary recall is an example of a:", answers: [
        { option: "a", text: "Biochemical assessment" }, { option: "b", text: "Anthropometric measurement" },
        { option: "c", text: "Dietary intake assessment" }, { option: "d", text: "Clinical examination" },
    ], correct_answer: "c" },
    { number: "2045", question: "Waist circumference is used clinically as an indicator of:", answers: [
        { option: "a", text: "Bone density" }, { option: "b", text: "Visceral (abdominal) fat and cardiometabolic risk" },
        { option: "c", text: "Muscle mass" }, { option: "d", text: "Hydration status" },
    ], correct_answer: "b" },
    { number: "2046", question: "Older adults are at increased risk of deficiency of which vitamin due to reduced stomach acid and absorption?", answers: [
        { option: "a", text: "Vitamin B12" }, { option: "b", text: "Vitamin C" },
        { option: "c", text: "Thiamin" }, { option: "d", text: "Vitamin K" },
    ], correct_answer: "a" },

    // ---------- food science & safety ----------
    { number: "2047", question: "The temperature 'danger zone' in which bacteria multiply most rapidly is approximately:", answers: [
        { option: "a", text: "0–20°F (−18 to −7°C)" }, { option: "b", text: "40–140°F (4–60°C)" },
        { option: "c", text: "160–212°F (71–100°C)" }, { option: "d", text: "212–300°F (100–149°C)" },
    ], correct_answer: "b" },
    { number: "2048", question: "The process of heating milk to destroy pathogens without altering it substantially is called:", answers: [
        { option: "a", text: "Fermentation" }, { option: "b", text: "Homogenization" },
        { option: "c", text: "Pasteurization" }, { option: "d", text: "Irradiation" },
    ], correct_answer: "c" },
    { number: "2049", question: "The chemical reaction responsible for the browning of bread crust and seared meat is the:", answers: [
        { option: "a", text: "Maillard reaction" }, { option: "b", text: "Saponification" },
        { option: "c", text: "Gelatinization" }, { option: "d", text: "Denaturation" },
    ], correct_answer: "a" },
    { number: "2050", question: "Which pathogen is most commonly associated with undercooked poultry?", answers: [
        { option: "a", text: "Salmonella" }, { option: "b", text: "Norovirus" },
        { option: "c", text: "Hepatitis A" }, { option: "d", text: "Trichinella" },
    ], correct_answer: "a" },
    { number: "2051", question: "In HACCP food safety systems, a 'critical control point' is a step where a hazard can be:", answers: [
        { option: "a", text: "Ignored safely" }, { option: "b", text: "Prevented, eliminated, or reduced to a safe level" },
        { option: "c", text: "Only documented" }, { option: "d", text: "Added to the food" },
    ], correct_answer: "b" },
    { number: "2052", question: "The minimum internal cooking temperature generally recommended for ground beef is:", answers: [
        { option: "a", text: "125°F (52°C)" }, { option: "b", text: "145°F (63°C)" },
        { option: "c", text: "160°F (71°C)" }, { option: "d", text: "212°F (100°C)" },
    ], correct_answer: "c" },
];
