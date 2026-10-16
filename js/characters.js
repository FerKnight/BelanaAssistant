function getObtainedCharacters() {
  return JSON.parse(localStorage.getItem('belana_obtained_characters')) || [];
}

function toggleCharacterObtained(id, event) {
  event.stopPropagation();
  let obtained = getObtainedCharacters();
  if (obtained.includes(id)) {
    obtained = obtained.filter(charId => charId !== id);
  } else {
    obtained.push(id);
  }
  localStorage.setItem('belana_obtained_characters', JSON.stringify(obtained));
  filterCharacters();
}

// Configuración de builds/slots asignados por personaje
function getCharacterBuildData(charId) {
  const builds = JSON.parse(localStorage.getItem('belana_char_builds')) || {};
  if (!builds[charId]) {
    builds[charId] = {
      equipmentsRows: 1,
      monsterlingsRows: 1,
      teamsRows: 1,
      selectedEquipments: {},
      selectedMonsterlings: {},
      selectedTeams: {}
    };
  }
  return builds[charId];
}

function saveCharacterBuildData(charId, buildData) {
  const builds = JSON.parse(localStorage.getItem('belana_char_builds')) || {};
  builds[charId] = buildData;
  localStorage.setItem('belana_char_builds', JSON.stringify(builds));
}

function updateCharacterRows(charId, key, delta) {
  const buildData = getCharacterBuildData(charId);
  const current = buildData[key] || 1;
  if (current + delta >= 1 && current + delta <= 5) {
    buildData[key] = current + delta;
    saveCharacterBuildData(charId, buildData);
    openCharacterDetailModal(charId);
  }
}

// Asignar objeto a slot
function selectSlotItem(charId, slotKey, itemData) {
  const buildData = getCharacterBuildData(charId);
  buildData[slotKey] = itemData;
  saveCharacterBuildData(charId, buildData);
  openCharacterDetailModal(charId);
}

// Quitar objeto de slot
function clearSlotItem(charId, slotKey, event) {
  event.stopPropagation();
  const buildData = getCharacterBuildData(charId);
  delete buildData[slotKey];
  saveCharacterBuildData(charId, buildData);
  openCharacterDetailModal(charId);
}

// Abrir Selector Flotante de Selección para Equipamientos / Monsterlings / Personajes
function openSlotSelectorModal(charId, slotKey, slotType, slotCategory) {
  const modal = document.createElement('div');
  modal.id = 'selector-overlay';
  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';

  let itemsHtml = '';

  if (slotType === 'equipment') {
    // Lista filtrada por categoría
    const equipItems = DB.equipments.filter(e => !slotCategory || e.slot === slotCategory);
    if (equipItems.length === 0) {
      itemsHtml = `<p class="col-span-full text-center text-slate-500 text-xs py-6">No hay ítems registrados para: ${slotCategory}</p>`;
    } else {
      itemsHtml = equipItems.map(e => `
        <div onclick="selectSlotItem('${charId}', '${slotKey}', {name:'${e.name}', rarity:'${e.rarity}'}); document.getElementById('selector-overlay').remove();"
             class="p-2.5 bg-slate-900 border border-brand-border rounded-xl hover:border-cyan-400 cursor-pointer transition flex items-center justify-between">
          <div>
            <h4 class="text-xs font-bold text-white">${e.name}</h4>
            <span class="text-[10px] text-slate-400">${e.stat}</span>
          </div>
          <span class="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">${e.rarity}</span>
        </div>
      `).join('');
    }
  } else if (slotType === 'monsterling') {
    const isLegendary = slotCategory === 'Legendario';
    const monsterItems = DB.monsterlings.filter(m => !isLegendary || m.rarity === 'Legendario');
    if (monsterItems.length === 0) {
      itemsHtml = `<p class="col-span-full text-center text-slate-500 text-xs py-6">No hay Monsterlings ${isLegendary ? 'Legendarios' : ''} disponibles.</p>`;
    } else {
      itemsHtml = monsterItems.map(m => `
        <div onclick="selectSlotItem('${charId}', '${slotKey}', {name:'${m.name}', type:'${m.type}'}); document.getElementById('selector-overlay').remove();"
             class="p-2.5 bg-slate-900 border border-brand-border rounded-xl hover:border-purple-400 cursor-pointer transition flex items-center justify-between">
          <div>
            <h4 class="text-xs font-bold text-white">${m.name}</h4>
            <span class="text-[10px] text-purple-400">${m.type}</span>
          </div>
        </div>
      `).join('');
    }
  } else if (slotType === 'character') {
    itemsHtml = DB.characters.map(c => {
      const portrait = getPortraitPath(c.slug);
      return `
        <div onclick="selectSlotItem('${charId}', '${slotKey}', {name:'${c.name}', slug:'${c.slug}', element:'${c.element}'}); document.getElementById('selector-overlay').remove();"
             class="p-2 bg-slate-900 border border-brand-border rounded-xl hover:border-amber-400 cursor-pointer transition flex items-center space-x-2">
          <img src="${portrait}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-8 h-8 rounded-lg object-cover bg-slate-950">
          <div class="min-w-0 flex-1">
            <h4 class="text-xs font-bold text-white truncate">${c.name}</h4>
            <span class="text-[9px] text-cyan-400">${c.element}</span>
          </div>
        </div>`;
    }).join('');
  }

  modal.innerHTML = `
    <div class="bg-brand-card border border-brand-border rounded-2xl max-w-sm w-full p-4 space-y-3 relative shadow-2xl">
      <div class="flex items-center justify-between border-b border-brand-border pb-2">
        <h3 class="text-sm font-bold text-white">Seleccionar ${slotCategory || slotType}</h3>
        <button onclick="document.getElementById('selector-overlay').remove()" class="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <div class="grid ${slotType === 'character' ? 'grid-cols-2' : 'grid-cols-1'} gap-2 max-h-60 overflow-y-auto pr-1">
        ${itemsHtml}
      </div>
    </div>`;

  document.body.appendChild(modal);
  lucide.createIcons();
}

// Modal de detalles con slots ajustados y compactos
function openCharacterDetailModal(charId) {
  const character = DB.characters.find(c => c.id === charId);
  if (!character) return;

  const portrait = getPortraitPath(character.slug);
  const buildData = getCharacterBuildData(charId);

  // Categorías exclusivas por casilla de Equipamiento
  const equipCategories = ['Casco', 'Pechera', 'Guantes', 'Calzado', 'Artefacto'];

  // 1. EQUIPAMIENTO RECOMENDADO
  let equipmentsHtml = '';
  for (let r = 0; r < buildData.equipmentsRows; r++) {
    equipmentsHtml += `<div class="grid grid-cols-5 gap-2">`;
    for (let c = 0; c < 5; c++) {
      const slotKey = `eq_${r}_${c}`;
      const category = equipCategories[c];
      const isGold = c === 4; // 5to recuadro exclusivo Artefacto con borde dorado
      const selected = buildData[slotKey];

      equipmentsHtml += `
        <div onclick="openSlotSelectorModal('${charId}', '${slotKey}', 'equipment', '${category}')"
             class="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900/90 rounded-xl border ${isGold ? 'border-amber-400/90 shadow-md shadow-amber-500/10' : 'border-brand-border'} flex flex-col items-center justify-center p-1 cursor-pointer hover:border-cyan-400 transition group relative mx-auto">
          ${selected ? `
            <span class="text-[9px] font-bold text-cyan-300 truncate w-full text-center px-0.5 leading-tight">${selected.name}</span>
            <button onclick="clearSlotItem('${charId}', '${slotKey}', event)" class="absolute -top-1 -right-1 bg-red-500/90 text-white rounded-full p-0.5 hover:bg-red-600 transition">
              <i data-lucide="x" class="w-2.5 h-2.5"></i>
            </button>
          ` : `
            <i data-lucide="plus" class="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition"></i>
            <span class="text-[8px] ${isGold ? 'text-amber-400 font-bold' : 'text-slate-500'} font-mono leading-none mt-0.5">${category}</span>
          `}
        </div>`;
    }
    equipmentsHtml += `</div>`;
  }

  // 2. MONSTERLINGS RECOMENDADOS
  let monsterlingsHtml = '';
  for (let r = 0; r < buildData.monsterlingsRows; r++) {
    monsterlingsHtml += `<div class="grid grid-cols-4 gap-2">`;
    for (let c = 0; c < 4; c++) {
      const slotKey = `mon_${r}_${c}`;
      const isBlue = c === 3; // 4to recuadro exclusivo Monsterling Legendario (Borde Azul)
      const selected = buildData[slotKey];

      monsterlingsHtml += `
        <div onclick="openSlotSelectorModal('${charId}', '${slotKey}', 'monsterling', '${isBlue ? 'Legendario' : 'Normal'}')"
             class="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900/90 rounded-xl border ${isBlue ? 'border-blue-500/90 shadow-md shadow-blue-500/10' : 'border-brand-border'} flex flex-col items-center justify-center p-1 cursor-pointer hover:border-purple-400 transition group relative mx-auto">
          ${selected ? `
            <span class="text-[9px] font-bold text-purple-300 truncate w-full text-center px-0.5 leading-tight">${selected.name}</span>
            <button onclick="clearSlotItem('${charId}', '${slotKey}', event)" class="absolute -top-1 -right-1 bg-red-500/90 text-white rounded-full p-0.5 hover:bg-red-600 transition">
              <i data-lucide="x" class="w-2.5 h-2.5"></i>
            </button>
          ` : `
            <i data-lucide="plus" class="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition"></i>
            <span class="text-[8px] ${isBlue ? 'text-blue-400 font-bold' : 'text-slate-500'} font-mono leading-none mt-0.5">${isBlue ? 'Legendario' : '#' + (c + 1)}</span>
          `}
        </div>`;
    }
    monsterlingsHtml += `</div>`;
  }

  // 3. EQUIPOS RECOMENDADOS
  let teamsHtml = '';
  for (let r = 0; r < buildData.teamsRows; r++) {
    teamsHtml += `<div class="grid grid-cols-3 gap-2">`;
    for (let c = 0; c < 3; c++) {
      const slotKey = `tm_${r}_${c}`;
      const selected = buildData[slotKey];

      teamsHtml += `
        <div onclick="openSlotSelectorModal('${charId}', '${slotKey}', 'character', 'Personaje')"
             class="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900/90 rounded-xl border border-brand-border flex flex-col items-center justify-center p-1 cursor-pointer hover:border-amber-400 transition group relative mx-auto overflow-hidden">
          ${selected ? `
            <img src="${getPortraitPath(selected.slug)}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-full h-full object-cover rounded-lg">
            <button onclick="clearSlotItem('${charId}', '${slotKey}', event)" class="absolute top-0.5 right-0.5 bg-red-500/90 text-white rounded-full p-0.5 hover:bg-red-600 transition">
              <i data-lucide="x" class="w-2.5 h-2.5"></i>
            </button>
          ` : `
            <i data-lucide="user-plus" class="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition"></i>
            <span class="text-[8px] text-slate-500 font-mono leading-none mt-0.5">Slot ${c + 1}</span>
          `}
        </div>`;
    }
    teamsHtml += `</div>`;
  }

  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <!-- CABECERA DEL PERSONAJE -->
    <div class="flex items-center space-x-3 pb-3 border-b border-brand-border">
      <div class="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
        <img src="${portrait}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-full h-full rounded-xl object-cover border border-cyan-400 bg-slate-950">
        <span class="absolute top-0.5 left-0.5 bg-black/85 text-amber-300 text-[8px] font-bold px-1 py-0.2 rounded border border-amber-500/30 leading-none">
          ${character.tier}
        </span>
      </div>
      <div>
        <h3 class="text-lg font-extrabold text-white leading-tight">${character.name}</h3>
        <p class="text-xs text-cyan-400 font-medium mt-0.5">${character.element} • ${character.role}</p>
      </div>
    </div>

    <div class="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
      <!-- EQUIPAMIENTO RECOMENDADO -->
      <div class="space-y-2">
        <div class="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-xl border border-brand-border">
          <span class="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
            <i data-lucide="shield" class="w-4 h-4 text-cyan-400"></i>
            <span>Equipamiento recomendado</span>
          </span>
          <div class="flex items-center space-x-1">
            <button onclick="updateCharacterRows('${charId}', 'equipmentsRows', -1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              <i data-lucide="minus" class="w-3.5 h-3.5"></i>
            </button>
            <span class="text-xs font-mono font-bold text-cyan-400 px-1.5">${buildData.equipmentsRows}</span>
            <button onclick="updateCharacterRows('${charId}', 'equipmentsRows', 1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
        <div class="space-y-2">
          ${equipmentsHtml}
        </div>
      </div>

      <!-- MONSTERLINGS RECOMENDADOS -->
      <div class="space-y-2">
        <div class="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-xl border border-brand-border">
          <span class="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
            <i data-lucide="bug" class="w-4 h-4 text-purple-400"></i>
            <span>Monsterlings recomendados</span>
          </span>
          <div class="flex items-center space-x-1">
            <button onclick="updateCharacterRows('${charId}', 'monsterlingsRows', -1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              <i data-lucide="minus" class="w-3.5 h-3.5"></i>
            </button>
            <span class="text-xs font-mono font-bold text-purple-400 px-1.5">${buildData.monsterlingsRows}</span>
            <button onclick="updateCharacterRows('${charId}', 'monsterlingsRows', 1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
        <div class="space-y-2">
          ${monsterlingsHtml}
        </div>
      </div>

      <!-- EQUIPOS RECOMENDADOS -->
      <div class="space-y-2">
        <div class="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-xl border border-brand-border">
          <span class="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
            <i data-lucide="users" class="w-4 h-4 text-amber-400"></i>
            <span>Equipo recomendado</span>
          </span>
          <div class="flex items-center space-x-1">
            <button onclick="updateCharacterRows('${charId}', 'teamsRows', -1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              <i data-lucide="minus" class="w-3.5 h-3.5"></i>
            </button>
            <span class="text-xs font-mono font-bold text-amber-400 px-1.5">${buildData.teamsRows}</span>
            <button onclick="updateCharacterRows('${charId}', 'teamsRows', 1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
        <div class="space-y-2">
          ${teamsHtml}
        </div>
      </div>
    </div>`;

  modal.classList.remove('hidden');
  lucide.createIcons();
}

const CharactersSection = {
  render: () => {
    const obtained = getObtainedCharacters();
    const total = DB.characters.length;
    const count = obtained.length;

    return `
    <div class="space-y-4">
      <!-- ENCABEZADO CON TÍTULO Y CONTADOR -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-brand-card border border-brand-border px-4 py-3 rounded-2xl">
        <div class="flex items-center space-x-3">
          <i data-lucide="users" class="text-cyan-400 w-5 h-5"></i>
          <h2 class="text-xl font-bold text-white">Personajes</h2>
          <span id="collection-counter" class="text-xs font-bold text-cyan-400 bg-slate-900 border border-brand-border px-2.5 py-0.5 rounded-lg font-mono">
            ${count}/${total}
          </span>
        </div>
      </div>

      <!-- PANEL DE FILTROS -->
      <div class="bg-brand-card border border-brand-border p-3.5 rounded-2xl space-y-3 shadow-lg">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">Buscar por Nombre:</label>
            <div class="relative">
              <i data-lucide="search" class="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500"></i>
              <input type="text" id="filter-name" placeholder="Ej. Angel, Verna..." oninput="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400">
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">Grado:</label>
            <select id="filter-tier" onchange="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400">
              <option value="">Todos</option>
              <option value="4★">4★</option>
              <option value="5★">5★</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">Estado:</label>
            <select id="filter-obtained" onchange="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400">
              <option value="">Todos</option>
              <option value="obtained">Obtenidos</option>
              <option value="missing">No Obtenidos</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-brand-border/50">
          <div class="flex flex-wrap gap-1.5 items-center" id="filter-roles-container">
            ${['Asesino', 'Apoyo', 'Destructor', 'Luchador'].map(role => `
              <label class="cursor-pointer bg-slate-900 border border-brand-border px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-300 flex items-center space-x-1.5 hover:border-cyan-500/50 transition">
                <input type="checkbox" value="${role}" onchange="filterCharacters()" class="filter-role-cb rounded bg-slate-800 border-slate-700 text-cyan-500 w-3.5 h-3.5 focus:ring-0 focus:ring-offset-0">
                <span>${role}</span>
              </label>
            `).join('')}
          </div>

          <div class="flex flex-wrap gap-1.5 items-center" id="filter-elements-container">
            ${['Fuego', 'Rayo', 'Viento', 'Tierra', 'Hielo'].map(elem => `
              <label class="cursor-pointer bg-slate-900 border border-brand-border px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-300 flex items-center space-x-1.5 hover:border-cyan-500/50 transition">
                <input type="checkbox" value="${elem}" onchange="filterCharacters()" class="filter-elem-cb rounded bg-slate-800 border-slate-700 text-cyan-500 w-3.5 h-3.5 focus:ring-0 focus:ring-offset-0">
                <span>${elem}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- GRILLA DE TARJETAS DE PERSONAJES -->
      <div id="characters-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        ${renderCharacterCards(DB.characters)}
      </div>
    </div>`;
  }
};

function renderCharacterCards(charactersList) {
  if (charactersList.length === 0) {
    return `<div class="col-span-full py-10 text-center text-slate-500 text-xs">No se encontraron personajes con los filtros seleccionados.</div>`;
  }

  const obtainedList = getObtainedCharacters();

  return charactersList.map(c => {
    const portrait = getPortraitPath(c.slug);
    const isObtained = obtainedList.includes(c.id);

    return `
      <div onclick="openCharacterDetailModal('${c.id}')" 
           class="bg-brand-card border ${isObtained ? 'border-cyan-500/60 bg-slate-900/90 shadow-md shadow-cyan-500/5' : 'border-brand-border opacity-75 hover:opacity-100'} 
                  p-3 rounded-2xl hover:border-cyan-500/40 cursor-pointer transition flex flex-col items-center text-center group relative aspect-square justify-between">
        
        <button onclick="toggleCharacterObtained('${c.id}', event)" title="${isObtained ? 'Marcar como no obtenido' : 'Marcar como obtenido'}" class="absolute top-2 right-2 p-1 z-10 rounded-lg bg-slate-900/80 hover:bg-slate-800 transition">
          <i data-lucide="${isObtained ? 'check-square' : 'square'}" class="w-4 h-4 ${isObtained ? 'text-cyan-400' : 'text-slate-500'}"></i>
        </button>

        <div class="relative w-20 h-20 sm:w-24 sm:h-24 mt-1">
          <img src="${portrait}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-full h-full rounded-xl object-cover border ${isObtained ? 'border-cyan-400' : 'border-slate-800'} group-hover:scale-105 transition bg-slate-950 shadow">
          <span class="absolute top-1 left-1 bg-black/85 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 leading-none">
            ${c.tier}
          </span>
        </div>
        
        <div class="w-full min-w-0 mt-2">
          <h3 class="font-bold text-xs ${isObtained ? 'text-white' : 'text-slate-300'} truncate px-1 leading-tight">${c.name}</h3>
          <div class="text-[10px] text-slate-400 font-medium truncate mt-0.5 px-1 leading-none">
            <span class="text-cyan-400">${c.element}</span> <span class="text-slate-600">•</span> <span>${c.role}</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterCharacters() {
  const nameInput = document.getElementById('filter-name');
  const tierInput = document.getElementById('filter-tier');
  const statusInput = document.getElementById('filter-obtained');

  const nameQuery = nameInput ? nameInput.value.toLowerCase().trim() : '';
  const tierQuery = tierInput ? tierInput.value : '';
  const statusQuery = statusInput ? statusInput.value : '';

  const selectedRoles = Array.from(document.querySelectorAll('.filter-role-cb:checked')).map(cb => cb.value);
  const selectedElements = Array.from(document.querySelectorAll('.filter-elem-cb:checked')).map(cb => cb.value);

  const obtainedList = getObtainedCharacters();

  const filtered = DB.characters.filter(c => {
    const matchesName = c.name.toLowerCase().includes(nameQuery);
    const matchesTier = !tierQuery || c.tier === tierQuery;
    const isObtained = obtainedList.includes(c.id);

    const matchesStatus = !statusQuery || 
      (statusQuery === 'obtained' && isObtained) || 
      (statusQuery === 'missing' && !isObtained);

    const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(c.role);
    const matchesElement = selectedElements.length === 0 || selectedElements.includes(c.element);

    return matchesName && matchesTier && matchesStatus && matchesRole && matchesElement;
  });

  const gridEl = document.getElementById('characters-grid');
  if (gridEl) {
    gridEl.innerHTML = renderCharacterCards(filtered);
  }

  const total = DB.characters.length;
  const count = obtainedList.length;
  
  const counterEl = document.getElementById('collection-counter');
  if (counterEl) {
    counterEl.textContent = `${count}/${total}`;
  }

  lucide.createIcons();
}
