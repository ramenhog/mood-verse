document.addEventListener("DOMContentLoaded", function() {
    chrome.management.getAll(verseCallback);
});

var verseCallback = function() {
    var apiKey = 'Nism4wChMEVRVUobXFGxS3UWGtDUP2gKRe8xVq6z';
    var passage = "John+3:16-17";
    var categories = [
        'peace',
        'love',
        'wisdom',
        'doubt',
        'salvation',
        'christmas'
    ];
    var allVerses = [];
    var cat = categories[Math.floor(Math.random() * categories.length)];

    findMoodVerses();
    getMood();

    function getMood() {
        $('.moods').find('li').on('click', function(e){
            cat = $(this).attr('id');
            e.stopPropagation();

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
                var allReferences = data.response.tags[0].references;
                var randomRef = allReferences[Math.floor(Math.random() * allReferences.length)];
                var refStart = randomRef.reference.start;
                var refEnd = randomRef.reference.end;
                
                var arr = refEnd.split('.'),
                output = arr.pop();

                refEnd = output;

                var totalRef = refStart+'-'+output;
                console.log('totalref:'+totalRef);
                passage = totalRef.replace('GNT:','');
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
                console.log(script);
                formatPassage(script);
            }
        });
    }

    function formatPassage(passage){
        var elem = $(passage);
        elem.find('sup').remove().html;
        var formatted = elem.html();
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