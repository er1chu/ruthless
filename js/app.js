/* globals $:false */

$(function () {
	var app = {
		init: function () {

			this._initScroll();

		},
		_initScroll: function () {
			$(window).scroll(function(){
				if ($(window).scrollTop() > $('.main1').offset().top *.75) {
					$('.logo').addClass('hidden');
				} else {
					$('.logo').removeClass('hidden');
				}
			});

			
			$('.logo').click(function() {
			    $('html, body').animate({
			        scrollTop: $('.main1').offset().top
			    }, 200);
			});

		}
	};

	app.init();
});