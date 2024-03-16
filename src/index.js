import express from "express"
import {query,validationResult,matchedData,body,checkSchema} from "express-validator"
import { createUserValidation } from "./utils/validationSchemas.mjs"

const app=express()
app.use(express.json())
const PORT=process.env.PORT || 3000
const mockData=[
    {id:1,firstName:"ali",lastName:"hassi"},
    {id:2,firstName:"hamza",lastName:"dolla"},
    {id:3,firstName:"mahmoud",lastName:"driouich"},
    {id:4,firstName:"mostafa",lastName:"chaouf"},
    {id:5,firstName:"naoufal",lastName:"naciri"},
]


function middlewareReq(req,res,next){
    const {params:{id}}=req
    const parsedId=Number(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
    const findIndexOfUser=mockData.findIndex(user=>user.id===parsedId)
    if(findIndexOfUser===-1) return res.sendStatus(404)
    req.findIndexOfUser=findIndexOfUser
    next()
}

app.listen(PORT,()=>{
    console.log(`launched on ${PORT}`)
})

//Get request
app.get("/",(req,res)=>{
    res.send("Welcome to the home page")
})

app.get("/api/users",
(req,res)=>{
    const result=validationResult(req)
    if(!result.isEmpty()) return res.status(400).send({errors:result.array()})
    console.log(result)
    const {query:{filter,value}}=req
    if(filter && value) return res.send(mockData.filter(user=>user[filter].includes(value)))
    res.send(mockData)
})

app.get("/api/users/:id",(req,res)=>{
    const {params:{id}}=req
    const parsedId=Number(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
    const findUser=mockData.find(user=>user.id===parsedId)
    if(!findUser)return res.send(404)
    res.status(200).send(findUser)
})

//Post request

app.post("/api/users",checkSchema(createUserValidation),
(req,res)=>{
    const result=validationResult(req)
    console.log(result)
    if(!result.isEmpty()) return res.status(400).send({errors:result.array()})
    const matching=matchedData(req)
    const newUser={id:mockData[mockData.length-1].id+1,...matching}
    mockData.push(newUser)
    res.status(201).send(mockData)
})

//Put request


app.put("/api/users/:id",middlewareReq,(req,res)=>{
    const {body,findIndexOfUser}=req
    mockData[findIndexOfUser]={id:mockData[findIndexOfUser].id,...body}
    res.sendStatus(200)
})

//Patch request

app.patch("/api/users/:id",middlewareReq,(req,res)=>{
    const {findIndexOfUser,body}=req
    mockData[findIndexOfUser]={...mockData[findIndexOfUser],...body}
    res.sendStatus(200)
})

//delete request

app.delete("/api/users/:id",middlewareReq,(req,res)=>{
    const {findIndexOfUser}=req
    mockData.splice(findIndexOfUser,1)
    res.sendStatus(204)
})