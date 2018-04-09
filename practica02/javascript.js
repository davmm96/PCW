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

function seleccionar_busqueda(){
	if( getParameterByName('autor') ){
		busqueda_autor();
	}
	else{
		busqueda_rapida_recetas();
	}
}
function seisUltimas(){
	var url ='http://localhost/PCW/practica02/rest/receta/?u=6';
	mostar_recetas(url);
}

function busqueda_autor(){
	var parametros = getParameterByName('autor');
	var url ='http://localhost/PCW/practica02/rest/receta/?a=' + parametros;
	mostar_recetas(url);
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