import type { PostgresUpdatePayload, StockRowUpdate, SupabaseRealtimeClientLike } from './types';

export function setupLiveStockSync(supabaseClient: SupabaseRealtimeClientLike) {
  const ingredientButtons = document.querySelectorAll('.variant-btn, .extra-btn');
  return supabaseClient
    .channel('live-inventory-' + Math.random())
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'stocks'
    }, (payload: PostgresUpdatePayload<StockRowUpdate>) => {
      const { product_slug, en_stock } = payload.new;

      if (product_slug.startsWith('global:')) {
        const ingredientName = product_slug.split(':')[1].replace(/-/g, ' ').toLowerCase();
        ingredientButtons.forEach(btn => {
          const btnText = btn.textContent?.trim().toLowerCase() || '';
          if (btnText.includes(ingredientName)) {
            if (en_stock === false) {
              btn.classList.add('opacity-30', 'pointer-events-none', 'line-through');
              btn.classList.remove('active-variant', 'bg-cat-yellow');
            } else {
              btn.classList.remove('opacity-30', 'pointer-events-none', 'line-through');
            }
          }
        });
      }

      const productCard = document.querySelector(`[data-product-id="${product_slug}"]`);
      if (productCard) {
        const isEpuise = en_stock === false;
        const badge = productCard.querySelector('.victime-badge');
        const productImage = productCard.querySelector('.product-img');
        const btnAdd = productCard.querySelector('.add-to-cart-btn');
        const textIndispo = productCard.querySelector('.status-indisponible');
        const preorderBadge = productCard.querySelector('.preorder-badge');

        if (isEpuise) {
          productCard.classList.add('opacity-50', 'pointer-events-none');
          productImage?.classList.add('grayscale');
          badge?.classList.remove('hidden');
          btnAdd?.classList.add('hidden');
          textIndispo?.classList.remove('hidden');
          preorderBadge?.classList.add('hidden');
        } else {
          productCard.classList.remove('opacity-50', 'pointer-events-none');
          productImage?.classList.remove('grayscale');
          badge?.classList.add('hidden');
          btnAdd?.classList.remove('hidden');
          textIndispo?.classList.add('hidden');
          if (productCard.classList.contains('border-cat-teal/40')) preorderBadge?.classList.remove('hidden');
        }
      }
    })
    .subscribe();
}
