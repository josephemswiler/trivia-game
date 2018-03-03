(function () {

    // let breweries = [
    //      "Jester King Brewery",
    //     "Oddwood Ales",
    //     "Celis Brewery",
    //      "(512) Brewing Company",
    //     "St. Elmo Brewing Co.",
    //     "Draught House Pub & Brewery",
    //      "Austin Beerworks",
    //      "Adelbert's Brewery",
    //      "Pinthouse Pizza Craft Brewpub",
    //      "Hops and Grain Brewery",
    //     "Oasis Texas Brewing Company",
    //      "Lazarus Brewing Company",
    //     "North by Northwest Restaurant & Brewery",
    //     "Last Stand Brewing Company",
    //      "Blue Owl Brewing",
    //     "Black Star Co-op Pub & Brewery",
    //      "Hi Sign Brewing",
    //      "Friends & Allies Brewing",
    //      "Zilker Brewing Co.",
    //      "Austin Beer Garden Brewing Co.",
    //     "Independence Brewing Co.",
    //     "4th Tap Brewing Co-op",
    //     "Southern Heights Brewing Company",
    //      "Uncle Billy's Brew & Que",
    //     "Circle Brewing Company",
    //     "Oskar Blues Brewery",
    //     "Infamous Brewing Company",
    //     "Naughty Brewing Co.",
    //     "South Austin Brewery",
    //     "Resignation Brewery",
    //     "Thirsty Planet Brewing Company",
    //     "Guns & Oil Brewing Co."
    // ];

    let beerList = [
        ["Heisenberg", "Kristalweizen", "4.80%", "Austin Beerworks"],
        ["Black Metal", "Imperial Stout", "9.10%", "Jester King Brewery"],
        ["Electric Jellyfish", "IPA", "6.50%", "Pinthouse Pizza Craft Brewpub"],
        ["Cluster F#*k", "IPA", "6.00%", "Uncle Billy's Brew & Que"],
        ["40 Days & 40 Nights", "IPA", "7.50%", "Lazarus Brewing Company"],
        ["The One They Call Zoe", "Pale Lager", "5.10%", "Hops and Grain Brewery"],
        ["Naked Nun", "Wit", "5.80%", "Adelbert's Brewery"],
        ["Pecan Porter", "Porter", "6.80%", "(512) Brewing Company"],
        ["Spirit Animal", "Sour Pale Ale", "5.10%", "Blue Owl Brewing"],
        ["Parks & Rec", "Pale Ale", "5.60%", "Zilker Brewing Co."],
        ["Hell Yes", "Munich Helles Lager", "4.50%", "Austin Beer Garden Brewing Co."],
        ["Omg, Omg, Omg, Like, Seriously", "IPA", "6.70%", "Hi Sign Brewing"],
        ["The Noisy Cricket", "IPA", "4.70%", "Friends & Allies Brewing"],
        ["Thirsty Goat", "Amber Ale", "6.5%", "Thirsty Planet Brewing Company"]
    ];

    var allBreweries = [];
    var answers = [];
    var choices = [];
    var currentBeer = [];
    var correctCount = 0;
    var qIndex = 0;
    var qCount = 1;
    var guessMade = false;
    var qList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //total number of questions
    var intervalId;
    var timerOn = false;
    var delayQ;

    function fisherYates(arr) {
        var index = arr.length;
        var tempVal;
        var randIndex;

        while (0 !== index) {

            randIndex = Math.floor(Math.random() * index);

            index -= 1;

            // And swap it with the current element.
            tempVal = arr[index];

            arr[index] = arr[randIndex];

            arr[randIndex] = tempVal;
        }

        return arr;
    }

    function createQuestion() {

        allBreweries = [];

        beerList = fisherYates(beerList);

        for (var i = 0; i < beerList.length; i++) {

            allBreweries.push(beerList[i][3])
        } // /for loop

        allBreweries = fisherYates(allBreweries);

        $('.title').css({
                'display': 'none'
            })
            .html('Question <sup>#</sup><span class="q-number">' + qCount + '</span>')
            .fadeIn('slow');

        for (var j = 0; j < qList.length; j++) {

            allBreweries = fisherYates(allBreweries);

            answers.push(allBreweries.splice(0, 1).join(''));

            //add correct answer to choices
            choices.push(answers[j])

            //add remaining 3 incorrect choices
            for (var l = 0; l < 3; l++) {

                choices.push(allBreweries[l])
            }

            choices = fisherYates(choices);

            //push array of correct choice values 
            for (var m = 0; m < beerList.length; m++) {

                if (answers[j] === beerList[m][3]) {

                    currentBeer.push(beerList[m]);
                }
            }

            //add choices in random order to each button
            for (var k = j + 1; k < qList.length; k++) {
                $('.q' + k + '-c1').text(choices[0]);
                $('.q' + k + '-c2').text(choices[1]);
                $('.q' + k + '-c3').text(choices[2]);
                $('.q' + k + '-c4').text(choices[3]);
                $('.q' + k + '-beer').text(currentBeer[j][0])
                $('.q' + k + '-style').text(currentBeer[j][1])
                $('.q' + k + '-abv').text(currentBeer[j][2])
            }

            choices = [];
        }
    } // /createQuestion

    function check(btn) {

        guessMade = true;

        qTimer.stop();

        $('.q' + qCount + '-lead').html("<span class='guess-beer'>" + currentBeer[qIndex][0] + "</span>" + " is brewed by <span class='guess-stat'>" + currentBeer[qIndex][3] + "</span> in beautiful Austin, TX!");

        if (btn === "time out") {

            $('.q' + qCount + '-beer').text("Time's Up!").css({
                "color": "#e74c3c"
            })
        } else if (btn.text() === answers[qIndex]) {

            correctCount++;

            $('.q' + qCount + '-beer').text("Correct!").css({
                "color": "#2ecc71"
            })

            btn.removeClass('btn-light').addClass('btn-success');
        } else {

            $('.q' + qCount + '-beer').text("Incorrect!").css({
                "color": "#e74c3c"
            })

            btn.removeClass('btn-light').addClass('btn-secondary');
        }

        for (var n = 1; n < 5; n++) {
            if ($('.q' + qCount + '-c' + n).text() === answers[qIndex]) {
                $('.q' + qCount + '-c' + n).removeClass('btn-light').addClass('btn-success');
            }
        }

        $('.q' + qCount + '-ask').html("Current score: <span class='guess-stat'>" + (Math.floor((correctCount / qCount) * 100)) + "% </span>");

        qIndex++;

        qCount++;

        if (qCount > 10) {
            end();
        } else {
            nextQ();
        }
    } // /check

    function end() {
        $('.correct-guesses').text(correctCount);

        $('.conclusion').css({
            'display': 'flex'
        })

        delayQ = setTimeout(function () {

            qTimer.reset();

            qTimer.stop();

            $('.title').text("Done");

            $('.timer').hide();

            $('.replay').fadeIn('slow');

            $('html, body').animate({
                scrollTop: ($('.conclusion').offset().top)
            }, 500);
        }, 2000);

    }

    function nextQ() {
        delayQ = setTimeout(function () {

            qTimer.reset();

            qTimer.stop();

            $('.title').html('Question <sup>#</sup><span class="q-number">' + qCount + '</span>');

            $('.q' + qCount).slideDown("slow", function () {

                $('html, body').animate({
                    scrollTop: ($(this).offset().top)
                }, 500);
            });

            qTimer.start();

            guessMade = false;
        }, 2000);
    } // /nextQ

    var qTimer = {

        time: 10,

        reset: function () {

            qTimer.time = 10;

            $('.timer').text(qTimer.time)
        },

        start: function () {

            $('.timer').removeClass('btn-secondary').addClass('btn-outline-light');

            if (!timerOn) {

                intervalId = setInterval(qTimer.count, 1000);

                timerOn = true;
            }
        },
        stop: function () {

            clearInterval(intervalId);

            timerOn = false;
        },

        count: function () {

            qTimer.time--

                var timeNow = qTimer.time;

            if (timeNow < 10) {

                timeNow = "0" + timeNow;
            }

            $('.timer').text(timeNow);

            if (qTimer.time === 0) {

                qTimer.stop();

                $('.timer').removeClass('btn-outline-light').addClass('btn-secondary');

                check("time out");
            }
        }
    }; // /qTimer

    function startGame(e) {

        if (allBreweries.length < 4) {

            createQuestion();
        }

        $('.q' + qCount).slideDown("slow", function () {

            $('html, body').animate({
                scrollTop: ($(this).offset().top)
            }, 500);
        });

        qTimer.reset();

        $('.timer').fadeIn('slow');

        qTimer.start();

        e.hide();
    } // /startGame

    $('.timer').click(function () {

        if (!timerOn) {

            qTimer.start();
        } else {

            qTimer.stop();
        }
    })

    $('.play-game').click(function () {

        startGame($(this));
    }) // /click .play-game

    $('.guess-btn').click(function (event) {

        event.preventDefault();

        if (!guessMade) {

            check($(this));
        }
    }); // /click .guess-btn

    $('.replay').click(function () {

        $('html, body').animate({

            scrollTop: 0
        }, 500, function () {
            delayQ = setTimeout(function () {

                location.reload();
            }, 500);

        });
    })

})() //function