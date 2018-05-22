const _ANCHO = 360;
const _ALTO = 240;
const img=false;

function load_canvas(){


if(!img){
	document.getElementById("start").disabled = true;
	document.getElementById("finish").disabled = true;
	document.getElementById("help").disabled = true;
}


	let cvs = document.querySelectorAll("canvas");
	cvs.forEach(function(e){
		e.width 	= _ANCHO;
		e.height 	= _ALTO;
	});

	//derrapa&dropea
	let cv01 = document.querySelector('#cv_img');
	let cv02 = document.querySelector('#cv_sel');

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

				let ctx2 = cv02.getContext('2d');
				ctx2.drawImage(img,0,0,cv02.width,cv02.height);
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(fichero);
		document.getElementById("start").disabled = false;
	};
}