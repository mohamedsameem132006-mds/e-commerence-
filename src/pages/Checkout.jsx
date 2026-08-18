import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Checkout() {
  const { cart, cartCount, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: user?.displayName || 'Sameem',
    email: user?.email || 'sameem@example.com',
    address: '123 Perundurai Road, Near Collectorate',
    city: 'Erode',
    state: 'Tamil Nadu',
    zip: '638011',
    country: 'India',
    cardName: user?.displayName || 'Sameem',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/28',
    cvv: '123'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || item.qty || 1), 0);
      const tax = subtotal * 0.08;
      const total = subtotal + tax;

      // Save to Firebase
      const docRef = await addDoc(collection(db, "orders"), {
        shippingDetails: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        items: cart,
        totals: { subtotal, tax, total },
        uid: user?.uid || 'guest',
        createdAt: new Date().toISOString()
      });

      // Navigate to order confirmation
      navigate('/order-confirmation', { state: { orderId: docRef.id, orderDetails: { ...formData, items: cart } } });
    } catch (error) {
      console.error("Error saving order:", error);
      alert('There was an error processing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || item.qty || 1), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans w-full">
      {/* Header */}
      <header className="bg-surface-white w-full shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center h-16 px-margin-desktop max-w-container-max mx-auto">
          <Link className="font-headline-md text-headline-md font-bold text-deep-navy" to="/">Mds.com</Link>
          <div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
            <span>Secure Checkout</span>
            <span className="material-symbols-outlined text-secondary">lock</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="mb-stack-lg border-b border-surface-variant pb-stack-sm">
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Checkout</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-surface-white rounded-xl border border-surface-variant shadow-sm max-w-md mx-auto mt-8 px-8">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">shopping_cart</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">Your cart is empty</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Add some products to your cart before checking out.</p>
            <Link className="inline-block bg-secondary hover:bg-vibrant-accent text-on-secondary font-label-md text-label-md px-8 py-3 rounded-full transition-colors" to="/">
              Go Shopping
            </Link>
          </div>
        ) : (
          <form className="grid grid-cols-1 lg:grid-cols-12 gap-gutter w-full" onSubmit={handleSubmit}>
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-8 space-y-6">
              {/* Shipping Address */}
              <section className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-stack-md border border-outline-variant/30">
                <h2 className="font-headline-sm text-headline-sm text-deep-navy mb-stack-md pb-base border-b border-outline-variant">1. Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="name">Full Name</label>
                    <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="address">Address</label>
                    <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="address" name="address" type="text" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="city">City</label>
                    <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="city" name="city" type="text" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="state">State</label>
                      <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="state" name="state" type="text" value={formData.state} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="zip">ZIP Code</label>
                      <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="zip" name="zip" type="text" value={formData.zip} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="country">Country</label>
                    <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="country" name="country" type="text" value={formData.country} onChange={handleInputChange} required />
                  </div>
                </div>
              </section>

              {/* Payment Info */}
              <section className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-stack-md border border-outline-variant/30">
                <h2 className="font-headline-sm text-headline-sm text-deep-navy mb-stack-md pb-base border-b border-outline-variant">2. Payment Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="cardName">Name on Card</label>
                    <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="cardName" name="cardName" type="text" value={formData.cardName} onChange={handleInputChange} required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="cardNumber">Card Number</label>
                    <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="cardNumber" name="cardNumber" type="text" value={formData.cardNumber} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="expiry">Expiry Date</label>
                    <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="expiry" name="expiry" placeholder="MM/YY" type="text" value={formData.expiry} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="cvv">CVV</label>
                    <input className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface-bright text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary font-body-sm text-body-sm" id="cvv" name="cvv" placeholder="123" type="password" value={formData.cvv} onChange={handleInputChange} required />
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <section className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-stack-md border border-outline-variant/30">
                <h2 className="font-headline-sm text-headline-sm text-deep-navy mb-stack-md pb-base border-b border-outline-variant">Order Summary</h2>
                <div className="divide-y divide-outline-variant/30 max-h-60 overflow-y-auto mb-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="py-3 flex gap-3 items-center">
                      <img className="w-12 h-12 rounded object-cover border bg-surface" src={item.image} alt={item.title} />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-label-sm text-label-sm text-on-surface truncate">{item.title}</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Qty: {item.qty}</p>
                      </div>
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-outline-variant/30 pt-4 font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="text-on-surface">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-on-surface">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="text-on-surface">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-outline-variant pt-2 mt-2 flex justify-between font-body-md text-body-md font-bold text-on-surface">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-secondary hover:bg-vibrant-accent text-on-secondary font-label-md text-label-md py-3 rounded-lg transition-colors shadow-sm text-center flex items-center justify-center gap-2" type="submit">
                  <span className="material-symbols-outlined text-sm">shopping_bag</span>
                  Place Order
                </button>
              </section>
            </div>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container dark:bg-surface-dim w-full border-t border-outline-variant py-6 mt-16">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
          <span>© 2024 Mds.com Marketplace. All rights reserved.</span>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="material-symbols-outlined text-[24px]">payments</span>
            <span className="material-symbols-outlined text-[24px]">credit_card</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
