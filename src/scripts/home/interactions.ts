import type { HomePageElements } from './types';

export function attachCategoryFilterHandlers(elements: HomePageElements) {
  const handleCategoryFilterClick = (btn: Element, e: Event) => {
    e.preventDefault();
    const rawFilter = btn.getAttribute('data-filter') || btn.getAttribute('data-category');
    const filterValue = rawFilter ? rawFilter.trim().toLowerCase() : 'all';

    elements.categoryBtns.forEach(b => b.classList.remove('bg-cat-yellow'));
    btn.classList.add('bg-cat-yellow');

    elements.productCards.forEach(card => {
      const rawCardCat = card.getAttribute('data-category');
      const cardCategory = rawCardCat ? rawCardCat.trim().toLowerCase() : '';

      if (filterValue === 'all' || filterValue === 'tout' || cardCategory === filterValue) {
        (card as HTMLElement).style.setProperty('display', 'flex', 'important');
        card.classList.remove('hidden');
        (card as HTMLElement).style.opacity = '1';
      } else {
        (card as HTMLElement).style.setProperty('display', 'none', 'important');
        card.classList.add('hidden');
      }
    });
  };

  elements.categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => handleCategoryFilterClick(btn, e));
  });

  const defaultBtn = document.querySelector('[data-filter="all"]');
  if (defaultBtn) defaultBtn.classList.add('bg-cat-yellow');
}

export function attachGlobalInteractionHandlers() {
  const spiceLabels = ['Pas de Piment 🌿', 'Doux 🌶️', 'Relevé 🔥', 'Lave 🌋'];
  const spiceIcons = [
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><text y='18' font-size='16'>🌿</text></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><text y='18' font-size='16'>🌶️</text></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><text y='18' font-size='16'>🔥</text></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><text y='18' font-size='16'>🌋</text></svg>"
  ];

  const handleDocumentClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const extraBtn = target.closest('.extra-btn');
    const variantBtn = target.closest('.variant-btn');
    const toggleBtn = target.closest('.toggle-description');

    if (extraBtn) {
      extraBtn.classList.toggle('extra-selected');
      return;
    }

    if (variantBtn) {
      e.preventDefault();
      const container = variantBtn.closest('.group-container');
      const targetImgId = variantBtn.getAttribute('data-target');
      const newSrc = variantBtn.getAttribute('data-image');
      const productImg = targetImgId ? document.getElementById(targetImgId) as HTMLImageElement | null : null;

      if (container) {
        container.querySelectorAll('.variant-btn').forEach(b => {
          b.classList.remove('active-variant', 'bg-cat-yellow');
          b.classList.add('bg-white');
        });

        variantBtn.classList.add('active-variant', 'bg-cat-yellow');
        variantBtn.classList.remove('bg-white');

        if (productImg && newSrc && newSrc.trim() !== '') {
          productImg.style.opacity = '0.5';
          setTimeout(() => {
            productImg.src = newSrc;
            productImg.style.opacity = '1';
          }, 100);
        }
      }
      return;
    }

    if (toggleBtn) {
      e.preventDefault();
      const container = toggleBtn.closest('.description-container');
      const text = container?.querySelector('.product-description');
      const isExpanded = text?.classList.contains('line-clamp-none');

      if (!text) return;
      if (isExpanded) {
        text.classList.remove('line-clamp-none');
        text.classList.add('line-clamp-3');
        toggleBtn.textContent = '+ Voir plus';
      } else {
        text.classList.remove('line-clamp-3');
        text.classList.add('line-clamp-none');
        toggleBtn.textContent = '- Réduire';
      }
      return;
    }

    const allergenBtn = target.closest('.allergen-btn');
    if (allergenBtn) {
      e.preventDefault();
      allergenBtn.classList.toggle('allergen-selected');
    }
  };

  const handleSpiceInput = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('spice-range')) return;
    const range = target as HTMLInputElement;
    const container = range.closest('.spice-container') || range.closest('div.mb-6');
    const textLabel = container?.querySelector('.spice-level-text');
    const val = Number(range.value);

    if (textLabel) {
      textLabel.textContent = spiceLabels[val];
      if (val === 3) {
        textLabel.classList.add('animate-pulse', 'text-red-700');
      } else {
        textLabel.classList.remove('animate-pulse', 'text-red-700');
      }
    }

    range.style.setProperty('--spice-icon', `url("${spiceIcons[val]}")`);
  };

  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('input', handleSpiceInput);
}

export function initDescriptionToggles() {
  const containers = document.querySelectorAll('.description-container');
  containers.forEach(container => {
    const textEl = container.querySelector('.product-description');
    const btn = container.querySelector('.toggle-description');

    if (textEl && btn) {
      const isOverflowing = (textEl as HTMLElement).scrollHeight > (textEl as HTMLElement).clientHeight;
      if (isOverflowing) {
        btn.classList.remove('hidden');
      } else {
        btn.remove();
      }
    }
  });
}
