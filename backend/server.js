const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()

const app = express()

app.use(cors())

// 👇 ต้องอยู่ตรงนี้
app.use(express.json())

// 👇 route ต้องอยู่หลัง json middleware
app.use("/api/auth", require("./routes/authRoutes"))

app.listen(5000, () => console.log("Server running"))