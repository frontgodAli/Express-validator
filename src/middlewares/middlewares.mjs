import { mockData } from "../constants/data.mjs"


export function checkUser(req,res,next){
    const {params:{id}}=req
    const parsedId=Number(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
    const findIndexOfUser=mockData.findIndex(user=>user.id===parsedId)
    if(findIndexOfUser===-1) return res.sendStatus(404)
    req.findIndexOfUser=findIndexOfUser
    next()
}