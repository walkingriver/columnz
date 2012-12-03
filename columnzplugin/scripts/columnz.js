(function ($) {
    $.fn.columnz = function () {
        var $table = this,
        $wrapper;
        
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
                $link = $('<a class="columnzClose" data-column="' + child + '">&nbsp;</a>'),

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
                $nthCell.fadeIn(300);
            } else {
                $nthCell.fadeOut(300);
            }
        });

        // Create a delegate on the first row to deal with a click on our close links.
        $table.delegate('tr:first th a.columnzClose', 'click', function (e) {
            var $e = $(e.currentTarget),
            nth = $e.closest('th').index() + 1,
            $nthCell = $e.closest('table').find('td:nth-child(' + nth + '),th:nth-child(' + nth + ')');

            $nthCell.fadeOut(300);

            // Find the checkbox and uncheck it
            $('input:checkbox.columnzCheckbox[data-column=' + nth + ']').prop('checked', false);
        });

        return $table;
    };
})(jQuery);
