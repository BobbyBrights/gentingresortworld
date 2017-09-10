$(document).ready(function () {
  // OPEN MORE DETAILS
  $('body').on('click', '#btn-show-detail-more', function() {
    $('#show-detail-more').addClass('in');
  });

  $('body').on('click', '#show-detail-more button', function() {
    $('#show-detail-more').removeClass('in');
  });

  // CALCULATE SHOWS PRICE
  function updateShowTotalPrice(total, num) {
    return total + num;
  }

  var showTotalBooking = 0;
  var showTotalPrice = [];

  // ADD SHOWS
  $('#add-show').on('click', function() {
    var date = $('#showDate').val(),
        time = $('#showTime').val(),
        seatVal = $('select[name="showSeat"]').val(),
        seatSplit = seatVal.split("|"),
        seat = seatSplit[0],
        qty = $('select[name="showQty"]').val(),
        price = parseFloat(seatSplit[1] * qty);

    if (!time) {
      time = '';
    }

    if (!date) {
      date = '';
    } else {
      date = date + " ";
    }

    showTotalBooking++;
    showTotalPrice.push(price);


    var newRow = '<tr class="row-review-show"><td>'+ date + time +'</td><td>'+ seat +'</td><td>'+ qty +'</td><td class="price">MYR'+ price.toFixed(2) +'</td><td><button class="icon icon-minus-circle btn-remove"><span class="sr-only">Remove</span></button></td></tr>';

    $('#table-show-selection tr.add-row').before(newRow);

    
    $('#table-show-selection .total .price').text('MYR' + showTotalPrice.reduce(updateShowTotalPrice).toFixed(2));
  });

  // REMOVE SHOWS
  $('body').on('click', '.btn-remove', function() {
    var index = $(this).parents('tr').index() - 1;
    $(this).parents('tr').remove();
    showTotalBooking--;
    showTotalPrice.splice(index, 1);


    if (showTotalBooking == 0) {
      $('#table-show-selection .total .price').text('');
    } else {
      $('#table-show-selection .total .price').text('MYR' + showTotalPrice.reduce(updateShowTotalPrice).toFixed(2));
    }
  });
});