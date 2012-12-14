(function ($) {
    $.fn.columnz = function () {
        var $table = this,
            hide = $.browser.msie ? function(e) {
                $(e).hide();
            } : function(e) {
                $(e).fadeOut(300);
            },
            show = $.browser.msie ? function(e) {
                $(e).show();
            } : function(e) {
                $(e).fadeIn(300);
            },
            $wrapper,
            isInitialized = $table.data('columnzInitialized');
        
        // Todo: Make sure 'this' is a table...
        
        // This prevents the plug-in from being called multiple times on the same element.
        if (isInitialized === true) return $table;

        $table.wrap('<div class="columnzSelectionWrapper" />');
        $table.before($('<a class="columnzDropdown">&nbsp;</a><div class="columnzSelection"><ul></ul></div>'));
        $wrapper = $table.closest('.columnzSelectionWrapper');

        // Create a click handler for our menu button to display the selection of column checkboxes.
        $('a.columnzDropdown').click(function (e) {
            var $e = $(e.currentTarget),
            $menuDiv = $e.siblings('.columnzSelection');

            $menuDiv.stop().slideToggle('fast');
        });

        $table.find('tr:first th')
            .addClass('columnz') // Sets up the positioning for the child elements
            .each(function (i, e) {
                var child = i + 1,
                // Create a link to use as a column close icon
                $link = $('<span class="wrappingSpanToFixIE9"><a class="columnzClose" data-column="' + child + '">&nbsp;</a></span>'),

                // Create a checkbox for this column to add to the dropdown menu
                text = $(e).text(),
                $checkbox = $('<li><label><input class="columnzCheckbox" type="checkbox" data-column="' + child + '" checked="checked" />&nbsp;' + text + '</label></li>');

                // Add the checkbox to the dropdown menu
                $('div.columnzSelection ul').append($checkbox);

                // Add the close icon to the table header
                $link.prependTo($(e));
            });

        // Create a click handler for each checkbox in our menu list.
        $wrapper.delegate('input:checkbox', 'click', function (e) {
            var $e = $(e.currentTarget),
                isChecked = $e.prop('checked'),
                // Get the column associated with the checkbox
                nth = $e.data('column'),
                // Find the column with the same data-column
                $nthCell = $table.find('td:nth-child(' + nth + '),th:nth-child(' + nth + ')');

            // Show or hide it.
            if (isChecked) {
                show($nthCell);
            } else {
                hide($nthCell);
            }
        });

        // Create a delegate on the first row to deal with a click on our close links.
        $table.delegate('tr:first th a.columnzClose', 'click', function (e) {
            var $e = $(e.currentTarget),
            nth = $e.closest('th').index() + 1,
            $nthCell = $e.closest('table').find('td:nth-child(' + nth + '),th:nth-child(' + nth + ')');

            hide($nthCell);

            // Find the checkbox and uncheck it
            $('input:checkbox.columnzCheckbox[data-column=' + nth + ']').prop('checked', false);
        });

        $table.data('columnzInitialized', true);
        return $table;
    };
})(jQuery);
