"use strict";
//alert("In script v3!");
window.Communica = window.Communica || {};

$(document).ready(function () {
    //Communica.Part.init();
    // Wait 1 second before resizing to allow other events to occur
    setTimeout(function () { Communica.Part.init() }, 1000);
});

// Let's resize the webpart when the window is resized also
$(window).resize(function () {
    Communica.Part.init();
});

Communica.Part = {
    senderId: '',   // the App Part provides a Sender Id in the URL parameters,
    // every time the App Part is loaded, a new Id is generated.
    // The Sender Id identifies the rendered App Part.

    init: function () {
        // parse the URL parameters and get the Sender Id
        var params = document.URL.split("?")[1].split("&");
        for (var i = 0; i < params.length; i = i + 1) {
            var param = params[i].split("=");
            if (param[0].toLowerCase() === "senderid")
                this.senderId = decodeURIComponent(param[1]);
        }

        // make an initial resize (good if the content is already bigger than the
        // App Part)
        this.adjustSize();
    },

    adjustSize: function () {
        //alert("In the resize now");
        // Post the request to resize the App Part, but just if has to make a resize
        var step = 30, // the recommended increment step is of 30px. Source:
                            // http://msdn.microsoft.com/en-us/library/jj220046.aspx
            width = "100%", // the App Part width
            resizeMessageTemplate = '<message senderId={Sender_ID}>resize({Width}, {Height})</message>',
            resizeMessage;
        resizeMessageTemplate = resizeMessageTemplate.replace("{Sender_ID}", this.senderId);
        //resizeMessage = resizeMessageTemplate.replace("{Height}", "0");
        //resizeMessage = resizeMessage.replace("{Width}", "100%");
        ////alert("About to size to 100% first. ");
        //window.parent.postMessage(resizeMessage, "*");
        // Now that we have the parent iFrame at 100% of the screen, get the true size 
        // of the contents
        var contentHeight = $('body').height();
        var newHeight = (step - (contentHeight % step)) + contentHeight;
        // set the parameters
        resizeMessage = resizeMessageTemplate.replace("{Height}", newHeight);
        resizeMessage = resizeMessage.replace("{Width}", width);
        //alert("About to Resize to Height: " + newHeight);
        // post the message
        window.parent.postMessage(resizeMessage, "*");
    }
};
