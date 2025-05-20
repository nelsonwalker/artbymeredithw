"use client"

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/app/components/CheckoutForm"

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is undefined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const amount = 100

export default function CheckoutPage() {
    return (
        <Elements stripe={stripePromise}
        options={{
            mode: "payment",
            amount: amount,
            currency: "aud",
        }}>
            <CheckoutForm amount={amount}/>
        </Elements>
    )

}