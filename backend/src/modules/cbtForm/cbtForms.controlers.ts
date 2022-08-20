import { FastifyReply, FastifyRequest } from "fastify";
import { CbtFormInput } from "./cbtForm.schemas";
import { createCbtForm } from "./cbtForm.services";

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
