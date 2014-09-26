
/*RANDOM PATHRED*/
$(".grid-square").each(function() {
	$(this).removeClass('pathred');
	$(".alert1").hide();


	var random = Math.ceil(Math.random() * 5);

	if (random > 4 ) {
		$(this).addClass("pathred");
	}
});

/*TAXI MOVES WHEN SPACE IS PRESSED*/
$(window).keypress(function(e) {
	e.preventDefault();
	if (e.keyCode == 32) {
		move_taxi();
		$( ".alertstart" ).empty();
	}
});


/*DIRECTION AND SPACE TO MOVE VALUE OF TAXI*/
function move_taxi() {
	var direction_value        = Math.ceil(Math.random() * 2),
		direction_to_move      = direction_value == 1 ? 'top' : 'left',
		spaces_to_move         = Math.ceil(Math.random() * 4),
		pixels_to_move         = spaces_to_move * 64,
		taxi_left_position     = Math.abs($('#taxi').css('left').replace('px', '')),
		taxi_top_position      = Math.abs($('#taxi').css('top').replace('px', ''));



	var	taxi_new_top_position  = direction_value == 1 ? taxi_top_position : taxi_top_position + pixels_to_move,
		taxi_new_left_position = direction_value == 2 ? taxi_left_position : taxi_left_position + pixels_to_move;

		while(taxi_new_top_position>=537){
			taxi_new_top_position=537;
			$('#taxi').css({
				'top': taxi_new_top_position,
				'left': taxi_new_left_position
			});
			if (direction_value==2) {
			
			timer(spaces_to_move);
		};
			break;
		}
		while(taxi_new_left_position>=896){
			taxi_new_left_position=896;
			$('#taxi').css({
				'top': taxi_new_top_position,
				'left': taxi_new_left_position
			});
			if (direction_value==1) {
				
			timer(spaces_to_move);
		};
			break;
		}
		


		if (taxi_new_left_position==896 && taxi_new_top_position==537) {
			check();
		};

		
	
		$('#taxi').css({
			'top': taxi_new_top_position,
			'left': taxi_new_left_position
		});
		timer(spaces_to_move);
	
		

		
	
	

	//console.log("spaces_to_move",spaces_to_move);
	//console.log(direction_to_move);
	//console.log("pixels_to_move",pixels_to_move);	
	//console.log('=======');
	//console.log("left new", taxi_new_left_position);
	//console.log("top new", taxi_new_top_position);
	console.log("left ", taxi_left_position);
	console.log("top ", taxi_top_position);
	
	

	

	set_status();
	
}



function set_status() {
	//var taxi_y_pos = $('#taxi').offset().top,
	//	taxi_x_pos = $('#taxi').offset().left;


	$('.grid-square pathred').each(function() {
		alert("burdayiz");
		//var y_difference = Math.abs($(this).offset().top - taxi_y_pos),
		//	x_difference = Math.abs($(this).offset().left - taxi_y_pos);
		//	console.log(taxi_y_pos);

		
			$(".alert1").show()

		
	});
}

/*RANDOM CLOUD OR SUN*/

/*TIMER*/
var time=40;
function timer(n){
	var text= time-n;
	time=text;
	if (time<0) {
		lose();
	};


	
	var num = 'min'
	$('.timer').replaceWith('<div class="timer">'+text+num+'</div>');

	

}


/*RANDOM ALERT*/


/*TAXI ONLY MOVES INSIDE THE GRID*/


/*WINNING CONDITION*/
function win(){
	window.location.href ="win.html";

}
function check(){
	if (time>0) {
		win();
	};
}


/*LOSING CONDITION*/
function lose(){
	
	window.location.href ="lose.html";

}