//change the old angular to this cdn
var angularScriptUrl = "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.js";
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
    $(topNavClone).find("li.selected").append(currentNavClone);

    $('#gcMobileMenu').append(topNavClone);

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
      // TODO: We are going to add these when it is ready for release
      // Add application insights to all pages
//      addApplicationInsights();
      // Add Google Analitics
//      addGoogleAnalytics();
      // For the Employee site, let's make this only available on the default page of the '
      // We want to get out without doing anything if this is a "/_layouts" page (unless it is a start.aspx page) or if admin=1 is passed as a query string
      if ((window.location.href.indexOf('/_layouts') >= 0 && window.location.href.indexOf('start.aspx#') < 0) || window.location.href.indexOf('admin=1') >= 0) return;
      // embedding and loading of all necessary CSS files and JS libraries
      var currentScriptUrl = $('#PnPResponsiveUI').attr('src');
      if (currentScriptUrl != undefined) {
          
        var currentScriptBaseUrl = currentScriptUrl.substring(0, currentScriptUrl.lastIndexOf("/") + 1);

        addViewport();

        loadCSS(currentScriptBaseUrl + 'fabric.components.min.css');
        loadCSS(currentScriptBaseUrl + 'fabric.min.css');

        //loadScript(currentScriptBaseUrl + 'angular.js', null);
        
        //*comment this so we can check if loading angular only once.
        //loadScript(angularScriptUrl, null);

          //  loadScript(currentScriptBaseUrl + 'checkeditmode.js', null);
      }

      PnPResponsiveApp.setUpToggling();
      PnPResponsiveApp.responsivizeSettings();

      // also listen for dynamic page change to Settings page
      window.onhashchange = function () { PnPResponsiveApp.responsivizeSettings(); };

      // extend/override some SP native functions to fix resizing quirks
      var originalResizeFunction = FixRibbonAndWorkspaceDimensions;
      FixRibbonAndWorkspaceDimensions = function () {
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

      // adding special class for top level element in student portal
      if ($("#DeltaTopNavigation_mobileClone .ms-core-listMenu-horizontalBox > ul.root > li").length > 1)
      {
          $("#DeltaTopNavigation_mobileClone").addClass("syncStudent");

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
  viewport.name = "viewport";
  viewport.content = "width=device-width, initial-scale=1";
  head.appendChild(viewport);
}


// embedding of jQuery, and initialization of responsiveness when ready
loadScript(angularScriptUrl, function () {
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