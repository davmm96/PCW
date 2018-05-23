const _ANCHO = 360;
const _ALTO = 240;
var imag=false;
var dificultad=1;
var color="#f00";
var ctx2;
var imagen;
var cronometro;
var tam = 0;
var movimientos = 0;
var segundos = 0;
var ingame = false;

//variables para mov
var cx = 0;
var cy = 0;
var cx_aux = 0;
var cy_aux = 0;

var sx = 0;
var sy = 0;
var sx_aux = 0;
var sy_aux = 0;

var pieza_pick = false;

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
	let ctx2 = cv02.getContext('2d');

	ctx.fillStyle = '#000';
	ctx.font = 'bold 18px sans-serif';
	ctx.textAlign = 'center';
	ctx.fillText('Haz click o arrastra una imagen aquí',180,100);

	ctx2.lineWidth = 2;
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


	//MOVER PIEZAS

	//DESTACAR LA ZONA POR LA QUE PASA EL RATON

	cv02.onmousemove = function(e){
		if (ingame == true){
			let x = e.offsetX;	
			let y = e.offsetY;


			cx_aux = cx;
			cy_aux = cy;

			cx = Math.trunc(x/tam);
			cy = Math.trunc(y/tam);

			console.log('cx: ' + cx + ' cy: ' + cy);

			if (cx_aux == cx  && cy_aux == cy){}
			else{
				ctx2.globalAlpha = 1;
				ctx2.strokeStyle = color;
				ctx2.strokeRect(cx_aux*tam,cy_aux*tam,tam,tam);
				ctx2.strokeStyle = '#000000';
				ctx2.strokeRect(cx*tam,cy*tam,tam,tam);
				if(pieza_pick == true){	
					ctx2.strokeStyle = '#ffffff';
					ctx2.strokeRect(sx*tam,sy*tam,tam,tam);
				}			
			}	
		}
	};

	//DESTACAR PIEZA SELECCIONADA
	cv02.onclick = function(e){
		if (ingame == true) {
			console.log(pieza_pick);
			let x = e.offsetX;	
			let y = e.offsetY;

			sx_aux = sx;
			sy_aux = sy;

			sx = Math.trunc(x/tam);
			sy = Math.trunc(y/tam);

			if(pieza_pick == false){
				pieza_pick = true;
				ctx2.strokeStyle = '#ffffff';
				ctx2.strokeRect(sx*tam,sy*tam,tam,tam);
			}
			else{
				if (sx_aux == sx  && sy_aux == sy){
					ctx2.strokeStyle = color;
					ctx2.strokeRect(sx*tam,sy*tam,tam,tam);
					pieza_pick = false;
				}	
				else{
					let img1 = ctx2.getImageData(sx*tam,sy*tam,tam,tam);
					let img2 = ctx2.getImageData(sx_aux*tam,sy_aux*tam,tam,tam);

					ctx2.putImageData(img1, sx_aux*tam, sy_aux*tam);
					ctx2.putImageData(img2, sx*tam, sy*tam);

					movimientos++;
					div_mov = document.getElementById("n_movimientos");
					div_mov.innerHTML = movimientos + " Movimientos realizados";

					pieza_pick = false;
				}	
			}
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
		tam = 60;
			for(var x=0; x<=360; x=x+tam){
				ctx2.moveTo(x,0);
				ctx2.lineTo(x,240);
			}

			for(var y=0; y<=240; y=y+tam){
				ctx2.moveTo(0,y);
				ctx2.lineTo(360,y);
			}
	}
	else if(dificultad==2){
		tam = 40;
			for(var x=0; x<=360; x=x+tam){
				ctx2.moveTo(x,0);
				ctx2.lineTo(x,240);
			}

			for(var y=0; y<=240; y=y+tam){
				ctx2.moveTo(0,y);
				ctx2.lineTo(360,y);
			}
	}
	else if(dificultad==3){
		tam = 30;
			for(var x=0; x<=360; x=x+tam){
				ctx2.moveTo(x,0);
				ctx2.lineTo(x,240);
			}

			for(var y=0; y<=240; y=y+tam){
				ctx2.moveTo(0,y);
				ctx2.lineTo(360,y);
			}
		}
		return ctx2;
}

function jugar(){
	movimientos = 0;
	ingame = true;
	//RANDOMIZAR
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
	
	div_segundos = document.getElementById("cronometro");
	cronometro = setInterval(function(){
		segundos ++;
		div_segundos.innerHTML = "Tiempo: " + segundos + " segundos";
	},1000);

	document.getElementById("start").disabled = true;
	document.getElementById("anyadir_foto").disabled = true;
	document.getElementById("dificultad").disabled = true;
	document.getElementById("color").disabled = true;
	document.getElementById("finish").disabled = false;
	document.getElementById("help").disabled = false;


}

function finalizar(){
	let c_seccion = document.querySelector('#mensajemodal');
	let mensajeModal = document.querySelector('.contenidomodal');
	mensajeModal.innerHTML = 
	'<div><p>Has dejado 12 piezas por colocar bien ' +
	'después de ' + movimientos +' y has empleado '+ segundos+' segundos.</p>'+
	'<button class="confirmar" onclick="reiniciar();">¡De acuerdo!</button></div>';
	c_seccion.style.display = "block";
}

function reiniciar(){
	
}

function detenerCrono(){
	clearInterval(cronometro);
}