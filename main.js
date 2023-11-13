//Se guarda la fecha actual en la variable fecha.
let fecha = new Date();
//Se define el objeto Factura en el cual se almacenará los productos comprados por el usuario.
const factura = { fecha: fecha.toLocaleDateString() , cliente : '' , total:0, total_iva:0 , productos: [] , efectivo : 0 , cambio:0 };

// Se define los productos existentes en la tienda virtual con sus respectivos atributos.
const productos = [
  {
    id: 1,
    nombre: "Leche",
    precio: 3900,
  },
  {
    id: 2,
    nombre: "Pan",
    precio: 3500,
  },
  {
    id: 3,
    nombre: "Jamon",
    precio: 2300,
  },
  {
    id: 4,
    nombre: "Galletas",
    precio: 5000,
  },
  {
    id: 5,
    nombre: "Yogurt",
    precio: 4000,
  },
  {
    id: 6,
    nombre: "Carton De Huevos",
    precio: 17000,
  },
  {
    id: 7,
    nombre: "Helado",
    precio: 13500,
  },
  {
    id: 8,
    nombre: "Café",
    precio: 8900,
  },
  {
    id: 9,
    nombre: "Queso",
    precio: 10000,
  },
  {
    id: 10,
    nombre: "Mantequilla",
    precio: 13000,
  },
];

// Se llama a la función para que se ejcuete al iniciar el proyecto.
elegirProducto();

//Función para formatear los valores numericos a peso Colombiano.
function formatterPeso(value) {
  const result = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
  return result;
}

//Función para que el usuario elija los productos.
function elegirProducto() {
  let cadena = "Seleccione un producto \n";
// Función para llamar y concatenar el id y nombre del array de productos
  productos.forEach(function (producto) {
    cadena += producto.id + ". " + producto.nombre + "\n";
  });

  //se crea una variable en donde se almacena la opcion escogida por el usuario
  //se le pasa la variable cadena que creamo anteriormente
  let sProducto = parseInt(prompt(cadena));
  // se valida que el producto sea diferente de vacio 
  if (isNaN(sProducto) || sProducto == null || sProducto == " ") {
    alert("No ingreso un número de la lista de productos");
    elegirProducto();
  } else { 
    // se busca en el array de productos si existe el id que el usuario ha digitado
    let id = productos.find((producto) => producto.id == sProducto);
    if (id == undefined) {
      alert("El número ingresado no se encuentra dentro de la lista de productos");
      elegirProducto();
    } else {
        //se llama a la funcion y se le pasa el valor que selecciono el usuario
      calcularProducto(sProducto);
    }
  }
}
//Función para ingresar y calcular el precio de los productos ingresados por el cliente.
function calcularProducto(iProducto) {
  let iCantidad = 0;
  // se crea un do-while para que se muestre el prompt hasta que el usuario ingrese un valor valido
  do {
    iCantidad = parseInt(
      prompt("Ingrese la cantidad que desea llevar del producto")
    );
//Validación de datos erroneos ingresados por el cliente.
  } while (
    isNaN(iCantidad)  ||
    iCantidad == null ||
    iCantidad == " "  ||
    iCantidad <= 0
  );
//Función comparadora para traer el valor ingresado por el cliente de la variable producto.
  let producto = productos.filter((producto) => producto.id == iProducto);
//Función para calcular el precio total de cada produto segun la cantidad ingresada.
  const precioProducto = producto[0].precio * iCantidad;
//Función para  agregar el iva a los productos
  let iva = precioProducto * 0.19;
  let iva19 = precioProducto - iva;
  factura.total += precioProducto;
  factura.total_iva += iva;
 //Función para agregar los atributos de nombre,cantidad,precio total,iva y producto mas iva a la factura. 
  factura.productos.push({
    nombre: producto[0].nombre,
    valor_Unitario: producto[0].precio,
    cantidad: iCantidad,
    precio_Total: precioProducto,
    valor_Iva: iva,
    precio_Sin_Iva: iva19,
  });
//Validación de agregar mas productos.
  if (confirm("Selecciona aceptar si deseas agregar mas productos?")) {
    elegirProducto();
  } else {
    let nombre = prompt("Digite su nombre"); 
    factura.cliente = nombre;
    validarEfectivo();
  }
}
//Función de validación de efectivo ingresado por el cliente
function validarEfectivo() {
    alert("El valor e su factura es: " + formatterPeso(factura.total))
    let efectivo = parseFloat(prompt("Digite el efectivo con el cual va a cancelar la compra"));
    if(efectivo < factura.total){
        alert("Dinero insuficiente")
        validarEfectivo();
    }else{
        let cambio = efectivo-factura.total;
        factura.cambio = cambio;
        factura.efectivo=efectivo;
        totalCompra();
    }
    
}
//Funcion para crear una tabla y llenarla con los porudctos adquiridos por el usuario
function totalCompra() {
    console.log(factura);
  document.write("<h2>RESUMEN COMPRA</h2> <br>");
  document.write('<div class="fila"><h4>Fecha : '+factura.fecha +'</h4><h4>Cliente : '+factura.cliente +'</h4></div><div class="fila"><h4>Efectivo : '+formatterPeso(factura.efectivo) +'</h4><h4>Cambio : '+formatterPeso(factura.cambio) +'</h4></div> <table><thead><tr><th>Producto</th><th>V/Unidad</th><th>Cantidad</th><th>Valor</th></tr></thead><tbody id="bodyFactura">');

  let body = "";
  let body2 = "";

  // se recorren lo diferentes productos para colocarlos en la tabla de productos e iva 

  factura.productos.forEach(function (producto) {
    body += "<tr><td>" + producto.nombre + "</td><td>" +
    formatterPeso(producto.valor_Unitario) +    "</td><td>" +
    producto.cantidad + "</td><td>" +
    formatterPeso(producto.precio_Total) +  "</td></tr>";

    body2 += "<tr><td>" +  producto.nombre + "</td><td>" + formatterPeso(producto.precio_Total) + "</td><td>" + formatterPeso(producto.precio_Sin_Iva) + "</td><td>" + formatterPeso(producto.valor_Iva) + "</td></tr>"; 

});

  document.write(body+'</tbody><tfoot><tr><th colspan="3">Total</th><td id="totalFactura">' + 
  formatterPeso(factura.total)+"</td></tr></tfoot></table>");

  document.write("<h2>RESUMEN IMPUESTOS</h2>");
  document.write('<table><thead><tr><th>Producto</th><th>V/Total</th><th>Base</th><th>Iva</th></tr></thead><tbody id="bodyImpuestos">'+body2+'</tbody><tfoot><tr><th colspan="3">Total</th><td id="totalFactura">' + formatterPeso(factura.total_iva)+ "</td></tr></tfoot></table>");
}
