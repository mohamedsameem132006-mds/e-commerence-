


import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function OrderConfirmation() {
  const location = useLocation();
  const { clearCart } = useApp();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    if (orderDetails) {
      clearCart();
    }
  }, [orderDetails, clearCart]);

  // Fallback to empty if accessed directly
  const items = orderDetails?.items || [];
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans w-full">
      {/* TopNavBar: simplified brand header */}
      <header className="bg-surface-white w-full shadow-sm sticky top-0 z-50">
        <div className="flex justify-center items-center h-16 px-margin-desktop max-w-container-max mx-auto">
          <Link className="font-headline-md text-headline-md font-bold text-deep-navy" to="/">Mds.com</Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start px-margin-mobile md:px-margin-desktop py-stack-lg w-full max-w-container-max mx-auto">
        {/* Confirmation Header */}
        <div className="text-center mb-stack-lg w-full max-w-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-container/10 text-secondary mb-stack-sm">
            <span className="material-symbols-outlined text-4xl" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-deep-navy mb-base">Thank you for your order!</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Order #{location.state?.orderId || 'MDS-82910'} has been placed successfully. We'll send you a confirmation email shortly.</p>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full">
          {/* Left Column: Order Summary */}
          <div className="md:col-span-8 space-y-stack-md">
            <section className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-stack-md border border-outline-variant/30">
              <h2 className="font-headline-sm text-headline-sm text-deep-navy mb-stack-md pb-base border-b border-outline-variant">Order Summary</h2>
              <div className="space-y-stack-md">
                {items.length > 0 ? (
                  items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-stack-sm">
                      <div className="w-20 h-20 bg-surface-container-low rounded-lg overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" alt={item.title} src={item.image} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-body-md text-body-md font-semibold text-on-surface">{item.title}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Qty: {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-body-lg text-body-lg font-bold text-on-surface">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-on-surface-variant text-center">No order details found.</p>
                )}
              </div>
            </section>
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-stack-sm pt-stack-sm">
              <Link className="flex-1 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2" to="/order-tracking">
                <span className="material-symbols-outlined">local_shipping</span>
                Track Order
              </Link>
              <Link className="flex-1 bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/5 font-label-md text-label-md py-3 px-6 rounded-lg transition-colors text-center" to="/">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column: Shipping & Payment Info */}
          <div className="md:col-span-4 space-y-stack-md">
            <section className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-stack-md border border-outline-variant/30">
              <div className="flex items-center gap-2 mb-stack-sm">
                <span className="material-symbols-outlined text-secondary">calendar_today</span>
                <h2 className="font-headline-sm text-headline-sm text-deep-navy">Estimated Delivery</h2>
              </div>
              <p className="font-body-lg text-body-lg font-bold text-on-surface">Thu, Oct 26 - Mon, Oct 30</p>
              <div className="w-full bg-surface-container-high rounded-full h-2 mt-4 overflow-hidden">
                <div className="bg-secondary h-2 rounded-full w-1/4"></div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-2 text-center uppercase tracking-wider">Processing</p>
            </section>
            <section className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-stack-md border border-outline-variant/30">
              <h2 className="font-headline-sm text-headline-sm text-deep-navy mb-stack-sm">Shipping Details</h2>
              <div className="font-body-sm text-body-sm text-on-surface-variant space-y-1">
                <p className="font-semibold text-on-surface">{orderDetails?.name || 'Alex Mercer'}</p>
                <p>{orderDetails?.address || '123 Commerce Boulevard, Suite 400'}</p>
                <p>{orderDetails?.city || 'Metropolis'}, {orderDetails?.state || 'NY'} {orderDetails?.zip || '10001'}</p>
                <p>{orderDetails?.country || 'United States'}</p>
              </div>
            </section>
            <section className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-stack-md border border-outline-variant/30">
              <h2 className="font-headline-sm text-headline-sm text-deep-navy mb-stack-sm">Payment Method</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-surface-container rounded border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">credit_card</span>
                </div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">
                  <p>Card ending in **** {orderDetails?.cardNumber ? orderDetails.cardNumber.slice(-4) : '4242'}</p>
                </div>
              </div>
            </section>
            {/* Cost Breakdown */}
            <section className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-stack-md border border-outline-variant/30">
              <div className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
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
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container dark:bg-surface-dim w-full mt-stack-lg border-t border-outline-variant flat no shadows">
        <div className="flex flex-col md:flex-row justify-between items-center py-stack-lg px-margin-desktop max-w-container-max mx-auto">
          <div className="mb-4 md:mb-0">
            <Link className="font-headline-sm text-headline-sm font-bold text-deep-navy" to="/">Mds.com</Link>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
            <a className="font-body-sm text-body-sm text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity hover:underline" href="#">Privacy Policy</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity hover:underline" href="#">Terms of Service</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity hover:underline" href="#">Help Center</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity hover:underline" href="#">Sell on Mds</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant opacity-80 hover:opacity-100 transition-opacity hover:underline" href="#">Affiliate Program</a>
          </nav>
          <div className="font-body-sm text-body-sm text-on-surface dark:text-on-surface text-center md:text-right">
            © 2024 Mds.com Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
