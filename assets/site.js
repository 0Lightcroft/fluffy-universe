(() => {
  const buttons = [...document.querySelectorAll('[data-language]')];
  function setLanguage(language) {
    if (!['fr', 'en'].includes(language)) return;
    document.documentElement.lang = language;
    for (const node of document.querySelectorAll('[data-fr][data-en]')) node.textContent = node.dataset[language];
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.language === language));
    for (const link of document.querySelectorAll('.header-inner nav a')) {
      const labels = { 'index.html#projets': ['Projets', 'Projects'], 'tester-fluffyfighter-customization.html': ['Tester', 'Try it'], 'index.html#contact': ['Contact', 'Contact'] };
      if (labels[link.getAttribute('href')]) link.textContent = labels[link.getAttribute('href')][language === 'en' ? 1 : 0];
    }
    for (const node of document.querySelectorAll('.document main section[lang]')) {
      node.hidden = node.lang !== language;
      node.toggleAttribute('data-selected-language', node.lang === language);
    }
    try { localStorage.setItem('lightcroft.site.language', language); } catch {}
  }
  for (const button of buttons) button.addEventListener('click', () => setLanguage(button.dataset.language));
  for (const link of document.querySelectorAll('.document main nav a[href="#francais"],.document main nav a[href="#english"]')) {
    link.addEventListener('click', () => setLanguage(link.hash === '#english' ? 'en' : 'fr'));
  }
  let chosen = location.hash === '#english' ? 'en' : location.hash === '#francais' ? 'fr' : 'fr';
  try { if (!['#english', '#francais'].includes(location.hash)) chosen = localStorage.getItem('lightcroft.site.language') || 'fr'; } catch {}
  setLanguage(chosen);
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }, { threshold: 0.08 });
    for (const node of document.querySelectorAll('.test-copy,.mobile-shot,.project-row,.contact-section')) { node.classList.add('will-reveal'); observer.observe(node); }
  }
})();
