const EquipmentsSection = {
  render: () => {
    const list = (typeof DB !== 'undefined' && DB.equipments) ? DB.equipments : [];

    return `
    <div class="space-y-4">
      <div class="flex items-center justify-between bg-brand-card border border-brand-border px-4 py-3 rounded-2xl">
        <div class="flex items-center space-x-3">
          <i data-lucide="shield" class="text-cyan-400 w-5 h-5"></i>
          <h2 class="text-xl font-bold text-white">Equipamientos (Sets)</h2>
          <span id="equipments-counter" class="text-xs font-bold text-cyan-400 bg-slate-900 border border-brand-border px-2.5 py-0.5 rounded-lg font-mono">
            ${list.length}
          </span>
        </div>
      </div>

      <div class="bg-brand-card border border-brand-border p-3.5 rounded-2xl space-y-3 shadow-lg">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">Buscar Set de Equipamiento:</label>
            <div class="relative">
              <i data-lucide="search" class="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500"></i>
              <input type="text" id="filter-eq-name" placeholder="Ej. Abismo, Juez..." oninput="filterEquipments()" class="w-full bg-slate-900 border border-brand-border rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400">
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">Filtrar por Tipo de Conjunto:</label>
            <select id="filter-eq-type" onchange="filterEquipments()" class="w-full bg-slate-900 border border-brand-border rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400">
              <option value="">Todos los equipamientos</option>
              <option value="set2">Con Conjunto de 2</option>
              <option value="set4">Con Conjunto de 4</option>
            </select>
          </div>
        </div>
      </div>

      <div id="equipments-grid" class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${renderEquipmentCards(list)}
      </div>
    </div>`;
  }
};

function renderEquipmentCards(equipmentsList) {
  if (!equipmentsList || equipmentsList.length === 0) {
    return `<div class="col-span-full py-10 text-center text-slate-500 text-xs">No se encontraron equipamientos con los filtros seleccionados.</div>`;
  }

  return equipmentsList.map(e => {
    const iconPath = typeof getEquipmentIconPath === 'function' ? getEquipmentIconPath(e.name) : DEFAULT_AVATAR;
    const hasSet4 = e.set4 && e.set4.trim() !== '';

    return `
      <div class="bg-brand-card border border-brand-border p-3 rounded-2xl flex flex-col justify-between space-y-3 hover:border-cyan-500/50 transition">
        <div class="flex items-center space-x-3 border-b border-brand-border/60 pb-2.5">
          <img src="${iconPath}" onerror="this.src='${DEFAULT_AVATAR}'" 
               class="w-12 h-12 object-cover rounded-xl border border-slate-800 bg-slate-950 p-0.5 flex-shrink-0">
          <div class="min-w-0 flex-1">
            <h3 class="font-bold text-sm text-white truncate">${e.name}</h3>
            <span class="text-[10px] text-cyan-400 font-mono">Set de Equipamiento</span>
          </div>
        </div>

        <div class="space-y-2 text-xs">
          <div class="bg-slate-900/80 p-2.5 rounded-xl border border-brand-border">
            <strong class="text-amber-400 block text-[10px] uppercase font-mono tracking-wider mb-0.5">Conjunto de 2 piezas:</strong>
            <p class="text-slate-300 leading-relaxed">${e.set2}</p>
          </div>

          ${hasSet4 ? `
            <div class="bg-slate-900/80 p-2.5 rounded-xl border border-brand-border">
              <strong class="text-purple-400 block text-[10px] uppercase font-mono tracking-wider mb-0.5">Conjunto de 4 piezas:</strong>
              <p class="text-slate-300 leading-relaxed">${e.set4}</p>
            </div>
          ` : `
            <div class="bg-slate-950/40 p-2 rounded-xl border border-slate-900 text-center">
              <span class="text-[10px] text-slate-600 italic">No disponible para Conjunto de 4 piezas</span>
            </div>
          `}
        </div>
      </div>`;
  }).join('');
}

function filterEquipments() {
  const nameInput = document.getElementById('filter-eq-name');
  const typeInput = document.getElementById('filter-eq-type');

  const nameQuery = nameInput ? nameInput.value.toLowerCase().trim() : '';
  const typeQuery = typeInput ? typeInput.value : '';

  const list = (typeof DB !== 'undefined' && DB.equipments) ? DB.equipments : [];

  const filtered = list.filter(e => {
    const matchesName = e.name.toLowerCase().includes(nameQuery);
    let matchesType = true;

    if (typeQuery === 'set2') {
      matchesType = e.set2 && e.set2.trim() !== '';
    } else if (typeQuery === 'set4') {
      matchesType = e.set4 && e.set4.trim() !== '';
    }

    return matchesName && matchesType;
  });

  const gridEl = document.getElementById('equipments-grid');
  if (gridEl) {
    gridEl.innerHTML = renderEquipmentCards(filtered);
  }

  const counterEl = document.getElementById('equipments-counter');
  if (counterEl) {
    counterEl.textContent = filtered.length;
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}
