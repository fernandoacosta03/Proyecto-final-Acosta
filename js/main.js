

const productos = [
    { nombre: "Remera Skate 1", precio: 2500 },
    { nombre: "Remera Skate 2", precio: 3000 },
    { nombre: "Remera Skate 3", precio: 2700 },
    { nombre: "Tabla Skate 1", precio: 5000 },
    { nombre: "Tabla Skate 2", precio: 6000 },
    { nombre: "Collar 1", precio: 5500 },
    { nombre: "Collar 2", precio: 5500 },
    { nombre: "Collar 3", precio: 5500 },
];


const listaProductos = document.querySelector(".lista-productos")
const itemsCarrito = document.querySelector(".items-carrito")
const vaciarCarritoBtn = document.querySelector(".vaciar-carrito")
const compraForm = document.querySelector(".compra-form")

let carrito = JSON.parse(localStorage.getItem('carrito')) || []


productos.forEach((producto, index) => {
    const productoDiv = document.createElement("div")
    productoDiv.classList.add("producto")
    productoDiv.innerHTML = `<h3>${producto.nombre}</h3> <p>Precio: $${producto.precio}</p>`
    productoDiv.addEventListener("click", () => agregarAlCarrito(index))
    listaProductos.appendChild(productoDiv)
});


function agregarAlCarrito(index) {
    carrito.push(productos[index])
    actualizarStorage()
    mostrarCarrito()
}


function mostrarCarrito() {
    itemsCarrito.innerHTML = ""
    carrito.forEach((item, idx) => {
        const itemDiv = document.createElement("div")
        itemDiv.textContent = `${item.nombre} - $${item.precio}`
        itemsCarrito.appendChild(itemDiv)
    })
    const total = carrito.reduce((acc, item) => acc + item.precio, 0)
    const totalDiv = document.createElement("div")
    totalDiv.textContent = `Total: $${total}`
    itemsCarrito.appendChild(totalDiv)
}


vaciarCarritoBtn.addEventListener("click", () => {
    carrito = []
    actualizarStorage()
    mostrarCarrito()
});


function actualizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


compraForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const total = carrito.reduce((acc, item) => acc + item.precio, 0)
    const nombre = document.querySelector(".nombre").value
    const email = document.querySelector(".email").value
    
    const mensaje = `Gracias por tu compra, ${nombre}! El total a pagar es de $${total}.`
    mostrarResumenCompra(mensaje)
    carrito = []
    actualizarStorage()
    mostrarCarrito()
});


function mostrarResumenCompra(mensaje) {
    const resumen = document.createElement("div")
    resumen.classList.add("resumen-compra")
    resumen.textContent = mensaje
    document.body.appendChild(resumen)
}

mostrarCarrito()
