export { attachCategoryFilterHandlers, attachGlobalInteractionHandlers, initDescriptionToggles } from './interactions';
export { getHomePageElements } from './elements';
export { setupModalActions } from './modals';
export { setupLiveStockSync } from './live-stock';
export type {
  HomePageElements,
  HomePageUiElements,
  ModalElements,
  PostgresUpdatePayload,
  StockRowUpdate,
  SupabaseRealtimeClientLike
} from './types';
