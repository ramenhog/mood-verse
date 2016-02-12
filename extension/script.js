document.addEventListener("DOMContentLoaded", function() {
    chrome.management.getAll(verseCallback);
});

var apiKey = 'Nism4wChMEVRVUobXFGxS3UWGtDUP2gKRe8xVq6z';
var passage = "John+3:16-17";

var verseCallback = function() {
    findMoodVerses('peace');

    function getMood() {
        $('.moods').find('li').on('click', function(e){
            var cat = $(this).attr('id');
            e.stopPropagation();
            findMoodVerses(cat);
        });
    }

    function getCat() {
        $.ajax({
            url: 'https://bibles.org/v2/tags.js',  
            username: apiKey,
            dataType: 'json',
            success: function(data) {
                var allTagIDs = [];
                var allTags = data.response.tags;

                $.each(allTags, function(index, val) {
                    var tagID = allTags[index].id;
                    allTagIDs.push(tagID);
                });

                var cat = allTagIDs[Math.floor(Math.random() * allTagIDs.length)];
                
                findMoodVerses(cat);
            }
        });
    }

    // Find references from 
    function findMoodVerses(cat) {
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
                /*findPassages(totalRef);*/
            }
        });
    }

    var encouraging = [
        'Proverbs+18:10',
        'Proverbs+3:5-6',
        'Isaiah+41:10',
        'John+14:27',
        'John+16:33',
        'Psalm+46:1-3',
        '2+Timothy+1:7',
        'Psalm+16:8',
        'Psalm+55:22',
        '1+Peter+5:7',
        'Isaiah+26:3',
        'Psalm+118:14-16',
        'Psalm+119:114-115',
        'Psalm+119:25',
        'Psalm+119:50',
        'Psalm+119:71',
        'Psalm+120:1'
    ];

    function chooseRandomVerse(array){
        var randomVerse = array[Math.floor(Math.random() * array.length)];
        findPassages(randomVerse);
    }

    chooseRandomVerse(encouraging);

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
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    function formatPassage(passage){
        var elem = $(passage);
        elem.find('sup, h3, h1, h2').remove();
        var formatted = elem.text();
        formatted = formatted.capitalize();
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