$(document).ready(function () {
  $w = $(window);

  $w.on('resize', function() {
    if ($w.height() < 868) {
      $('body > .section-full-height').height($w.height());
    } else {
      $('body > .section-full-height').height(868);
    }
  });

  if ($w.height() < 868) {
    $('body > .section-full-height').height($w.height());
  } else {
    $('body > .section-full-height').height(868);
  }




  // Slick Slider - Testimonial
  $slickElementTestimonial = $('.testimonial-item.slider-slick'),
  $slickStatus = $('.slick-current-page');

  $slickElementTestimonial.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      var i = (currentSlide ? currentSlide : 0) + 1;
      $slickStatus.text(i + '/' + slick.slideCount);
  });

  $slickElementTestimonial.slick({
    autoplay: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    appendArrows: $('.slick-custom-arrows'),
    prevArrow: '<button type="button" class="slick-prev"><span class="icon icon-arrow-left"></span></button>',
    nextArrow: '<button type="button" class="slick-next"><span class="icon icon-arrow-right"></span></button>'
  });


  // Slick Slider - Content
  $slickElementContent = $('.content-slider-wrap.slider-slick');

  $slickElementContent.slick({
    autoplay: false,
    arrows: false,
    dots: true,
    fade: true,
    draggable: false,
    appendDots: $('.inner-section-sidebar'),
    customPaging: function(slider, i) {
      var $title = $(slider.$slides[i]).data('paging');
      return '<a role="button">'+ $title +'</a>';
    }
  });

  var $w = $(window);

  // Window scroll
  $(window).on('scroll', function(e) {
    var pos = $(this).scrollTop()

    if (pos > 80) {
      if (!$('nav').hasClass('scrolled')) {
        $('nav').addClass('scrolled');
      } 
    } else {
      $('nav').removeClass('scrolled');
    }
  });
})