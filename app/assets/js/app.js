$(document).ready(function () {
  $w = $(window);

  // Detect mobile
  var md = new MobileDetect(window.navigator.userAgent);

  // Open Menu
  var $btnMenu = $('.toggle-menu'),
      $contentMenu = $('#nav-menu');

  $btnMenu.on('click', function() {
    $contentMenu.toggleClass('in');
    $('body').toggleClass('modal-open');
  });

  // console.log(md);


  // Landing Page Background
  var $body = $('body'),
      $footer = $('#footer');

  // MAKE STICY FOOTER IF CONTENT IS SHORT
  var pageHeight = $body.outerHeight(),
      windowHeight = $w.outerHeight();

  if (!md.mobile()) {
    if ($(window).height() > 700) {
      $('.page-landing').height($w.height() - $footer.height() - $('.navbar').height());
    }

    $(window).on('resize', function () {
      if ($(window).height() > 700) {
        $('.page-landing').height($w.height() - $footer.height() - $('.navbar').height());
      }
      
      if (pageHeight < windowHeight) {
        $footer.addClass('sticky');
      } else {
        $footer.removeClass('sticky');
      }
    });

    if (pageHeight < windowHeight) {
      $footer.addClass('sticky');
    } else {
      $footer.removeClass('sticky');
    }
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

  // STICKY
  var sticky = new Sticky('.make-sticky');
  

  // Set width to steps indicator bar
  if ($('.steps-indicator-wrap').length > 0) {
    $('.steps-indicator-wrap').width($('.component-steps-indicator').outerWidth());
  }
  

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

  dateRangeFrom.datepicker({
    minDate: 0,
    defaultDate: "+1w",
    dateFormat: 'dd/mm/yy',
    firstDay: 1
  }).on( "change", function() {
    dateRangeTo.datepicker( "option", "minDate", getDate( this ) );
  });
    
  dateRangeTo.datepicker({
    minDate: 0,
    defaultDate: "+1w",
    dateFormat: 'dd/mm/yy',
    firstDay: 1
  }).on( "change", function() {
    dateRangeFrom.datepicker( "option", "maxDate", getDate( this ) );
  });

  


  


  // INLINE DATE PICKER
  $('.datepicker').datepicker({
    minDate: 0
  });

  $('.datepicker-bday').datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: '1930:1999',
    dateFormat: 'dd/mm/yy',
    beforeShow: function (inp, inst) {
      $(inst.dpDiv[0]).addClass('ui-datepicker-bday');
    },
    onClose: function (str, inst) {
      $(inst.dpDiv[0]).removeClass('ui-datepicker-bday');
    }
  });

  $('.datepicker-inline').datepicker({
    minDate: 0,
    firstDay: 1,
    altFormat: 'dd/mm/yyyy',
    onSelect: function(dateText, inst) { 
      $('#showDate').val(dateText);
    }
  });

  if (md.mobile()) {
    // Toggle search bar for mobile
    $('#open-search').on('click', function () {
      $('.header_bar-secondary > .container').toggleClass('open');
    });
  }

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
