(function ($) {
    "use strict";
    let curr_ques;
    let total_ques = domain1_questions.length;

    let saveObj = {
        missed_ques: [],
        not_answered_ques: [],
        answered_ques: [],
        num_corr: 0,
        num_incorr: 0,
        streak: 0,
    };

    let rarities_arr = [
        "Inedible",
        "Unappetizing",
        "Tasty",
        "Savory",
        "Delicious",
        "Gourmet",
        "Decadent",
        "Divine",
    ];

    function saveStorage() {
        localStorage.setItem("data", JSON.stringify(saveObj));
    }

    function loadStorage() {
        let storage = localStorage.getItem("data");
        if (storage !== null) {
            saveObj = JSON.parse(storage);
        } else {
            saveStorage();
        }
        updateStats();
    }

    function clearStorage() {
        if (
            confirm(
                "Are you sure you want to reset your stats, streak, and question progress?"
            )
        ) {
            localStorage.removeItem("data");
            saveObj = {
                missed_ques: [],
                not_answered_ques: [],
                answered_ques: [],
                num_corr: 0,
                num_incorr: 0,
                streak: 0,
            };
            updateStats();
        }
    }

    // Function to get a random integer within a range
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function updateStats(correct) {
        $(".question-frac").text(
            saveObj.answered_ques.length + "/" + total_ques
        );
        $(".incorrect-num").text(saveObj.num_incorr);
        $(".correct-num").text(saveObj.num_corr);
        $(".pulse").text("🔥 " + saveObj.streak);

        // Set correct percent and color
        let perc = saveObj.num_corr / (saveObj.num_corr + saveObj.num_incorr);
        if (saveObj.num_corr === 0) {
            perc = 0;
        }
        // Lerp toward new percentage
        $({ percent: parseInt($(".stat-perc").text()) }).animate(
            { percent: Math.round(perc * 100) },
            {
                duration: 300,
                easing: "easeOutQuad",
                step: function (now) {
                    $(".stat-perc").text(Math.floor(now) + "%");
                },
            }
        );
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

        // Update streak color
        // Set saveObj.streak test and color
        perc = Math.min(saveObj.streak / 10, 1.0);

        if (correct) {
            // Set pulse anim based on saveObj.streak
            let minDuration = 0.1; // Minimum duration in seconds
            let maxDuration = 1.0; // Maximum duration in seconds
            let animationDuration =
                minDuration + (maxDuration - minDuration) * (1.1 - perc);

            $(".pulse").css({
                animationDuration: animationDuration + "s",
            });
        }

        r = Math.round(0 * (1 - perc) + 255 * perc);
        g = Math.round(40 * (1 - perc) + 50 * perc);
        b = Math.round(42 * (1 - perc) + 52 * perc);
        let scale = 1 + 0.05 + saveObj.streak * 0.05;
        let $streak = $(".streak");

        $streak.css(
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
        $streak.css({
            transform: "scale(" + scale + ")",
            transition: "transform 0.01s",
        });
        // Revert the scaling effect after a short delay
        setTimeout(function () {
            $streak.css({
                transform: "scale(1)",
                transition: "transform 0.1s",
            });
        }, 50);
    }

    function updateQuestion() {
        saveObj.missed_ques_counter++;
        // Every 5 questions, try to re-ask a missed question
        // Get a random index within the array length
        if (saveObj.not_answered_ques.length <= 0) {
            loadUnasweredQuesetions();
        }
        let randomIndex = getRandomInt(0, saveObj.not_answered_ques.length);
        if (saveObj.missed_ques_counter > 4) {
            saveObj.missed_ques_counter = 0;
            if (saveObj.missed_ques.length > 0) {
                // Override the index with one of the missed questions
                const randomMissedQuesIndex = getRandomInt(
                    0,
                    saveObj.missed_ques.length - 1
                );
                // Remove the missed question from the array
                randomIndex = parseInt(
                    saveObj.missed_ques[randomMissedQuesIndex]
                );
                saveObj.missed_ques.splice(randomMissedQuesIndex, 1);
            }
        }

        // Retrieve the random object
        const randomQuestion = saveObj.not_answered_ques[randomIndex];

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
        saveStorage();
    }

    function guessAnswer() {
        $(".choice").addClass("disabled");
        let guess = $(this).find(".choice-let").text();
        let ques_number = curr_ques.number;

        // Remove answered questions
        if (!saveObj.answered_ques.includes(ques_number)) {
            // Only add if not already in, can't use set becaue of localStorage
            saveObj.answered_ques.push(ques_number);
        }

        saveObj.not_answered_ques.splice(
            saveObj.not_answered_ques.indexOf(curr_ques),
            1
        );

        if (guess !== curr_ques.correct_answer) {
            // Incorrect
            $(this).addClass("incorrect");
            saveObj.streak = 0;
            $(".pulse").css({
                animationDuration: "0s",
            });
            saveObj.num_incorr++;
            // Add the missed question to the missed questions
            // Subtract 1 to convert to 0 based index
            saveObj.missed_ques.push(ques_number - 1);
            saveObj.missed_ques.push(ques_number - 1);
        } else {
            // Correct
            saveObj.streak++;
            saveObj.num_corr++;
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
        saveStorage();
        updateStats(guess === curr_ques.correct_answer);
    }

    function loadUnasweredQuesetions() {
        for (let i = 0; i < domain1_questions.length; i++) {
            saveObj.not_answered_ques[i] = domain1_questions[i];
        }
    }

    function setupFireworkOnClick() {
        $(".choice").click(function (e) {
            let $choice = $(this);
            $choice.css({
                transform: "scale(0.95)",
                transition: "transform 0.01s",
            });
            // Revert the scaling effect after a short delay
            setTimeout(function () {
                $choice.removeAttr("style");
            }, 50);
            // Create and append the firework div
            var $div = $("<div class='firework'></div>")
                .css({
                    left: e.pageX + "px",
                    top: e.pageY + "px",
                    position: "absolute",
                })
                .appendTo("body");

            var maxElems = 16;
            for (let i = 0; i < maxElems; i++) {
                // Create and append span elements
                var deg = i * (360 / maxElems) + Math.floor(Math.random() * 15);
                var height = 20 + Math.floor(Math.random() * 40);
                var width = 4 + Math.floor(Math.random() * 20);

                $("<span class='fire-span'></span>")
                    .css({
                        height: height + "px",
                        width: width + "px",
                        transform: "rotate(" + deg + "deg)",
                        position: "absolute",
                    })
                    .appendTo($div);
            }

            // Use requestAnimationFrame to ensure the initial styles are applied
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    // Apply transformation and opacity changes
                    $div.find("span").each(function () {
                        var trasY = -50 - Math.floor(Math.random() * 100);
                        $(this).css({
                            transform:
                                $(this).css("transform") +
                                " scaleY(0.5) translateY(" +
                                trasY +
                                "px)",
                            opacity: "0",
                            transition: "transform 0.4s, opacity 0.4s",
                        });
                    });

                    // Remove the firework div after the animation
                    setTimeout(function () {
                        $div.remove();
                    }, 400);
                });
            });
        });
    }

    $(document).ready(function () {
        // Code to run when the document is ready
        loadUnasweredQuesetions();
        loadStorage();
        $(".question-frac").text(
            saveObj.answered_ques.length + "/" + total_ques
        );
        updateQuestion();
        $("#skip").click(updateQuestion);
        $("#reset").click(clearStorage);
        $(".choice").click(guessAnswer);

        setupFireworkOnClick();
    });
})(jQuery);

$.extend($.easing, {
    easeOutQuad: function (x) {
        return 1 - (1 - x) * (1 - x);
    },
});
