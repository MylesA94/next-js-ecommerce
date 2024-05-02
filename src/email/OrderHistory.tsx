import { Body, Container, Head, Hr, Html, Preview, Tailwind } from "@react-email/components"
import { OrderInformation } from "./components/OrderInformation"
import React from "react"

type OrderHistoryEmailProps = {
    orders: {
        id: string
        pricePaidInCents: number
        createdAt: Date
        downloadVerificationId: string
        product: {
            name: string
            imagePath: string
            description: string
        }
    }[]
}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 10000,
            product: {
                name: "Product name", 
                description: "Some description",
                imagePath: "/products/9b6094c6-6e31-4268-98f3-87925c2b4490-nortonlifelocklogo-large.jpg",
            },
            downloadVerificationId: crypto.randomUUID(),
        }, 
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 20000,
            product: {
                name: "Product name 2", 
                description: "Some other description",
                imagePath: "/products/e9e63163-3a6a-4382-92a5-f48cef00c7b1-nortonlifelocklogo-large (2).jpg",
            },
            downloadVerificationId: crypto.randomUUID(),
        }
    ]
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <h1>Order History</h1>
                        {orders.map((order, index) => (
                            <React.Fragment key={order.id}>
                                <OrderInformation 
                                    order={order} 
                                    product={order.product} 
                                    downloadVerificationId={order.downloadVerificationId}
                                    />
                                {index < orders.length - 1 && <Hr />}
                            </React.Fragment>
                        ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}