(function() {
  'use strict';

  const input = '.api-search input',
    tableItem = '.api-content .table-collapse__btn',
    checkboxColumns = '.api-content th .checkbox input';

  $(input).on('keyup', searchTable);
  $(checkboxColumns).on('change', setPlaceholder);

  function setPlaceholder() {
    let searchText = '';

    $(checkboxColumns).each(function() {
      if ($(this).is(':checked')) {
        const placeholder = $(this).data('placeholder');

        searchText +=
          searchText === '' ? `search by ${placeholder}` : ` and ${placeholder}`;
      }
    });

    $(input)
      .prop('disabled', searchText === '')
      .attr('placeholder', searchText);

    searchTable();
  }

  function searchTable() {
    $(tableItem).each(function() {
      const filter = $(input).val();
      const $this = $(this);
      const $elements = $(this).add($(this).next());

      let string = '';

      $(checkboxColumns).each(function() {
        if ($(this).is(':checked')) {
          string += $this.find($(this).data('target')).text();
        }
      });

      if (string.indexOf(filter) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
})();
