"use strict";

function hideAppPart() {
    //alert("In script!");
    window.Communica = window.Communica || {};

    if (window.$) {
        $(document)
            .ready(function() {
                Communica.Part.init();
            });
    }
    else {
        window.setTimeout(hideAppPart, 50);
    };

    Communica.Part = {
        senderId: '', // the App Part provides a Sender Id in the URL parameters,
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
            var height = "0",
                width = "0",
                resizeMessage = '<message senderId={Sender_ID}>resize({Width}, {Height})</message>';

            // set the parameters
            resizeMessage = resizeMessage.replace("{Sender_ID}", this.senderId);
            resizeMessage = resizeMessage.replace("{Height}", height);
            resizeMessage = resizeMessage.replace("{Width}", width);

            // post the message
            window.parent.postMessage(resizeMessage, "*");
            // Remove the whole form from the page to get rid of the content
            //$('form').remove();        
        }
    };
}
