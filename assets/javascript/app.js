$(document).ready(function () {
    var topics = ["LeBron James", "Kevin Durant", "Anthony Davis", "James Harden", "Stephen Curry", "Giannis Antetokounmpo", "Joel Embiid", "Russell Westbrook", "Kawhi Leonard"];
    var apiKey = "https://api.giphy.com/v1/gifs/random?api_key=9CP1fq0g6nRVwtPMxybIedfL6FzoD7qF";
    var buttonNum = 0;

    for (var i = 0; i < topics.length; i++) {
        //$(".buttonList").append("<button class='btn btn-primary'>" + topics[i] + "</button>");
        $(".buttonList").append("<button class='btn btn-primary' id='button" + buttonNum + "'>" + topics[i] + "</button>");
        buttonNum++;
        console.log($("#button" + i).text());
    }

    $("button").on("click", function(){
        /*
        $.ajax({
            url: apiKey + "&tag=" + $(this).text(),
            method: 'GET'
        }).then(function(response){
            console.log($(this).text());
            console.log(response);
            $(".container").prepend("<img class='gif' src='" + response.data.image_original_url + "'>")
            $("img").attr("alt", $(this).text + " image");
        });
        */ 
        //console.log($(this).text());
        for(var i = 0; i < 10; i++){
            $.ajax({
                url: apiKey + "&tag=" + $(this).text(),
                method: 'GET'
            }).then(function(response){
                $(".container").prepend("<img class='gif' id='gif" + i + "' src='" + response.data.image_original_url + "'>");
                $("img").attr("alt", $(this).text() + " image");
            });
        }
    });

    $("aside").append("<button class='clear'>CLEAR</button>");
    $(".clear").on("click", function(){
        $(".container").empty();
    });
});

