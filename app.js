/**
 * JHADDY ARAÚJO STUDIO - JAVASCRIPT PRINCIPAL
 * Interatividade de alta conversão, personalização dinâmica e animações fluidas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hidratação dos dados a partir do config.js
  hydrateConfig();

  // 2. Menu Mobile e Navegação Fluida
  setupNavigation();

  // 3. Slider Interativo Antes & Depois (Touch & Mouse)
  setupComparisonSlider();

  // 4. Filtro de Categorias de Tratamentos
  setupTreatmentTabs();

  // 5. Quiz / Simulador de Protocolo Ideal
  setupTreatmentQuiz();

  // 6. Accordion do FAQ
  setupFaqAccordion();

  // 7. Modal de Agendamento VIP & Envio Direto para WhatsApp
  setupBookingModal();

  // 8. Banner LGPD de Cookies
  setupLgpdConsent();

  // 9. Animações de Entrada (IntersectionObserver)
  setupScrollReveal();

  // 10. Carrossel de Avaliações no Mobile
  setupReviewsCarousel();

  // 11. Efeito Parallax no Banner de Marca
  setupParallaxBanner();
});

/**
 * Hidrata os elementos da página com o SITE_CONFIG
 */
function hydrateConfig() {
  if (typeof SITE_CONFIG === 'undefined') return;

  // Atualiza Nome da Clínica / Estúdio
  document.querySelectorAll('[data-config="clinicName"]').forEach(el => {
    el.textContent = SITE_CONFIG.clinicName;
  });

  // Atualiza ShortName
  document.querySelectorAll('[data-config="shortName"]').forEach(el => {
    el.textContent = SITE_CONFIG.shortName;
  });

  // Atualiza Telefone Visível
  document.querySelectorAll('[data-config="phoneDisplay"]').forEach(el => {
    if (SITE_CONFIG.contact.phoneDisplay) {
      el.textContent = SITE_CONFIG.contact.phoneDisplay;
    } else {
      el.style.display = 'none';
      if (el.closest('li')) el.closest('li').style.display = 'none';
    }
  });

  // Atualiza Promessa de Resposta
  document.querySelectorAll('[data-config="responsePromise"]').forEach(el => {
    el.textContent = SITE_CONFIG.contact.responsePromise;
  });

  // Atualiza Endereço Completo
  document.querySelectorAll('[data-config="fullAddress"]').forEach(el => {
    const addr = SITE_CONFIG.contact.address;
    const comp = addr.complement ? `${addr.complement} - ` : '';
    el.textContent = `${comp}${addr.street}, ${addr.neighborhood} - ${addr.city}/${addr.state}`;
  });

  // Atualiza Especialista
  document.querySelectorAll('[data-config="specialistName"]').forEach(el => {
    el.textContent = SITE_CONFIG.specialist.name;
  });

  document.querySelectorAll('[data-config="specialistTitle"]').forEach(el => {
    if (SITE_CONFIG.specialist.title) {
      el.textContent = SITE_CONFIG.specialist.title;
    } else {
      el.style.display = 'none';
    }
  });

  document.querySelectorAll('[data-config="specialistReg"]').forEach(el => {
    el.textContent = SITE_CONFIG.specialist.registration;
  });

  document.querySelectorAll('[data-config="specialistBio"]').forEach(el => {
    el.textContent = SITE_CONFIG.specialist.bio;
  });

  // Atualiza Links do WhatsApp
  const defaultMsg = encodeURIComponent(SITE_CONFIG.contact.defaultWhatsappMessage);
  const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${defaultMsg}`;
  
  document.querySelectorAll('[data-action="open-whatsapp"]').forEach(el => {
    if (el.tagName === 'A') {
      el.href = waUrl;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.addEventListener('click', () => {
        window.open(waUrl, '_blank');
      });
    }
  });

  // Atualiza Redes Sociais
  if (SITE_CONFIG.contact && SITE_CONFIG.contact.social) {
    const s = SITE_CONFIG.contact.social;
    document.querySelectorAll('[data-social="instagram"]').forEach(el => {
      el.href = s.instagram || '#';
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('[data-social="facebook"]').forEach(el => {
      el.href = s.facebook || '#';
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('[data-social="youtube"]').forEach(el => {
      el.href = s.youtube || '#';
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
    document.querySelectorAll('[data-social="tiktok"]').forEach(el => {
      el.href = s.tiktok || '#';
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    });
  }

  // Atualiza Embed do Google Maps se fornecido
  const mapIframe = document.getElementById('clinicGoogleMap');
  if (mapIframe && SITE_CONFIG.contact.mapsEmbedUrl) {
    mapIframe.src = SITE_CONFIG.contact.mapsEmbedUrl;
  }
}

/**
 * Menu Hamburguer & Mobile Overlay
 */
function setupNavigation() {
  const hamburger = document.getElementById('navHamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link');
  const navHeader = document.querySelector('.nav-header');

  if (!hamburger || !overlay) return;

  function toggleMenu() {
    const isActive = hamburger.classList.toggle('is-active');
    overlay.classList.toggle('is-open', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (overlay.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  // Controle de exibição do header no mobile: só surge ao rolar para não cobrir a cabeça da especialista
  if (navHeader) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navHeader.classList.add('is-scrolled');
      } else {
        navHeader.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
}

/**
 * Slider Interativo Antes & Depois
 */
function setupComparisonSlider() {
  const container = document.getElementById('comparisonContainer');
  const overlayClip = document.getElementById('comparisonOverlayClip');
  const dividerLine = document.getElementById('comparisonDividerLine');
  const handle = document.getElementById('comparisonHandle');

  if (!container || !overlayClip || !dividerLine || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let xPos = clientX - rect.left;
    let percentage = (xPos / rect.width) * 100;

    // Trava entre 5% e 95%
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;

    overlayClip.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    dividerLine.style.left = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Eventos de Mouse
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Eventos Touch (Mobile)
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/**
 * Abas de Tratamentos (Filtro Suave)
 */
function setupTreatmentTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const treatmentCards = document.querySelectorAll('.treatment-card');

  if (!tabButtons.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      const category = button.getAttribute('data-category');

      treatmentCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Quiz / Simulador de Protocolo Personalizado
 */
function setupTreatmentQuiz() {
  const optionButtons = document.querySelectorAll('.quiz-option-btn');
  const resultBox = document.getElementById('quizResultBox');
  const resultTitle = document.getElementById('quizResultTitle');
  const resultDesc = document.getElementById('quizResultDesc');
  const resultCta = document.getElementById('quizResultCta');

  if (!optionButtons.length || !resultBox) return;

  const protocols = {
    epilacao: {
      title: "Epilação Terapêutica: Cuidado & Conforto",
      desc: "Protocolo especializado com cosméticos pré e pós-epilatórios que acalmam a pele sensível, reduzem a dor e previnem foliculite e pelos encravados.",
      message: "Olá, Jhaddy! Fiz o simulador no site e gostaria de agendar uma avaliação para Epilação Terapêutica."
    },
    clareamento: {
      title: "Clareamento Íntimo: Renovando sua Autoestima",
      desc: "Protocolo clareador e regenerativo de alta segurança para uniformizar a tonalidade de axilas, virilha e áreas delicadas, com ativos suaves e eficazes.",
      message: "Olá, Jhaddy! Fiz o simulador no site e gostaria de agendar uma sessão de Clareamento Íntimo."
    },
    limpeza: {
      title: "Limpeza de Pele Profunda: Saudável & Radiante",
      desc: "Higienização completa com vapor de ozônio, extração delicada de cravos e máscara revitalizante para devolver o viço, pureza e oxigenação à sua pele.",
      message: "Olá, Jhaddy! Fiz o simulador no site e quero agendar minha Limpeza de Pele Profunda."
    },
    dermaplaning: {
      title: "Dermaplaning Facial: Renovação & Maciez Imediata",
      desc: "Esfoliação física superficial para remoção precisa de células mortas e penugem facial (lanugem), proporcionando toque de seda e viço glow instantâneo.",
      message: "Olá, Jhaddy! Fiz o teste no site e gostaria de agendar uma sessão de Dermaplaning."
    }
  };

  optionButtons.forEach(button => {
    button.addEventListener('click', () => {
      optionButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');

      const targetKey = button.getAttribute('data-target');
      const protocol = protocols[targetKey];

      if (protocol) {
        resultTitle.textContent = protocol.title;
        resultDesc.textContent = protocol.desc;
        
        const phone = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.contact.whatsapp : "5571987870244";
        resultCta.href = `https://wa.me/${phone}?text=${encodeURIComponent(protocol.message)}`;
        
        resultBox.classList.add('is-active');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

/**
 * FAQ Accordion
 */
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');

    if (!button || !content) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Fecha os outros
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('is-open');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      // Abre/fecha o atual
      if (!isOpen) {
        item.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Máscara e validação de telefone celular (xx) xxxxx-xxxx
 */
function formatPhone(value) {
  const digits = (value || '').replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function applyPhoneMask(input) {
  if (!input) return;

  input.addEventListener('input', () => {
    input.value = formatPhone(input.value);
  });

  input.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key) && e.key !== 'Enter') {
      e.preventDefault();
    }
  });

  input.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasteData = (e.clipboardData || window.clipboardData).getData('text');
    input.value = formatPhone(pasteData);
  });
}

/**
 * Modal de Agendamento VIP & Formulário
 */
function setupBookingModal() {
  const openButtons = document.querySelectorAll('[data-action="open-modal-booking"]');
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('bookingModalClose');
  const form = document.getElementById('bookingForm');
  const modalPhoneInput = document.getElementById('bookPhone');

  // Aplica máscara estrita de celular
  applyPhoneMask(modalPhoneInput);

  if (!modal) return;

  function openModal() {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName').value.trim();
      const phoneVal = modalPhoneInput ? modalPhoneInput.value.trim() : '';
      const procedure = document.getElementById('bookProcedure').value;
      const period = document.getElementById('bookPeriod').value;

      const rawDigits = phoneVal.replace(/\D/g, '');
      if (rawDigits.length < 10) {
        alert('Por favor, informe um número de celular válido com DDD.');
        if (modalPhoneInput) modalPhoneInput.focus();
        return;
      }

      const message = `Olá, Jhaddy! Gostaria de agendar uma consulta de avaliação.\n\n*Nome:* ${name}\n*Telefone:* ${phoneVal}\n*Procedimento de Interesse:* ${procedure}\n*Melhor período:* ${period}`;
      
      const phone = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG.contact.whatsapp : "5571987870244";
      const targetUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(targetUrl, '_blank');
      closeModal();
      form.reset();
    });
  }
}

/**
 * Banner de Consentimento LGPD
 */
function setupLgpdConsent() {
  const banner = document.getElementById('lgpdBanner');
  const acceptBtn = document.getElementById('lgpdAccept');
  const declineBtn = document.getElementById('lgpdDecline');

  if (!banner) return;

  const hasConsent = localStorage.getItem('jhaddy_lgpd_consent');
  if (!hasConsent) {
    banner.classList.remove('is-hidden');
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('jhaddy_lgpd_consent', 'accepted');
      banner.classList.add('is-hidden');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('jhaddy_lgpd_consent', 'declined');
      banner.classList.add('is-hidden');
    });
  }
}

/**
 * Animações de Entrada Suaves (IntersectionObserver)
 */
function setupScrollReveal() {
  // Garantir que os elementos do Hero acima da dobra apareçam imediatamente sem atraso
  document.querySelectorAll('#hero .reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));

  const elements = document.querySelectorAll('.reveal-on-scroll:not(#hero .reveal-on-scroll)');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * Carrossel de Avaliações Touch (Mobile)
 */
function setupReviewsCarousel() {
  const track = document.getElementById('reviewsTrack');
  const dotsContainer = document.getElementById('reviewsDots');

  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.review-card');
  if (cards.length === 0) return;

  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `review-dot ${i === 0 ? 'is-active' : ''}`;
    dot.setAttribute('aria-label', `Ir para avaliação ${i + 1}`);
    dot.addEventListener('click', () => {
      track.scrollTo({
        left: cards[i].offsetLeft - track.offsetLeft,
        behavior: 'smooth'
      });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.review-dot');

  track.addEventListener('scroll', () => {
    const scrollLeft = track.scrollLeft;
    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - track.offsetLeft;
      const cardWidth = card.offsetWidth;
      if (scrollLeft >= cardLeft - cardWidth / 2 && scrollLeft < cardLeft + cardWidth / 2) {
        dots.forEach(d => d.classList.remove('is-active'));
        if (dots[index]) dots[index].classList.add('is-active');
      }
    });
  }, { passive: true });
}

/**
 * Parallax Sutil no Banner
 */
function setupParallaxBanner() {
  const banner = document.querySelector('.editorial-banner-img');
  if (!banner) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const bannerTop = banner.offsetTop;
    const bannerHeight = banner.offsetHeight;

    if (scrollY + window.innerHeight > bannerTop && scrollY < bannerTop + bannerHeight) {
      const offset = (scrollY - bannerTop) * 0.15;
      banner.style.transform = `translateY(${offset}px)`;
    }
  }, { passive: true });
}
