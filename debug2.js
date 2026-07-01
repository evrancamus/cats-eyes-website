(function(){		const serviceData = {
			traiteur: {
				title: "L'art de recevoir, <br/> façon Cat's Eyes.",
				desc: "Que ce soit pour un séminaire d'entreprise à Orléans ou une fête privée, nous transformons vos événements en expériences sensorielles... dans nos locaux ou ailleurs !",
				subDesc: "Brochettes de fruits givrés, hors-d'œuvre asiatiques raffinés, plateaux de jus pressés à la minute, soupes signatures et plein d'autres plats succulents !",
				btn: "Discuter sur WhatsApp",
				waMsg: "Bonjour, je souhaite des infos sur le service traiteur",
				images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => `/images/traiteur-${i}.webp`)
			},
			cours: {
				title: "Partagez un moment Authentique!",
				desc: "Plongez dans l'univers de la cuisine traditionelle d'Asie du Sud-Est lors de nos cours de cuisine à Orléans. Découvrez notre univers au travers d'une expérience créative, atypique et conviale !",
				subDesc: "Ateliers en petits groupes, matériel fourni et dégustation dans une ambiance chaleureuse.",
				btn: "Réserver un Atelier",
				waMsg: "Bonjour, j'aimerais connaître les prochaines dates des cours de cuisine",
				images: [1, 2, 3].map(i => `/images/atelier-${i}.webp`)
			}
		};

		const carousel = document.getElementById('traiteur-carousel');
		const prevBtn = document.getElementById('traiteur-prev');
		const nextBtn = document.getElementById('traiteur-next');
		const swipeIndicator = document.getElementById('swipe-indicator');
		
		const tabsTraiteur = document.querySelectorAll('.tab-traiteur-btn');
		const tabsCours = document.querySelectorAll('.tab-cours-btn');
		
		const serviceTitle = document.getElementById('service-title');
		const serviceDesc = document.getElementById('service-desc');
		const serviceSubDesc = document.getElementById('service-subdesc');
		const serviceBtnWA = document.getElementById('service-btn-wa');
		const serviceLabelWA = document.getElementById('service-label-wa');

		let currentService = 'traiteur';

		// --- FONCTION OUTIL : AFFICHAGE DE LA MAIN ---
		let swipeTimer;

		const showSwipe = () => {
			if (!swipeIndicator) return;
			clearTimeout(swipeTimer);

			swipeIndicator.style.display = 'flex';
			requestAnimationFrame(() => {
				swipeIndicator.classList.remove('opacity-0');
				swipeIndicator.classList.add('opacity-100');
			});
			
			swipeTimer = setTimeout(() => {
				swipeIndicator.classList.replace('opacity-100', 'opacity-0');
				setTimeout(() => { 
					if (swipeIndicator.classList.contains('opacity-0')) {
						swipeIndicator.style.display = 'none'; 
					}
				}, 700);
			}, 3000);
		};

		// --- LOGIQUE DE MISE À JOUR DES ONGLETS (MISE À JOUR DE TOUS LES BOUTONS SIMULTANÉMENT) ---
		const updateService = (newService) => {
			if (newService === currentService) return;
			
			currentService = newService;
			const data = serviceData[currentService];

			// --- DESIGN DES ONGLETS & DU BOUTON WHATSAPP ---
			if (currentService === 'traiteur') {
				// Onglet Traiteur : JAUNE
				tabsTraiteur.forEach(btn => btn.className = "tab-traiteur-btn px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 border-2 border-white/10 shadow-sm bg-cat-yellow text-cat-pine");
				// Onglet Cours : ÉTEINT
				tabsCours.forEach(btn => btn.className = "tab-cours-btn px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 border-2 border-white/10 shadow-sm bg-transparent text-white/40 hover:text-white");
				
				// Bouton WhatsApp : VERT (ou la couleur d'origine de ton choix pour le traiteur)
				if (serviceBtnWA) {
					serviceBtnWA.className = "bg-cat-teal text-white text-center px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-cat-teal/90 transition-all active:scale-95 duration-500";
				}
			} else {
				// Onglet Cours : ROSE
				tabsCours.forEach(btn => btn.className = "tab-cours-btn px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 border-2 border-white/10 shadow-sm bg-cat-pink text-white");
				// Onglet Traiteur : ÉTEINT
				tabsTraiteur.forEach(btn => btn.className = "tab-traiteur-btn px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 border-2 border-white/10 shadow-sm bg-transparent text-white/40 hover:text-white");
				
				// Bouton WhatsApp : ROSE POUR LES ATELIERS
				if (serviceBtnWA) {
					serviceBtnWA.className = "bg-cat-pink text-white text-center px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-cat-pink/90 transition-all active:scale-95 duration-500";
				}
			}

			const els = [serviceTitle, serviceDesc, serviceSubDesc, serviceBtnWA];
			els.forEach(el => { if(el) { el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; } });

			setTimeout(() => {
				if(serviceTitle) serviceTitle.innerHTML = data.title;
				if(serviceDesc) serviceDesc.innerText = data.desc;
				if(serviceSubDesc) serviceSubDesc.innerText = data.subDesc;
				if(serviceLabelWA) serviceLabelWA.innerText = data.btn;
				if(serviceBtnWA) serviceBtnWA.href = `https://wa.me/33631541175?text=${encodeURIComponent(data.waMsg)}`;
				
				const slides = carousel.querySelectorAll('.snap-center');
				slides.forEach((slide, idx) => {
					const img = slide.querySelector('img');
					if (data.images[idx]) {
						img.src = data.images[idx];
						slide.style.display = 'block';
						img.style.opacity = '1';
					} else {
						slide.style.display = 'none';
					}
				});

				els.forEach(el => { if(el) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } });

				carousel.scrollTo({ left: 0, behavior: 'smooth' });
				
				showSwipe(); 

				if (typeof updateButtons === 'function') updateButtons();
			}, 400);
		};
		
		// --- LOGIQUE DE NAVIGATION DEPUIS LE MENU ---
		const menuLinkAteliers = document.getElementById('menu-link-ateliers');
		const menuLinkTraiteur = document.getElementById('menu-link-traiteur');

		menuLinkAteliers?.addEventListener('click', () => updateService('cours'));
		menuLinkTraiteur?.addEventListener('click', () => updateService('traiteur'));

		window.addEventListener('load', () => {
			if (window.location.hash === '#ateliers') {
				updateService('cours');
				document.getElementById('traiteur')?.scrollIntoView({ behavior: 'smooth' });
			}
		});

		// On attache l'événement de clic sur la liste complète de boutons
		tabsTraiteur.forEach(btn => btn.addEventListener('click', () => updateService('traiteur')));
		tabsCours.forEach(btn => btn.addEventListener('click', () => updateService('cours')));

		// --- LOGIQUE CAROUSEL ---		if (carousel) {
			const updateButtons = () => {
				const scrollLeft = carousel.scrollLeft;
				const maxScroll = carousel.scrollWidth - carousel.clientWidth;
				if(prevBtn) prevBtn.style.display = (scrollLeft <= 5) ? 'none' : 'flex';
				if(nextBtn) nextBtn.style.display = (scrollLeft >= maxScroll - 5) ? 'none' : 'flex';
			};

			nextBtn?.addEventListener('click', () => {
				const item = carousel.querySelector('div');
				carousel.scrollBy({ left: item.offsetWidth + 16, behavior: 'smooth' });
			});

			prevBtn?.addEventListener('click', () => {
				const item = carousel.querySelector('div');
				carousel.scrollBy({ left: -(item.offsetWidth + 16), behavior: 'smooth' });
			});

			carousel.addEventListener('scroll', updateButtons);
			window.addEventListener('load', updateButtons);

			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						showSwipe();
					}
				});
			}, { threshold: 0.4 });

			observer.observe(carousel);
		}
	})();