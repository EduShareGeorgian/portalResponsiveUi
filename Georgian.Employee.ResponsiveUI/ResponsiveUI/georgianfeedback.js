chkIfDlg();

var dlgHtml = "<div class=\" officeBrowserFeedbackVisible\" id=\"officeBrowserFeedbackOverlayBackground\">" +
    "<div id=\"officeBrowserFeedbackMainContainer\">" +
    "<div class=\"  officeBrowserFeedbackVisible\" id=\"officeBrowserFeedbackMainContentHolder\">" +
    "<div class=\"officeBrowserFeedbackFormContainer\" id=\"officeBrowserFeedbackLeftFormContainer\">" +
    "<div class=\"officeBrowserFeedbackFontTitle officeBrowserFeedbackTextAlginLeft officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackTitle\">" +
    "Let us know what you think about the Portal" +
    "</div>" +
    "<div id=\"officeBrowserFeedbackColumnSeparatorDiv\">" +
    "<div class=\"officeBrowserFeedbackFontSubtitle officeBrowserFeedbackTextAlginLeft officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackQuestionLeftText\"></div>" +
    "<a tabindex=\"1\" class=\"officeBrowserFeedbackOverallAnchor officeBrowserFeedbackBackgroundGrey\" id=\"officeBrowserFeedbackOverallLikeAnchor\" role=\"button\" href=\"#\" value=\"I like something\">" +
    "<span class=\"officeBrowserFeedbackOverallImage ms-Icon ms-Icon--smiley\" id=\"officeBrowserFeedbackOverallLikeImage\"></span>" +
    "<div class=\"officeBrowserFeedbackFontText officeBrowserFeedbackOverallText officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackOverallLikeText\">I like something</div>" +
    "</a>" +
    "<div class=\"officeBrowserFeedbackFullWidth20pxHeight\" id=\"officeBrowserFeedbackPlaceHolderDiv1\"></div>" +
    "<a tabindex=\"1\" class=\"officeBrowserFeedbackOverallAnchor officeBrowserFeedbackBackgroundGrey\" id=\"officeBrowserFeedbackOverallDontLikeAnchor\" role=\"button\" href=\"#\" value=\"I dislike something\">" +
    "<span class=\"officeBrowserFeedbackOverallImage ms-Icon ms-Icon--frowny\" id=\"officeBrowserFeedbackOverallDontLikeImage\"></span>" +
    "<div class=\"officeBrowserFeedbackFontText officeBrowserFeedbackOverallText officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackOverallDontLikeText\">I dislike something</div>" +
    "</a>" +
    "<div class=\"officeBrowserFeedbackFullWidth20pxHeight\" id=\"officeBrowserFeedbackPlaceHolderDiv2\"></div>" +
    "<a tabindex=\"1\" class=\"officeBrowserFeedbackOverallAnchor officeBrowserFeedbackBackgroundGrey\" id=\"officeBrowserFeedbackOverallSuggestAnchor\" role=\"button\" href=\"#\" value=\"I have a suggestion\">" +
    "<span class=\"officeBrowserFeedbackOverallImage ms-Icon ms-Icon--lightBulb\" id=\"officeBrowserFeedbackOverallSuggestImage\"></span>" +
    "<div class=\"officeBrowserFeedbackFontText officeBrowserFeedbackOverallText officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackOverallSuggestText\">I have a suggestion</div>" +
    "</a>" +
    "<div class=\"officeBrowserFeedbackFullWidth20pxHeight\" id=\"officeBrowserFeedbackPlaceHolderDiv3\"></div>" +
    "<a tabindex=\"1\" class=\"officeBrowserFeedbackOverallAnchor officeBrowserFeedbackBackgroundGrey\" id=\"officeBrowserFeedbackOverallBadStuffAnchor\" role=\"button\" href=\"#\" value=\"I'd like to report inappropriate content\">" +
    "<span class=\"officeBrowserFeedbackOverallImage ms-Icon ms-Icon--quote\" id=\"officeBrowserFeedbackOverallBadStuffImage\"></span>" +
    "<div class=\"officeBrowserFeedbackFontText officeBrowserFeedbackOverallText officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackOverallSuggestText\">I'd like to report inappropriate content</div>" +
    "</a>" +
    "</div>" +
    "</div>" +
    "<div class=\"officeBrowserFeedbackFormContainer officeBrowserFeedbackHidden\" id=\"officeBrowserFeedbackMiddleFormContainer\">" +
    "<div class=\"officeBrowserFeedbackFontSubtitle officeBrowserFeedbackMarginLeft36px officeBrowserFeedbackLineHeight officeBrowserFeedbackTextAlginLeft\" id=\"officeBrowserFeedbackQuestionMiddleText\" aria-live=\"polite\"></div>" +
    "<textarea name=\"officeBrowserFeedbackComment\" tabindex=\"1\" class=\"officeBrowserFeedbackFontText officeBrowserFeedbackMarginLeft36px\" id=\"officeBrowserFeedbackComment\" maxlength=\"1000\" placeholder=\"Please type in your comment\"></textarea>" +
    "<div class=\"officeBrowserFeedbackMarginLeft36px\" id=\"officeBrowserFeedbackScreenshotContainer\"></div>" +
    "<div class=\"officeBrowserFeedbackMarginLeft36px\" id=\"officeBrowserFeedbackSubmitButtonContainer\">" +
    "<button tabindex=\"1\" class=\"officeBrowserFeedbackFontText officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackSubmitButton\" type=\"button\">Submit</button>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<i class=\"ms-Icon ms-Icon--x closebutton\"></i>" +
    "</div>" +
    "</div>";

var dlgMobileHtml = "<div class=\" officeBrowserFeedbackVisible\" id=\"officeBrowserFeedbackOverlayBackground\">" +
    "<div id=\"officeBrowserFeedbackMainContainer\">" +
        "<div class=\"  officeBrowserFeedbackVisible\" id=\"officeBrowserFeedbackMobileMainContentHolder\">" +
            "<div class=\"officeBrowserFeedbackFormContainer\" id=\"officeBrowserFeedbackLeftFormMobileContainer\">" +
                "<div class=\"officeBrowserFeedbackFontTitle officeBrowserFeedbackTextAlginLeft officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackTitle\">"+
                    "Let us know what you think about the Portal"+
                "</div>" +
                "<div id=\"officeBrowserFeedbackColumnSeparatorDiv\">" +
                    "<a tabindex=\"1\" class=\"officeBrowserFeedbackOverallAnchor officeBrowserFeedbackBackgroundGrey mobile\" id=\"officeBrowserFeedbackOverallLikeAnchor\" role=\"button\" href=\"#\" value=\"I like something\">" +
                        "<span class=\"officeBrowserFeedbackOverallImage ms-Icon ms-Icon--smiley\" id=\"officeBrowserFeedbackOverallLikeImage\"></span>" +
                        "<div class=\"officeBrowserFeedbackFontText officeBrowserFeedbackOverallText officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackOverallLikeText\">I like something</div>" +
                    "</a>" +
                    "<div class=\"officeBrowserFeedbackMiddleFormMobileContainer\" id=\"officeBrowserFeedbackMiddleFormLikeContainer\">" +
                        "<div class=\"officeBrowserFeedbackFontSubtitle officeBrowserFeedbackLineHeight officeBrowserFeedbackTextAlginLeft mobileMiddleText\" id=\"officeBrowserFeedbackQuestionMiddleText\" aria-live=\"polite\">" +
                            "<span>What do you like?</span>" +
                        "</div>" +
                        "<textarea name=\"officeBrowserFeedbackComment\" tabindex=\"1\" class=\"officeBrowserFeedbackFontText\" id=\"officeBrowserFeedbackComment\" maxlength=\"1000\" placeholder=\"Please type in your comment\"></textarea>" +
                        "<div class=\"officeBrowserFeedbackSubmitButtonContainer\">" +
                            "<input tabindex=\"1\" class=\"officeBrowserFeedbackFontText officeBrowserFeedbackLineHeight mobileButtonSubmit\" id=\"officeBrowserFeedbackSubmitButton\" type=\"submit\" value=\"Submit\">" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"officeBrowserFeedbackFullWidth20pxHeight\" id=\"officeBrowserFeedbackPlaceHolderDiv1\"></div>" +
                    "<a tabindex=\"1\" class=\"officeBrowserFeedbackOverallAnchor officeBrowserFeedbackBackgroundGrey mobile\" id=\"officeBrowserFeedbackOverallDontLikeAnchor\" role=\"button\" href=\"#\" value=\"I dislike something\">" +
                        "<span class=\"officeBrowserFeedbackOverallImage ms-Icon ms-Icon--frowny\" id=\"officeBrowserFeedbackOverallDontLikeImage\"></span>" +
                        "<div class=\"officeBrowserFeedbackFontText officeBrowserFeedbackOverallText officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackOverallDontLikeText\">I dislike something</div>" +
                    "</a>" +
                    "<div class=\"officeBrowserFeedbackMiddleFormMobileContainer\" id=\"officeBrowserFeedbackMiddleFormUnlikeContainer\">" +
                        "<div class=\"officeBrowserFeedbackFontSubtitle officeBrowserFeedbackLineHeight officeBrowserFeedbackTextAlginLeft mobileMiddleText\" id=\"officeBrowserFeedbackQuestionMiddleText\" aria-live=\"polite\">" +
                            "<span>What could we do better?</span>" +
                        "</div>" +
                        "<textarea name=\"officeBrowserFeedbackComment\" tabindex=\"1\" class=\"officeBrowserFeedbackFontText\" id=\"officeBrowserFeedbackComment\" maxlength=\"1000\" placeholder=\"Please type in your comment\"></textarea>" +
                        "<div class=\"officeBrowserFeedbackSubmitButtonContainer\">" +
                            "<input tabindex=\"1\" class=\"officeBrowserFeedbackFontText officeBrowserFeedbackLineHeight mobileButtonSubmit\" id=\"officeBrowserFeedbackSubmitButton\" type=\"submit\" value=\"Submit\">" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"officeBrowserFeedbackFullWidth20pxHeight\" id=\"officeBrowserFeedbackPlaceHolderDiv2\"></div>" +
                    "<a tabindex=\"1\" class=\"officeBrowserFeedbackOverallAnchor officeBrowserFeedbackBackgroundGrey mobile\" id=\"officeBrowserFeedbackOverallSuggestAnchor\" role=\"button\" href=\"#\" value=\"I have a suggestion\">" +
                        "<span class=\"officeBrowserFeedbackOverallImage ms-Icon ms-Icon--lightBulb\" id=\"officeBrowserFeedbackOverallSuggestImage\"></span>" +
                        "<div class=\"officeBrowserFeedbackFontText officeBrowserFeedbackOverallText officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackOverallSuggestText\">I have a suggestion</div>" +
                    "</a>" +
                    "<div class=\"officeBrowserFeedbackMiddleFormMobileContainer\" id=\"officeBrowserFeedbackMiddleFormSuggestContainer\">" +
                        "<div class=\"officeBrowserFeedbackFontSubtitle officeBrowserFeedbackLineHeight officeBrowserFeedbackTextAlginLeft mobileMiddleText\" id=\"officeBrowserFeedbackQuestionMiddleText\" aria-live=\"polite\">" +
                            "<span>What is your suggestion?</span>" +
                        "</div>" +
                        "<textarea name=\"officeBrowserFeedbackComment\" tabindex=\"1\" class=\"officeBrowserFeedbackFontText\" id=\"officeBrowserFeedbackComment\" maxlength=\"1000\" placeholder=\"Please type in your comment\"></textarea>" +
                        "<div class=\"officeBrowserFeedbackSubmitButtonContainer\">" +
                            "<input tabindex=\"1\" class=\"officeBrowserFeedbackFontText officeBrowserFeedbackLineHeight mobileButtonSubmit\" id=\"officeBrowserFeedbackSubmitButton\" type=\"submit\" value=\"Submit\">" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"officeBrowserFeedbackFullWidth20pxHeight\" id=\"officeBrowserFeedbackPlaceHolderDiv3\"></div>" +
                    "<a tabindex=\"1\" class=\"officeBrowserFeedbackOverallAnchor officeBrowserFeedbackBackgroundGrey mobile\" id=\"officeBrowserFeedbackOverallBadStuffAnchor\" role=\"button\" href=\"#\" value=\"I'd like to report inappropriate content\">" +
                        "<span class=\"officeBrowserFeedbackOverallImage ms-Icon ms-Icon--quote\" id=\"officeBrowserFeedbackOverallSuggestImage\"></span>" +
                        "<div class=\"officeBrowserFeedbackFontText officeBrowserFeedbackOverallText officeBrowserFeedbackLineHeight\" id=\"officeBrowserFeedbackOverallSuggestText\">I'd like to report inappropriate content</div>" +
                    "</a>" +
                    "<div class=\"officeBrowserFeedbackMiddleFormMobileContainer\" id=\"officeBrowserFeedbackMiddleFormBadStuffContainer\">" +
                        "<div class=\"officeBrowserFeedbackFontSubtitle officeBrowserFeedbackLineHeight officeBrowserFeedbackTextAlginLeft mobileMiddleText\" id=\"officeBrowserFeedbackQuestionMiddleText\" aria-live=\"polite\">" +
                            "<span>What did you find that violates our </span><a href='\" + strPolicyUrl + \"'>User Content and Conduct Policy</a><span> ?</span>" +
                        "</div>" +
                        "<textarea name=\"officeBrowserFeedbackComment\" tabindex=\"1\" class=\"officeBrowserFeedbackFontText\" id=\"officeBrowserFeedbackComment\" maxlength=\"1000\" placeholder=\"Please type in your comment\"></textarea>" +
                        "<div class=\"officeBrowserFeedbackSubmitButtonContainer\">" +
                            "<input tabindex=\"1\" class=\"officeBrowserFeedbackFontText officeBrowserFeedbackLineHeight mobileButtonSubmit\" id=\"officeBrowserFeedbackSubmitButton\" type=\"submit\" value=\"Submit\">" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>" +
        "<i class=\"ms-Icon ms-Icon--x closebutton\"></i>" +
    "</div>" +
"</div>";

function chkIfDlg() {
    if (window.location.search != null) {
        if (window.location.search.toLowerCase().indexOf("isdlg=1") < 0)
            runFeedBack();
    }
}

function runFeedBack() {
    if (window.$) {
        $(document).ready(function () {
            if ($("a.msFeedback").length == 0)
            {
                var strHtml = "<a class=\"msFeedback\" href=\"#\">Feedback</a>";
                var html = $.parseHTML(strHtml);
                $("body").append(html);
            }
           
            $( document ).on("click", ".officeBrowserFeedbackOverallAnchor:not(.mobile)", function (event) {
                event.stopPropagation();
                $(".officeBrowserFeedbackFormContainer").removeClass("officeBrowserFeedbackHidden").addClass(" officeBrowserFeedbackVisible slideLeft");
                $("#officeBrowserFeedbackColumnSeparatorDiv").addClass(" officeBrowserFeedbackShowRightBorder ");
                var otherele = ".officeBrowserFeedbackOverallAnchor:not(#" + this.id + ")";
                $(otherele).removeClass("officeBrowserFeedbackBackgroundBLue").addClass("officeBrowserFeedbackBackgroundGrey");
                $(this).removeClass("officeBrowserFeedbackBackgroundGrey").addClass("officeBrowserFeedbackBackgroundBLue");
                var strQuestion = "";
                switch (this.id) {
                    case "officeBrowserFeedbackOverallLikeAnchor":
                        strQuestion = "<span>What do you like?</span><input type='hidden' value='Like'>";
                        break;
                    case "officeBrowserFeedbackOverallDontLikeAnchor":
                        strQuestion = "<span>What could we do better?</span><input type='hidden' value='Dislike'>";
                        break;
                    case "officeBrowserFeedbackOverallSuggestAnchor":
                        strQuestion = "<span>What is your suggestion?</span><input type='hidden' value='Suggestion'>";
                        break;
                    case "officeBrowserFeedbackOverallBadStuffAnchor":
                        var strPolicyUrl = _spPageContextInfo.siteServerRelativeUrl + "/pages/policy.aspx";
                        strQuestion = "<span>What did you find that violates our </span><a href='" + strPolicyUrl + "'>User Content and Conduct Policy</a><span> ?</span><input type='hidden' value='BadStuff'>";
                    default:
                        break;
                }
                $("#officeBrowserFeedbackQuestionMiddleText").empty();
                $("#officeBrowserFeedbackQuestionMiddleText").append(strQuestion);
            });
            $(document).on("click", ".officeBrowserFeedbackOverallAnchor.mobile", function (event) {
                event.stopPropagation();
                $(".officeBrowserFeedbackMiddleFormMobileContainer").hide();
                $(this).next().show();
                var otherele = ".officeBrowserFeedbackOverallAnchor:not(#" + this.id + ")";
                $(otherele).removeClass("officeBrowserFeedbackBackgroundBLue").addClass("officeBrowserFeedbackBackgroundGrey");
                $(this).removeClass("officeBrowserFeedbackBackgroundGrey").addClass("officeBrowserFeedbackBackgroundBLue");
            });
            $( document ).on("click", "#officeBrowserFeedbackOverlayBackground", function (event) {
                $(this).fadeOut("slow", function() { $(this).remove(); });
            });
            $( document ).on("click", "#officeBrowserFeedbackMainContainer", function (event) {
                event.stopPropagation();
            });
            $(document).on("click", "#officeBrowserFeedbackSubmitButton:not(.mobileButtonSubmit)", function (event) {
                event.stopPropagation();
                SubmitData();
                $("#officeBrowserFeedbackOverlayBackground").fadeOut("slow", function () { $(this).remove(); });
            });
            $(document).on("click", "#officeBrowserFeedbackSubmitButton.mobileButtonSubmit", function (event) {
                event.stopPropagation();
                SubmitData(this);
                $("#officeBrowserFeedbackOverlayBackground").fadeOut("slow", function () { $(this).remove(); });
            });
            $(document).on("click", "#officeBrowserFeedbackOverlayBackground i.closebutton", function (event) {
                $("#officeBrowserFeedbackOverlayBackground").fadeOut("slow", function () { $(this).remove(); });
            });
            $("a.msFeedback").on( "click", function(event) {
                event.stopPropagation();
                var screenWidth = $(window).width();
                if (screenWidth > 480)
                    $("body").append(dlgHtml);
                else
                    $("body").append(dlgMobileHtml);
                event.preventDefault();
            });
        });
    }
    else {
        window.setTimeout(runFeedBack, 50);
    }
}

function SubmitData(ele) {
    SP.SOD.executeFunc("sp.js", 'SP.ClientContext', function () {
        var siteUrl = _spPageContextInfo.siteServerRelativeUrl;
        var clientContext = new SP.ClientContext(siteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle('Feedback');
        var strTitle = '';
        var strComments = '';
        var strSourceUrl = window.location.href;

        if (ele) {
            strTitle = $(ele).parent().prev().prev().find(">:first-child").text();
            strComments = $(ele).parent().prev().val();
        }
        else {
            strTitle = $("#officeBrowserFeedbackQuestionMiddleText input[type='hidden']").val();
            strComments = $("#officeBrowserFeedbackComment").val();
        }

        var itemCreateInfo = new SP.ListItemCreationInformation();
        var oListItem = oList.addItem(itemCreateInfo);
        oListItem.set_item('Title', strTitle);
        oListItem.set_item('Comments', strComments);
        oListItem.set_item('SourceUrl', strSourceUrl);
        oListItem.update();
        clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
    });
}

function onQuerySucceeded() {
}

function onQueryFailed(sender, args) {
}