(function() {

  // Start Current Date

  var currentDate = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  $('.date').append(currentDate.toLocaleDateString('ar-EG', options));

  // Start Loader

  $(window).on('load', function () {
    $("body").addClass('overflow-auto');
    $(".loader").fadeOut();
    $(".loading").fadeOut().css({
        'transituin-delay' : '1s'
    });
  });

  // Start Navbar 

  $('.overlay').fadeOut();
  
  $(".mob-collaps").on('click', function() {
    $(this).parent().find(".nav-links > ul").toggleClass('nav-open');
    $(this).parents('body').toggleClass('overflow-auto');

    $('.overlay').fadeToggle();

    $(this).find("span:first-child").toggleClass('rotate');
    $(this).find("span:nth-child(2)").toggleClass('none');
    $(this).find("span:nth-child(3)").toggleClass('rotate2');
  });

  $(".overlay").on('click', function() {
    $(".nav-links ul").removeClass('nav-open');
    $('.search-form').fadeOut();
    $(this).fadeOut();
    $(this).parents('body').addClass('overflow-auto');
    $('.mob-collaps').removeClass('low-index');

    $(".mob-collaps span:first-child").removeClass('rotate');
    $(".mob-collaps span:nth-child(2)").removeClass('none');
    $(".mob-collaps span:nth-child(3)").removeClass('rotate2');
  });

  // Start Prevent Default

  $('.default').on('click', function(e) {
    e.preventDefault();
  });

  // Start Fixed Nav

  $(window).on('scroll',function() {
    var scroll = $(this).scrollTop();
    
    if(scroll >= 44) {
      $('.nav-menu').addClass('affix');
    } else {
      $('.nav-menu').removeClass('affix');
    }
  });

  // Start Search Form

  $('.search-form').fadeOut();

  $('.search').on('click', function(e) {
    e.preventDefault();
    $(this).parents('body').removeClass('overflow-auto');
    $('.overlay').fadeIn();
    $('.search-form').fadeIn();
    $('.mob-collaps').addClass('low-index');
  });

  // Start Blogs Slider

  $('.slider.owl-carousel').owlCarousel({
    items: 1,
    loop:true,
    autoplay: true,
    margin: 10,
    dots: true
  });

  // Book Details Slider
  $('.copy-slider.owl-carousel').owlCarousel({
    items: 3,
    // loop:true,
    // autoplay: true,
    margin: 10,
    nav: true,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      320: {
          items: 1
      } ,
      
      480: {
          items: 2
      } ,

      768: {
          items: 2
      } ,

      991: {
          items: 3
      }
    }
  });

  // Start Nice Select

  $('select').niceSelect();
  
  // Wow Animation

  $(window).on('load', function(){
      new WOW().init();
  });

})(jQuery);

// Start Select Images

$(function() {
    // Multiple images preview in browser
    var imagesPreview = function(input, placeToInsertImagePreview) {
    
        if (input.files) {
        var filesAmount = input.files.length;
    
        for (i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
    
            reader.onload = function(event) {
                var image = document.createElement('img');
                image.setAttribute('src',event.target.result);
                var body = document.createElement('div');
             // var input  = '<input name="images[]" multiple type="hidden">';
                var button  = document.createElement('button');
    
                var input   = document.createElement('input');
                input.setAttribute('name','images[]');
                input.setAttribute('type','hidden');
    
                button.setAttribute('class','close');
                // button.setAttribute('type','button');
                button.innerHTML = '<i class="fas fa-times"></i>';
                body.appendChild(image);
                body.appendChild(input);
                body.appendChild(button);
    
                body.setAttribute('class','images');
    
    
                console.log(body);
                $('.gallery').append(body);
    
                ($($.parseHTML(body)).appendTo(placeToInsertImagePreview));
            }
    
                reader.readAsDataURL(input.files[i]);
             }
        }
    
    };
    
    $(document).on('click', '.close', function(event){
            event.preventDefault();
            $(this).parent().remove();
    });

    $('#gallery-photo-add').on('change', function() {
        imagesPreview(this, 'div.gallery');
    });
});

// End Select Images

/* Star Rating */
var $star_rating = $('.star-rating .fa');

var SetRatingStar = function () {
    return $star_rating.each(function () {
        if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
            return $(this).removeClass('fa-star-o').addClass('fa-star');
        } else {
            return $(this).removeClass('fa-star').addClass('fa-star-o');
        }
    });
};

$star_rating.on('click', function () {
    $star_rating.siblings('input.rating-value').val($(this).data('rating'));
    return SetRatingStar();
});

SetRatingStar();

/* End Rating */
//# sourceMappingURL=scripts.js.map
