
var breakpoint = false;
var breakpointSize = 992;

	
function launchMenu(){

	if($(window).width() < breakpointSize){
		breakpoint = true;
	}

	if(breakpoint){
		new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );

		var headerH = $('#header').height();
		$('.mp-container').css('top', headerH);

	} else {
		
	}
}

launchMenu();

$(window).resize(function(){
	launchMenu();
	// console.log('ok');
});
