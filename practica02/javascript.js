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

function peticionFetchAPI_POST( form_HTML, clave ) {
	var url = 'rest/login/',
		fd = new FormData(form_HTML), // se utiliza un objeto FormData()
		init = { method:'post', body:fd, headers:{'Authorization':clave} };
	fetch(url,init).then(function(response){
		if(!response.ok){
			console.log('Error con código: ' + response.status);
			return;
		}
		response.json().then(function(data) { // se tiene la respuesta
			console.log('Nombre:' + data.nombre); // data es un objeto JSON
		});
	}).catch(function(err) {
		console.log('Fetch Error: ', err);
	});
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
						console.log(data);
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


function getParameterByName(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function comprobar(){
	if(window.localStorage){
		var form=document.querySelectorAll("form")[0];

		if(form.check.checked){
			localStorage.setItem("login",form.login.value);

		}
	}
}

function rellenar(){
	if(window.localStorage){
		var form=document.querySelectorAll("form")[0];

		if(localStorage.getItem("login")){
			form.login.value=localStorage.getItem("login");
			
		}
	}
}

function cabecera(){

	if(window.localStorage){
		if(!localStorage.getItem("login")){
			document.getElementById("n_rec").style.display='none';
			document.getElementById("logout").style.display='none';
		}
		else{
			document.getElementById("n_rec").style.display='relative';
			document.getElementById("logout").style.display='relative';
		}

	}

}
