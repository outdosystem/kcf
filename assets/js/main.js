(() => {
  const header = document.querySelector('.site-header');
  const backTop = document.querySelector('.back-top');
  const updateScrollState = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 8);
    backTop?.classList.toggle('is-visible', y > 500);
  };
  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  const menuButton = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu?.classList.toggle('is-open', open);
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.hero-dot')];
  let activeSlide = 0;
  let sliderTimer;
  const showSlide = index => {
    if (!slides.length) return;
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === activeSlide);
      slide.setAttribute('aria-hidden', String(i !== activeSlide));
      slide.inert = i !== activeSlide;
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === activeSlide);
      dot.setAttribute('aria-pressed', String(i === activeSlide));
    });
  };
  const resetTimer = () => {
    window.clearInterval(sliderTimer);
    if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sliderTimer = window.setInterval(() => showSlide(activeSlide + 1), 7000);
    }
  };
  document.querySelector('.hero-next')?.addEventListener('click', () => { showSlide(activeSlide + 1); resetTimer(); });
  document.querySelector('.hero-prev')?.addEventListener('click', () => { showSlide(activeSlide - 1); resetTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); resetTimer(); }));
  if (slides.length) { showSlide(0); resetTimer(); }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    revealEls.forEach(el => observer.observe(el));
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  const galleryTrack = document.querySelector('.gallery-track');
  const galleryPrev = document.querySelector('.gallery-carousel-prev');
  const galleryNext = document.querySelector('.gallery-carousel-next');
  const updateGalleryButtons = () => {
    if (!galleryTrack || !galleryPrev || !galleryNext) return;
    galleryPrev.disabled = galleryTrack.scrollLeft <= 1;
    galleryNext.disabled = galleryTrack.scrollLeft + galleryTrack.clientWidth >= galleryTrack.scrollWidth - 1;
  };
  const moveGallery = direction => {
    const card = galleryTrack?.querySelector('.gallery-item');
    if (!galleryTrack || !card) return;
    const gap = parseFloat(getComputedStyle(galleryTrack).gap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    galleryTrack.scrollBy({ left: direction * step, behavior });
  };
  galleryPrev?.addEventListener('click', () => moveGallery(-1));
  galleryNext?.addEventListener('click', () => moveGallery(1));
  galleryTrack?.addEventListener('scroll', updateGalleryButtons, { passive: true });
  window.addEventListener('resize', updateGalleryButtons);
  updateGalleryButtons();

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  let lightboxOpener = null;
  const closeLightbox = () => {
    lightbox?.classList.remove('is-open');
    lightbox?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxOpener?.focus();
  };
  document.querySelectorAll('.gallery-item').forEach((item, index) => item.addEventListener('click', () => {
    const image = item.querySelector('img');
    if (!lightbox || !image) return;
    lightboxImg.src = image.currentSrc || image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = item.dataset.caption || image.alt;
    lightboxOpener = item;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close').focus();
  }));
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox?.classList.contains('is-open')) closeLightbox(); });

  const productSelect = document.querySelector('[name="product"]');
  if (productSelect) {
    const chosen = new URLSearchParams(window.location.search).get('product');
    const match = [...productSelect.options].find(option => option.value.toLowerCase() === (chosen || '').toLowerCase());
    if (match) productSelect.value = match.value;
  }

  document.querySelectorAll('.enquiry-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const message = form.querySelector('.form-message');
    message.textContent = 'Your enquiry is ready, but this form is not connected to a submission service yet. Please contact the business directly or configure the form endpoint before launch.';
    message.classList.add('is-visible');
    message.setAttribute('role', 'status');
  }));
})();
