import { FastifyReply, FastifyRequest } from "fastify";
import { createUserInput, loginRequest } from "./user.schemas";
import { createUser, findUserByEmail } from "./user.services";
import bcrypt from "bcrypt";
import { server } from "../../app";
export const registerUserHandler = async (
  req: FastifyRequest<{
    Body: createUserInput;
  }>,
  res: FastifyReply
) => {
  const body = req.body;
  try {
    const {email} = req.body
    const exists = await findUserByEmail(email)
    if(exists){
        throw new Error("Email already in use");
    }
    const user = await createUser(body);
    return res.code(201).send(user);
  } catch (error) {
    return res.code(500).send(error);
  }
};

export const loginHandler = async (
  req: FastifyRequest<{
    Body: loginRequest;
  }>,
  res: FastifyReply
) => {
    const body = req.body
    const user = await findUserByEmail(body.email)
    if(!user){
        return res.code(401).send({
            message:"Invalid email or password"
        })
    }
    const correctPassword = await bcrypt.compare(body.password,user.password)

    if(correctPassword){
        const {password,...rest} = user
        return {accessToken:server.jwt.sign(rest)}
    }
    return res.code(401).send({
        message:"Invalid email or password"
    })
};

