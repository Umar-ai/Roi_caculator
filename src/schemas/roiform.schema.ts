import * as z from 'zod'



export const roiSchema=z.object({
    devicename:z.string(),
    defects:z.string(),
    devicePrice:z.number()
})