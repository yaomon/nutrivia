(function ($) {
    "use strict";
    let curr_ques;
    let total_ques = domain1_questions.length;

    let save_objs = {
        missed_ques: [],
        not_answered_ques: [],
        answered_ques: [],
        num_corr: 0,
        num_incorr: 0,
        streak: 0,
        collected_items: [],
        not_collected_items: [],
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

    let unusual_fx = ["Old-Timey", "Dark", "Blurry", "Fiery", "Icy"];

    function saveStorage() {
        localStorage.setItem("data", JSON.stringify(save_objs));
    }

    function loadStorage() {
        let storage = localStorage.getItem("data");
        if (storage !== null) {
            save_objs = JSON.parse(storage);
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
            save_objs = {
                missed_ques: [],
                not_answered_ques: [],
                answered_ques: [],
                num_corr: 0,
                num_incorr: 0,
                streak: 0,
                not_collected_items: [],
            };
            updateStats();
            updateQuestion();
        }
    }

    // Function to get a random integer within a range
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function updateStats(correct) {
        $(".question-frac").text(
            save_objs.answered_ques.length + "/" + total_ques
        );
        $(".incorrect-num").text(save_objs.num_incorr);
        $(".correct-num").text(save_objs.num_corr);
        $(".pulse").text("🔥 " + save_objs.streak);

        // Set correct percent and color
        let perc =
            save_objs.num_corr / (save_objs.num_corr + save_objs.num_incorr);
        if (save_objs.num_corr === 0) {
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
        // Set save_objs.streak test and color
        perc = Math.min(save_objs.streak / 10, 1.0);

        if (correct) {
            // Set pulse anim based on save_objs.streak
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
        let scale = 1 + 0.05 + save_objs.streak * 0.05;
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
        save_objs.missed_ques_counter++;
        // Every 5 questions, try to re-ask a missed question
        // Get a random index within the array length
        if (save_objs.not_answered_ques.length <= 0) {
            loadUnasweredQuesAndRewards();
        }
        let random_index = getRandomInt(0, save_objs.not_answered_ques.length);
        if (save_objs.missed_ques_counter > 4) {
            save_objs.missed_ques_counter = 0;
            if (save_objs.missed_ques.length > 0) {
                // Override the index with one of the missed questions
                const randomMissedQuesIndex = getRandomInt(
                    0,
                    save_objs.missed_ques.length - 1
                );
                // Remove the missed question from the array
                random_index = parseInt(
                    save_objs.missed_ques[randomMissedQuesIndex]
                );
                save_objs.missed_ques.splice(randomMissedQuesIndex, 1);
            }
        }

        // Retrieve the random object
        const randomQuestion = save_objs.not_answered_ques[random_index];

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
        if (!save_objs.answered_ques.includes(ques_number)) {
            // Only add if not already in, can't use set becaue of localStorage
            save_objs.answered_ques.push(ques_number);
        }

        save_objs.not_answered_ques.splice(
            save_objs.not_answered_ques.indexOf(curr_ques),
            1
        );

        if (guess !== curr_ques.correct_answer) {
            // Incorrect
            $(this).addClass("incorrect");
            save_objs.streak = 0;
            $(".pulse").css({
                animationDuration: "0s",
            });
            save_objs.num_incorr++;
            // Add the missed question to the missed questions
            // Subtract 1 to convert to 0 based index
            save_objs.missed_ques.push(ques_number - 1);
            save_objs.missed_ques.push(ques_number - 1);
        } else {
            // Correct
            save_objs.streak++;
            save_objs.num_corr++;
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
        giveReward();
    }

    function loadUnasweredQuesAndRewards() {
        for (let i = 0; i < domain1_questions.length; i++) {
            save_objs.not_answered_ques[i] = domain1_questions[i];
        }
        for (let i = 0; i < foods.length; i++) {
            save_objs.not_collected_items[i] = foods[i];
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

    function giveReward() {
        let random_index = getRandomInt(
            0,
            save_objs.not_collected_items.length
        );
        let selected_item = save_objs.not_collected_items[random_index];
        $(".reward-pic-src").attr("src", "images/food/" + selected_item.name);
        $(".reward-name").text(selected_item.displayName);
        $(".reward-rarity").text(rarities_arr[selected_item.rarity]);
        $(".reward-desc").text(selected_item.description);
        $(".reward-next").text(
            [
                "Woo!",
                "Sweet!",
                "Nice!",
                "Awesome!",
                "Wow!",
                "Spectacular",
                "Wonderful!",
            ][Math.floor(Math.random() * 7)]
        );
        $(".reward").css("display", "flex");
        $(".reward-name").removeClass("inedible");
        $(".reward-rarity").removeClass("inedible");
        $(".reward-name").removeClass("tasty");
        $(".reward-rarity").removeClass("tasty");
        $(".reward-name").removeClass("savory");
        $(".reward-rarity").removeClass("savory");
        $(".reward-name").removeClass("delicious");
        $(".reward-rarity").removeClass("delicious");
        $(".reward-name").removeClass("gourmet");
        $(".reward-rarity").removeClass("gourmet");
        $(".reward-name").removeClass("decadent");
        $(".reward-rarity").removeClass("decadent");
        $(".reward-name").removeClass("divine");
        $(".reward-rarity").removeClass("divine");
        switch (selected_item.rarity) {
            case 0:
                $(".reward-name").addClass("inedible");
                $(".reward-rarity").addClass("inedible");
                break;
            case 2:
                $(".reward-name").addClass("tasty");
                $(".reward-rarity").addClass("tasty");
                break;
            case 3:
                $(".reward-name").addClass("savory");
                $(".reward-rarity").addClass("savory");
                break;
            case 4:
                $(".reward-name").addClass("delicious");
                $(".reward-rarity").addClass("delicious");
                break;
            case 5:
                $(".reward-name").addClass("gourmet");
                $(".reward-rarity").addClass("gourmet");
                break;
            case 6:
                $(".reward-name").addClass("decadent");
                $(".reward-rarity").addClass("decadent");
                break;
            case 7:
                $(".reward-name").addClass("divine");
                $(".reward-rarity").addClass("divine");
                break;
        }
    }

    function hideReward() {
        $(".reward").css("display", "none");
    }

    $(document).ready(function () {
        // Code to run when the document is ready
        loadUnasweredQuesAndRewards();
        loadStorage();
        $(".question-frac").text(
            save_objs.answered_ques.length + "/" + total_ques
        );
        updateQuestion();
        $("#skip").click(updateQuestion);
        $("#reset").click(clearStorage);
        $(".choice").click(guessAnswer);
        $(".reward-next").click(hideReward);
        setupFireworkOnClick();
    });
})(jQuery);

$.extend($.easing, {
    easeOutQuad: function (x) {
        return 1 - (1 - x) * (1 - x);
    },
});
