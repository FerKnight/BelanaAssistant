const CharactersSection = {
  render: () => `
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
          <i data-lucide="users" class="text-cyan-400 w-6 h-6"></i>
          <span>Directorio de Personajes (${DB.characters.length})</span>
        </h2>
      </div>

      <!-- PANEL DE FILTROS COMBINABLES -->
      <div class="bg-brand-card border border-brand-border p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shadow-lg">
        <!-- Búsqueda por Nombre -->
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 mb-1">Buscar por Nombre:</label>
          <div class="relative">
            <i data-lucide="search" class="absolute left-3 top-2.5 w-4 h-4 text-slate-500"></i>
            <input type="text" id="filter-name" placeholder="Ej. Astraea, Angel..." oninput="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">
          </div>
        </div>

        <!-- Filtro por Grado / Rareza -->
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 mb-1">Grado:</label>
          <select id="filter-tier" onchange="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">
            <option value="">Todos los Grados</option>
            <option value="4★">4 Estrellas (4★)</option>
            <option value="5★">5 Estrellas (5★)</option>
          </select>
        </div>

        <!-- Filtro por Rol / Tipo -->
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 mb-1">Tipo / Rol:</label>
          <select id="filter-role" onchange="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">
            <option value="">Todos los Tipos</option>
            <option value="Asesino">Asesino</option>
            <option value="Apoyo">Apoyo</option>
            <option value="Destructor">Destructor</option>
            <option value="Luchador">Luchador</option>
          </select>
        </div>

        <!-- Filtro por Elemento -->
        <div>
          <label class="block text-[11px] font-semibold text-slate-400 mb-1">Elemento:</label>
          <select id="filter-element" onchange="filterCharacters()" class="w-full bg-slate-900 border border-brand-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">
            <option value="">Todos los Elementos</option>
            <option value="Fuego">Fuego</option>
            <option value="Rayo">Rayo</option>
            <option value="Viento">Viento</option>
            <option value="Tierra">Tierra</option>
            <option value="Hielo">Hielo</option>
          </select>
        </div>
      </div>

      <!-- CONTENEDOR DE TARJETAS -->
      <div id="characters-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${renderCharacterCards(DB.characters)}
      </div>
    </div>`
};

function renderCharacterCards(charactersList) {
  if (charactersList.length === 0) {
    return `<div class="col-span-full py-12 text-center text-slate-500 text-sm">No se encontraron personajes con los filtros seleccionados.</div>`;
  }

  return charactersList.map(c => {
    const portrait = getPortraitPath(c.slug);
    return `
      <div onclick="openModal('${c.name}', '${c.element}', '${c.role}', '${c.skills}', '${c.desc}', '${portrait}')" class="bg-brand-card border border-brand-border p-4 rounded-xl hover:border-cyan-500/50 cursor-pointer transition flex space-x-4 items-center group">
        <img src="${portrait}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-16 h-16 rounded-xl object-cover border border-brand-border group-hover:scale-105 transition flex-shrink-0 bg-slate-950">
        <div class="flex-grow min-w-0">
          <div class="flex justify-between items-start mb-1">
            <h3 class="font-bold text-base text-white truncate">${c.name}</h3>
            <span class="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded font-bold">${c.tier}</span>
          </div>
          <p class="text-xs text-slate-400 mb-0.5">Elemento: <span class="text-cyan-400 font-semibold">${c.element}</span></p>
          <p class="text-xs text-slate-400 truncate">Tipo: ${c.role}</p>
        </div>
      </div>`;
  }).join('');
}

function filterCharacters() {
  const nameQuery = document.getElementById('filter-name').value.toLowerCase().trim();
  const tierQuery = document.getElementById('filter-tier').value;
  const roleQuery = document.getElementById('filter-role').value;
  const elementQuery = document.getElementById('filter-element').value;

  const filtered = DB.characters.filter(c => {
    const matchesName = c.name.toLowerCase().includes(nameQuery);
    const matchesTier = !tierQuery || c.tier === tierQuery;
    const matchesRole = !roleQuery || c.role === roleQuery;
    const matchesElement = !elementQuery || c.element === elementQuery;
    return matchesName && matchesTier && matchesRole && matchesElement;
  });

  document.getElementById('characters-grid').innerHTML = renderCharacterCards(filtered);
  lucide.createIcons();
}
