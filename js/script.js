$(function() {
	$('.img-bg').each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
	$('.partners-b .list ul li').on('click', function(e) {
		e.preventDefault();
		$(this).parents('section').find('.bg[data-bg="'+$(this).attr('data-elem')+'"]').stop().fadeIn(1000).siblings('.bg').stop().fadeOut(1000);
		$(this).addClass('active').siblings().removeClass('active');
	}).filter(':first').click();
	$(window).on('load resize', function() {
		$('.partners-b .bg').each(function() {
			$(this).outerHeight($(this).parent().outerHeight());
		});
	});
	$(window).trigger('resize');
	$(window).on('scroll', function() {
		$('.animated-appearance').each(function() {
			if ( $(window).scrollTop() > $(this).offset().top-$(window).height()-50 && !$(this).hasClass('complete') ) {
				$(this).addClass('complete')
			}
		});
	});
	$(window).trigger('scroll');
	$('.stat-b .slider').slick({
		arrows: false,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		dots: true,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1339,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 1019,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 759,
				settings: {
					arrows: true,
					dots: false,
					useTransform: false,
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 471,
				settings: {
					arrows: true,
					dots: false,
					useTransform: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	$('nav a, .menu-left ul a').on('click', function(e) {
		e.preventDefault();
		var t = $('[data-id="'+$(this).attr('href')+'"]');
		var speed = 1000;
		if ( isMobile ) {
			$('.menu-left .close').trigger('click');
			speed = 0;
		}
		if ( !$(this).parent().index() == 0 ) {
			if ( !isMobile ) {
				if ( t.outerHeight() < $(window).height() ) {
					var c = ($(window).height()-t.outerHeight())/2;
				} else {
					var c = 0;
				}
			} else {
				var c = $('header').height();
			}
			$('html, body').stop().animate({
				scrollTop: t.offset().top-c+'px'
			}, speed);
		} else {
			$('html, body').stop().animate({
				scrollTop: 0
			}, speed);
		}
	});
	function swapBlocks() {
		if ( $('header a.button').is(':hidden') ) {
			$('.introduction .sub .pros').detach().insertAfter('.introduction .main h2');
			$('.introduction .sub .cons').detach().insertAfter('.introduction .main .nav');
			$('.more-spec').detach().insertAfter('.partners-b');
		} else {
			$('.about-i ul').detach().insertAfter('.about-i h4');
			$('.introduction .main .pros, .introduction .main .cons').detach().appendTo('.introduction .sub');
			$('.more-spec').detach().insertAfter('.partners-b .list');
		}
	}
	$('.intro-m').height($(window).height());
	var isMobile;
	var justResized = false;
	$(window).on('scroll load resize', function() {
		justResized = true;
		if ( $('header a.button').is(':hidden') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		swapBlocks();
		$('nav li').removeClass('active');
		$('[data-id]').each(function() {
			if ( $(document).scrollTop() >= $(this).offset().top-$(window).height()/2 ) {
				$('nav li:nth-child('+eval($(this).attr('data-id'))+')').addClass('active');
				$('nav li:nth-child('+eval($(this).attr('data-id'))+'), .menu-left li:nth-child('+eval($(this).attr('data-id'))+')').addClass('current').siblings().removeClass('current');
			}
		});
		if ( $(window).scrollTop()+($(window).height()-$('nav').outerHeight())/2 <= $('header').height()+30 ) {
			$('nav').css({
				'position': 'absolute',
				'top': $('header').height()+30+'px',
				'margin-top': '0'
			});
		} else if ( $(window).scrollTop()+($(window).height()-$('nav').outerHeight())/2 > $('.add-info').offset().top-$('nav').height()-30 ) {
			$('nav').css({
				'position': 'absolute',
				'top': $('.add-info').offset().top-30-$('nav').height()+'px',
				'margin-top': '0'
			});
		} else {
			$('nav').css({
				'position': 'fixed',
				'top': '50%',
				'margin-top': '-325px'
			});
		}
		if ( $('.scale-b .core').width() < 946 && !isMobile ) {
			$('.scale-b .scheme').css({
				'-webkit-transform': 'scale('+$('.scale-b .core').width()/946+')',
				'transform': 'scale('+$('.scale-b .core').width()/946+')'
			});
		} else {
			$('.scale-b .scheme').css({
				'-webkit-transform': 'scale(1)',
				'transform': 'scale(1)'
			});
		}
	});
	$(window).trigger('scroll');
	$(window).on('resize', function() {
		$('.presentation-b .core .nav li.active a, .presentation-b .tab .sub-nav li.active a').trigger('click');
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('disabled') > 0 ) {
			$('.lk-drop').stop().slideUp(250);
			$('.lk-open').removeClass('opened');
			var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
			$('.fade').stop(true,true).fadeIn(500);
			var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
			if ( h < $(window).scrollTop() ) {
				h = $(window).scrollTop();
			}
			t.css({
				'top': h+'px'
			}).stop(true,true).fadeIn(500);
		}
	});
	$('.fade, .modal .close, .modal .continue').on('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(500);
	});
	$('.phone-mask').mask('+7-999-999-99-99',{placeholder:'+7-___-___-__-__'});
	$('.menu-open').on('click', function(e) {
		e.preventDefault();
		$('.menu-left').stop().animate({
			'margin-left': '0'
		}, 500);
	});
	$('.menu-left .close').on('click', function(e) {
		e.preventDefault();
		$('.menu-left').stop().animate({
			'margin-left': -$('.menu-left').outerWidth()+'px'
		}, 500);
	});
	$('html, body').click(function(e) {
		e.preventDefault();
		$('.menu-left .close').trigger('click');
	});
	$('.menu-left, .menu-open').click(function(e) {
		e.stopPropagation();
	});
	$('.introduction .main .nav li a').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parents('section');
		var id = eval($(this).attr('href'));
		if ( !t.find('.active').length == 0 ) {
			var delay = 0;
		} else {
			var delay = 400;
		}
		t.find('.list.active').removeClass('active');
		setTimeout(function() {
			t.find('[data="'+id+'"]').addClass('active');
		}, delay);
		$(this).parent().addClass('active').siblings().removeClass('active');
	}).filter(':first').click();
	$('.presentation-b .core .nav li a').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parents('section');
		var id = $(this).attr('href');
		if ( !t.find('.tab.active').length == 0 ) {
			console.log(isMobile);
			var delay = 0;
		} else {
			var delay = 400;
		}
		if ( !t.find('[data-tab="'+id+'"]').hasClass('active') || justResized ) {
			if ( !isMobile ) {
				t.find('[data-tab="'+id+'"]').siblings('div').animate({
					'margin-top': '100px',
					'opacity': '0'
				}, 400);
				setTimeout(function() {
					t.find('[data-tab="'+id+'"]').css({
						'margin-top': '-100px'
					}).animate({
						'opacity': '1',
						'margin-top': '0'
					}, 400);
				}, delay);
			}
			t.removeClass('bg-1 bg-2').addClass('bg-'+$(this).attr('href'));
			$(this).parent().addClass('active').siblings().removeClass('active');
			!t.find('[data-tab="'+id+'"]').addClass('active').siblings().removeClass('active');
			justResized = false;
		}
		if ( isMobile ) {
			t.find('[data-tab="'+id+'"]').find('.sub-nav li.active a').trigger('click')
		}
	}).filter(':first').click();
	$('.presentation-b .tab .sub-nav li a').on('click', function(e) {
		e.preventDefault();
		var pic = $(this).parents('[data-tab]').find('.pic');
		var cont = $(this).parents('[data-tab]').find('.cont');
		var id = eval($(this).attr('href'));
		pic.find('[data-pic="'+id+'"]').stop().fadeIn(800).siblings().stop().fadeOut(800);
		if ( !cont.find('.active').length == 0 ) {
			var delay = 0;
		} else {
			var delay = 400;
		}
		cont.find('.active').removeClass('active');
		setTimeout(function() {
			cont.find('[data-info="'+id+'"]').addClass('active');
			if ( isMobile ) {
				cont.find('h6 a').height(cont.find('.active').outerHeight());
			}
		}, delay);
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	$('.presentation-b .tab > div').each(function() {
		$(this).find('.sub-nav li').eq(0).find('a').trigger('click');
	});
	$('.presentation-b .tab h6 a').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parents('[data-tab]').find('.sub-nav li');
		var n = t.filter('.active').next();
		if ( n.length > 0 ) {
			n.find('a').trigger('click');
		} else {
			t.eq('0').find('a').trigger('click');
		}
	});
	$('.price-b .group .next').on('click', function() {
		$(this).siblings('.subscribe').addClass('active').siblings('.link').removeClass('active');
		$(this).hide().siblings('.prev').show();
	});
	$('.price-b .group .prev').on('click', function() {
		$(this).siblings('.free').addClass('active').siblings('.link').removeClass('active');
		$(this).hide().siblings('.next').show();
	});
	$('.start-b .core .next').on('click', function() {
		var t = $(this).siblings('ul');
		if ( t.find('.active').next().length > 0 ) {
			t.find('.active').next().addClass('active').siblings().removeClass('active');
		}
		if ( t.find('.active').next().length == 0 ) {
			$(this).hide();
		}
		$(this).siblings('.prev').show();
	});
	$('.start-b .core .prev').on('click', function() {
		var t = $(this).siblings('ul');
		if ( t.find('.active').prev().length > 0 ) {
			t.find('.active').prev().addClass('active').siblings().removeClass('active');
		}
		if ( t.find('.active').prev().length == 0 ) {
			$(this).hide();
		}
		$(this).siblings('.next').show();
	});
	if ( isMobile ) {
		$('.presentation-b .tab .cont').on('swipeleft', function() {
			$(this).find('h6 a').trigger('click')
		});
		$('.price-b .group').on('swipeleft', function() {
			$('.price-b .group').find('.next').trigger('click')
		});
		$('.price-b .group').on('swiperight', function() {
			$('.price-b .group').find('.prev').trigger('click')
		});
		$('.start-b .core').on('swipeleft', function() {
			$('.start-b .core').find('.next').trigger('click')
		});
		$('.start-b .core').on('swiperight', function() {
			$('.start-b .core').find('.prev').trigger('click')
		});
	}
});