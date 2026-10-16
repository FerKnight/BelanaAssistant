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

// Configuración predeterminada de filas dinámicas por personaje
function getCharacterConfig(charId) {
  const configs = JSON.parse(localStorage.getItem('belana_char_configs')) || {};
  if (!configs[charId]) {
    configs[charId] = {
      equipmentsRows: 1, // 1 fila = 5 recuadros
      monsterlingsRows: 1, // 1 fila = 4 recuadros
      teamsRows: 1 // 1 fila = 3 recuadros
    };
  }
  return configs[charId];
}

function updateCharacterConfig(charId, key, delta) {
  const configs = JSON.parse(localStorage.getItem('belana_char_configs')) || {};
  if (!configs[charId]) {
    configs[charId] = { equipmentsRows: 1, monsterlingsRows: 1, teamsRows: 1 };
  }
  const current = configs[charId][key] || 1;
  if (current + delta >= 1 && current + delta <= 5) {
    configs[charId][key] = current + delta;
    localStorage.setItem('belana_char_configs', JSON.stringify(configs));
    openCharacterDetailModal(charId);
  }
}

// Abrir Modal de Detalles con Secciones Horizontales
function openCharacterDetailModal(charId) {
  const character = DB.characters.find(c => c.id === charId);
  if (!character) return;

  const portrait = getPortraitPath(character.slug);
  const config = getCharacterConfig(charId);

  // 1. EQUIPAMIENTOS RECOMENDADOS (Filas horizontales de 5 recuadros, el 5to con borde dorado)
  let equipmentsHtml = '';
  for (let r = 0; r < config.equipmentsRows; r++) {
    equipmentsHtml += `<div class="grid grid-cols-5 gap-2">`;
    for (let c = 1; c <= 5; c++) {
      const isGold = c === 5;
      equipmentsHtml += `
        <div class="aspect-square bg-slate-900/90 rounded-xl border ${isGold ? 'border-amber-400/80 shadow-md shadow-amber-500/10' : 'border-brand-border'} flex flex-col items-center justify-center p-1 cursor-pointer hover:border-cyan-400 transition group relative">
          <i data-lucide="plus-circle" class="w-4 h-4 text-slate-500 group-hover:text-cyan-400 mb-1 transition"></i>
          <span class="text-[9px] ${isGold ? 'text-amber-300 font-bold' : 'text-slate-400'} font-mono">#${c}</span>
        </div>`;
    }
    equipmentsHtml += `</div>`;
  }

  // 2. MONSTERLINGS RECOMENDADOS (Filas horizontales de 4 recuadros, el 1ero con borde rojo)
  let monsterlingsHtml = '';
  for (let r = 0; r < config.monsterlingsRows; r++) {
    monsterlingsHtml += `<div class="grid grid-cols-4 gap-2">`;
    for (let c = 1; c <= 4; c++) {
      const isRed = (r === 0 && c === 1); // Solo el primer slot del set principal o de cada fila
      monsterlingsHtml += `
        <div class="aspect-square bg-slate-900/90 rounded-xl border ${isRed ? 'border-red-500/80 shadow-md shadow-red-500/10' : 'border-brand-border'} flex flex-col items-center justify-center p-1 cursor-pointer hover:border-purple-400 transition group relative">
          <i data-lucide="plus-circle" class="w-4 h-4 text-slate-500 group-hover:text-purple-400 mb-1 transition"></i>
          <span class="text-[9px] ${isRed ? 'text-red-400 font-bold' : 'text-slate-400'} font-mono">#${c}</span>
        </div>`;
    }
    monsterlingsHtml += `</div>`;
  }

  // 3. EQUIPOS RECOMENDADOS (Filas horizontales de 3 recuadros)
  let teamsHtml = '';
  for (let r = 0; r < config.teamsRows; r++) {
    teamsHtml += `<div class="grid grid-cols-3 gap-2">`;
    for (let c = 1; c <= 3; c++) {
      teamsHtml += `
        <div class="aspect-square bg-slate-900/90 rounded-xl border border-brand-border flex flex-col items-center justify-center p-1 cursor-pointer hover:border-amber-400 transition group relative">
          <i data-lucide="users" class="w-4 h-4 text-slate-500 group-hover:text-amber-400 mb-1 transition"></i>
          <span class="text-[9px] text-slate-400 font-mono">Equipo #${c}</span>
        </div>`;
    }
    teamsHtml += `</div>`;
  }

  const modal = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <!-- CABECERA DE PERSONAJE -->
    <div class="flex items-center space-x-3 pb-3 border-b border-brand-border">
      <div class="relative w-14 h-14 flex-shrink-0">
        <img src="${portrait}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-full h-full rounded-xl object-cover border border-cyan-400 bg-slate-950">
        <span class="absolute top-0.5 left-0.5 bg-black/85 text-amber-300 text-[8px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 leading-none">
          ${character.tier}
        </span>
      </div>
      <div>
        <h3 class="text-xl font-extrabold text-white leading-tight">${character.name}</h3>
        <p class="text-xs text-cyan-400 font-medium mt-0.5">${character.element} • ${character.role}</p>
      </div>
    </div>

    <div class="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
      <!-- SECCIÓN: EQUIPAMIENTOS RECOMENDADOS -->
      <div class="space-y-2">
        <div class="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-xl border border-brand-border">
          <span class="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
            <i data-lucide="shield" class="w-4 h-4 text-cyan-400"></i>
            <span>Equipamientos recomendados</span>
          </span>
          <div class="flex items-center space-x-1">
            <button onclick="updateCharacterConfig('${charId}', 'equipmentsRows', -1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95" title="Quitar fila">
              <i data-lucide="minus" class="w-3.5 h-3.5"></i>
            </button>
            <span class="text-xs font-mono font-bold text-cyan-400 px-1.5">${config.equipmentsRows}</span>
            <button onclick="updateCharacterConfig('${charId}', 'equipmentsRows', 1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95" title="Añadir fila">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
        <div class="space-y-2">
          ${equipmentsHtml}
        </div>
      </div>

      <!-- SECCIÓN: MONSTERLINGS RECOMENDADOS -->
      <div class="space-y-2">
        <div class="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-xl border border-brand-border">
          <span class="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
            <i data-lucide="bug" class="w-4 h-4 text-purple-400"></i>
            <span>Monsterlings recomendados</span>
          </span>
          <div class="flex items-center space-x-1">
            <button onclick="updateCharacterConfig('${charId}', 'monsterlingsRows', -1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95" title="Quitar fila">
              <i data-lucide="minus" class="w-3.5 h-3.5"></i>
            </button>
            <span class="text-xs font-mono font-bold text-purple-400 px-1.5">${config.monsterlingsRows}</span>
            <button onclick="updateCharacterConfig('${charId}', 'monsterlingsRows', 1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95" title="Añadir fila">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
        <div class="space-y-2">
          ${monsterlingsHtml}
        </div>
      </div>

      <!-- SECCIÓN: EQUIPOS RECOMENDADOS -->
      <div class="space-y-2">
        <div class="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-xl border border-brand-border">
          <span class="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
            <i data-lucide="users" class="w-4 h-4 text-amber-400"></i>
            <span>Equipos recomendados</span>
          </span>
          <div class="flex items-center space-x-1">
            <button onclick="updateCharacterConfig('${charId}', 'teamsRows', -1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95" title="Quitar fila">
              <i data-lucide="minus" class="w-3.5 h-3.5"></i>
            </button>
            <span class="text-xs font-mono font-bold text-amber-400 px-1.5">${config.teamsRows}</span>
            <button onclick="updateCharacterConfig('${charId}', 'teamsRows', 1)" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95" title="Añadir fila">
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
      <!-- ENCABEZADO CON TÍTULO Y CONTADOR INTEGRADO -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-brand-card border border-brand-border px-4 py-3 rounded-2xl">
        <div class="flex items-center space-x-3">
          <i data-lucide="users" class="text-cyan-400 w-5 h-5"></i>
          <h2 class="text-xl font-bold text-white">Personajes</h2>
          <span id="collection-counter" class="text-xs font-bold text-cyan-400 bg-slate-900 border border-brand-border px-2.5 py-0.5 rounded-lg font-mono">
            ${count}/${total}
          </span>
        </div>
      </div>

      <!-- PANEL DE FILTROS AVANZADOS COMBINABLES -->
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

      <!-- GRILLA DE TARJETAS CUADRADAS Y REDONDEADAS -->
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
        
        <!-- BOTÓN CHECK DE OBTENIDO (SUPERIOR DERECHA) -->
        <button onclick="toggleCharacterObtained('${c.id}', event)" title="${isObtained ? 'Marcar como no obtenido' : 'Marcar como obtenido'}" class="absolute top-2 right-2 p-1 z-10 rounded-lg bg-slate-900/80 hover:bg-slate-800 transition">
          <i data-lucide="${isObtained ? 'check-square' : 'square'}" class="w-4 h-4 ${isObtained ? 'text-cyan-400' : 'text-slate-500'}"></i>
        </button>

        <!-- RETRATO CUADRADO CON GRADO SUPERIOR IZQUIERDA -->
        <div class="relative w-20 h-20 sm:w-24 sm:h-24 mt-1">
          <img src="${portrait}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-full h-full rounded-xl object-cover border ${isObtained ? 'border-cyan-400' : 'border-slate-800'} group-hover:scale-105 transition bg-slate-950 shadow">
          <span class="absolute top-1 left-1 bg-black/85 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 leading-none">
            ${c.tier}
          </span>
        </div>
        
        <!-- INFORMACIÓN DEL PERSONAJE -->
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
