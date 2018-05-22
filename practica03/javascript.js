const _ANCHO = 360;
const _ALTO = 240;

function load_canvas(){

	let cvs = document.querySelectorAll("canvas");
	cvs.forEach(function(e){
		e.width 	= _ANCHO;
		e.height 	= _ALTO;
	});

	//derrapa&dropea
	let cv01 = document.querySelector('#cv_img');

	cv01.ondragover = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;
		console.log("Drageando");
	};

	cv01.ondrop = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;	

		let fichero = e.dataTransfer.files[0];
		let fr = new FileReader();

		fr.onload = function(){
			let img = new Image();
			img.onload = function(){
				let ctx = cv01.getContext('2d');
				ctx.drawImage(img,0,0,cv01.width,cv01.height);
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(fichero);
	};
}