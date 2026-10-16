const CharactersSection = {
  render: () => `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
        <i data-lucide="users" class="text-cyan-400 w-6 h-6"></i>
        <span>Directorio de Personajes</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${DB.characters.map(c => {
          const portrait = getPortraitPath(c.slug);
          return `
            <div onclick="openModal('${c.name}', '${c.element}', '${c.role}', '${c.skills}', '${c.desc}', '${portrait}')" class="bg-brand-card border border-brand-border p-5 rounded-xl hover:border-cyan-500/50 cursor-pointer transition flex space-x-4 items-center">
              <img src="${portrait}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-16 h-16 rounded-xl object-cover border border-brand-border flex-shrink-0">
              <div class="flex-grow min-w-0">
                <div class="flex justify-between items-start mb-1">
                  <h3 class="font-bold text-base text-white truncate">${c.name}</h3>
                  <span class="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded font-bold">${c.tier}</span>
                </div>
                <p class="text-xs text-slate-400 mb-1">Elemento: <span class="text-cyan-400 font-semibold">${c.element}</span></p>
                <p class="text-xs text-slate-400 truncate">Tipo: ${c.role}</p>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>`
};
