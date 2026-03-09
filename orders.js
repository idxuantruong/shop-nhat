const orders = JSON.parse(localStorage.getItem("orders")) || []
const orderList = document.getElementById("order-list")
console.log(orders)
orderList.innerHTML = ""
orders.forEach(order => {
    orderList.innerHTML += `
        <div style="border:1px solid #ccc; margin:20px; padding:10px">
            <h3>Khách:${order.customer.name}</h3>
            <p>Phone:${order.customer.phone}</p>
            <p>Địa chỉ:${order.customer.address}</p>
            <p>Tổng tiền:${order.total.toLocaleString()} VND</p>
        </div>
    `
})
