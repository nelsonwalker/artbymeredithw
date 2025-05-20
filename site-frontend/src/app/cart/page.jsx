'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'

export default function CartPage() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(stored)
  }, [])

  const updateQuantity = (id, delta) => {
    const updated = cart
      .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter(item => item.quantity > 0)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className="space-y-6">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <h2 className="font-semibold text-lg">{item.name}</h2>
                      <p className="text-gray-600">${(item.price_cents / 100).toFixed(2)} AUD</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-black-200 cursor-pointer rounded">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-black-200 cursor-pointer rounded">+</button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline cursor-pointer">Remove</button>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-right">
              <a
                href="/checkout"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded"
              >
                Proceed to Checkout
              </a>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
