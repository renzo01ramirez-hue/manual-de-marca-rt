/* Renzo Ramírez — brand book interactions */
(function(){
  function revealAll(){ document.querySelectorAll('.rv:not(.in)').forEach(el=>el.classList.add('in')); }

  // No observer support / reduced-motion → just show everything.
  if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches){
    revealAll();
    window.__rvBind = function(){};
  } else {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    function bind(){ document.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el)); }
    bind();
    window.__rvBind = bind;

    // Safety net: if the observer never fires (offscreen iframe, print/PDF,
    // screenshot/embed contexts) reveal everything so content is never lost.
    setTimeout(revealAll, 1600);
    window.addEventListener('beforeprint', revealAll);
  }

  // Smooth anchor nav
  document.querySelectorAll('a[data-jump]').forEach(a=>{
    a.addEventListener('click',ev=>{
      const id=a.getAttribute('href');
      if(id&&id.startsWith('#')){
        const t=document.querySelector(id);
        if(t){ ev.preventDefault(); window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-10,behavior:'smooth'}); }
      }
    });
  });
})();
