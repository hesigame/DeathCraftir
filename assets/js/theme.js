(function(){
var d=document,r=d.documentElement,$=function(s,c){return(c||d).querySelector(s)};
/* theme */
var t=null;try{t=localStorage.getItem('dc-theme')}catch(e){}
r.setAttribute('data-theme',t||'dark');
function icon(){var b=$('#dc-theme');if(b)b.innerHTML='<i class="fas fa-'+(r.getAttribute('data-theme')==='dark'?'sun':'moon')+'"></i>'}
d.addEventListener('DOMContentLoaded',function(){
 icon();
 var tb=$('#dc-theme');tb&&tb.addEventListener('click',function(){var n=r.getAttribute('data-theme')==='dark'?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem('dc-theme',n)}catch(e){}icon()});
 var top=$('.dc-top'),m=$('#dc-menu'),bg=$('#dc-burger');
 addEventListener('scroll',function(){top&&top.classList.toggle('sc',scrollY>20)},{passive:true});
 bg&&bg.addEventListener('click',function(){m.classList.toggle('open')});
 m&&m.addEventListener('click',function(e){if(e.target.closest('a'))m.classList.remove('open')});
 /* reveal */
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
 d.querySelectorAll('.rv').forEach(function(x){io.observe(x)});
 /* card glow follows mouse */
 d.addEventListener('pointermove',function(e){var c=e.target.closest&&e.target.closest('.cardx');if(c){var b=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-b.left+'px');c.style.setProperty('--my',e.clientY-b.top+'px')}});
 /* count-up */
 var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,end=parseFloat(el.dataset.to),suf=el.dataset.s||'',dec=(el.dataset.to.split('.')[1]||'').length,s=performance.now();(function f(n){var p=Math.min((n-s)/1400,1),v=end*(1-Math.pow(1-p,3));el.textContent=v.toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)})(s)})},{threshold:.5});
 d.querySelectorAll('[data-to]').forEach(function(x){co.observe(x)});
 /* live status */
 var dot=$('#st-dot'),txt=$('#st-txt');
 if(txt){fetch('https://api.mcsrvstat.us/3/play.deathcraft.ir').then(function(x){return x.json()}).then(function(j){
  if(j.online){dot.className='dot on';txt.textContent='سرور آنلاین است — '+(j.players?j.players.online:0)+' بازیکن در بازی'}else{dot.className='dot off';txt.textContent='سرور فعلاً آفلاین است'}
 }).catch(function(){txt.textContent='Play.DeathCraft.IR'})}
 /* PWA install */
 var ip=$('#dc-install');if(ip)ip.style.display='none';
 addEventListener('beforeinstallprompt',function(e){e.preventDefault();window._ip=e;if(ip){ip.style.display='';ip.onclick=function(){window._ip.prompt()}}});
 /* video only on desktop */
 var v=$('#dc-video');if(v){if(innerWidth<768||(navigator.connection&&navigator.connection.saveData))v.remove();else v.src='background.mp4'}
});
window.copyIP=function(){var ip='Play.DeathCraft.IR',tt=$('#dc-toast');function ok(){tt.classList.add('show');setTimeout(function(){tt.classList.remove('show')},2600)}
 (navigator.clipboard?navigator.clipboard.writeText(ip):Promise.reject()).then(ok).catch(function(){var a=d.createElement('textarea');a.value=ip;d.body.appendChild(a);a.select();try{d.execCommand('copy');ok()}catch(e){}a.remove()})};
if('serviceWorker' in navigator)addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})});
})();
