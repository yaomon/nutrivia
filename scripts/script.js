(function ($) {
    "use strict";
    let curr_ques;
    // Function to get a random integer within a range
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function updateQuestion() {
        // Get a random index within the array length
        const randomIndex = getRandomInt(0, domain1_answers.length - 1);
        // Retrieve the random object
        const randomQuestion = domain1_answers[randomIndex];
        curr_ques = randomQuestion;
        // Clear correct/incorrect
        $(".choice").removeClass("correct");
        $(".choice").removeClass("incorrect");
        // Update HTML elements with the random question
        $(".question").text(randomQuestion.question);
        $("#choice-1 .choice-val").text(randomQuestion.answers[0].text);
        $("#choice-2 .choice-val").text(randomQuestion.answers[1].text);
        $("#choice-3 .choice-val").text(randomQuestion.answers[2].text);
        $("#choice-4 .choice-val").text(randomQuestion.answers[3].text);
        $(".question-num").text(randomQuestion.number);
    }

    function guessAnswer() {
        let guess = $(this).find(".choice-let").text();
        if (guess !== curr_ques.correct_answer) {
            // Incorrect
            $(this).addClass("incorrect");
        }
        // Add correct answer
        switch (curr_ques.correct_answer) {
            case "a":
                $("#choice-1").addClass("correct");
                break;
            case "b":
                $("#choice-2").addClass("correct");
                break;
            case "c":
                $("#choice-3").addClass("correct");
                break;
            case "d":
                $("#choice-4").addClass("correct");
                break;
        }
    }

    $(document).ready(function () {
        // Code to run when the document is ready
        updateQuestion();
        $(".skip").click(updateQuestion);
        $(".choice").click(guessAnswer);
    });
})(jQuery);
