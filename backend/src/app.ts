import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import userRoutes from './modules/user/user.routes';
import { userSchemas } from './modules/user/user.schemas';
import fjwt from '@fastify/jwt'
import { cbtFormSchemas } from './modules/cbtForm/cbtForm.schemas';
import cbtFormRoutes from './modules/cbtForm/cbtForm.routes';




export const server = Fastify()

declare module "fastify"{
    export interface FastifyInstance{
        auth:any
    }
}

declare module "@fastify/jwt"{
    interface FastifyJWT{
        user:{
            "email":string,
            "name":string,
            "id":string,
        }
    }
}

server.decorate("auth",async(req:FastifyRequest,res:FastifyReply)=>{
    try {
        await req.jwtVerify()
    } catch (error) {
        return res.send(error)
    }
})


server.get('/healthcheck',async()=>{
    return{
        status:'ok'
    }
})

server.register(fjwt,{
    secret:"hakunamatata"
})

async function main(){

    for(const schema of [...userSchemas,...cbtFormSchemas]){
        server.addSchema(schema)
    }

    server.register(userRoutes,{
        prefix:'/api/users'
    })

    server.register(cbtFormRoutes,{
        prefix:"/api/cbtForm"
    })
    try {
        await server.listen({
            port:3000,
            host:"0.0.0.0"
        })
        console.log('SERVER READY ON PORT 3000');
    } catch (error) {
        console.log(error);
        process.exit(0)
        
    }
}

main()