const HomeSection = {
  render: () => `
    <div class="space-y-6">
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

      <section class="relative overflow-hidden rounded-3xl border border-brand-border bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/50 p-8 shadow-2xl">
        <div class="relative z-10 max-w-2xl space-y-4">
          <div class="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs px-3 py-1 rounded-full font-mono">
            <i data-lucide="bot" class="w-3.5 h-3.5"></i>
            <span>BelanaAssistant v1.6</span>
          </div>
          <h1 class="text-2xl md:text-4xl font-black text-white leading-tight">
            Explora las Estrellas en <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Mongil Star Dive</span>
          </h1>
          <p class="text-slate-400 text-sm">
            Usa el menú lateral para consultar la base de datos modular de personajes, equipamientos, monsterlings y artefactos.
          </p>
          <button onclick="toggleDrawer(true)" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition flex items-center space-x-2 shadow-lg shadow-cyan-500/20">
            <i data-lucide="menu" class="w-4 h-4"></i>
            <span>Abrir Menú de Navegación</span>
          </button>
        </div>
      </section>
    </div>`
};
