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