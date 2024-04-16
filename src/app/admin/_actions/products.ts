"use server"

import { db } from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { redirect } from "next/navigation"

const fileSchema = z.instanceof(File, { message: "Required" })

// If file size is 0, didn't submit file, don't do check if I did submit, check type of file
const imageShema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith("image/")
)

// Adding a new product I need a name/desc/price/file/image
const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: imageShema.refine(file => file.size > 0, "Required")
})

export async function addProduct(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("products", {recursive: true})
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    // convert file to buffer, take file from format to node js compatible format to make file.
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/products", {recursive: true})
    const imagePath = `/products/${crypto.randomUUID()}-${data.file.name}`
    // convert file to buffer, take file from format to node js compatible format to make file.
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await db.product.create({ data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath,
        imagePath,
    }})

    redirect("/admin/products")
}