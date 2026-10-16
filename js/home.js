const HomeSection = {
  render: () => {
    const obtained = getObtainedCharacters();
    const total = DB.characters.length;
    const percent = total > 0 ? Math.round((obtained.length / total) * 100) : 0;

    return `
    <div class="space-y-6">
      <section class="bg-brand-card border border-brand-border rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 relative z-10">
          <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            
            <!-- TOCAR FOTO DE AVATAR APERTURA DE SELECTOR -->
            <div class="relative group cursor-pointer" onclick="openAvatarSelectorModal()" title="Toca para cambiar la foto de avatar">
              <img src="${userProfile.avatar}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-20 h-20 rounded-2xl border-2 border-cyan-400 object-cover shadow-lg shadow-cyan-500/20 group-hover:border-cyan-300 transition bg-slate-950">
              <div class="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <i data-lucide="camera" class="w-6 h-6 text-cyan-400"></i>
              </div>
            </div>

            <!-- INFORMACIÓN EDITABLE DEL JUGADOR -->
            <div>
              <span class="text-xs text-cyan-400 font-mono tracking-wider uppercase font-semibold">Perfil de Jugador</span>
              
              <!-- NOMBRE EDITABLE -->
              <div class="flex items-center justify-center sm:justify-start space-x-2 mt-0.5">
                <h2 class="text-2xl font-black text-white leading-tight">${userProfile.name}</h2>
                <button onclick="openEditNameModal()" title="Editar Nombre" class="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition">
                  <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                </button>
              </div>

              <!-- CÓDIGO DE AMISTAD EDITABLE -->
              <div class="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                <span class="bg-slate-900 border border-brand-border px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-400">
                  ${userProfile.friendCode}
                </span>
                <button onclick="openEditCodeModal()" title="Editar Código" class="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition">
                  <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                </button>
                <button onclick="copyFriendCode()" title="Copiar Código" class="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- BARRA DE PROGRESO COLECCIÓN -->
      <section>
        <div onclick="navigate('characters')" class="bg-brand-card border border-brand-border hover:border-cyan-500/50 p-5 rounded-2xl cursor-pointer transition flex items-center justify-between">
          <div class="space-y-1 w-full max-w-xs">
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
      </section>
    </div>`;
  }
};
