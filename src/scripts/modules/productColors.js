import $ from 'jquery'
import { TweenMax } from 'gsap';

class ProductColors {

  // ------------------------------------------------------------------------------------------------ >
  // Init

  static init(productId) {
    window.pc_calledFromProductPopup = false;

    if(typeof(productId) != "undefined") {
      window.pc_calledFromProductPopup = true;
      window.pc_temp_rid = __st.rid;
      window.pc_temp_p = __st.p;
      __st.rid = productId;
      __st.p = 'product';
    }

    window.webyzeProductColorsLoaded = false;
    $('.webyze-product-colors').remove()
    $('.webyze-product-colors-container').prepend(' <div id="webyze-product-colors-'+ __st.rid +'" class="webyze-product-colors"></div>')

    $.getScript('https://www.webyze.com/ProductColors/productcolors-4c19d36372273c28ef6f8e140a1fdfbfc2b9006b.js?shop=haerfest-com.myshopify.com', 
      function() { 
        ProductColors.startPoll();
    })
  } // end init()



  // ------------------------------------------------------------------------------------------------ >
  // Start Swatches

  static startPoll() {
    var webyzePollCounter = 0; // poll limit 
    var webyzePoll = setInterval(function() {
      var webyzeContent = $('div.webyze-product-colors').html(),
          initialized = false;

      if(typeof(webyzeContent) != 'undefined') {
        initialized = (webyzeContent.length > 0);
      } else {
        initialized = true;
      }
          
      webyzePollCounter++;

      if(initialized) {
        clearInterval(webyzePoll);
        ProductColors.initSwatches();

        if(window.pc_calledFromProductPopup) {
          __st.rid = window.pc_temp_rid;
          __st.p = window.pc_temp_p;
        }

      } else {
        if (webyzePollCounter > 30) {
          clearInterval(webyzePoll);
          $('.webyze-product-colors-container').remove();
        }
      }
    }, 300);    
  }



  // ------------------------------------------------------------------------------------------------ >
  // Init Swatches

  static initSwatches() {
    // clone selected swatch to sticky bar
    var $clonedSwatch = $('.webyze-product-colors span.currentSwatch').clone();
    var colorSelected = $clonedSwatch.data('name');
    $clonedSwatch.find('span.webyzeTooltip').remove();

    $('div.color-swatch .color').html($clonedSwatch);
    $('div.color-swatch .label').html($clonedSwatch.data('name'));

    $('div.swatch-label-container').html(colorSelected);

    // remove all events
    // IMPORTANT: USE jQuery here, instead of $, to refer cdn's library (which is used from externals apps)
    //            original event was set on external app, and can be removed only using jQuery, instead of $
    jQuery('.webyze-product-colors span.swatchProductColor').off(); 

    // swatch title on over/leave
    $('.webyze-product-colors span.swatchProductColor')
      .off('mouseenter')
      .on('mouseenter', function() {
        $('div.swatch-label-container').html($(this).data('name'));
      })

    $('.webyze-product-colors span.swatchProductColor')
      .off('mouseleave')
      .on('mouseleave', function() {
        $('div.swatch-label-container').html(colorSelected);
      })

    // remove Product Colors events, append <a> with highway attach, and fire click events on <a> elements created
    $('.webyze-product-colors .swatchProductColor').off('click');
    $('.webyze-product-colors .swatchProductColor').each(function(i, e) {
      $(this).append('<a href="'+ '/products/' + $(this).data('handle') +'" id="swatch-link-'+ $(this).data('handle') +'" class="hide"></a>');
    });

    H.detach($('.webyze-product-colors .swatchProductColor a'));
    H.attach($('.webyze-product-colors .swatchProductColor a'));


    $('.webyze-product-colors .swatchProductColor')
      .on('click', function() {
        $('.product-popup').hide();
        $('a#swatch-link-' + $(this).data('handle'))[0].click();
        $('.product-popup .col-container').html("");
      });
  }



  // ------------------------------------------------------------------------------------------------ >
  // Swatches: Control Init animation

  static controlSwatchesFadeIn() {

    const $container = $('.webyze-product-colors-container');

    TweenMax.to( $container, 0, { opacity:0 });
    const controlSwatchesFadeInInterval = setInterval( ()=> {
      if( $container.find('.currentSwatch').length > 0 ){
        TweenMax.to( $container, .1, { opacity:1, ease:'haerfest-ab-easing' });
        var cartTL = new TimelineLite;
        cartTL.staggerTo( $container.find('.swatchProductColor, .swatch-label-container'), 0, {opacity:0}, 0,   "+=0");
        cartTL.staggerTo( $container.find('.swatchProductColor, .swatch-label-container'), 1, {opacity:1, ease:'haerfest-ab-easing'}, 0.01, "+=0");
        clearInterval(controlSwatchesFadeInInterval)
      }
    }, 10 )
    
  }

}


export default ProductColors;