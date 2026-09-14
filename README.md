# VicStickers – Multi-page Vinyl Stickers & Custom Plates Store (Victoria)

Complete demo online store for premium vinyl stickers and VIC-compliant L & P plates.

## What’s included

### Multi-page site
- `index.html` – Home
- `shop.html` – Full product catalogue
- `plates.html` – L / P1 / P2 / Magnetic plates + variants
- `custom.html` – Custom quote form
- `about.html` – About the business
- `contact.html` – Contact details
- `checkout.html` – Stripe-style checkout stub (demo only)

### Sample product images (SVG)
All in `/images/`

### Social & packaging graphics
- social-square.svg, social-story.svg, packaging-label.svg

### Shopify readiness
See `/shopify/README-SHOPIFY.md`

## How to run locally

```bash
python3 -m http.server 8080
```

## Live demo
Once GitHub Pages is enabled: https://killab666.github.io/vicstickers/

## Next steps for real money
1. Enable GitHub Pages (Settings → Pages → Deploy from main)
2. Or connect the repo to Netlify / Vercel (free)
3. Add your Stripe test key in `js/stripe-config.js`
4. For live payments, add a backend PaymentIntent endpoint
5. Update contact email/phone and add ABN if required
6. Register a .com.au domain and point it here

Built for Victoria. Not affiliated with VicRoads.
