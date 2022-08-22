import { FastifyReply, FastifyRequest } from "fastify";
import { CbtFormInput, userCbtFormTypeInput } from "./cbtForm.schemas";
import { createCbtForm, getUsersForms } from "./cbtForm.services";

export async function createCbtFormHandler(
  req: FastifyRequest<{Body:CbtFormInput}>,
  res: FastifyReply
) {
  const cbtForm = await createCbtForm({
    ...req.body,
    userId: req.user.id,
  });
  return cbtForm;
}

export async function getUsersFormsHandler(req:FastifyRequest<{Body:userCbtFormTypeInput}>,res:FastifyReply){
  const { userId} = req.body
  const currentUser = req.user.id
  try {
    if(currentUser === userId){
    const cbtForms = await getUsersForms(userId)
 
    return cbtForms
  }else{
    throw new Error("Unauthorized call")
  }
  } catch (error) {
    return res.code(403).send(error);
  }
}