$(function () {

   // common
  (function() {
    var $header = $( '#js-header' );

    // smooth scroll
    $( 'a[href^="#"]' ).on( 'click', function(e){
      var speed = 500;
      var href= $( this ).attr( 'href' );
      var target = $( href === '#' || href === '' ? 'html' : href );
      var position = target.offset().top - $header.outerHeight();
      $( 'html, body' ).animate( { scrollTop:position }, speed, 'swing' );
      e.preventDefault();
    });

    // header
    $( window ).on( 'scroll', function() {
      if( $( this ).scrollTop() > $( '#js-top' ).outerHeight() ) {
        $( 'body' ).addClass( 'add-scrolled' );
      } else {
        $( 'body' ).removeClass( 'add-scrolled' );
      }
    });
  })();


  //drawer.js
  $('.drawer').drawer()

  //wow
  new WOW().init()

  // results
  new Swiper('.swiper-container', {

    breakpoints: {
      767: {
        spaceBetween: 40,
        width: 400,
      }
    },

    spaceBetween: 24,
    width: 274,
    speed: 400,
    loop: true,
    loopedSlides: 6,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

  });

  // faq
  $( '.js-faq' ).on( 'click', function() {
    $( this ).find( '.js-faqA' ).stop().slideToggle( 300 );
    $( this ).toggleClass( 'add-active' );
  });

  // form validation
  (function() {
    var requireFlg = false;
    var privacyFlg = false;
    var $require = $( '#js-contactForm .js-require' );
    var fillCount = 0;

    function setSubmitProp() {
      if( requireFlg && privacyFlg ) {
        $( '#form-submit' ).prop( 'disabled', false );
      } else {
        $( '#form-submit' ).prop( 'disabled', true );
      }
    }

    // 必須項目
    $require.on( 'blur', function() {
      if( $( this ).attr( 'id' ) === 'js-formKana' && !$( this ).val().match( /^([ァ-ン]|ー)+$/ ) ) {
        $( this ).val( '' );
        alert( '全角カタカナで入力してください。' )
      }

      $require.each( function() {
        var value = $( this ).val();

        if( ( value !== '' && value.match( /[^\s\t]/ ) ) ) {
          fillCount++;
        }
      });

      requireFlg = ( fillCount === $require.length ? true : false );

      setSubmitProp();
      fillCount = 0;
    });

    // プライバシーポリシー
    $( '#form-privacy' ).on( 'change', function() {
      privacyFlg =  ( $( this ).prop( 'checked' ) ? true : false );
      setSubmitProp();
    });

    // 送信時
    $( '#js-contactForm' ).on( 'submit', function() {
      if( !( requireFlg && privacyFlg ) ) {
        alert( '入力に誤りがあります。' );
        return false;
      }
    });
  })();
})
