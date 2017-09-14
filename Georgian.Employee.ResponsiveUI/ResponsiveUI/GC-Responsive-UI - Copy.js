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

    // Set up sidenav toggling
    var topNav = $('#DeltaTopNavigation');
    var topNavClone = topNav.clone();
    topNavClone.addClass('mobile-only');
    topNavClone.attr('id', topNavClone.attr('id') + "_mobileClone");
    topNav.addClass('no-mobile');
    $('#sideNavBox').append(topNavClone);
    var sideNavToggle = $('<button>');
    sideNavToggle.attr('id', 'navbar-toggle');
    sideNavToggle.addClass('mobile-only');
    sideNavToggle.attr('type', 'button');
    sideNavToggle.click(function() { 
        $("body").toggleClass('shownav');
    });
    $("#pageTitle").before(sideNavToggle);
}

PnPResponsiveApp.init = function () {
    if (!window.jQuery) {
        // jQuery is needed for PnP Responsive UI to run, and is not fully loaded yet, try later
        setTimeout(PnPResponsiveApp.init, 100);
    } else {
        $(function() { // only execute when DOM is fully loaded

            // embedding and loading of all necessary CSS files and JS libraries
            var currentScriptUrl = $('#PnPResponsiveUI').attr('src');
            if (currentScriptUrl != undefined) {
                var currentScriptBaseUrl = currentScriptUrl.substring(0, currentScriptUrl.lastIndexOf("/") + 1);

                addViewport();
                //loadCSS(currentScriptBaseUrl + 'gc_responsive_ui.css');
                loadCSS(currentScriptBaseUrl + 'fabric.components.min.css');
                loadCSS(currentScriptBaseUrl + 'fabric.min.css');

                loadScript(currentScriptBaseUrl + 'jquery.fabric.min.js', null);
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
				$("#s4-bodyContainer").width($("#s4-workspace").width() );
			}
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


var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
  if (e.data)
  {
      if (e.data.indexOf("<message>LoadClassProfile") >=0 )
      {
          //console.log('parent received message!:  ',e.data);
          //console.log($(".ms-Dialog--sample").length);
          if ($(".ms-Dialog--sample").length == 0)
          {
            var elementStr = '<div class="ms-Dialog ms-Dialog--sample">' +
                        '<div class="ms-Overlay ms-Overlay--dark js-DialogAction--close"></div>' + 
                    '<div class="ms-Dialog-main" style="height:400px; background-color:#77c4d4"><button class="ms-Dialog-button ms-Dialog-button--close js-DialogAction--close"> <i class="ms-Icon ms-Icon--x"></i> </button>' +
                        '<div class="ms-Dialog-inner">' +
                        '<div class="ms-Dialog-content">' + 
                            '<iframe src="" class="classprofileiframe" style="width:100%; height:380px;"></iframe>' +
                        '</div>' +
                        '</div>' +
                    '</div>' +
                    '</div>';
            $('body').append(elementStr);
            //console.log('append dialog');
          }
          //console.log($(".ms-Dialog--sample").length);
          
          
           var startIndex = e.data.indexOf('(');
          var endIndex = e.data.indexOf(')');
          var cpUrl = e.data.substring(startIndex + 1,  endIndex);
          //cpUrl = "https://georgiantimetableservices.azurewebsites.net/Pages/ClassProfile.aspx?SubjectCode=FIRE&CourseCode=1087&Location=BA:B:125";
          //console.log('class profile url!:  ',cpUrl);
          $(".classprofileiframe").attr('src', cpUrl);
          $(".ms-Dialog--sample").show();
          $(".ms-Dialog--sample").find(".js-DialogAction--close").each(function() {
                $(this).on('click', function () {
                    $(".ms-Dialog--sample").hide();
                });
            });

      }
    }
 },false);