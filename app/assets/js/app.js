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

  // console.log(md);


  // Landing Page Background
  var $body = $('body'),
      $footer = $('#footer');

  if (!md.mobile()) {
    if ($(window).height() > 700) {
      $('.page-landing').height($w.height() - $footer.height() - $('.navbar').height());
    }

    $(window).on('resize', function () {
      if ($(window).height() > 700) {
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
  

  // Truncate Text
  function truncate(string, length) {
    if (string.length > length) {
      return string.substring(0, length) + '...';
    } else {
      return string;
    }
  }

  $('.truncate-text').each(function() {
    var str = truncate($(this).text(), $(this).attr('data-count'));
    $(this).text(str);
  });


  

  // RANGE DATEPICKER
  var dateFormat = 'dd/mm/yy',
      dateRangeFrom = $('#datepicker-range-from'),
      dateRangeTo = $('#datepicker-range-to');

  function getDate( element ) {
    var date;
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }

    return date;
  }

  if (!md.mobile()) {
    dateRangeFrom.datepicker({
      minDate: 0,
      defaultDate: "+1w",
      numberOfMonths: 2,
      dateFormat: 'dd/mm/yy'
    }).on( "change", function() {
      dateRangeTo.datepicker( "option", "minDate", getDate( this ) );
    });
      
    dateRangeTo.datepicker({
      minDate: 0,
      defaultDate: "+1w",
      numberOfMonths: 2,
      dateFormat: 'dd/mm/yy',
    }).on( "change", function() {
      dateRangeFrom.datepicker( "option", "maxDate", getDate( this ) );
    });
  } else {
    dateRangeFrom.datepicker({
      minDate: 0,
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd/mm/yy'
    }).on( "change", function() {
      dateRangeTo.datepicker( "option", "minDate", getDate( this ) );
    });
      
    dateRangeTo.datepicker({
      minDate: 0,
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd/mm/yy',
    }).on( "change", function() {
      dateRangeFrom.datepicker( "option", "maxDate", getDate( this ) );
    });
  }


  

  


  // INLINE DATE PICKER
  $('.datepicker').datepicker({
    minDate: 0
  });

  $('.datepicker-inline').datepicker({
    minDate: 0,
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
    mobileFirst: true,
    autoplaySpeed: 8000
  });

  if ((md.mobile() && md.tablet()) || (!md.mobile() && !md.tablet())) {
    $('.slides-bg').slick({
      autoplay: true,
      arrows: false,
      dots: true,
      fade: true
    });
  }

  // FANCYBOX
  $('.gallery-wrap').lightGallery({
    thumbnail: true,
    download: false,
    counter: false,
    fullScreen: false,
    zoom: false,
    share: false,
    autoplay: false
  })


  // Target input group instead of input
  $('.input-group').find('input').on('focus', function() {
    $(this).parent().addClass('focus');
  });

  $('.input-group').find('input').on('blur', function() {
    $(this).parent().removeClass('focus');
  })


  // DUMMY FLOW
  $('#modal-loading').on('shown.bs.modal', function(e) {
    var loader = $(e.currentTarget).find('.mask');
    var bar = 0,
        max = 100;


    function addProgress() {
      bar = bar + 10;

      if (bar < max) {
        // If we aren't at max, keep progressing
        setTimeout(addProgress, 200);
      }

      loader.animate({
        width: bar + '%'
      }, 50)

      if (bar === 100) {
        window.location.href = "hotel-price.html";
      }
    }

    addProgress();
  })



})
