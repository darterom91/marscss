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

      if (string.indexOf(filter) > -1) {
        console.log(string);
        $(element)
          .show()
          .next()
          .show();
      } else {
        $(element)
          .hide()
          .next()
          .hide();
      }
    });
  }

  function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('myUL');
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName('a')[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  }
})();
