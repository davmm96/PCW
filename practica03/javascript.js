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

	ctx = cv01.getContext('2d');
	ctx.font = 'bold 18px sans-serif';
	ctx.textAlign = 'center';
	ctx.fillText('Haz click o arrastra una imagen aquí',180,100);

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
				console.log(img);
				insertar_foto_canvas(img);
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(fichero);
	};
}

function anyadir_foto(input){
	if(input.files[0]){

		let fichero = input.files[0];
		let fr = new FileReader();

		fr.onload = function(){
			let img = new Image();
			img.onload = function(){
				console.log(img);
				insertar_foto_canvas(img);
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(fichero);
	}
}

function insertar_foto_canvas(img){

	let cv01 = document.querySelector('#cv_img');
	let ctx = cv01.getContext('2d');
	ctx.drawImage(img,0,0,cv01.width,cv01.height);

	let cv02 = document.querySelector('#cv_sel');
	let ctx2 = cv02.getContext('2d');
	ctx2.drawImage(img,0,0,cv02.width,cv02.height);

}