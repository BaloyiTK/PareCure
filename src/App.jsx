import { useState } from 'react';

const products = [
  { id: 'bodylotion', category: 'BODY CARE', name: 'PareCure Body Lotion', detail: 'Daily body moisturising care · 250 ml', price: 129.99, image: '/assets/logo/body-lotion-250ml.png', tone: 'blush', alt: 'Body lotion skincare bottle' },
  { id: 'oil', category: 'BODY CARE', name: 'Dark Inner Thigh & Underarms Remover Tissue Oil', detail: 'Targeted body care · 50 ml', price: 99.99, image: '/assets/logo/tissue-oil-50ml.jpg.png', tone: 'olive', alt: 'Body oil and skincare essentials' },
  { id: 'facewash', category: 'FACE CARE', name: 'PareCure Face Wash', detail: 'Daily facial cleansing · 100 ml', price: 79.99, image: '/assets/logo/face-wash-100ml.png', tone: 'blush', alt: 'Facial cleanser skincare product' },
  { id: 'brightening-serum', category: 'FACE CARE', name: 'PareCure Brightening Serum', detail: 'Brightening skincare · 50 ml', price: 179.99, image: '/assets/logo/brightening-serum-50ml.png', tone: 'sand', alt: 'Brightening serum skincare bottle' },
  { id: 'sunscreen', category: 'SUN CARE', name: 'PareCure Sunscreen SPF 50', detail: 'Face sunscreen · 100 ml', price: 199.99, image: 'photo-1556229010-6c3f2c9ca5f8', tone: 'olive', alt: 'Facial sunscreen skincare product' },
];
const photo = (id, width = 900) => id.startsWith('/') ? id : 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=85';
const money = (value) => 'R ' + value.toFixed(2);

function ProductCard({ product, onAdd }) {
  return <article className="product-card">
    <div className={'product-image ' + product.tone}><span className="product-tag">{product.category}</span><img src={photo(product.image)} alt={product.alt} loading="lazy" /></div>
    <div className="product-info"><div><h3>{product.name}</h3><p>{product.detail}</p></div><span className="product-price">{money(product.price)}</span></div>
    <button className="text-link" onClick={() => onAdd(product)}>Add to bag <span>↗</span></button>
  </article>;
}

export default function App() {
  const [bag, setBag] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const addToBag = (product) => { setBag((current) => [...current, product]); setBagOpen(true); };

  return <>
    <div className="announcement">A little care goes a long way <span>✳</span> Discover the PareCure ritual</div>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="PareCure home"><img className="brand-logo" src="/assets/logo/parecure-logo.png" alt="PareCure Beauty" /></a>
      <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <nav className={'main-nav ' + (menuOpen ? 'open' : '')} aria-label="Main navigation" onClick={() => setMenuOpen(false)}><a href="#shop">Shop</a><a href="#story">Our philosophy</a><a href="#ritual">The ritual</a></nav>
      <button className="bag-button" onClick={() => setBagOpen(true)} aria-label={'Open shopping bag, ' + bag.length + ' items'}>Bag <span>{bag.length}</span></button>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">YOUR SKIN. YOUR STORY.</p><h1>Feel good in<br /><em>your own skin.</em></h1><p className="hero-intro">Thoughtful skincare for the moments you give back to yourself. Meet your new everyday ritual.</p><a className="button button-dark" href="#shop">Explore the collection <span>↗</span></a><div className="hero-note"><span className="gold-dot" /> Made for your daily moment of care</div></div>
        <div className="hero-visual"><img src={photo('photo-1693004925174-d9e06209d0ee', 1400)} alt="Woman gently applying face cream to her cheek" /><div className="image-caption"><span>THE PARECURE EDIT</span><span>01 / EVERYDAY ESSENTIALS</span></div></div>
        <div className="hero-side-note">CARE THAT FEELS LIKE YOU · EST. WITH INTENTION</div>
      </section>
      <section className="ticker" aria-label="Brand values"><span>SKINCARE WITH INTENTION</span><b>✳</b><span>YOUR DAILY RITUAL</span><b>✳</b><span>CONFIDENCE IN EVERY DROP</span><b>✳</b><span>SKINCARE WITH INTENTION</span></section>
      <section className="collection section" id="shop"><div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h2>Good skin days,<br /><em>start here.</em></h2></div><p className="section-description">A considered edit of targeted skincare essentials, created to make caring for your skin feel simple, special and entirely yours.</p></div><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={addToBag} />)}</div></section>
      <section className="story section" id="story"><div className="story-image"><img src={photo('photo-1611930022073-b7a4ba5fcccd', 1200)} alt="Skincare products arranged in warm natural light" loading="lazy" /></div><div className="story-copy"><p className="eyebrow">A MORE MINDFUL ROUTINE</p><h2>Less noise.<br /><em>More care.</em></h2><p>We believe skincare should feel personal, uncomplicated and considered. PareCure is about showing up for yourself, one small ritual at a time.</p><a className="text-link" href="#ritual">Get to know us <span>↗</span></a></div></section>
      <section className="ritual section" id="ritual"><p className="eyebrow">MAKE SPACE FOR YOU</p><h2>Your skin deserves<br /><em>a little intention.</em></h2><p>Build a routine that feels good, fits your day and gives you a moment to pause.</p><a className="button button-light" href="#shop">Find your essentials <span>↗</span></a></section>
      <section className="newsletter section"><div><p className="eyebrow">NOTES FROM PARECURE</p><h2>A little beauty<br /><em>in your inbox.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><label htmlFor="email">Skincare notes, new launches and thoughtful offers.</label><div className="email-row"><input id="email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="Subscribe">↗</button></div><small>{subscribed ? 'Thank you — newsletter sign-up will be connected when email services are configured.' : 'By subscribing, you agree to receive updates from PareCure.'}</small></form></section>
    </main>
    <footer className="footer"><a className="wordmark footer-mark" href="#top" aria-label="PareCure home"><img className="brand-logo" src="/assets/logo/parecure-logo.png" alt="PareCure Beauty" /></a><p>Care for the skin you're in.</p><div className="footer-bottom"><span>© {new Date().getFullYear()} PareCure Beauty</span><span>Made with intention.</span><a href="mailto:hello@parecure.com">Get in touch ↗</a></div></footer>
    {bagOpen && <div className="bag-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBagOpen(false); }}><button className="overlay-close" onClick={() => setBagOpen(false)} aria-label="Close shopping bag">×</button><aside className="bag-panel" role="dialog" aria-modal="true" aria-label="Shopping bag"><div className="bag-heading"><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({bag.length})</span></h2></div><div className="bag-items">{bag.length ? bag.map((item, index) => <div className="bag-item" key={item.id + '-' + index}><strong>{item.name} · {item.detail.split('·').pop().trim()}</strong><div style={{ marginTop: 8, color: '#77736b' }}>{money(item.price)}</div></div>) : <p className="empty-bag">Your bag is taking a little breather.<br />Explore the collection to find your essentials.</p>}</div><p className="bag-footnote">Suggested retail prices shown in the collection. Checkout and payment are not yet connected.</p></aside></div>}
  </>;
}
