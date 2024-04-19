import { db } from "@/db/db";
import { PageHeader } from "../../_components/PageHeader";
import { ProductForm } from "../_components/ProductForm";

export default async function NewProductPage() {
    return (
    <>
        <PageHeader>Add Product</PageHeader>
        <ProductForm />
    </>
    )
}