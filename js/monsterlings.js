const MonsterlingsSection = {
  render: () => `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
        <i data-lucide="bug" class="text-purple-400 w-6 h-6"></i>
        <span>Monsterlings</span>
      </h2>
      <div id="monsterlings-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${renderMonsterlingCards(DB.monsterlings || [])}
      </div>
    </div>`
};

function renderMonsterlingCards(monsterlingsList) {
  if (!monsterlingsList || monsterlingsList.length === 0) {
    return `<div class="col-span-full py-12 text-center text-slate-500 text-sm">No hay Monsterlings registrados.</div>`;
  }

  return monsterlingsList.map(m => `
    <div class="bg-brand-card border border-brand-border p-5 rounded-xl space-y-2">
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-lg text-white">${m.name}</h3>
        <span class="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded">${m.type}</span>
      </div>
      <p class="text-xs text-slate-400">Hábitat: <span class="text-purple-400">${m.habitat}</span></p>
      <p class="text-xs text-slate-300"><strong class="text-cyan-400">Pasiva:</strong> ${m.passive}</p>
      <p class="text-xs text-slate-300"><strong class="text-indigo-400">Activa:</strong> ${m.active}</p>
    </div>
  `).join('');
}
