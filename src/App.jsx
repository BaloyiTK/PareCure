import { useEffect, useMemo, useState } from 'react';

const products = [
  {
    id: 'bodylotion', category: 'BODY CARE', name: 'PareCure BEAUTY Body Lotion',
    detail: 'Nourish · Hydrate · Rejuvenate · 250 ml',
    tagline: 'NOURISH • HYDRATE • REJUVENATE — FOR SOFT, SMOOTH & HEALTHY SKIN',
    subTagline: 'SILKY SMOOTH SKIN EVERYDAY',
    description: 'A rich, non-greasy formula that deeply moisturizes and nourishes skin. Enriched with Shea Butter, Aloe Vera, Green Tea, and Vitamin E to help soothe dryness, restore softness, and keep skin healthy, smooth, and radiant all day long.',
    highlights: ['Shea Butter — Deeply moisturizes', 'Aloe Vera — Soothes & calms', 'Green Tea — Antioxidant protection', 'Vitamin E — Nourishes & repairs', 'Deep moisturization', 'Soothes dry skin', 'Improves skin texture', 'Healthy, radiant skin'],
    suitability: 'Suitable for all skin types', size: '250 ml e',
    ingredients: 'Aqua, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Shea Butter (Butyrospermum Parkii), Aloe Barbadensis Leaf Extract, Camellia Sinensis (Green Tea) Extract, Tocopheryl Acetate (Vitamin E), Dimethicone, Glyceryl Stearate, Carbomer, Phenoxyethanol, Ethylhexylglycerin, Fragrance, Triethanolamine.',
    directions: 'Apply generously to clean, dry skin. Massage gently until fully absorbed. Use daily, preferably after bathing, for soft, smooth, and nourished skin.',
    warnings: 'FOR EXTERNAL USE ONLY. AVOID CONTACT WITH EYES. IF CONTACT OCCURS, RINSE IMMEDIATELY WITH WATER.',
    claims: ['Paraben Free', 'Sulfate Free', 'Cruelty Free'],
    manufacturer: 'Manufactured for: PareCure Beauty — A STEP TOWARDS NATURAL BEAUTY | www.parecurebeauty.com',
    barcode: '8 906123 456819',
    price: 129.99, image: '/assets/logo/body-lotion-250ml.png', applicationImage: '/assets/logo/body-lotion-250ml-application.PNG', skinImage: '/assets/logo/body-lotion-250ml-closeup.PNG', tone: 'blush', alt: 'PareCure BEAUTY Body Lotion, 250 ml'
  },
  {
    id: 'oil', category: 'BODY CARE', name: 'PareCure BEAUTY Tissue Oil',
    detail: 'Nourish · Repair · Renew · 50 ml',
    tagline: 'NOURISH • REPAIR • RENEW — FOR SMOOTHER, FIRMER & HEALTHY SKIN',
    description: 'A lightweight, fast-absorbing formula enriched with natural oils and Vitamin E that deeply nourishes, helps improve skin elasticity, and reduces the appearance of stretch marks, scars, and uneven skin tone for soft, smooth, and radiant skin.',
    highlights: ['Natural oils — Deeply nourishes', 'Vitamin E — Helps repair', 'Improves skin elasticity', 'Helps reduce the appearance of stretch marks & scars', 'Nourishes deeply', 'Leaves skin radiant'],
    suitability: 'Suitable for all skin types', size: '50 ml e',
    ingredients: 'Helianthus Annuus (Sunflower) Seed Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Rosa Canina (Rosehip) Fruit Oil, Tocopheryl Acetate (Vitamin E), Caprylic/Capric Triglyceride, Fragrance.',
    directions: 'Apply a few drops to clean, dry skin. Gently massage in circular motions until fully absorbed. Use twice daily for best results.',
    warnings: 'FOR EXTERNAL USE ONLY. AVOID CONTACT WITH EYES. IF CONTACT OCCURS, RINSE IMMEDIATELY WITH WATER.',
    claims: ['Paraben Free', 'Sulfate Free', 'Cruelty Free'],
    manufacturer: 'Manufactured for: PareCure Beauty — A STEP TOWARDS NATURAL BEAUTY | www.parecurebeauty.com',
    barcode: '8 906123 456833',
    price: 99.99, image: '/assets/logo/tissue-oil-50ml.jpg.png', applicationImage: '/assets/logo/tissue-oil-50ml-Application.PNG', skinImage: '/assets/logo/tissue-oil-50ml-closeup.PNG', tone: 'olive', alt: 'PareCure BEAUTY Tissue Oil, 50 ml'
  },
  {
    id: 'facewash', category: 'FACE CARE', name: 'PareCure BEAUTY Face Wash',
    detail: 'Cleanse · Refresh · Reveal · 100 ml',
    tagline: 'CLEANSE • REFRESH • REVEAL — FOR HEALTHY, RADIANT SKIN',
    description: 'Gently cleanses away dirt, excess oil, and impurities while nourishing skin with Aloe Vera, Green Tea, and Vitamin E to keep skin fresh, clean, revitalized, soft, smooth, and naturally radiant every day.',
    highlights: ['Aloe Vera — Soothes & hydrates', 'Green Tea — Purifies & protects', 'Vitamin E — Nourishes & revitalizes', 'Deep cleanses', 'Removes impurities', 'Maintains moisture balance', 'Reveals a healthy glow'],
    suitability: 'Suitable for all skin types', size: '100 ml e',
    ingredients: 'Aqua, Aloe Barbadensis Leaf Extract, Camellia Sinensis (Green Tea) Extract, Glycerin, Vitamin E (Tocopheryl Acetate), Cocamidopropyl Betaine, Sodium Lauryl Sulfate, PEG-7 Glyceryl Cocoate, Carbomer, Phenoxyethanol, Fragrance, Disodium EDTA, Citric Acid, Sodium Hydroxide.',
    directions: 'Take a small amount, apply to wet face, gently massage in circular motions, and rinse thoroughly. Use twice daily for best results.',
    warnings: 'FOR EXTERNAL USE ONLY. AVOID CONTACT WITH EYES. IF CONTACT OCCURS, RINSE IMMEDIATELY WITH WATER.',
    claims: ['Paraben Free', 'Sulfate Free', 'Cruelty Free'],
    manufacturer: 'Manufactured for: PareCure Beauty — A STEP TOWARDS NATURAL BEAUTY | www.parecurebeauty.com',
    barcode: '8 906123 456789',
    price: 79.99, image: '/assets/logo/face-wash-100ml.png', applicationImage: '/assets/logo/face-wash-100ml-application.PNG', skinImage: '/assets/logo/face-wash-100ml-closeup.PNG', tone: 'blush', alt: 'PareCure BEAUTY Face Wash, 100 ml'
  },
  {
    id: 'brightening-serum', category: 'FACE CARE', name: 'PareCure BEAUTY Brightening Serum',
    detail: 'Radiant · Even tone · Healthy glow · 50 ml',
    tagline: 'RADIANT • EVEN TONE • HEALTHY GLOW — FOR BRIGHTER, YOUNGER LOOKING SKIN',
    subTagline: 'SKIN THAT GLOWS NATURALLY',
    description: 'A powerful yet gentle formula enriched with Vitamin C, Niacinamide, Hyaluronic Acid, and Green Tea Extract that helps reduce dark spots, evens skin tone, hydrates deeply, and reveals a brighter, healthier, and more radiant complexion.',
    highlights: ['Vitamin C — Brightens & evens tone', 'Niacinamide — Helps reduce dark spots', 'Hyaluronic Acid — Hydrates & plumps', 'Green Tea Extract — Soothes & protects', 'Brightens skin tone', 'Helps reduce dark spots', 'Deeply hydrates', 'Soothes & protects'],
    suitability: 'Suitable for all skin types', size: '50 ml e',
    ingredients: 'Aqua, Propanediol, Ascorbic Acid (Vitamin C), Niacinamide, Sodium Hyaluronate (Hyaluronic Acid), Camellia Sinensis (Green Tea) Extract, Glycerin, Panthenol, Aloe Barbadensis Leaf Extract, Phenoxyethanol, Ethylhexylglycerin, Carbomer, Triethanolamine, Fragrance.',
    directions: 'Apply 2–3 drops to clean, dry face and neck. Gently massage until fully absorbed. Use twice daily (morning and evening) for best results.',
    warnings: 'FOR EXTERNAL USE ONLY. AVOID CONTACT WITH EYES. IF CONTACT OCCURS, RINSE IMMEDIATELY WITH WATER.',
    claims: ['Paraben Free', 'Sulfate Free', 'Cruelty Free'],
    manufacturer: 'Manufactured for: PareCure Beauty — A STEP TOWARDS NATURAL BEAUTY | www.parecurebeauty.com',
    barcode: '8 906123 456789',
    price: 179.99, image: '/assets/logo/brightening-serum-50ml.png', applicationImage: '/assets/logo/brightening-serum-50ml-application.PNG', skinImage: '/assets/logo/brightening-serum-50ml-closeup.PNG', tone: 'sand', alt: 'PareCure BEAUTY Brightening Serum, 50 ml'
  },
];
const photo = (id, width = 900) => id.startsWith('/') ? id : 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=85';
const money = (value) => 'R ' + value.toFixed(2);

function ProductCard({ product, onAdd, onOpen }) {
  return <article className="product-card">
    <div className={'product-image ' + product.tone + ' product-image-clickable'} onClick={() => onOpen(product)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpen(product); } }} aria-label={'View details for ' + product.name}>
      <span className="product-tag">{product.category}</span>
      <span className="product-card-badge">PARECURE ESSENTIAL</span>
      <img src={photo(product.image)} alt={product.alt} loading="lazy" />
      <button className="product-quick-add" onClick={() => onAdd(product)} aria-label={'Add ' + product.name + ' to bag'}>＋</button>
      <span className="product-image-hint">VIEW PRODUCT</span>
    </div>
    <div className="product-info">
      <div className="product-copy"><h3><button type="button" className="product-title-button" onClick={() => onOpen(product)}>{product.name}</button></h3><p>{product.detail}</p><span className="product-rating"><small>EVERYDAY SKINCARE ESSENTIAL</small></span></div>
      <span className="product-price">{money(product.price)}</span>
    </div>
    <button className="product-add-button" onClick={() => onAdd(product)}>Add to bag <span>↗</span></button>
  </article>;
}


function ProductDetailDialog({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  const gallery = [
    { src: product.image, alt: product.alt, label: 'Product packaging', type: 'pack' },
    { src: product.applicationImage || 'photo-1556228720-195a672e8a03', alt: 'Skincare application in progress', label: 'Application', type: 'application' },
    { src: product.skinImage || 'photo-1616394584738-fc6e612e71b9', alt: 'Close-up of healthy-looking skin texture', label: 'Skin close-up', type: 'skin' },
  ];
  const [activeImage, setActiveImage] = useState(0);
  const ingredients = product.ingredients || 'Please check the product packaging for the full ingredient list.';
  const directions = product.directions || 'Follow the directions printed on the product packaging.';

  return <div className="product-detail-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="product-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
      <button className="dialog-close" onClick={onClose} aria-label="Close product details">×</button>
      <div className="product-detail-layout">
        <div className="product-detail-gallery">
          <div className={'product-detail-photo ' + product.tone}>
            <img src={photo(gallery[activeImage].src, 1200)} alt={gallery[activeImage].alt} />
            <span className="product-gallery-label">{gallery[activeImage].label}</span>
          </div>
          <div className="product-gallery-thumbnails" aria-label="Product image gallery">
            {gallery.map((item, index) => <button type="button" key={item.type} className={activeImage === index ? 'active' : ''} onClick={() => setActiveImage(index)} aria-pressed={activeImage === index} aria-label={'Show ' + item.label}>
              <img src={photo(item.src, 240)} alt="" loading="lazy" />
              <span>{item.label}</span>
            </button>)}
          </div>
          {activeImage === 2 && <p className="product-gallery-disclaimer">Skin close-up is an illustrative visual, not a before-and-after result or a product efficacy claim.</p>}
        </div>
        <div className="product-detail-content">
          <p className="eyebrow">{product.category} · PARECURE</p>
          <h2 id="product-detail-title">{product.name}</h2>
          <p className="product-detail-size">{product.detail}</p>
          <strong className="product-detail-price">{money(product.price)}</strong>
          <div className="product-detail-description"><h3>About this product</h3>{product.tagline && <p className="product-detail-tagline">{product.tagline}</p>}{product.subTagline && <p className="product-detail-tagline">{product.subTagline}</p>}<p>{product.description}</p></div>
          <div className="product-detail-facts"><h3>Product details</h3><dl>
            <div><dt>Product</dt><dd>{product.name}</dd></div>
            <div><dt>Category</dt><dd>{product.category === 'FACE CARE' ? 'Face care' : 'Body care'}</dd></div>
            <div><dt>Size</dt><dd>{product.size || product.detail.split('·').pop().trim()}</dd></div>
            <div><dt>Skin suitability</dt><dd>{product.suitability || 'See product packaging'}</dd></div>
            <div><dt>Price</dt><dd>{money(product.price)}</dd></div>
          </dl></div>
          {product.highlights?.length > 0 && <div className="product-detail-highlights"><h3>Key benefits</h3><ul>{product.highlights.map((item) => <li key={item}>{item}</li>)}</ul></div>}
          <div className="product-detail-information">
            <section><h3>Ingredients</h3><p>{ingredients}</p></section>
            <section><h3>How to use</h3><p>{directions}</p></section>
            <section><h3>Warnings & precautions</h3><p>{product.warnings || 'Check the product packaging before use.'}</p>{product.claims?.length > 0 && <p className="product-detail-claims">{product.claims.join(' · ')}</p>}</section>
            <section><h3>Manufacturer</h3><p>{product.manufacturer || 'PareCure Beauty'}</p><p>Barcode: {product.barcode || 'Not provided'}</p></section>
          </div>
          <div className="product-detail-actions"><div className="detail-quantity" aria-label="Quantity"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">+</button></div><button className="button button-dark detail-add-button" onClick={() => onAdd({ ...product, quantity })}>Add {quantity} to bag · {money(product.price * quantity)} <span>↗</span></button></div>
        </div>
      </div>
    </section>
  </div>;
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
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', suburb: '', city: '', province: 'Gauteng', postalCode: '' });
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const updateCustomer = (field, value) => setCustomer((current) => ({ ...current, [field]: value }));
  const processPaymentChoice = (outcome) => {
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
      <div className="checkout-topline"><span>PARECURE BEAUTY</span><span><span className="checkout-lock">▣</span> SECURE CHECKOUT</span></div>
      <div className="checkout-progress" aria-label="Checkout progress">
        <span className={stage === 'details' ? 'active' : 'complete'}>1. Delivery</span><i />
        <span className={stage === 'payment' || stage === 'result' ? 'active' : stage === 'confirmation' ? 'complete' : ''}>2. Payment</span><i />
        <span className={stage === 'confirmation' ? 'active' : ''}>3. Confirmation</span>
      </div>

      {stage === 'details' && <>
        <p className="eyebrow">ALMOST YOURS</p>
        <h2 id="checkout-title">Delivery details.</h2>
        <p className="checkout-intro">Choose how you would like to receive your PareCure essentials.</p>
        <div className="payment-methods delivery-methods">
          <label className={deliveryMethod === 'delivery' ? 'selected' : ''}><input type="radio" name="delivery-method" value="delivery" checked={deliveryMethod === 'delivery'} onChange={() => setDeliveryMethod('delivery')} /><span className="payment-method-icon">⌂</span><span><strong>Deliver to my address</strong><small>Receive your order at your door</small></span><b>›</b></label>
          <label className={deliveryMethod === 'collection' ? 'selected' : ''}><input type="radio" name="delivery-method" value="collection" checked={deliveryMethod === 'collection'} onChange={() => setDeliveryMethod('collection')} /><span className="payment-method-icon">⌖</span><span><strong>Collect at store</strong><small>Pick up your order in person</small></span><b>›</b></label>
        </div>
        <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setStage('payment'); }}>
          <div className="checkout-fields">
            <label>Full name<input autoComplete="name" required value={customer.name} onChange={(event) => updateCustomer('name', event.target.value)} placeholder="Full name" /></label>
            <label>Email address<input type="email" autoComplete="email" required value={customer.email} onChange={(event) => updateCustomer('email', event.target.value)} placeholder="you@example.com" /></label>
            <label>Phone number<input type="tel" autoComplete="tel" required value={customer.phone} onChange={(event) => updateCustomer('phone', event.target.value)} placeholder="e.g. 071 234 5678" /></label>
            {deliveryMethod === 'delivery' && <>
              <label className="checkout-wide">Street address<input autoComplete="street-address" required value={customer.address} onChange={(event) => updateCustomer('address', event.target.value)} placeholder="House number and street" /></label>
              <label>Suburb<input autoComplete="address-line2" required value={customer.suburb} onChange={(event) => updateCustomer('suburb', event.target.value)} placeholder="Suburb" /></label>
              <label>City / town<input autoComplete="address-level2" required value={customer.city} onChange={(event) => updateCustomer('city', event.target.value)} placeholder="City" /></label>
              <label>Province<select required value={customer.province} onChange={(event) => updateCustomer('province', event.target.value)}><option>Eastern Cape</option><option>Free State</option><option>Gauteng</option><option>KwaZulu-Natal</option><option>Limpopo</option><option>Mpumalanga</option><option>Northern Cape</option><option>North West</option><option>Western Cape</option></select></label>
              <label>Postal code<input autoComplete="postal-code" required inputMode="numeric" value={customer.postalCode} onChange={(event) => updateCustomer('postalCode', event.target.value)} placeholder="Postal code" /></label>
            </>}
            {deliveryMethod === 'collection' && <p className="checkout-demo-note checkout-wide">Store collection selected. Collection location and collection instructions will be confirmed before the order is fulfilled.</p>}
          </div>
          <div className="checkout-order-summary"><span>{bag.reduce((n, item) => n + item.quantity, 0)} item(s) in your order</span><strong>{money(subtotal)}</strong></div>
          <p className="checkout-demo-note">{deliveryMethod === 'collection' ? 'Store collection is selected. No delivery fee applies.' : 'Delivery pricing is not available yet. No delivery fee is being charged or calculated.'}</p>
          <button className="button button-dark checkout-primary" type="submit">Continue to payment <span>↗</span></button>
        </form>
      </>}

      {stage === 'payment' && <>
        <p className="eyebrow">PAYMENT</p>
        <h2 id="checkout-title">Choose how to pay.</h2>
        <p className="checkout-intro">{paymentMethod === 'cod' ? 'Pay for your order when it arrives. No online payment is required now.' : 'Payments are not enabled yet. No money will be charged and no card or banking details are transmitted.'}</p>
        <div className="payment-methods">
          <label className={paymentMethod === 'card' ? 'selected' : ''}><input type="radio" name="payment-method" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /><span className="payment-method-icon">▣</span><span><strong>Bank card</strong><small>Visa · Mastercard</small></span><b>›</b></label>
          <label className={paymentMethod === 'cod' ? 'selected' : ''}><input type="radio" name="payment-method" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /><span className="payment-method-icon">⌂</span><span><strong>Payment on delivery</strong><small>Pay when your order arrives</small></span><b>›</b></label>
          <label className={paymentMethod === 'wallet' ? 'selected' : ''}><input type="radio" name="payment-method" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} /><span className="payment-method-icon">◈</span><span><strong>Hosted checkout</strong><small>Hosted payment experience preview</small></span><b>›</b></label>
        </div>
        {paymentMethod === 'cod' && <p className="checkout-demo-note">Payment will be collected when your order is delivered. Please have the order total ready. This checkout preview does not yet arrange delivery or collect payment.</p>}
        {paymentMethod === 'card' && <div className="checkout-fields card-entry-fields" aria-label="Card details">
          <label className="checkout-wide">Name on card<input type="text" name="cardholder" autoComplete="off" placeholder="Name as shown on card" /></label>
          <label className="checkout-wide">Card number<input type="text" name="card-number" inputMode="numeric" autoComplete="off" placeholder="1234 5678 9012 3456" maxLength="23" /></label>
          <label>Expiry date<input type="text" name="card-expiry" inputMode="numeric" autoComplete="off" placeholder="MM/YY" maxLength="5" /></label>
          <label>Security code<input type="password" name="card-security-code" inputMode="numeric" autoComplete="new-password" placeholder="CVV" maxLength="4" /></label>
          <p className="checkout-demo-note checkout-wide">Card fields are for interface preview only. Do not enter real card details. Nothing is transmitted, saved, or tracked; secure provider-hosted payment fields must be connected before accepting real cards.</p>
        </div>}
        <div className="gateway-order-total"><span>Order total</span><strong>{money(subtotal)}</strong></div>
        <div className="demo-actions">
          <button className="button button-dark checkout-primary" onClick={(event) => { const fields = event.currentTarget.closest('.checkout-dialog')?.querySelectorAll('.card-entry-fields input'); fields?.forEach((field) => { field.value = ''; }); processPaymentChoice('success'); }}>{paymentMethod === 'cod' ? 'Place order' : 'Complete checkout'} <span>↗</span></button>
          {paymentMethod !== 'cod' && <><button className="demo-secondary" onClick={() => processPaymentChoice('failure')}>Test declined payment</button><button className="demo-cancel" onClick={() => processPaymentChoice('cancel')}>Cancel payment</button></>}
        </div>
        <p className="checkout-demo-note">{paymentMethod === 'cod' ? 'Payment on delivery is selected. This is an order-flow preview; delivery and cash collection are not connected.' : 'Payment processing is not enabled yet.'}</p>
        <button className="checkout-back" onClick={() => setStage('details')}>← Back to delivery details</button>
      </>}

      {stage === 'result' && <>
        <div className={'payment-result-icon ' + (paymentStatus === 'failure' ? 'failed' : 'cancelled')}>{paymentStatus === 'failure' ? '!' : '×'}</div>
        <p className="eyebrow">PAYMENT {paymentStatus === 'failure' ? 'NOT APPROVED' : 'CANCELLED'}</p>
        <h2 id="checkout-title">{paymentStatus === 'failure' ? 'That payment didn’t go through.' : 'Payment was cancelled.'}</h2>
        <p className="checkout-intro">{paymentStatus === 'failure' ? 'The payment was not approved. Your order has not been placed and no money was charged.' : 'You cancelled payment. Your order has not been placed and no money was charged.'}</p>
        <div className="demo-actions"><button className="button button-dark checkout-primary" onClick={() => { setPaymentStatus(''); setStage('payment'); }}>Try payment again <span>↗</span></button><button className="checkout-back" onClick={() => setStage('details')}>Edit delivery details</button><button className="demo-cancel" onClick={onClose}>Return to shopping bag</button></div>
      </>}

      {stage === 'confirmation' && <>
        <div className="payment-result-icon success">✓</div>
        <p className="eyebrow">ORDER CONFIRMATION</p>
        <h2 id="checkout-title">Thank you, {customer.name.split(' ')[0]}.</h2>
        <p className="checkout-intro">Your checkout details have been received. Payment processing is not enabled yet.</p>
        <div className="confirmation-card"><span>ORDER NUMBER</span><strong>{orderNumber}</strong><div><span>Payment method</span><b>{paymentMethod === 'card' ? 'Bank card' : paymentMethod === 'cod' ? 'Payment on delivery' : 'Hosted checkout'}</b></div><div><span>Order total</span><b>{money(subtotal)}</b></div><div><span>{deliveryMethod === 'collection' ? 'Fulfilment' : 'Delivery to'}</span><b>{deliveryMethod === 'collection' ? 'Store collection' : `${customer.suburb}, ${customer.city}`}</b></div><small>No payment was taken. Payment processing is not enabled yet.</small></div>
        <button className="button button-dark checkout-primary" onClick={() => onOrderComplete({ orderNumber, customer, paymentMethod, total: subtotal, items: bag })}>Finish and return to store <span>↗</span></button>
      </>}
    </section>
  </div>;
}

export default function App() {
  const [bag, setBag] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      <nav className={'main-nav ' + (menuOpen ? 'open' : '')} aria-label="Main navigation"><a href="#shop" onClick={() => { setCategory('ALL'); setMenuOpen(false); }}>Shop all</a><button type="button" className="menu-category" onClick={() => { setCategory('FACE CARE'); setMenuOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }}>Face care</button><button type="button" className="menu-category" onClick={() => { setCategory('BODY CARE'); setMenuOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }}>Body care</button><a href="#story" onClick={() => setMenuOpen(false)}>Our philosophy</a><a href="#ritual" onClick={() => setMenuOpen(false)}>The ritual</a></nav>
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
        <div className="catalogue-tools"><label className="search-field"><span>⌕</span><input type="search" placeholder="Search products" aria-label="Search products" value={search} onChange={(event) => setSearch(event.target.value)} /></label><label className="filter-field"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="ALL">All products</option><option value="FACE CARE">Face care</option><option value="BODY CARE">Body care</option></select></label><label className="filter-field"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
        <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToBag} onOpen={setSelectedProduct} />)}</div>
        {!visibleProducts.length && <p className="no-products">No products match that search. Try another name or category.</p>}
      </section>
      <section className="story section" id="story"><div className="story-copy"><p className="eyebrow">A MORE MINDFUL ROUTINE</p><h2>Less noise.<br /><em>More care.</em></h2><p>We believe skincare should feel personal, uncomplicated and considered. PareCure is about showing up for yourself, one small ritual at a time.</p><a className="text-link" href="#ritual">Get to know us <span>↗</span></a></div></section>
      <section className="ritual section" id="ritual"><p className="eyebrow">MAKE SPACE FOR YOU</p><h2>Your skin deserves<br /><em>a little intention.</em></h2><p>Build a routine that feels good, fits your day and gives you a moment to pause.</p><a className="button button-light" href="#shop">Find your essentials <span>↗</span></a></section>
      <section className="newsletter section"><div><p className="eyebrow">NOTES FROM PARECURE</p><h2>A little beauty<br /><em>in your inbox.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><label htmlFor="email">Skincare notes, new launches and thoughtful offers.</label><div className="email-row"><input id="email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="Subscribe">↗</button></div><small>{subscribed ? 'Thank you. Newsletter delivery will be enabled when email services are connected.' : 'By subscribing, you agree to receive updates from PareCure.'}</small></form></section>
    </main>
    <footer className="footer"><a className="wordmark footer-mark" href="#top" aria-label="PareCure home"><img className="brand-logo" src="/assets/logo/parecure-logo.png" alt="PareCure Beauty" /></a><p>Care for the skin you're in.</p><div className="footer-links"><a href="#shop">Shop</a><button onClick={() => setAccountOpen(true)}>My account</button><a href="mailto:hello@parecure.com">Contact</a><a href="#footer-policies">Delivery & returns</a><a href="#footer-policies">Privacy & terms</a></div><div className="footer-bottom" id="footer-policies"><span>© {new Date().getFullYear()} PareCure Beauty</span><span>Made with intention.</span><a href="mailto:hello@parecure.com">Get in touch ↗</a></div></footer>
    {selectedProduct && <ProductDetailDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={(product) => { setSelectedProduct(null); setBag((current) => { const existing = current.find((item) => item.id === product.id); return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item) : [...current, { ...product }]; }); setBagOpen(true); }} />}
    {bagOpen && <div className="bag-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBagOpen(false); }}><button className="overlay-close" onClick={() => setBagOpen(false)} aria-label="Close shopping bag">×</button><aside className="bag-panel" role="dialog" aria-modal="true" aria-label="Shopping bag"><div className="bag-heading"><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({itemCount})</span></h2></div><div className="bag-items">{bag.length ? bag.map((item) => <div className="bag-item" key={item.id}><img src={photo(item.image, 180)} alt="" /><div className="bag-item-copy"><strong>{item.name}</strong><small>{item.detail}</small><b>{money(item.price)}</b><div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)} aria-label={'Decrease ' + item.name + ' quantity'}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label={'Increase ' + item.name + ' quantity'}>+</button><button className="remove-item" onClick={() => setBag((current) => current.filter((entry) => entry.id !== item.id))}>Remove</button></div></div></div>) : <p className="empty-bag">Your bag is taking a little breather.<br />Explore the collection to find your essentials.</p>}</div><div className="bag-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>Delivery and any applicable charges are calculated at checkout.</small><button className="button button-dark checkout-button" disabled={!bag.length} onClick={() => { setBagOpen(false); setCheckoutOpen(true); }}>Continue to checkout <span>↗</span></button><p>Payment processing is not enabled yet. No payment will be taken.</p></div></aside></div>}
    {checkoutOpen && <CheckoutDialog bag={bag} subtotal={subtotal} onClose={() => setCheckoutOpen(false)} onOrderComplete={() => { setBag([]); setCheckoutOpen(false); }} />}
    {accountOpen && <AccountDialog onClose={() => setAccountOpen(false)} />}
  </>;
}
