const $=s=>document.querySelector(s), view=$('#view');
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{return JSON.parse(localStorage.getItem('ba_'+k))??d}catch{return d}},set(k,v){try{localStorage.setItem('ba_'+k,JSON.stringify(v))}catch{}}};
const COL={Fuego:'#e8663d',Hielo:'#6cc4f0',Viento:'#7fd6a0',Tierra:'#c49a5a',Rayo:'#f2d04b'};
const slug=n=>n.toLowerCase().replace(/['’]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const el=(e,nc)=>e?`<span class="el"><i style="background:${COL[e]}"></i>${e}${nc?' (por confirmar)':''}</span>`:'<span class="el">Elemento sin confirmar</span>';
const GUIAS={grieta:'Grieta dimensional',sendas:'Sendas',conquista:'Conquista',santuario:'Santuario elemental',legendaria:'Conquista legendaria',encargos:'Encargos',historia:'Historia completa',submisiones:'Sub misiones',codice:'Códice de monstruos',ocultos:'Objetos ocultos, cofres, puzzles y hallazgos'};
const SOON=t=>`<h1>${t}</h1><p class="sub">Sección en preparación.</p><div class="empty"><b>Aún sin contenido.</b> Esta sección se llenará con datos de las fuentes y de tus propias partidas.</div>`;
const GD={
 legendaria:['Epithym: Sorin es una serpiente oriental con ataques de elemento y espacio a gran escala.','Sorin y Reginula se turnan cada semana (el reinicio es el lunes): consulta el calendario en Inicio.','Al cambiar de monstruo se reinician los intentos; gasta los que te queden antes.'],
 santuario:['Jefes seguidos en un mismo desafío.','Eliges restricciones (por ejemplo vida del jefe oculta o jefes que se curan) que suben la dificultad y las recompensas.','Cada clear da moneda para comprar más restricciones; la etapa alcanzada otorga Bendición Elemental, que sube el daño elemental y mejora un Rasgo pasivo por personaje.','Ambos efectos valen para toda la cuenta y para los demás modos.'],
 grieta:['Cada temporada de la Grieta dimensional trae un tema y termina con un mantenimiento.','Desde el 8 de septiembre hay 3 entradas semanales gratis; se rellenan al empezar temporada nueva.'],
 historia:['Episodio 1: «The Dreamer Boy\'s Adventure» (capítulo I).','Episodio 7: abre con la versión 1.4 en el Archipiélago de Gaba.','Episodios 2 a 6: pasos pendientes, se completarán con tus partidas.','Con el Archivo (v1.4) puedes rejugar historias principales, de eventos y minijuegos.'],
 codice:['Los 196 Monsterlings están en la pestaña Monstruitos; las habilidades y fusiones faltan por cargar.']
};
let chars=null;
async function loadChars(){if(!chars){try{chars=(await (await fetch('data/characters.json')).json()).personajes.map(p=>[p.nombre,p.elemento,p])}catch{chars=[]}}return chars}

function inicio(){
  const p=store.get('player',{nombre:'',uid:'',nivel:'',episodio:'1'});
  view.innerHTML=`<h1>${p.nombre?'Hola, '+esc(p.nombre):'Bienvenido a Belana Assistant'}</h1>
  <p class="sub">Tus datos se guardan solo en este dispositivo.</p>
  <form class="panel form" id="pf">
   <label>Nombre de jugador<input name="nombre" value="${esc(p.nombre)}" autocomplete="off"></label>
   <label>UID<input name="uid" value="${esc(p.uid)}" autocomplete="off"></label>
   <label>Nivel de aventurero<input name="nivel" type="number" min="1" value="${esc(p.nivel)}"></label>
   <label>Episodio actual<select name="episodio">${[1,2,3,4,5,6,7].map(n=>`<option value="${n}"${String(n)===String(p.episodio)?' selected':''}>Episodio ${n}</option>`).join('')}</select></label>
  </form>
  <div id="nv"></div><h2>Tu progreso</h2>
  <p class="panel">Personajes marcados como obtenidos: <b>${store.get('own',[]).length}</b>. Entra en Personajes para marcarlos y armar equipos.</p>`;
  novedades();
  $('#pf').addEventListener('input',e=>{const f=Object.fromEntries(new FormData($('#pf')));store.set('player',f);});
}

async function novedades(){
  let n;try{n=await (await fetch('data/news.json')).json()}catch{return}
  const box=$('#nv');if(!box)return;
  box.innerHTML=`<h2>Novedades: ${esc(n.version)}</h2><div class="panel"><ul>${n.novedades.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <h2>Conquista legendaria esta temporada</h2><div class="panel"><ul>${n.legendaria.map(l=>`<li>${esc(l[0])}: <b>${esc(l[1])}</b></li>`).join('')}</ul></div>
  <h2>Antes de la 1.4</h2><div class="panel"><ul>${n.anteriores.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <p class="sub">Actualizado el ${esc(n.actualizado)}. ${esc(n.fuente)}.</p>`;
}

async function personajes(){
  const list=await loadChars(); let own=store.get('own',[]), team=store.get('team',[null,null,null,null]), filt='Todos', only=false, pick=null;
  const draw=()=>{
    const shown=list.filter(([n,e])=>(filt==='Todos'||e===filt)&&(!only||own.includes(n)));
    view.innerHTML=`<h1>Personajes</h1><p class="sub">${list.length} personajes. Toca una tarjeta para marcar si la tienes. Tier según Kaiden.gg (octubre 2026), por nivel de ascensión (A).</p>
    <h2>Equipo</h2><div class="team">${team.map((n,i)=>`<button class="slot" data-s="${i}" aria-label="Hueco ${i+1}">${n?esc(n):'Hueco '+(i+1)+'<br><small>vacío</small>'}</button>`).join('')}</div>
    <p class="sub">${pick!==null?'Elige un personaje de la lista para el hueco '+(pick+1)+'.':'Toca un hueco y luego un personaje. Toca un hueco lleno para vaciarlo.'}</p>
    <div class="bar">${['Todos',...Object.keys(COL)].map(f=>`<button class="chip" data-f="${f}" aria-pressed="${f===filt}">${f}</button>`).join('')}<button class="chip" id="only" aria-pressed="${only}">Solo los que tengo</button></div>
    <div class="grid">${shown.map(([n,e,p])=>`<button class="card${own.includes(n)?' own':''}" data-n="${esc(n)}"><div class="pic" style="background-image:url(img/personajes/${p.id}.webp)">${esc(n[0])}</div><b>${esc(n)}</b>${el(e,(p.sin_confirmar||[]).includes('elemento'))}<span class="el">${[p.rareza?p.rareza+'★':'',p.clase||''].filter(Boolean).join(' · ')||'Clase sin cargar'}</span><span class="el">${p.tiers.length?p.tiers.map(t=>t[0]+(t[1]?' ('+t[1]+')':'')).join(', '):'Sin tier'}</span><span class="el">${own.includes(n)?'✔ La tengo':'No la tengo'}</span></button>`).join('')||'<div class="empty">Ningún personaje con ese filtro.</div>'}</div>`;
    view.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{filt=b.dataset.f;draw()});
    $('#only').onclick=()=>{only=!only;draw()};
    view.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const i=+b.dataset.s;if(team[i]){team[i]=null;store.set('team',team)}else pick=i;draw()});
    view.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{const n=b.dataset.n;
      if(pick!==null){team=team.map(t=>t===n?null:t);team[pick]=n;pick=null;store.set('team',team)}
      else{own=own.includes(n)?own.filter(x=>x!==n):[...own,n];store.set('own',own)}draw()});
  };draw();
}

async function lista(titulo,sub,file,key,dir,vacio){
  let d={};try{d=await (await fetch('data/'+file)).json()}catch{}
  const L=d[key]||[]; let q='';
  const draw=()=>{const sh=L.filter(x=>x.nombre.toLowerCase().includes(q.toLowerCase()));
    view.innerHTML=`<h1>${titulo}</h1><p class="sub">${sub} ${L.length} en total.</p><div class="bar"><label>Buscar<input id="q" value="${esc(q)}" autocomplete="off"></label></div>`+(L.length?`<div class="grid">${sh.map(x=>`<div class="card"><div class="pic" style="background-image:url(img/${dir}/${x.id}.webp)">${esc(x.nombre[0])}</div><b>${esc(x.nombre)}</b>${x.nota?`<span class="el">${esc(x.nota)}</span>`:''}</div>`).join('')||'<div class="empty">Sin resultados.</div>'}</div>`:`<div class="empty">${vacio}</div>`);
    const i=$('#q');if(i){i.oninput=e=>{q=e.target.value;const p=e.target.selectionStart;draw();const n=$('#q');n.focus();n.setSelectionRange(p,p)}}};
  draw();
}
const artefactos=()=>lista('Artefactos','Efectos, clase y rareza pendientes de cargar.','artifacts.json','artefactos','artefactos','Sin datos.');
const monstruitos=()=>lista('Monstruitos','Habilidades y fusiones pendientes de cargar.','monsterlings.json','monsterlings','monsterlings','Sin datos.');

const R={inicio,personajes,artefactos,equipamientos:()=>view.innerHTML=SOON('Equipamientos'),monstruitos,mapa:()=>view.innerHTML=SOON('Mapa interactivo')};
function route(){
  const h=location.hash.replace(/^#\//,'')||'inicio', [a,b]=h.split('/');
  if(a==='guia'&&GUIAS[b]){view.innerHTML=GD[b]?`<h1>${GUIAS[b]}</h1><div class="panel"><ul>${GD[b].map(x=>`<li>${x}</li>`).join('')}</ul></div><p class="sub">Resumen parcial. Faltan datos propios.</p>`:SOON(GUIAS[b]);$('#guias').open=true}else(R[a]||inicio)();
  document.querySelectorAll('#nav a[href^="#/"]').forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#/'+h||(h==='inicio'&&l.getAttribute('href')==='#/inicio')));
  setMenu(false);view.focus({preventScroll:true});scrollTo(0,0);
}
function setMenu(o){document.body.classList.toggle('open',o);$('#scrim').hidden=!o;$('#menuBtn').setAttribute('aria-expanded',o)}
$('#menuBtn').onclick=()=>setMenu(!document.body.classList.contains('open'));
$('#scrim').onclick=()=>setMenu(false);
addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
addEventListener('hashchange',route);route();
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
