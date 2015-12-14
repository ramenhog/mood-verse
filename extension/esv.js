document.addEventListener("DOMContentLoaded", function() {
    chrome.management.getAll(verseCallback);
});

var verseCallback = function() {
    var passage = "John+3:16-17";

    function randomPassage() {
        var verses = [
            'John 3:16-17',
            'Romans 8:6',
            '1 Peter 2:9',
            '2 Corinthians 5:9-10',
            'Ephesians 6:16-18',
            '1 Corinthians 13:1-3'
        ];
        $.each(verses, function(index, value){
            verses[index] = value.replace(' ','+');
        });
        var i = Math.floor((Math.random() * verses.length));
        console.log(verses.length);
        console.log(i);
        return verses[i];
    }

    var passage = randomPassage();

    var queryUrl = 'http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=' + passage + '&include-headings=false&include-footnotes=false&include-audio-link=false&include-short-copyright=false&output-format=plain-text';
    var randomUrl = 'http://www.esvapi.org/v2/rest/verse?key=IP&include-headings=false&include-footnotes=false&include-audio-link=false&include-short-copyright=false&output-format=plain-text';

    function format(data) {
        var verse = '';
        data = data.replace('=======================================================','').replace(/_______________________________________________________/g, '').split('[');

        $('cite').html(data[0]);

        $.each(data, function (i) {
            if (i > 0) {
                var line = data[i].split(']');
                verse += line[1];
            }
        });
        return verse;
    }

    $.ajax({
        url: queryUrl,  
        success:function(data) {
            data = format(data);
            $('#scripture').html(data);
        }
    });

    function changeColor(){
        var num = Math.floor((Math.random() * 5) + 1);
        var color;
        switch(num) {
            case 1:
                color = 'pomegranate';
                break;
            case 2:
                color = 'yellow';
                break;
            case 3:
                color = 'cerulean';
                break;
            case 4:
                color = 'limeade';
                break;
            case 5:
                color = 'downriver';
                break;
        }
        $('body').addClass(color);
    }
    changeColor();
};

$('body').click(function(){
    verseCallback();
});