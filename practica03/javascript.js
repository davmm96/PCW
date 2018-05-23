const _ANCHO = 360;
const _ALTO = 240;
var imag=false;
var dificultad=1;
var color="#f00";
var ctx2;
var imagen;
var cronometro;

function load_canvas(){


if(!imag){
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
	let ctx = cv01.getContext('2d');


	ctx.fillStyle = '#000';
	ctx.font = 'bold 18px sans-serif';
	ctx.textAlign = 'center';
	ctx.fillText('Haz click o arrastra una imagen aquí',180,100);

	cv01.ondragover = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;
	};

	//RESALTAR CUANDO DRAGEAS

	

	cv01.ondragenter = function(e){
		if(document.getElementById("anyadir_foto").disabled == false){
			ctx.fillStyle = '#00bbff';
			ctx.globalAlpha = 0.3;
			ctx.fillRect(0,0,_ANCHO,_ALTO);
			console.log("HOLA");
		}
	}

	cv01.ondragleave = function(e){
		if(document.getElementById("anyadir_foto").disabled == false){
			ctx.globalAlpha = 0;
			cv01.width=cv01.width;
			ctx.fillStyle = '#000';
			ctx.font = 'bold 18px sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText('Haz click o arrastra una imagen aquí',180,100);
		}
	}

	
	//FIN DE RESALTAR CUANDO DRAGEAS

	cv01.ondrop = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false; 

		if(document.getElementById("anyadir_foto").disabled == false){
			cv01.width=cv01.width;
			let fichero = e.dataTransfer.files[0];
			let fr = new FileReader();

			fr.onload = function(){
				let img = new Image();
				img.onload = function(){
					insertar_foto_canvas(img);
				};
				img.src = fr.result;
			};

			fr.readAsDataURL(fichero);
			imag=true;
			document.getElementById("start").disabled = false;
		}
	};

}

function anyadir_foto(input){
	if(input.files[0]){

		let fichero = input.files[0];
		let fr = new FileReader();
		fr.onload = function(){
			let img = new Image();
			img.onload = function(){
				insertar_foto_canvas(img);
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(fichero);
		imag=true;
		document.getElementById("start").disabled = false;
	}
}

function insertar_foto_canvas(img){
	
		let cv01 = document.querySelector('#cv_img');
		let ctx = cv01.getContext('2d');
		ctx.drawImage(img,0,0,cv01.width,cv01.height);

		let cv02 = document.querySelector('#cv_sel');
		ctx2 = cv02.getContext('2d');
		ctx2.drawImage(img,0,0,cv02.width,cv02.height);

		imagen=img;

		ctx2=dibujar_rejilla(ctx2);

		ctx2.strokeStyle=color;
		ctx2.stroke();
	
}

function cambio_dificultad(dif){

if(imag){
		dificultad=dif.value;

		let cv02 = document.querySelector('#cv_sel');
		cv02.width=cv02.width;

		ctx2.drawImage(imagen,0,0,cv02.width,cv02.height);
		ctx2=dibujar_rejilla(ctx2);

		ctx2.strokeStyle=color;
		ctx2.stroke();
	}
	else
		dificultad=dif.value;
}




function cambio_color(col){
	if(imag){
		color=col.value;

		let cv02 = document.querySelector('#cv_sel');
		cv02.width=cv02.width;

		ctx2.drawImage(imagen,0,0,cv02.width,cv02.height);


		ctx2=dibujar_rejilla(ctx2);

		ctx2.strokeStyle=color;
		ctx2.stroke();

	}
	else
		color=col.value;
}

function dibujar_rejilla(ctx2){
	if(dificultad==1){
			for(var x=0; x<=360; x=x+60){
				ctx2.moveTo(x,0);
				ctx2.lineTo(x,240);
			}

			for(var y=0; y<=240; y=y+60){
				ctx2.moveTo(0,y);
				ctx2.lineTo(360,y);
			}
	}
	else if(dificultad==2){
			for(var x=0; x<=360; x=x+40){
				ctx2.moveTo(x,0);
				ctx2.lineTo(x,240);
			}

			for(var y=0; y<=240; y=y+40){
				ctx2.moveTo(0,y);
				ctx2.lineTo(360,y);
			}
	}
	else if(dificultad==3){
			for(var x=0; x<=360; x=x+30){
				ctx2.moveTo(x,0);
				ctx2.lineTo(x,240);
			}

			for(var y=0; y<=240; y=y+30){
				ctx2.moveTo(0,y);
				ctx2.lineTo(360,y);
			}
		}
		return ctx2;
}

function jugar(){
	//RANDOMIZAR
	var tam = 0;

	if(dificultad == 1){tam =60;}
	else if(dificultad == 2){tam =40;}
	else if(dificultad == 3){tam =30;}

	let cv02 = document.querySelector('#cv_sel');
	let ctx2 = cv02.getContext('2d');

	for(var x = 0; x < _ANCHO ; x = x+tam){
		for(var y = 0; y < _ALTO ; y = y+tam){
			var rx = Math.floor((Math.random() * _ANCHO/tam) + 1) -1;
			var ry = Math.floor((Math.random() * _ALTO/tam) + 1) -1;
			rx = rx*tam;
			ry = ry*tam;

			let img1 = ctx2.getImageData(x,y,tam,tam);
			let img2 = ctx2.getImageData(rx,ry,tam,tam);

			ctx2.putImageData(img1, rx, ry);
			ctx2.putImageData(img2, x, y);

		}
	}

	//CRONOMETRO
	document.getElementById("start").disabled = true;
	div_segundos = document.getElementById("cronometro");
	var segundos = 0;
	cronometro = setInterval(function(){
		segundos ++;
		div_segundos.innerHTML = "Tiempo: " + segundos + " segundos";
	},1000);
	
	document.getElementById("anyadir_foto").disabled = true;
	document.getElementById("dificultad").disabled = true;
	document.getElementById("color").disabled = true;
	document.getElementById("finish").disabled = false;
	document.getElementById("help").disabled = false;


}

function detenerCrono(){
	clearInterval(cronometro);
}