import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { addToCart, toggleFavorite, cartCount, favoriteCount, favorites } = useApp();
  
  return (
    <>
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto shadow-sm bg-surface-white dark:bg-surface-container transition-all duration-200">
        <div className="flex items-center gap-gutter">
          <Link className="flex items-center gap-2 transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/">
            <img alt="Mds.com Logo" className="h-10 w-10 object-contain rounded-sm mix-blend-multiply" src="/images/mds-logo.jpg" />
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed hidden md:block">Mds.com</span>
          </Link>
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 ml-8">
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/category/fashion">Fashion</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/category/footwear">Footwear</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/category/electronics">Electronics</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/category/home-appliances">Home</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <input className="w-64 h-10 px-4 pl-10 rounded-full border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-body-sm text-body-sm" placeholder="Search..." type="text" />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>search</span>
          </div>
          {/* Icons */}
          <button className="text-secondary dark:text-secondary-fixed-dim transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform sm:hidden">
            <span className="material-symbols-outlined" data-icon="search" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>search</span>
          </button>
          <button className="text-secondary dark:text-secondary-fixed-dim transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform relative">
            <span className="material-symbols-outlined" data-icon="favorite" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>favorite</span>
            {favoriteCount > 0 && <span className="absolute -top-1 -right-1 bg-error text-on-error text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favoriteCount}</span>}
          </button>
          <Link className="text-secondary dark:text-secondary-fixed-dim transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform relative" to="/checkout">
            <span className="material-symbols-outlined" data-icon="shopping_cart" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>shopping_cart</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-error text-on-error text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>
          <Link className="text-secondary dark:text-secondary-fixed-dim transition-all duration-200 hover:opacity-80 scale-95 active:scale-100 transition-transform" to="/login">
            <span className="material-symbols-outlined" data-icon="account_circle" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>account_circle</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-container-max mx-auto w-full pb-stack-lg">
        {/* Hero Section */}
        <section className="w-full px-margin-mobile md:px-margin-desktop mt-stack-md mb-stack-lg">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-surface-container-highest flex items-center" data-alt="A high-quality, professional e-commerce banner for a 'Big Shopping Sale' featuring high-end consumer electronics and lifestyle products." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC7Q5cex5Uf2O406SzhDbslF0FKJtIrve0EJjUzbhjnciDZs6poLanL8y33HlibK4MQ5BvuA2P3L3mfucycGiSMoRFmsz8oXc119GNzLjIdPfljtzr7O9DvUWFmI3ciPAUKcDbinsGgBW6QWJw37c0tjgfip8fi3RkgJf3gyEJFIVT97_eKbjZ8hI0V6v-ntF4IqxZL4j-_TtVryn1P86qg_Rej7O1jXLKBowvSHiHtGcs4L6mct7gA9A")' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container/90 to-transparent"></div>
            <div className="relative z-10 px-8 md:px-16 w-full md:w-1/2 flex flex-col items-start gap-4">
              <span class="inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full font-label-md text-label-md uppercase tracking-wider">Big Shopping Sale</span>
              <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-surface-white font-bold leading-tight">Up to 50% Off<br />On Everything.</h1>
              <p className="font-body-lg text-body-lg text-surface-white/80 max-w-md">Discover premium products across fashion, tech, and home essentials. Limited time offers you don't want to miss.</p>
              <button className="mt-4 bg-secondary hover:bg-vibrant-accent text-on-secondary font-label-md text-label-md px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2">
                Shop Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="w-full px-margin-mobile md:px-margin-desktop mb-stack-lg">
          <div className="flex items-center justify-between mb-stack-sm">
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-on-surface">Shop by Category</h2>
            <a className="font-body-sm text-body-sm text-secondary hover:underline flex items-center gap-1" href="#">View All <span className="material-symbols-outlined text-[16px]">chevron_right</span></a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Category Item 1 */}
            <Link className="group flex flex-col items-center justify-center p-6 bg-surface-white rounded-xl border border-surface-variant hover:border-secondary hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1" to="/category/fashion">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-3 group-hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-surface-white transition-colors duration-300">checkroom</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center">Fashion</span>
            </Link>
            {/* Category Item 2 */}
            <Link className="group flex flex-col items-center justify-center p-6 bg-surface-white rounded-xl border border-surface-variant hover:border-secondary hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1" to="/category/electronics">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-3 group-hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-surface-white transition-colors duration-300">devices</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center">Electronics</span>
            </Link>
            {/* Category Item 3 */}
            <Link className="group flex flex-col items-center justify-center p-6 bg-surface-white rounded-xl border border-surface-variant hover:border-secondary hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1" to="/category/home-appliances">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-3 group-hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-surface-white transition-colors duration-300">chair</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center">Home</span>
            </Link>
            {/* Category Item 4 */}
            <Link className="group flex flex-col items-center justify-center p-6 bg-surface-white rounded-xl border border-surface-variant hover:border-secondary hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1" to="/category/sports-fitness">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-3 group-hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-surface-white transition-colors duration-300">directions_run</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center">Sports</span>
            </Link>
            {/* Category Item 5 */}
            <Link className="group flex flex-col items-center justify-center p-6 bg-surface-white rounded-xl border border-surface-variant hover:border-secondary hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 hidden lg:flex" to="/category/beauty-personal-care">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-3 group-hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-surface-white transition-colors duration-300">face</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center">Beauty</span>
            </Link>
            {/* Category Item 6 */}
            <Link className="group flex flex-col items-center justify-center p-6 bg-surface-white rounded-xl border border-surface-variant hover:border-secondary hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 hidden lg:flex" to="/category/accessories">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-3 group-hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-surface-white transition-colors duration-300">local_mall</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center">Accessories</span>
            </Link>
          </div>
        </section>

        {/* Trending Products */}
        <section className="w-full px-margin-mobile md:px-margin-desktop mb-stack-lg">
          <div className="flex items-center justify-between mb-stack-sm">
            <h2 className="font-headline-lg text-headline-sm md:text-headline-lg text-on-surface">Trending Products</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">arrow_back</span></button>
              <button className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center hover:bg-vibrant-accent transition-colors"><span className="material-symbols-outlined">arrow_forward</span></button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Product Card 1 */}
            <div className="bg-surface-white rounded-xl overflow-hidden border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col group">
              <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
                <Link to="/product-details" state={{ product: { id: 'p-1', title: 'Noise Cancelling Wireless Headphones', price: 299.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXzmAYdDsHfqP2hG0Tg-fDN8rAJSVGekvFV2aFB8CmkJZEcqh3dMOLKJrdNuDnFzEZSKR7YpDWRa-ToScK7d064fyS5ZP84xS2LfQWgJJRlrh6ydSuENTUwoGBrQ7IOzNvb0_-PkdwRDQ1hJwqz2U8ixY0sb66G6zgOaOAbWkfvB9VBa6TRi05jZ4Fqsgc2Lurt0vSF9G4OK7KZvmhsQ9HnsICIcAsFZjwMMWqMuLG3DgkipfuXuXXRg', rating: 4.9, reviews: 128 } }}>
                  <img className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="A premium wireless over-ear headphone resting on a sleek white marble surface. The headphone is matte black with silver accents. Soft, natural light highlights its textures against a clean, minimalist light-grey background. High-resolution product photography style fitting a modern tech e-commerce store." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXzmAYdDsHfqP2hG0Tg-fDN8rAJSVGekvFV2aFB8CmkJZEcqh3dMOLKJrdNuDnFzEZSKR7YpDWRa-ToScK7d064fyS5ZP84xS2LfQWgJJRlrh6ydSuENTUwoGBrQ7IOzNvb0_-PkdwRDQ1hJwqz2U8ixY0sb66G6zgOaOAbWkfvB9VBa6TRi05jZ4Fqsgc2Lurt0vSF9G4OK7KZvmhsQ9HnsICIcAsFZjwMMWqMuLG3DgkipfuXuXXRg" />
                </Link>
                <div className="absolute top-3 left-3 bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">Bestseller</div>
                <button onClick={() => toggleFavorite('p-1')} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-white/80 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: favorites.includes('p-1') ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">4.9 (128 reviews)</span>
                </div>
                <Link to="/product-details" state={{ product: { id: 'p-1', title: 'Noise Cancelling Wireless Headphones', price: 299.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXzmAYdDsHfqP2hG0Tg-fDN8rAJSVGekvFV2aFB8CmkJZEcqh3dMOLKJrdNuDnFzEZSKR7YpDWRa-ToScK7d064fyS5ZP84xS2LfQWgJJRlrh6ydSuENTUwoGBrQ7IOzNvb0_-PkdwRDQ1hJwqz2U8ixY0sb66G6zgOaOAbWkfvB9VBa6TRi05jZ4Fqsgc2Lurt0vSF9G4OK7KZvmhsQ9HnsICIcAsFZjwMMWqMuLG3DgkipfuXuXXRg', rating: 4.9, reviews: 128 } }}>
                  <h3 className="font-headline-sm text-body-lg font-semibold text-on-surface mb-2 line-clamp-2 hover:text-secondary transition-colors">Noise Cancelling Wireless Headphones</h3>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-headline-md text-headline-sm text-on-surface">$299.00</span>
                  <button onClick={() => addToCart({ id: 'p-1', title: 'Noise Cancelling Wireless Headphones', price: 299.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXzmAYdDsHfqP2hG0Tg-fDN8rAJSVGekvFV2aFB8CmkJZEcqh3dMOLKJrdNuDnFzEZSKR7YpDWRa-ToScK7d064fyS5ZP84xS2LfQWgJJRlrh6ydSuENTUwoGBrQ7IOzNvb0_-PkdwRDQ1hJwqz2U8ixY0sb66G6zgOaOAbWkfvB9VBa6TRi05jZ4Fqsgc2Lurt0vSF9G4OK7KZvmhsQ9HnsICIcAsFZjwMMWqMuLG3DgkipfuXuXXRg' })} className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center hover:bg-secondary hover:text-surface-white transition-colors cursor-pointer border-none outline-none">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-surface-white rounded-xl overflow-hidden border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col group">
              <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
                <Link to="/product-details" state={{ product: { id: 'p-2', title: 'Minimalist Smartwatch Series 5', price: 199.50, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWnMvgwUW5K0xJ6uRZPyaGFcepQXDPRW1z-dWOTcrdMzPpvcHf6D02WSkA8K-5TBEuvbsLX3lUe7rDPvyZWSxySPxA27lO5AK2_b7jdEfg98sGA_4dDAE6Np-v49kceS7F8B3QLmdn90qGuLxuV0UJsyoZKT7qOswCpAD99Wcem2OHoiJI7oM_5HvlQY-gySnOWzb-05Mq2P3EyPEWkdDeRym6_q_OSXr1MyghYmi0KXFYU4ydb3EP1Q', rating: 4.7, reviews: 84 } }}>
                  <img className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="A stylish minimalist smartwatch with a silver metallic mesh band displayed on a clean white pedestal. Crisp, modern lighting illuminates the watch face, showing a digital time display. The background is a soft, out-of-focus light blue, conveying a sophisticated, high-end lifestyle aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWnMvgwUW5K0xJ6uRZPyaGFcepQXDPRW1z-dWOTcrdMzPpvcHf6D02WSkA8K-5TBEuvbsLX3lUe7rDPvyZWSxySPxA27lO5AK2_b7jdEfg98sGA_4dDAE6Np-v49kceS7F8B3QLmdn90qGuLxuV0UJsyoZKT7qOswCpAD99Wcem2OHoiJI7oM_5HvlQY-gySnOWzb-05Mq2P3EyPEWkdDeRym6_q_OSXr1MyghYmi0KXFYU4ydb3EP1Q" />
                </Link>
                <button onClick={() => toggleFavorite('p-2')} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-white/80 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: favorites.includes('p-2') ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">4.7 (84 reviews)</span>
                </div>
                <Link to="/product-details" state={{ product: { id: 'p-2', title: 'Minimalist Smartwatch Series 5', price: 199.50, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWnMvgwUW5K0xJ6uRZPyaGFcepQXDPRW1z-dWOTcrdMzPpvcHf6D02WSkA8K-5TBEuvbsLX3lUe7rDPvyZWSxySPxA27lO5AK2_b7jdEfg98sGA_4dDAE6Np-v49kceS7F8B3QLmdn90qGuLxuV0UJsyoZKT7qOswCpAD99Wcem2OHoiJI7oM_5HvlQY-gySnOWzb-05Mq2P3EyPEWkdDeRym6_q_OSXr1MyghYmi0KXFYU4ydb3EP1Q', rating: 4.7, reviews: 84 } }}>
                  <h3 className="font-headline-sm text-body-lg font-semibold text-on-surface mb-2 line-clamp-2 hover:text-secondary transition-colors">Minimalist Smartwatch Series 5</h3>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-headline-md text-headline-sm text-on-surface">$199.50</span>
                  <button onClick={() => addToCart({ id: 'p-2', title: 'Minimalist Smartwatch Series 5', price: 199.50, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWnMvgwUW5K0xJ6uRZPyaGFcepQXDPRW1z-dWOTcrdMzPpvcHf6D02WSkA8K-5TBEuvbsLX3lUe7rDPvyZWSxySPxA27lO5AK2_b7jdEfg98sGA_4dDAE6Np-v49kceS7F8B3QLmdn90qGuLxuV0UJsyoZKT7qOswCpAD99Wcem2OHoiJI7oM_5HvlQY-gySnOWzb-05Mq2P3EyPEWkdDeRym6_q_OSXr1MyghYmi0KXFYU4ydb3EP1Q' })} className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center hover:bg-secondary hover:text-surface-white transition-colors cursor-pointer border-none outline-none">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-surface-white rounded-xl overflow-hidden border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col group">
              <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
                <img className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="A modern, ergonomic office chair in light grey fabric with white frame detailing. The chair is positioned at a three-quarter angle against a pristine white studio background. Bright, even lighting highlights the sleek lines and breathable mesh texture, emphasizing premium comfort for home or office." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1ELLRtqmEZUm2rKtc6U6bdicSATvUi_JRyaWe8WYN6QqoQPVW-n2FlZxvh86C8mKF5PlcX7N1t-UDjbPg5pPMylox_DduJEYOsFT-LDNOB6eC3Lg_tTOAiT6q8AaNEqRph1oU5nUr3kxg6xJriQk-1miaaHV0rDpoqRSYzDRgmIN31SXoaj7EdGTYrgPKIdjUUaghwyLQFdirn2XSOqVtSObHTJXjxVH124dBFa67jc54LzkSsn2p8w" />
                <div className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">New Arrival</div>
                <button onClick={() => toggleFavorite('p-3')} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-white/80 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: favorites.includes('p-3') ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">5.0 (22 reviews)</span>
                </div>
                <h3 class="font-headline-sm text-body-lg font-semibold text-on-surface mb-2 line-clamp-2">Ergonomic Mesh Office Chair</h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-headline-md text-headline-sm text-on-surface">$349.00</span>
                  <button onClick={() => addToCart({ id: 'p-3', title: 'Ergonomic Mesh Office Chair', price: 349.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1ELLRtqmEZUm2rKtc6U6bdicSATvUi_JRyaWe8WYN6QqoQPVW-n2FlZxvh86C8mKF5PlcX7N1t-UDjbPg5pPMylox_DduJEYOsFT-LDNOB6eC3Lg_tTOAiT6q8AaNEqRph1oU5nUr3kxg6xJriQk-1miaaHV0rDpoqRSYzDRgmIN31SXoaj7EdGTYrgPKIdjUUaghwyLQFdirn2XSOqVtSObHTJXjxVH124dBFa67jc54LzkSsn2p8w' })} className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center hover:bg-secondary hover:text-surface-white transition-colors cursor-pointer border-none outline-none">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="bg-surface-white rounded-xl overflow-hidden border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col group hidden lg:flex">
              <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
                <img className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="A stylish matte ceramic coffee mug in a deep navy blue, resting on a light wooden coaster. Beside it, a few scattered coffee beans. The scene is shot from slightly above in a bright, modern kitchen setting with soft shadows, conveying a cozy morning vibe in a premium lifestyle context." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD00BCax-FsFrQx99hRJAZMS8jJDmn5ls0MIYaVOga_rI3kQtSvJxZA4-0FERAorvapg6W_MJ3sWnsxNFYnl6TykxhYcHOQtVgcPQBUaKz3EQZXWrSB-BhhmpfyQwGh1H1mMYEGHLnWWcAOmAgA_3BdhBJ8aTCpa9Gb5voinRK_tfC7_aMIfmxOhc0Wd3aDjtvMxOv9oos_mrfOygnmddgFYI5293MwBmxPdQgO6XfmjV5UH4dmsis4cg" />
                <button onClick={() => toggleFavorite('p-4')} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-white/80 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: favorites.includes('p-4') ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">4.8 (105 reviews)</span>
                </div>
                <h3 class="font-headline-sm text-body-lg font-semibold text-on-surface mb-2 line-clamp-2">Artisan Ceramic Coffee Mug</h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-headline-md text-headline-sm text-on-surface">$24.00</span>
                  <button onClick={() => addToCart({ id: 'p-4', title: 'Artisan Ceramic Coffee Mug', price: 24.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD00BCax-FsFrQx99hRJAZMS8jJDmn5ls0MIYaVOga_rI3kQtSvJxZA4-0FERAorvapg6W_MJ3sWnsxNFYnl6TykxhYcHOQtVgcPQBUaKz3EQZXWrSB-BhhmpfyQwGh1H1mMYEGHLnWWcAOmAgA_3BdhBJ8aTCpa9Gb5voinRK_tfC7_aMIfmxOhc0Wd3aDjtvMxOv9oos_mrfOygnmddgFYI5293MwBmxPdQgO6XfmjV5UH4dmsis4cg' })} className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center hover:bg-secondary hover:text-surface-white transition-colors cursor-pointer border-none outline-none">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-stack-lg border-t border-outline-variant bg-primary dark:bg-surface-container-lowest transition-colors">
        <div className="w-full px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto text-on-primary dark:text-on-surface font-body-sm text-body-sm">
          <div className="col-span-1 md:col-span-1 flex flex-col items-start">
            <span className="font-headline-sm text-headline-sm text-on-primary mb-4">Mds.com</span>
            <p className="opacity-80 mb-6">Your premier destination for high-quality products. We connect you with the best brands globally.</p>
            <div className="flex gap-4">
              <a className="opacity-80 hover:opacity-100 transition-opacity" href="#"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>qr_code_2</span></a>
              <a className="opacity-80 hover:opacity-100 transition-opacity" href="#"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>share</span></a>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-label-md uppercase tracking-wider opacity-60 mb-2">Company</span>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">About Us</a>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Contact Support</a>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Careers</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-label-md uppercase tracking-wider opacity-60 mb-2">Legal</span>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Privacy Policy</a>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Terms of Service</a>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Cookie Policy</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-label-md uppercase tracking-wider opacity-60 mb-2">Services</span>
            <Link className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" to="/order-tracking">Shipping Info / Tracking</Link>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Sell on Mds</a>
            <a className="text-on-primary/80 hover:text-on-primary hover:underline decoration-1 underline-offset-4 opacity-100 hover:opacity-80 transition-opacity" href="#">Returns</a>
          </div>
        </div>
        <div className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-stack-lg pt-stack-sm border-t border-on-primary/20 flex flex-col md:flex-row items-center justify-between text-on-primary/60 font-body-sm text-body-sm">
          <p className="">© 2024 Mds.com Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="material-symbols-outlined text-[24px]">payments</span>
            <span className="material-symbols-outlined text-[24px]">credit_card</span>
          </div>
        </div>
      </footer>
    </>
  );
}
