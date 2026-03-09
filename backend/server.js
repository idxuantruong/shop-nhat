const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("./models/User")
const Product = require("./models/Product")

const jwt = require("jsonwebtoken")
const auth = require("./middleware/auth")
const admin = require("./middleware/admin")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch(err => {
        console.log(err)
    })

app.listen(5000, () => {
    console.log("Server started on port 5000")
})

app.get("/", (req, res) => {
    res.send("API running")
})

app.post("/register", async (req, res) => {

    const { username, password } = req.body

    const hash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        password: hash
    })

    await user.save()

    res.json({ message: "User created" })

})

app.post("/login", async (req, res) => {

    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        return res.status(400).json({ message: "Wrong password" })
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        "secretkey",
        { expiresIn: "1d" }
    )

    res.json({
        token
    })

})

app.get("/profile", auth, (req, res) => {

    res.json({
        message: "Profile data",
        user: req.user
    })

})

app.post("/products", auth, admin, async (req, res) => {

    const product = new Product(req.body)

    await product.save()

    res.json(product)

})

app.get("/products", async (req, res) => {

    const products = await Product.find()

    res.json(products)

})