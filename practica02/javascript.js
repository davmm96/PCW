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

	var element = document.getElementById("paginacion");
	var npag = parseInt(pag) + 1;
	var npag_anterior = pag -1;
	if (npag_anterior < 0) { npag_anterior = 0};
	element.innerHTML = 
	'<div class="centrado" id="paginacion">'  +
	'<div class="pasa_paginas">'  +
	'<a href="index.html">1</a>'  +
	'<a href="index.html?pag='+ npag_anterior +'"><i class="fas fa-caret-left"></i></a>'  +
	'<a href=""> '+ npag +' </a>'  +
	'<a href="index.html?pag='+ npag +'"><i class="fas fa-caret-right"></i></a>'  +
	'<a href="">Fin</a>'  +
	'</div>'  +
	'</div>';
	console.log(element);
}

function busqueda_avanzada(){
	if( getParameterByName('buscar') ){
		busqueda_rapida_recetas();
	}
	else{
		var parametro;
		var url = 'http://localhost/PCW/practica02/rest/receta/';
		//rest/receta/?pag={pagina}&lpag={registros_por_pagina}

		url = url + "?n=" + getParameterByName('name');
		url = url + "&i=" + getParameterByName('ingredientes');
		url = url + "&di=" + getParameterByName('tiempo_ini');
		url = url + "&df=" + getParameterByName('tiempo_fin');
		url = url + "&d=" + getParameterByName('dificultad');
		url = url + "&c=" + getParameterByName('comensales');
		url = url + "&a=" + getParameterByName('autor');

		if(url == "http://localhost/PCW/practica02/rest/receta/?n=&i=&di=&df=&d=&c=&a="){
			seisUltimas();
		}
		else{
			mostar_recetas(url);	
		}
	}
}

function busqueda_rapida_recetas(){
	var parametros = getParameterByName('buscar');
	var datos = parametros.split(",");
	var url_par = datos[0];

	for (let n = 1 ; n < datos.length; n++) {
		url_par = url_par + ',' + datos[n];
	}

	var url ='http://localhost/PCW/practica02/rest/receta/?t=' + url_par;
	mostar_recetas(url);
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