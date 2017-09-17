$(document).ready(function () {
  $w = $(window);

  // Detect mobile
  var md = new MobileDetect(window.navigator.userAgent);


  // Open Menu
  var $btnMenu = $('#toggle-menu'),
      $contentMenu = $('#nav-menu');

  $btnMenu.on('click', function() {
    $contentMenu.toggleClass('in');
    $('body').toggleClass('modal-open');
  });

  console.log(md);


  // Landing Page Background
  var $body = $('body'),
      $footer = $('#footer');

  if (!md.mobile()) {
    if ($(window).height() > 645) {
      $('.page-landing').height($w.height() - $footer.height() - $('.navbar').height());
    }

    $(window).on('resize', function () {
      if ($(window).height() > 645) {
        $('.page-landing').height($w.height() - $footer.height() - $('.navbar').height());
      }
    });
  }


  // Close other modals before opening new one
  $('.modal').on('show.bs.modal', function () {
    $('.modal').not($(this)).each(function () {
      $(this).modal('hide');
    });
  });

  $('.modal').on('shown.bs.modal', function () {
    $('body').addClass('modal-open');
  })
  

  // Datepicker
  var dateToday = new Date();

  if (md.mobile()) {
    $('.form-floating input.datepicker').datepicker({
      minDate: dateToday
    });
  } else {
    $('.form-floating input.datepicker').datepicker({
      numberOfMonths: 2,
      minDate: dateToday
    });
  }

  if (md.mobile() && md.tablet()) {
    $('.slides-bg').slick({
      autoplay: false,
      arrows: false,
      dots: true,
      fade: true
    });
  }

  // INLINE DATE PICKER
  $('.datepicker').datepicker({
    minDate: dateToday
  });

  $('.datepicker-inline').datepicker({
    minDate: dateToday,
    altFormat: 'dd/mm/yyyy',
    onSelect: function(dateText, inst) { 
      $('#showDate').val(dateText);
    }
  });


  // Slick Slider - Content
  $slickElementContent = $('.slides');

  $slickElementContent.slick({
    autoplay: false,
    arrows: true,
    dots: true,
    fade: true,
    draggable: false,
    prevArrow: '<button type="button" class="slick-prev"><span class="icon icon-arrow-left"></span><span>Previous</span></button>',
    nextArrow: '<button type="button" class="slick-next"><span class="icon icon-arrow-right"></span><span>Next</span></button>',
    respondTo: 'slider',
    mobileFirst: true
  });
})