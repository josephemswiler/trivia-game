(function () {

    let breweries = [
        "Jester King Brewery",
        "Oddwood Ales",
        "Celis Brewery",
        "(512) Brewing Company",
        "St. Elmo Brewing Co.",
        "Draught House Pub & Brewery",
        "Austin Beerworks",
        "Adelbert's Brewery",
        "Pinthouse Pizza Craft Brewpub",
        "Hops and Grain Brewery",
        "Oasis Texas Brewing Company",
        "Lazarus Brewing Company",
        "North by Northwest Restaurant & Brewery",
        "Last Stand Brewing Company",
        "Blue Owl Brewing",
        "Black Star Co-op Pub & Brewery",
        "Hi Sign Brewing",
        "Friends & Allies Brewing",
        "Zilker Brewing Co.",
        "Austin Beer Garden Brewing Co.",
        "Independence Brewing Co.",
        "4th Tap Brewing Co-op",
        "Southern Heights Brewing Company",
        "Uncle Billy's Brew & Que",
        "Circle Brewing Company",
        "Oskar Blues Brewery",
        "Infamous Brewing Company",
        "Naughty Brewing Co.",
        "South Austin Brewery",
        "Resignation Brewery",
        "Thirsty Planet Brewing Company",
        "Guns & Oil Brewing Co."
    ];

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
        ["Omg, Omg, Omg, Like, Seriously", "IPA", "6.70%", "Hi Sign Brewing"]
    ]



    // function toggleColor() {
    //     $('.title-1')
    //         .animate({
    //             "color": "#757575"
    //         }, 1000)
    // }

    function Beer(name, style, abv, brewery) {
        this.name;
        this.style;
        this.abv;
        this.brewery;
    }

    var correctBeer = new Beer();
    var wrongOne = new Beer();
    var wrongTwo = new Beer();
    var wrongThree = new Beer();

    var wrongBreweries = [];
    var allBreweries = [];
    var answers = [];
    var beerClasses = [];
    var choices = [];
    var currentBeer = [];
    var correctCount = 0;
    var qIndex = 0;
    var qCount = 1;
    var guessMade = false;
    var qList = [0,1,2,3,4,5,6,7,8,9,10]; //total number of questions

    var answerQ1;
    var answerQ2;
    var answerQ3;
    var answerQ4;
    var answerQ5;
    var answerQ6;
    var answerQ7;
    var answerQ8;
    var answerQ9;
    var answerQ10;



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

        //var randBeer = beerList[Math.floor(Math.random() * beerList.length)]

        correctBeer.name = beerList[0][0];
        correctBeer.style = beerList[0][1];
        correctBeer.abv = beerList[0][2];
        correctBeer.brewery = beerList[0][3];
        // beerList.splice(0, 1)
        // allBreweries.push(correctBeer.brewery);

        for (var i = 0; i < beerList.length; i++) {

            allBreweries.push(beerList[i][3])

        } // /for loop

        allBreweries = fisherYates(allBreweries);


        $('.title').html('Question <sup>#</sup><span class="q-number">' + qCount + '</span>');
        $('.current-beer').text(correctBeer.name);

        // $('.q1-c1').text(allBreweries[0]);
        // $('.q1-c2').text(allBreweries[1]);
        // $('.q1-c3').text(allBreweries[2]);
        // $('.q1-c4').text(allBreweries[3]);

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

            // $(beerClass[i]).text(allBreweries[0]);

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
            }

            choices = [];


        }
        // for (var k = 0; k < 4; k++) {
        //     var l = k + 1;
        //     beerClasses.push = '.q1-c' + l;
        //     $(beerClasses[k]).text(allBreweries[k]);
        //     console.log(beerClasses)
        // }
        // console.log(beerClasses[0])

        // $( "btn" ).each(function( index, element ) {
        //     // element == this
        //     $( element ).text(allBreweries[1]);
        //     if ( $( this ).is( "#stop" ) ) {
        //       $( "span" ).text( "Stopped at div index #" + index );
        //       return false;
        //     }
        //   });


    }

    $('.play-game').click(function () {
        if (allBreweries.length < 4) { //here

            createQuestion();
        }

        $(this).hide();

    })

    $('.guess-btn').click(function (event) {

        event.preventDefault();

        if (!guessMade) {

            check($(this));
        }

        qIndex++;

        qCount++;

        $('.title').html('Question <sup>#</sup><span class="q-number">' + qCount + '</span>');

        // guessMade = true; //here

    });

    function check(btn) {

        $('.q' + qCount + '-lead').html("<span class='guess-beer'>" + currentBeer[qIndex][0] + "</span>" + " is brewed by " + currentBeer[qIndex][3] + " in beautiful Austin, TX! It is a wonderful " + currentBeer[qIndex][1] + " with an ABV of " + currentBeer[qIndex][2] + ". Cheers!");

        if (btn.text() === answers[qIndex]) {

            correctCount++;
            
            $('.q' + qCount + '-beer').text("Correct!").css({
                
                "color": "#2ecc71"
            })
           
            btn.removeClass('btn-light').addClass('btn-success');
        } else {
           
            $('.q' + qCount + '-beer').text("Incorrect!").css({
              
                "color": "#e74c3c"
            })
           
            btn.removeClass('btn-light').addClass('btn-danger');
        }

        for (var n = 1; n < 5; n++) {
            if ($('.q' + qCount + '-c' + n).text() === answers[qIndex]) {
                $('.q' + qCount + '-c' + n).removeClass('btn-light').addClass('btn-success');
            }
        }
        
        $('.q' + qCount + '-ask').text("Current score: " + (Math.floor((correctCount / qCount) * 100)) + "%");

    }



    //$(document).ready(setInterval(toggleColor, 1000))

    // function Question(ask, choices, answer) {
    //     this.ask = ask;
    //     this.choices = choices;
    //     this.answer = answer;
    // }
    // function buildQuestion () {
    //     var newQ = makeQuestion;

    //     for (var i = 0; i < beers.length; i++) {

    //     }
    // }
    // var q1 = new Question(); //here

})()