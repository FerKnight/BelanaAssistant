const HomeSection = {
  render: () => {
    const obtained = JSON.parse(localStorage.getItem('belana_obtained_characters')) || [];
    const total = DB.characters.length;
    const percent = total > 0 ? Math.round((obtained.length / total) * 100) : 0;

    return `
    <div class="space-y-6">
      <!-- TARJETA DE PERFIL -->
      <section class="bg-brand-card border border-brand-border rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 relative z-10">
          <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            <div class="relative">
              <img src="${userProfile.avatar}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-20 h-20 rounded-2xl border-2 border-cyan-400 object-cover shadow-lg shadow-cyan-500/20">
              <button onclick="openProfileModal()" class="absolute -bottom-1 -right-1 bg-cyan-500 text-slate-950 p-1.5 rounded-lg hover:bg-cyan-400 transition">
                <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
            <div>
              <span class="text-xs text-cyan-400 font-mono tracking-wider uppercase font-semibold">Perfil de Jugador</span>
              <h2 class="text-2xl font-black text-white">${userProfile.name}</h2>
              <div class="flex items-center justify-center sm:justify-start space-x-2 mt-1">
                <span class="bg-slate-900 border border-brand-border px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300">
                  ${userProfile.friendCode}
                </span>
                <button onclick="copyFriendCode()" title="Copiar Código" class="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          </div>

          <button onclick="openProfileModal()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-brand-border px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2">
            <i data-lucide="user-cog" class="w-4 h-4 text-cyan-400"></i>
            <span>Editar Perfil</span>
          </button>
        </div>
      </section>

      <!-- RESUMEN DE PROGRESO DE COLECCIÓN -->
      <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div onclick="navigate('characters')" class="bg-brand-card border border-brand-border hover:border-cyan-500/50 p-5 rounded-2xl cursor-pointer transition flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-xs text-slate-400 font-medium">Personajes Obtenidos</span>
            <div class="text-2xl font-black text-white font-mono">${obtained.length} <span class="text-sm font-normal text-slate-500">/ ${total}</span></div>
            <div class="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2 border border-slate-800">
              <div class="bg-cyan-400 h-full rounded-full" style="width: ${percent}%"></div>
            </div>
          </div>
          <div class="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
            <i data-lucide="users" class="w-6 h-6"></i>
          </div>
        </div>

        <div class="bg-brand-card border border-brand-border p-5 rounded-2xl flex items-center justify-between">
          <div class="space-y-1">
            <span class="text-xs text-slate-400 font-medium">Base de Datos</span>
            <div class="text-2xl font-black text-white font-mono">Mongil Star Dive</div>
            <span class="text-xs text-cyan-400 font-mono">BelanaAssistant v1.7</span>
          </div>
          <div class="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
            <i data-lucide="database" class="w-6 h-6"></i>
          </div>
        </div>
      </section>
    </div>`;
  }
};
