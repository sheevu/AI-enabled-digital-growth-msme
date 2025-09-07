// Small interactions: counters, parallax, reveal, carousel
const counters = document.querySelectorAll('.num');
const obsCount = new IntersectionObserver((es)=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target;
      const to = +el.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.floor(to/100));
      const tick = ()=>{ cur += step; if(cur>to) cur=to; el.textContent = cur.toLocaleString('en-IN'); if(cur<to) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
      obsCount.unobserve(el);
    }
  });
},{threshold:.6});
counters.forEach(c=>obsCount.observe(c));

// Panel parallax & hover light
document.querySelectorAll('.panel').forEach(panel=>{
  const spd = parseFloat(panel.dataset.speed || 0.2);
  window.addEventListener('scroll', ()=>{
    const rect = panel.getBoundingClientRect();
    const off = rect.top - window.innerHeight/2;
    panel.style.transform = `translateY(${off*spd*-0.2}px)`;
  });
  panel.addEventListener('mousemove', (e)=>{
    const r = panel.getBoundingClientRect();
    panel.style.setProperty('--mx', `${((e.clientX - r.left)/r.width)*100}%`);
    panel.style.setProperty('--my', `${((e.clientY - r.top)/r.height)*100}%`);
  });
});

// Reveal
const obsReveal = new IntersectionObserver((es)=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obsReveal.unobserve(e.target);} });
},{threshold:.35});
document.querySelectorAll('.reveal').forEach(el=>obsReveal.observe(el));

// Simple carousel
const slides = document.querySelectorAll('.carousel .slide');
let idx = 0;
setInterval(()=>{
  slides[idx].classList.remove('active');
  idx = (idx+1)%slides.length;
  slides[idx].classList.add('active');
}, 3000);
