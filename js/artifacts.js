const ArtifactsSection = {
  render: () => `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
        <i data-lucide="gem" class="text-amber-400 w-6 h-6"></i>
        <span>Conjuntos de Artefactos</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${DB.artifacts.map(a => `
          <div class="bg-brand-card border border-brand-border p-5 rounded-xl space-y-3">
            <h3 class="font-bold text-lg text-white">${a.name}</h3>
            <span class="inline-block bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded">${a.type}</span>
            <div class="space-y-1 text-xs">
              <p class="text-slate-300"><strong class="text-amber-400">Efecto 2 Pcs:</strong> ${a.bonus2}</p>
              <p class="text-slate-300"><strong class="text-amber-400">Efecto 4 Pcs:</strong> ${a.bonus4}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`
};
