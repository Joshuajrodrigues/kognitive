import { FastifyInstance } from "fastify";
import {  loginHandler, registerUserHandler } from "./user.controlers";
import { $ref } from "./user.schemas";

async function userRoutes(server:FastifyInstance) {
    server.post('/',{
        schema:{
            body:$ref("createUserSchema"),
            response:{
                201:$ref("createUserSchemaResponse")
            }
        }
    },registerUserHandler)

    server.post('/login',{
        schema:{
            body:$ref("loginSchema"),
            response:{
                200:$ref("loginResponseSchema")
            }
        }
    },loginHandler)




}

export default userRoutes