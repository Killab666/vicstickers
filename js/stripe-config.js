/**
 * VicStickers – Stripe Test Key Structure
 * Replace the placeholders with your real Stripe TEST keys.
 * Never put live secret keys in frontend code.
 */
const STRIPE_CONFIG = {
  publishableKey: 'pk_test_51ExampleReplaceWithYourRealTestKey',
  currency: 'aud',
  locale: 'en-AU',
  demoMode: true,
  appearance: {
    theme: 'night',
    variables: {
      colorPrimary: '#22d3ee',
      colorBackground: '#1a1a1f',
      colorText: '#f4f4f5',
      colorDanger: '#ef4444',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: '8px'
    }
  }
};
window.STRIPE_CONFIG = STRIPE_CONFIG;
