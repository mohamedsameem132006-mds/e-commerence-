import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Fix for default marker icon missing in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function OrderTracking() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  // Coordinates for Tamil Nadu (Coimbatore / Erode Hub -> Erode City, Tamil Nadu)
  const startPosition = [11.2800, 77.5800]; // Regional Hub (Erode / Perundurai)
  const endPosition = [11.3410, 77.7172]; // Erode Destination, Tamil Nadu
  const [currentPosition, setCurrentPosition] = useState(startPosition);

  // Fetch real order from Firestore
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) { 
        setLoadingOrder(false); 
        return; 
      }
      try {
        const docSnap = await getDoc(doc(db, 'orders', orderId));
        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error('Error fetching order:', err);
      } finally {
        setLoadingOrder(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  // Map animation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.008;
      if (progress >= 1) progress = 0;
      const newLat = startPosition[0] + (endPosition[0] - startPosition[0]) * progress;
      const newLng = startPosition[1] + (endPosition[1] - startPosition[1]) * progress;
      setCurrentPosition([newLat, newLng]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const shipping = order?.shippingDetails || {};
  const items = order?.items || [];
  const totals = order?.totals || {};
  const displayId = order?.id || orderId || 'N/A';
  const locationLabel = shipping.city && shipping.state
    ? `${shipping.city}, ${shipping.state}`
    : 'Erode, Tamil Nadu';

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col w-full">
      {/* Top Navigation */}
      <header className="bg-surface-white dark:bg-inverse-surface shadow-sm z-50 relative docked full-width top-0">
        <div className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto h-20">
          <div className="flex items-center gap-6">
            <Link className="font-headline-md text-headline-md font-bold text-deep-navy dark:text-primary-fixed" to="/">Mds.com</Link>
            <div className="hidden md:flex gap-6 items-center ml-4">
              <Link className="text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors px-3 py-2 rounded-lg" to="/category/electronics">Electronics</Link>
              <Link className="text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors px-3 py-2 rounded-lg" to="/category/fashion">Fashion</Link>
              <Link className="text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors px-3 py-2 rounded-lg" to="/category/home-appliances">Home</Link>
              <Link className="text-secondary dark:text-secondary-fixed font-semibold px-3 py-2 rounded-lg" to="/my-orders">My Orders</Link>
            </div>
          </div>
          <div className="flex items-center gap-4 text-secondary dark:text-secondary-fixed font-body-md text-body-md">
            <Link className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all p-2 rounded-full" to="/my-orders" title="My Orders">
              <span className="material-symbols-outlined">inventory_2</span>
            </Link>
            <Link className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all p-2 rounded-full" to="/checkout" title="Cart">
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
            <Link className="hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-all p-2 rounded-full" to="/login" title="Account">
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        {/* Header */}
        <div className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md border-b border-surface-variant pb-stack-md">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link to="/my-orders" className="text-secondary hover:underline font-label-sm text-label-sm inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">arrow_back</span> Back to My Orders
              </Link>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">Track Order</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Order #{displayId.slice(0, 12).toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-2 bg-primary-fixed text-on-primary-fixed px-4 py-2 rounded-full font-label-md text-label-md shadow-sm">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
            <span>In Transit · Out for Delivery</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Map & Timeline */}
          <div className="lg:col-span-8 flex flex-col gap-stack-md">
            {/* Map Card */}
            <div className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden h-[400px] relative border border-surface-variant z-0">
              <MapContainer center={endPosition} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={currentPosition}>
                  <Popup>
                    Delivery Executive on the way · Erode, TN
                  </Popup>
                </Marker>
              </MapContainer>
              <div className="absolute bottom-4 right-4 bg-surface-white px-4 py-2 rounded-lg shadow-md border border-surface-variant font-label-sm text-label-sm text-on-surface flex items-center gap-2 z-[1000]">
                <span className="material-symbols-outlined text-base text-secondary">location_on</span>
                <span className="font-semibold">{locationLabel}, India</span>
              </div>
            </div>

            {/* Timeline Bento Card */}
            <div className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-stack-md md:p-gutter border border-surface-variant">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md">Delivery Timeline</h2>
              <div className="relative pl-2">
                {/* Step 1: Order Placed */}
                <div className="timeline-item relative pb-stack-lg pl-8">
                  <div className="timeline-line bg-secondary" style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-16px', width: '2px', zIndex: 0 }}></div>
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-secondary text-surface-white flex items-center justify-center z-10 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Order Placed</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Order verified and processed</span>
                  </div>
                </div>
                {/* Step 2: Shipped */}
                <div className="timeline-item relative pb-stack-lg pl-8">
                  <div className="timeline-line bg-secondary" style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-16px', width: '2px', zIndex: 0 }}></div>
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-secondary text-surface-white flex items-center justify-center z-10 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Shipped</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Tamil Nadu Regional Sorting Hub (Erode)</span>
                  </div>
                </div>
                {/* Step 3: Out for Delivery (Current) */}
                <div className="timeline-item relative pb-stack-lg pl-8">
                  <div className="timeline-line" style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-16px', width: '2px', backgroundColor: '#e1e3e4', zIndex: 0 }}></div>
                  <div className="absolute left-[-4px] top-[-4px] w-8 h-8 rounded-full bg-primary-fixed border-2 border-secondary text-secondary flex items-center justify-center z-10 shadow-sm animate-pulse">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-secondary font-bold">Out for Delivery</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Delivery Executive is on the way to your address in {shipping.city || 'Erode'}. Expect delivery today.</span>
                  </div>
                </div>
                {/* Step 4: Delivered */}
                <div className="timeline-item relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-surface-container-high border-2 border-outline-variant text-outline flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-[14px]">home</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-outline">Delivered</span>
                    <span className="font-body-sm text-body-sm text-outline mt-0.5">Pending delivery confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-4 flex flex-col gap-stack-md">
            {/* Est Delivery Card */}
            <div className="bg-deep-navy text-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-gutter relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,1) 10px, rgba(255,255,255,1) 20px)' }}></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-80 text-primary-fixed">event_available</span>
                <h3 className="font-label-md text-label-md text-primary-fixed mb-1 uppercase tracking-wider">Estimated Delivery</h3>
                <p className="font-headline-lg text-headline-lg font-bold mb-1">Today</p>
                <p className="font-body-md text-body-md text-surface-container">Between 2:00 PM - 6:00 PM</p>
              </div>
            </div>

            {/* Shipment Details Card */}
            <div className="bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-gutter border border-surface-variant">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md border-b border-surface-variant pb-2">Shipment Details</h3>
              <ul className="flex flex-col gap-3.5">
                <li className="flex justify-between items-start">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Carrier</span>
                  <span className="font-label-md text-label-md text-on-surface text-right font-medium">MDS Express (India)</span>
                </li>
                <li className="flex justify-between items-start">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Tracking No.</span>
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md text-secondary font-mono font-semibold">{displayId.slice(0, 12).toUpperCase()}-TRK</span>
                    <button className="text-on-surface-variant hover:text-secondary transition-colors" title="Copy tracking number">
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>
                </li>
                <li className="flex justify-between items-start">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Ship To</span>
                  <span className="font-label-md text-label-md text-on-surface text-right font-semibold">{shipping.name || 'Customer'}</span>
                </li>
                <li className="flex justify-between items-start">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Destination</span>
                  <span className="font-label-md text-label-md text-on-surface text-right max-w-[200px]">{shipping.city ? `${shipping.city}, ${shipping.state}, ${shipping.country || 'India'}` : 'Erode, Tamil Nadu, India'}</span>
                </li>
                {totals.total && (
                  <li className="flex justify-between items-start border-t border-surface-variant pt-3 mt-1">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Order Total</span>
                    <span className="font-label-md text-label-md text-secondary font-bold text-right">${Number(totals.total).toFixed(2)}</span>
                  </li>
                )}
              </ul>

              {/* Order navigation buttons */}
              <div className="mt-6 pt-4 border-t border-surface-variant flex flex-col gap-2.5">
                <Link to="/my-orders" className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md py-2.5 rounded-lg text-center transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  View All Orders
                </Link>
                <Link to="/" className="w-full border border-outline-variant hover:bg-surface-container-low text-on-surface font-label-md text-label-md py-2.5 rounded-lg text-center transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-deep-navy dark:bg-pure-black text-on-primary dark:text-on-primary-fixed font-body-sm text-body-sm full-width bottom flat no shadows mt-auto">
        <div className="w-full py-stack-lg px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-base">
          <Link className="font-headline-sm text-headline-sm font-bold text-surface-white" to="/">Mds.com</Link>
          <div className="text-outline-variant text-center md:text-right">© 2024 Mds.com. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
