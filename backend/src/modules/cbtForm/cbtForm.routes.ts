import { FastifyInstance } from "fastify";
import { $ref } from "./cbtForm.schemas";
import { createCbtFormHandler } from "./cbtForms.controlers";



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

    
}

export default cbtFormRoutes