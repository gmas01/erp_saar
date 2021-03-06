$(function() {
	String.prototype.toCharCode = function(){
	    var str = this.split(''), len = str.length, work = new Array(len);
	    for (var i = 0; i < len; ++i){
			work[i] = this.charCodeAt(i);
	    }
	    return work.join(',');
	};
	
    //arreglo para select tipo de Documento
    var arrayTiposDocumento = {
				1:"Factura", 
				2:"Remision"
			};
	
	$('#header').find('#header1').find('span.emp').text($('#lienzo_recalculable').find('input[name=emp]').val());
	$('#header').find('#header1').find('span.suc').text($('#lienzo_recalculable').find('input[name=suc]').val());
    var $username = $('#header').find('#header1').find('span.username');
	$username.text($('#lienzo_recalculable').find('input[name=user]').val());
	
	var $contextpath = $('#lienzo_recalculable').find('input[name=contextpath]');
	var controller = $contextpath.val()+"/controllers/invordendev";
	
    //Barra para las acciones
    $('#barra_acciones').append($('#lienzo_recalculable').find('.table_acciones'));
    $('#barra_acciones').find('.table_acciones').css({'display':'block'});
	//var $new_salida = $('#barra_acciones').find('.table_acciones').find('a[href*=new_item]');
	var $visualiza_buscador = $('#barra_acciones').find('.table_acciones').find('a[href*=visualiza_buscador]');
	
	//aqui va el titulo del catalogo
	$('#barra_titulo').find('#td_titulo').append('Ordenes de Devoluci&oacute;n');
	
	//barra para el buscador 
	$('#barra_buscador').append($('#lienzo_recalculable').find('.tabla_buscador'));
	$('#barra_buscador').find('.tabla_buscador').css({'display':'block'});
	
	
	var $cadena_busqueda = "";
	var $campo_busqueda_folio = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_folio]');
	var $busqueda_factura = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_factura]');
	var $campo_busqueda_cliente = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_cliente]');
	var $busqueda_fecha_inicial = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_fecha_inicial]');
	var $busqueda_fecha_final = $('#barra_buscador').find('.tabla_buscador').find('input[name=busqueda_fecha_final]');
	var tiposIva = new Array(); //este arreglo carga los select del grid cada que se agrega un nuevo producto
	
	var $buscar = $('#barra_buscador').find('.tabla_buscador').find('#boton_buscador');
	var $limpiar = $('#barra_buscador').find('.tabla_buscador').find('#boton_limpiar');
	
	var to_make_one_search_string = function(){
		var valor_retorno = "";
		var signo_separador = "=";
		valor_retorno += "folio" + signo_separador + $campo_busqueda_folio.val() + "|";
		valor_retorno += "factura" + signo_separador + $busqueda_factura.val() + "|";
		valor_retorno += "cliente" + signo_separador + $campo_busqueda_cliente.val()+ "|";
		valor_retorno += "fecha_inicial" + signo_separador + $busqueda_fecha_inicial.val() + "|";
		valor_retorno += "fecha_final" + signo_separador + $busqueda_fecha_final.val();
		return valor_retorno;
	};
	
	cadena = to_make_one_search_string();
	$cadena_busqueda = cadena.toCharCode();
	
	$buscar.click(function(event){
		event.preventDefault();
		cadena = to_make_one_search_string();
		$cadena_busqueda = cadena.toCharCode();
		$get_datos_grid();
	});
	
	$limpiar.click(function(event){
		event.preventDefault();
		$campo_busqueda_folio.val('');
		$busqueda_factura.val('');
		$campo_busqueda_cliente.val(''); 
		$busqueda_fecha_inicial.val('');
		$busqueda_fecha_final.val('');
		$campo_busqueda_folio.focus();
	});
	
	//visualizar  la barra del buscador
	TriggerClickVisializaBuscador = 0;
	$visualiza_buscador.click(function(event){
		event.preventDefault();
		
		var alto=0;
		if(TriggerClickVisializaBuscador==0){
			 TriggerClickVisializaBuscador=1;
			 var height2 = $('#cuerpo').css('height');
			 //alert('height2: '+height2);
			 
			 alto = parseInt(height2)-220;
			 var pix_alto=alto+'px';
			 //alert('pix_alto: '+pix_alto);
			 
			 $('#barra_buscador').find('.tabla_buscador').css({'display':'block'});
			 $('#barra_buscador').animate({height: '60px'}, 500);
			 $('#cuerpo').css({'height': pix_alto});
			 
			 //alert($('#cuerpo').css('height'));
		}else{
			 TriggerClickVisializaBuscador=0;
			 var height2 = $('#cuerpo').css('height');
			 alto = parseInt(height2)+220;
			 var pix_alto=alto+'px';
			 
			 $('#barra_buscador').animate({height:'0px'}, 500);
			 $('#cuerpo').css({'height': pix_alto});
		};
		$campo_busqueda_folio.focus();
	});
	
	//Aplicar evento Keypress para que al pulsar enter ejecute la busqueda
	$(this).aplicarEventoKeypressEjecutaTrigger($campo_busqueda_folio, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_factura, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($campo_busqueda_cliente, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_fecha_inicial, $buscar);
	$(this).aplicarEventoKeypressEjecutaTrigger($busqueda_fecha_final, $buscar);
	
	$tabs_li_funxionalidad = function(){
		var $select_prod_tipo = $('#forma-invordendev-window').find('select[name=prodtipo]');
		$('#forma-invordendev-window').find('#submit').mouseover(function(){
			$('#forma-invordendev-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/bt1.png");
		});
		$('#forma-invordendev-window').find('#submit').mouseout(function(){
			$('#forma-invordendev-window').find('#submit').removeAttr("src").attr("src","../../img/modalbox/btn1.png");
		});
		
		$('#forma-invordendev-window').find('#boton_cancelar').mouseover(function(){
			$('#forma-invordendev-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/bt2.png)"});
		});
		$('#forma-invordendev-window').find('#boton_cancelar').mouseout(function(){
			$('#forma-invordendev-window').find('#boton_cancelar').css({backgroundImage:"url(../../img/modalbox/btn2.png)"});
		});
		
		$('#forma-invordendev-window').find('#close').mouseover(function(){
			$('#forma-invordendev-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close_over.png)"});
		});
		$('#forma-invordendev-window').find('#close').mouseout(function(){
			$('#forma-invordendev-window').find('#close').css({backgroundImage:"url(../../img/modalbox/close.png)"});
		});
		
		$('#forma-invordendev-window').find(".contenidoPes").hide(); //Hide all content
		$('#forma-invordendev-window').find("ul.pestanas li:first").addClass("active").show(); //Activate first tab
		$('#forma-invordendev-window').find(".contenidoPes:first").show(); //Show first tab content
		
		//On Click Event
		$('#forma-invordendev-window').find("ul.pestanas li").click(function() {
			$('#forma-invordendev-window').find(".contenidoPes").hide();
			$('#forma-invordendev-window').find("ul.pestanas li").removeClass("active");
			var activeTab = $(this).find("a").attr("href");
			$('#forma-invordendev-window').find( activeTab , "ul.pestanas li" ).fadeIn().show();
			$(this).addClass("active");
			return false;
		});
	}
        
        
        
	//----------------------------------------------------------------
	//valida la fecha seleccionada
	function mayor(fecha, fecha2){
		var xMes=fecha.substring(5, 7);
		var xDia=fecha.substring(8, 10);
		var xAnio=fecha.substring(0,4);
		var yMes=fecha2.substring(5, 7);
		var yDia=fecha2.substring(8, 10);
		var yAnio=fecha2.substring(0,4);

		if (xAnio > yAnio){
			return(true);
		}else{
			if (xAnio == yAnio){
				if (xMes > yMes){
					return(true);
				}
				if (xMes == yMes){
					if (xDia > yDia){
						return(true);
					}else{
						return(false);
					}
				}else{
					return(false);
				}
			}else{
				return(false);
			}
		}
	}
	//muestra la fecha actual
	var mostrarFecha = function mostrarFecha(){
		var ahora = new Date();
		var anoActual = ahora.getFullYear();
		var mesActual = ahora.getMonth();
		mesActual = mesActual+1;
		mesActual = (mesActual <= 9)?"0" + mesActual : mesActual;
		var diaActual = ahora.getDate();
		diaActual = (diaActual <= 9)?"0" + diaActual : diaActual;
		var Fecha = anoActual + "-" + mesActual + "-" + diaActual;		
		return Fecha;
	}
	//----------------------------------------------------------------

	$busqueda_fecha_inicial.click(function (s){
		var a=$('div.datepicker');
		a.css({'z-index':100});
	});
        
	$busqueda_fecha_inicial.DatePicker({
		format:'Y-m-d',
		date: $(this).val(),
		current: $(this).val(),
		starts: 1,
		position: 'bottom',
		locale: {
			days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
			daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
			daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
			months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
			monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
			weekMin: 'se'
		},
		onChange: function(formated, dates){
			var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
			$busqueda_fecha_inicial.val(formated);
			if (formated.match(patron) ){
				var valida_fecha=mayor($busqueda_fecha_inicial.val(),mostrarFecha());
				
				if (valida_fecha==true){
					jAlert("Fecha no valida",'! Atencion');
					$busqueda_fecha_inicial.val(mostrarFecha());
				}else{
					$busqueda_fecha_inicial.DatePickerHide();	
				}
			}
		}
	});
        
	$busqueda_fecha_final.click(function (s){
		var a=$('div.datepicker');
		a.css({'z-index':100});
	});
        
	$busqueda_fecha_final.DatePicker({
		format:'Y-m-d',
		date: $(this).val(),
		current: $(this).val(),
		starts: 1,
		position: 'bottom',
		locale: {
			days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado','Domingo'],
			daysShort: ['Dom', 'Lun', 'Mar', 'Mir', 'Jue', 'Vir', 'Sab','Dom'],
			daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa','Do'],
			months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
			monthsShort: ['Ene', 'Feb', 'Mar', 'Abr','May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'],
			weekMin: 'se'
		},
		onChange: function(formated, dates){
			var patron = new RegExp("^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$");
			$busqueda_fecha_final.val(formated);
			if (formated.match(patron) ){
				var valida_fecha=mayor($busqueda_fecha_final.val(),mostrarFecha());
				
				if (valida_fecha==true){
					jAlert("Fecha no valida",'! Atencion');
					$busqueda_fecha_final.val(mostrarFecha());
				}else{
					$busqueda_fecha_final.DatePickerHide();	
				}
			}
		}
	});
	
	
	
	
	var quitar_comas= function($valor){
		$valor = $valor+'';
		return $valor.split(',').join('');
	}
	
	
	
	
	$aplicar_evento_keypress = function( $campo_input ){
		//validar campo cantidad recibida, solo acepte numeros y punto
		$campo_input.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if(e.which == 8 || e.which == 46 || e.which==13 || e.which == 0 || (e.which >= 48 && e.which <= 57 )) {
				return true;
			}else {
				return false;
			}
		});
	}
	
	
	$aplicar_evento_focus = function( $campo_input ){
		//quita cero al obtener el enfoque, si es mayor a 0 entonces no hace nada
		$campo_input.focus(function(e){
			if(parseFloat($campo_input.val())<1){
				$campo_input.val('');
			}
		});
	}
	
	
	$aplicar_evento_blur = function( $campo_input ){
		//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
		$campo_input.blur(function(e){
			if(parseFloat($campo_input.val())==0||$campo_input.val()==""){
				$campo_input.val(0);
			}
		});
	}
	
	
	$aplicar_evento_focus_input_lote = function( $campo_input ){
		//al iniciar el campo tiene un  caracter en blanco, al obtener el foco se elimina el  espacio por comillas
		$campo_input.focus(function(e){
			if($(this).val() == ' '){
				$(this).val('');
			}
		});
	}
	
	
	$aplicar_evento_blur_input_lote = function( $campo_input ){
		//pone espacio en blanco al perder el enfoque, cuando no se ingresa un valor
		$campo_input.blur(function(e){
			if ( $(this).val() == ''  || $(this).val() == null ){
				$(this).val(' ');
			}else{
				//aqui va llamada a funcion que busca datos del lote
				//var $tr_padre = $(this).parent().parent();
				//$obtiene_datos_lote($tr_padre);
			}
		});
	}
	
	
	$aplicar_evento_click_input_lote = function( $campo_input ){
		//validar campo cantidad recibida, solo acepte numeros y punto
		$campo_input.dblclick(function(e){
			$(this).select();
		});
	}
	
	
	$aplicar_evento_keypress_input_lote = function( $campo_input ){
		//validar campo cantidad recibida, solo acepte numeros y punto
		$campo_input.keypress(function(e){
			// Permitir  numeros, borrar, suprimir, TAB, puntos, comas
			if(e.which==13 ) {
				if ( $(this).val()!=''  &&  $(this).val()!=' ' && $(this).val()!=null ){
					var $tr_padre = $(this).parent().parent();
					$obtiene_datos_lote($tr_padre);
				}else{
					jAlert("Ingresa un n&uacute;mero de Lote.", 'Atencion!');
				}
				return false;
			}
			
		});
	}
	
	
	
	
	
	//buscador de de Datos del Lote
	$obtiene_datos_lote = function($tr_padre){
		var numero_lote = $tr_padre.find('input[name=lote_int]').val();
		var id_producto = $tr_padre.find('input[name=id_prod_grid]').val();
		var encontrado=0;
		$tabla_padre = $tr_padre.parent();
		
		//buscar el numero de lote en la tabla
		$tabla_padre.find('input[name=lote_int]').each(function (index){
			if($(this).val() == numero_lote ){
				encontrado++;
			}
		});
		
		//si el numero de lote solo esta una vez es valido, dos veces ya no es valido
		if(parseInt(encontrado)<=1){
			var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getDatosLote.json';
			$arreglo = {'no_lote':numero_lote,
						'id_producto':id_producto,
						'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
						};
			
			$.post(input_json,$arreglo,function(entry){
				//verifica si el arreglo  retorno datos
				if (entry['Lote'].length > 0){
					
					//crea el tr con los datos del producto seleccionado
					$.each(entry['Lote'],function(entryIndex,lote){
						//$tr_padre.find('input[name=lote_int]').val(lote['']);
						$tr_padre.find('input[name=exis_lote]').val(lote['exis_lote']);
						$tr_padre.find('input[name=pedimento]').val(lote['pedimento']);
						$tr_padre.find('input[name=caducidad]').val(lote['caducidad']);
						$tr_padre.find('input[name=cant_dev]').val(lote['exis_lote']);
					});//termina llamada json
					
				}else{
					jAlert("El n&uacute;mero de Lote no existe para &eacute;ste producto.", 'Atencion!');
					$tr_padre.find('input[name=lote_int]').select();
				}
			});
		}else{
			jAlert("El n&uacute;mero de Lote  [ "+numero_lote+" ]  ya se encuentra en la lista.", 'Atencion!');
		}
		
	}//termina buscador de datos del Lote
	
    
	
	
	
	
	
	
	//funcion que genera tr para agregar numero de lote
	$genera_tr_para_numero_de_lote = function(tipo_registro, id_det, id_producto, codigo, titulo, id_almacen, lote_id,lote_int, cant_fac_lote, cant_dev_lote,pedimento, caducidad, trCount, id_det_par){
		var tr_prod='';
			tr_prod += '<tr>';
			tr_prod += '<td width="80" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
				tr_prod += '<input type="hidden" name="no_tr" id="notr" value="'+ trCount +'">';
				tr_prod += '<input type="hidden" name="tipo" id="tip" value="'+ tipo_registro +'">';
				tr_prod += '<input type="hidden" name="id_detalle" id="iddetos" value="'+  id_det +'">';
				tr_prod += '<input type="hidden" name="id_partida" value="'+  id_det_par +'">';
				tr_prod += '<input type="hidden" name="id_alm" id="idalm" value="'+  id_almacen +'">';
				tr_prod += '<input type="hidden" name="id_prod_grid" id="idprod" value="'+  id_producto +'">';
				tr_prod += '<input type="text"  name="sku" value="'+codigo+'"  id="codigo'+ trCount +'" class="borde_oculto" style="width:76px; display:none;" readOnly="true">';
				
			tr_prod += '</td>';
			tr_prod += '<td width="180" class="grid" align="right" style="font-size:11px;  border:1px solid #C1DAD7;">';
				tr_prod += '<input type="text" name="titulo" value="'+titulo+'" id="titulo'+ trCount +'" class="borde_oculto" style="width:176px; display:none;" readOnly="true">';
			tr_prod += '</td>';
			
			tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
			tr_prod += '</td>';
			
			tr_prod += '<td width="70" class="grid" style="font-size: 11px; border:1px solid #C1DAD7;">';
				tr_prod += '<input type="hidden" name="id_pres" id="idpres" value="0">';
				tr_prod += '<a href="elimina_lote" class="elimina_lote'+ trCount +'">Eliminar</a>';
				tr_prod += '<input type="hidden" name="eliminado" id="elim" value="1">';//1=registro vivo, 0=Registro eliminado
			tr_prod += '</td>';
			
			tr_prod += '<td width="80" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
				tr_prod += '<input type="text" name="cantidad" id="cant" value="' + $(this).agregar_comas(cant_fac_lote) + '"  class="borde_oculto" style="width:76px; text-align:right;" readOnly="true">';
			tr_prod += '</td>';
			
			tr_prod += '<td width="80" class="grid" style="font-size:11px; text-align:right; border:1px solid #C1DAD7;">';
				tr_prod += 'Lote';
			tr_prod += '</td>';
			
			tr_prod += '<td width="80" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
				tr_prod += '<input type="text" name="lote_id" value="'+ lote_id +'" class="lote_id'+ trCount +'" style="display:none;">';
				tr_prod += '<input type="text" name="lote_int" value="'+ lote_int +'" class="lote_int'+ trCount +' borde_oculto" title="Numero de Lote" style="width:76px;" readOnly="true">';
			tr_prod += '</td>';
			
			tr_prod += '<td width="80" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
				tr_prod += '<input type="text" name="cant_dev" id="cant_d" value="'+cant_dev_lote+'" class="cant_dev'+ trCount +'" title="Cantidad Devolucion del Lote" style="width:76px;" >';
			tr_prod += '</td>';
			
			tr_prod += '<td width="100" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
				tr_prod += '<input type="text" name="pedimento" id="ped" value="'+pedimento+'" class="borde_oculto" style="width:96px;" readOnly="true">';
			tr_prod += '</td>';
			
			tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
				tr_prod += '<input type="text" name="caducidad" id="cad" value="'+caducidad+'" class="borde_oculto" style="width:66px;" readOnly="true">';
			tr_prod += '</td>';
		tr_prod += '</tr>';
		
		return tr_prod;
	}
	
	
	
	//funcion para agregar lote y eliminar
	agregar_lote_y_eliminar = function($grid_productos,tipo_registro, trCount){
		//agregar nuevo lote
		$grid_productos.find('.agrega_lote'+ trCount ).click(function(e){
			e.preventDefault();
			$(this).hide();
			
			$tr_padre=$(this).parent().parent();
			
			var id_detalle_lot = 0;
			var id_producto = $tr_padre.find('input[name=id_prod_grid]').val();
			var codigo = $tr_padre.find('input[name=sku]').val();
			var titulo = $tr_padre.find('input[name=titulo]').val();
			var unidad_medida = $tr_padre.find('input[name=unidad]').val();
			var id_detalle_os = $tr_padre.find('input[name=id_detalle_os]').val();
			var id_almacen = $tr_padre.find('input[name=id_alm]').val();
			var lote_int = ' ';
			var cant_lote=0;
			var pedimento='';
			var caducidad='';
			
			var noTr = $("tr", $grid_productos).size();
			noTr++;
			
			//aqui es para crear nuevos registros del lote
			tr_lote = $genera_tr_para_numero_de_lote(tipo_registro, id_detalle_os, id_producto, codigo, titulo, unidad_medida, id_detalle_lot, id_almacen, lote_int,cant_lote, pedimento, caducidad, noTr);
			
			//agregar tr_lote despues de tr_padre
			$(tr_lote).insertAfter($tr_padre);
			
			
			//aplicar click al nuevo registro
			//se hace una llamada recursiva a  la funcion agregar_lote
			agregar_lote_y_eliminar($grid_productos,tipo_registro, noTr);
			$aplicar_evento_keypress( $grid_productos.find('.cant_dev'+ noTr ) );
			$aplicar_evento_blur( $grid_productos.find('.cant_dev'+ noTr ) );
			$aplicar_evento_focus( $grid_productos.find('.cant_dev'+ noTr ) );
			
			$aplicar_evento_focus_input_lote($grid_productos.find('.lote_int'+ noTr ));
			$aplicar_evento_blur_input_lote($grid_productos.find('.lote_int'+ noTr ));
			$aplicar_evento_keypress_input_lote($grid_productos.find('.lote_int'+ noTr ));
			$aplicar_evento_click_input_lote($grid_productos.find('.lote_int'+ noTr ));
		});
		
		
		//eliminar un lote
		$grid_productos.find('.elimina_lote'+ trCount ).click(function(e){
			e.preventDefault();
			$tr_padre=$(this).parent().parent();
			var id_detalle_lot = $tr_padre.find('input[name=id_detalle]').val();//tomar el id_detalle
			var tipo_registro = $tr_padre.find('input[name=tipo]').val();//tomar el el tipo de registro
			$tr_padre.find('input').val('');//asignar vacio a todos los input del tr
			$tr_padre.find('input[name=eliminado]').val('0');//asignamos 0 para indicar que se ha eliminado
			$tr_padre.find('input[name=id_detalle]').val(id_detalle_lot);//devolver el id_detalle, este es necesario para actualizar el campo
			$tr_padre.find('input[name=tipo]').val(tipo_registro);
			$tr_padre.hide();//ocultar el tr
		});
	}
	
	
	
	
	
	
	
	
	
	var carga_formainvordendev00_for_datagrid00 = function(id_to_show, accion_mode){
		//aqui entra para eliminar una entrada
		if(accion_mode == 'cancel'){
			var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/' + 'logicDelete.json';
			$arreglo = {'no_entrada':id_to_show,
						'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
						};
			jConfirm('Realmente desea eliminar la entrada seleccionada?', 'Dialogo de confirmacion', function(r) {
				if (r){
					$.post(input_json,$arreglo,function(entry){
						if ( entry['success'] == '1' ){
							jAlert("La entrada fue eliminada exitosamente", 'Atencion!');
							$get_datos_grid();
						}
						else{
							jAlert("La entrada no pudo ser eliminada", 'Atencion!');
						}
					},"json");
				}
			});
			
		}else{
			//aqui  entra para editar un registro
			var form_to_show = 'formainvordendev00';
			$('#' + form_to_show).each (function(){   this.reset(); });
			var $forma_selected = $('#' + form_to_show).clone();
			$forma_selected.attr({ id : form_to_show + id_to_show });
			//var accion = "get_datos_entrada_mercancia";
			
			$(this).modalPanel_invordendev();
			
			$('#forma-invordendev-window').css({ "margin-left": -425, 	"margin-top": -230 });
			
			$forma_selected.prependTo('#forma-invordendev-window');
			$forma_selected.find('.panelcito_modal').attr({ id : 'panelcito_modal' + id_to_show , style:'display:table'});
			
			$tabs_li_funxionalidad();
			
			
			//alert(id_to_show);
			
			if(accion_mode == 'edit'){
                                
				var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getOrdenDev.json';
				$arreglo = {'identificador':id_to_show,
							'iu':$('#lienzo_recalculable').find('input[name=iu]').val()
							};
				
				var $identificador = $('#forma-invordendev-window').find('input[name=identificador]');
				var $folio_dev = $('#forma-invordendev-window').find('input[name=folio_dev]');
				var $estatus = $('#forma-invordendev-window').find('input[name=estatus]');
				var $accion = $('#forma-invordendev-window').find('input[name=accion]');
				var $select_tipo_mov = $('#forma-invordendev-window').find('select[name=select_tipo_mov]');
				var $fecha_mov = $('#forma-invordendev-window').find('input[name=fecha_mov]');
				
				//campos del cliente
				var $hidden_id_cliente = $('#forma-invordendev-window').find('input[name=id_cliente]');
				var $no_clie = $('#forma-invordendev-window').find('input[name=no_clie]');
				var $campo_razoncliente = $('#forma-invordendev-window').find('input[name=razoncliente]');
				
				var $select_tipodoc = $('#forma-invordendev-window').find('select[name=select_tipodoc]');
				var $folio_doc = $('#forma-invordendev-window').find('input[name=folio_doc]');
				var $fecha_doc = $('#forma-invordendev-window').find('input[name=fecha_doc]');
				var $select_moneda = $('#forma-invordendev-window').find('select[name=select_moneda]');
				var $folio_nc = $('#forma-invordendev-window').find('input[name=folio_nc]');
				var $observaciones = $('#forma-invordendev-window').find('textarea[name=observaciones]');
				var $select_almacen_dest = $('#forma-invordendev-window').find('select[name=select_almacen_dest]');
				
				
				//tabla contenedor del listado de productos
				var $grid_productos = $('#forma-invordendev-window').find('#grid_productos');
				var $descargar_pdf = $('#forma-invordendev-window').find('#descargar_pdf');
				
				var $cerrar_plugin = $('#forma-invordendev-window').find('#close');
				var $cancelar_plugin = $('#forma-invordendev-window').find('#boton_cancelar');
				var $submit_actualizar = $('#forma-invordendev-window').find('#submit');
				//$submit_actualizar.hide();//ocultar boton para que no permita actualizar
				
				$folio_dev.css({'background' : '#F0F0F0'});
				$fecha_mov.css({'background' : '#F0F0F0'});
				$no_clie.css({'background' : '#F0F0F0'});
				$campo_razoncliente.css({'background' : '#F0F0F0'});
				$folio_doc.css({'background' : '#F0F0F0'});
				$fecha_doc.css({'background' : '#F0F0F0'});
				$folio_nc.css({'background' : '#F0F0F0'});
				
				$folio_dev.attr("readonly", true);
				$fecha_mov.attr("readonly", true);
				$no_clie.attr("readonly", true);
				$campo_razoncliente.attr("readonly", true);
				$folio_doc.attr("readonly", true);
				$fecha_doc.attr("readonly", true);
				$folio_nc.attr("readonly", true);
				
				$accion.val('edit');
				$submit_actualizar.hide();
				$descargar_pdf.attr('disabled','-1'); //deshabilitar
				
				var respuestaProcesada = function(data){
					if ( data['success'] == "true" ){
						if ( $accion.val()=='update'){
							jAlert("La Orden de Salida "+$folio_dev.val()+" se guard&oacute; con &eacute;xito", 'Atencion!');
						}else{
							jAlert("Orden de Salida "+$folio_dev.val()+" se Confirmado con &eacute;xito", 'Atencion!');
						}
						//habilitar boton actualizar
						$submit_actualizar.removeAttr('disabled');
						var remove = function() { $(this).remove(); };
						$('#forma-invordendev-overlay').fadeOut(remove);
						$get_datos_grid();
					}else{
						//habilitar boton actualizar
						$submit_actualizar.removeAttr('disabled');
						// Desaparece todas las interrogaciones si es que existen
						$('#forma-invordendev-window').find('div.interrogacion').css({'display':'none'});
						$grid_productos.find('input[name=cant_dev]').css({'background' : '#ffffff'});
						$grid_productos.find('input[name=lote_int]').css({'background' : '#ffffff'});
						
						$('#forma-invordendev-window').find('#div_warning_grid').css({'display':'none'});
						$('#forma-invordendev-window').find('#div_warning_grid').find('#grid_warning').children().remove();
						$('#forma-invordendev-window').find('.invordendev_div_one').css({'height':'585px'});
						
						var valor = data['success'].split('___');
						//muestra las interrogaciones
						for (var element in valor){
							tmp = data['success'].split('___')[element];
							longitud = tmp.split(':');
							if( longitud.length > 1 ){
								$('#forma-invordendev-window').find('img[rel=warning_' + tmp.split(':')[0] + ']')
								.parent()
								.css({'display':'block'})
								.easyTooltip({tooltipId: "easyTooltip2",content: tmp.split(':')[1]});
								
								var campo = tmp.split(':')[0];
								
								$('#forma-invordendev-window').find('#div_warning_grid').css({'display':'block'});
								var $campo = $grid_productos.find('.'+campo).css({'background' : '#d41000'});
								
								var codigo_producto = $campo.parent().parent().find('input[name=sku]').val();
								var titulo_producto = $campo.parent().parent().find('input[name=titulo]').val();
								
								var tr_warning = '<tr>';
										tr_warning += '<td width="20"><div><IMG SRC="../../img/icono_advertencia.png" ALIGN="top" rel="warning_sku"></td>';
										tr_warning += '<td width="100"><INPUT TYPE="text" value="' + codigo_producto + '" class="borde_oculto" readOnly="true" style="width:95px; color:red"></td>';
										tr_warning += '<td width="200"><INPUT TYPE="text" value="' + titulo_producto + '" class="borde_oculto" readOnly="true" style="width:205px; color:red"></td>';
										tr_warning += '<td width="420"><INPUT TYPE="text" value="'+  tmp.split(':')[1] +'" class="borde_oculto" readOnly="true" style="width:420px; color:red"></td>';
								tr_warning += '</tr>';
								
								$('#forma-invordendev-window').find('#div_warning_grid').find('#grid_warning').append(tr_warning);
								
							}
						}
						$('#forma-invordendev-window').find('#div_warning_grid').find('#grid_warning').find('tr:odd').find('td').css({ 'background-color' : '#FFFFFF'});
						$('#forma-invordendev-window').find('#div_warning_grid').find('#grid_warning').find('tr:even').find('td').css({ 'background-color' : '#e7e8ea'});
					}
				}
				
				var options = {dataType :  'json', success : respuestaProcesada};
				$forma_selected.ajaxForm(options);
				
				//aqui se cargan los campos al editar
				$.post(input_json,$arreglo,function(entry){
					$identificador.attr({ 'value' : entry['Datos'][0]['id'] });
					$folio_dev.attr({ 'value' : entry['Datos'][0]['folio'] });
					$estatus.attr({ 'value' : entry['Datos'][0]['estado'] });
					
					$hidden_id_cliente.attr({ 'value' : entry['Datos'][0]['clie_id'] });
					$no_clie.attr({ 'value' : entry['Datos'][0]['no_clie'] });
					$campo_razoncliente.attr({ 'value' : entry['Datos'][0]['cliente'] });
					$folio_doc.attr({ 'value' : entry['Datos'][0]['folio_doc'] });
					$fecha_doc.attr({ 'value' : entry['Datos'][0]['fecha_doc'] });
					$fecha_mov.attr({ 'value' : entry['Datos'][0]['fecha_mov'] });
					$folio_nc.attr({ 'value' : entry['Datos'][0]['folio_ncto'] });
					
					$observaciones.text(entry['Datos'][0]['observaciones']);
					
					//carga select tipo de Movimiento
					$select_tipo_mov.children().remove();
					var tipo_mov_hmtl = '';
					$.each(entry['TMovInv'],function(entryIndex,tmov){
						if(parseInt(tmov['id']) == parseInt(entry['Datos'][0]['tipo_mov_id'])){
							tipo_mov_hmtl += '<option value="' + tmov['id'] + '" selected="yes">' + tmov['titulo'] + '</option>';
						}else{
							//moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
						}
					});
					$select_tipo_mov.append(tipo_mov_hmtl);
					
					
					//carga select con tipo de documento
					$select_tipodoc.children().remove();
					var select_html = '';
					for(var i in arrayTiposDocumento){
						if(parseInt(entry['Datos']['0']['tipo_doc'])==parseInt(i)){
							select_html += '<option value="' + i + '" selected="yes">' + arrayTiposDocumento[i] + '</option>';
						}else{
							//select_html += '<option value="' + i + '">' + arrayTiposDocumento[i] + '</option>';
						}
					}
					$select_tipodoc.append(select_html);
					
					
					//carga select denominacion con todas las monedas
					$select_moneda.children().remove();
					//var moneda_hmtl = '<option value="0">[--   --]</option>';
					var moneda_hmtl = '';
					$.each(entry['Monedas'],function(entryIndex,moneda){
						if(parseInt(moneda['id']) == parseInt(entry['Datos']['0']['moneda_id'])){
							moneda_hmtl += '<option value="' + moneda['id'] + '" selected="yes">' + moneda['descripcion'] + '</option>';
						}else{
							//moneda_hmtl += '<option value="' + moneda['id'] + '"  >' + moneda['descripcion'] + '</option>';
						}
					});
					$select_moneda.append(moneda_hmtl);
					
					
					//carga select almacen origen
					$select_almacen_dest.children().remove();
					//var almacen_hmtl = '<option value="0" selected="yes">[--   --]</option>';
					var almacen_hmtl="";
					$.each(entry['Almacenes'],function(entryIndex,alm){
						if(parseInt(alm['id']) == parseInt(entry['Datos'][0]['alm_dest_id'])){
							almacen_hmtl += '<option value="' + alm['id'] + '"  selected="yes">' + alm['titulo'] + '</option>';
						}else{
							//almacen_hmtl += '<option value="' + alm['id'] + '"  >' + alm['titulo'] + '</option>';
						}
					});
					$select_almacen_dest.append(almacen_hmtl);
					
					
					if(entry['datosGrid'] != null){
						$.each(entry['datosGrid'],function(entryIndex,prodGrid){
							var trCount = $("tr", $grid_productos).size();
							trCount++;
							
							var valor_pedimento='';
							var tr_prod='';
							var tr_lote='';
							var tipo_registro='PAR';//partida
							
							tr_prod += '<tr>';
								tr_prod += '<td width="80" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="hidden" name="no_tr" id="notr" value="'+ trCount +'">';
									tr_prod += '<input type="hidden" name="tipo" id="tip" value="'+ tipo_registro +'">';
									tr_prod += '<input type="hidden" name="id_detalle" id="iddetos" value="'+  prodGrid['id_det'] +'">';
									tr_prod += '<input type="hidden" name="id_partida" value="'+  prodGrid['id_det'] +'">';
									tr_prod += '<input type="hidden" name="id_alm" id="idalm" value="'+  $select_almacen_dest.val() +'">';
									tr_prod += '<input type="hidden" name="id_prod_grid" id="idprod" value="'+  prodGrid['prod_id'] +'">';
									tr_prod += '<input type="text"  name="sku" value="' + prodGrid['codigo'] + '" id="codigo'+ trCount +'" class="borde_oculto" style="width:76px;" readOnly="true">';
								tr_prod += '</td>';
								tr_prod += '<td width="180" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="titulo" value="' + prodGrid['nombre_producto'] + '" id="titulo'+ trCount +'"  class="borde_oculto" style="width:176px;" readOnly="true">';
								tr_prod += '</td>';
								tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="unidad" class="borde_oculto" value="' + prodGrid['unidad'] + '" readOnly="true" style="width:66px;">';
								tr_prod += '</td>';
								tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="hidden" name="id_pres" id="idpres" value="'+ prodGrid['pres_id'] +'">';
									tr_prod += '<input type="text" name="presentacion" class="borde_oculto" value="' + prodGrid['presentacion'] + '" readOnly="true" style="width:66px;">';
								tr_prod += '</td>';
								tr_prod += '<td width="80" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="cantidad" id="cant" value="' + $(this).agregar_comas(prodGrid['cant_fac']) + '"  class="borde_oculto" style="width:76px; text-align:right;" readOnly="true">';
									tr_prod += '<input type="hidden" name="eliminado" id="elim" value="1">';//1=registro vivo, 0=Registro eliminado
								tr_prod += '</td>';
								tr_prod += '<td width="85" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="costo" id="cost" value="' + $(this).agregar_comas(prodGrid['precio_u']) + '" class="borde_oculto" style="width:79px; text-align:right;" readOnly="true">';
								tr_prod += '</td>';
								
								tr_prod += '<td width="80" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="lote_id" value=" " class="lote_id'+ trCount +'" style="display:none;">';
									tr_prod += '<input type="text" name="lote_int" value=" " class="lote_int'+ trCount +'" style="display:none;">';
									tr_prod += '<input type="text" name="importe'+ trCount +'" id="import" value="' + $(this).agregar_comas(prodGrid['importe']) + '" class="borde_oculto" style="width:76px; text-align:right;" readOnly="true">';
								tr_prod += '</td>';
								
								tr_prod += '<td width="80" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="cant_dev" id="cant_d" value="' + prodGrid['cant_dev'] + '" class="cant_dev'+ trCount +' borde_oculto" style="width:76px;" readOnly="true">';
								tr_prod += '</td>';
								
								tr_prod += '<td width="100" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="pedimento" id="ped" value="" class="pedimento'+ trCount +'" style="width:96px; display:none;">';
								tr_prod += '</td>';
								
								tr_prod += '<td width="70" class="grid" style="font-size: 11px;  border:1px solid #C1DAD7;">';
									tr_prod += '<input type="text" name="caducidad" id="cad" value="" class="caducidad'+ trCount +'" style="width:66px; display:none;">';
								tr_prod += '</td>';
								
							tr_prod += '</tr>';
							$grid_productos.append(tr_prod);//agrega el tr a la tabla
							
							
							var cont=0;
							$.each(entry['Lotes'],function(entryIndex,lote){
								trCount2 = $("tr", $grid_productos).size();//obtener de nuevo el numero de trs de la tabla
								
								tipo_registro='LOT';
								var id_det_par = prodGrid['id_det'];
								var id_det = lote['id_det'];
								var id_producto = lote['prod_id'];
								var codigo = prodGrid['codigo'];
								var titulo = prodGrid['nombre_producto'];
								var id_almacen = $select_almacen_dest.val();
								var lote_id = lote['lote_id'];
								var lote_int = lote['lote_int'];
								var cant_fac_lote = lote['cant_fac_lote'];
								var cant_dev_lote = lote['cant_dev_lote'];
								var pedimento=lote['pedimento'];
								var caducidad=lote['caducidad'];
								
								if( (parseInt(prodGrid['prod_id'])==parseInt(lote['prod_id'])) && (parseInt(prodGrid['pres_id'])==parseInt(lote['pres_id'])) ){
									trCount2++;
									/*
									if( parseInt(cont) > 0 ){
										//ocultar el href anterior de Agregar Lote
										$grid_productos.find('.agrega_lote'+ (parseInt(trCount2)-1) ).hide();
									}
									*/
									//Aqui ya es para editar el lote
									tr_lote = $genera_tr_para_numero_de_lote(tipo_registro, id_det, id_producto,codigo,titulo, id_almacen,lote_id,lote_int,cant_fac_lote,cant_dev_lote,pedimento, caducidad, trCount2, id_det_par);
									$grid_productos.append(tr_lote);
									
									// esta funcion es para agregar un nuevo lote
									//en esta funcion se le aplica evento click a los href Agregar Lote y Eliminar
									agregar_lote_y_eliminar($grid_productos,tipo_registro, trCount2);
									$aplicar_evento_keypress( $grid_productos.find('.cant_dev'+ trCount2 ) );
									$aplicar_evento_blur( $grid_productos.find('.cant_dev'+ trCount2 ) );
									$aplicar_evento_focus( $grid_productos.find('.cant_dev'+ trCount2 ) );
									
									$aplicar_evento_focus_input_lote($grid_productos.find('.lote_int'+ trCount2 ));
									$aplicar_evento_blur_input_lote($grid_productos.find('.lote_int'+ trCount2 ));
									$aplicar_evento_click_input_lote($grid_productos.find('.lote_int'+ trCount2 ));
									
									//estatus 2=Confirmado, menor que dos aun no esta confirmado por lo tanto le aplicamos el evento keypress
									if(parseInt($estatus.val()) < 2){
										$aplicar_evento_keypress_input_lote($grid_productos.find('.lote_int'+ trCount2 ));
									}
									
									cont++;
								}
							});
							
							
							$aplicar_evento_keypress( $grid_productos.find('.cant_dev'+ trCount ) );
							$aplicar_evento_focus( $grid_productos.find('.cant_dev'+ trCount ) );
							/*
							if( parseInt($estatus.val()) > 0 ){
								if(parseFloat(prodGrid['cant_fac']) != parseFloat(prodGrid['cant_dev'])){
									$grid_productos.find('.cant_dev'+ trCount ).css({'background' : '#d41000'});
								}
							}
							*/
							/*
							//pone cero al perder el enfoque, cuando no se ingresa un valor o cuando el valor es igual a cero, si hay un valor mayor que cero no hace nada
							$grid_productos.find('.cant_dev'+ trCount ).blur(function(e){
								var tr_actual=$(this).parent().parent();
								if(parseFloat($(this).val())<=0 || $(this).val()==""){
									$(this).val(0);
								}
								
								if ( parseFloat(quitar_comas(tr_actual.find('input[name=cantidad]').val())) != parseFloat($(this).val()) ){
									$(this).css({'background' : '#d41000'});
									jAlert("La Cantidad de la Devolucion debe ser igual que la Cantidad de la Factura.", 'Atencion!');
								}else{
									//aqui si es correcto
									$(this).css({'background' : '#ffffff'});
								}
								
								$(this).val(parseFloat($(this).val()).toFixed(2));
							});
							*/
							
						});
						
						if(parseInt($estatus.val())==0 ){
							$submit_actualizar.show();
						}
						
						if(parseInt($estatus.val()) == 1 ){
							$observaciones.attr({ 'readOnly':true });
							$descargar_pdf.removeAttr('disabled');
							$grid_productos.find('input[name=lote_int]').attr({ 'readOnly':true });
							$grid_productos.find('input[name=cant_dev]').attr({ 'readOnly':true });
							//$grid_productos.find('input[name=cant_dev]').css({'background' : '#f0f0f0'});
							$grid_productos.find('a').hide();
							
							//quitar el enter en todos los input del grid
							$grid_productos.find('input').keypress(function(e){
								if(e.which==13 ) {
									return false;
								}
							});
						}
					}
					
					
					if(entry['Datos']['0']['cancelacion'] == 'true'){
						$select_tipo_mov.attr('disabled','-1'); //deshabilitar
						$descargar_pdf.attr('disabled','-1'); //deshabilitar
						$folio_dev.attr('disabled','-1'); //deshabilitar
						$campo_razoncliente.attr('disabled','-1'); //deshabilitar
						$folio_doc.attr('disabled','-1'); //deshabilitar
						$fecha_doc.attr('disabled','-1'); //deshabilitar
						$observaciones.attr('disabled','-1'); //deshabilitar
						$no_clie.attr('disabled','-1'); //deshabilitar
						$fecha_mov.attr('disabled','-1'); //deshabilitar
						$folio_nc.attr('disabled','-1'); //deshabilitar
						
						$select_tipodoc.attr('disabled','-1'); //deshabilitar
						$select_moneda.attr('disabled','-1'); //deshabilitar
						$select_almacen_dest.attr('disabled','-1'); //deshabilitar
						
						$grid_productos.find('a').hide();
						$grid_productos.find('input').attr('disabled','-1'); //deshabilitar
						$submit_actualizar.hide();
					}
					
				},"json");//termina llamada json
				
				
				
				/*
				$confirmar.click(function(e){
					$accion.attr({'value' : "confirm"});
					jConfirm('Confirmar devolucion?', 'Dialogo de Confirmacion', function(r) {
						// If they confirmed, manually trigger a form submission
						if (r) {
							$submit_actualizar.parents("FORM").submit();
						}else{
							$accion.attr({'value' : "update"});
						}
					});
					// Always return false here since we don't know what jConfirm is going to do
					return false;
				});
				*/
				
				
				
				
				//descargar pdf de Orden de Salida
				$descargar_pdf.click(function(event){
					var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
					var input_json = document.location.protocol + '//' + document.location.host + '/' + controller + '/getPdf/'+$identificador.val()+'/'+iu+'/out.json';
					window.location.href=input_json;
				});
				
				
				
				$('#forma-invordendev-window').find('input').keypress(function(e){
					if(e.which==13 ) {
						return false;
					}
				});
		
				
				
				//Ligamos el boton cancelar al evento click para eliminar la forma
				$cancelar_plugin.bind('click',function(){
					var remove = function() { $(this).remove(); };
					$('#forma-invordendev-overlay').fadeOut(remove);
				});
				
				$cerrar_plugin.bind('click',function(){
					var remove = function() { $(this).remove(); };
					$('#forma-invordendev-overlay').fadeOut(remove);
				});
			}
		}
	}
	
	
	
	
	$get_datos_grid = function(){
		var input_json = document.location.protocol + '//' + document.location.host + '/'+controller+'/getAllOrdenesDev.json';
		
		var iu = $('#lienzo_recalculable').find('input[name=iu]').val();
		
		$arreglo = {'orderby':'id','desc':'DESC','items_por_pag':10,'pag_start':1,'display_pag':10,'input_json':'/'+controller+'/getAllOrdenesDev.json', 'cadena_busqueda':$cadena_busqueda, 'iu':iu}
		
		$.post(input_json,$arreglo,function(data){
			//pinta_grid
			//$.fn.tablaOrdenable(data,$('#lienzo_recalculable').find('.tablesorter'),carga_formainvordendev00_for_datagrid00);
			
			//aqui se utiliza el mismo datagrid que prefacturas. Solo muesta icono de detalles, el de eliminar No
			$.fn.tablaOrdenablePrefacturas(data,$('#lienzo_recalculable').find('.tablesorter'),carga_formainvordendev00_for_datagrid00);
			
			//resetea elastic, despues de pintar el grid y el slider
			Elastic.reset(document.getElementById('lienzo_recalculable'));
		},"json");
	}
	
    $get_datos_grid();
});



