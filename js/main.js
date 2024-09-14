alert("Su limite de compra son $60000 pesos");

function comprarProducto() {
  
  let nombreProducto = prompt("¿Que producto quieres comprar?");
  let precio = prompt("¿Cuanto cuesta " + nombreProducto + "?");

  
  if (isNaN(precio) || precio <= 0) {
      alert("El precio ingresado no es valido. Intantalo de nuevo");
      return comprarProducto(); 
  }

  alert("Has añadido " + nombreProducto + " al carrito por $" + precio);
  return Number(precio); 
}

let continuarComprando = true; 

while (continuarComprando) {
  
  let totalGasto = 0;
  const limiteGasto = 60000; 
  let cantidadProductos = prompt("¿Cuantos productos quieres comprar?");
  cantidadProductos = parseInt(cantidadProductos);

  
  if (isNaN(cantidadProductos) || cantidadProductos <= 0) {
      alert("Debes ingresar un número valido de productos");
  } else {
     
      for (let i = 0; i < cantidadProductos; i++) {
          let precioProducto = comprarProducto(); 

          totalGasto += precioProducto; 

          
          if (totalGasto > limiteGasto) {
              alert("Has excedido el limite de gasto de $" + limiteGasto + ". ¡Cuidado con tus compras!");
              break; 
          } else if (totalGasto === limiteGasto) {
              alert("Has alcanzado el límite de gasto de $" + limiteGasto + ". No puedes gastar mas");
              break;
          } else {
              alert("Llevas un total gastado de $" + totalGasto + ". Puedes seguir comprando");
          }
      }

      
      alert("El total de tu compra es: $" + totalGasto);
  }

  
  let respuesta = prompt("¿Quieres hacer otra compra? (si/no)").toLowerCase();

  if (respuesta !== "si") {
      continuarComprando = false;
      alert("Gracias por comprar. ¡Hasta la proxima!");
  }
}

