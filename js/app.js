/* VicStickers – Stickers for anything + custom plates */
const products = [
  { id: 'diecut-pack', name: 'Custom Die-Cut Stickers', desc: 'Any shape, any design. Outdoor vinyl. Logos, art, branding.', price: 24.90, image: 'images/diecut.svg', tag: 'Popular' },
  { id: 'bumper', name: 'Bumper Stickers', desc: 'Tough outdoor vinyl for cars, utes & trailers.', price: 14.90, image: 'images/bumper.svg', tag: null },
  { id: 'clear-vinyl', name: 'Clear Vinyl Stickers', desc: 'Transparent background. Matte or gloss.', price: 19.90, image: 'images/clear.svg', tag: 'Premium' },
  { id: 'laptop', name: 'Laptop & Device Stickers', desc: 'Indoor vinyl, clean removal. Phones, laptops, tablets.', price: 12.90, image: 'images/laptop.svg', tag: null },
  { id: 'business-pack', name: 'Business / Logo Pack', desc: '50–200+ pcs. Free design review. Packaging & branding.', price: 39.90, image: 'images/business.svg', tag: null },
  { id: 'holographic', name: 'Holographic Stickers', desc: 'Rainbow shift finish. Eye-catching for events & merch.', price: 29.90, image: 'images/holographic.svg', tag: 'Limited' },
  { id: 'window', name: 'Window & Glass Stickers', desc: 'Static cling or permanent. Shops, cars, home.', price: 16.90, image: 'images/window.svg', tag: null },
  { id: 'plate-decal', name: 'Number Plate Style Decal', desc: 'Classic plate look. Bumper, wall, gift.', price: 9.90, image: 'images/plate-decal.svg', tag: 'From $9.90' },
  { id: 'custom-black', name: 'Classic Black Plate Sticker', desc: '372×132 mm. Your text. Outdoor vinyl.', price: 12.90, image: 'images/custom-black.svg', tag: null },
  { id: 'custom-slim', name: 'Slimline Plate Sticker', desc: '372×100 mm. Modern low-profile look.', price: 11.90, image: 'images/custom-slim.svg', tag: null }
];

let cart = JSON.parse(localStorage.getItem('vicstickers-cart') || '[]');
function saveCart() { localStorage.setItem('vicstickers-cart', JSON.stringify(cart)); updateCartUI(); }
function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1; else cart.push({ id, name, price: parseFloat(price), qty: 1 });
  saveCart(); showToast(name + ' added to cart'); openCart();
}
function removeFromCart(id) { cart = cart.filter(item => item.id !== id); saveCart(); }
function updateCartUI() {
  const cartCountEl = document.getElementById('cartCount');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (!cartCountEl) return;
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = totalQty;
  if (!cartItemsEl) return;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    if (cartTotalEl) cartTotalEl.textContent = '$0.00';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }
  cartItemsEl.innerHTML = cart.map(item => `<div class="cart-item"><div class="cart-item-info"><h4>${item.name}</h4><p>$${item.price.toFixed(2)} × ${item.qty}</p></div><button class="cart-item-remove" data-id="${item.id}">×</button></div>`).join('');
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}
function openCart() { document.getElementById('cartDrawer')?.classList.add('open'); document.getElementById('cartOverlay')?.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeCartDrawer() { document.getElementById('cartDrawer')?.classList.remove('open'); document.getElementById('cartOverlay')?.classList.remove('open'); document.body.style.overflow = ''; }
function showToast(msg) { const toast = document.getElementById('toast'); if (!toast) return; toast.textContent = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); }
function renderProductGrid(targetId, list) {
  const grid = document.getElementById(targetId);
  if (!grid) return;
  grid.innerHTML = list.map(p => `<article class="product-card"><div class="product-image">${p.tag ? `<span class="tag">${p.tag}</span>` : ''}<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"></div><div class="product-body"><h3>${p.name}</h3><p>${p.desc || ''}</p><div class="product-footer"><span class="price">$${p.price.toFixed(2)}</span><button class="btn btn-sm btn-primary add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">Add</button></div></div></article>`).join('');
}
document.addEventListener('click', (e) => {
  if (e.target.closest('.add-to-cart')) { const btn = e.target.closest('.add-to-cart'); addToCart(btn.dataset.id, btn.dataset.name, btn.dataset.price); }
  if (e.target.closest('.cart-item-remove')) { removeFromCart(e.target.closest('.cart-item-remove').dataset.id); }
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('closeCart')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCartDrawer);
  document.getElementById('checkoutBtn')?.addEventListener('click', () => { window.location.href = 'checkout.html'; });
  document.getElementById('menuToggle')?.addEventListener('click', () => { document.getElementById('nav')?.classList.toggle('open'); });
  document.querySelectorAll('.nav a').forEach(link => { link.addEventListener('click', () => document.getElementById('nav')?.classList.remove('open')); });
  document.getElementById('customForm')?.addEventListener('submit', (e) => { e.preventDefault(); showToast('Quote request sent!'); e.target.reset(); });
  document.getElementById('checkoutForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cfg = window.STRIPE_CONFIG || { demoMode: true };
    if (cfg.demoMode) { showToast('Demo payment successful!'); cart = []; saveCart(); setTimeout(() => { window.location.href = 'index.html'; }, 1800); return; }
    showToast('Connect real backend for live payments');
  });
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
  renderProductGrid('productGrid', products);
  renderProductGrid('shopGrid', products);
  const summaryEl = document.getElementById('orderSummaryLines');
  if (summaryEl) {
    if (cart.length === 0) summaryEl.innerHTML = '<p class="empty-cart">Cart is empty – <a href="shop.html">go shopping</a></p>';
    else {
      summaryEl.innerHTML = cart.map(i => `<div class="order-line"><span>${i.name} × ${i.qty}</span><span>$${(i.price * i.qty).toFixed(2)}</span></div>`).join('');
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const totalEl = document.getElementById('orderTotal');
      if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }
  }
  updateCartUI();
});
