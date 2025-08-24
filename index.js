import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { router } from "./routers/index.js"


const corsOptions = {
    origin:[
        "http://localhost:5173"
    ]
}


const app  = express()

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(router)

app.listen(3000, () => {
})