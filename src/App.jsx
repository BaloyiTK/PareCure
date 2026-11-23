import { useMemo, useState } from 'react';

const products = [
  { id: 'bodylotion', category: 'BODY CARE', name: 'PareCure Body Lotion', detail: 'Daily body moisturising care · 250 ml', price: 129.99, image: '/assets/logo/body-lotion-250ml.png', tone: 'blush', alt: 'PareCure body lotion bottle' },
  { id: 'oil', category: 'BODY CARE', name: 'Dark Inner Thigh & Underarms Remover Tissue Oil', detail: 'Targeted body care · 50 ml', price: 99.99, image: '/assets/logo/tissue-oil-50ml.jpg.png', tone: 'olive', alt: 'PareCure tissue oil' },
  { id: 'facewash', category: 'FACE CARE', name: 'PareCure Face Wash', detail: 'Daily facial cleansing · 100 ml', price: 79.99, image: '/assets/logo/face-wash-100ml.png', tone: 'blush', alt: 'PareCure face wash' },
  { id: 'brightening-serum', category: 'FACE CARE', name: 'PareCure Brightening Serum', detail: 'Brightening skincare · 50 ml', price: 179.99, image: '/assets/logo/brightening-serum-50ml.png', tone: 'sand', alt: 'PareCure brightening serum' },
];
const photo = (id, width = 900) => id.startsWith('/') ? id : 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=85';
const money = (value) => 'R ' + value.toFixed(2);

function ProductCard({ product, onAdd }) {
  return <article className="product-card">
    <div className={'product-image ' + product.tone}>
      <span className="product-tag">{product.category}</span>
      <span className="product-card-badge">PARECURE ESSENTIAL</span>
      <img src={photo(product.image)} alt={product.alt} loading="lazy" />
      <button className="product-quick-add" onClick={() => onAdd(product)} aria-label={'Add ' + product.name + ' to bag'}>＋</button>
      <span className="product-image-hint">VIEW PRODUCT</span>
    </div>
    <div className="product-info">
      <div className="product-copy"><h3>{product.name}</h3><p>{product.detail}</p><span className="product-rating"><small>EVERYDAY SKINCARE ESSENTIAL</small></span></div>
      <span className="product-price">{money(product.price)}</span>
    </div>
    <button className="product-add-button" onClick={() => onAdd(product)}>Add to bag <span>↗</span></button>
  </article>;
}

function AccountDialog({ onClose }) {
  const [mode, setMode] = useState('signin');
  const [submitted, setSubmitted] = useState(false);
  return <div className="account-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
      <button className="dialog-close" onClick={onClose} aria-label="Close account dialog">×</button>
      <p className="eyebrow">YOUR PARECURE ACCOUNT</p>
      <h2 id="account-title">{mode === 'signin' ? 'Welcome back.' : 'Create your account.'}</h2>
      <p className="account-intro">{mode === 'signin' ? 'Sign in to keep your details and orders together.' : 'A few details are all you need to get started.'}</p>
      <div className="account-tabs"><button className={mode === 'signin' ? 'active' : ''} onClick={() => { setMode('signin'); setSubmitted(false); }}>Sign in</button><button className={mode === 'signup' ? 'active' : ''} onClick={() => { setMode('signup'); setSubmitted(false); }}>Create account</button></div>
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        {mode === 'signup' && <label>Full name<input autoComplete="name" type="text" placeholder="Your name" required /></label>}
        <label>Email address<input autoComplete="email" type="email" placeholder="you@example.com" required /></label>
        <label>Password<input autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} type="password" placeholder="At least 8 characters" minLength="8" required /></label>
        {mode === 'signup' && <label className="consent-row"><input type="checkbox" required /> I agree to the terms and privacy policy.</label>}
        <button className="button button-dark account-submit" type="submit">{mode === 'signin' ? 'Sign in' : 'Create account'} <span>↗</span></button>
        {submitted && <p className="form-notice" role="status">The account service is not connected yet. Your details have not been sent or saved.</p>}
      </form>
      <p className="account-footnote">Secure account access will be enabled when PareCure authentication is connected.</p>
    </section>
  </div>;
}


function CheckoutDialog({ bag, subtotal, onClose, onOrderComplete }) {
  const [stage, setStage] = useState('details');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', suburb: '', city: '', province: 'Gauteng', postalCode: '' });
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const updateCustomer = (field, value) => setCustomer((current) => ({ ...current, [field]: value }));
  const placeDemoPayment = (outcome) => {
    if (outcome === 'success') {
      setOrderNumber('PC-' + String(Date.now()).slice(-7));
      setPaymentStatus('success');
      setStage('confirmation');
    } else if (outcome === 'failure') {
      setPaymentStatus('failure');
      setStage('result');
    } else {
      setPaymentStatus('cancelled');
      setStage('result');
    }
  };

  return <div className="checkout-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="checkout-dialog" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <button className="dialog-close" onClick={onClose} aria-label="Close checkout">×</button>
      <div className="checkout-topline"><span>PARECURE BEAUTY</span><span><span className="checkout-lock">▣</span> DEMO SECURE CHECKOUT</span></div>
      <div className="checkout-progress" aria-label="Checkout progress">
        <span className={stage === 'details' ? 'active' : 'complete'}>1. Delivery</span><i />
        <span className={stage === 'payment' || stage === 'result' ? 'active' : stage === 'confirmation' ? 'complete' : ''}>2. Payment</span><i />
        <span className={stage === 'confirmation' ? 'active' : ''}>3. Confirmation</span>
      </div>

      {stage === 'details' && <>
        <p className="eyebrow">ALMOST YOURS</p>
        <h2 id="checkout-title">Delivery details.</h2>
        <p className="checkout-intro">Where should we send your PareCure essentials?</p>
        <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setStage('payment'); }}>
          <div className="checkout-fields">
            <label>Full name<input autoComplete="name" required value={customer.name} onChange={(event) => updateCustomer('name', event.target.value)} placeholder="Full name" /></label>
            <label>Email address<input type="email" autoComplete="email" required value={customer.email} onChange={(event) => updateCustomer('email', event.target.value)} placeholder="you@example.com" /></label>
            <label>Phone number<input type="tel" autoComplete="tel" required value={customer.phone} onChange={(event) => updateCustomer('phone', event.target.value)} placeholder="e.g. 071 234 5678" /></label>
            <label className="checkout-wide">Street address<input autoComplete="street-address" required value={customer.address} onChange={(event) => updateCustomer('address', event.target.value)} placeholder="House number and street" /></label>
            <label>Suburb<input autoComplete="address-line2" required value={customer.suburb} onChange={(event) => updateCustomer('suburb', event.target.value)} placeholder="Suburb" /></label>
            <label>City / town<input autoComplete="address-level2" required value={customer.city} onChange={(event) => updateCustomer('city', event.target.value)} placeholder="City" /></label>
            <label>Province<select required value={customer.province} onChange={(event) => updateCustomer('province', event.target.value)}><option>Eastern Cape</option><option>Free State</option><option>Gauteng</option><option>KwaZulu-Natal</option><option>Limpopo</option><option>Mpumalanga</option><option>Northern Cape</option><option>North West</option><option>Western Cape</option></select></label>
            <label>Postal code<input autoComplete="postal-code" required inputMode="numeric" value={customer.postalCode} onChange={(event) => updateCustomer('postalCode', event.target.value)} placeholder="Postal code" /></label>
          </div>
          <div className="checkout-order-summary"><span>{bag.reduce((n, item) => n + item.quantity, 0)} item(s) in your order</span><strong>{money(subtotal)}</strong></div>
          <p className="checkout-demo-note">Delivery pricing is not connected in this demo. No delivery fee is being charged or calculated.</p>
          <button className="button button-dark checkout-primary" type="submit">Continue to payment <span>↗</span></button>
        </form>
      </>}

      {stage === 'payment' && <>
        <p className="eyebrow">DEMO PAYMENT GATEWAY</p>
        <h2 id="checkout-title">Choose how to pay.</h2>
        <p className="checkout-intro">This is a payment simulation. No money will be charged and no card or banking details are transmitted.</p>
        <div className="payment-methods">
          <label className={paymentMethod === 'card' ? 'selected' : ''}><input type="radio" name="payment-method" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /><span className="payment-method-icon">▣</span><span><strong>Bank card</strong><small>Visa · Mastercard</small></span><b>›</b></label>
          <label className={paymentMethod === 'eft' ? 'selected' : ''}><input type="radio" name="payment-method" value="eft" checked={paymentMethod === 'eft'} onChange={() => setPaymentMethod('eft')} /><span className="payment-method-icon">⇄</span><span><strong>Instant EFT</strong><small>Simulated bank payment</small></span><b>›</b></label>
          <label className={paymentMethod === 'wallet' ? 'selected' : ''}><input type="radio" name="payment-method" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} /><span className="payment-method-icon">◈</span><span><strong>PayFast-style checkout</strong><small>Hosted payment experience preview</small></span><b>›</b></label>
        </div>
        <div className="gateway-order-total"><span>Order total</span><strong>{money(subtotal)}</strong></div>
        <div className="demo-actions">
          <button className="button button-dark checkout-primary" onClick={() => placeDemoPayment('success')}>Simulate successful payment <span>↗</span></button>
          <button className="demo-secondary" onClick={() => placeDemoPayment('failure')}>Test a declined payment</button>
          <button className="demo-cancel" onClick={() => placeDemoPayment('cancel')}>Cancel payment</button>
        </div>
        <p className="checkout-demo-note">Demo controls only · No live payment provider is connected.</p>
        <button className="checkout-back" onClick={() => setStage('details')}>← Back to delivery details</button>
      </>}

      {stage === 'result' && <>
        <div className={'payment-result-icon ' + (paymentStatus === 'failure' ? 'failed' : 'cancelled')}>{paymentStatus === 'failure' ? '!' : '×'}</div>
        <p className="eyebrow">PAYMENT {paymentStatus === 'failure' ? 'NOT APPROVED' : 'CANCELLED'}</p>
        <h2 id="checkout-title">{paymentStatus === 'failure' ? 'That payment didn’t go through.' : 'Payment was cancelled.'}</h2>
        <p className="checkout-intro">{paymentStatus === 'failure' ? 'This is a simulated decline. Your order has not been placed and no money was charged.' : 'You left the demo payment step. Your order has not been placed and no money was charged.'}</p>
        <div className="demo-actions"><button className="button button-dark checkout-primary" onClick={() => { setPaymentStatus(''); setStage('payment'); }}>Try payment again <span>↗</span></button><button className="checkout-back" onClick={() => setStage('details')}>Edit delivery details</button><button className="demo-cancel" onClick={onClose}>Return to shopping bag</button></div>
      </>}

      {stage === 'confirmation' && <>
        <div className="payment-result-icon success">✓</div>
        <p className="eyebrow">PAYMENT SIMULATION COMPLETE</p>
        <h2 id="checkout-title">Thank you, {customer.name.split(' ')[0]}.</h2>
        <p className="checkout-intro">The demo payment was successful. Your simulated order has been confirmed.</p>
        <div className="confirmation-card"><span>DEMO ORDER NUMBER</span><strong>{orderNumber}</strong><div><span>Payment method</span><b>{paymentMethod === 'card' ? 'Bank card' : paymentMethod === 'eft' ? 'Instant EFT' : 'PayFast-style checkout'}</b></div><div><span>Order total</span><b>{money(subtotal)}</b></div><div><span>Delivery to</span><b>{customer.suburb}, {customer.city}</b></div><small>No real payment was taken. This confirmation is for demonstration only.</small></div>
        <button className="button button-dark checkout-primary" onClick={() => onOrderComplete({ orderNumber, customer, paymentMethod, total: subtotal, items: bag })}>Finish and return to store <span>↗</span></button>
      </>}
    </section>
  </div>;
}

export default function App() {
  const [bag, setBag] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [sort, setSort] = useState('featured');

  const visibleProducts = useMemo(() => {
    let list = products.filter((product) => (category === 'ALL' || product.category === category) && (product.name + ' ' + product.detail).toLowerCase().includes(search.toLowerCase()));
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, search, sort]);

  const addToBag = (product) => {
    setBag((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
    });
    setBagOpen(true);
  };
  const updateQuantity = (id, change) => setBag((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0));
  const subtotal = bag.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = bag.reduce((total, item) => total + item.quantity, 0);

  return <>
    <div className="announcement">A little care goes a long way <span>✳</span> Discover the PareCure ritual</div>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="PareCure home"><img className="brand-logo" src="/assets/logo/parecure-logo.png" alt="PareCure Beauty" /></a>
      <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <nav className={'main-nav ' + (menuOpen ? 'open' : '')} aria-label="Main navigation" onClick={() => setMenuOpen(false)}><a href="#shop">Shop</a><a href="#story">Our philosophy</a><a href="#ritual">The ritual</a></nav>
      <div className="header-actions"><button className="account-button" onClick={() => setAccountOpen(true)}>Account</button><button className="bag-button" onClick={() => setBagOpen(true)} aria-label={'Open shopping bag, ' + itemCount + ' items'}>Bag <span>{itemCount}</span></button></div>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">YOUR SKIN. YOUR STORY.</p><h1>Feel good in<br /><em>your own skin.</em></h1><p className="hero-intro">Thoughtful skincare for the moments you give back to yourself. Meet your new everyday ritual.</p><a className="button button-dark" href="#shop">Explore the collection <span>↗</span></a><div className="hero-note"><span className="gold-dot" /> Made for your daily moment of care</div></div>
        <div className="hero-visual"><img src="/assets/logo/HeroImage.png" alt="Woman gently applying face cream to her cheek" /><div className="image-caption"><span>THE PARECURE EDIT</span><span>01 / EVERYDAY ESSENTIALS</span></div></div>
        <div className="hero-side-note">CARE THAT FEELS LIKE YOU · EST. WITH INTENTION</div>
      </section>
      <section className="ticker" aria-label="Brand values"><span>SKINCARE WITH INTENTION</span><b>✳</b><span>YOUR DAILY RITUAL</span><b>✳</b><span>CONFIDENCE IN EVERY DROP</span><b>✳</b><span>SKINCARE WITH INTENTION</span></section>
      <section className="collection section" id="shop">
        <div className="catalogue-tools"><label className="search-field"><span>⌕</span><input type="search" placeholder="Search products" aria-label="Search products" value={search} onChange={(event) => setSearch(event.target.value)} /></label><label className="filter-field"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="ALL">All products</option><option value="FACE CARE">Face care</option><option value="BODY CARE">Body care</option><option value="SUN CARE">Sun care</option></select></label><label className="filter-field"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
        <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToBag} />)}</div>
        {!visibleProducts.length && <p className="no-products">No products match that search. Try another name or category.</p>}
      </section>
      <section className="story section" id="story"><div className="story-image"><img src={photo('photo-1611930022073-b7a4ba5fcccd', 1200)} alt="Skincare products arranged in warm natural light" loading="lazy" /></div><div className="story-copy"><p className="eyebrow">A MORE MINDFUL ROUTINE</p><h2>Less noise.<br /><em>More care.</em></h2><p>We believe skincare should feel personal, uncomplicated and considered. PareCure is about showing up for yourself, one small ritual at a time.</p><a className="text-link" href="#ritual">Get to know us <span>↗</span></a></div></section>
      <section className="ritual section" id="ritual"><p className="eyebrow">MAKE SPACE FOR YOU</p><h2>Your skin deserves<br /><em>a little intention.</em></h2><p>Build a routine that feels good, fits your day and gives you a moment to pause.</p><a className="button button-light" href="#shop">Find your essentials <span>↗</span></a></section>
      <section className="newsletter section"><div><p className="eyebrow">NOTES FROM PARECURE</p><h2>A little beauty<br /><em>in your inbox.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><label htmlFor="email">Skincare notes, new launches and thoughtful offers.</label><div className="email-row"><input id="email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="Subscribe">↗</button></div><small>{subscribed ? 'Thank you. Newsletter delivery will be enabled when email services are connected.' : 'By subscribing, you agree to receive updates from PareCure.'}</small></form></section>
    </main>
    <footer className="footer"><a className="wordmark footer-mark" href="#top" aria-label="PareCure home"><img className="brand-logo" src="/assets/logo/parecure-logo.png" alt="PareCure Beauty" /></a><p>Care for the skin you're in.</p><div className="footer-links"><a href="#shop">Shop</a><button onClick={() => setAccountOpen(true)}>My account</button><a href="mailto:hello@parecure.com">Contact</a><a href="#footer-policies">Delivery & returns</a><a href="#footer-policies">Privacy & terms</a></div><div className="footer-bottom" id="footer-policies"><span>© {new Date().getFullYear()} PareCure Beauty</span><span>Made with intention.</span><a href="mailto:hello@parecure.com">Get in touch ↗</a></div></footer>
    {bagOpen && <div className="bag-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBagOpen(false); }}><button className="overlay-close" onClick={() => setBagOpen(false)} aria-label="Close shopping bag">×</button><aside className="bag-panel" role="dialog" aria-modal="true" aria-label="Shopping bag"><div className="bag-heading"><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({itemCount})</span></h2></div><div className="bag-items">{bag.length ? bag.map((item) => <div className="bag-item" key={item.id}><img src={photo(item.image, 180)} alt="" /><div className="bag-item-copy"><strong>{item.name}</strong><small>{item.detail}</small><b>{money(item.price)}</b><div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)} aria-label={'Decrease ' + item.name + ' quantity'}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label={'Increase ' + item.name + ' quantity'}>+</button><button className="remove-item" onClick={() => setBag((current) => current.filter((entry) => entry.id !== item.id))}>Remove</button></div></div></div>) : <p className="empty-bag">Your bag is taking a little breather.<br />Explore the collection to find your essentials.</p>}</div><div className="bag-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>Delivery and any applicable charges are calculated at checkout.</small><button className="button button-dark checkout-button" disabled={!bag.length} onClick={() => { setBagOpen(false); setCheckoutOpen(true); }}>Continue to checkout <span>↗</span></button><p>Demo checkout only. No real payment is processed.</p></div></aside></div>}
    {checkoutOpen && <CheckoutDialog bag={bag} subtotal={subtotal} onClose={() => setCheckoutOpen(false)} onOrderComplete={() => { setBag([]); setCheckoutOpen(false); }} />}
    {accountOpen && <AccountDialog onClose={() => setAccountOpen(false)} />}
  </>;
}
