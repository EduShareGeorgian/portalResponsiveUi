function loadScriptAndStyleDependencies(assetRootUrl) {
    var rootScriptUrl = assetRootUrl + "/javascript";
    var rootStyleUrl = assetRootUrl + "/css";
    if ((window.location.href.indexOf('/_layouts') < 0 || (window.location.href.indexOf('/_layouts') >= 0 && window.location.href.indexOf('start.aspx#') >= 0)) && window.location.href.indexOf('/_catalogs') < 0 && window.location.href.indexOf('admin=1') < 0 && window.location.href.indexOf('AllItems.aspx') < 0 && window.location.href.indexOf('DispForm.aspx') < 0 && window.location.href.indexOf('EditForm.aspx') < 0 && window.location.href.indexOf('AllPages.aspx') < 0) {
        
        document.write('<link id="gc_responsive_ui_css" rel="stylesheet" href="' + rootStyleUrl + '/GC_responsive_ui.css?rev=8" /><link id="fabric_components_min_css" rel="stylesheet" href="' + rootStyleUrl + '/fabric.components.min.css?rev=9" /><link id="fabric_min_css" rel="stylesheet" href="' + rootStyleUrl + '/fabric.min.css?rev=10" /> <link rel="stylesheet" href="' + rootStyleUrl + '/EmergencyBroadcast.css?rev=8" /> <link rel="stylesheet" href="' + rootStyleUrl + '/georgianicon.css?rev=8" /> <link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-js/1.3.0/css/fabric.min.css" /> ');
        var headID = document.getElementsByTagName('head')[0];
        var newScript0 = document.createElement('script');
        newScript0.type = 'text/javascript';
        newScript0.src = 'https://code.jquery.com/jquery-3.1.1.min.js';
        newScript0.id = 'JQuery3.1.1';
        headID.appendChild(newScript0);
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = rootScriptUrl + '/GC-Responsive-UI.js?rev=3';
        newScript.id = 'PnPResponsiveUI';
        headID.appendChild(newScript);
        var newScript1 = document.createElement('script');
        newScript1.type = 'text/javascript';
        newScript1.src = rootScriptUrl + '/georgianfeedback.js?rev=bf19e4f64b204e1ebc2f762e33afcc97';
        newScript1.id = 'FeedbackScript';
        headID.appendChild(newScript1);
        var newScript2 = document.createElement('script');
        newScript2.type = 'text/javascript';
        newScript2.src = rootScriptUrl + '/checkeditmode.js?rev=bf19e4f64b204e1ebc2f762e33afcc97';
        newScript2.id = 'checkeditmode';
        headID.appendChild(newScript2);
        var newScript3 = document.createElement('script');
        newScript3.type = 'text/javascript';
        newScript3.src = rootScriptUrl + '/georgianuserprofileproperties.js?rev=bf19e4f64b204e1ebc2f762e33afcc97';
        newScript3.id = 'georgianuserprofileproperties';
        headID.appendChild(newScript3);
        var newScript4 = document.createElement('script');
        newScript4.type = 'text/javascript';
        newScript4.src = rootScriptUrl + '/EmergencyBroadcast.js?rev=bf19e4f64b204e1ebc2f762e33afcc97';
        newScript4.id = 'EmergencyBroadcast';
        headID.appendChild(newScript4);

       
    }
}