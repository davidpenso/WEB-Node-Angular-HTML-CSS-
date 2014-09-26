/*---------RANDOMIZE ALERT----------*/
if(
	taxi_new_top_position= $("grid-square pathred_position"));{
	$(this).addClass(".alert1"); //----add random alert 1 through 24-----
	}




/*------Taxi Moves Only in the grid-------*/

if (taxi-left-position>=960px
//only move from top)

if (taxi-top-position<=576px
//taxi only moves left)

/*-----------WIN CONDITION------------*/
if (taxi-new-top-position=bottom: 20)
if (taxi-new-left-position=right: 8)
if (taxi-new-position=(x,y)


/*----TIMER------*/
var timer= 20-(direction_value)
if(taxi_new_position= redsquare)
	timer=(new_direction_value-1)


/*------CLOUD/SUN RANDOM-----*/
var image = new Array ();
image[0] = "cloud.png";
image[1] = "sun.png";

var size = image.length
var x = Math.floor(size*Math.random())

$('#random').attr('src',image[x]);

//--------------------------------


var chooseFrom = ['cloud.png', 'sun.png',];
$(function() {
      shuffle(chooseFrom);
      for (var i = 1; i <= 2; i++) {
            $('.weather_image' + i).attr('src', chooseFrom[i - 1]);
      }
});

function shuffle(a) {
    for (var i = a.length; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temp = a[i - 1];
        a[i - 1] = a[j];
        a[j] = temp;
    }
    return a;
}

//--------------------------------
		var randomImage = {
        paths: [
          "cloud.png",
          "sun.png",
          
        ],
        
        generate: function(){
          var path = randomImage.paths[Math.floor(Math.random()*randomImage.paths.length)];
          var img = new Image();
          img.src = path;
          $("#randomImage a").html(img);
          $("#randomImage a").attr("href", path);
        }
      }
      
      randomImage.generate();


/*RANDOM CLOUD OR SUN*/
var divs = $("div.weather_image").get().sort(function(){ 
    return Math.round(Math.random())-0.5; 
    }).slice(0,4)
    $(divs).show();


$(function() {
    var images = ['cloud.png', 'sun.png'];
    $('div.weather_image').css({ 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')'});
   });



