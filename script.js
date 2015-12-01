document.addEventListener("DOMContentLoaded", function() {
    chrome.management.getAll(verseCallback);
});

var verseCallback = function() {
    var apiKey = 'Nism4wChMEVRVUobXFGxS3UWGtDUP2gKRe8xVq6z';
    var passage = "John+3:16-17";
    var verses = [];

    function findTaggedRef(data) {
        var references = data.response.tags[0].references;
        $.each(references, function(index, val) {
            verses.push({
                start: references[index].reference.start/*,
                end: references[index].reference.end*/
            });
        });
        console.log(verses[0].start.replace('GNT:',''));
        passage = verses[0].start.replace('GNT:','');
        findPassages(passage);
    }

    function findPassages(passage){
        $.ajax({
            url: 'https://bibles.org/v2/passages.js?q[]='+passage+'&version=eng-ESV',
            dataType: 'json',
            success: function(json) {
                console.log(json.response.search.result.passages[0].text);
                $('#scripture').html(json.response.search.result.passages[0].text);
            }
        });
    }

    // Uses http://bibles.org/pages/api/
    $.ajax({
        url: "https://bibles.org/v2/tags/peace.js",  
        username: apiKey,
        dataType: 'json',
        success: function(json) {
            findTaggedRef(json);
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