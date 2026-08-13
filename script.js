/* ==========================================================================
   LB AR CONDICIONADO - INTERACTIVE JAVASCRIPT
   Vanilla JS Engine for Modals, Calculators, Sliders, and Conversions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. STICKY HEADER SCROLL EFFECT & MOBILE MENU TOGGLE
  const siteHeader = document.getElementById('site-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile drawer when clicking a link
    mobileDrawer.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 2. BTU CALCULATOR MODAL & REALTIME LOGIC
  const btuModal = document.getElementById('btu-modal');
  const openBtuBtns = document.querySelectorAll('.open-btu-calc');
  const closeBtuBtn = document.getElementById('close-btu-modal');

  const areaRange = document.getElementById('btu-area-range');
  const areaValueDisplay = document.getElementById('btu-area-display');
  const sunBtnModerate = document.getElementById('sun-moderate');
  const sunBtnIntense = document.getElementById('sun-intense');
  const peopleMinus = document.getElementById('people-minus');
  const peoplePlus = document.getElementById('people-plus');
  const peopleInput = document.getElementById('people-count');
  const elecMinus = document.getElementById('elec-minus');
  const elecPlus = document.getElementById('elec-plus');
  const elecInput = document.getElementById('elec-count');

  const resultSize = document.getElementById('btu-result-size');
  const resultModel = document.getElementById('btu-result-model');
  const resultExact = document.getElementById('btu-result-exact');
  const sendBtuWaBtn = document.getElementById('send-btu-whatsapp');

  let currentSun = 'moderate'; // 'moderate' or 'intense'

  function calculateBtu() {
    if (!areaRange || !resultSize) return;

    const area = parseInt(areaRange.value, 10);
    const people = parseInt(peopleInput.value, 10) || 1;
    const electronics = parseInt(elecInput.value, 10) || 0;

    const factor = currentSun === 'intense' ? 800 : 600;
    const extraPeople = Math.max(0, people - 1);
    const rawBtu = (area * factor) + (extraPeople * factor) + (electronics * 600);

    let sizeText = '9.000 BTU';
    let modelText = 'Ideal para quartos pequenos e escritórios de até 12m²';

    if (rawBtu <= 9000) {
      sizeText = '9.000 BTU';
      modelText = 'Ideal para quartos pequenos e escritórios de até 12m²';
    } else if (rawBtu <= 12000) {
      sizeText = '12.000 BTU';
      modelText = 'Ideal para suítes, salas médias e consultórios até 20m²';
    } else if (rawBtu <= 18000) {
      sizeText = '18.000 BTU';
      modelText = 'Ideal para salas integradas e ambientes até 30m²';
    } else if (rawBtu <= 24000) {
      sizeText = '24.000 BTU';
      modelText = 'Ideal para grandes salas, lojas e escritórios até 40m²';
    } else if (rawBtu <= 30000) {
      sizeText = '30.000 BTU';
      modelText = 'Ideal para espaços amplos e áreas comerciais até 50m²';
    } else {
      sizeText = '36.000+ BTU (ou Multi-Split / Cassete)';
      modelText = 'Recomendado sistema Multi-Split, Cassete ou VRF para alta capacidade';
    }

    resultSize.textContent = sizeText;
    resultModel.textContent = modelText;
    resultExact.textContent = `Cálculo técnico: ${rawBtu.toLocaleString('pt-BR')} BTUs exatos`;

    // Update WhatsApp pre-filled text
    if (sendBtuWaBtn) {
      const msg = encodeURIComponent(
        `Olá LB Ar Condicionado! Fiz a simulação de BTUs no site:\n\n` +
        `📐 Área do Ambiente: ${area}m²\n` +
        `☀️ Incidência Solar: ${currentSun === 'intense' ? 'Tarde intensa (800 BTU/m²)' : 'Manhã / Suave (600 BTU/m²)'}\n` +
        `👥 Pessoas no local: ${people}\n` +
        `💻 Eletrônicos: ${electronics}\n` +
        `⚡ Potência Estimada: ${rawBtu.toLocaleString('pt-BR')} BTUs\n` +
        `🎯 Recomendação: ${sizeText}\n\n` +
        `Gostaria de orçamento para instalação / equipamento!`
      );
      sendBtuWaBtn.href = `https://wa.me/5511947882203?text=${msg}`;
    }
  }

  // Open & Close Modal
  openBtuBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (btuModal) btuModal.classList.add('active');
    });
  });

  if (closeBtuBtn && btuModal) {
    closeBtuBtn.addEventListener('click', () => {
      btuModal.classList.remove('active');
    });
  }

  // Modal Input Listeners
  if (areaRange && areaValueDisplay) {
    areaRange.addEventListener('input', (e) => {
      areaValueDisplay.textContent = `${e.target.value} m²`;
      calculateBtu();
    });
  }

  if (sunBtnModerate && sunBtnIntense) {
    sunBtnModerate.addEventListener('click', () => {
      currentSun = 'moderate';
      sunBtnModerate.classList.add('active');
      sunBtnIntense.classList.remove('active');
      calculateBtu();
    });
    sunBtnIntense.addEventListener('click', () => {
      currentSun = 'intense';
      sunBtnIntense.classList.add('active');
      sunBtnModerate.classList.remove('active');
      calculateBtu();
    });
  }

  if (peopleMinus && peoplePlus && peopleInput) {
    peopleMinus.addEventListener('click', () => {
      let val = parseInt(peopleInput.value, 10) || 1;
      if (val > 1) peopleInput.value = val - 1;
      calculateBtu();
    });
    peoplePlus.addEventListener('click', () => {
      let val = parseInt(peopleInput.value, 10) || 1;
      peopleInput.value = val + 1;
      calculateBtu();
    });
  }

  if (elecMinus && elecPlus && elecInput) {
    elecMinus.addEventListener('click', () => {
      let val = parseInt(elecInput.value, 10) || 0;
      if (val > 0) elecInput.value = val - 1;
      calculateBtu();
    });
    elecPlus.addEventListener('click', () => {
      let val = parseInt(elecInput.value, 10) || 0;
      elecInput.value = val + 1;
      calculateBtu();
    });
  }

  calculateBtu(); // Initial calc setup

  // 3. BEFORE / AFTER COMPARISON SLIDER DRAG LOGIC
  const baContainer = document.getElementById('ba-container');
  const baWrapper = document.getElementById('ba-before-wrapper');
  const baDivider = document.getElementById('ba-divider');

  if (baContainer && baWrapper && baDivider) {
    let isDragging = false;

    const updateSlider = (clientX) => {
      const rect = baContainer.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      let percentage = (x / rect.width) * 100;
      baWrapper.style.width = `${percentage}%`;
      baDivider.style.left = `${percentage}%`;
    };

    baContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    baContainer.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    // Touch events for mobile
    baContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    baContainer.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    });
  }

  // 4. PORTFOLIO GALLERY CATEGORY FILTER & LIGHTBOX
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeLightboxBtn = document.getElementById('close-lightbox');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'todos' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.dataset.title;
      if (lightboxModal && lightboxImg && img) {
        lightboxImg.src = img.src;
        if (lightboxTitle) lightboxTitle.textContent = title || '';
        lightboxModal.classList.add('active');
      }
    });
  });

  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 5. FAQ ACCORDION & SEARCH FILTER
  const faqItems = document.querySelectorAll('.faq-item');
  const faqSearchInput = document.getElementById('faq-search');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // 6. CONTACT FORM SUBMIT -> PRE-FILL WHATSAPP
  const contactForm = document.getElementById('contact-form');
  const formSuccessBox = document.getElementById('form-success-box');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const service = document.getElementById('form-service').value;
      const location = document.getElementById('form-location').value;
      const message = document.getElementById('form-message').value;

      const whatsappText = encodeURIComponent(
        `Olá LB Ar Condicionado! Solicitação de Orçamento pelo site:\n\n` +
        `👤 Nome: ${name}\n` +
        `📱 Telefone: ${phone}\n` +
        `🛠️ Serviço: ${service}\n` +
        `📍 Região: ${location}\n` +
        `💬 Mensagem: ${message || 'Sem observações adicionais'}`
      );

      if (formSuccessBox) {
        contactForm.style.display = 'none';
        formSuccessBox.style.display = 'block';
      }

      window.open(`https://wa.me/5511947882203?text=${whatsappText}`, '_blank');
    });
  }

  // 7. FLOATING WHATSAPP CHAT DRAWER
  const floatingWaBtn = document.getElementById('floating-wa-btn');
  const floatingChatDrawer = document.getElementById('floating-chat-drawer');
  const closeChatDrawerBtn = document.getElementById('close-chat-drawer');
  const chatQuickBtns = document.querySelectorAll('.chat-quick-btn');
  const chatInput = document.getElementById('chat-custom-input');
  const chatSendBtn = document.getElementById('chat-custom-send');

  if (floatingWaBtn && floatingChatDrawer) {
    floatingWaBtn.addEventListener('click', () => {
      floatingChatDrawer.classList.toggle('active');
    });

    if (closeChatDrawerBtn) {
      closeChatDrawerBtn.addEventListener('click', () => {
        floatingChatDrawer.classList.remove('active');
      });
    }

    chatQuickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.msg;
        const msg = encodeURIComponent(`Olá LB Ar Condicionado! ${text}`);
        window.open(`https://wa.me/5511947882203?text=${msg}`, '_blank');
      });
    });

    if (chatSendBtn && chatInput) {
      const sendCustomMsg = () => {
        const text = chatInput.value.trim() || 'Olá! Gostaria de um orçamento.';
        window.open(`https://wa.me/5511947882203?text=${encodeURIComponent(text)}`, '_blank');
      };

      chatSendBtn.addEventListener('click', sendCustomMsg);
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendCustomMsg();
      });
    }
  }

});
