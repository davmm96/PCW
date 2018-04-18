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

function seisUltimas(){
	var pag = 0;
	var url = 'http://localhost/PCW/practica02/rest/get/receta.php?prm=&pag=';
	if( getParameterByName('pag') ){
		pag = getParameterByName('pag');		
	}
	url = url + pag + '&lpag=6';

	console.log(url);
	mostar_recetas(url);
	paginacion(pag);

	
}
function paginacion(pag,parametros){
	var pathname = window.location.pathname;
	var web = pathname.split("/");
	var web = web[3];
	console.log(web);
	console.log(parametros);
	if(parametros){
		web = web + parametros + '&';
		console.log(parametros);
	}
	else{
		web = web + '?';
	}
	var element = document.getElementById("paginacion");
	var npag = parseInt(pag) + 1;
	var npag_anterior = pag -1;
	if (npag_anterior < 0) { npag_anterior = 0};

	element.innerHTML = 
	'<div class="centrado" id="paginacion">'  +
	'<div class="pasa_paginas">'  +
	'<a href="'+ web +'">1</a>'  +
	'<a href="'+ web +'pag='+ npag_anterior +'"><i class="fas fa-caret-left"></i></a>'  +
	'<a href=""> '+ npag +' </a>'  +
	'<a href="'+ web +'pag='+ npag +'"><i class="fas fa-caret-right"></i></a>'  +
	'<a href="">Fin</a>'  +
	'</div>'  +
	'</div>';
}

function busqueda_avanzada(){
	if( getParameterByName('buscar') ){
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
			console.log(url);
			mostar_recetas(url);	
			console.log(parametros);
			paginacion(pag,parametros);
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
	paginacion(pag,param);
}

function id_receta(){
	var parametros = getParameterByName('id');

	var url ='http://localhost/PCW/practica02/rest/receta/' + parametros;

	console.log(url);
	detalle_receta(url);

}

function mostar_recetas(url){
			
			fetch(url).then(function(response){
				if(!response.ok){
					console.log('Error(' + response.status + '): ' + response.statusText);
					return;
				}
				response.json().then(function(data){
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


function detalle_receta(url){
			
			fetch(url).then(function(response){
				if(!response.ok){
					console.log('Error(' + response.status + '): ' + response.statusText);
					return;
				}
				response.json().then(function(data){
					var element;
					element = document.getElementById("img_receta");
					if (element) {
						var receta = data.FILAS[0];
				    	element.innerHTML ='<img src="fotos/' + receta.fichero + '" alt="'+ receta.descripcion_foto+'">'+			    	
				    	'<p> <a href=""><i class="fas fa-caret-left"></i></a>'+receta.descripcion_foto+
				    	'<a href=""><i class="fas fa-caret-right"></i></a>'+
				    	'</p>'+
				    	'<div class="like">'+
				    	'<a href=""><i class="far fa-thumbs-up"></i></a>'+
				    	'<a href=""><i id="dislike" class="far fa-thumbs-down"></i></a>'+
				    	'</div>';			    	
					}
					element = document.getElementById("info_receta");
					if (element) {
						var receta = data.FILAS[0];
				    	element.innerHTML = '<h1>'+receta.nombre+'</h1>'+
				    	'<p>Fecha: '+receta.fecha+'</p>'+
				    	'<p>Tiempo de elaboracion: '+receta.tiempo+'</p>'+
				    	'<p>Dificultad: '+receta.dificultad+'</p>'+
				    	'<p>Plato para: '+receta.comensales+' personas</p>'+
				    	'<p>'+receta.elaboracion+'</p>'+
				    	'<p>'+receta.positivos+' votos positivos</p>'+
				    	'<p>'+receta.negativos+' votos negativos</p>'+
				    	'<p><a href="buscar.html">'+receta.autor+'</a></p>'+
				    	'<p><a href="#seccion-comentarios">'+receta.comentarios +' Comentarios</a></p>'
				    	;
						    	
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
	
	/*
	let usuario = document.getElementById("usuario").value;
	let contrasenya = document.getElementById("pass").value;
	
	console.log(usuario);
	console.log(contrasenya);
	*/
	fd.append('login', "usuario2");
	fd.append('pwd', "usuario2");


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
	var parametros = getParameterByName('inco');
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