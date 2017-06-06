/* globals $:false */

$(function () {
	var app = {
		init: function () {

			this._initScrollFunctions();

		},
		_initScrollFunctions: function () {
			$(document).ready(function() {
				$(this).scrollTop(80);
			});
			$(window).scroll(function(){
				if ($(window).scrollTop() > $('.main1').offset().top *.75) {
					$('.logo').addClass('hidden');
					$('#flower').addClass('hidden');

				} else {
					$('.logo').removeClass('hidden');
				}
			});

			
			$('.logo').click(function() {
			    $('html, body').animate({
			        scrollTop: $('.main1').offset().top
			    }, 200);
			});


			$('.clicker').click(function() {
			    $('html, body').animate({
			        scrollTop: $('.main1').offset().top
			    }, 200);
			});


		}
	};

	app.init();
});