document.addEventListener("DOMContentLoaded", function() {
    chrome.management.getAll(verseCallback);
});

var apiKey = 'Nism4wChMEVRVUobXFGxS3UWGtDUP2gKRe8xVq6z';
var passage = "John+3:16-17";

var verseCallback = function() {
    getMood();

    function getMood() {
        $('.moods').find('li').on('click', function(e){
            cat = $(this).attr('id');
            e.stopPropagation();
            console.log(cat);
            findMoodVerses();
        });
    }
    // Find references from 
    function findMoodVerses() {
        // Uses http://bibles.org/pages/api/

        $.ajax({
            url: 'https://bibles.org/v2/tags/'+cat+'.js',  
            username: apiKey,
            dataType: 'json',
            success: function(data) {
                var allVerses = [];
                var allReferences = data.response.tags[0].references;

                $.each(allReferences, function(index, val) {
                    var start = allReferences[index].reference.start;
                    var end = allReferences[index].reference.end;

                    if (start.indexOf('KJV','GNT') > -1 ) {
                        allVerses.push({
                            start: allReferences[index].reference.start,
                            end: allReferences[index].reference.end
                        });
                    }
                });
                var randomVerse = allVerses[Math.floor(Math.random() * allVerses.length)];

                var refStart = randomVerse.start;
                var refEnd = randomVerse.end;

                var totalRef = refStart+'-'+refEnd;
                findPassages(totalRef);
            }
        });
    }

    function findPassages(passage){
        console.log(passage);
        $.ajax({
            url: 'https://bibles.org/v2/passages.js?q[]='+passage+'&version=eng-ESV',
            dataType: 'json',
            success: function(json) {
                var script = json.response.search.result.passages[0].text;
                formatPassage(script);
            }
        });
    }

    function formatPassage(passage){
        var elem = $(passage);
        elem.find('sup, h3, h1, h2').remove();
        var formatted = elem.text();
        console.log(formatted);
        $('#scripture').html(formatted);
    }

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