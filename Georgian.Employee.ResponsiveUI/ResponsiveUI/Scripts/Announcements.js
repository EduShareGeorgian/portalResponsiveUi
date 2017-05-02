/*
<!-- Linkify references must be injected on the page -->
<script src="https://georgiancollege.sharepoint.com/CDN/javascript/linkify.min.js"></script>
<script src="https://georgiancollege.sharepoint.com/CDN/javascript/linkify-string.min.js"></script>
<script src="https://georgiancollege.sharepoint.com/CDN/javascript/linkify-jquery.min.js"></script>
*/

// This function checks if Linkify object exists
function linkifyString(s) {
    var linkifyFunctionName = 'linkifyStr';
    var fn = window[linkifyFunctionName];
    if (typeof (fn) == 'function') {
        s = window[linkifyFunctionName](s);
    }
    return s;
}

$(document).ready(function () {
    // Clean up the announcements 
    // Find all the thread items

    var $feedsDiv1 = $("div.NewsFeedAnnouncements div.ms-webpart-chrome");
    $feedsDiv1.append("<div class='ms-Grid'></div>");
    var $feedsDiv = $("div.NewsFeedAnnouncements div.ms-Grid");

    var rowStart = "<div class='ms-Grid-row'>";
    var hrHtml = "<hr />";

    $("div.NewsFeedAnnouncements div.ms-microfeed-threadsDiv>div.ms-microfeed-thread")
        .each(function (index) {
            var feedText = $(this).find("div.ms-microfeed-text span.ms-microfeed-postBody").html();
            var $img = $(this).find("img.ms-microfeed-attachmentImage");
            var timeText = $(this).find("span.ms-microfeed-postedTime").text();

            var newHtml = "<div class='ms-Grid-row'><div class='microfeed-text ms-Grid-col ms-u-sm12'>" +
                /* Linkification starts */
                linkifyString(feedText) +
                /* Linkification ends */
                "</div>";
            if ($img.attr("src"))
                newHtml += "<div class='ms-Grid-col ms-u-sm12'><img class='microfeed-attachmentImage' src='" +
                $img.attr("src") +
                "' alt='" +
                $img.attr("alt") +
                "'></img>";
            newHtml += "<div class='microfeed-postedTime ms-Grid-col ms-u-sm12'>" + timeText + "</div></div>";
            newHtml += "<div class='topBorder'></div>";
            $(newHtml).appendTo($feedsDiv);

        });

    // Remove any that were added before
    $("div.NewsFeedAnnouncements>div.ms-Grid").remove();
    $("div.NewsFeedAnnouncements>div.ms-Grid-row").remove();

    $("<div class='ms-Grid-row'>" +
        "<div class='ms-Grid-col ms-u-sm12 WebPartHeading'><h2>Announcements</h2></div></div>")
        .appendTo("div.NewsFeedAnnouncements");
    $("div.NewsFeedAnnouncements div.ms-Grid").detach().appendTo("div.NewsFeedAnnouncements");
    $("div.NewsFeedAnnouncements div.ms-rte-wpbox").hide();

});
