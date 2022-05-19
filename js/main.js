window.addEventListener('load', function () {
    /* ---------------------Declaración de Variables ------------------------------ */
    const form = document.forms[0];
    let now = new Date();
    let fecha = now.getDate() + '/' + (now.getMonth() + 1) + '' + now.getFullYear();
    let minutos = now.getMinutes()
    if(minutos<10) minutos="0"+minutos;
    let hora = now.getHours() + ':' + minutos;
    let fechayHora = fecha + ' ' + hora;
    const url = 'https://prod-23.brazilsouth.logic.azure.com:443/workflows/173e479768634895b9603f0acaa8927f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=9z6PMT_1dXq1JSpLLW3S1bRKjCrPq-B4Sy84LsvaLzc';
    var data = {};
    /*-------------------------------------------------------------------------------------------- */
    /*                                       Enviar Peticion                                       */
    /*-------------------------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
          event.preventDefault();
          console.log(validaciones());
          if (!validaciones()) return false;
          if(c_requerimiento.value == "Reclamo - Producto No Conforme"){
            data = {
              fecha: fechayHora,
              nombre: nombre.value,
              correo: correo.value,
              ID: ID.value,
              NID: NID.value,
              departamento: departamento.value,
              municipio: municipio.value,
              direccion: direccion.value,
              c_requerimiento: c_requerimiento.value,
              equipos: equipos.value,
              serial: serial.value,
              detalle: detalle_requerimiento.value,
              tipo_cliente: tipo_cliente.value,
              fecha_compra: fecha_compra.value,
              telefono: telefono.value,
              politica: politica.checked,
              archivo: archivo,
              linea: "RoyalCondor"
            }
          }else{
            data = {
              fecha: fechayHora,
              nombre: nombre.value,
              correo: correo.value,
              ID: ID.value,
              NID: NID.value,
              departamento: departamento.value,
              municipio: municipio.value,
              direccion: direccion.value,
              c_requerimiento: c_requerimiento.value,
              equipos: "",
              fecha_compra: "",
              serial: "",
              detalle: detalle_requerimiento.value,
              telefono: telefono.value,
              tipo_cliente: tipo_cliente.value,
              politica: politica.checked,
              archivo: "",
              linea: "RoyalCondor"
            }
          }
        
        const settings = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(data);
        cargando();
        enviarPeticion(settings);
    })

    function enviarPeticion(settings) {
        fetch(url, settings)
        .then(response => {
            console.log(response);
            document.getElementById("headermensaje").style.background = '#6EF05F';
            document.getElementById('titulomensaje').innerHTML='Realizado';
            document.getElementById('mensaje').innerHTML='Se realizó correctamente su registro.';  
            document.getElementById("formulario").reset();
            $(".custom-file-label").addClass("selected").html("Choose File");
            archivo = [];
            return response.json
            
        })
        .catch(err => {
            console.log("Promesa Rechazada");
            console.log(err);
            document.getElementById("headermensaje").style.background = '#ff3c37';
            document.getElementById('titulomensaje').innerHTML='ERROR';
            document.getElementById('mensaje').innerHTML='Algo salio mal.... Recargue la pagina e intete nuevamente<br>' + err;
        })
    }
})
function saveFile(f) {
  const file = f.files[0];
  console.log(file.stream());
  const fr = new FileReader();
  fr.addEventListener("load", function () {
    let contenido = fr.result.split(",");
    const obj = {
      filename: file.name,
      mimeType: file.type,
      contenido: {
        "$content-type" : file.type,
        "$content" : contenido[1]
      }
    };
    archivo.push(obj);
    
  }, false);

  if (file) {
    fr.readAsDataURL(file);
  }
  console.log(archivo)
}

      // Add the following code if you want the name of the file appear on select
      $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
      });

      var script_url = "https://script.google.com/a/progen.com.co/macros/s/AKfycbwLzA5nDkqeOKCvqmL05rBWxMfg1ASgcsxU77Gr/exec";

      $(document).ready(function (json) {
        var url = script_url + "?action=read";
        $.getJSON(url, function (json) {
          var listID = "<option disabled selected>Selecciona una opción</option>";
          var listDep = "<option disabled selected>Selecciona una opción</option>";
          var listCat = "<option disabled selected>Selecciona una opción</option>";
          var listEquipo = "<option disabled selected>Selecciona una opción</option>";
          var listCliente = "<option disabled selected>Selecciona una opción</option>";
          
          for (var i = 0; i < json.records.length; i++) {
            if (json.records[i].Identificacion != '') {
              listID += "<option value='" + json.records[i].Identificacion + "'>" + json.records[i].Identificacion + "</option>";
            }
          }
          for (var i = 0; i < json.records.length; i++) {
            if (json.records[i].Departamento != '') {
              listDep += "<option value='" + json.records[i].Departamento + "'>" + json.records[i].Departamento + "</option>";
            }            
          }
          for (var i = 0; i < json.records.length; i++) {
            if (json.records[i].Requerimiento != '') {
              listCat += "<option value='" + json.records[i].Requerimiento + "'>" + json.records[i].Requerimiento + "</option>";
            } 
          }
          for (var i = 0; i < json.records.length; i++) {
            if (json.records[i].Equipos != '') {
              listEquipo += "<option value='" + json.records[i].Equipos + "'>" + json.records[i].Equipos + "</option>";
            }            
          }
          for (var i = 0; i < json.records.length; i++) {
            if (json.records[i].Tipo_cliente != '') {
              listCliente += "<option value='" + json.records[i].Tipo_cliente + "'>" + json.records[i].Tipo_cliente + "</option>";
            }            
          }

          console.log(listCliente)
          $("#ID").html(listID);
          $("#Departamento").html(listDep);
          $("#categoria_requerimiento").html(listCat);
          $("#Equipos").html(listEquipo);
          $("#t_cliente").html(listCliente);
        });
      });