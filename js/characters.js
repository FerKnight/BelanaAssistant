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

const CharactersSection = {
  render: () => {
    const obtained = getObtainedCharacters();
    const total = DB.characters.length;
    const count = obtained.length;

    return `
    <div class="space-y-6">
      <!-- ENCABEZADO CON TÍTULO Y CONTADOR INTEGRADO -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-card border border-brand-border p-4 rounded-2xl">
        <div class="flex items-center space-x-3">
          <i data-lucide="users" class="text-cyan-400 w-6 h-6"></i>
          <h2 class="text-2xl font-bold text-white">Personajes</h2>
          <span id="collection-counter" class="text-sm font-bold text-cyan-400 bg-slate-900 border border-brand-border px-3 py-1 rounded-xl font-mono">
            ${count}/${total}
          </span>
        </div>
      </div>

      <!-- PANEL DE FILTROS AVANZADOS COMBINABLES -->
      <div class="bg-brand-card border border-brand-border p-4 rounded-2xl space-y-4 shadow-lg">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Buscar por Nombre:</label>
            <div class="relative">
              <i data-lucide="search" class="absolute left-3 top-2.5 w-4 h-4 text-slate-500"></i>
              <input type="text" id="filter-name" placeholder="Ej. Angel, Verna..." oninput="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Grado:</label>
              <select id="filter-tier" onchange="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">
                <option value="">Todos</option>
                <option value="4★">4★</option>
                <option value="5★">5★</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Estado:</label>
              <select id="filter-obtained" onchange="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">
                <option value="">Todos</option>
                <option value="obtained">Obtenidos</option>
                <option value="missing">No Obtenidos</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">Tipo / Rol (Selección múltiple):</label>
          <div class="flex flex-wrap gap-2" id="filter-roles-container">
            ${['Asesino', 'Apoyo', 'Destructor', 'Luchador'].map(role => `
              <label class="cursor-pointer bg-slate-900 border border-brand-border px-3 py-1 rounded-lg text-xs font-medium text-slate-300 flex items-center space-x-2 hover:border-cyan-500/50 transition">
                <input type="checkbox" value="${role}" onchange="filterCharacters()" class="filter-role-cb rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0">
                <span>${role}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 mb-1.5">Elemento (Selección múltiple):</label>
          <div class="flex flex-wrap gap-2" id="filter-elements-container">
            ${['Fuego', 'Rayo', 'Viento', 'Tierra', 'Hielo'].map(elem => `
              <label class="cursor-pointer bg-slate-900 border border-brand-border px-3 py-1 rounded-lg text-xs font-medium text-slate-300 flex items-center space-x-2 hover:border-cyan-500/50 transition">
                <input type="checkbox" value="${elem}" onchange="filterCharacters()" class="filter-elem-cb rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0">
                <span>${elem}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </div>

      <div id="characters-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        ${renderCharacterCards(DB.characters)}
      </div>
    </div>`;
  }
};

function renderCharacterCards(charactersList) {
  if (charactersList.length === 0) {
    return `<div class="col-span-full py-12 text-center text-slate-500 text-sm">No se encontraron personajes con los filtros seleccionados.</div>`;
  }

  const obtainedList = getObtainedCharacters();

  return charactersList.map(c => {
    const portrait = getPortraitPath(c.slug);
    const isObtained = obtainedList.includes(c.id);

    return `
      <div onclick="openModal('${c.name}', '${c.element}', '${c.role}', '${c.skills}', '${c.desc}', '${portrait}')" 
           class="bg-brand-card border ${isObtained ? 'border-cyan-500/70 bg-slate-900/80 shadow-md shadow-cyan-500/5' : 'border-brand-border opacity-70 hover:opacity-100'} 
                  p-3 rounded-xl hover:border-cyan-500/50 cursor-pointer transition flex space-x-3 items-center group relative overflow-hidden">
        
        <!-- ÍCONO DEL PERSONAJE CON EL GRADO EN LA ESQUINA SUPERIOR IZQUIERDA -->
        <div class="relative flex-shrink-0">
          <img src="${portrait}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-14 h-14 rounded-lg object-cover border ${isObtained ? 'border-cyan-400' : 'border-slate-800'} group-hover:scale-105 transition bg-slate-950">
          <span class="absolute top-0.5 left-0.5 bg-black/80 text-amber-300 text-[9px] font-bold px-1 py-0.2 rounded backdrop-blur-sm border border-amber-500/30 leading-none">
            ${c.tier}
          </span>
        </div>
        
        <!-- INFORMACIÓN DEL PERSONAJE -->
        <div class="flex-grow min-w-0 pr-6">
          <h3 class="font-bold text-sm ${isObtained ? 'text-white' : 'text-slate-300'} truncate">${c.name}</h3>
          <div class="text-xs text-slate-400 font-medium truncate mt-0.5">
            <span class="text-cyan-400">${c.element}</span> • <span>${c.role}</span>
          </div>
        </div>

        <!-- BOTÓN CHECK DE OBTENIDO -->
        <button onclick="toggleCharacterObtained('${c.id}', event)" title="${isObtained ? 'Marcar como no obtenido' : 'Marcar como obtenido'}" class="absolute top-2 right-2 p-1 z-10 rounded-lg hover:bg-slate-800/80 transition">
          <i data-lucide="${isObtained ? 'check-square' : 'square'}" class="w-4 h-4 ${isObtained ? 'text-cyan-400' : 'text-slate-500'}"></i>
        </button>
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
