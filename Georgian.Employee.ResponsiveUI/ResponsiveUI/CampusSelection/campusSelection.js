function LoadCampusCtrl(callbackFunc) {
    var leaveMenu = 0;
    $('.cs_wrapper ul li a').each(function (index) {
        if ($(this).text().toUpperCase() == selCampus) {
            $(this).addClass('cs_choice_selected');
            $("#divSelCampus").text($(this).text());
            $("#divSelCampus").removeClass().addClass("cs_itemMain cs_itemMain_" + selCampus.toLowerCase());
            $("#divRightCampus").removeClass().addClass("cs_right cs_right_" + selCampus.toLowerCase());
            $("#divSelCampusDesc").text($(this).attr("title"));
        }
        else
            $(this).removeClass('cs_choice_selected');
    });

    if (callbackFunc != null)
        callbackFunc(selCampus);

    var $arrow = $('#ui_element').find('.cs_right');
    var $menu = $('#ui_element').find('ul');
    $arrow.bind('mouseenter', function () { showChoices(callbackFunc); });
    $('#divSelCampus').bind('mouseenter', function () { showChoices(callbackFunc); });
    $menu.bind('mouseleave', function (e) {
        e.stopImmediatePropagation();
        var $this = $(this);
        $('#divSelCampus').unbind("mouseenter");

        $this.stop().animate({ 'left': '-660px' }, 800, function () {
            //$arrow.stop().animate({ 'left': '40px' }, 500);
        });
        setTimeout(function () { $('#divSelCampus').bind('mouseenter', function () { showChoices(callbackFunc); }) }, 500);
    });

    $('#ui_element').find('ul').css({
        'left': '-660px'
    }).siblings('.cs_right').css({
        'left': '40px'
    });
}

function showChoices(func) {
    var $arrow = $('#ui_element').find('.cs_right');
    var $menu = $('#ui_element').find('ul');

    //$arrow.stop().animate({ 'left': '-40px' }, 50);
    $menu.stop().animate({ 'left': '0px' }, 500, function () {
        $(this).find('a')
        .unbind('click')
        .unbind('mouseenter')
        .unbind('mouseleave')
        .unbind('mousemove')
        .bind('mouseenter', function (event) {
            $(this).addClass('hover');
        })
        .bind('mouseleave', function (event) {
            $(this).removeClass('hover');
        })
        .bind('mousemove', function (event) {
        })
        .bind('click', function (e) {
            e.stopPropagation();
            var $this = $(this);

            //Emulate changing campus
            var selectedCampus = $this.text();
            var oldCampus = $(".cs_itemMain").text();
            $(".cs_itemMain").text(selectedCampus);
            $(".cs_itemMain").removeClass("cs_itemMain_" + oldCampus).addClass("cs_itemMain_" + selectedCampus);
            $(".cs_right").removeClass("cs_right_" + oldCampus).addClass("cs_right_" + selectedCampus);
            //cs_right_mi
            $(".cs_wrapper .cs_choice_selected").removeClass("cs_choice_selected");
            $(this).addClass("cs_choice_selected");
            $("#divSelCampusDesc").text($(this).attr("title"));
            $this.stop().animate({ 'left': '-660px' }, 500, function () {
                //$arrow.stop().animate({ 'left': '0px' }, 5);
            });
            func(selectedCampus);
        });
    });
}
