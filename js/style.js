
// scroll effects
$.fn.acs = function (options) {

  const elements = this;
  const defaults = {
    screenPos: 0.8,
    className: 'is-animated'
  };
  const setting = $.extend(defaults, options);


  $(window).on('load scroll', function () {
    add_class_in_scrolling();
  });

  function add_class_in_scrolling() {
    const winScroll = $(window).scrollTop();
    const winHeight = $(window).height();
    const scrollPos = winScroll + (winHeight * setting.screenPos);

    if (elements.offset().top < scrollPos) {
      elements.addClass(setting.className);
    }
  }
}

$('.anm, [class*="anm-"], .anm-list > *').each(function () {
  $(this).acs();
});


// list animation delay
$.fn.anmDelay = function (options) {
  const elements = this;
  const defaults = {
    delay: 0.2,
    property: 'animation-delay'
  };
  const setting = $.extend(defaults, options);

  const index = elements.index();
  const time = index * setting.delay;
  elements.css(setting.property, time + 's');
}

$('.anm-list > *').each(function () {
  $(this).anmDelay();
});

//link
jQuery('a[href^="#"]').on('click', function () {
  var id = jQuery(this).attr('href');
  var position = 0;
  if (id != '#') {
    position = jQuery(id).offset().top;
  }
  var header = jQuery('.header').innerHeight();
  jQuery('html, body').animate({
    scrollTop: position - header
  }, 300);
});

//to-top
jQuery(window).on('scroll', function () {
  if (500 < jQuery(this).scrollTop()) {
    jQuery('.to-top').addClass('is-show')
  } else {
    jQuery('.to-top').removeClass('is-show')
  };
});


//modal
$(function () {
  var scrollPos;//topからのスクロール位置
  $('.js-open').click(function () {
    var target = jQuery(this).data('target');
    scrollPos = $(window).scrollTop();//topからのスクロール位置を格納
    jQuery(target).show();
    $('body').addClass('fixed').css({ top: -scrollPos });//背景固定
    return false;//<a>を無効化
  });
  $('.js-close').click(function () {
    var target = jQuery(this).data('target');
    jQuery(target).hide();
    $('body').removeClass('fixed').css({ top: 0 });//背景固定を解除
    $(window).scrollTop(scrollPos);//元の位置までスクロール
    return false;//<a>を無効化
  });
});


//contact
let $form = $("#js-form")
$form.submit(function (e) {
  $.ajax({
    url: $form.attr('action'),
    data: $form.serialize(),
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        //送信に成功したときの処理
        $form.slideUp()
        $('#js-success').slideDown()
      },
      200: function () {
        //送信に失敗したときの処理
        $form.slideUp()
        $('#js-error').slideDown()
      }
    }
  });
  return false;
});

let $submit = $('#js-submit')
$('#js-form input, #js-form textarea').on('change', function () {
  if (
    $('#js-form input[type="text"]').val() !== "" &&
    $('#js-form input[type="email"]').val() !== "" &&
    $('#js-form input[name="entry.874893516"]').prop('checked') === true
  ) {
    $submit.prop('disabled', false)
    $submit.addClass('-active')
  } else {
    $submit.prop('disabled', true)
    $submit.removeClass('-active')
  }
});
