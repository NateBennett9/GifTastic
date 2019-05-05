$(function() {
    createButtons(topics, 'searchButton', '#buttonsArea');
    console.log('Page Loaded');
})

    var topics = ["LeBron James", "Kevin Durant", "Anthony Davis", "James Harden", "Stephen Curry", "Giannis Antetokounmpo", "Joel Embiid", "Russell Westbrook"];

    function createButtons(topics, newClass, newDiv) {
        $(newDiv).empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button>');
            a.addClass(newClass);
            a.attr('data-type', topics[i]);
            a.text(topics[i]);
            $(newDiv).append(a);
        }
    }

    $(document).on('click','.searchButton',function() {
        $('#searches').empty();
        var type = $(this).data('type');
        console.log(type);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=9CP1fq0g6nRVwtPMxybIedfL6FzoD7qF&limit=10";
        $.ajax({
            url:queryURL,
            method:'GET'
        })
            .done(function(res) {
                console.log(res);
                for (var i = 0; i < res.data.length; i++) {
                    var searchDiv = $('<div class="search-item">');
                    var rating = res.data[i].rating;
                    var p = $('<p>').text('Rating: ' + rating);
                    var animated = res.data[i].images.fixed_height.url;
                    var still = res.data[i].images.fixed_height_still.url;
                    var image = $('<img>');
                    image.attr('src', still);
                    image.attr('data-still', still);
                    image.attr('data-animated', animated);
                    image.attr('data-state', 'still');
                    image.addClass('searchImage');
                    searchDiv.append(p);
                    searchDiv.append(image);
                    $('#searches').append(searchDiv);
                }
            })
    })

    $(document).on('click', '.searchImage', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animated'));
            $(this).attr('data-state', 'animated');
        }
        else
        {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    })

$('#addSearch').on('click', function() {
    var newSearch = $('input').eq(0).val();
    topics.push(newSearch);
    createButtons(topics, 'searchButton', '#buttonsArea');
    return false;
})