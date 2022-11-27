
$(document).ready(function () {
  // if(screen.width < 768 /*some amount that should be a mobile's phone screen width probably*/ ){
  //     $('div.container').addClass('container-fluid').removeClass('container');
  // }
  // mobile filter
  
  // check if current element has parent element 'e' 
  $.fn.hasParent = function (e) {
    return !!$(this).parents(e).length
  }
  
  $('.filter-mobile').on('click', function () {
    var menu = $('.mobile-menu-bar');

    if (menu.hasClass('menu-open')) {
      menu.css('left', '-100%').removeClass('menu-open');
    } else {
      menu.css('left', 0).addClass('menu-open');
    }
  }); // filters
  
  
    $('html').click(function(e){
      if(screen.width < 768 /*some amount that should be a mobile's phone screen width probably*/ ){
        console.log($(e.target).parents('filter-mobile').length);
        if( !$(e.target).parents('.filter-mobile').length )
        {
          if( !$(e.target).parents('.mobile-menu-bar').length ){
            var menu = $('.mobile-menu-bar');
            menu.css('left', '-100%').removeClass('menu-open');
          }
        }
      }
    });
  

  $('.filter-item').on('click', function () {
    console.log('hallo');
    filter = [];
    $('input[name^=\'filter\']:checked').each(function (element) {
      filter.push(this.value);
    });
    var url = window.location.href.split('&')[0];
    location = url + '&filter=' + filter.join(',');
  }); // open searchbar

  $('header .search').on('click', function () {
    var _this = $(this);

    _this.addClass('searching').find('input').css('width', '300px');
  }); // close searchbar

  /*
  $("section").not(".search").on('click', function () {
      console.log(2);
      var _this = $('header .search');
       if ( _this.hasClass('searching') ) {
          console.log(2);
          _this.find('input').css('width', '0');
           setTimeout(function () {
              _this.removeClass('searching')
          }, 250)
      }
  });
  */
  // fixedscroll items

  if ($('#fixedOnScroll').length) {
    var target = $('#fixedOnScroll'),
        distanceTop = target.offset().top,
        footerHeight = $('footer').height();
    $window = $(window);
    console.log(footerHeight);
    $window.scroll(function () {
      if ($window.scrollTop() + 15 >= distanceTop) {
        target.addClass('stayOnScreen');
      } else {
        if (target.hasClass('stayOnScreen')) {
          target.removeClass('stayOnScreen');
        }
      }

      if ($(window).scrollTop() + $(window).height() > $(document).height() - footerHeight + 381) {
        target.addClass('stopScroll');
        console.log(1);
      } else {
        target.removeClass('stopScroll');
      }
    });
  }

  $('.menu-item').hover(function () {
    var datamenu = $(this).attr('data-menu');
    console.log(datamenu);
    $('.menu-row').hide();
    $('section[data-menu="' + datamenu + '"]').attr("style", "display: inline !important;");
  });
  $('.menu-row').hover(function () {}, function () {
    $('.menu-row').hide();
  });
});


