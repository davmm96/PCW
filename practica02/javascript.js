num_fotos=0;

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
	});
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
	'<a href="">'+ pag_mostrar + '</a>'  +
	'/ ' + n_paginas  + 
	' <a href="'+ web +'pag='+ pag_s +'"><i class="fas fa-caret-right"></i></a>'  +
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
	});			
}

//FIN FUNCIONES INDEX Y BUSCAR


//FUNCIONES RECETA
function url_receta(){//Redirecciona si la url no tiene el id
	let id=getParameterByName('id');
	console.log(id);
	if(id===""){
		location.href="index.html";
	}
}
function id_receta(){//Obtiene el id de la receta y hace los 3 fetch (ingredientes,fotos,comentarios)
	var parametros = getParameterByName('id');
	var url ='http://localhost/PCW/practica02/rest/receta/' + parametros;

	//Informacion general
	info_receta(url);
	//Fotos
	url2=url+'/fotos';
	foto_receta(url2);
	//Ingredientes
	url3=url+'/ingredientes';
	ingredientes_receta(url3);
	//Comentarios
	url4=url+'/comentarios';
	comen_receta(url4);
}

function info_receta(url){//Fetch de la info y muestra el form de comentario (log) desde fichero
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
		    	'<p><a href="#seccion-comentarios">'+receta.comentarios +' Comentarios</a></p>';		    	
			}
			element2=document.getElementById("form_coment");
			if(!logueado()){
		    	element2.innerHTML ='<p>'+'Para dejar un comentario debes estar <a href="login.html">logueado</a> '+'</p>';
		    }
		    else{
		    	var xhttp = new XMLHttpRequest();
		    	xhttp.open("GET", "comentario.html", true);
				xhttp.onreadystatechange = function() {
				    if (this.readyState == 4 && this.status == 200) {
				       document.getElementById("form_coment").innerHTML = xhttp.responseText;
				    }
				};
				xhttp.send(null);
		    }	
		});
	})
}

function foto_receta(url){//Fetch de fotos		
	fetch(url).then(function(response){
		if(!response.ok){
			console.log('Error(' + response.status + '): ' + response.statusText);
			return;
		}
		response.json().then(function(data){
			var fotos=data.FILAS[0];
			localStorage.setItem("fotos",JSON.stringify(data));
			mostrar_foto(0);	    	  	
		});
	})
}

function mostrar_foto(a){//Funcion recursiva para mostrar la foto siguiente o anterior
	let dato=localStorage.getItem("fotos") ;
	let data=JSON.parse(dato);

	if(a>=0&&a<data.FILAS.length){
		var fotos=data.FILAS[a];
		var a1=a-1;
		var a2=a+1;
		var element=document.getElementById("img_receta");

		element.innerHTML='<img src="fotos/' + fotos.fichero + '" alt="'+ fotos.texto+'">'+			    	
					    	'<p> <a onclick="mostrar_foto('+a1+')";><i class="fas fa-caret-left"></i></a>'+fotos.texto+
					    	'<a  onclick="mostrar_foto('+a2+')";><i class="fas fa-caret-right"></i></a>'+
					    	'</p>';	
		if(logueado()){
	    	element.innerHTML=element.innerHTML +'<div class="like">'+
	    	'<a onclick=voto(1);><i class="far fa-thumbs-up"></i></a>'+
	    	'<a onclick=voto(0);><i id="dislike" class="far fa-thumbs-down"></i></a>'+
	    	'</div>';
		}	
	}
}

function voto(tipo){//Fetch de voto
	var parametros=getParameterByName('id');
	var data=JSON.parse(sessionStorage.getItem('usuario'));
	var clave=data.clave;
	var usuario=data.login;

	var url='http://localhost/PCW/practica02/rest/receta/'+parametros+'/voto/'+tipo;
	var fd=new FormData();
	var init={method:'post','body':fd,headers:{'Authorization':clave}};
	
	fd.append('l',usuario);

	fetch(url,init).then(function(response){
		if(!response.ok){
			console.log("error voto");
			return;
		}
		response.json().then(function(data){
			var element;
			element=document.getElementById("voto-ok");
			if(element){
				element.innerHTML= 
				'<div class="box_emergente">'+
				'<p>Voto registrado correctamente, pulse para continuar</p>'+
				'<p><button onclick="cerrar(1);"><i class="far fa-times-circle"></i></button></p>'+
				'</br>'
				'</div>';
			}
			console.log("voto ok");
		});
	});
	return false;
}

function ingredientes_receta(url){//Fetch ingredientes			
	fetch(url).then(function(response){
		if(!response.ok){
			console.log('Error('+response.status+'): '+response.statusText);
			return;
		}
		response.json().then(function(data){
			var element;
			element=document.getElementById("ingredientes");
			if(element){
				for(let i=0; i<data.FILAS.length; i++){
				var ingredientes=data.FILAS[i];
		    	element.innerHTML=element.innerHTML+'<p>'+ingredientes.nombre+'</p>';
		    	}			    	
			}
		});
	})
}

function comen_receta(url){//Fetch de comentario	
	fetch(url).then(function(response){
		if(!response.ok){
			console.log('Error('+response.status+'): '+response.statusText);
			return;
		}
		response.json().then(function(data){
			var element;
			element=document.getElementById("seccion-comentarios");
			if(element){
				for(let i=0; i<data.FILAS.length; i++){
				var comentarios=data.FILAS[i];
		    	element.innerHTML=element.innerHTML+'<div class="comentarios">'+
		    	'<p>'+comentarios.titulo+'</p>'+ 
		    	'<p>'+comentarios.autor+'</p>'+
		    	'<p>'+comentarios.fecha+'</p>'+
		    	'<p>'+comentarios.texto+'</p>';
		    	}		    	
			}
		});
	})
}

function comentario(){//Post de comentario
	var parametros=getParameterByName('id');
	var data=JSON.parse(sessionStorage.getItem('usuario'));
	console.log(data);
	var clave=data.clave;
	var usuario=data.login;

	var url='http://localhost/PCW/practica02/rest/receta/'+parametros+'/comentario';
	var fd=new FormData();
	var init={method:'post','body':fd,headers:{'Authorization':clave}};
	
	fd.append('l',usuario);
	fd.append('titulo',document.getElementById("titulo-comentario").value);
	fd.append('texto',document.getElementById("contenido-comentario").value);

	fetch(url,init).then(function(response){
		if(!response.ok){
			console.log("error comentario");
			document.getElementById("titulo-comentario").focus();
			return;
		}
		response.json().then(function(data){
			var element;
			element=document.getElementById("comentario-ok");
			if(element){
				element.innerHTML= 
				'<div class="box_emergente">'+
				'<p>Comentario registrado correctamente, pulse para continuar</p>'+
				'<p><button onclick="cerrar(2);"><i class="far fa-times-circle"></i></button></p>'+
				'</br>'
				'</div>';

				document.getElementById("titulo-comentario").value="";
				document.getElementById("contenido-comentario").value="";
				document.getElementById("titulo-comentario").focus();
			}
			console.log("comentario oki");
		});
	});
	return false;
}

function cerrar(tipo){//Cerrar mensaje emergente
	var element;

	if(tipo===1)
		element=document.getElementById("voto-ok");
	else if(tipo===2)
		element=document.getElementById("comentario-ok");
	else if(tipo===3)
		element=document.getElementById("error_foto");
	else if(tipo===4)
		element=document.getElementById("error_no_foto");
	else if(tipo===5)
		element=document.getElementById("error_receta");
		

	if (element)
		element.innerHTML='';
}
//FIN FUNCIONES RECETA

//FUNCIONES NUEVA RECETA
function red_nuevareceta(){//Redirecciona si no logeado
	if(!logueado())
		location.href="index.html";
}

function anyadir_ingr(){//Anyade un ingrediente a la lista
	let ingrediente=document.getElementById("ingrediente").value;
	let lista=document.getElementById("l_ingr");
	let li=document.createElement("li");
	let textnode=document.createTextNode(ingrediente);

	li.appendChild(textnode);
	lista.appendChild(li);
	document.getElementById("ingrediente").value="";
}

function form_foto_receta(){//Carga el formulario al pulsar subir foto
	var xhttp=new XMLHttpRequest();
    xhttp.open("GET","form_foto.html", true);
	xhttp.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
	      document.getElementById("form_foto").innerHTML+=xhttp.responseText;

	     document.getElementById("input_foto").setAttribute('id',num_fotos);
	     document.getElementById("label_id").setAttribute('for',num_fotos);
	     document.getElementById("label_id").setAttribute('id','label'+num_fotos);
	     document.getElementById("des_foto").setAttribute('id','des'+num_fotos);
	     document.getElementById("desc_foto").setAttribute('id','desc'+num_fotos);



	       num_fotos++;
	        
	    }
	};
	xhttp.send(null);
}

function eliminar_form_foto(span){//Elimina el formulario de la foto

	let element=span.parentNode.previousElementSibling.previousElementSibling;

	element=element.previousElementSibling.previousElementSibling.parentNode;

	element.innerHTML="";

	num_fotos--;
}

function n_receta(){//Post de receta


	if(num_fotos>0){
		var data=JSON.parse(sessionStorage.getItem('usuario'));
		var clave=data.clave;
		var usuario=data.login;

		var url='http://localhost/PCW/practica02/rest/receta/';
		var fd=new FormData();
		fd.append('l',usuario);
		fd.append('n',document.getElementById("receta1").value);
		fd.append('e',document.getElementById("elaboracion1").value);
		fd.append('t',document.getElementById("tiempo1").value);
		fd.append('d',document.getElementById("dificultad1").value);
		fd.append('c',document.getElementById("comensales1").value);

		var init={method:'post','body':fd,'headers':{'Authorization':clave}};
		

		fetch(url,init).then(function(response){
			if(!response.ok){
				console.log("error receta");


				let error;
				error = document.getElementById("error_receta");
				if (error) {
					error.innerHTML = 
					'<div id="error_receta">' +
					'<p>Ha ocurrido un error</p>' +
					'<p><button onclick="cerrar(5);"><i class="far fa-times-circle"></i></button></p>'+
					'</div>';
		}

			}
			response.json().then(function(data){
				let id=data.ID;
				n_ingr(id);
			});
		});
	}
	else{

		let error;
		error = document.getElementById("error_no_foto");
		if (error) {
			error.innerHTML = 
			'<div id="error_no_foto">' +
			'<p>Debes incluir una foto al menos</p>' +
			'<p><button onclick="cerrar(4);"><i class="far fa-times-circle"></i></button></p>'+
			'</div>';
		}

	}
	return false;

}

function n_ingr(id){//POST INGREDIENTES

	var data=JSON.parse(sessionStorage.getItem('usuario'));
	var clave=data.clave;
	var usuario=data.login;

	var url='http://localhost/PCW/practica02/rest/receta/'+id+'/ingredientes';
	var fd=new FormData();
	fd.append('l',usuario);

	let t_ingr=document.getElementsByTagName("li");

	let j_ingr=[];

	for(let i=0; i<t_ingr.length; i++){
		j_ingr.push(t_ingr.item(i).innerText);
	}

	j_ingr=JSON.stringify(j_ingr);

	fd.append('i',j_ingr);

	var init={method:'post','body':fd,'headers':{'Authorization':clave}};
	

	fetch(url,init).then(function(response){
		if(!response.ok){
			console.log("error ingredientes");
		}
		response.json().then(function(data){
			n_fotos(id);
		});
	});
	return false;

}

function n_fotos(id){//Post foto

	var data=JSON.parse(sessionStorage.getItem('usuario'));
	var clave=data.clave;
	var usuario=data.login;

	var url='http://localhost/PCW/practica02/rest/receta/'+id+'/foto';


	for (var i = 0; i < num_fotos; i++){


		let descripcion=document.getElementById("desc"+i).value;

		let src=document.getElementById(i).files[0];




		var fd=new FormData();
		fd.append('l',usuario);
		fd.append('t',descripcion);
		fd.append('f',src);

		var init={method:'post','body':fd,'headers':{'Authorization':clave}};

		fetch(url,init).then(function(response){
			if(!response.ok){
				console.log("error fotos");
			}
			response.json().then(function(data){

				console.log("ok fotos");

			});
		});
	}
	
	return false;
}

function tamanyo_foto(input){

	if(input.files[0] && input.files[0].size<300000){

		let element=input.parentNode.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.firstElementChild;

		element.setAttribute('src',URL.createObjectURL(input.files[0]));

		let element2=input.parentNode.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling;

		element2.innerHTML="";

	}
	else{
		var error;
		error = document.getElementById("error_foto");
		if (error) {
			error.innerHTML = 
			'<div id="error_foto">' +
			'<p>La imagen pesa demasiado (Maximo 300Kb)</p>' +
			'<p><button onclick="cerrar(3);"><i class="far fa-times-circle"></i></button></p>'+
			'</div>';
		}
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
	});
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
	});
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

	});
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




