function peticionFetchAPI_GET(){
			var url ='http://localhost/PCW/practica02/rest/receta/';
			fetch(url).then(function(response){
				if(!response.ok){
					console.log('Error(' + response.status + '): ' + response.statusText);
					return;
				}
				response.json().then(function(data){
					console.log(data);
					console.log(data.CODIGO);
					for(let i = 0; i<data.FILAS.length;i++){
						var receta = data.FILAS[i];
						console.log(receta.nombre);
						console.log(receta.autor);
					}
					var prodId = getParameterByName('buscar');
					console.log(prodId);
				});
			})/*.cath(function(err){
				console.log('Fetch Error: ', err);
			})*/;
}

//FUNCIONES INDEX Y BUSCAR//

function seisUltimas(){
	var pag = 0;
	var url = 'http://localhost/PCW/practica02/rest/get/receta.php?prm=&pag=';
	if( getParameterByName('pag') ){
		pag = getParameterByName('pag');		
	}
	url = url + pag + '&lpag=6';

	mostar_recetas(url);
	obtener_nres(url,pag,"");
}

function busqueda_avanzada(){
	if( getParameterByName('buscar') ){
		console.log("holi");
		busqueda_rapida_recetas();
	}
	else{
		var parametro;
		var check = false;
		var url = 'http://localhost/PCW/practica02/rest/receta/';
		var parametros = 
		"?name=" + getParameterByName('name') +
		"&ingredientes=" + getParameterByName('ingredientes') +
		"&tiempo_ini=" + getParameterByName('tiempo_ini') +
		"&tiempo_fin=" + getParameterByName('tiempo_fin') +
		"&dificultad=" + getParameterByName('dificultad') +
		"&comensales=" + getParameterByName('comensales') +
		"&autor=" + getParameterByName('autor');

		//rest/receta/?pag={pagina}&lpag={registros_por_pagina}

		if(getParameterByName('autor') || getParameterByName('name') || getParameterByName('ingredientes') 
			||  getParameterByName('tiempo_ini') || getParameterByName('tiempo_fin') || getParameterByName('dificultad') 
			|| getParameterByName('comensales') ){
			check = true;

			url = url + "?n=" + getParameterByName('name');
			url = url + "&i=" + getParameterByName('ingredientes');
			url = url + "&di=" + getParameterByName('tiempo_ini');
			url = url + "&df=" + getParameterByName('tiempo_fin');
			url = url + "&d=" + getParameterByName('dificultad');
			url = url + "&c=" + getParameterByName('comensales');
			url = url + "&a=" + getParameterByName('autor');

			var pag = 0;
			if( getParameterByName('pag') ){
				pag = getParameterByName('pag');		
			}

			url = url + '&pag='+ pag + '&lpag=6';
		}

		

		if(check == false){
			seisUltimas();
		}
		else{
			mostar_recetas(url);
			obtener_nres(url,pag,parametros);
		}
	}
}

function busqueda_rapida_recetas(){
	var parametros = getParameterByName('buscar');
	var url ='http://localhost/PCW/practica02/rest/receta/?t=' + parametros;
	var param = '?buscar=' + parametros;
	var pag = 0;

	if( getParameterByName('pag') ){
		pag = getParameterByName('pag');		
	}

	url = url + '&pag='+ pag + '&lpag=6';

	mostar_recetas(url);
	obtener_nres(url,pag,param);
}

function obtener_nres(url,pag,param){
			fetch(url).then(function(response){
				if(!response.ok){
					console.log('Error(' + response.status + '): ' + response.statusText);
					return;
				}
				response.json().then(function(data){
					localStorage.setItem("n_resultados", data.TOTAL_COINCIDENCIAS);
					paginacion(pag,param);
				});
			})/*.cath(function(err){
				console.log('Fetch Error: ', err);
			})*/;
}

function paginacion(pag,parametros){
	var pathname = window.location.pathname;
	var web = pathname.split("/");
	var web = web[3];
	console.log("parametros: " + parametros);
	console.log(web);
	if(parametros){
		web = web + parametros + '&';
		console.log(parametros);
	}
	else{
		web = web + '?';
	}

	let pag_mostrar = parseInt(pag) +1 ;
	let pag_s =  parseInt(pag) +1;
	let pag_s_mostrar = pag_s + 1;
	let pag_a = parseInt(pag) -1;
	let pag_a_mostrar = pag_a -1;

	let n_res = localStorage.getItem("n_resultados");
	let n_paginas = Math.trunc(n_res / 6 + 1);
	let ult_pag = n_paginas -1;

	var element = document.getElementById("paginacion");

	if(pag_a < 0 ){pag_a = 0;}
	if(pag_s > ult_pag){pag_s = ult_pag;}

	element.innerHTML = 
	'<div class="centrado" id="paginacion">'  +
	'<div class="pasa_paginas">'  +
	'<a href="'+ web + '">1</a>'  +
	'<a href="'+ web +'pag='+ pag_a +'"><i class="fas fa-caret-left"></i></a>'  +
	'<a href=""> '+ pag_mostrar +' </a>'  +
	'<a href="'+ web +'pag='+ pag_s +'"><i class="fas fa-caret-right"></i></a>'  +
	'<a href="'+ web +'pag=' + ult_pag +'">'+ n_paginas + '</a>'  +
	'</div>'  +
	'</div>';
}

function mostar_recetas(url){
			console.log("mostrarrecetas");
			fetch(url).then(function(response){
				if(!response.ok){
					console.log('Error(' + response.status + '): ' + response.statusText);
					console.log("agjioewjgieawoje");
					return;
				}
				response.json().then(function(data){
					console.log("hola");
					localStorage.setItem("n_resultados", data.TOTAL_COINCIDENCIAS);
					console.log("storage mostrar: " + localStorage.getItem("n_resultados"));
					var element;
					element = document.getElementById("contenido_busqueda");
					if (element) {
						for( let i = 0 ; i < data.FILAS.length; i++){
							var receta = data.FILAS[i];
							element.innerHTML = element.innerHTML + 
						'<article>' +
				    	'<p><a href="receta.html?id='+ receta.id +'">' + receta.nombre + '</a></p>'+
				    	'<img src="fotos/' + receta.fichero + '" alt="'+ receta.descripcion_foto +'" width="350" height="200">'+
				    	'<p><a href="buscar.html?autor='+ receta.autor+'">'+ receta.autor +'</a></p>'+
				    	'<p>'+ receta.fecha +'</p>'+
				    	'<p>'+receta.negativos+' votos positivos</p>'+
				    	'<p>'+receta.positivos+' votos negativos</p>'+
				    	'<p>'+receta.comentarios+' Comentarios</p>' +
				    	'</article>';
						}
				    	
					}
					
					
				});
			})/*.cath(function(err){
				console.log('Fetch Error: ', err);
			})*/;
			
}

//FIN FUNCIONES INDEX Y BUSCAR//


function id_receta(){
	var parametros = getParameterByName('id');

	var url ='http://localhost/PCW/practica02/rest/receta/' + parametros;

	console.log(url);

	//Informacion general
	info_receta(url);

	//Ingredientes
	url2=url+'/ingredientes';
	ingredientes_receta(url2);

	//Fotos
	url3=url+'/fotos';
	foto_receta(url3);

	//Comentarios
	url4=url+'/comentarios';
	comen_receta(url4);
}


function foto_receta(url){
			
	fetch(url).then(function(response){
		if(!response.ok){
			console.log('Error(' + response.status + '): ' + response.statusText);
			return;
		}
		response.json().then(function(data){


				var fotos=data.FILAS[0];

				localStorage.setItem("fotos",JSON.stringify(data));

				mostrar_foto(0);	    	

		    	if(logueado()){
		    	element.innerHTML =element.innerHTML +'<div class="like">'+
		    	'<a href="" onclick=voto(1);><i class="far fa-thumbs-up"></i></a>'+
		    	'<a href=""onclick=voto(0);><i id="dislike" class="far fa-thumbs-down"></i></a>'+
		    	'</div>';
	    	
			}
		});
	})
}

function mostrar_foto(a){

console.log(a);


let dato =  localStorage.getItem("fotos") ;
let data = JSON.parse(dato);

console.log(data);

if(a>=0&&a<data.FILAS.length){
	var fotos = data.FILAS[a];
	var a1=a-1;
	var a2=a+1;
	var element=document.getElementById("img_receta");
		element.innerHTML ='<img src="fotos/' + fotos.fichero + '" alt="'+ fotos.texto+'">'+			    	
				    	'<p> <a onclick="mostrar_foto('+a1+')";><i class="fas fa-caret-left"></i></a>'+fotos.texto+
				    	'<a  onclick="mostrar_foto('+a2+')";><i class="fas fa-caret-right"></i></a>'+
				    	'</p>';	
	
}

}

function voto(tipo){

//LIKE
	if(tipo===1){

	}

//DISLIKE
	else{

	}
}



function info_receta(url){
			
			fetch(url).then(function(response){
				if(!response.ok){
					console.log('Error(' + response.status + '): ' + response.statusText);
					return;
				}
				response.json().then(function(data){
					var element;
					element = document.getElementById("info_receta");
					if (element) {
						var receta = data.FILAS[0];
				    	element.innerHTML = '<h1>'+receta.nombre+'</h1>'+
				    	'<p>Fecha: '+receta.fecha+'</p>'+
				    	'<p>Tiempo de elaboracion: '+receta.tiempo+'</p>'+
				    	'<p>Dificultad: '+receta.dificultad+'</p>'+
				    	'<p>Plato para: '+receta.comensales+' personas</p>'+
				    	'Ingredientes'+
				    	'<div id="ingredientes"></div>'+
				    	'<p>'+receta.elaboracion+'</p>'+
				    	'<p>'+receta.positivos+' votos positivos</p>'+
				    	'<p>'+receta.negativos+' votos negativos</p>'+
				    	'<p><a href="buscar.html">'+receta.autor+'</a></p>'+
				    	'<p><a href="#seccion-comentarios">'+receta.comentarios +' Comentarios</a></p>'
				    	;
						    	
					}

					element2=document.getElementById("form_coment");

					if(!logueado()){
				    	element2.innerHTML ='<p>'+'Para dejar un comentario debes estar <a href="login.html">logueado</a> '+'</p>';
				    	}	
				});
			})
}

function ingredientes_receta(url){
			
			fetch(url).then(function(response){
				if(!response.ok){
					console.log('Error(' + response.status + '): ' + response.statusText);
					return;
				}
				response.json().then(function(data){
					var element;
					element = document.getElementById("ingredientes");
					if (element) {
						for( let i = 0 ; i < data.FILAS.length; i++){
						var ingredientes = data.FILAS[i];
				    	element.innerHTML =element.innerHTML+'<p>'+ ingredientes.nombre+'</p>';

				    	}			    	
					}
				});
			})
}

function comen_receta(url){
			
			fetch(url).then(function(response){
				if(!response.ok){
					console.log('Error(' + response.status + '): ' + response.statusText);
					return;
				}
				response.json().then(function(data){
					var element;
					element = document.getElementById("seccion-comentarios");
					if (element) {
						for( let i = 0 ; i < data.FILAS.length; i++){
						var comentarios = data.FILAS[i];
				    	element.innerHTML =element.innerHTML+'<div class="comentarios">' +
				    	'<p>'+ comentarios.titulo + '</p>'+ 
				    	'<p>'+comentarios.autor+'</p>'+
				    	'<p>'+comentarios.fecha+'</p>'+
				    	'<p>'+comentarios.texto+'</p>';
				    	}		    	
					}
				});
			})
}



//FUNCIONES NUEVA RECETA
function red_nuevareceta(){
	if(!logueado()){
		location.href="index.html";
	}
}
//FIN FUNCIONES NUEVA RECETA

//FUNCIONES DEL MENU

function dibujar_menu(){
	var element;
	element = document.getElementById("menu-principal");
	
	if(element){
		if(logueado()){
			element.innerHTML = 
			'<a href="index.html">Inicio <i class="fas fa-home"></i></a> ' +
			'<a href="buscar.html">Buscar <i class="fas fa-search"></i></a> ' +
			'<a href="nueva-receta.html" id="n_rec">Nueva receta <i class="fas fa-plus-circle"></i></a> ' +
			'<a href="index.html" id="logout" onclick="desconectar();">Logout <i class="fas fa-sign-out-alt"></i></a> ';
		}
		else{
			element.innerHTML = 
			'<a href="index.html">Inicio <i class="fas fa-home"></i></a> ' +
			'<a href="buscar.html">Buscar <i class="fas fa-search"></i></a> ' +
			'<a href="registro.html" id="registro">Registro <i class="fas fa-user-plus"></i></a> ' +
			'<a href="login.html" id="login" >Login <i class="fas fa-sign-in-alt"></i></a> ' ;
		}
	}

}

//FIN FUNCIONES DEL MENU
//FUNCIONES DE LOGIN

function check_login(){
	let url = 'http://localhost/PCW/practica02/rest/login/',
	fd = new FormData(),
	init = {method:'post', 'body':fd};
	
	let usuario = document.getElementById("usuario").value;
	let contrasenya = document.getElementById("pass").value;
	
	console.log(usuario);
	console.log(contrasenya);

	fd.append('login', usuario );
	fd.append('pwd', contrasenya);


	fetch(url,init).then(function(response){
		if(!response.ok){
			console.log('Usuario o contrasenya incorrecto');
			location.href ="login.html?inco=ok";
			return;
		}
		response.json().then(function(data){
			console.log("todo oki");
			if(window.sessionStorage){
				console.log(data);
				sessionStorage.setItem('usuario', JSON.stringify(data));
			}
			
			location.href="index.html";
		});
	})/*.cath(function(err){
	console.log('Fetch Error: ', err);
	})*/;
	return false;
}

function logueado(){
	if(window.sessionStorage){
		if(sessionStorage.getItem('usuario')){
			let dato =  sessionStorage.getItem('usuario') ;
			let data = JSON.parse(dato);
			console.log(data.login + " logueado");
			console.log(data);
			return true;
		}
		else{
			console.log("nadie logueado");
			return false;
		}
	}
}

function mensaje_incorrecto(){
	if(getParameterByName('inco')){
		var element;
		element = document.getElementById("login-errorjs");
		if (element) {
			element.innerHTML = 
			'<div id="login-error">' +
			'<p>Usuario o contraseña incorrecto</p>' +
			'<p><button onclick="cerrar_aviso();"><i class="far fa-times-circle"></i></button></p>'+
			'</div>';
		}
	}
	
}
function cerrar_aviso(){
	var element;
		element = document.getElementById("login-errorjs");
		if (element) {
			element.innerHTML = '';
		}
}

function red_login_registro(){
	if(logueado()){
		location.href="index.html";
	}
}

//FIN DE FUNCIONES DE LOGIN

//LOGOUT

function desconectar(){
	if(window.sessionStorage){
		sessionStorage.clear();
	}
}


//FUNCIONES DE REGISTRO
function check_pwd(){
	var element = document.getElementById("check_pwdjs");
	if(document.getElementById("pass").value == document.getElementById("pass2").value){
		element.innerHTML = "";
	}
	else{
		element.innerHTML = 
		'<div class="usuario-nodisponible">' +
		'<i class="fas fa-times-circle"></i>' +
		'<p>Las contraseñas no coinciden</p>' +
		'</div>';
	}
}

function usuario_disponible(){
	let url = 'http://localhost/PCW/practica02/rest/login/' + document.getElementById("usuario").value;

	fetch(url).then(function(response){
		if(!response.ok){
			console.log('Error(' + response.status + '): ' + response.statusText);
			return;
		}
		response.json().then(function(data){
			var element = document.getElementById("usuario-disponiblejs");
			console.log(data);
			console.log(data.FILAS);
			if(data.DISPONIBLE){
				console.log("disponible");
				element.innerHTML = 
				'<div class="box_emergente">' +
				'<p><i class="fas fa-check"></i></p>' +
				'<p>Nombre de usuario disponible</p>' +
				'</div>';
			}
			else{
				console.log("NO disponible");
				element.innerHTML = 
				'<div class="usuario-nodisponible">' +
				'<i class="fas fa-times-circle"></i>' +
				'<p>Nombre de usuario ya registrado en la base de datos</p>' +
				'</div>';
			}	
		});
	})/*.cath(function(err){
	console.log('Fetch Error: ', err);
	})*/;
}

function registro(){
	let url = 'http://localhost/PCW/practica02/rest/usuario/',
	fd = new FormData(),
	init = {method:'post', 'body':fd};
	
	fd.append('login', document.getElementById("usuario").value );
	fd.append('pwd', document.getElementById("pass").value);
	fd.append('pwd2', document.getElementById("pass2").value);
	fd.append('nombre', document.getElementById("name").value);
	fd.append('email', document.getElementById("email").value);
	fd.append('fnac', document.getElementById("fecha_nac").value);

	fetch(url,init).then(function(response){
		if(!response.ok){
			location.href ="registro.html#check_pwdjs";
			console.log("no regista");
			return;
		}
		response.json().then(function(data){
			location.href ="registro.html?reg=ok";
			console.log("todo oki");
		});

	})/*.cath(function(err){
	console.log('Fetch Error: ', err);
	})*/;
	return false;
}

function registro_ok(){
	if(getParameterByName('reg')){
		var element;
		element = document.getElementById("registro-ok");
		if (element) {
			element.innerHTML = 
			'<div class="box_emergente">' +
			'<p>Usuario registrado correctamente, pulse para continuar</p>' +
			' <button onclick="redireccionar_registro_ok();"><i class="fas fa-arrow-right"></i></button> '+
			'</br>'
			'</div>';
		}
	}
}

function redireccionar_registro_ok(){
	var element;
	element = document.getElementById("login-errorjs");
	if (element) {
		element.innerHTML = '';
	}
	location.href ="login.html";
}
//FIN FUNCIONES REGISTRO
	
//FUNCIONES EXTERNAS 


function getParameterByName(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function anyadir_ingr(){
	let ingrediente=document.getElementById("ingrediente").value;
	let lista = document.getElementById("l_ingr");
	let li=document.createElement("li");
	let span = document.createElement("span");
	let textnode=document.createTextNode(ingrediente);

	span.appendChild(textnode);

	li.appendChild(span);

	lista.appendChild(li);
}

function url_receta(){
	let id=getParameterByName('id');
	console.log(id);
	if(id===""){
		location.href="index.html";
	}
}

