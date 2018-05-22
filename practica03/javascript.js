const _ANCHO = 360;
const _ALTO = 240;

function load_canvas(){

	let cvs = document.querySelectorAll("canvas");
	cvs.forEach(function(e){
		e.width 	= _ANCHO;
		e.height 	= _ALTO;
	});

	
}