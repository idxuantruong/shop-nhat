const products = [
    {
        id: 1,
        name: "Áo khoác",
        price: 500000,
        img: "img1.png"
    },
    {
        id: 2,
        name: "Giày Nike",
        price: 2000000,
        img: "img2.png"
    },
    {
        id: 3,
        name: "Túi xách",
        price: 1200000,
        img: "img3.png"
    },
    {
        id: 4,
        name: "Quần",
        price: 900000,
        img: "img4.png"
    },
    {
        id: 5,
        name: "Mũ",
        price: 100000,
        img: "img5.png"
    }
]

let cart = JSON.parse(localStorage.getItem("cart")) || []
renderCart()

function buyProduct(id) {
    const product = products.find(p => p.id === id)

    const item = cart.find(p => p.id === id)

    if (item) {
        item.quantity++
    } else {
        cart.push({
            ...product,
            quantity: 1
        })
    }

    renderCart()
}

function renderCart() {
    const cartList = document.getElementById("cart-list")

    cartList.innerHTML = ""
    cart.forEach(item => {
        cartList.innerHTML += `
        <div class="cart-item">
            <span>${item.name}</span>
            <button onclick="decrease(${item.id})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increase(${item.id})">+</button>
            <span>${(item.quantity * item.price).toLocaleString()}VND</span>
            <button onclick="removeItem(${item.id})">Remove</button>
        </div>
        `
    })

    updateTotal()
    localStorage.setItem("cart", JSON.stringify(cart))
}

function increase(id) {
    const item = cart.find(p => p.id === id)
    item.quantity++
    renderCart()
}

function decrease(id) {
    const item = cart.find(p => p.id === id)
    item.quantity--
    if (item.quantity < 0) {
        item.quantity = 0
    }
    renderCart()
}

function removeItem(id) {
    cart = cart.filter(p => p.id !== id)
    renderCart()
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    document.getElementById("total-price").innerText = "Tổng tiền: " + total.toLocaleString() + " VND"
}

const productList = document.getElementById("product-list")

products.forEach(p => {
    productList.innerHTML += `
        <div class="product">
            <img src="${p.img}">
            <h2>${p.name}</h2>
            <p>Giá: ${p.price.toLocaleString()}VND</p>
            <button onclick="buyProduct(${p.id})">Mua</button>
        </div>
        `
})