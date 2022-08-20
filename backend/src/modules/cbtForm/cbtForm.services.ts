import prisma from "../../utils/prisma";
import { CbtFormInput } from "./cbtForm.schemas";



export async function createCbtForm(data:CbtFormInput & {userId:string}){

    return prisma.cbtForm.create({
        data
    })
}