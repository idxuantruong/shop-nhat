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

function showCheckout() {
    document.getElementById("checkout-form").style.display = "block"
}

function hideCheckout() {
    document.getElementById("checkout-form").style.display = "none"
}

function placeOrder() {
    const name = document.getElementById("customer-name").value
    const phone = document.getElementById("customer-phone").value
    const address = document.getElementById("customer-address").value

    if (!name || !phone || !address) {
        alert("Vui lòng nhập đầy đủ thông tin")
        return
    }

    const order = {
        customer: {
            name,
            phone,
            address
        },
        items: cart.filter(p => p.quantity > 0),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        date: new Date()
    }

    console.log(order)

    let orders = JSON.parse(localStorage.getItem("orders")) || []
    orders.push(order)
    localStorage.setItem("orders", JSON.stringify(orders))

    alert("Đặt hàng thành công")

    cart = cart.filter(p => p.quantity === 0)

    renderCart()
    hideCheckout()
}