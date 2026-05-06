export type HomePageElements = {
  categoryBtns: NodeListOf<Element>;
  productCards: NodeListOf<Element>;
};

export type HomePageUiElements = HomePageElements & {
  banner: HTMLElement | null;
  acceptBtn: HTMLElement | null;
  declineBtn: HTMLElement | null;
  menuBtn: HTMLElement | null;
  mobileMenu: HTMLElement | null;
  openCart: HTMLElement | null;
  cartModal: HTMLElement | null;
  closeCartBtn: HTMLElement | null;
  cartOverlay: HTMLElement | null;
  cartCountBadge: HTMLElement | null;
  cartItemsList: HTMLElement | null;
  totalPrice: HTMLElement | null;
  variantBtns: NodeListOf<Element>;
  addToCartBtns: NodeListOf<Element>;
  whatsappBtn: HTMLElement | null;
  smsBtn: HTMLElement | null;
  openProfile: HTMLElement | null;
  profileModal: HTMLElement | null;
  closeProfileBtn: HTMLElement | null;
  profileOverlay: HTMLElement | null;
  checkLoyaltyBtn: HTMLElement | null;
  clientNameInput: HTMLInputElement | null;
  clientPhoneInput: HTMLInputElement | null;
  lookupPhoneInput: HTMLInputElement | null;
  confirmModal: HTMLElement | null;
  confirmDetails: HTMLElement | null;
  finalWhatsappBtn: HTMLElement | null;
  noWhatsappBtn: HTMLElement | null;
  smsFallback: HTMLElement | null;
  cancelBtn: HTMLElement | null;
  confirmAltBtn: HTMLElement | null;
};

export type ModalElements = {
  cartModal?: HTMLElement | null;
  profileModal?: HTMLElement | null;
  openCart?: HTMLElement | null;
  openProfile?: HTMLElement | null;
  closeCartBtn?: HTMLElement | null;
  cartOverlay?: HTMLElement | null;
  closeProfileBtn?: HTMLElement | null;
  profileOverlay?: HTMLElement | null;
  whatsappBtn?: HTMLElement | null;
  smsBtn?: HTMLElement | null;
};

export type StockRowUpdate = {
  product_slug: string;
  en_stock: boolean | null;
};

export type PostgresUpdatePayload<T> = {
  new: T;
};

type RealtimeChannelLike = {
  on: (
    event: 'postgres_changes',
    config: { event: 'UPDATE'; schema: 'public'; table: 'stocks' },
    callback: (payload: PostgresUpdatePayload<StockRowUpdate>) => void
  ) => RealtimeChannelLike;
  subscribe: () => unknown;
};

export type SupabaseRealtimeClientLike = {
  channel: (name: string) => RealtimeChannelLike;
};
