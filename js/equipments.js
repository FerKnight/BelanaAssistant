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
              <option value="set2">Conjunto de 2 piezas</option>
              <option value="set4">Conjunto de 4 piezas</option>
            </select>
          </div>
        </div>

        <!-- FILTROS COMBINABLES POR ELEMENTO -->
        <div class="pt-2 border-t border-brand-border/50">
          <label class="block text-[11px] font-semibold text-slate-400 mb-1.5">Filtrar por Elemento (Combinables):</label>
          <div class="flex flex-wrap gap-1.5 items-center" id="filter-eq-elements-container">
            ${['Fuego', 'Hielo', 'Rayo', 'Viento', 'Tierra'].map(elem => `
              <label class="cursor-pointer bg-slate-900 border border-brand-border px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-300 flex items-center space-x-1.5 hover:border-cyan-500/50 transition">
                <input type="checkbox" value="${elem.toLowerCase()}" onchange="filterEquipments()" class="filter-eq-elem-cb rounded bg-slate-800 border-slate-700 text-cyan-500 w-3.5 h-3.5 focus:ring-0 focus:ring-offset-0">
                <span>${elem}</span>
              </label>
            `).join('')}
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
    const hasSet4 = e.pieces === 4;
    const piecesList = hasSet4 ? ['casco', 'pechera', 'guantes', 'calzado'] : (e.slotParts || ['casco', 'pechera']);

    return `
      <div class="bg-brand-card border border-brand-border p-3.5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-cyan-500/50 transition">
        <div class="flex items-center justify-between border-b border-brand-border/60 pb-2.5">
          <div>
            <h3 class="font-bold text-sm text-white">${e.name}</h3>
            <span class="text-[10px] text-cyan-400 font-mono">Set de ${e.pieces} piezas</span>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-lg ${hasSet4 ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'}">
            ${hasSet4 ? '4 Piezas' : '2 Piezas'}
          </span>
        </div>

        <!-- VISTA PREVIA DE LAS PIEZAS Y SUS ICONOS -->
        <div class="grid grid-cols-${piecesList.length} gap-2 py-1">
          ${piecesList.map(piece => {
            const iconPath = getEquipmentIconPath(e.slug, piece);
            return `
              <div class="flex flex-col items-center bg-slate-900/90 border border-brand-border p-2 rounded-xl group hover:border-cyan-400 transition">
                <img src="${iconPath}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-10 h-10 object-cover rounded-lg bg-slate-950 p-0.5 border border-slate-800 group-hover:scale-105 transition mb-1">
                <span class="text-[9px] text-slate-300 font-semibold capitalize truncate w-full text-center">${piece}</span>
              </div>`;
          }).join('')}
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
          ` : ''}
        </div>
      </div>`;
  }).join('');
}

function filterEquipments() {
  const nameInput = document.getElementById('filter-eq-name');
  const typeInput = document.getElementById('filter-eq-type');

  const nameQuery = nameInput ? nameInput.value.toLowerCase().trim() : '';
  const typeQuery = typeInput ? typeInput.value : '';

  const selectedElements = Array.from(document.querySelectorAll('.filter-eq-elem-cb:checked')).map(cb => cb.value);

  const list = (typeof DB !== 'undefined' && DB.equipments) ? DB.equipments : [];

  const filtered = list.filter(e => {
    const matchesName = e.name.toLowerCase().includes(nameQuery);
    let matchesType = true;

    if (typeQuery === 'set2') {
      matchesType = e.pieces === 2;
    } else if (typeQuery === 'set4') {
      matchesType = e.pieces === 4;
    }

    // Comprobar elementos (busca coincidencia en el nombre o descripción de los sets)
    const combinedText = `${e.name} ${e.set2} ${e.set4}`.toLowerCase();
    const matchesElement = selectedElements.length === 0 || selectedElements.some(elem => combinedText.includes(elem));

    return matchesName && matchesType && matchesElement;
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
