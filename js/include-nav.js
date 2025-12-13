// include-nav.js - carrega snippets HTML (nav) em elementos com data-include="nav"
(function(){
  async function ensureCSS(){
    const href = '/css/nav.css';
    if(document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  async function includeNav(){
    const nodes = document.querySelectorAll('[data-include="nav"]');
    if(!nodes.length) return;
    try{
      await ensureCSS();
      const res = await fetch('/Html/components/nav.html');
      if(!res.ok) return;
      const html = await res.text();
      nodes.forEach(n => { n.innerHTML = html; });
    }catch(e){ console.warn('include-nav failed', e); }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', includeNav);
  else includeNav();
})();
