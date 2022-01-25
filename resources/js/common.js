$(document).ready(function () {
  // 팝업 핸들러
  layerPopupHandler();
  // 셀렉트박스
  selectric();
  // 모바일메뉴 핸들러
  mobileMenuHandler();
  // 헤더 스크롤감지
  // scrollHeader();
  // 슬라이드
  sliderMaker();
  // 아코디언 핸들러
  accordionHandler();
  // input active 핸들러
  inputActiveHandler();
  // 달력
  datePicker();
  // 최상단버튼
  floatBtnTop();
  // 헤더 높이 감지 컨텐츠간격
  contentSpaceFn();
  // 평점 선택
  reviewStar();
  // 탭활성화
  tabActive();
  // 트림 탭 이동
  tabMoveController();
  // 컬러 탭 활성화
  colorSelectTabActive();
  // 소개 애니메이션
  introAnimation();
  // 숫자 카운팅
  // new NumberCounter('countNumber');
});

$(window).on('load', function () {
  gsapAnimation();
});

function gsapAnimation() {
  if (!$('.scroll-animation-element').length) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    nullTargetWarn: false,
  });
  $('.engine-value').each(function (i) {
    var number = Number($(this).text());
    var startCount = {var: 0};
    var _this = $(this);
    gsap.to(startCount, {
      var: number,
      duration: 3.5,
      ease: 'ease',
      onUpdate: function () {
        if (Number.isInteger(number)) {
          _this.text(startCount.var.toFixed(0));
        } else {
          _this.text(startCount.var.toFixed(1).replace(/\.?0+$/, ''));
        }
      },
      scrollTrigger: {trigger: _this},
    });
  });

  gsap.utils.toArray('.scroll-animation-element').forEach(function (section) {
    var scrub = 0.5;
    if ($(section).hasClass('scrub')) {
      scrub = Number($(section).attr('data-scrub')) || true;
    }
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 95%',
        end: 'center 70%',
        scrub: $(section).hasClass('scrub') ? scrub : false,
        // markers: true,
        toggleActions: 'restart none none reset',
      },
    });

    if ($(section).hasClass('mask-image-animation')) {
      // 이미지
      var mask = $(section).find('.mask');
      var image = $(section).find('img');
      tl.to(mask, {scaleX: 0, duration: 1.5, ease: Expo.out}, 0.4);
      tl.from(image, {scale: 1.3, duration: 1.5}, 0.4);
    }
    if ($(section).hasClass('main-keyvisual-section')) {
      // 메인 키비주얼
      var mainKeyvisual = $(section).find('.main-keyvisual');
      var subject = $(section).find('.subject');
      var engText = $(section).find('.eng-text');
      var scrollElement = $(section).find('.scroll-element');
      tl.from(mainKeyvisual, {scale: 1.2, duration: 1.5}, 0);
      tl.from(subject, {opacity: 0, x: '-20', duration: 0.5}, 0.5);
      tl.from(engText, {opacity: 0, x: 20, duration: 0.5}, 0.7);
      tl.from(scrollElement, {opacity: 0, y: 20, duration: 0.7}, 1);
    }
    if ($(section).hasClass('main-intro-text')) {
      // 메인 The all-new Kia Niro
      var mask1 = $(section).find('.mask1');
      var mask2 = $(section).find('.mask2');
      var mask3 = $(section).find('.mask3');
      var mask4 = $(section).find('.mask4');
      var logo = $(section).find('.logo-img');
      tl.to(mask1, {scaleY: 0, duration: 0.5, ease: Expo.out}, 0.3);
      tl.to(mask2, {scaleY: 0, duration: 0.5, ease: Expo.out}, 0.5);
      tl.to(mask3, {scaleY: 0, duration: 0.5, ease: Expo.out}, 0.6);
      tl.to(mask4, {scaleY: 0, duration: 0.5, ease: Expo.out}, 0.7);
      tl.from(logo, {opacity: 0, x: 100, duration: 1}, 0.7);
    }
    if ($(section).hasClass('main-engine-animation')) {
      var subject = $(section).find('.subject');
      var infoText = $(section).find('.info-text');
      var imgEngine = $(section).find('img.engine');
      var infoItem01 = $(section).find('.info-item01');
      var infoItem02 = $(section).find('.info-item02');
      var infoItem03 = $(section).find('.info-item03');

      tl.from(subject, {opacity: 0, x: '-60', duration: 0.8}, 0.3);
      tl.from(infoText, {opacity: 0, y: '-60', duration: 0.7}, 0.6);
      tl.from(imgEngine, {scale: 1.3, duration: 0.8}, 0.3);
      tl.from(infoItem01, {opacity: 0, x: '-100', duration: 0.8}, 0).from(infoItem02, {opacity: 0, x: '-100', duration: 0.8}, 0.3).from(infoItem03, {opacity: 0, x: '-100', duration: 0.8}, 0.6);
    }
    if ($(section).hasClass('main-more-animation')) {
      var subject = $(section).find('.subject');
      var subText = $(section).find('.sub-text');
      var carImg = $(section).find('.car-img');
      var introText = $(section).find('.intro-text');
      var btnIntro = $(section).find('.btn-intro');

      tl.from(subject, {opacity: 0, x: 100, duration: 0.8}, 0.3);
      tl.from(subText, {opacity: 0, x: -100, duration: 0.8}, 0.5);
      tl.from(carImg, {opacity: 0, y: 100, duration: 0.8}, 0.7);
      tl.from(introText, {opacity: 0, y: -50, duration: 0.6}, 0.3);
      tl.from(btnIntro, {opacity: 0, scaleX: 0, duration: 0.5}, 0.6);
    }
  });
}

function introAnimation() {
  if (!$('.intro-fixed-section').length) return;
  var tl = gsap.timeline({});
  tl.set('#footer', {display: 'none'});
  tl.set('body', {overflow: 'hidden'});
  var paddingTop = 150 / 24 + 'rem';
  var wheelFlag = true;

  if ($(this).width() >= 1220) paddingTop = 0;
  $(document).on('DOMMouseScroll mousewheel wheel', function (event) {
    if (wheelFlag) {
      if (event.originalEvent.deltaY > 0) {
        wheelFlag = false;
        animationFn();
      }
    }
  });

  $(document).on('touchstart', function (event) {
    startY = event.originalEvent.changedTouches[0].screenY;
  });

  $(document).on('touchend', function (event) {
    endY = event.originalEvent.changedTouches[0].screenY;
    if (wheelFlag) {
      if (startY - endY > 20) {
        wheelFlag = false;
        animationFn();
      }
    }
  });

  function animationFn() {
    tl.to('.intro-fixed-img', {scale: 1.2, autoAlpha: 0, duration: 2.8, ease: Expo.easeOut}).to(
      '.intro-fixed-title',
      {
        bottom: 'auto',
        top: 100,
        duration: 1,
        ease: Power3.easeOut,
        onStart: function () {
          $('.intro-fixed-title .icon-scroll').fadeOut();
          $('.intro-fixed-title').addClass('start');
          $('.mobile-icon-scroll').hide();
          $('#header').removeClass('fix');
        },
      },
      1
    );
    tl.to(
      '.intro-float-content',
      {
        position: 'relative',
        y: 0,
        paddingTop: paddingTop,
        duration: 0.5,
        ease: Power3.easeOut,
        onComplete: function () {
          $('body').css('overflow', 'visible');
          $('.intro-float-content').addClass('complete');
        },
      },
      1.5
    ).to('#footer', {display: 'block'});
  }
}

function layerPopupHandler() {
  var layerPopup = $('.layer-popup');
  var popupContainer = layerPopup.find('.popup-container');
  var closeBtn = layerPopup.find('.btn-close, .popup-close');
  var $body = $('body');

  // 팝업닫기
  closeBtn.on('click', function () {
    layerPopup.removeClass('open');
    $body.removeClass('scroll-disable');
  });

  // dim 클릭시 팝업닫기
  layerPopup.on('click', function (e) {
    if (!$(e.target).closest(popupContainer).length) {
      layerPopup.removeClass('open');
      $body.removeClass('scroll-disable');
    }
  });
}

// 팝업 열기
function openLayerPopup(popupId) {
  var popupEl = $('#' + popupId);
  var $body = $('body');
  popupEl.addClass('open');
  $body.addClass('scroll-disable');
}

// 특정 팝업 닫기함수
function closeLayerPopup(popupId) {
  var popupEl = $('#' + popupId);
  var $body = $('body');
  popupEl.removeClass('open');
  $body.removeClass('scroll-disable');
}

function mobileMenuHandler() {
  var $moblieNavBtn = $('.mobile-nav-btn');
  var $header = $('#header');
  var $body = $('body');
  var $dim = $('.gnb-dim');
  $moblieNavBtn.on('click', function () {
    menuHandler();
  });
  $dim.on('click', function () {
    menuHandler();
  });

  function menuHandler() {
    if (!$header.hasClass('open')) {
      $header.addClass('open');
      $body.addClass('scroll-disable');
    } else {
      $header.removeClass('open');
      $body.removeClass('scroll-disable');
    }
  }
}

// 스크롤 이동 함수
function scorllMoveTo(id) {
  if (id) {
    var offset = $('#' + id).offset().top;
    $('html, body').animate({scrollTop: offset}, 300);
  }
}

function scrollHeader() {
  var $header = $('#header');
  var $win = $(window);
  headerScrollFn();
  $win.on('scroll', function () {
    headerScrollFn();
  });

  function headerScrollFn() {
    var _sct = $win.scrollTop();
    if (_sct > 0) {
      $header.addClass('scroll');
    } else {
      $header.removeClass('scroll');
    }
  }
}
var optionTabSwiper, colorSelectSlider, colorSelectSlider02;
function sliderMaker() {
  // 컬러 슬라이드
  colorSelectSlider = sliderInit('.color-slider-container', {
    loop: false,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // colorSelectSlider02 = sliderInit('#colorSliderContainer02', {
  //   loop: false,
  //   slidesPerView: 1,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // });

  // 트림 선택 탭
  var setTimeSlider = setTimeout(function () {
    optionTabSwiper = sliderInit('.option-tab-swiper', {
      slidesPerView: 'auto',
      freeMode: true,
      spaceBetween: 16,
      slidesOffsetBefore: 18,
      slidesOffsetAfter: 18,
      // slideToClickedSlide: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        // 모바일에서 -> pc
        600: {
          spaceBetween: 25,
        },
      },
    });

    clearTimeout(setTimeSlider);
  }, 500);
}

function tabMoveController() {
  var $swiper = $('.option-tab-swiper');
  var $tabItem = $('.option-tab-swiper .swiper-slide');

  $tabItem.on('click', function () {
    var $this = $(this);
    var $boxHarf = $swiper.outerWidth() / 2;
    var _left = $this.position().left;
    var _pos = 0;
    var _listWidth = 0;
    var _firstSpace = 18;
    $tabItem.each(function () {
      _listWidth += $(this).outerWidth(true);
    });
    if (_left <= $boxHarf) {
      animateTab(_firstSpace);
    } else if (_listWidth - _left <= $boxHarf) {
      _pos = _listWidth - $swiper.outerWidth();
      animateTab((_pos + 3) * -1);
    } else {
      _pos = _left - $boxHarf;
      animateTab(_pos * -1);
    }
  });

  function animateTab(value) {
    optionTabSwiper.translateTo(value, 200);
  }
}

var sliderArr = [];

// 슬라이드 생성
function sliderInit(element, option) {
  if (!element.length) return;

  var slider = new Swiper(element, option);
  sliderArr.push(slider);
  return slider;
}

// 슬라이드 update(새로고침)
function sliderUpdate() {
  if (sliderArr[0].length) {
    $.each(sliderArr[0], function (i) {
      sliderArr[0][i].update();
    });
  }
}

function selectric() {
  var $selectric = $('.selectric');
  if (!$selectric.length) return;
  $selectric.selectric({
    nativeOnMobile: false,
    onInit: function (event, selectric) {
      // 필수항목일경우
      if ($(this).hasClass('required') && !selectric.element.value) {
        selectric.elements.label.append('<span class="required">*</span>');
      }
      // float 라벨 있을경우
      if ($(this).hasClass('float')) {
        if ($(this)[0].value) {
          $(this).closest('.selectric-container').addClass('active');
        }
      }
    },
    onChange: function () {
      // float 라벨 있을경우
      if ($(this).hasClass('float')) {
        if ($(this)[0].value) {
          $(this).closest('.selectric-container').addClass('active');
        } else {
          $(this).closest('.selectric-container').removeClass('active');
        }
      }
    },
    onOpen: function () {},
    onClose: function () {},
  });
}

function accordionHandler() {
  var accordionHeader = $('.accordion-header');
  if (!accordionHeader.length) return;
  accordionHeader.on('click', function () {
    var $this = $(this);
    var speed = $this.parents('.main-info-container').length ? 400 : 200;
    accordionFn($this, speed);
  });
}

function accordionFn(el, speed) {
  speed = speed ? speed : 200;
  if (el.hasClass('solo')) {
    el.parents('.accordion-list').toggleClass('active').find('.accordion-body').stop().slideToggle(speed);
  } else {
    el.parents('.accordion-list')
      .toggleClass('active')
      .find('.accordion-body')
      .stop()
      .slideToggle(speed)
      .parent('.accordion-list')
      .siblings('.accordion-list')
      .removeClass('active')
      .find('.accordion-body')
      .slideUp(speed);
  }
}

function inputActiveHandler() {
  var $inputs = $('.input-active');
  if (!$inputs.length) return;

  $inputs.each(function () {
    var $this = $(this);
    if ($this.val().length) {
      $this.closest('.input-cover').addClass('active');
    }
  });

  $(document).on('focus change', '.input-active', function (e) {
    var $this = $(this);
    var $inputcover = $this.closest('.input-cover');
    if (!$this.is('[readonly]')) {
      $inputcover.addClass('focus');
    }
    $inputcover.addClass('active');
  });

  $(document).on('focusout change', '.input-active', function (e) {
    var $this = $(this);
    var $inputcover = $this.closest('.input-cover');
    var setTimeHandle = setTimeout(function () {
      if (!$this.hasClass('open-datepicker')) {
        $inputcover.removeClass('focus');
        clearTimeout(setTimeHandle);
      }
    }, 100);
    if (!$this.val().length) {
      if (!$this.hasClass('open-datepicker')) {
        $inputcover.removeClass('active');
      }
    }
  });
}

function datePicker() {
  var $dateEl = $('.datepicker-input');
  if (!$dateEl.length) return;
  $dateEl.each(function () {
    var $this = $(this);
    if ($this.hasClass('month')) {
      $this.monthpicker({
        monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)', '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        changeYear: true,
        yearRange: '-60:+0',
        dateFormat: 'yy-mm',
      });
    } else {
      $this.datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '-80:+10',
        beforeShow: function () {
          $(this).addClass('open-datepicker');
        },
        onClose: function () {
          $(this).removeClass('open-datepicker');
        },
      });
    }
  });
}

function floatBtnTop() {
  $('.float-btn-top').on('click', function () {
    scorllMoveTo();
  });
}

function contentSpaceFn() {
  var $header = $('#header');
  var $content = $('#content');
  var setTimeHandler = null;
  if (!$header.length) return;
  if ($content.hasClass('space')) {
    setTimeHandler = setTimeout(function () {
      var _headerHeight = $header.outerHeight();
      $content.css('paddingTop', _headerHeight);
      clearTimeout(setTimeHandler);
    }, 150);
  }
}

function reviewStar() {
  var container = $('.rating-select-container');
  var inputs = container.find('input[type="radio"]');
  var labels = container.find('label');
  inputs.on('change', function () {
    if ($(this).prop('checked')) {
      labels.each(function () {
        $(this).removeClass('checked');
      });
      $(this).next('label').addClass('checked').prevAll('label').addClass('checked');
    }
  });
}

function tabActive() {
  var $tab = $('.tab-active .tab-item');
  $tab.eq(0).addClass('active');
  $tab.on('click', function () {
    var index = $(this).index();
    $tab.eq(index).addClass('active').siblings('').removeClass('active');
  });
}

function colorSelectTabActive() {
  var $tab = $('.color-select-tab .tab-item');
  var $tabContent = $('.color-select-content .content-item');
  var $colorTab = $('.color-list .color-item');
  var $colorRadio = $colorTab.find('input[type="radio"]');

  $tab.eq(0).addClass('active');
  $tab.on('click', function () {
    var index = $(this).index();
    $tab.eq(index).addClass('active').siblings('').removeClass('active');
    $tabContent.hide().eq(index).show();
  });

  colorTabFn(0, 0);
  $colorRadio.on('change', function () {
    var index = $(this).closest('.color-item').index();
    var colorListIndex = Number($(this).closest('.color-list').attr('data-index'));
    colorSelectSlider[colorListIndex].slideTo(index);
    colorSelectSlider[colorListIndex].update();
  });
  for (var i = 0; i < colorSelectSlider.length; i++) {
    colorSelectSlider[i].on('slideChange', function (swiper) {
      var sliderIndex = Number($(swiper.$el[0]).attr('data-index'));
      var activeIndex = swiper.activeIndex;
      colorTabFn(sliderIndex, activeIndex);
    });
  }

  function colorTabFn(sliderIndex, activeIndex) {
    $tabContent.eq(sliderIndex).find('.color-item').eq(activeIndex).find('input[type="radio"]').prop('checked', true);
    //luckshim 2022.01.17
    if (sliderIndex == 0) {
        if (typeof GarnishSelected === "function") { GarnishSelected(); }
    }
  }
}

function tabActiveFn(el) {
  el.eq(0).addClass('active');
  el.on('click', function () {
    var index = $(this).index();
    el.eq(index).addClass('active').siblings('').removeClass('active');
  });
}

function NumberCounter(target_frame, target_number) {
  if (!$('#' + target_frame).length) return;
  this.count = 0;
  this.diff = 0;
  this.target_frame = document.getElementById(target_frame);
  this.target_count = this.target_frame.innerHTML;
  this.timer = null;
  this.counter();
}
NumberCounter.prototype.counter = function () {
  var self = this;
  this.diff = this.target_count - this.count;

  if (this.diff > 0) {
    self.count += Math.ceil(this.diff / 5);
  }

  this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (this.count < this.target_count) {
    this.timer = setTimeout(function () {
      self.counter();
    }, 20);
  } else {
    clearTimeout(this.timer);
  }
};

// js 함수 외부사용을 위함

// 슬라이드 업데이트 - 비동기 작업후 실행
window.sliderUpdate = sliderUpdate;
