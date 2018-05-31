(function() {
  'use strict';

  const input = '.api-search input',
    table = '.api-content table',
    tableItem = '.api-content .table-collapse__btn',
    filterButtons = '.api-sidebar button',
    checkboxColumns = '.api-content th .checkbox input';

  $(input).on('keyup', searchTable);
  $(checkboxColumns).on('change', setPlaceholder);
  $(filterButtons).on('click', function() {
    filterTable(this);
  });

  function setPlaceholder() {
    let searchText = '';

    $(checkboxColumns).each(function() {
      if ($(this).is(':checked')) {
        const placeholder = $(this).data('placeholder');

        searchText +=
          searchText === '' ? `search by ${placeholder}` : ` or ${placeholder}`;
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

      $elements.toggle(string.indexOf(filter) > -1);
    });
  }

  function filterTable(button) {
    let $filterElements = $();

    console.log($(filterButtons));
    // disable other buttons if all are is-active
    if ($(filterButtons).length === $(`${filterButtons}.is-active`).length) {
      $(button)
        .siblings()
        .removeClass('is-active');
    } else {
      $(button).toggleClass('is-active');
    }

    $(filterButtons).each(function() {
      if (!$(this).hasClass('is-active'))
        $filterElements = $filterElements.add(
          $(`${table} tr.is-${$(this).data('target')}`)
        );
    });

    $(`${table} tr`).removeClass('is-filtered');

    $filterElements.addClass('is-filtered');

    searchTable();
  }
})();
