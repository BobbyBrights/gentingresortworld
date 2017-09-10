$(document).ready(function () {
  // OPEN MORE DETAILS
  $('body').on('click', '#btn-show-detail-more', function() {
    $('#show-detail-more').addClass('in');
  });

  $('body').on('click', '#show-detail-more button', function() {
    $('#show-detail-more').removeClass('in');
  });

  // ADD SHOWS
  $('#add-show').on('click', function() {
    var date = $('select[name="showDate"]').val(),
        seatVal = $('select[name="showSeat"]').val(),
        seatSplit = seatVal.split("|"),
        seat = seatSplit[0],
        qty = $('select[name="showQty"]').val(),
        price = seatSplit[1] * qty;

    var newRow = '<tr class="row-review-show"><td>'+ date +'</td><td>'+ seat +'</td><td>'+ qty +'</td><td class="price">MYR'+ price.toFixed(2) +'</td><td><button class="icon icon-minus-circle btn-remove"><span class="sr-only">Remove</span></button></td></tr>';

    $('#table-show-selection tr.add-row').before(newRow);
  });

  // REMOVE SHOWS
  $('body').on('click', '.btn-remove', function() {
    $(this).parents('tr').remove();
  });
});