import { FastifyInstance } from "fastify";
import { $ref } from "./cbtForm.schemas";
import { createCbtFormHandler, getUsersFormsHandler } from "./cbtForms.controlers";



async function cbtFormRoutes(server:FastifyInstance){
    server.post('/',{
        preHandler:[server.auth],
        schema:{
            body:$ref("createCbtForm"),
            response:{
                201:$ref("createCbtFormResponse")
            }
        }

    },createCbtFormHandler)

    server.post('/cbtforms',{
        preHandler:[server.auth],
        schema:{
            body:$ref("getUserCbtForms"),
            response:{
                200:$ref("getUserCbtFormsResponse")
            }
        }
    },getUsersFormsHandler)
    
}

export default cbtFormRoutes