import prisma from "../../utils/prisma";
import { createUserInput } from "./user.schemas";
import bcrypt from "bcrypt";

export async function createUser(input: createUserInput) {
  const { password, ...rest } = input;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { ...rest, password: hash },
  });
  return user;
}

export async function findUserByEmail(email:string){
  return prisma.user.findUnique({
    where:{
      email
    }
  })
}