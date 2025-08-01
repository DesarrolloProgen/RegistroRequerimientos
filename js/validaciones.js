/* ------------------------------------------------------------------------------------- */
/*                                       VARIABLES                                       */
/* ------------------------------------------------------------------------------------- */
const form = document.forms[0];
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const ID = document.getElementById("ID");
const NID = document.getElementById("NID");
const departamento = document.getElementById("Departamento");
const municipio = document.getElementById("municipio");
const direccion = document.getElementById("direccion");
const c_requerimiento = document.getElementById("categoria_requerimiento");
const equipos = document.getElementById("Equipos");
const equiposInternacionales = document.getElementById(
  "EquiposInternacionales"
);
const serial = document.getElementById("serial");
const detalle_requerimiento = document.getElementById("detalle_requerimiento");
const tipo_cliente = document.getElementById("t_cliente");
const fecha_compra = document.getElementById("fecha_compra");
const telefono = document.getElementById("telefono");
const file = document.getElementById("customFile");
const politica = document.getElementById("politica");
const buttonSubmit = document.getElementById("boton");
const punto_venta = document.getElementById("punto_venta");
const pais = document.getElementById("pais");
const linea_comercial = document.getElementById("linea_comercial");
const mayorista = document.getElementById("mayorista");

const mayoristasPorDepartamento = [
  { mayorista: "Agomark", departamentos: ["Tolima"] },
  { mayorista: "Agroinfesa", departamentos: ["Bogotá D.C.", "Cundinamarca"] },
  {
    mayorista: "Agrointegral Andina S.A.",
    departamentos: [
      "Amazonas",
      "Bogotá D.C.",
      "Boyacá",
      "Caldas",
      "Cundinamarca",
      "Nariño",
      "Putumayo",
      "Quindío",
      "Risaralda",
      "Valle del Cauca",
    ],
  },
  { mayorista: "Agromark", departamentos: ["Huila"] },
  { mayorista: "Alma G SAS / Globalagro", departamentos: ["Caquetá", "Meta"] },
  { mayorista: "Argoz SAS", departamentos: ["Córdoba", "Sucre"] },
  { mayorista: "Arkatec SAS", departamentos: ["Boyacá"] },
  { mayorista: "Cadefihuila", departamentos: ["Huila"] },
  { mayorista: "Cafenorte", departamentos: ["Valle del Cauca"] },
  {
    mayorista: "Coacosta",
    departamentos: ["Atlántico", "Bolívar", "Cesar", "La Guajira", "Magdalena"],
  },
  { mayorista: "Coagrohuila", departamentos: ["Huila"] },
  { mayorista: "Codegar", departamentos: ["Risaralda"] },
  { mayorista: "Comité de Cafeteros de Caldas", departamentos: ["Caldas"] },
  { mayorista: "Comité de Cafeteros del Quindío", departamentos: ["Quindío"] },
  { mayorista: "Coocentral", departamentos: ["Huila"] },
  {
    mayorista: "Cooperativa de Caficultores de Risaralda",
    departamentos: ["Risaralda"],
  },
  { mayorista: "Cosechar", departamentos: ["Casanare"] },
  { mayorista: "Fumiagro", departamentos: ["Tolima"] },
  { mayorista: "Fumigadoras del Oriente", departamentos: ["Meta"] },
  {
    mayorista: "Grupo Mi Corral",
    departamentos: ["Atlántico", "Bolívar", "Cesar", "La Guajira", "Magdalena"],
  },
  {
    mayorista: "MP Galagro SAS",
    departamentos: ["Antioquia", "Boyacá", "Chocó", "Córdoba", "Sucre"],
  },
  { mayorista: "Multiagro", departamentos: ["Cauca"] },
  {
    mayorista: "PROGEN - Directo",
    departamentos: ["Chocó", "Guainía", "Guaviare", "Meta", "Vaupés"],
  },
  { mayorista: "Sagrinco SAS", departamentos: ["Antioquia"] },
  {
    mayorista: "Superagro",
    departamentos: [
      "Arauca",
      "Bolívar",
      "Boyacá",
      "Cesar",
      "Norte de Santander",
      "Santander",
    ],
  },
  { mayorista: "Vitagro", departamentos: ["Bogotá D.C.", "Cundinamarca"] },
];
let archivo = [];
let archivoFactura = [];

/* ------------------------------------------------------------------------------------- */
/*                                       VALIDACIONES                                    */
/* ------------------------------------------------------------------------------------- */

function validar_email(email) {
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email) ? true : false;
}

function validaciones() {
  /* Tipo de Cliente */
  if (
    tipo_cliente.value == "Selecciona una opción" ||
    tipo_cliente.value == ""
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Seleccione el tipo de Cliente";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Nombre del Usuario */

  if (nombre.value == null || nombre.value == "") {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "No se lleno el campo nombre";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Correo del Usuario */
  console.log(validar_email(correo.value));
  if (
    correo.value == null ||
    correo.value == "" ||
    validar_email(correo.value) == false
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "El correo es incorrecto. Se necesita la siguiente estructura: example@example.com";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Tipo de Identificación */

  if (ID.value == "Selecciona una opción" || ID.value == "") {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Seleccione un tipo de identificacion";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Numero de Identificación */

  if (NID.value == null || NID.value == "" || isNaN(parseInt(NID.value))) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "No ingreso un numero de Identificación (Solo se aceptan numeros)";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Telefono usuario */

  if (
    telefono.value == null ||
    telefono.value == "" ||
    isNaN(parseInt(telefono.value))
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "No ingreso un numero de telefono (Solo se aceptan numeros)";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Departamento */

  if (
    tipo_cliente.value != "Mercados Internacionales" &&
    departamento.value == "Selecciona una opción"
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML = "Seleccione un departamento";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Departamento */

  if (
    tipo_cliente.value == "Mercados Internacionales" &&
    pais.value == "Selecciona una opción"
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML = "Seleccione un departamento";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Municipio */

  if (municipio.value == "" || municipio.value == null) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML = "Escriba un municipio";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  if (
    tipo_cliente.value === "Distribuidor Autorizado" &&
    departamento.value !== "Selecciona una opción" &&
    mayorista.value === "Selecciona una opción"
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML = "Seleccione un Mayorista";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Dirección */

  if (direccion.value == "" || direccion.value == null) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML = "Escriba una dirección";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /* Clase de requerimiento */

  if (
    c_requerimiento.value == "Selecciona una opción" ||
    c_requerimiento.value == null
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Seleccione un tipo de requerimiento";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  } else {
    if (c_requerimiento.value == "Reclamo / Producto No Conforme") {
      /*Equipos del reclamo */

      if (
        (t_cliente.value != "Mercados Internacionales" &&
          equipos.value == "Selecciona una opción") ||
        equipos.value == null
      ) {
        document.getElementById("headermensaje").style.background = "#ff3c37";
        document.getElementById("titulomensaje").innerHTML = "ERROR";
        document.getElementById("mensaje").innerHTML = "Seleccione un Equipo";
        $(".custom-file-label").addClass("selected").html("Choose File");
        return false;
      }

      if (
        (t_cliente.value === "Mercados Internacionales" &&
          equiposInternacionales.value == "Selecciona una opción") ||
        equiposInternacionales.value == null
      ) {
        document.getElementById("headermensaje").style.background = "#ff3c37";
        document.getElementById("titulomensaje").innerHTML = "ERROR";
        document.getElementById("mensaje").innerHTML = "Seleccione un Equipo";
        $(".custom-file-label").addClass("selected").html("Choose File");
        return false;
      }

      if (equipos.value != "Accesorios" && equipos.value != "Repuestos") {
        /* Serial del equipo */
        // if (serial.value == "" || serial.value == null) {
        //   document.getElementById("headermensaje").style.background = "#ff3c37";
        //   document.getElementById("titulomensaje").innerHTML = "ERROR";
        //   document.getElementById("mensaje").innerHTML = "Escriba un serial";
        //   $(".custom-file-label").addClass("selected").html("Choose File");
        //   return false;
        // }
      }

      /*Fecha de Compra del equipo */

      if (fecha_compra.value == "" || fecha_compra.value == null) {
        document.getElementById("headermensaje").style.background = "#ff3c37";
        document.getElementById("titulomensaje").innerHTML = "ERROR";
        document.getElementById("mensaje").innerHTML =
          "seleccione una fecha de compra    ";
        $(".custom-file-label").addClass("selected").html("Choose File");
        return false;
      }

      if (punto_venta.value == "" || punto_venta.value == null) {
        document.getElementById("headermensaje").style.background = "#ff3c37";
        document.getElementById("titulomensaje").innerHTML = "ERROR";
        document.getElementById("mensaje").innerHTML =
          "ingrese el Almacén o punto de Venta donde adquirió el equipo";
        $(".custom-file-label").addClass("selected").html("Choose File");
        return false;
      }

      /* Archivos */

      if (file.value == null || file.value == "") {
        archivo = "";
      }
    } else if (
      c_requerimiento.value != "Felicitación" &&
      (linea_comercial.value == "Selecciona una opción" ||
        linea_comercial.value == null)
    ) {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Ingrese la linea comercial";
      $(".custom-file-label").addClass("selected").html("Choose File");
      return false;
    }
  }

  /*Detalle del requerimiento */

  if (
    detalle_requerimiento.value == "" ||
    detalle_requerimiento.value == null
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Escriba el detalle de su requerimiento";
    $(".custom-file-label").addClass("selected").html("Choose File");
    return false;
  }

  /*Politica de tratamiento de Datos */
  return true;
}

/* ------------------------------------------------------------------------------------- */
/*                                 FUNCIONES ONCHANGE                                    */
/* ------------------------------------------------------------------------------------- */

function ticketOnchange(sel) {
  divGarantia = document.getElementById("divLineaComercial");
  divLineaComercial = document.getElementById("seccion_garantia");
  divArchivos = document.getElementById("archivos");

  let info = "<span>" + sel.value + ": </span>";
  descripcionCategoria = {
    Petición:
      "La petición es una solicitud para que se realicen algún tipo de acción o simplemente solicitar cierta información.",
    Queja:
      "Es la inconformidad sobre algún proceso administrativo o comercial, área de la organización o persona.",
    Reclamo:
      "Inconformidad ocasionado por fallas en el Producto o la mala prestación de un servicio.",
    Solicitud:
      "Propuesta o recomendación del cliente para mejorar el servicio o producto.",
    Felicitación:
      "Comunicación positiva frente a los productos y/o servicios ofrecidos, también por la atención brindada por un colaborador.",
  };
  if (sel.value == "Reclamo / Producto No Conforme") {
    divGarantia.style.display = "none";
    divArchivos.style.display = "";
    divLineaComercial.style.display = "";
    info += descripcionCategoria["Reclamo"];
    document.getElementById("helpCategoria").innerHTML = info;
  } else if (sel.value == "Felicitación") {
    divLineaComercial.style.display = "none";
    divArchivos.style.display = "none";
    divGarantia.style.display = "none";
    info += descripcionCategoria[sel.value];
    document.getElementById("helpCategoria").innerHTML = info;
  } else if (sel.value == "Queja") {
    divGarantia.style.display = "";
    divLineaComercial.style.display = "none";
    divArchivos.style.display = "";
    info += descripcionCategoria[sel.value];
    document.getElementById("helpCategoria").innerHTML = info;
  } else {
    divLineaComercial.style.display = "none";
    divArchivos.style.display = "none";
    divGarantia.style.display = "";
    info += descripcionCategoria[sel.value];
    document.getElementById("helpCategoria").innerHTML = info;
  }
  document.getElementsByClassName("helpCategoria")[0].style.display = "";
}

function equipoOnchange(seleccion) {
  divSerial = document.getElementById("serialEquipo");
  if (seleccion.value == "Accesorios" || seleccion.value == "Repuestos") {
    divSerial.style.display = "none";
  } else {
    divSerial.style.display = "";
  }
}

function cargando() {
  document.getElementById("headermensaje").style.background = "#4040ff";
  document.getElementById("titulomensaje").innerHTML = "Cargando";
  document.getElementById("mensaje").innerHTML =
    '<img src="https://acegif.com/wp-content/uploads/loading-25.gif" alt="Cargando" width="50px" height="50px"><span style="padding-left: 10px">Cargando...</span>';
}

function tipoClienteOnchange(seleccion) {
  divexportacions = document.getElementById("exportaciones");
  divDepartamento = document.getElementById("Depart");
  divEquipos = document.getElementById("divEquipos");
  divEquiposInternacionales = document.getElementById(
    "divEquiposInternacionales"
  );
  if (seleccion.value == "Mercados Internacionales") {
    divexportacions.style.display = "";
    divDepartamento.style.display = "none";
    divEquiposInternacionales.style.display = "";
    divEquipos.style.display = "none";
  } else {
    divexportacions.style.display = "none";
    divDepartamento.style.display = "";
    divEquiposInternacionales.style.display = "none";
    divEquipos.style.display = "";
  }
  const seccionMayorista = document.getElementById("seccion_mayoristas");
  if (seleccion.value !== "Distribuidor Autorizado") {
    seccionMayorista.style.display = "none";
  }
}

function departamentoOnchange(seleccion) {
  var tipo_cliente = document.getElementById("t_cliente");

  if (tipo_cliente.value === "Distribuidor Autorizado") {
    const dep = seleccion.value;
    const mayoristaSelect = document.getElementById("mayorista");
    const seccionMayorista = document.getElementById("seccion_mayoristas");
    seccionMayorista.style.display = "";
    mayoristaSelect.innerHTML =
      "<option disabled selected>Selecciona una opción</option>";

    const mayoristas = mayoristasPorDepartamento
      .filter((m) => m.departamentos.includes(dep))
      .map((m) => m.mayorista);

    if (mayoristas.length === 1) {
      // Solo uno: selecciona automáticamente
      mayoristaSelect.innerHTML = `<option selected>${mayoristas[0]}</option>`;
      mayoristaSelect.disabled = true; // (Opcional) bloquear edición si solo hay uno
    } else if (mayoristas.length > 1) {
      // Varios: mostrar opciones
      mayoristaSelect.disabled = false;
      mayoristas.forEach((mayorista) => {
        const option = document.createElement("option");
        option.value = mayorista;
        option.textContent = mayorista;
        mayoristaSelect.appendChild(option);
      });
    } else {
      // Ninguno: deja la opción por defecto
      mayoristaSelect.disabled = true;
    }
  } else {
    const seccionMayorista = document.getElementById("seccion_mayoristas");
    seccionMayorista.style.display = "none";
  }
}
