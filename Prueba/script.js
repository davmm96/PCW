function mostrar_modal(){
	let c_seccion = document.querySelector('#mensajemodal');
	let mensajeModal = document.querySelector('.contenidomodal');
	mensajeModal.innerHTML = "<p>TU PUTA MADRE</p>" +
	'<input type="submit" value="cerarr" onclick="cerrar_modal();">'

	c_seccion.style.display = "block";
}

function cerrar_modal(){
	let c_seccion = document.querySelector('#mensajemodal');
	let mensajeModal = document.querySelector('.contenidomodal');
	mensajeModal.innerHTML = '';
	c_seccion.style.display = "none";
}