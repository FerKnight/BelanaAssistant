const CharactersSection = {
  render: () => {
    const obtained = getObtainedCharacters();
    const total = DB.characters.length;
    const count = obtained.length;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;

    return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-card border border-brand-border p-4 rounded-2xl">
        <div>
          <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
            <i data-lucide="users" class="text-cyan-400 w-6 h-6"></i>
            <span>Personajes</span>
          </h2>
        </div>

        <!-- CONTADOR DE COLECCIÓN -->
        <div class="flex items-center space-x-3 bg-slate-900 border border-brand-border px-4 py-2 rounded-xl">
          <i data-lucide="trophy" class="w-5 h-5 text-amber-400"></i>
          <div>
            <span class="text-xs text-slate-400 block font-medium">Progreso Colección</span>
            <span id="collection-counter" class="text-sm font-bold text-cyan-400 font-mono">
              ${count} / ${total} <span class="text-xs text-slate-400">(${percent}%)</span>
            </span>
          </div>
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

      <div id="characters-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        ${renderCharacterCards(DB.characters)}
      </div>
    </div>`;
  }
};
