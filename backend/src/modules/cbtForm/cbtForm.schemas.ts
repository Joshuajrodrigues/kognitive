import { string, z} from 'zod'
import {buildJsonSchemas } from 'fastify-zod'

const cbtForm={
    feelBefore: z.string(),
    situation: z.string(),
    emotionsList:z.object({
        name:z.string(),
        amount:z.number(),
    }).array(),
    thoughtsList:z.object({
        name:z.string(),
        amount:z.number()
    }).array(),
    hotThought:z.string(),
    evidenceFor:z.string(),
    evidenceAgainst:z.string(),
    balancedThought:z.string(),
    feelAfter:z.string()
}

const createCbtForm = z.object({
    ...cbtForm
})

const createCbtFormResponse = z.object({
    ...cbtForm,
    id:string()
})

export type CbtFormInput = z.infer<typeof createCbtForm >

export const {schemas:cbtFormSchemas,$ref}= buildJsonSchemas({
    createCbtForm,
    createCbtFormResponse
},{$id:'cbtForm'})