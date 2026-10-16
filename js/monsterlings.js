const MonsterlingsSection = {
  render: () => {
    const list = (typeof DB !== 'undefined' && DB.monsterlings) ? DB.monsterlings : [];
    const regions = Array.from(new Set(list.map(m => m.region))).sort();

    return `
    <div class="space-y-4">
      <div class="flex items-center justify-between bg-brand-card border border-brand-border px-4 py-3 rounded-2xl">
        <div class="flex items-center space-x-3">
          <i data-lucide="bug" class="text-purple-400 w-5 h-5"></i>
          <h2 class="text-xl font-bold text-white">Monsterlings</h2>
          <span id="monsterlings-counter" class="text-xs font-bold text-purple-400 bg-slate-900 border border-brand-border px-2.5 py-0.5 rounded-lg font-mono">
            ${list.length}
          </span>
        </div>
      </div>

      <div class="bg-brand-card border border-brand-border p-3.5 rounded-2xl space-y-3 shadow-lg">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- BUSCADOR POR NOMBRE -->
          <div>
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">Buscar Monsterling:</label>
            <div class="relative">
              <i data-lucide="search" class="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500"></i>
              <input type="text" id="filter-mon-name" placeholder="Ej. Champi, Babosín..." oninput="filterMonsterlings()" class="w-full bg-slate-900 border border-brand-border rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400">
            </div>
          </div>

          <!-- FILTRO CON / SIN CADENA -->
          <div>
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">Estado de Cadena de Enlace:</label>
            <select id="filter-mon-chain" onchange="filterMonsterlings()" class="w-full bg-slate-900 border border-brand-border rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400">
              <option value="">Todos los monsterlings</option>
              <option value="with">Con Cadena de Enlace</option>
              <option value="without">Sin Cadena de Enlace</option>
            </select>
          </div>
        </div>

        <!-- FILTROS POR REGIÓN (MULTIPLE SELECCIÓN) -->
        <div class="pt-2 border-t border-brand-border/50">
          <label class="block text-[11px] font-semibold text-slate-400 mb-1.5">Filtrar por Región (Múltiples):</label>
          <div class="flex flex-wrap gap-1.5 items-center" id="filter-mon-regions-container">
            ${regions.map(reg => `
              <label class="cursor-pointer bg-slate-900 border border-brand-border px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-300 flex items-center space-x-1.5 hover:border-purple-500/50 transition">
                <input type="checkbox" value="${reg}" onchange="filterMonsterlings()" class="filter-mon-reg-cb rounded bg-slate-800 border-slate-700 text-purple-500 w-3.5 h-3.5 focus:ring-0 focus:ring-offset-0">
                <span>${reg}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </div>

      <div id="monsterlings-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        ${renderMonsterlingCards(list)}
      </div>
    </div>`;
  }
};

function renderMonsterlingCards(monsterlingsList) {
  if (!monsterlingsList || monsterlingsList.length === 0) {
    return `<div class="col-span-full py-10 text-center text-slate-500 text-xs">No se encontraron monsterlings con los filtros seleccionados.</div>`;
  }

  return monsterlingsList.map(m => {
    const iconPath = typeof getMonsterlingIconPath === 'function' ? getMonsterlingIconPath(m.slug) : DEFAULT_AVATAR;

    return `
      <div class="bg-brand-card border ${m.hasChain ? 'border-purple-500/50 bg-slate-900/90' : 'border-brand-border'} p-3 rounded-2xl flex flex-col justify-between space-y-2 hover:border-purple-400 transition">
        <div class="flex items-center space-x-3">
          <img src="${iconPath}" onerror="this.src='${DEFAULT_AVATAR}'" 
               class="w-12 h-12 object-cover rounded-xl border border-slate-800 bg-slate-950 p-0.5 flex-shrink-0">
          <div class="min-w-0 flex-1">
            <div class="flex items-center space-x-2 mb-0.5">
              <span class="text-[9px] font-mono font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/30">${m.region}</span>
              <span class="text-[9px] text-slate-500 font-mono">#${m.nro}</span>
            </div>
            <h3 class="font-bold text-xs text-white truncate">${m.name}</h3>
          </div>
        </div>

        <div class="space-y-1.5 text-[11px] pt-1 border-t border-brand-border/60">
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Cadena de enlace:</span>
            <span class="font-bold ${m.hasChain ? 'text-purple-400' : 'text-slate-500'}">${m.hasChain ? 'Sí' : 'No'}</span>
          </div>
          ${m.hasChain ? `
            <div class="bg-slate-900/80 p-2 rounded-xl border border-brand-border text-[10px] text-slate-300 max-h-20 overflow-y-auto">
              <strong class="text-purple-300 block mb-0.5">Efecto / Requisito:</strong>
              <p class="whitespace-pre-line leading-relaxed">${m.chainText}</p>
            </div>
          ` : ''}
        </div>
      </div>`;
  }).join('');
}

function filterMonsterlings() {
  const nameInput = document.getElementById('filter-mon-name');
  const chainSelect = document.getElementById('filter-mon-chain');

  const nameQuery = nameInput ? nameInput.value.toLowerCase().trim() : '';
  const chainQuery = chainSelect ? chainSelect.value : '';

  const selectedRegions = Array.from(document.querySelectorAll('.filter-mon-reg-cb:checked')).map(cb => cb.value);

  const list = (typeof DB !== 'undefined' && DB.monsterlings) ? DB.monsterlings : [];

  const filtered = list.filter(m => {
    const matchesName = m.name.toLowerCase().includes(nameQuery);
    
    let matchesChain = true;
    if (chainQuery === 'with') matchesChain = m.hasChain;
    if (chainQuery === 'without') matchesChain = !m.hasChain;

    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(m.region);

    return matchesName && matchesChain && matchesRegion;
  });

  const gridEl = document.getElementById('monsterlings-grid');
  if (gridEl) {
    gridEl.innerHTML = renderMonsterlingCards(filtered);
  }

  const counterEl = document.getElementById('monsterlings-counter');
  if (counterEl) {
    counterEl.textContent = filtered.length;
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}
