/* Portfolio rendering and interactions */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const chip=c=>Array.isArray(c)?`<span class="chip"><i>${icon(c[0])}</i>${esc(c[1])}</span>`:`<span class="chip">${esc(c)}</span>`;
document.getElementById('prof').innerHTML=`<div class="prof-head"><h3>Software proficiency</h3><span>Self-rated, based on coursework, training and daily use</span></div><div class="bars">${prof.map(p=>`<div class="bar"><div class="ic">${icon(p[0])}</div><div class="bd"><div class="nm">${esc(p[1])}</div><div class="row"><div class="track" role="progressbar" aria-label="${esc(p[1])}" aria-valuenow="${p[2]}" aria-valuemin="0" aria-valuemax="100"><div class="fill" style="width:${p[2]}%"></div></div><b>${p[2]}%</b></div></div></div>`).join('')}</div><div class="langs"><p class="eyebrow">Languages</p><div><b>Indonesian</b> · Native</div><div><b>English</b> · Professional</div><div><b>Chinese</b> · Elementary</div></div>`;

document.getElementById('skillGrid').innerHTML=skills.map(s=>`<article class="skill"><h3>${esc(s.t)}</h3><p>${esc(s.p)}</p><div class="chips">${s.c.map(chip).join('')}</div></article>`).join('');
document.getElementById('journeyGrid').innerHTML=journey.map(j=>`<div class="track"><h3>${esc(j.h)}</h3><ol>${j.items.map(i=>`<li><span class="when">${esc(i[0])}</span><span class="what">${esc(i[1])}</span><span class="where">${esc(i[2])}</span>${i[3]?`<span class="note">${esc(i[3])}</span>`:''}</li>`).join('')}</ol></div>`).join('');
document.getElementById('caseList').innerHTML=cases.map(c=>`<article class="case"><figure class="case-media" style="margin:0"><img src="${A+c.img}" alt="${esc(c.cap)}" class="${c.contain?'contain':''}" style="${c.pos?'object-position:'+c.pos:''}" loading="lazy"><figcaption>${esc(c.cap)}</figcaption></figure><div class="case-body"><div class="case-tag"><p class="eyebrow">${esc(c.tag)}</p>${c.logo?`<img src="${A+c.logo}" alt="">`:''}</div><h3>${esc(c.t)}</h3><div class="case-kpis">${c.k.map(k=>`<div><strong>${esc(k[0])}</strong><span>${esc(k[1])}</span></div>`).join('')}</div><ul class="pai"><li><b>PROBLEM</b>${esc(c.p)}</li><li><b>ACTION</b>${esc(c.a)}</li><li><b>IMPACT</b>${esc(c.i)}</li></ul>${c.ins?`<div class="insight"><b>Key insight · </b>${esc(c.ins)}</div>`:''}<div class="chips">${c.tools.map(chip).join('')}</div></div></article>`).join('');
document.getElementById('cadGrid').innerHTML=cad.map((m,ix)=>`<button type="button" class="model" data-cad="${ix}"><div class="thumb"><span class="sw">${m.tool&&icon(m.tool)?`<i>${icon(m.tool)}</i>`:''}${esc(m.sw)}</span><img src="${A+m.img}" alt="${esc(m.t)} 3D model" loading="lazy"></div><div class="model-body"><span class="meta">${esc(m.meta)}</span><h4>${esc(m.t)}</h4><p>${esc(m.d)}</p></div></button>`).join('');

const cats=['All','Certification','Experience','Education','Organisation'];
let cur='All';
function drawDocs(){
  document.getElementById('docTabs').innerHTML=cats.map(c=>`<button type="button" class="tab" aria-pressed="${c===cur}" data-cat="${c}">${c}</button>`).join('');
  const list=docs.filter(d=>cur==='All'||d[0]===cur);
  document.getElementById('docGrid').innerHTML=list.map(d=>`<button type="button" class="doc" data-doc="${docs.indexOf(d)}"><img src="${A+d[1]}" alt="${esc(d[2])}" loading="lazy"><span>${esc(d[2])}</span></button>`).join('');
}
drawDocs();
document.getElementById('docTabs').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;cur=b.dataset.cat;drawDocs();});

const lb=document.getElementById('lb'),lbMedia=document.getElementById('lbMedia'),lbCap=document.getElementById('lbCap');
let set=[],pos=0,lastFocus=null;
function show(){const [src,cap]=set[pos];lbMedia.innerHTML=src.endsWith('.mp4')?`<video src="${A+src}" controls autoplay muted loop playsinline></video>`:`<img src="${A+src}" alt="${esc(cap)}">`;lbCap.textContent=cap+(set.length>1?`  (${pos+1}/${set.length})`:'');document.getElementById('lbPrev').hidden=document.getElementById('lbNext').hidden=set.length<2;}
function open(s,p){set=s;pos=p;lastFocus=document.activeElement;lb.hidden=false;show();document.getElementById('lbClose').focus();}
function close(){lb.hidden=true;lbMedia.innerHTML='';if(lastFocus)lastFocus.focus();}
document.getElementById('cadGrid').addEventListener('click',e=>{const b=e.target.closest('[data-cad]');if(!b)return;open(cad[+b.dataset.cad].g,0);});
document.getElementById('docGrid').addEventListener('click',e=>{const b=e.target.closest('[data-doc]');if(!b)return;const list=docs.filter(d=>cur==='All'||d[0]===cur).map(d=>[d[1],d[2]]);open(list,list.findIndex(x=>x[0]===docs[+b.dataset.doc][1]));});
document.getElementById('lbClose').onclick=close;
document.getElementById('lbPrev').onclick=()=>{pos=(pos-1+set.length)%set.length;show();};
document.getElementById('lbNext').onclick=()=>{pos=(pos+1)%set.length;show();};
lb.addEventListener('click',e=>{if(e.target===lb)close();});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')document.getElementById('lbNext').click();if(e.key==='ArrowLeft')document.getElementById('lbPrev').click();});

document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>{
  const el=document.getElementById(b.dataset.copy),txt=el.textContent.trim(),orig=b.textContent;
  const done=()=>{b.textContent='Copied';setTimeout(()=>b.textContent=orig,1500);};
  const sel=()=>{const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected, press Ctrl+C';setTimeout(()=>b.textContent=orig,2000);};
  try{navigator.clipboard.writeText(txt).then(done,sel);}catch(err){sel();}
}));

const mb=document.getElementById('menuBtn'),nl=document.getElementById('navList');
mb.addEventListener('click',()=>{const o=nl.classList.toggle('open');mb.setAttribute('aria-expanded',o);});
nl.addEventListener('click',e=>{if(e.target.closest('a')){nl.classList.remove('open');mb.setAttribute('aria-expanded','false');}});

/* ---------- enhancements ---------- */
(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // reveal sections and cards on scroll
  const targets=document.querySelectorAll('.sec-head,.habit,.skill,.prof,.track,.case,.model,.doc,.way');
  if('IntersectionObserver' in window && !reduce){
    targets.forEach(el=>el.classList.add('reveal'));
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
    targets.forEach(el=>io.observe(el));
  } else {
    document.querySelectorAll('.prof').forEach(el=>el.classList.add('in'));
  }
  // highlight the nav link of the section in view
  const links=[...document.querySelectorAll('#navList a[href^="#"]')];
  const secs=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver' in window){
    const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}}),{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(s=>so.observe(s));
  }
  // back-to-top button
  const top=document.getElementById('toTop');
  if(top){
    const onScroll=()=>{top.hidden=window.scrollY<700;};
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
    top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
  }
  // small confirmation when the CV download starts
  document.querySelectorAll('[data-cv]').forEach(a=>a.addEventListener('click',()=>{
    const t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent='Downloading CV (PDF)…';
    document.body.appendChild(t);setTimeout(()=>t.remove(),2200);
  }));
})();
