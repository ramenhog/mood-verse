document.addEventListener("DOMContentLoaded", function() {
    chrome.management.getAll(verseCallback);
});

var apiKey = 'Nism4wChMEVRVUobXFGxS3UWGtDUP2gKRe8xVq6z',
    topics = [],
    topic;

var verseCallback = function() {
    $.getJSON('../data.json', function(json, textStatus) {
        init(json);
    });

    // Compile all topics available from data
    function init(data){
        topics = $.map(data, function(item, index) {
            var topic = data[index].topic;
            $('#select').append('<li rel="'+topic+'">'+topic+'</li>');
        });
        styleSelect(data);

        if (localStorage.verseMood) {
            getVerseByTopic(data);
        } else {
            console.log('no mood');
                $('#scripture').html('<div class="intro">Choose your theme</div>');
                $('.quote').fadeTo('400', 1);
        }
    }

    function getVerseByTopic(library){
        var topic = localStorage.verseMood;

        library.forEach(function(type){
            if (type.topic == topic) {
                var verses = type.verses;
                chooseRandomVerse(verses);
            }
        });
    }

    // Choose random verse from available verses pertaining to topic
    function chooseRandomVerse(array){
        var randomVerse = array[Math.floor(Math.random() * array.length)];
        getPassage(randomVerse);
    }

    function getPassage(passage){
        $.ajax({
            url: 'https://bibles.org/v2/passages.js?q[]='+passage+'&version=eng-ESV',
            username: apiKey,
            dataType: 'json',
            success: function(json) {
                var text = json.response.search.result.passages[0].text;
                $.when(changeVerse(text,passage)).then(function(){
                    $('.quote').fadeTo('400', 1);
                });
            }
        });
    }

    function changeVerse(passage,cite){
        changeColor();
        var elem = $('<div/>').html(passage);
        elem.find('sup, h3, h1, h2').remove();
        var formattedPassage = elem.text();
        var formattedCite = cite.replace(/\+/g," ");
        // capitalize
        formattedPassage = formattedPassage.substr(0,1).toUpperCase()+formattedPassage.substr(1);

        $('#scripture').html(formattedPassage);

        $('cite').html(formattedCite);   
        adjustFontSize();
        $('title').html('The Verse&nbsp;|&nbsp;'+formattedCite);
    }

    function adjustFontSize(){

        var $quote = $('#scripture');
        
        var $numWords = $quote.text().split(" ").length;
        
        if (($numWords >=1 ) && ($numWords <20)) {
            $quote.css("font-size", "2.7rem");
        }
        else if (($numWords >= 20) && ($numWords < 80)) {
            $quote.css("font-size", "2.4rem");
        }
        else if (($numWords >= 80) && ($numWords < 150)) {
            $quote.css("font-size", "1.8rem");
        }
        else if (($numWords >= 150) && ($numWords < 200)) {
            $quote.css("font-size", "1.6rem");
        }
        else if (($numWords >= 200) && ($numWords < 250)) {
            $quote.css("font-size", "1.4rem");
        }
        else {
            $quote.css("font-size", "1.3rem");
        }    
    };

    function changeColor(){
        $('body').removeClass();
        var num = Math.floor((Math.random() * 5) + 1);
        $('body').addClass('color'+num);
    }

    // Styling select menu
    function styleSelect(data){

        var $styledSelect = $('div.select-styled')
            $list = $('ul.select-options'),
            $listItems = $list.children('li');

        $styledSelect.text(localStorage.verseMood);
      
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });
      
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $(this).val($(this).attr('rel'));
            $list.hide();
            localStorage.verseMood = $(this).attr('rel');
            $('.quote').fadeTo('400', 0, function() {
                getVerseByTopic(data);
            });
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    }
};