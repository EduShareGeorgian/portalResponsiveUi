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

