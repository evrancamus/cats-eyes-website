import type { HomePageUiElements } from './types';

export function getHomePageElements(): HomePageUiElements {
  return {
    banner: document.getElementById('cookie-banner'),
    acceptBtn: document.getElementById('accept-cookies'),
    declineBtn: document.getElementById('decline-cookies'),
    menuBtn: document.getElementById('menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    openCart: document.getElementById('open-cart'),
    cartModal: document.getElementById('cart-modal'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartOverlay: document.getElementById('close-cart-overlay'),
    cartCountBadge: document.getElementById('cart-count'),
    cartItemsList: document.getElementById('cart-items-list'),
    totalPrice: document.getElementById('cart-total-price'),
    categoryBtns: document.querySelectorAll('.filter-btn'),
    productCards: document.querySelectorAll('.product-card'),
    variantBtns: document.querySelectorAll('.variant-btn'),
    addToCartBtns: document.querySelectorAll('.add-to-cart-btn'),
    whatsappBtn: document.getElementById('send-order-whatsapp'),
    smsBtn: document.getElementById('send-order-sms'),
    openProfile: document.getElementById('open-profile'),
    profileModal: document.getElementById('profile-modal'),
    closeProfileBtn: document.getElementById('close-profile-btn'),
    profileOverlay: document.getElementById('close-profile-overlay'),
    checkLoyaltyBtn: document.getElementById('check-loyalty'),
    clientNameInput: document.getElementById('client-name') as HTMLInputElement | null,
    clientPhoneInput: document.getElementById('client-phone') as HTMLInputElement | null,
    lookupPhoneInput: document.getElementById('lookup-phone') as HTMLInputElement | null,
    confirmModal: document.getElementById('confirm-order-modal'),
    confirmDetails: document.getElementById('confirm-details'),
    finalWhatsappBtn: document.getElementById('final-whatsapp-btn'),
    noWhatsappBtn: document.getElementById('no-whatsapp-btn'),
    smsFallback: document.getElementById('sms-fallback-msg'),
    cancelBtn: document.getElementById('cancel-confirm-btn'),
    confirmAltBtn: document.getElementById('confirm-alt-btn')
  };
}
