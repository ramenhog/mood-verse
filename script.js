document.addEventListener("DOMContentLoaded", function() {
    chrome.management.getAll(verseCallback);
});

var verseCallback = function() {
    var passage = "John+3:16-17";
    var queryUrl = 'http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=' + passage + '&include-headings=false&include-footnotes=false&include-audio-link=false&include-short-copyright=false&output-format=plain-text';
    var randomUrl = 'http://www.esvapi.org/v2/rest/verse?key=IP&include-headings=false&include-footnotes=false&include-audio-link=false&include-short-copyright=false&output-format=plain-text';

    function format(data) {
        var verse = '';

        data = data.replace('=======================================================','').replace(/_______________________________________________________/g, '').split('[');
        console.log(data);

        $('cite').html(data[0]);

        $.each(data, function (i) {
            if (i > 0) {
                var line = data[i].split(']');
                verse += line[1];
                console.log(line[1]);
            }
        });
        return verse;
    }

    $.ajax({
        url: randomUrl,  
        success:function(data) {
            data = format(data);
            $('#scripture').html(data);
        }
    });
};