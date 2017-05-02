/* PnP SharePoint - Responsiveness */

var PnPResponsiveApp = PnPResponsiveApp || {};

PnPResponsiveApp.responsivizeSettings = function () {
	// return if no longer on Settings page
	if (window.location.href.indexOf('/settings.aspx') < 0) return;
	
	// find the Settings root element, or wait if not available yet
	var settingsRoot = $(".ms-siteSettings-root");
	if (!settingsRoot.length) {
		setTimeout(PnPResponsiveApp.responsivizeSettings, 100);
        return;
	}
	
	$(".ms-siteSettings-root .ms-linksection-level1").each(function () {
		var self = $(this);
		var settingsDiv = $('<div>');
		$(settingsDiv).addClass("pnp-settingsdiv");
		$(self).find(".ms-linksection-iconCell img").appendTo(settingsDiv);
		$(self).find(".ms-linksection-textCell").children().appendTo(settingsDiv);
		$(settingsDiv).appendTo(settingsRoot);
	});
	$(settingsRoot).find("table").remove();
}


PnPResponsiveApp.setUpToggling = function () {
	// if it is already responsivized, return
    if ($("#navbar-toggle").length)
        return;
    // setup the current navigation first
    setupCurrentNav();
    // Set up sidenav toggling
    var topNav = $('#DeltaTopNavigation');
    var topNavClone = topNav.clone();
    topNavClone.attr('id', topNavClone.attr('id') + "_mobileClone");
    if ($('#menuTogglePanel').length == 0) {
        $('body').append("<div class=\"ms-Overlay ms--Overlay--dark\" style=\"display:none\" id=\"menuTogglePanel\"></div>" +
        "<div class=\"ms-Panel-main ms-Panel unSelMenu\" id=\"gcTopNavPanel\">" +
        "<div class=\"docs-MobileNav-items\" role=\"navigation\" aria-label=\"Fabric Menu\" id=\"gcMobileMenu\">" +
        "</div></div>");
        var currentNav = $('.ms-core-listMenu-verticalBox', $('#DeltaPlaceHolderLeftNavBar')).first();
        var currentNavClone = currentNav.clone();
        var menuTitle = $("ul.root > li > a span.menu-item-text", currentNavClone).first().text();

        var newNav = $("ul", currentNavClone)[1]; // the first item is the parent, take the child        

        var elem = $(newNav).detach();
        // delete the original root
        // add these classes
        // root ms-core-listMenu-root static
        $(elem).addClass("root ms-core-listMenu-root static");
        currentNavClone.append(elem);
        var oldNav = $("ul", currentNavClone)[0];
        $(oldNav).remove();
        // Let's make sure that the correct Global Nav item is currently selected. Seems SharePoint isn't doing a good job at this
        // for us
        if (menuTitle) {
            var curSelTopNav = $(topNav).find(".ms-core-listMenu-horizontalBox > ul > li.selected");
            var selectedTopNav = $(topNav)
                .find(".ms-core-listMenu-horizontalBox > ul > li > a > span > span:contains(" + menuTitle + ")")
                .parent()
                .parent()
                .parent();
            if (selectedTopNav.length > 0) {
                curSelTopNav.removeClass("selected");
                selectedTopNav.addClass("selected");
            }
            var curSelCloneTopNav = $(topNavClone).find(".ms-core-listMenu-horizontalBox > ul > li.selected");
            var selectedCloneTopNav = $(topNavClone)
                .find(".ms-core-listMenu-horizontalBox > ul > li > a > span > span:contains(" + menuTitle + ")")
                .parent()
                .parent()
                .parent();
            if (selectedCloneTopNav.length > 0) {
                curSelCloneTopNav.removeClass("selected");
                selectedCloneTopNav.addClass("selected");
            }
        }
        // Let's see something is currently selected
        // find the second level ul and move it to the top
        //var newNav = $(currentNavClone).children("ul")[0].find("ul").detach();
        //$(currentNavClone).append(newNav);
        //$(currentNavClone).children("ul").remove();
        $(topNavClone).find("li.selected").append(currentNavClone);

        $('#gcMobileMenu').append(topNavClone);
        // Add the left navigation to the mobile menu
        //$(currentNavClone).wrap("<div id=\"DeltaPlaceHolderLeftNavBar_mobileClone\" class=\"ms-core-navigation\" role=\"navigation\">");
        //currentNavClone.attr('id', currentNavClone.attr('id') + "_mobileClone");
        //$('#gcMobileMenu').append("<hr/>");
        //$('#gcMobileMenu').append("<div id=\"DeltaPlaceHolderLeftNavBar_mobileClone\" class=\"ms-core-navigation\" role=\"navigation\">" + $(currentNavClone).html() + "</div>");
        //$('#gcMobileMenu').append(currentNavClone);
        //$('#gcMobileMenu').append("</div>");
        //$('#gcMobileMenu #DeltaPlaceHolderLeftNavBar_mobileClone').append(currentNavClone);

        $('#gcMobileMenu ul.root > li >a').wrap("<div class='wrpDiv'></div>");
        $('#gcMobileMenu .dynamic-children.additional-background').parent().after("<i class='ms-Icon icon-x-small ms-Icon--chevronThickUp'></i>");
        $('#gcMobileMenu .dynamic-children .dynamic').addClass("gcdynamic");
        $('#gcMobileMenu .dynamic-children .gcdynamic').removeClass("dynamic");
        $('#gcMobileMenu .dynamic-children ul.gcdynamic').addClass("gcdynamicUnSelected");
        $('#s4-titlerow').prepend("<i class='ms-Icon ms-Icon--menu hamburgMenuIcon'></i>");
        $('#gcMobileMenu .no-mobile').removeClass('no-mobile');
        $('#gcMobileMenu .wrpDiv > i').click(function () {
            if ($(this).hasClass("ms-Icon--chevronThickUp")) {
                $(this).addClass("ms-Icon--chevronThickDown");
                $(this).removeClass("ms-Icon--chevronThickUp");
                $(this).parent().next().removeClass("gcdynamicUnSelected");
            }
            else if ($(this).hasClass("ms-Icon--chevronThickDown")) {
                $(this).addClass("ms-Icon--chevronThickUp");
                $(this).removeClass("ms-Icon--chevronThickDown");
                $(this).parent().next().addClass("gcdynamicUnSelected");
            }
        });

        $('.hamburgMenuIcon').click(function () {
            $('#gcTopNavPanel').removeClass("unSelMenu");
            $('#menuTogglePanel').css("display", "block");
        });

        $('#menuTogglePanel').click(function () {
            $(this).css("display", "none");
            $('#gcTopNavPanel').addClass("unSelMenu");
        });
    }

    $(".ms-navedit-linkNode").each(function () {
        if ($(this).attr("href")) {
            if ($(this).attr("href").indexOf("fs.georgianc.on.ca") >= 0) {
                $(this).attr('target', '_blank');
            }
        }
    });
}

PnPResponsiveApp.init = function () {
    if (!window.jQuery) {
        // jQuery is needed for PnP Responsive UI to run, and is not fully loaded yet, try later
        setTimeout(PnPResponsiveApp.init, 100);
    } else {
        $(function () { // only execute when DOM is fully loaded
            // Add application insights to all pages
            addApplicationInsights();
            // Add Google Analitics
            addGoogleAnalytics();
            // We want to get out without doing anything if this is a "/_layouts" page or if admin=1 is passed as a query string
            if ((window.location.href.indexOf('/_layouts') >= 0 && window.location.href.indexOf('start.aspx#') < 0 ) || window.location.href.indexOf('admin=1') >= 0) return;
            // embedding and loading of all necessary CSS files and JS libraries
            var currentScriptUrl = $('#PnPResponsiveUI').attr('src');
            if (currentScriptUrl != undefined) {
                var currentScriptBaseUrl = currentScriptUrl.substring(0, currentScriptUrl.lastIndexOf("/") + 1);

                addViewport();
                //loadCSS(currentScriptBaseUrl + 'fabric.components.min.css');
                //loadCSS(currentScriptBaseUrl + 'fabric.min.css');

                loadScript(currentScriptBaseUrl + 'angular.js', null);
              //  loadScript(currentScriptBaseUrl + 'checkeditmode.js', null);
            }

            PnPResponsiveApp.setUpToggling();
			PnPResponsiveApp.responsivizeSettings();
			
			// also listen for dynamic page change to Settings page
			window.onhashchange = function () { PnPResponsiveApp.responsivizeSettings(); };
			
			// extend/override some SP native functions to fix resizing quirks
			var originalResizeFunction = FixRibbonAndWorkspaceDimensions;
			FixRibbonAndWorkspaceDimensions = function() {
				// let sharepoint do its thing
				originalResizeFunction();
				// fix the body container width
				//$("#s4-bodyContainer").width($("#s4-workspace").width() );
			}

            // Fixing font-family settings for inherited styles or styles coming from Fabric UI
			$(".ms-backgroundImage").css("font-family", '"Segoe UI","Segoe",Tahoma,Helvetica,Arial,sans-serif');
            // Override H1 tag default colour (coming from Fabric UI) 
			$(".ms-rtestate-field h1").css("color", "black");
			$(".h1.ms-rteElement-H1").css("color", "black");
            // Override H2 tag
			$(".h2").css("color", "black");

        });
    }
}

/* Dynamic CSS/JS embedding and loading */
function loadCSS(url) {
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
	style.type = 'text/css';
	style.rel = 'stylesheet';
    style.href = url;
    head.appendChild(style);
}
function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

function addViewport() {
    var head = document.getElementsByTagName('head')[0];
    var viewport = document.createElement('meta');
    viewport.name= "viewport";
    viewport.content= "width=device-width, initial-scale=1"; 
    head.appendChild(viewport);
}


// embedding of jQuery, and initialization of responsiveness when ready
loadScript("//code.jquery.com/jquery-1.12.0.min.js", function() {
    PnPResponsiveApp.init();
});

function enableResponsiveUi() {
    alert("enable!");
    enableResponsiveUi(true);
}

function disableResponsiveUi() {
    alert("disable!");
    enableResponsiveUi(false);
}

function enableResponsiveUi(enable) {
    //alert("Checking Edit Mode");
    var css = $("#gc_responsive_ui_css");
    
    try {
        css.prop('disabled', !enable);
    } catch (e) {
        // probably not is edit mode, continue
        alert("Unable to set responsive mode in gc-responsive-ui.js");
    }
}

function addApplicationInsights() {
    // Add the js to the begining of every sharepoint page!
    var head = document.getElementsByTagName('head')[0];
    var appInsights = document.createElement('script');
    appInsights.type = 'text/javascript';
    appInsights.innerText = 'var appInsights=window.appInsights||function(config){    function i(config){t[config]=function(){var i=arguments;t.queue.push(function(){t[config].apply(t,i)})}}var t={config:config},u=document,e=window,o="script",s="AuthenticatedUserContext",h="start",c="stop",l="Track",a=l+"Event",v=l+"Page",y=u.createElement(o),r,f;y.src=config.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js";u.getElementsByTagName(o)[0].parentNode.appendChild(y);try{t.cookie=u.cookie}catch(p){}for(t.queue=[],t.version="1.0",r=["Event","Exception","Metric","PageView","Trace","Dependency"];r.length;)i("track"+r.pop());return i("set"+s),i("clear"+s),i(h+a),i(c+a),i(h+v),i(c+v),i("flush"),config.disableExceptionTracking||(r="onerror",i("_"+r),f=e[r],e[r]=function(config,i,u,e,o){var s=f&&f(config,i,u,e,o);return s!==!0&&t["_"+r](config,i,u,e,o),s}),t    }({        instrumentationKey:"8be97366-9c9a-4a91-a5aa-96ad9006fea4"    });           window.appInsights=appInsights;    appInsights.trackPageView();';
    head.appendChild(appInsights);
}

function addGoogleAnalytics() {
    // Add the js to the begining of every sharepoint page!
    var head = document.getElementsByTagName('head')[0];
    var googleAnal = document.createElement('script');
    googleAnal.type = 'text/javascript';
    googleAnal.innerText = '(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,"script","https://www.google-analytics.com/analytics.js","ga"); ga("create", "UA-343936-19", "auto"); ga("send", "pageview");';
    head.appendChild(googleAnal);
}

function showCallapseNavChevron(element, time) {
    $(element).removeClass("ms-commentexpand-iconouter");
    $(element).addClass("ms-commentcollapse-iconouter");
    $("svg#chevronSvg", element).attr("alt", "Collapse");
    $("svg#chevronSvg", element)
        .css({
            "-webkit-transform": "rotate(180deg)",
            "transform": "rotate(180deg)",
            "-webkit-transform-origin": "50% 50%",
            "transform-origin": "50% 50%",
            "-webkit-transition-duration": time, /* Safari */
            "transition-duration": time
        });
    $("svg#chevronSvg", element).removeClass("ms-commentexpand-icon");
    $("svg#chevronSvg", element).addClass("ms-commentcollapse-icon");

}

function showExpandNavChevron(element, time) {
    $(element).removeClass("ms-commentcollapse-iconouter");
    $(element).addClass("ms-commentexpand-iconouter");
    $("svg#chevronSvg", element).attr("alt", "Expand");
    $("svg#chevronSvg", element).css({
        "-webkit-transform": "rotate(0)",
        "transform": "rotate(0)",
        "-webkit-transform-origin": "50% 50%",
        "transform-origin": "50% 50%",
        "-webkit-transition-duration": time, /* Safari */
        "transition-duration": time
    });
    $("svg#chevronSvg", element).removeClass("ms-commentcollapse-icon");
    $("svg#chevronSvg", element).addClass("ms-commentexpand-icon");
}

function setupCurrentNav() {
    // Let's look for the ql-icon, if it exists, then exit this
    if ($("span.ql-icon").length > 0) return;
    // Find all the top level links in the Quick Launch that have children
    var topLevelLinks = $("div[id$='QuickLaunchMenu'] > ul > li:has('ul') > a");
    var chevronSvg = "<svg id=\"chevronSvg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 12\" alt=\"Collapse\" style=\"transform-origin: 50% 50%; transform: rotate(180deg);\"><path id=\"chevron\" d=\"m 6,9 -6,-6 1,0 5,5 5,-5 1,0 z\" /></svg>";
    // Prepend the little chevron icon inline to each top level link
    topLevelLinks
        .prepend("<span class='ms-commentexpand-iconouter ql-icon'>" + chevronSvg + "&nbsp;</span>");
    // Delete items from the nav that are not links
    topLevelLinks.parent().find("li:not(:has(a))").remove();
    // Delete the top level links that are not part of the current site
    var topLevelSelected = topLevelLinks.parent().parent().find("> li.selected");
    if (topLevelSelected.length > 0) {
        // we found one selected - we can delete the rest and end there
        topLevelLinks.parent().parent().find("> li:not(.selected)").remove();
        // If there is not a link, remove it
    } else {
        // Here we must have a child selected, find the parent


        // We're starting with all of the sections collapsed. If you want them expanded, comment this out.
        // If there is only one section, let's keep it expanded
        var linksToCollapse = topLevelLinks.closest("li").find("> ul");
        if (linksToCollapse.length > 1) {
            $.each(linksToCollapse,
                function (key, value) {
                    var anchorElmt = $(value).parent().find("a").find("span.ql-icon");
                    // nothing is selected 
                    if ($(value).closest("ul").find("> li.selected").length === 0) {
                        $(value).parent().remove();
                        showExpandNavChevron($(anchorElmt), "0");
                    }
                });
            // if the left nav item has no children, remove it because we would not be here if it
            // did
            var noChildren = $("div[id$='QuickLaunchMenu'] > ul > li:not(:has('ul'))");
            if (noChildren.length > 1) {
                $.each(noChildren,
                    function (key, value) {
                        $(value).remove();
                    });
            }
        }
    }
    // don't hide them if there is a selected item below
    var chevrons = $(topLevelLinks).find("span.ql-icon");
    // We want the user to click on the chevron in order to expand and collapse
    // Set up for the click even of on the chevron
    chevrons.click(function (e) {

        // We're going to stop the default behavior - shouldn't be any
        e.preventDefault();

        // Find the elements we need to work with
        var childUl = $(this).closest("li").find("> ul");
        var isVisible = childUl.is(":visible");

        // If the section is visible, hide it, and vice versa
        if (isVisible) {
            // flip the chevron        
            showExpandNavChevron(this, "200ms");

            // Hide the child links by sliding up. Note: You could change the effect here.
            childUl.slideUp();

        } else {
            // flip the chevron        
            showCallapseNavChevron(this, "200ms");

            // Show the child links by sliding down. Note: You could change the effect here.
            childUl.slideDown();

        }

    });

}

function isElementInViewport(el) {
    if (!el)
        return false;
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function loadItemsInView() {
    //Select elements by the row id.
    $("#row [data-src]").each(function () {
        var isVisible = isElementInViewport(this);
        if (isVisible) {
            if ($(this).attr("src") == undefined) {
                $(this).attr("src", $(this).data("src"));
            }
        }
    });
}

function runGcScroll() {
    if (window.$) {
        $(document).ready(function () {       
            $(window).on("scroll", function () {
                loadItemsInView();
            });
        });
    } else {
        window.setTimeout(runGcScroll, 50);
    }
}

runGcScroll();

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
function runGcCheckEditMode() {
    if (window.jQuery) {
        jQuery(document)
            .ready(function() {
                var css = $("#gc_responsive_ui_css");
                var disable = false;
                try {
                    var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
                    if (inDesignMode === "1" && css != null) {
                        // page is in edit mode
                        disable = true;
                    }
                } catch (e) {
                    // probably not is edit mode, continue
                }

                try {
                    var wikiInEditMode = document.forms[MSOWebPartPageFormName]._wikiPageMode.value;
                    if (wikiInEditMode === "Edit" && css != null) {
                        disable = true;
                        // wiki page is in edit mode
                    }
            }
            catch (e) {
                    // probably not is edit mode, continue
                }
                try {
                    if (disable) {
                        //alert("Edit Mode!");
                        css.prop('disabled', true);
                    }
                } catch (e) {
                    // probably not is edit mode, continue
                    alert("Unable to set edit mode in checkeditmode.js");
                }
            });

    } else {
        window.setTimeout(runGcCheckEditMode, 50);
    }
}
runGcCheckEditMode();


function getCurrentUserProperty(propertyName) {
    var returnVal = null;
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
        async: false,
        headers: { Accept: "application/json;odata=verbose" },
        success: function (data) {
            try {
                var properties = data.d.UserProfileProperties.results;
                for (var i = 0; i < properties.length; i++) {
                    var property = properties[i];
                    if (property.Key == propertyName) {
                        returnVal = property.Value;
                    }
                }
            } catch (err2) {
                alert(JSON.stringify(err2));
            }
        },
        error: function (jQxhr, errorCode, errorThrown) {
            alert(errorThrown);
        }
    });
    return returnVal;
}