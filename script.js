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

function buyProduct(id) {
    const product = products.find(p => p.id === id)
    alert("Bạn đã mua " + product.name)
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