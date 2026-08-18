import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useApp } from '../context/AppContext';

export default function MyOrders() {
  const { user, cartCount, favoriteCount } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        // Try fetching user-specific orders
        let q = query(
          collection(db, 'orders'),
          where('uid', '==', user.uid)
        );
        let querySnapshot = await getDocs(q);
        
        // If no user orders found, fallback to guest/all orders just in case
        if (querySnapshot.empty) {
          const allOrdersSnapshot = await getDocs(collection(db, 'orders'));
          const allOrders = allOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          // Filter by uid or guest
          const filtered = allOrders.filter(o => o.uid === user.uid || o.uid === 'guest');
          filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setOrders(filtered);
        } else {
          const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          userOrders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setOrders(userOrders);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        // Fallback fetch all
        try {
          const allOrdersSnapshot = await getDocs(collection(db, 'orders'));
          const allOrders = allOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          allOrders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setOrders(allOrders);
        } catch (e) {
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col w-full">
      {/* TopNavBar */}
      <header className="bg-surface-white dark:bg-surface shadow-sm sticky top-0 z-50 w-full">
        <div className="flex justify-between items-center h-20 px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-gutter">
            <Link className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed" to="/">Mds.com</Link>
            <div className="hidden md:flex gap-6 items-center ml-6">
              <Link className="text-on-surface-variant hover:text-secondary font-body-md text-body-md transition-colors" to="/category/fashion">Fashion</Link>
              <Link className="text-on-surface-variant hover:text-secondary font-body-md text-body-md transition-colors" to="/category/footwear">Footwear</Link>
              <Link className="text-on-surface-variant hover:text-secondary font-body-md text-body-md transition-colors" to="/category/electronics">Electronics</Link>
              <Link className="text-on-surface-variant hover:text-secondary font-body-md text-body-md transition-colors" to="/category/home-appliances">Home</Link>
              <Link className="text-secondary border-b-2 border-secondary pb-1 font-body-md text-body-md" to="/my-orders">My Orders</Link>
            </div>
          </div>
          <div className="flex items-center gap-4 text-secondary">
            <Link className="p-2 rounded-full hover:bg-surface-container-low transition-colors relative" to="/checkout">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && <span className="absolute top-1 right-1 bg-error text-on-error font-label-sm text-label-sm rounded-full w-4 h-4 flex items-center justify-center" style={{ fontSize: '10px' }}>{cartCount}</span>}
            </Link>
            <Link className="p-2 rounded-full hover:bg-surface-container-low transition-colors" to="/login">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="mb-stack-lg border-b border-surface-variant pb-stack-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">My Orders</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">View and track all your past and current purchases</p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-label-md text-label-md">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Continue Shopping
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center text-on-surface-variant">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-secondary border-t-transparent mb-4"></div>
            <p className="font-body-lg text-body-lg">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-surface-white rounded-xl border border-surface-variant shadow-sm max-w-md mx-auto my-8 px-8">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">inventory_2</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">No orders placed yet</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Looks like you haven't made any purchases yet. Start browsing our store!</p>
            <Link className="inline-block bg-secondary hover:bg-vibrant-accent text-on-secondary font-label-md text-label-md px-8 py-3 rounded-full transition-colors" to="/">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord) => {
              const items = ord.items || [];
              const shipping = ord.shippingDetails || {};
              const totalAmount = ord.totals?.total || items.reduce((sum, it) => sum + (it.price * (it.quantity || it.qty || 1)), 0);
              const formattedDate = ord.createdAt 
                ? new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                : 'Recent Order';

              return (
                <div key={ord.id} className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-surface-variant overflow-hidden">
                  {/* Order Top Bar */}
                  <div className="bg-surface-container-low px-6 py-4 border-b border-surface-variant flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div>
                        <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Order ID</span>
                        <span className="font-body-md text-body-md font-semibold text-on-surface">#{ord.id.slice(0, 12).toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Date Placed</span>
                        <span className="font-body-md text-body-md text-on-surface">{formattedDate}</span>
                      </div>
                      <div>
                        <span className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Ship To</span>
                        <span className="font-body-md text-body-md text-on-surface">{shipping.name || user?.displayName || 'Customer'} ({shipping.city || 'Erode'}, {shipping.state || 'TN'})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-primary-fixed/30 text-primary-fixed-dim px-3 py-1 rounded-full font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                        <span>In Transit</span>
                      </div>
                      <button
                        onClick={() => navigate('/order-tracking', { state: { orderId: ord.id } })}
                        className="bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        Track Order
                      </button>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="p-6">
                    <div className="divide-y divide-surface-variant">
                      {items.map((item, idx) => (
                        <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                          <div className="w-16 h-16 bg-surface-container-low rounded-lg overflow-hidden shrink-0 border border-outline-variant/30">
                            <img className="w-full h-full object-cover" alt={item.title} src={item.image} />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-body-md text-body-md font-semibold text-on-surface">{item.title}</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Qty: {item.quantity || item.qty || 1}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-body-md text-body-md font-bold text-on-surface">
                              ${(item.price * (item.quantity || item.qty || 1)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Summary in Card */}
                    <div className="mt-4 pt-4 border-t border-surface-variant flex justify-between items-center">
                      <div className="text-on-surface-variant font-body-sm text-body-sm">
                        <span>Delivery Address: {shipping.address ? `${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.zip || ''}` : 'Erode, Tamil Nadu, India'}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-label-sm text-label-sm text-on-surface-variant mr-2">Total Amount:</span>
                        <span className="font-headline-sm text-headline-sm font-bold text-secondary">${Number(totalAmount).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container dark:bg-surface-dim w-full mt-auto border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center py-stack-lg px-margin-desktop max-w-container-max mx-auto">
          <div className="mb-4 md:mb-0">
            <Link className="font-headline-sm text-headline-sm font-bold text-deep-navy" to="/">Mds.com</Link>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-right">
            © 2024 Mds.com Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
