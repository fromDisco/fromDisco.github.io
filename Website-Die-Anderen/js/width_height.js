window.addEventListener('DOMContentLoaded', function () {
	'use strict';

		window.onload = window.onresize = function(size){
			var width = window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);
			var height = window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight);	
			var vwidth = document.createElement('div');
			vwidth.innerHTML = '<p><span>Höhe: '+height+'px</span><br><span style="background:#fff;">Breite: '+width+'px</span></p>';
			vwidth.style.backgroundColor = "#FFFF00";
			vwidth.style.position = "fixed";
			vwidth.style.top= "1em";
			vwidth.style.left = "1em";
			vwidth.style.padding = "0.2em";
			vwidth.style.textAlign = "center";
			vwidth.style.fontWeight = "600";
			vwidth.style.fontSize = "2em";
			vwidth.style.opacity = "0.9";
			document.body.appendChild(vwidth);
		}
}, false);

