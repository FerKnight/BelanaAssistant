const EquipmentsSection = {
  render: () => `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
        <i data-lucide="shield" class="text-cyan-400 w-6 h-6"></i>
        <span>Catálogo de Equipamiento</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${DB.equipments.map(e => `
          <div class="bg-brand-card border border-brand-border p-5 rounded-xl space-y-2">
            <div class="flex justify-between items-center">
              <h3 class="font-bold text-lg text-white">${e.name}</h3>
              <span class="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded font-bold">${e.rarity}</span>
            </div>
            <p class="text-xs text-slate-400">Ranura: ${e.slot} | Atributo: <span class="text-amber-400 font-semibold">${e.stat}</span></p>
            <p class="text-sm text-slate-300">${e.effect}</p>
          </div>
        `).join('')}
      </div>
    </div>`
};
