emergencyBroadCast();
/*
 // Require JQuery and AngularJS on the page for this to work
 <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/2.0.0-beta.17/angular2.min.js" ></script>
 <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
 */
//var htmlCode = "<div ng-app=\"EmergencyBroadcast\" class=\"row\">" +
//    "<div ng-controller=\"spBroadcastController\" class=\"span10\">" +
//    "<div class=\"ms-Grid gcMessages\" id =\"georgianMessages\">" +
//    "<div class=\"ms-Grid-row\" id=\"gcMessage{{message.Id}}\" ng-repeat=\"message in messages\">" +
//    "<div class=\"ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2\" ng-show=\"{{message.Dismiss}}\"><a href=\"#\" ng-click=\"dismissMessage(message.Id)\"><i class=\"ms-Icon ms-Icon--xCircle\"></i></a></div>" +
//    "<div class=\"ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2\" ng-show=\"{{!message.Dismiss}}\">&nbsp;</div>" +
//    "<div class=\"ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2\">{{message.Body}}</div>" +
//    "</div></div></div></div>";
var panelHeight = 51;
var startPos = 88;
var cookieBaseName = "GeorgianAnnouncement";
var mesageBaseName = "georgianMessage";

var htmlCode =  "<div ng-app=\"EmergencyBroadcast\" class=\"row\"><div ng-controller=\"spBroadcastController\" class=\"span10\"></div></div>";

function emergencyBroadCast() {
	if (window.$ && typeof angular != "undefined") {
	    $(document).ready(function () {
	        // enable mobile buttons to receive click events

	        if ($("#" + mesageBaseName).length == 0) {

                $("#s4-bodyContainer #s4-titlerow").after(htmlCode);
                
	        }

	        $("#" + mesageBaseName).hide();
	        getMessages();
            
	    });
	}
	else {
        
        window.setTimeout(emergencyBroadCast, 50);

	};
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cookieName, cookieValue, exdays) {
    var expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + expiryDate.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}

function removeRow(rowId) {
    // We need to hide the row and move any rows that are below it up
    $("#" + rowId).slideUp(400);
    //$("#" + rowId).animate({ height: 0 }, 400);

    $("#" + rowId).remove();
    //find the rest of the messages and move them up as well
    ////var moveIt = false;
    ////$("div.span10 > .ms-MessageBanner")
    ////    .each(function () {
    ////        if (moveIt) {
    ////            var curPos = $(this).css("top").replace("px", "");
    ////            curPos -= panelHeight;
    ////            $(this).animate({ top: curPos + "px" }, 400);
    ////            //$(this).css("top", curPos + "px");
    ////        } else {
    ////            if ($(this).attr("id") == rowId) moveIt = true;
    ////        }
    ////    });
    ////var newTop = $("#contentRow").css("margin-top").replace("px", "") - panelHeight;
    ////$("#contentRow").animate({ marginTop: newTop + "px" }, 400);

}


//function checkTableRows() {
//    //var rowCount = $("#gcMessageContainer").children().size();
//    //if (rowCount < 1) {
//    //    $("#gcMessageContainer").hide();
//    //}
//    var rowCount = $("#georgianMessage").children().size();
//    if (rowCount < 1) {
//        $("#georgianMessage").hide();
//    }
//}

function decodeEntities(encodedString) {
	var textArea = document.createElement('textarea');
	textArea.innerHTML = encodedString;
	return textArea.value;
}

function getText(htmlString) {
    try {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(htmlString, "text/html");
        var elems = xmlDoc.getElementsByClassName("WordSection1");
        if (elems.length > 0)
        {
            return elems[0].outerHTML;
        }
        return $(htmlString).text();
    } catch (e) {
        return htmlString;
    }
}

function closeBanner(clickeditem) {
    // get the ID so that we can close the correct banner
    var itemId = clickeditem.id.substring(11);
    var cookieName = cookieBaseName + itemId;
    setCookie(cookieName, itemId, 1);
    $("#" + mesageBaseName + itemId).slideUp(300);
}

function expandCollapse(clickedItem) {
    var $clickedItem = $(clickedItem);
    var $icon = $clickedItem.children("i.ms-Icon");
    if($clickedItem.hasClass("collapsed")){
    //if (clickedItem.hasClass("collapsed")) {
        $clickedItem.removeClass("collapsed");
        $clickedItem.addClass("expanded");
        // replace the chevron
        $icon.removeClass("ms-Icon--chevronsDown");
        $icon.addClass("ms-Icon--chevronsUp");

    } else {
        $clickedItem.removeClass("expanded");
        $clickedItem.addClass("collapsed");
        $icon.removeClass("ms-Icon--chevronsUp");
        $icon.addClass("ms-Icon--chevronsDown");
    }
}

function getMessages() {
    
	angular.element(document).ready(function () {  
	    angular.bootstrap(document, ["georgianCollegeMessages"]);
	});

    angular.module("georgianCollegeMessages", []).controller("spBroadcastController", ['$scope','$http', function ($scope, $http) {
	    $http({
	            method: 'GET',
	            url: /*_spPageContextInfo.webAbsoluteUrl +*/
	                "/_api/web/lists/getByTitle('ImportantAnnouncements')/items?$select=Id,Title,Body,Expires,Dismiss,Importance,Status&$filter=Expires ge'" +
	                new Date().toISOString() +
	                "'",
	            headers: { "Accept": "application/json;odata=verbose" }
	        })
	        .then(function(response,data, status, headers, config) {
                data = response.data;
                var dataToDisplay = [];
	            var cookieName;
	            var cookieExists;
                
	            angular.forEach(data.d.results, function (result, key) {
	                if (result.Dismiss) {
	                    cookieName = cookieBaseName + result.Id;
	                    cookieExists = getCookie(cookieName);
	                    if (cookieExists.length == 0 || result.Importance.toLowerCase() == 'critical' || !(result.Dismiss && result.Importance.toLowerCase() !== 'critical')) {
	                        dataToDisplay.push(result);
	                    }
	                } else {
	                    dataToDisplay.push(result);
	                }
	            });

	            // We need to loop through all the messages and display them now
	            var curPos = startPos;
	            angular.forEach(dataToDisplay,
	                function(item) {
	                    // Check if there is a cookie for this item and it is not dismissable
	                    var messageId = item.Id;
	                    var dismissable = item.Dismiss;
	                    var importance = item.Importance.toLowerCase();
	                    var imagePath = /*_spPageContextInfo.webAbsoluteUrl +*/ "/PublishingImages/";
	                    var messageBanner = document.createElement("div");
	                    $(messageBanner).attr('id', mesageBaseName + messageId);
	                    $(messageBanner).addClass('ms-MessageBanner');
	                    $(messageBanner).addClass('gcMessages');
	                    $(messageBanner).addClass(importance);
	                    //$(messageBanner).css('top', curPos + 'px');
	                    curPos += panelHeight;

	                    var messageBannerContent = document.createElement("div");
	                    $(messageBannerContent).addClass('ms-MessageBanner-content');

	                    var messageBannerImage = document.createElement("img");
	                    $(messageBannerImage).addClass('gcAnnouncementImage');
	                    $(messageBannerImage).attr('alt', importance);
	                    $(messageBannerImage).attr('src', imagePath + importance + '.svg');


	                    var messageBannerText = document.createElement("div");
	                    $(messageBannerText).addClass('ms-MessageBanner-text');

	                    var messageBannerClipper = document.createElement("div");
	                    $(messageBannerClipper).addClass('ms-MessageBanner-clipper');

	                    $(messageBannerClipper)
	                        .html("<span class=\"gcAnnouncementTitle\"><h2>" +
	                            item.Title +
	                            "</h2></span>" +
	                            getText(item.Body));

	                    //var messageBannerExpand = document.createElement("button");
	                    //$(messageBannerExpand).attr("id", "expandCollapse" + messageId);
	                    //$(messageBannerExpand).attr("type", "button");
	                    //$(messageBannerExpand).addClass("ms-MessageBanner-expand");
	                    //$(messageBannerExpand).addClass("collapsed");
	                    //$(messageBannerExpand).css('top', '0');
	                    //$(messageBannerExpand).css('right', '65px');
	                    //$(messageBannerExpand).css('line-height', '52px');
	                    //$(messageBannerExpand).css('display', 'block');
	                    //$(messageBannerExpand).css('position', 'absolute');
	                    //$(messageBannerExpand).click(function (event) {
	                    //    expandCollapse(event.target);
	                    //});

	                    //var collapseImage = document.createElement("i");
	                    //$(collapseImage).addClass("ms-Icon");
	                    //$(collapseImage).addClass("ms-Icon--chevronsDown");
	                    //$(messageBannerExpand).append(collapseImage);
	                    var closeButtoncontainer = document.createElement("div");
	                    $(closeButtoncontainer).addClass("buttonContainer");
	                    var messageBannerClose = document.createElement("button");
	                    $(messageBannerClose).attr("id", "closeBanner" + messageId);
	                    $(messageBannerClose).attr("type", "button");
	                    $(messageBannerClose).addClass("ms-MessageBanner-close");
	                    if (!dismissable || importance === "critical") {
	                        $(messageBannerClose).attr("title", "This message cannot be dismissed.");
	                    } else {
	                        $(messageBannerClose).attr("title", "Dismiss message on this computer.");
	                    }
	                    var closeImage = document.createElement("i");
	                    $(closeImage).addClass("ms-Icon");
	                    $(closeImage).addClass("ms-Icon--x");
	                    $(messageBannerClose).append(closeImage);

	                    $(messageBannerText).append(messageBannerClipper);
	                    //$(messageBannerText).append(messageBannerExpand);

	                    $(messageBannerContent).append(messageBannerImage);
	                    $(messageBannerContent).append(messageBannerText);

	                    $(messageBanner).append(messageBannerContent);
	                    // If this is dismissable, then add the close button
	                    if (!dismissable || importance === "critical") {
	                        $(messageBannerClose).attr("disabled", "true");
	                    } else {
	                        // try it a different way as it is not firing on android
	                        $(document)
	                            .on('click',
	                                '#closeBanner' + messageId,
	                                function(event) {
	                                    closeBanner(event.target);
	                                });
                           
	                    }
	                    $(closeButtoncontainer).append(messageBannerClose);
	                    $(messageBanner).append(closeButtoncontainer);
	                    $("div.span10").append(messageBanner);
	                });
	            $scope.messages = dataToDisplay;			
	        },
	        function(error,data, status, headers, config) {
                console.log("ajax call error");
                
	        });

	    //$scope.dismissMessage = function (messageId) {	     
	    //    var cookieName = 'gcMessage' + messageId;	      
	    //    setCookie(cookieName, messageId, 1);
	    //    removeRow(cookieName);
	    //    checkTableRows();	       
	    //} 
	}]);

}

  
  
