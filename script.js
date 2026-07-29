// ---- portfolio frame data ----
  const frames = [
    {n:'005', seed:'asa-01', title:'Ivy, Late Afternoon', cat:'portrait', catLabel:'Portrait'},
    {n:'006', seed:'asa-02', title:'Tango, Sunday Market', cat:'street', catLabel:'Street'},
    {n:'007', seed:'asa-03', title:'Curl of Light', cat:'portrait', catLabel:'Portrait'},
    {n:'008', seed:'asa-04', title:'Feathers, Silver & Gold', cat:'nature', catLabel:'Nature'},
    {n:'009', seed:'asa-05', title:'Beauty Mark', cat:'portrait', catLabel:'Portrait'},
    {n:'010', seed:'asa-06', title:'Company Rehearsal', cat:'documentary', catLabel:'Documentary'},
    {n:'011', seed:'asa-07', title:'Corner Store, 6AM', cat:'street', catLabel:'Street'},
    {n:'012', seed:'asa-08', title:'Riverside, Overcast', cat:'nature', catLabel:'Nature'},
    {n:'013', seed:'asa-09', title:'The Long Table', cat:'documentary', catLabel:'Documentary'},
    {n:'014', seed:'asa-10', title:'Wren, Self Portrait', cat:'portrait', catLabel:'Portrait'},
    {n:'015', seed:'asa-11', title:'Platform, Rush Hour', cat:'street', catLabel:'Street'},
    {n:'016', seed:'asa-12', title:'Low Tide', cat:'nature', catLabel:'Nature'},
  ];

  const grid = document.getElementById('grid');
  grid.innerHTML = frames.map(f => `
    <div class="frame" data-cat="${f.cat}">
      <span class="frame-num mono">No. ${f.n}</span>
      <img src="https://picsum.photos/seed/${f.seed}/700/700" alt="${f.title}" loading="lazy">
      <span class="frame-mark" aria-hidden="true"></span>
      <div class="frame-overlay">
        <p class="frame-title">${f.title}</p>
        <p class="frame-cat">${f.catLabel}</p>
      </div>
    </div>
  `).join('');

  // filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.frame').forEach(frame => {
        const show = f === 'all' || frame.dataset.cat === f;
        frame.classList.toggle('hidden-frame', !show);
      });
    });
  });

  // nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // nav scroll state
  const siteNav = document.getElementById('siteNav');
  window.addEventListener('scroll', () => {
    siteNav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // testimonial carousel
  const slides = document.querySelectorAll('.testi-slide');
  const dotsWrap = document.getElementById('testiDots');
  let current = 0;
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    dot.addEventListener('click', () => showSlide(i));
    dotsWrap.appendChild(dot);
  });
  function showSlide(i){
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }
  document.getElementById('testiPrev').addEventListener('click', () => showSlide(current - 1));
  document.getElementById('testiNext').addEventListener('click', () => showSlide(current + 1));

  // newsletter (demo only, no backend)
  document.getElementById('newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Developed ✓';
    setTimeout(() => { btn.textContent = original; e.target.reset(); }, 2200);
  });

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }
