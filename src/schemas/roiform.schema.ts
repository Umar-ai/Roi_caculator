import * as z from 'zod'



export const roiSchema=z.object({
    Device_Model:z.string(),
    Defects:z.string(),
    device_Price:z.string()
})