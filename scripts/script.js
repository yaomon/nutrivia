(function ($) {
    "use strict";
    let curr_ques;
    let missed_ques = [];
    let missed_ques_counter = 0;
    let answered_ques = new Set([]);
    let total_ques = domain1_answers.length;
    let num_corr = 0;
    let num_incorr = 0;
    // Function to get a random integer within a range
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function updateQuestion() {
        missed_ques_counter++;
        // Every 5 questions, try to re-ask a missed question
        // Get a random index within the array length
        let randomIndex = getRandomInt(0, domain1_answers.length - 1);
        if (missed_ques_counter > 4) {
            missed_ques_counter = 0;
            if (missed_ques.length > 0) {
                // Override the index with one of the missed questions
                const randomMissedQuesIndex = getRandomInt(
                    0,
                    missed_ques.length - 1
                );
                // Remove the missed question from the array
                randomIndex = parseInt(missed_ques[randomMissedQuesIndex]);
                missed_ques.splice(randomMissedQuesIndex, 1);
            }
        }

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
        $(".choice").removeClass("disabled");
    }

    function guessAnswer() {
        $(".choice").addClass("disabled");
        let guess = $(this).find(".choice-let").text();
        let ques_number = curr_ques.number;
        answered_ques.add(ques_number);
        $(".question-frac").text(answered_ques.size + "/" + total_ques);
        if (guess !== curr_ques.correct_answer) {
            // Incorrect
            $(this).addClass("incorrect");
            num_incorr++;
            $(".incorrect-num").text(num_incorr);
            // Add the missed question to the missed questions
            // Subtract 1 to convert to 0 based index
            missed_ques.push(ques_number - 1);
            missed_ques.push(ques_number - 1);
        } else {
            // Correct
            num_corr++;
            $(".correct-num").text(num_corr);
        }
        // Set correct percent and color
        let perc = num_corr / (num_corr + num_incorr);
        $(".stat-perc").text(Math.round(perc * 100) + "%");

        let r = Math.round(200 * (1 - perc) + 0 * perc);
        let g = Math.round(0 * (1 - perc) + 200 * perc);
        let b = Math.round(42 * (1 - perc) + 52 * perc);
        $(".stat-perc").css(
            "background-image",
            "-webkit-linear-gradient(45deg, rgba(" +
                (r - 10) +
                ", " +
                (g - 10) +
                ", " +
                b +
                ", 0.9), rgba(" +
                (r + 10) +
                ", " +
                (g + 10) +
                ", " +
                b +
                ", 0.9))"
        );
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
        $(".question-frac").text(answered_ques.size + "/" + total_ques);
        updateQuestion();
        $(".skip").click(updateQuestion);
        $(".choice").click(guessAnswer);
    });
})(jQuery);
