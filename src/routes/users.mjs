import { Router } from "express";
import { mockData } from "../constants/data.mjs";
import {query,validationResult,checkSchema,matchedData} from "express-validator"
import { createUserValidation } from "../utils/validationSchemas.mjs";
import { checkUser } from "../middlewares/middlewares.mjs";

const router=Router()

//Get request

router.get("/",(req,res)=>{
    res.send("Welcome to the home page")
})


router.get("/api/users",
[query('filter').isLength({min:3,max:32}).withMessage("length must be 5-32"),
query('value').isLength({min:3,max:32}).withMessage("length must be 5-32")]
,(req,res)=>{
    
    const {query:{filter,value}}=req
    if(filter && value) {
        const result=validationResult(req)
        if(result.isEmpty()){
            const filteredUser=mockData.filter(user=>user[filter].includes(value))
            if(filteredUser.length===0){
               return res.status(404).send({error:"No users found matching the criteria."})
            }
            return res.status(200).send(filteredUser)
        }else{
            return res.status(400).send({errors:result.array()})
        }
    }
    return res.status(200).send(mockData)
})

router.get("/api/users/:id",(req,res)=>{
    const {params:{id}}=req
    const parsedId=Number(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
    const findUser=mockData.find(user=>user.id===parsedId)
    if(!findUser)return res.send(404)
    res.status(200).send(findUser)
})

//post request

router.post("/api/users",checkSchema(createUserValidation),
(req,res)=>{
    const result=validationResult(req)
    if(!result.isEmpty()) return res.status(400).send({errors:result.array()})
    const data=matchedData(req)
    const newUser={id:mockData[mockData.length-1].id+1,...data}
    mockData.push(newUser)
    return res.status(201).send(newUser)
})

//Put request

router.put("/api/users/:id",checkUser,(req,res)=>{
    const {body,findIndexOfUser}=req
    mockData[findIndexOfUser]={id:mockData[findIndexOfUser].id,...body}
    res.sendStatus(200)
})

//Patch request

router.patch("/api/users/:id",checkUser,(req,res)=>{
    const {findIndexOfUser,body}=req
    mockData[findIndexOfUser]={...mockData[findIndexOfUser],...body}
    res.sendStatus(200)
})

//delete request

router.delete("/api/users/:id",checkUser,(req,res)=>{
    const {findIndexOfUser}=req
    mockData.splice(findIndexOfUser,1)
    res.sendStatus(204)
})




export default router