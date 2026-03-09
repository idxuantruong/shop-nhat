const orders = JSON.parse(localStorage.getItem("orders")) || []

const totalOrders = orders.length

const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.total
}, 0)

document.getElementById("total-orders").innerText =
    "Total orders: " + totalOrders

document.getElementById("total-revenue").innerText =
    "Total revenue: " + totalRevenue.toLocaleString() + " VND"