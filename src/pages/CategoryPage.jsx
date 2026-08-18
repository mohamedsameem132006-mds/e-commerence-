import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const categoryData = {
  fashion: {
    title: 'Fashion',
    description: 'Premium apparel and clothing designed for modern elegance.',
    filters: {
      categories: ['Women', 'Men', 'Kids', 'Accessories'],
      brands: ['Mds Collection', 'Luxe Atelier', 'Urban Essentials'],
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    products: [
      {
        id: 1,
        title: 'Navy Tailored Suit',
        price: 249.00,
        image: '/images/navy_blue.png',
        desc: 'Premium wool blend tailored suit for a sharp professional look.',
        rating: 4.9,
        reviews: 128,
        isNew: true
      },
      {
        id: 2,
        title: 'Oversized Navy Blazer',
        price: 189.00,
        image: '/images/navy_blue.png',
        desc: 'Modern oversized fit blazer, perfect for smart-casual styling.',
        rating: 4.7,
        reviews: 85
      },
      {
        id: 3,
        title: 'Essential White Shirt',
        price: 75.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9-E08rv8tN8r8ubSGy88hQdBrteJM7_QnAUV9SYVU8u0cxh25A-3zNjyvOAhUKmVW0jI9RfcvL182TLk2Tf8-Ad05tM9ZpoxeCwaw8ma5ERPcca6t_Mp-ryNYAi3Pax2cnd_GrUJJZlEjW-xPg9O8r_2fsdDB7YYlB1nhPZw2PrrVqAUAcaJrANf5R74HsSqQH6_jSWaUisU-JTte1SpgetwR6Z4oAxqeM_0PfsdYQJ_CZ-GMeTDq1g',
        desc: 'Crisp cotton poplin shirt, a versatile wardrobe staple.',
        rating: 4.8,
        reviews: 210,
        bgSecondary: true
      },
      {
        id: 4,
        title: 'Classic Leather Loafers',
        price: 145.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpQEd4gW4sFROyfxwL9FGB2i1UntHgHaamStUgBgEQxTc3DRCIiD6Xj1wCT8kdAUSzL1N1FIEky5RbAUdKqaxnb-19kofx1-sXTFOddH0EWpcZhmL5jmdk7Q8cqj3Ca-NhVAdh2Zk_tfLyhenPiyvGQht82Xdn-IbjO6jVrF3QXYRqJMzLtXrr8khR0x1w5nW8JtRcW0mRj91FYXRENbaRRO5P0CElN_IqWoVs1IZROKV0AoAFtnQGoA',
        desc: 'Timeless leather loafers with elegant gold-tone hardware.',
        rating: 4.6,
        reviews: 92,
        bgSecondary: true
      },
      {
        id: 5,
        title: 'Structured Tote Bag',
        price: 89.00,
        originalPrice: 120.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALcN-6oLhguogx3AoAN3WWud5NT5V73Bn7tjgZpcNHhug9RrF1l_JyZmqcSVlvmigpOegganJC-Cm6rAb9685o6G8yGOXb981CQn6NlvjHIGxCb2vzQd4Q1l9rbP6HwUlT84eRTd-MNTAS0VltpzY71rzxwwepbvVDuut-tlUC5cWD_biB1I5pGkZ2Tfx7BTBAu-ZVqfdAvomM6BrOT4nMb3QDq0-isbyTkPfRTEVIrb7p0QyW1ESVKQ',
        desc: 'Spacious everyday tote crafted from durable vegan leather.',
        rating: 4.5,
        reviews: 45,
        isSale: true,
        bgSecondary: true
      },
      {
        id: 6,
        title: 'Cashmere Blend Sweater',
        price: 160.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDrXBhKNyVYxbYEmFdoqf5GBerGXkawdHoyFQERP0_fCPaJJ6jA1sbnw7iRKYfy1WlVE507LZH7q2QuN9g1zFjjJLzsSuEhsxc3Ce4WgSI8ifN1KGTWnSoLqYuhZGc__lqEe3UFIG8neHnRfpcWws8-7GGMLeyKtOiyaY8XUjS_uIt1fpTTgYh2mC7uERKwAJ3QZBuTwTON1wMOxwW6SeWqKGoWYUFk098sqICwteWmT0gX8_A8IqPyg',
        desc: 'Ultra-soft cashmere blend knit for ultimate comfort and warmth.',
        rating: 4.9,
        reviews: 315,
        bgSecondary: true
      }
    ]
  },
  electronics: {
    title: 'Electronics',
    description: 'Discover the latest in tech, from cutting-edge smartphones to premium audio gear.',
    filters: {
      categories: ['Smartphones', 'Audio', 'Laptops', 'Wearables'],
      brands: ['Quantum', 'AeroAcoustics', 'TechNova', 'Zenith']
    },
    products: [
      {
        id: 1,
        title: 'Quantum Pro X1 Smartphone',
        price: 899.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoJ61B0JGP9ohD5Dx_4xDnqJZIsnPfv7e-VST2Gx_q5fwcFycApxwFgDgkvt6T9Llrz0a8UoeP_djmavloO5DK2IGfb5XoGo40W0rDdi_vSPB2nD602JqzwivqWj9s9GyD4Jcen0X2h4EBr6fhBGd13pcPr92w0l1-tJvPa6nx3bbqLyUnpskLrSt-l74Yb2OQ0Mp6eCIK_YllihgERwRh6tTHjlE01FpUDsUqWIwaUhRqswW0vlkQPA',
        desc: 'Sleek, modern premium smartphone with high-end camera and dynamic display.',
        rating: 4.8,
        reviews: 256
      },
      {
        id: 2,
        title: 'AeroAcoustics Silence Pro',
        price: 299.99,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrQhYXts5mCCPJjFMTNfWXfozu2WkqHg9KFek2XgW2iLOQIyuuCnJAKujEaFOxED-ruO5v8z1R6FJkquXRAu_5pUX1OZ6qlYZe0Ybi876ioyl74gW4opKRHUqBUVA0-wjVCJNHExY5mcqxiNFahr_Kfvp1qM2tZvF-7FEORUSEEMjNJ53YhYa64VntZ5AeewUrcJAaIchV0ZBIvhd1HnCFnt0Z5zEug0YkmMa_zJpj4sBfhquNqvPyBQ',
        desc: 'High-end wireless noise-canceling headphones in matte black finish.',
        rating: 4.9,
        reviews: 142
      },
      {
        id: 3,
        title: 'TechNova Book 14" M2',
        price: 1099.00,
        originalPrice: 1299.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbqXEJAFZlHRw0Sjtpc4_xrQfu4_JehLi2ogaFNZGjBcxry_v90dRgVguKk5PqGjk3q8e0eEN-Ul0SANmlQjM6C-_9AHzp9CHwKH3hmVUBa0qlVN2YyOi5Z6ofWCzu3fmHpm53wP8IWoTiXNKI6XFddjIFRR7K7x3tpKO8g1n34LRKNmP1wE6IhQv7yt1Le8CrdfS3ZDogW5KzYQR1pjEB8Qk_Q-9dhZ9-A1QZcQ5Kvnk1f2WQJ6aZ-Q',
        desc: 'Slim, silver ultra-portable laptop with high performance processor.',
        rating: 4.7,
        reviews: 98,
        isSale: true
      }
    ]
  },
  accessories: {
    title: 'Accessories',
    description: 'Curated premium pieces to elevate your everyday styles.',
    filters: {
      categories: ['Watches', 'Bags', 'Sunglasses', 'Belts'],
      brands: ['Luxe Minimalist', 'Premium Navy', 'Modern Matte']
    },
    products: [
      {
        id: 1,
        title: 'Luxe Minimalist Watch',
        price: 185.00,
        image: '/images/wristwatch.png',
        desc: 'Elegant, clean wristwatch with silver metallic mesh band.',
        rating: 4.7,
        reviews: 64
      },
      {
        id: 2,
        title: 'Premium Navy Tote',
        price: 220.00,
        image: '/images/tote_bag.png',
        desc: 'High-end leather weekender bag in rich deep navy.',
        rating: 4.9,
        reviews: 102
      },
      {
        id: 3,
        title: 'Modern Matte Sunglasses',
        price: 110.00,
        image: '/images/sunglasses.png',
        desc: 'Stylish black sunglasses with UV protective lenses.',
        rating: 4.6,
        reviews: 88
      }
    ]
  },
  'beauty-personal-care': {
    title: 'Beauty & Personal Care',
    description: 'Skincare, cosmetics, and personal care essentials for your daily routine.',
    filters: {
      categories: ['Skincare', 'Cosmetics', 'Hair Care', 'Fragrances'],
      brands: ['Midnight Recovery', 'Professional Glow', 'Aura Tech']
    },
    products: [
      {
        id: 1,
        title: 'Midnight Recovery Serum',
        price: 65.00,
        image: '/images/skincare.png',
        desc: 'Intensive overnight repair serum for healthy, glowing skin.',
        rating: 4.8,
        reviews: 120
      },
      {
        id: 2,
        title: 'Professional Eyeshadow Palette',
        price: 48.00,
        image: '/images/palette.png',
        desc: 'Highly pigmented versatile eyeshadow palette with neutral and shimmer shades.',
        rating: 4.7,
        reviews: 95
      },
      {
        id: 3,
        title: 'Aura Ionic Hair Dryer',
        price: 120.00,
        image: '/images/hair_dryer.png',
        desc: 'Sleek deep blue ionic hair dryer for fast, frizz-free drying.',
        rating: 4.6,
        reviews: 74
      }
    ]
  },
  'home-appliances': {
    title: 'Home Appliances',
    description: 'Modern, high-performance appliances for a convenient, smarter home.',
    filters: {
      categories: ['Kitchen', 'Laundry', 'Cooling & Heating', 'Cleaning'],
      brands: ['Zenith', 'Aura Tech', 'LuxeHome']
    },
    products: [
      {
        id: 1,
        title: 'Zenith Smart Refrigerator',
        price: 1299.00,
        image: '/images/stainless_steel.png',
        desc: 'Premium multi-door smart refrigerator with touch screen interface.',
        rating: 4.9,
        reviews: 110,
        category: 'Kitchen'
      },
      {
        id: 2,
        title: 'Aura Tech Front-Load Washer',
        price: 849.00,
        image: '/images/washing_machine.png',
        desc: 'High-efficiency front-load washing machine with smart control settings.',
        rating: 4.8,
        reviews: 88,
        category: 'Laundry'
      },
      {
        id: 3,
        title: 'LuxeHome Digital Microwave',
        price: 199.00,
        image: '/images/microwave.png',
        desc: 'Compact digital microwave oven with convenient pre-set cooking functions.',
        rating: 4.6,
        reviews: 62,
        category: 'Kitchen'
      },
      {
        id: 4,
        title: 'Zenith Air Conditioner',
        price: 599.00,
        image: '/images/air_conditioner.jpg',
        desc: 'Sleek split-system energy-efficient air conditioner unit.',
        rating: 4.7,
        reviews: 75,
        category: 'Cooling & Heating'
      },
      {
        id: 5,
        title: 'Aura Tech Cordless Vacuum',
        price: 349.00,
        image: '/images/vacuum_cleaner.jpg',
        desc: 'High-tech cordless stick vacuum cleaner with premium suction power.',
        rating: 4.9,
        reviews: 142,
        category: 'Cleaning'
      },
      {
        id: 6,
        title: 'Zenith Gas Stove',
        price: 499.00,
        image: '/images/stove.jpg',
        desc: 'Modern sleek stainless steel gas stove with premium burners.',
        rating: 4.8,
        reviews: 95,
        category: 'Kitchen'
      },
      {
        id: 7,
        title: 'LuxeHome Digital Multi-Cooker',
        price: 129.00,
        image: '/images/cooker.jpg',
        desc: 'Versatile digital pressure cooker and multi-cooker with smart settings.',
        rating: 4.7,
        reviews: 156,
        category: 'Kitchen'
      },
      {
        id: 8,
        title: 'Premium Non-Stick Frying Pan',
        price: 59.00,
        image: '/images/pan.jpg',
        desc: 'High-quality non-stick frying pan with a sleek, heat-resistant handle.',
        rating: 4.6,
        reviews: 210,
        category: 'Kitchen'
      }
    ]
  },
  'sports-fitness': {
    title: 'Sports & Fitness',
    description: 'High-performance gear and apparel to power your workout.',
    filters: {
      categories: ['Equipment', 'Apparel', 'Weights', 'Footwear'],
      brands: ['Aura Pro', 'Performance Active', 'Adjustable Fit']
    },
    products: [
      {
        id: 1,
        title: 'Aura Pro Treadmill',
        price: 899.00,
        image: '/images/treadmill.png',
        desc: 'Professional-grade folding treadmill with digital training monitor.',
        rating: 4.9,
        reviews: 54
      },
      {
        id: 2,
        title: 'Performance Leggings',
        price: 55.00,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATUxXy0oQEX7xciQianYp0uV5poic_j-XBKNV6-IF-KsFDRffuMlV9kgrFvbyMjL1el2ovhQmahZm8XDCWInf-6vawo7uxbcGOPSdlZrNaFTj-tDrQVJLXe066_xCuvMGxcIu-ZgANnVentjbXe8B6BQnl_BKFEiGooPnxUktGhobGxe-jL6cKN2zo6PYxBH-GmVlppKV6Lr90NZkgB7vVKcKYhb5u4F1O4C24Mczz-BX2Rn68_aiTEQ',
        desc: 'High-waisted compression activewear leggings.',
        rating: 4.8,
        reviews: 120
      },
      {
        id: 3,
        title: 'Adjustable Dumbbell Set',
        price: 199.00,
        image: '/images/dumbbells.png',
        desc: 'Space-saving premium adjustable weights dumbbell set.',
        rating: 4.7,
        reviews: 85
      }
    ]
  },
  footwear: {
    title: 'Footwear',
    description: 'Elevate every step with our premium collection of athletic and casual footwear.',
    filters: {
      categories: ['Running', 'Sneakers', 'Boots', 'Sandals'],
      brands: ['Aura Active', 'Classic Steps', 'Urban Walk']
    },
    products: [
      {
        id: 1,
        title: 'Neon Orange Running Shoe',
        price: 135.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        desc: 'Premium athletic running shoe in modern white and neon orange.',
        rating: 4.8,
        reviews: 215,
        isNew: true
      },
      {
        id: 2,
        title: 'Minimalist White Sneaker',
        price: 89.00,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        desc: 'Sleek minimal leather sneakers in white with subtle accents.',
        rating: 4.9,
        reviews: 310
      },
      {
        id: 3,
        title: 'Classic Tan Leather Boots',
        price: 175.00,
        image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        desc: 'Elegant leather ankle boots in classic tan for everyday wear.',
        rating: 4.7,
        reviews: 89
      }
    ]
  }
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const currentCategory = categoryData[categoryName] || categoryData.fashion;
  const { addToCart, toggleFavorite, favorites, cartCount, favoriteCount } = useApp();

  // React state to track filters (toggles just for nice UI interactions)
  const [selectedSubcats, setSelectedSubcats] = useState({});
  const [selectedBrands, setSelectedBrands] = useState({});
  const [activeSize, setActiveSize] = useState('S');

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalItems = currentCategory.products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const currentProducts = currentCategory.products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-on-background antialiased pt-20 w-full">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-margin-desktop h-20 max-w-container-max mx-auto shadow-sm bg-surface-white">
        <div className="flex items-center gap-gutter">
          <Link className="font-headline-md text-headline-md font-bold text-primary" to="/">Mds.com</Link>
          <div className="hidden md:flex gap-stack-lg items-center ml-stack-lg">
            <Link className={`font-body-md text-body-md pb-1 transition-all duration-200 hover:opacity-80 ${categoryName === 'fashion' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-secondary'}`} to="/category/fashion">Fashion</Link>
            <Link className={`font-body-md text-body-md pb-1 transition-all duration-200 hover:opacity-80 ${categoryName === 'footwear' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-secondary'}`} to="/category/footwear">Footwear</Link>
            <Link className={`font-body-md text-body-md pb-1 transition-all duration-200 hover:opacity-80 ${categoryName === 'electronics' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-secondary'}`} to="/category/electronics">Electronics</Link>
            <Link className={`font-body-md text-body-md pb-1 transition-all duration-200 hover:opacity-80 ${categoryName === 'home-appliances' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-secondary'}`} to="/category/home-appliances">Home</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-all duration-200 hover:opacity-80" to="/my-orders">My Orders</Link>
          </div>
        </div>
        <div className="flex items-center gap-stack-md text-secondary">
          <button className="scale-95 active:scale-100 transition-transform hover:opacity-80 relative" title="Favorites">
            <span className="material-symbols-outlined" style={{ strokeWidth: '2px' }}>favorite</span>
            {favoriteCount > 0 && <span className="absolute -top-1 -right-1 bg-error text-on-error text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favoriteCount}</span>}
          </button>
          <Link className="scale-95 active:scale-100 transition-transform hover:opacity-80 relative" to="/checkout" title="Cart">
            <span className="material-symbols-outlined" style={{ strokeWidth: '2px' }}>shopping_cart</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-error text-on-error text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>
          <Link className="scale-95 active:scale-100 transition-transform hover:opacity-80" to="/my-orders" title="My Orders">
            <span className="material-symbols-outlined" style={{ strokeWidth: '2px' }}>inventory_2</span>
          </Link>
          <Link className="scale-95 active:scale-100 transition-transform hover:opacity-80" to="/login" title="Account">
            <span className="material-symbols-outlined" style={{ strokeWidth: '2px' }}>account_circle</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter w-full">
        {/* Sidebar Filters */}
        <aside className="md:col-span-3 hidden md:block">
          <div className="sticky top-32 space-y-stack-lg">
            <div className="mb-stack-md border-b border-outline-variant pb-stack-sm">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Filters</h2>
            </div>
            
            {/* Subcategories */}
            <div className="space-y-stack-sm">
              <h3 className="font-label-md text-label-md text-on-surface">Category</h3>
              <div className="flex flex-col gap-2">
                {currentCategory.filters.categories.map((sub, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      className="rounded border-outline text-secondary focus:ring-secondary cursor-pointer" 
                      type="checkbox"
                      checked={!!selectedSubcats[sub]}
                      onChange={(e) => setSelectedSubcats({ ...selectedSubcats, [sub]: e.target.checked })}
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{sub}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-stack-sm border-t border-outline-variant pt-stack-md">
              <h3 className="font-label-md text-label-md text-on-surface">Brand</h3>
              <div className="flex flex-col gap-2">
                {currentCategory.filters.brands.map((br, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      className="rounded border-outline text-secondary focus:ring-secondary cursor-pointer" 
                      type="checkbox"
                      checked={!!selectedBrands[br]}
                      onChange={(e) => setSelectedBrands({ ...selectedBrands, [br]: e.target.checked })}
                    />
                    <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{br}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-stack-sm border-t border-outline-variant pt-stack-md">
              <h3 className="font-label-md text-label-md text-on-surface">Price Range</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="border-outline text-secondary focus:ring-secondary cursor-pointer" name="price" type="radio" defaultChecked />
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">All Prices</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="border-outline text-secondary focus:ring-secondary cursor-pointer" name="price" type="radio" />
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Under $100</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="border-outline text-secondary focus:ring-secondary cursor-pointer" name="price" type="radio" />
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Over $100</span>
                </label>
              </div>
            </div>

            {/* Size (only for Fashion) */}
            {currentCategory.filters.sizes && (
              <div className="space-y-stack-sm border-t border-outline-variant pt-stack-md">
                <h3 className="font-label-md text-label-md text-on-surface">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {currentCategory.filters.sizes.map((sz, idx) => (
                    <button 
                      key={idx} 
                      className={`w-10 h-10 rounded border flex items-center justify-center font-label-sm text-label-sm transition-colors ${activeSize === sz ? 'border-secondary bg-secondary-fixed text-on-secondary-container' : 'border-outline-variant hover:border-secondary hover:text-secondary'}`}
                      onClick={() => setActiveSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Product Grid */}
        <main className="col-span-1 md:col-span-9">
          <div className="mb-stack-lg flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">{currentCategory.title}</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{currentCategory.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Sort by:</span>
              <select className="border-none bg-surface text-on-surface font-body-sm text-body-sm focus:ring-0 cursor-pointer">
                <option>New Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Sellers</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {currentProducts.map((prod) => (
              <div key={prod.id} className="bg-surface-white rounded-lg product-card-shadow transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0px_8px_32px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden group cursor-pointer relative">
                {prod.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-surface-white/90 backdrop-blur-sm px-2 py-1 rounded text-label-sm font-label-sm text-on-surface uppercase tracking-wide">New</div>
                )}
                {prod.isSale && (
                  <div className="absolute top-4 left-4 z-10 bg-error-container px-2 py-1 rounded text-label-sm font-label-sm text-on-error-container uppercase tracking-wide">Sale</div>
                )}
                <button onClick={() => toggleFavorite(prod.id + categoryName)} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-surface-white/90 backdrop-blur-sm text-on-surface hover:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: favorites.includes(prod.id + categoryName) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
                <Link to="/product-details" state={{ product: prod }} className="aspect-[3/4] overflow-hidden bg-surface-variant relative block">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src={prod.image} alt={prod.title} />
                </Link>
                <div className="p-stack-md flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-1 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-body-sm text-body-sm">{prod.rating} ({prod.reviews})</span>
                  </div>
                  <Link to="/product-details" state={{ product: prod }}>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 hover:text-secondary transition-colors">{prod.title}</h3>
                  </Link>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4 line-clamp-2">{prod.desc}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-body-lg text-body-lg font-bold ${prod.isSale ? 'text-error' : 'text-on-surface'}`}>${prod.price.toFixed(2)}</span>
                      {prod.originalPrice && (
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">${prod.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button onClick={() => addToCart(prod)} className="bg-secondary hover:bg-primary-container text-on-secondary font-label-md text-label-md px-4 py-2 rounded transition-colors border-none outline-none cursor-pointer">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-stack-lg flex justify-center items-center gap-2">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors disabled:opacity-50">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded flex items-center justify-center font-label-md text-label-md transition-colors ${currentPage === i + 1 ? 'bg-secondary text-on-secondary' : 'border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'}`}>
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors disabled:opacity-50">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full py-stack-lg bg-primary mt-stack-lg border-t border-outline-variant">
        <div className="w-full px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-stack-sm">
            <Link className="font-headline-sm text-headline-sm text-on-primary font-bold" to="/">Mds.com</Link>
            <p className="font-body-sm text-body-sm text-on-primary/80 mt-2">© 2024 Mds.com Marketplace. All rights reserved.</p>
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-wrap gap-x-gutter gap-y-stack-sm md:justify-end">
            <a className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">About Us</a>
            <a className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Contact Support</a>
            <a className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Privacy Policy</a>
            <a className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Terms of Service</a>
            <Link className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" to="/order-tracking">Shipping Info</Link>
            <a className="font-body-sm text-body-sm text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Sell on Mds</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
