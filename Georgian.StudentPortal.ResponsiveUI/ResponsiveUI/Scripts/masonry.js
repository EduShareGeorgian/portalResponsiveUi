var width = 320;
var gutter = 10;
var timeOut = 750;
var timesToRun = 20;
var timesRun = 0;

$(document).ready(function () {
    var elem = document.querySelector('.grid');
    // Find all the grid-items and set the height to be the same as the first
    // child

    var msnry = new Masonry(elem, {
        // options
        itemSelector: '.grid-item',
        columnWidth: width,
        gutter: gutter,
        transitionDuration: 0
    });
    // realign everything after a set timeout
    var timer = setInterval(realignAll, timeOut);
    function realignAll() {
        var gridItems = $('.grid-item');
        $.each(gridItems,
               function (key, value) {
                   var height = 0;
                   var children = $(value).children();
                   $.each(children, function (key, value) { height += $(value).height(); });
                   $(value).height(height);
                   //$(value).css('height', height + 'px');
               });
        if (++timesRun >= timesToRun) clearInterval(timer);
        msnry.layout();
    }

});
