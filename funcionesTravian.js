function PresentarTabla () {
	var velocidadesTropas = [3,4,5,6,7,9,10,13,14,16,17,19];
	
	var tipoServer = parseInt(document.getElementById("Server").value);
	var velocidadServer = parseInt(document.getElementById("Velocidad").value);
	var coordX1 = parseInt(document.getElementById("CoordX1").value);
	var coordY1 = parseInt(document.getElementById("CoordY1").value);
	var coordX2 = parseInt(document.getElementById("CoordX2").value);
	var coordY2 = parseInt(document.getElementById("CoordY2").value);
	var botas = parseFloat(document.getElementById("Botas").value);
	var AtaqueHora = parseInt(document.getElementById("Horas").value);
	var AtaqueMinuto = parseInt(document.getElementById("Minutos").value);
	var AtaqueSegundo = parseInt(document.getElementById("Segundos").value);
	var IntervaloHora = parseInt(document.getElementById("IntervaloH").value);
	var IntervaloMinuto = parseInt(document.getElementById("IntervaloM").value);
	var IntervaloSegundo = parseInt(document.getElementById("IntervaloS").value);
	var Artefacto = parseFloat(document.getElementById("Artefacto").value);

	if (tipoServer == 1) {
		var velocidadesPlazaT = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
	} else {
		var velocidadesPlazaT = [10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50];
	}

	if (velocidadServer !== 1) {
		for (var i = 0; i < velocidadesTropas.length; ++i) 
			velocidadesTropas[i] *= 2;
	}

	for (var i = 0; i < velocidadesTropas.length; ++i)
		velocidadesTropas[i] *= Artefacto;

	if ((Math.abs(coordX1) + Math.abs(coordX2) > 400) && (coordX1 < 0 && coordX2 > 0 || coordX1 > 0 && coordX2 < 0)) {
		if (coordX1 < 0) {
			coordX1 = 801 + coordX1;
		} else {
			coordX2 = 801 + coordX2;
		}
	}

	if ((Math.abs(coordY1) + Math.abs(coordY2) > 400) && (coordY1 < 0 && coordY2 > 0 || coordY1 > 0 && coordY2 < 0)) {
		if (coordY1 < 0) {
			coordY1 = 801 + coordY1;
		} else {
			coordY2 = 801 + coordY2;
		}
	}

	var distancia = Math.sqrt(Math.pow(coordX1 - coordX2,2) + Math.pow(coordY1 - coordY2,2));

	var NAtaqueInicio = Sumar_Tiempo(AtaqueHora,AtaqueMinuto,AtaqueSegundo,IntervaloHora,IntervaloMinuto,IntervaloSegundo);
	var NAtaqueActual = Sumar_Tiempo(AtaqueHora,AtaqueMinuto,AtaqueSegundo);

	for (var i = 0; i < velocidadesPlazaT.length; ++i)
		velocidadesPlazaT[i] += botas/10;

	var tablaResultante = new Array(velocidadesTropas.length);

	for (var i = 0; i < velocidadesTropas.length; ++i) {
		tablaResultante[i] = new Array(velocidadesPlazaT.length);
		for (var j = 0; j < velocidadesPlazaT.length; ++j) {
			var tiempo = (distancia > 20) ? ((20 + (distancia - 20)/(velocidadesPlazaT[j]/10))/24)/velocidadesTropas[i] : distancia/24/velocidadesTropas[i];
			tablaResultante[i][j] = tiempo;
		}
	}

	tabla = Mostrar_Tabla(tablaResultante, NAtaqueInicio, NAtaqueActual);

	document.getElementById("tabla").innerHTML = tabla;

	return false;
}

function mostrarR (v) {
	var text = '';
	for (var i = 0; i < v.length; ++i) {
		text += v[i] + ", ";
	}
	alert(text);
}

function Sumar_Tiempo (AtaqueHora, AtaqueMinuto, AtaqueSegundo, IntervaloHora, IntervaloMinuto, IntervaloSegundo) {
	IntervaloSegundo = (!isNaN(IntervaloSegundo)) ? IntervaloSegundo : 0;
	IntervaloMinuto = (!isNaN(IntervaloMinuto)) ? IntervaloMinuto : 0;
	IntervaloHora = (!isNaN(IntervaloHora)) ? IntervaloHora : 0;

	var segundos = AtaqueSegundo + IntervaloSegundo;
	var minutos = AtaqueMinuto + IntervaloMinuto;
	var horas = AtaqueHora + IntervaloHora;

	if (segundos > 59) {
		minutos += parseInt(segundos/60);
		segundos = segundos % 60;
	}
	if (minutos > 59) {
		horas += parseInt(minutos/60);
		minutos = minutos % 60;
	}

	return Convertir_a_Numero(horas,minutos,segundos);
}

function Mostrar_Tabla (tablaResultante, NAtaqueInicio, NAtaqueActual) {
	var t = "<table border='1'><tr><td></td>";

	for (var i = 0; i < tablaResultante[0].length; ++i) {
		t += "<td><b>PT " + i + "</b></td>";
	} 
	t += "</tr>";

	for (var i = 0; i < tablaResultante.length; ++i) {
		t += "<tr>";
		switch (i) {
			case 0: t += "<td><b>CATA</b></td>"; break;
			case 1: t += "<td><b>CARNERO-SENADOR-CABECILLA</b></td>"; break;
			case 2: t += "<td><b>PRETO-COLONO-CACIQUE</b></td>"; break;
			case 3: t += "<td><b>LEGIO-HACHA-ESPADA</b></td>"; break;
			case 4: t += "<td><b>IMPERANO-PORRA-LANZA-FALA</b></td>"; break;
			case 5: t += "<td><b>EMISARIO-TEUTON</b></td>"; break;
			case 6: t += "<td><b>CAESARI-PALADIN</b></td>"; break;
			case 7: t += "<td><b>JINETE EDUO </b></td>"; break;
			case 8: t += "<td><b>IMPERATORI</b></td>"; break;
			case 9: t += "<td><b>JINETE DRUIDA-LEGATI</b></td>"; break;
			case 10: t += "<td><b>BATIDOR </b></td>"; break;
			case 11: t += "<td><b>RAYO</b></td>"; break;
			default:;
		}

		for (var j = 0; j < tablaResultante[i].length; ++j) {
			t += "<td class='";
			if (tablaResultante[i][j] >= NAtaqueInicio)
				t += "PosibleAtaque"; 
			else if (tablaResultante[i][j] <= NAtaqueInicio && tablaResultante[i][j] >= NAtaqueActual)
				t += "CriticoAtaque";
			t += " Ataque'>"+ Convertir_a_Tiempo(tablaResultante[i][j]) + "</td>";
		}
		t += "</tr>";
	}
	t += "</table>";
	
	return t;
} 

function Convertir_a_Tiempo (tiempo) {
	tiempo *= 24;

	var t = parseInt(tiempo);
	tiempo -= t;
	if (t < 10)
		t = "0" + t;
	var hora = t;
	for (var i = 0; i < 2; ++i) {
		tiempo *= 60;
		t = parseInt(tiempo);
		tiempo -= t;
		if (t < 10)
			t = "0" + t; 
		hora += ":" + t;
	}
	return hora;
}

function Convertir_a_Numero(horas, minutos, segundos) {
	var resultado = segundos / 60;
	resultado = (resultado + minutos)/60;
	resultado = (resultado + horas)/24;
	return resultado;
}