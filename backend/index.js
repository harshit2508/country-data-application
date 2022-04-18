const express = require("express")
const app = express()
const port = 8080
const countryDataRouter = require('./routes/countryDataController')

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            // access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.get("/hi", (req, res) => {
    res.json({message : "ok"})
})
  //http://localhost:8080/country?page=2&searchString=4&columnName=CAPITAL&order=DESC&listPerPage=5
app.use("/", countryDataRouter)

app.use((e, req, res, next) => {
    const statusCode = e.statusCode || 500
    console.error(e.message, e.stack)
    res.status(statusCode).json({message: e.message})
    return
})

app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port}`)
})