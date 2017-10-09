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
  $.datepicker._defaults.onAfterUpdate = null;
  
  var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
  $.datepicker._updateDatepicker = function( inst ) {
    datepicker__updateDatepicker.call( this, inst );
    var onAfterUpdate = this._get(inst, 'onAfterUpdate');
    if (onAfterUpdate)
      onAfterUpdate.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst]);
  }

  var cur = -1, prv = -1;
  if (!md.mobile()) {
    $('#datepicker-range .range')
      .datepicker({
        minDate: 0,
        numberOfMonths: 2,
        showButtonPanel: true,
        beforeShowDay: function ( date ) {
              return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
           },
        onSelect: function ( dateText, inst ) {
              var d1, d2;
              prv = cur;
              cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
              if ( prv == -1 || prv == cur ) {
                 prv = cur;
                 $('#datepicker-range .input').val( dateText );
              } else {
                 d1 = $.datepicker.formatDate( 'dd/mm', new Date(Math.min(prv,cur)), {} );
                 d2 = $.datepicker.formatDate( 'dd/mm', new Date(Math.max(prv,cur)), {} );
                 $('#datepicker-range .input').val( d1+' - '+d2 );
              }
           },
        onChangeMonthYear: function ( year, month, inst ) {
              //prv = cur = -1;
           },
        onAfterUpdate: function ( inst ) {
              $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                 .appendTo($('#datepicker-range .range .ui-datepicker-buttonpane'))
                 .on('click', function () { $('#datepicker-range .range').hide(); });
           }
       })
      .position({
          my: 'left top',
          at: 'left bottom',
          of: $('#datepicker-range .input')
       })
      .hide();
  } else {
    $('#datepicker-range .range')
      .datepicker({
        minDate: 0,
        numberOfMonths: 1,
        showButtonPanel: true,
        beforeShowDay: function ( date ) {
              return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
           },
        onSelect: function ( dateText, inst ) {
              var d1, d2;
              prv = cur;
              cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
              if ( prv == -1 || prv == cur ) {
                 prv = cur;
                 $('#datepicker-range .input').val( dateText );
              } else {
                 d1 = $.datepicker.formatDate( 'dd/mm', new Date(Math.min(prv,cur)), {} );
                 d2 = $.datepicker.formatDate( 'dd/mm', new Date(Math.max(prv,cur)), {} );
                 $('#datepicker-range .input').val( d1+' - '+d2 );
              }
           },
        onChangeMonthYear: function ( year, month, inst ) {
              //prv = cur = -1;
           },
        onAfterUpdate: function ( inst ) {
              $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                 .appendTo($('#datepicker-range .range .ui-datepicker-buttonpane'))
                 .on('click', function () { $('#datepicker-range .range').hide(); });
           }
       })
      .position({
          my: 'left top',
          at: 'left bottom',
          of: $('#datepicker-range .input')
       })
      .hide();
  }

  $('#datepicker-range .input').on('focus', function (e) {
    var v = this.value,
       d;
    try {
      if ( v.indexOf(' - ') > -1 ) {
         d = v.split(' - ');
         prv = $.datepicker.parseDate( 'mm/dd/yy', d[0] ).getTime();
         cur = $.datepicker.parseDate( 'mm/dd/yy', d[1] ).getTime();
      } else if ( v.length > 0 ) {
         prv = cur = $.datepicker.parseDate( 'mm/dd/yy', v ).getTime();
      }
    } catch ( e ) {
      cur = prv = -1;
    }
    if ( cur > -1 )
      $('#datepicker-range .range').datepicker('setDate', new Date(cur));
    $('#datepicker-range .range').datepicker('refresh').show();
  });


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
    mobileFirst: true
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
