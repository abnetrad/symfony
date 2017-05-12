'use strict';
	// BOOTSTRAP
	// FIXER LE HEADER AU SCROLL
	// $('#header').affix({
	// 	offset: {
	// 		top: function () {
	// 		  return (this.bottom = $('#header').outerHeight(true));
	// 		}
	// 	}
	// });

	// CAROUSEL
	// $('.carousel').carousel();

	// $('body').on('click','.carousel .carousel-control',function() {
	//    $(this).closest('.carousel').carousel( $(this).data('slide') );
	// });

	// SELECT
	// $('select').selectpicker();


	// EXTERNAL
	// MENU RESPONSIVE

	// if($('.content-wrap').length >= 1){
	// 	var bodyEl = document.body,
	// 		content = document.querySelector( '.content-wrap' ),
	// 		openbtn = document.getElementById( 'open-button' ),
	// 		closebtn = document.getElementById( 'close-button' ),
	// 		isOpen = false;

	// 	let init = () => initEvents();

	// 	let initEvents = () => {
	// 		openbtn.addEventListener( 'click', toggleMenu );
	// 		if( closebtn ) {
	// 			closebtn.addEventListener( 'click', toggleMenu );
	// 		}

	// 		// close the menu element if the target it´s not the menu element or one of its descendants..
	// 		content.addEventListener( 'click', function(ev) {
	// 			var target = ev.target;
	// 			if( isOpen && target !== openbtn ) {
	// 				toggleMenu();
	// 			}
	// 		} );
	// 	}

	// 	let toggleMenu = () => {
	// 		if( isOpen ) {
	// 			bodyEl.classList.remove('show-menu');
	// 		}
	// 		else {
	// 			bodyEl.classList.add('show-menu');
	// 		}
	// 		isOpen = !isOpen;
	// 	}
	// 	init();
	// }

	// END MENU RESPONSIVE


	// GMAP CLICK
	$('.gmap').click(function () {
        $('.gmap iframe').css("pointer-events", "auto");
    });
	


	// SLICK SLIDER
	// if($('.slick-slider')){
	// 	$('.slick-slider').slick({
	// 		dots: true,
	// 		infinite: true,
	// 		speed: 300,
	// 		slidesToShow: 4,
	// 		slidesToScroll: 4,
	// 		prevArrow: '<span class="icon-arrow-left"></span>',
	// 		nextArrow: '<span class="icon-arrow-right"></span>',
	// 		responsive: [
	// 			{
	// 			  breakpoint: 992,
	// 			  settings: {
	// 			    slidesToShow: 3,
	// 			    slidesToScroll: 3,
	// 			    infinite: true,
	// 			    dots: true
	// 			  }
	// 			},
	// 			{
	// 			  breakpoint: 767,
	// 			  settings: {
	// 			    slidesToShow: 2,
	// 			    slidesToScroll: 2,
	// 			    arrows: false
	// 			  }
	// 			},
	// 			{
	// 			  breakpoint: 480,
	// 			  settings: {
	// 			    slidesToShow: 1,
	// 			    slidesToScroll: 1,
	// 			    arrows: false
	// 			  }
	// 			}
	// 		]
	// 	});
	// }


	// GOOEY
	// $('#gooey2').find('.menu-open-button').on('click', function(){
	// 	$(this).toggleClass('open');
	// 	$('.menu-item-parent.open').removeClass('open');

	// 	var submenu = $(this).next('ul').find('a.menu-item-parent');

	// 	$(submenu).on('click', function(){
	// 		$(this).toggleClass('open');
	// 		$('.menu-item-parent.open').not($(this)).removeClass('open');
	// 		return false;
	// 	});
	// });

	// // INPUT FILE
 //    $(document).on('change', '.btn-file :file', function() {
 //        var input = $(this),
 //            numFiles = input.get(0).files ? input.get(0).files.length : 1,
 //            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
 //        input.trigger('fileselect', [numFiles, label]);
 //    });


 //    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
 //        $(this).parent($('.btn')).next($('.input-file-selected')).text(label);
 //    });

(function(){
    var button = document.querySelector('.toggle-btn');
    if (button !== null) {
        button.addEventListener(mobilecheck() ? 'touchstart' : 'click', function(event){
            document.querySelector('.navbar-nav').classList.toggle('open');
        });
    }

    $('[data-toggle="tooltip"]').tooltip();
})();


$(document).ready(function() {
    var form = $('form'),
        telInput = form.find('#phone-number-int'),
        errorMsg = $("#error-msg"),
        validMsg = $("#valid-msg");

    var getCode = function () {
        var flagCountry = $('.selected-flag').attr('title');
        if(flagCountry != undefined){
            var pos = flagCountry.indexOf('+');
            return String(flagCountry).substr(pos, flagCountry.length - pos);
        }
        return null;
    }

    if (form && telInput) {
        form.submit(function() {
            var input = $('#phone-number-int');
            var inputVal = input.val();
            var code = getCode();

            if(inputVal != undefined && inputVal != null){
                input.val(code +  inputVal.substring(0).replace(/\s+/g, ''));
            }
        });

        telInput.intlTelInput({
            utilsScript: '/js/utils.js',
            autoPlaceholder: true,
            preferredCountries: ['fr', 'us', 'gb']
        });

        var reset = function() {
            telInput.removeClass("error");
            errorMsg.addClass("hide");
            validMsg.addClass("hide");
        };

        // on blur: validate
        telInput.blur(function() {
            reset();
            if ($.trim(telInput.val())) {
                if (telInput.intlTelInput("isValidNumber")) {
                    validMsg.removeClass("hide");
                } else {
                    telInput.addClass("error");
                    errorMsg.removeClass("hide");
                }
            }
        });

        // var codeStart = getCode();
        // var input = $('#phone-number-int');
        // if(codeStart != null){
        //     var inputVal = input.val();
        //     if(inputVal.indexOf(codeStart) > -1){
        //         input.val(inputVal.replace(codeStart, 0));
        //     }
        // }
    }
});

