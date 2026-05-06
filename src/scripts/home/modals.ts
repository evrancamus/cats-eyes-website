import type { ModalElements } from './types';

export function setupModalActions(
  elements: ModalElements,
  updateCartUI: (shouldSave?: boolean) => void,
  handleOrder: (type: string) => void
) {
  const closeAllModals = () => {
    elements.cartModal?.classList.add('hidden');
    elements.profileModal?.classList.add('hidden');
    document.body.style.overflow = '';
  };

  elements.openCart?.addEventListener('click', () => {
    updateCartUI(false);
    elements.cartModal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  elements.openProfile?.addEventListener('click', () => {
    elements.profileModal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  [elements.closeCartBtn, elements.cartOverlay, elements.closeProfileBtn, elements.profileOverlay].forEach(btn => {
    btn?.addEventListener('click', closeAllModals);
  });

  elements.whatsappBtn?.addEventListener('click', () => {
    handleOrder('wa');
  });

  elements.smsBtn?.addEventListener('click', () => {
    handleOrder('sms');
  });

  return { closeAllModals };
}
