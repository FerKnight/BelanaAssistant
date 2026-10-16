const ArtifactsSection = {
  render: () => {
    const list = (typeof DB !== 'undefined' && DB.artifacts) ? DB.artifacts : [];

    return `
    <div class="space-y-4">
      <div class="flex items-center justify-between bg-brand-card border border-brand-border px-4 py-3 rounded-2xl">
        <div class="flex items-center space-x-3">
          <i data-lucide="gem" class="text-amber-400 w-5 h-5"></i>
          <h2 class="text-xl font-bold text-white">Artefactos</h2>
          <span id="artifacts-counter" class="text-xs font-bold text-amber-400 bg-slate-900 border border-brand-border px-2.5 py-0.5 rounded-lg font-mono">
            ${list.length}
          </span>
        </div>
      </div>

      <div class="bg-brand-card border border-brand-border p-3.5 rounded-2xl space-y-3 shadow-lg">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">Buscar Artefacto:</label>
            <div class="relative">
              <i data-lucide="search" class="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500"></i>
              <input type="text" id="filter-art-name" placeholder="Ej. Halo, Llama..." oninput="filterArtifacts()" class="w-full bg-slate-900 border border-brand-border rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">Grado:</label>
            <select id="filter-art-rarity" onchange="filterArtifacts()" class="w-full bg-slate-900 border border-brand-border rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400">
              <option value="">Todos los grados</option>
              <option value="5★">5★</option>
              <option value="4★">4★</option>
            </select>
          </div>
        </div>

        <div class="pt-1 border-t border-brand-border/50">
          <div class="flex flex-wrap gap-1.5 items-center" id="filter-art-roles-container">
            ${['Luchador', 'Destructor', 'Asesino', 'Soporte'].map(role => `
              <label class="cursor-pointer bg-slate-900 border border-brand-border px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-300 flex items-center space-x-1.5 hover:border-amber-500/50 transition">
                <input type="checkbox" value="${role}" onchange="filterArtifacts()" class="filter-art-role-cb rounded bg-slate-800 border-slate-700 text-amber-500 w-3.5 h-3.5 focus:ring-0 focus:ring-offset-0">
                <span>${role}</span>
              </label>
            `).join('')}
          </div>
        </div>
      </div>

      <div id="artifacts-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        ${renderArtifactCards(list)}
      </div>
    </div>`;
  }
};

function renderArtifactCards(artifactsList) {
  if (!artifactsList || artifactsList.length === 0) {
    return `<div class="col-span-full py-10 text-center text-slate-500 text-xs">No se encontraron artefactos.</div>`;
  }

  return artifactsList.map(a => {
    const is5Star = a.rarity === '5★';
    const iconPath = typeof getArtifactIconPath === 'function' ? getArtifactIconPath(a.name) : DEFAULT_AVATAR;

    return `
      <div class="bg-brand-card border ${is5Star ? 'border-amber-500/50 bg-slate-900/90' : 'border-brand-border'} p-2.5 rounded-xl flex items-center space-x-3 group relative overflow-hidden hover:border-amber-400/80 transition">
        <div class="relative w-12 h-12 flex-shrink-0">
          <img src="${iconPath}" onerror="this.src='${DEFAULT_AVATAR}'" 
               class="w-full h-full object-cover rounded-lg border border-slate-800 bg-slate-950 p-0.5 group-hover:scale-105 transition">
          <span class="absolute top-0.5 left-0.5 bg-black/85 text-amber-300 text-[8px] font-bold px-1 py-0.2 rounded border border-amber-500/30 leading-none">
            ${a.rarity}
          </span>
        </div>

        <div class="min-w-0 flex-1">
          <span class="text-[9px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">${a.role}</span>
          <h3 class="font-bold text-xs text-white truncate leading-tight group-hover:text-amber-300 transition">${a.name}</h3>
        </div>
      </div>`;
  }).join('');
}

function filterArtifacts() {
  const nameInput = document.getElementById('filter-art-name');
  const rarityInput = document.getElementById('filter-art-rarity');

  const nameQuery = nameInput ? nameInput.value.toLowerCase().trim() : '';
  const rarityQuery = rarityInput ? rarityInput.value : '';

  const selectedRoles = Array.from(document.querySelectorAll('.filter-art-role-cb:checked')).map(cb => cb.value.toLowerCase());

  const list = (typeof DB !== 'undefined' && DB.artifacts) ? DB.artifacts : [];

  const filtered = list.filter(a => {
    const matchesName = a.name.toLowerCase().includes(nameQuery);
    const matchesRarity = !rarityQuery || a.rarity === rarityQuery;
    const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(a.role.toLowerCase());

    return matchesName && matchesRarity && matchesRole;
  });

  const gridEl = document.getElementById('artifacts-grid');
  if (gridEl) {
    gridEl.innerHTML = renderArtifactCards(filtered);
  }

  const counterEl = document.getElementById('artifacts-counter');
  if (counterEl) {
    counterEl.textContent = filtered.length;
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}
