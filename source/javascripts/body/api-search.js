(function() {
  'use strict';

  const input = '.api-search input';
  const tableItem = '.table-collapse__btn';

  $(input).on('keyup', value => searchTable());

  function searchTable() {
    $(tableItem).each((index, element) => {
      const string = $(element)
        .find('.search-by-name')
        .html();
      const filter = $(input).val();
      const $elements = $(element).add($(element).next());

      if (string.indexOf(filter) > -1) {
        $elements.show();
      } else {
        $elements.hide();
      }
    });
  }
})();
