"use strict";

var hostweburl;

//load the SharePoint resources
$(document).ready(function () {
    // First verify that the div to contain the chrome exists on the page
    // otherwise, add it now
    if (!$("#chrome_ctrl_placeholder").length) {
        // Add the div at the begining of the form
        var html = "<div id='chrome_ctrl_placeholder'></div>";
        $("body").prepend(html);
    }

    //Get the URI decoded URL.
    hostweburl =
        decodeURIComponent(
            getQueryStringParameter("SPHostUrl")
    );

    // The SharePoint js files URL are in the form:
    // web_url/_layouts/15/resource
    var scriptbase = hostweburl + "/_layouts/15/";

    // Load the js file and continue to the 
    //   success handler
    $.getScript(scriptbase + "SP.UI.Controls.js", renderChrome);
});

// Callback for the onCssLoaded event defined
//  in the options object of the chrome control
function chromeLoaded() {
    // When the page has loaded the required
    //  resources for the chrome control,
    //  display the page body.
    $("body").show();
}

//Function to prepare the options and render the control
function renderChrome() {
    // The Help, Account and Contact pages receive the 
    //   same query string parameters as the main page
    var options = {
        "appIconUrl": "siteicon.png",
        "bottomHeaderVisible": false,
        "appTitle": document.title, //"Class Profile", // This needs to be set based on the title of the page
        "appHelpPageUrl": "Help.html?"
            + document.URL.split("?")[1],
        // The onCssLoaded event allows you to 
        //  specify a callback to execute when the
        //  chrome resources have been loaded.
        "onCssLoaded": "chromeLoaded()",
        "settingsLinks": [
            //{
            //    "linkUrl": "Account.html?"
            //        + document.URL.split("?")[1],
            //    "displayName": "Account settings"
            //},
            //{
            //    "linkUrl": "Contact.html?"
            //        + document.URL.split("?")[1],
            //    "displayName": "Contact us"
            //}
        ]
    };
    
    //var pageUrl = getQueryStringParameter('RedirectPage');
    //if (pageUrl != null && pageUrl != '') {
    //    options.siteUrl = hostweburl + "/" +  pageUrl;
    //}

    var nav = new SP.UI.Controls.Navigation(
                            "chrome_ctrl_placeholder",
                            options
                        );
    nav.setVisible(true);

    var pageUrl = getQueryStringParameter('RedirectPage');
    if (pageUrl != null && pageUrl != '') {
        $('#chromeControl_topheader_siteurl').attr("href", hostweburl + "/" + decodeURIComponent(pageUrl))
    }
}

// Function to retrieve a query string value.
// For production purposes you may want to use
//  a library to handle the query string.
function getQueryStringParameter(paramToRetrieve) {
    var params =
        document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] === paramToRetrieve)
            strParams = singleParam[1];
    }
    // If it's not found, return null
    return strParams;
}