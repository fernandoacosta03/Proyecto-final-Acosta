
const listaProductos = document.querySelector(".lista-productos");
const itemsCarrito = document.querySelector(".items-carrito");
const vaciarCarritoBtn = document.querySelector(".vaciar-carrito");
const compraForm = document.querySelector(".compra-form");

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productos = [];

async function cargarProductos() {
    try {
        const response = await fetch('../data/productos.json');
        if (!response.ok) throw new Error('Error al cargar los productos');
        productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error(error);
    }
}

function mostrarProductos(productos) {
    productos.forEach((producto, index) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <p>Precio: $${producto.precio}</p>
        `;
        productoDiv.addEventListener("click", () => agregarAlCarrito(index));
        listaProductos.appendChild(productoDiv);
    });
}

function agregarAlCarrito(index) {
    carrito.push(productos[index]);
    actualizarStorage();
    mostrarCarrito();
    
    
    Toastify({
        text: `${productos[index].nombre} agregado al carrito`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "#7D1416",
            color: "#FFFFFF",
        }
    }).showToast();
}

function mostrarCarrito() {
    itemsCarrito.innerHTML = "";
    carrito.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.textContent = `${item.nombre} - $${item.precio}`;
        itemsCarrito.appendChild(itemDiv);
    });
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const totalDiv = document.createElement("div");
    totalDiv.textContent = `Total: $${total}`;
    itemsCarrito.appendChild(totalDiv);
}

vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    actualizarStorage();
    mostrarCarrito();
});

function actualizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

compraForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const nombre = document.querySelector(".nombre").value;
    const email = document.querySelector(".email").value;

    
    Swal.fire({
        title: '¡Gracias por tu compra!',
        text: `Gracias por tu compra, ${nombre}. El total a pagar es de $${total}.`,
        icon: 'success',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#7D1416'
    });

    carrito = [];
    actualizarStorage();
    mostrarCarrito();
});

function mostrarResumenCompra(mensaje) {
    const resumen = document.createElement("div");
    resumen.classList.add("resumen-compra");
    resumen.textContent = mensaje;
    document.body.appendChild(resumen);
}

cargarProductos();
mostrarCarrito();
