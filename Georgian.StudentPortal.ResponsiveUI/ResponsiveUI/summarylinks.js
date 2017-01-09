$(document).ready(function () {
    /* Slide up all link items and hide them */
    $(".dfwp-list").slideUp("fast");

    /* Binding a click event handler to the links: */

    $('.groupheader')
        .click(function(e) {

            /* Finding the drop down list that corresponds to the current section: */
            var dropDown = $(this).next(".dfwp-list");

            /* Closing all other drop down sections, except the current one */
            $('.dfwp-list').not(dropDown).slideUp('slow');
            dropDown.slideToggle('slow');

            /* Preventing the default event (which would be to navigate the browser to the link's address) */
            e.preventDefault();
        });
})
