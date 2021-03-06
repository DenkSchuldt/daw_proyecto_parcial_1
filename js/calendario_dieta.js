
    var lis = document.querySelectorAll('#main_nav li');
	var carbohidratos = 0;
	var target_proteinas_rec = 0;
	var target_grasas_rec = 0;
	var target_carbo_rec = 0;
	var target_proteinas_pref = 0;
	var target_grasas_pref = 0;
	var target_carbo_pref = 0;
	var proteinas_totales = 0;
	var grasas_totales = 0;
	var carbo_totales = 0;
	var lugar_anterior;
	var target_estado;
	var target_id;
	var recetasDisponibles;

    /*
	 * Description:
	 * Initial function.
	 */
	function calendarioStart(){
	    lis[4].setAttribute('class', 'option');
	    document.querySelector("#background").addEventListener('click', function () {
	        $("#show").fadeOut("fast");
	        recetasDisponibles.innerHTML = "";
	    });
		for(var i=0; i<lis.length; i++){
			if(i == 0){
				lis[i].addEventListener('click',function(){
					location.href = "../index.html";
				},true);		
			}
			if(i == 1){
				lis[i].addEventListener('click',function(){
					location.href = "./que_comer.html";
				},true);		
			}
			if(i == 2){
				lis[i].addEventListener('click',function(){
					location.href = "./que_beber.html";
				},true);		
			}
			if(i == 3){
				lis[i].addEventListener('click',function(){
					location.href = "./recetas.html";
				},true);		
			}			
			if(i == 5){
				lis[i].addEventListener('click',function(){
					location.href = "./registro.html";
				},true);		
			}
		}
		crear_dias();
	}
	
	function crear_dias(){
	    cargarRecetasPreferidas();
	    var dias = document.getElementById('etiquetas_dias');
		var dia1 = document.createElement('th');
		var dia2 = document.createElement('th');
		var dia3 = document.createElement('th');
		var dia4 = document.createElement('th');
		var dia5 = document.createElement('th');
		var dia6 = document.createElement('th');			
		var dia7 = document.createElement('th');
		var texto1 = document.createTextNode("DOMINGO");
		var texto2 = document.createTextNode("LUNES");
		var texto3 = document.createTextNode("MARTES");
		var texto4 = document.createTextNode("MIERCOLES");
		var texto5 = document.createTextNode("JUEVES");
		var texto6 = document.createTextNode("VIERNES");
		var texto7 = document.createTextNode("SABADO");
		dia1.appendChild(texto1);
		dia2.appendChild(texto2);
		dia3.appendChild(texto3);
		dia4.appendChild(texto4);
		dia5.appendChild(texto5);
		dia6.appendChild(texto6);
		dia7.appendChild(texto7);
		dias.appendChild(dia1);
		dias.appendChild(dia2);
		dias.appendChild(dia3);
		dias.appendChild(dia4);
		dias.appendChild(dia5);
		dias.appendChild(dia6);
		dias.appendChild(dia7);
		dia_seleccionado = 0;
		dia1.addEventListener('click',function(){
            dia_seleccionado = 1;
            mostrardiv();
		}, false);
		dia2.addEventListener('click',function(){
		    dia_seleccionado = 2;
		    mostrardiv();
		}, false);
		dia3.addEventListener('click',function(){
            dia_seleccionado = 3;
            mostrardiv();
		}, false);
		dia4.addEventListener('click',function(){
			dia_seleccionado = 4;
			mostrardiv();
		}, false);
		dia5.addEventListener('click',function(){
			dia_seleccionado = 5;
			mostrardiv();
		}, false);
		dia6.addEventListener('click',function(){
			dia_seleccionado = 6;
			mostrardiv();
		}, false);
		dia7.addEventListener('click',function(){
			dia_seleccionado = 7;
			mostrardiv();
		}, false);
    }

    function mostrardiv(){
        recetasDisponibles = document.querySelector("#recetasDisponiblesBody");
	    cargarRecetas();
	    $("#show").fadeIn("fast");
    }

	function cargarRecetas(){
		var url = "../xml/recetas.xml";
		var request = new XMLHttpRequest();
		request.addEventListener('load', procesarRecetas, false);
		request.open("GET",url,true);
		request.send(null);
	}

	function procesarRecetas(e) {
	    var xml = e.target.responseXML;
	    var recetas = xml.querySelectorAll('receta');
	    for(i=0; i<recetas.length; i++){
		    var titulo        = recetas[i].querySelector('titulo').childNodes[0].nodeValue;
		    var id            = recetas[i].querySelector('id').childNodes[0].nodeValue;
		    var imagen        = recetas[i].querySelector('imagen').childNodes[0].nodeValue;
		    var proteinas     = recetas[i].querySelector('proteinas').childNodes[0].nodeValue;
		    var carbohidratos = recetas[i].querySelector('carbohidratos').childNodes[0].nodeValue;
		    var grasas        = recetas[i].querySelector('grasas').childNodes[0].nodeValue;
		    var article = document.createElement('article');
		    var h2 = document.createElement('h2');			
		    var texto = document.createTextNode(titulo);
		    h2.appendChild(texto);
		    var imgfig = document.createElement('img');
		    imgfig.src = imagen;
		    imgfig.setAttribute('draggable','true');
		    imgfig.addEventListener('dragstart',drag,true);		    
	        
	        h2.id = "h2"+i;
	        article.appendChild(imgfig);

    		article.setAttribute('class','receta_calendar');
	    	article.addEventListener('click',function(){
				this.setAttribute('style',"border: 1px solid rgb(140,200,0);");
			},false);
				    
		    article.setAttribute('draggable','true');
		    article.addEventListener('dragstart',drag,true);
		    article.appendChild(h2);

		    var ingredientes = document.createElement('input');
		    ingredientes.setAttribute('type', 'button');
		    ingredientes.value = "Ingredientes";
		    ingredientes.addEventListener('click', function () {
		        
		    });
		    article.appendChild(ingredientes);


		    recetasDisponibles.appendChild(article);
		
		    imgfig.setAttribute('parrafo1',proteinas);
		    imgfig.setAttribute('parrafo2',grasas);
		    imgfig.setAttribute('parrafo3',carbohidratos);
		    imgfig.setAttribute('estado','I');
		}
		
		/*var boton_aceptar = document.createElement('input');
		boton_aceptar.setAttribute('type','button');
		boton_aceptar.setAttribute('value','Agregar Recetas');		
		boton_aceptar.addEventListener('click', agregar_Recetas,false);
		recetasDisponibles.appendChild(boton_aceptar);*/
	}
						
	function agregar_Recetas() {
	    $("#show").fadeOut("fast");
        recetasDisponibles.setAttribute("class", "esconder_div");
	    recetas_div = document.getElementsByClassName('cambia_fondo_articulo');
	    for (i=0; i<recetas_div.length;i++){	
	        if(recetas_div[i].getAttribute('id')=='nolisto'){
			    if (dia_seleccionado == 1){
					div_calendar = document.getElementById("domingo");
					div_calendar.appendChild(recetas_div[i]);
				}
				if (dia_seleccionado == 2){
					div_calendar = document.getElementById("lunes");
					div_calendar.appendChild(recetas_div[i]);
				}
				if (dia_seleccionado == 3){
					div_calendar = document.getElementById("martes");
					div_calendar.appendChild(recetas_div[i]);
				}
				if (dia_seleccionado == 4){
					div_calendar = document.getElementById("miercoles");
					div_calendar.appendChild(recetas_div[i]);
				}
				if (dia_seleccionado == 5){
					div_calendar = document.getElementById("jueves");
					div_calendar.appendChild(recetas_div[i]);
				}
				if (dia_seleccionado == 6){
					div_calendar = document.getElementById("viernes");
					div_calendar.appendChild(recetas_div[i]);
				}
				if (dia_seleccionado == 7){
					div_calendar = document.getElementById("sabado");
					div_calendar.appendChild(recetas_div[i]);
				}	
			}

			recetas_div[i].setAttribute('id','listo');
			recetas_div[i].setAttribute('draggable','true');
			
			target_proteinas_rec = recetas_div[i].childNodes[0].childNodes[0].getAttribute('parrafo1');
			target_carbo_rec = recetas_div[i].childNodes[0].childNodes[0].getAttribute('parrafo2');
			target_grasas_rec = recetas_div[i].childNodes[0].childNodes[0].getAttribute('parrafo3');
			target_estado = recetas_div[i].childNodes[0].childNodes[0].getAttribute('estado');

			if (target_estado=='I'){ sumar_recetas(); }
			recetas_div[i].childNodes[0].childNodes[0].setAttribute('estado','A');
		}
    }		

    function cargarRecetasPreferidas(){
		var url_p =  "../xml/recetas_preferidas.xml";
		var request = new XMLHttpRequest();
		request.addEventListener('load',procesarRecetasPreferidas,false);
		request.open("GET",url_p,true);
		request.send(null);
    }

    function procesarRecetasPreferidas(e){
	    var sectionPreferidas = document.getElementById('div_preferidas');
	    var xml = e.target.responseXML;
	    var recetas= xml.querySelectorAll('receta');
	
	    for(i=0;i<recetas.length;i++){
		    var titulo        = recetas[i].querySelector('titulo').childNodes[0].nodeValue;
		    var id            = recetas[i].querySelector('id').childNodes[0].nodeValue;
		    var imagen        = recetas[i].querySelector('imagen').childNodes[0].nodeValue;
		    var proteinas     = recetas[i].querySelector('proteinas').childNodes[0].nodeValue;
		    var carbohidratos = recetas[i].querySelector('carbohidratos').childNodes[0].nodeValue;
		    var grasas        = recetas[i].querySelector('grasas').childNodes[0].nodeValue;		
		
		    var article = document.createElement('div');
		    var h2 = document.createElement('h1');	
		    var texto = document.createTextNode(titulo);
		    var span = document.createElement('span');
		    var span_text = document.createTextNode(titulo);
		
		    span.appendChild(span_text);
		    span.setAttribute('class','tooltip');
		    span.addEventListener('dragstart',drag,true);
		    h2.appendChild(texto);
		    h2.addEventListener('dragstart',drag,true);
		    img=imagen;
		    var imgfig= document.createElement('img');
		    imgfig.src=img;
		    imgfig.width="120";
		    imgfig.height="120";
		    imgfig.id="drag_img"+id;
		    imgfig.addEventListener('dragstart',drag,true);
		    imgfig.setAttribute('parrafo1',proteinas);
		    imgfig.setAttribute('parrafo2',grasas);
		    imgfig.setAttribute('parrafo3',carbohidratos);
		    imgfig.setAttribute('estado','I');
    		
	    	h2.setAttribute('class','titulo');
    		h2.id="drag_h2"+id;
		
	    	article.appendChild(span);
	    	article.appendChild(imgfig);
		    article.setAttribute('class','receta_calendar');
			article.setAttribute('style',"cursor:move;");
		    article.setAttribute("id","drag"+id);
		    article.setAttribute('draggable','true');
		    article.addEventListener('dragstart',drag,true);
		    article.setAttribute('class','over');
		    sectionPreferidas.appendChild(article);
		}
    }
		
    function allowDrop(ev) {
	    ev.preventDefault();
	    var data = ev.dataTransfer.getData("Text");
    }

    function drag(ev) {
	    ev.dataTransfer.setData("Text",ev.target.id);
	    ev.dataTransfer.effectAllowed = 'move';
	    target_proteinas_pref = ev.target.getAttribute('parrafo1');
	    target_grasas_pref = ev.target.getAttribute('parrafo2');
	    target_carbo_pref = ev.target.getAttribute('parrafo3');
	    target_estado = ev.target.getAttribute('estado');
	    target_id = ev.target.getAttribute('id');		
    }

    function drop(ev){
	    ev.preventDefault();
	    var data=ev.dataTransfer.getData("Text");
	    ev.target.appendChild(document.getElementById(data));		
	    if (target_estado=='I') sumar_preferidas();	
	    lugar_anterior=ev.target.getAttribute('id');
	    document.getElementById(target_id).setAttribute('estado','A');
    }

    function sumar_preferidas(){
	    n_proteinas = parseInt(target_proteinas_pref);
	    proteinas_totales = proteinas_totales + n_proteinas;
	    document.querySelector('#div_proteinas').innerHTML ="PROTEINAS: " + proteinas_totales;
	    n_grasas = parseInt(target_grasas_pref);
	    grasas_totales = grasas_totales + n_grasas;
	    document.querySelector('#div_grasas').innerHTML ="GRASAS: " + grasas_totales;
	    n_carbo = parseInt(target_carbo_pref);
	    carbo_totales = carbo_totales + n_carbo;
	    document.querySelector('#div_carbo').innerHTML ="CARBOHIDRATOS: " + proteinas_totales;
    }

    function sumar_recetas(){
	    n_proteinas = parseInt(target_proteinas_rec);
	    proteinas_totales = proteinas_totales + n_proteinas;
	    document.querySelector('#div_proteinas').innerHTML ="PROTEINAS: " + proteinas_totales;
	    n_grasas = parseInt(target_grasas_rec);
	    grasas_totales = grasas_totales + n_grasas;
	    document.querySelector('#div_grasas').innerHTML ="GRASAS: " + grasas_totales;
	    n_carbo = parseInt(target_carbo_rec);
	    carbo_totales = carbo_totales + n_carbo;
	    document.querySelector('#div_carbo').innerHTML ="CARBOHIDRATOS: " + proteinas_totales;	
    }

	window.onload = calendarioStart();