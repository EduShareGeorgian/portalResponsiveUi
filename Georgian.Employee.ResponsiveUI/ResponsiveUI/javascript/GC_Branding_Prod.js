if ((window.location.href.indexOf('/_layouts') < 0 || (window.location.href.indexOf('/_layouts') >= 0 && window.location.href.indexOf('start.aspx#') >= 0)) && window.location.href.indexOf('/_catalogs') < 0 && window.location.href.indexOf('admin=1') < 0 && window.location.href.indexOf('AllItems.aspx') < 0 && window.location.href.indexOf('AllPages.aspx') < 0) {
    var a = window.location.href.indexOf("sites");
    var b = window.location.href.indexOf("/", a + 6);
    var c = window.location.href.substring(0, b);
    document.write('<link id="gc_responsive_ui_css" rel="stylesheet" href="' + c + '/Style Library/SP.Responsive.UI/bundle.min.css" /> ')
    var headID = document.getElementsByTagName('head')[0];
    var newScript0 = document.createElement('script');
    newScript0.type = 'text/javascript';
    newScript0.src = 'https://code.jquery.com/jquery-3.1.1.min.js';
    newScript0.id = 'jQuery-3.1.1';
    newScript0.integrity = 'sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=';
    var a = document.createAttribute('crossorigin');
    a.value = 'anonymous';
    newScript0.setAttributeNode(a);
    headID.appendChild(newScript0);
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = c + '/Style Library/SP.Responsive.UI/bundle.min.js?rev=bf19e4f64b204e1ebc2f762e33afcc98';
    newScript.id = 'PnPResponsiveUI';
    headID.appendChild(newScript);
}