import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProductDetails() {
  const { addToCart, toggleFavorite, favorites, cartCount, favoriteCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product || {
    id: 'zenith-pro-max',
    title: 'Zenith Pro Max - 512GB, Deep Space Black',
    price: 1099.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQOp5cFii1ITlWNTCVFl1Ajeq1yIRGTgsIIb28HCX2mk1nVXfWYic8EgRIEu8qB56VxZYb52opVwc-V1ibXAv35sssvNUxdJvTa1s6IN_Ft1pRV4StqY7r_I1A8jBYuIAFFug8tXwKHcCmQyF9_1TUzLaKe8YmGAls9GM4DC_XdfNd6ZJy7JTQiykrt6M6LdxVNHBji8FMIPiZW0e-k_lWjvZNpnxVQ26a9MOwuW6KXTH8eWUseZTSgw',
    rating: 4.8,
    reviews: 1284
  };

  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col pt-[80px]">
      {/* TopNavBar */}
      <nav className="bg-surface-white dark:bg-surface shadow-sm fixed top-0 w-full z-50 flex items-center justify-between px-margin-desktop h-20 mx-auto w-full md:flex hidden" style={{ maxWidth: '1280px', left: '50%', transform: 'translateX(-50%)' }}>
        <div className="flex items-center gap-gutter">
          <Link className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed" to="/">Mds.com</Link>
          <div className="hidden lg:flex items-center gap-stack-lg ml-margin-desktop">
            <Link className="text-on-surface-variant hover:text-secondary font-label-md text-label-md transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/category/fashion">Fashion</Link>
            <Link className="text-on-surface-variant hover:text-secondary font-label-md text-label-md transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/category/footwear">Footwear</Link>
            <Link className="text-secondary border-b-2 border-secondary pb-1 font-label-md text-label-md transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/category/electronics">Electronics</Link>
            <Link className="text-on-surface-variant hover:text-secondary font-label-md text-label-md transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/category/home-appliances">Home</Link>
            <Link className="text-on-surface-variant hover:text-secondary font-label-md text-label-md transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/my-orders">My Orders</Link>
          </div>
        </div>
        <div className="flex items-center gap-stack-md">
          <div className="relative hidden md:block">
            <input className="border border-outline-variant rounded-full py-2 pl-4 pr-10 bg-surface-bright focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary w-64 font-body-sm text-body-sm transition-colors" placeholder="Search..." type="text" />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
          </div>
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-secondary dark:text-secondary-fixed-dim relative" title="Favorites">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
            {favoriteCount > 0 && <span className="absolute top-1 right-1 bg-error text-on-error font-label-sm text-label-sm rounded-full w-4 h-4 flex items-center justify-center" style={{ fontSize: '10px' }}>{favoriteCount}</span>}
          </button>
          <Link className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-secondary dark:text-secondary-fixed-dim relative" to="/checkout" title="Cart">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && <span className="absolute top-1 right-1 bg-error text-on-error font-label-sm text-label-sm rounded-full w-4 h-4 flex items-center justify-center" style={{ fontSize: '10px' }}>{cartCount}</span>}
          </Link>
          <Link className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-secondary dark:text-secondary-fixed-dim" to="/my-orders" title="My Orders">
            <span className="material-symbols-outlined">inventory_2</span>
          </Link>
          <Link className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-secondary dark:text-secondary-fixed-dim" to="/login" title="Account">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full z-50 bg-surface-white shadow-sm h-16 flex items-center justify-between px-margin-mobile">
        <button className="p-2 text-on-surface"><span className="material-symbols-outlined">menu</span></button>
        <Link className="font-headline-sm text-headline-sm font-bold text-primary" to="/">Mds.com</Link>
        <Link className="p-2 text-on-surface relative" to="/checkout">
          <span className="material-symbols-outlined">shopping_cart</span>
          {cartCount > 0 && <span className="absolute top-1 right-1 bg-error text-on-error font-label-sm text-label-sm rounded-full w-4 h-4 flex items-center justify-center" style={{ fontSize: '10px' }}>{cartCount}</span>}
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg md:py-margin-desktop mt-16 md:mt-0">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" class="flex text-on-surface-variant font-body-sm text-body-sm mb-stack-lg">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link className="hover:text-secondary transition-colors" to="/">Home</Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="material-symbols-outlined mx-1 text-sm">chevron_right</span>
                <span className="text-on-surface">{product.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Product Gallery (Left) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-stack-md">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-stack-sm w-24 flex-shrink-0">
              <button className="border-2 border-secondary rounded-lg overflow-hidden h-24 bg-surface-bright flex items-center justify-center">
                <img className="w-full h-full object-cover" data-alt={product.title} src={product.image} />
              </button>
            </div>
            {/* Main Image */}
            <div className="flex-grow bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex items-center justify-center relative aspect-square md:aspect-auto md:h-[600px] border border-surface-container">
              <span className="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm px-3 py-1 rounded-full z-10">-15% OFF</span>
              <button onClick={() => toggleFavorite(product.id)} className="absolute top-4 right-4 bg-surface-white p-2 rounded-full shadow-sm hover:text-vibrant-accent transition-colors z-10 text-outline"><span className="material-symbols-outlined" style={{ fontVariationSettings: favorites.includes(product.id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span></button>
              <img className="w-full h-full object-contain p-8" data-alt={product.title} src={product.image} />
            </div>
            <div className="flex md:hidden gap-stack-sm overflow-x-auto pb-2 snap-x">
              <button className="border-2 border-secondary rounded-lg overflow-hidden h-20 w-20 flex-shrink-0 snap-start bg-surface-bright flex items-center justify-center">
                <img className="w-full h-full object-cover" data-alt={product.title} src={product.image} />
              </button>
            </div>
          </div>

          {/* Product Info (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-stack-lg">
            {/* Title & Rating */}
            <div className="flex flex-col gap-stack-sm">
              <a className="text-secondary font-label-md text-label-md hover:underline" href="#">Product Details</a>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">{product.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-vibrant-accent">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1; font-size: 20px;" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1; font-size: 20px;" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1; font-size: 20px;" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1; font-size: 20px;" }}>star</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1; font-size: 20px;" }}>autorenew</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface">{product.rating || 4.8}</span>
                <a className="font-body-sm text-body-sm text-on-surface-variant underline hover:text-secondary ml-2" href="#reviews">({product.reviews || 1284} Reviews)</a>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1 py-stack-sm border-y border-surface-variant">
              <div className="flex items-baseline gap-3">
                <span className="font-headline-xl text-headline-xl text-on-surface">${product.price.toFixed(2)}</span>
                <span className="font-headline-sm text-headline-sm text-outline-variant line-through">${(product.price * 1.2).toFixed(2)}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Inclusive of all taxes. Free shipping available.</p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-stack-md">
              <p className="font-body-md text-body-md text-on-surface-variant">
                {product.desc || "Experience the premium quality and design of our curated products."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-stack-md pt-stack-sm">
              <div className="flex gap-4">
                <div className="flex items-center border border-outline-variant rounded-lg w-32 justify-between px-3 bg-surface-white">
                  <button onClick={handleDecrement} className="text-on-surface-variant hover:text-secondary py-2"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>remove</span></button>
                  <span className="font-label-md text-label-md">{quantity}</span>
                  <button onClick={handleIncrement} className="text-on-surface-variant hover:text-secondary py-2"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span></button>
                </div>
                <button onClick={() => addToCart(product, quantity)} className="flex-grow bg-surface-white border-2 border-secondary text-secondary font-label-md text-label-md py-3 rounded-lg hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2 text-center cursor-pointer">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Add to Cart
                </button>
              </div>
              <button onClick={handleBuyNow} className="w-full bg-secondary text-on-secondary font-label-md text-label-md py-3 rounded-lg hover:bg-primary-container transition-colors shadow-sm text-center cursor-pointer border-none outline-none">
                Buy Now
              </button>
            </div>

            {/* Delivery Pin Code Checker */}
            <div className="bg-surface-container-low p-stack-md rounded-xl mt-2 border border-surface-variant">
              <div className="flex items-center gap-2 mb-3 text-on-surface">
                <span className="material-symbols-outlined">local_shipping</span>
                <h3 className="font-label-md text-label-md">Check Delivery Availability</h3>
              </div>
              <div className="flex gap-2">
                <input className="flex-grow border border-outline-variant rounded-lg px-3 py-2 font-body-sm text-body-sm focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface-white" placeholder="Enter ZIP / PIN code" type="text" />
                <button className="bg-surface-variant text-on-surface-variant px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-outline-variant transition-colors">Check</button>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 text-xs">Expected delivery in 2-4 business days.</p>
            </div>

            {/* Key Features List */}
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant mt-2">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary" style={{ fontSize: '18px' }}>check_circle</span> Premium Quality Materials</li>
              <li className="flex items-center gap-2"><span class="material-symbols-outlined text-secondary" style={{ fontSize: '18px' }}>check_circle</span> Durable and Long-lasting</li>
              <li className="flex items-center gap-2"><span class="material-symbols-outlined text-secondary" style={{ fontSize: '18px' }}>check_circle</span> Exceptional Performance</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary dark:bg-surface-container-lowest text-on-primary dark:text-on-surface font-body-sm text-body-sm w-full py-stack-lg border-t border-outline-variant flat no shadows">
        <div className="w-full px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto">
          <div className="flex flex-col gap-stack-sm">
            <Link className="font-headline-sm text-headline-sm text-on-primary font-bold mb-2" to="/">Mds.com</Link>
            <p className="opacity-80">Your trusted marketplace for premium goods.</p>
          </div>
          <div className="flex flex-col gap-stack-sm">
            <span className="font-label-md text-label-md font-bold mb-1">Company</span>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 transition-opacity" href="#">About Us</a>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 transition-opacity" href="#">Contact Support</a>
          </div>
          <div className="flex flex-col gap-stack-sm">
            <span className="font-label-md text-label-md font-bold mb-1">Legal</span>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 transition-opacity" href="#">Privacy Policy</a>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 transition-opacity" href="#">Terms of Service</a>
          </div>
          <div className="flex flex-col gap-stack-sm">
            <span className="font-label-md text-label-md font-bold mb-1">Services</span>
            <Link className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 transition-opacity" to="/order-tracking">Shipping Info</Link>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 transition-opacity" href="#">Sell on Mds</a>
          </div>
        </div>
        <div className="w-full px-margin-desktop max-w-container-max mx-auto mt-stack-lg pt-stack-sm border-t border-on-primary/20 text-center opacity-70">
          © 2024 Mds.com Marketplace. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
