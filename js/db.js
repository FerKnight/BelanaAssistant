const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3659/3659738.png';

function getPortraitPath(slug) {
  return `assets/images/Character_Icon/character_${slug}_00.png`;
}

function getArtifactIconPath(name) {
  if (!name) return DEFAULT_AVATAR;
  const slug = name.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
    
  return `assets/images/Artifact_Icon/artifact_${slug}_00.png`;
}

const DB = {
  characters: [
    { id: '1', name: 'Angel', slug: 'angel', tier: '5★', element: 'Fuego', role: 'Asesino', skills: 'Ataque veloz en área con quemadura.', desc: 'Una hábil guerrera especializada en eliminación rápida.' },
    { id: '2', name: 'Verna', slug: 'verna', tier: '5★', element: 'Hielo', role: 'Destructor', skills: 'Congela y destruye las defensas enemigas.', desc: 'Maestra del combate glacial con gran poder ofensivo.' },
    { id: '3', name: 'Karin', slug: 'karin', tier: '4★', element: 'Viento', role: 'Apoyo', skills: 'Cura y otorga velocidad al equipo.', desc: 'Soporte táctico ágil y versátil.' },
    { id: '4', name: 'Selene', slug: 'selene', tier: '5★', element: 'Rayo', role: 'Luchador', skills: 'Golpes eléctricos encadenados.', desc: 'Poderosa combatiente cuerpo a cuerpo.' },
    { id: '5', name: 'Rina', slug: 'rina', tier: '4★', element: 'Tierra', role: 'Luchador', skills: 'Escudo protector y daño de impacto.', desc: 'Defensora firme con gran resistencia.' },
    { id: '6', name: 'Lyra', slug: 'lyra', tier: '5★', element: 'Viento', role: 'Asesino', skills: 'Emboscada letal invisible.', desc: 'Asesina silenciosa de la guardia de los vientos.' },
    { id: '7', name: 'Zoe', slug: 'zoe', tier: '4★', element: 'Fuego', role: 'Apoyo', skills: 'Mejora de ataque masiva.', desc: 'Estrategia ardiente en el campo de batalla.' },
    { id: '8', name: 'Mira', slug: 'mira', tier: '5★', element: 'Hielo', role: 'Destructor', skills: 'Ventisca colosal de daño crítico.', desc: 'Fuerza destructiva implacable.' },
    { id: '9', name: 'Tania', slug: 'tania', tier: '4★', element: 'Rayo', role: 'Asesino', skills: 'Descarga eléctrica rápida.', desc: 'Velocidad pura en cada movimiento.' },
    { id: '10', name: 'Elena', slug: 'elena', tier: '5★', element: 'Tierra', role: 'Apoyo', skills: 'Sanación y barrera de rocas.', desc: 'Protectora inquebrantable de la naturaleza.' },
    { id: '11', name: 'Aria', slug: 'aria', tier: '4★', element: 'Viento', role: 'Luchador', skills: 'Combo de ráfagas cortantes.', desc: 'Ágil y precisa en combate.' },
    { id: '12', name: 'Kira', slug: 'kira', tier: '5★', element: 'Fuego', role: 'Destructor', skills: 'Explosión volcánica devastadora.', desc: 'Poder puro desatado.' },
    { id: '13', name: 'Nia', slug: 'nia', tier: '4★', element: 'Hielo', role: 'Apoyo', skills: 'Reducción de velocidad enemiga.', desc: 'Control táctico del terreno.' },
    { id: '14', name: 'Sora', slug: 'sora', tier: '5★', element: 'Rayo', role: 'Asesino', skills: 'Corte relámpago instantáneo.', desc: 'Inalcanzable para sus enemigos.' },
    { id: '15', name: 'Hana', slug: 'hana', tier: '4★', element: 'Tierra', role: 'Destructor', skills: 'Terremoto controlado.', desc: 'Rompe defensas con facilidad.' },
    { id: '16', name: 'Lia', slug: 'lia', tier: '5★', element: 'Viento', role: 'Apoyo', skills: 'Curación en área continua.', desc: 'Bendición de los vientos curativos.' },
    { id: '17', name: 'Maya', slug: 'maya', tier: '4★', element: 'Fuego', role: 'Luchador', skills: 'Golpes de fuego acumulativos.', desc: 'Pasión y fuerza en la batalla.' },
    { id: '18', name: 'Erika', slug: 'erika', tier: '5★', element: 'Hielo', role: 'Asesino', skills: 'Daga glacial penetrante.', desc: 'Fría, calculadora y letal.' },
    { id: '19', name: 'Iris', slug: 'iris', tier: '4★', element: 'Rayo', role: 'Apoyo', skills: 'Recarga de energía rápida.', desc: 'Dinámica y llena de energía.' },
    { id: '20', name: 'Dana', slug: 'dana', tier: '5★', element: 'Tierra', role: 'Luchador', skills: 'Golpe telúrico masivo.', desc: 'Fuerza de la tierra madre.' },
    { id: '21', name: 'Fiona', slug: 'fiona', tier: '4★', element: 'Viento', role: 'Destructor', skills: 'Tornado frontal destructivo.', desc: 'Vientos de destrucción total.' },
    { id: '22', name: 'Gia', slug: 'gia', tier: '5★', element: 'Fuego', role: 'Apoyo', skills: 'Aura de furia ignea.', desc: 'Inspira a sus aliados con fuego.' },
    { id: '23', name: 'Karin_Alt', slug: 'karin_alt', tier: '4★', element: 'Hielo', role: 'Luchador', skills: 'Espada de hielo ágil.', desc: 'Versión alternativa de combate.' },
    { id: '24', name: 'Luna', slug: 'luna', tier: '5★', element: 'Rayo', role: 'Destructor', skills: 'Juicio del rayo celestial.', desc: 'Poder divino en la tormenta.' },
    { id: '25', name: 'Noa', slug: 'noa', tier: '4★', element: 'Tierra', role: 'Asesino', skills: 'Emboscada de rocas ocultas.', desc: 'Maestra del sigilo terrestre.' },
    { id: '26', name: 'Orla', slug: 'orla', tier: '5★', element: 'Viento', role: 'Luchador', skills: 'Patada giratoria de alta velocidad.', desc: 'Artes marciales del viento.' },
    { id: '27', name: 'Pia', slug: 'pia', tier: '4★', element: 'Fuego', role: 'Apoyo', skills: 'Escudo térmico protector.', desc: 'Calidez que defiende al equipo.' },
    { id: '28', name: 'Roxie', slug: 'roxie', tier: '5★', element: 'Hielo', role: 'Destructor', skills: 'Cañón glacial supremo.', desc: 'Poder destructivo desde el hielo.' }
  ],

  equipments: [
    { id: 'e1', name: 'Casco de Soldado', slot: 'Casco', rarity: '4★', stat: 'ATK +120' },
    { id: 'e2', name: 'Casco Épico de Asalto', slot: 'Casco', rarity: '5★', stat: 'ATK +250' },
    { id: 'e3', name: 'Pechera de Malla', slot: 'Pechera', rarity: '4★', stat: 'DEF +150' },
    { id: 'e4', name: 'Armadura Pesada de Vanguardia', slot: 'Pechera', rarity: '5★', stat: 'DEF +320' },
    { id: 'e5', name: 'Guantes de Cuero', slot: 'Guantes', rarity: '4★', stat: 'CRIT +5%' },
    { id: 'e6', name: 'Guanteletes de Berserker', slot: 'Guantes', rarity: '5★', stat: 'CRIT +12%' },
    { id: 'e7', name: 'Botas Ligeras', slot: 'Calzado', rarity: '4★', stat: 'SPD +10' },
    { id: 'e8', name: 'Botas de Velocidad Divina', slot: 'Calzado', rarity: '5★', stat: 'SPD +25' }
  ],

  monsterlings: [
    { id: 'm1', name: 'Ignis Pequeño', type: 'Fuego', rarity: 'Normal' },
    { id: 'm2', name: 'Dragon Ignis Legendario', type: 'Fuego', rarity: 'Legendario' },
    { id: 'm3', name: 'Aqua Sprite', type: 'Hielo', rarity: 'Normal' },
    { id: 'm4', name: 'Leviatán Legendario', type: 'Hielo', rarity: 'Legendario' },
    { id: 'm5', name: 'Sparky', type: 'Rayo', rarity: 'Normal' },
    { id: 'm6', name: 'Rayo Celestial Legendario', type: 'Rayo', rarity: 'Legendario' }
  ],

  artifacts: [
    { id: 'a1', name: 'Amigo de la naturaleza', rarity: '5★', role: 'Luchador' },
    { id: 'a2', name: 'Aquel ante quien se arrodillan los dokkaebi', rarity: '5★', role: 'Luchador' },
    { id: 'a3', name: 'Escama blanca del dragon serpenteante', rarity: '5★', role: 'Destructor' },
    { id: 'a4', name: 'Escoba de los vientos', rarity: '5★', role: 'Asesino' },
    { id: 'a5', name: 'Fuego de dragón exquisito', rarity: '5★', role: 'Destructor' },
    { id: 'a6', name: 'Halo celestial de vida', rarity: '5★', role: 'Soporte' },
    { id: 'a7', name: 'Inversión inteligente', rarity: '5★', role: 'Luchador' },
    { id: 'a8', name: 'Kumiho ardiente', rarity: '5★', role: 'Luchador' },
    { id: 'a9', name: 'La llama que sueña con la justicia', rarity: '5★', role: 'Luchador' },
    { id: 'a10', name: 'Lucha Frenética', rarity: '5★', role: 'Luchador' },
    { id: 'a11', name: 'Melodía interpretada con fibras del corazón', rarity: '5★', role: 'Soporte' },
    { id: 'a12', name: 'Oscuridad opresiva', rarity: '5★', role: 'Asesino' },
    { id: 'a13', name: 'Recompensa la bondad, elimina la maldad', rarity: '5★', role: 'Destructor' },
    { id: 'a14', name: 'Rocío bordador de llanuras', rarity: '5★', role: 'Soporte' },
    { id: 'a15', name: 'Temblores tronidos', rarity: '5★', role: 'Destructor' },
    { id: 'a16', name: 'Un verano empapado de amor', rarity: '5★', role: 'Soporte' },
    { id: 'a17', name: 'Veredicto gélido', rarity: '5★', role: 'Luchador' },
    { id: 'a18', name: 'Aventurero soñador', rarity: '4★', role: 'Destructor' },
    { id: 'a19', name: 'Caballería implacable', rarity: '4★', role: 'Destructor' },
    { id: 'a20', name: 'Caída en desgracia', rarity: '4★', role: 'Asesino' },
    { id: 'a21', name: 'Determinación del cazador de tigres', rarity: '4★', role: 'Asesino' },
    { id: 'a22', name: 'Espada de fuego honesta', rarity: '4★', role: 'Luchador' },
    { id: 'a23', name: 'Fragancia forestal', rarity: '4★', role: 'Soporte' },
    { id: 'a24', name: 'Halo celestial de protección', rarity: '4★', role: 'Soporte' },
    { id: 'a25', name: 'Halo celestial de sabiduría', rarity: '4★', role: 'Soporte' },
    { id: 'a26', name: 'La llave de futuras cerraduras', rarity: '4★', role: 'Luchador' },
    { id: 'a27', name: 'Loto sombrío', rarity: '4★', role: 'Asesino' },
    { id: 'a28', name: 'Lucha sangrienta', rarity: '4★', role: 'Luchador' },
    { id: 'a29', name: 'Miembro descoordinado de una banda militar', rarity: '4★', role: 'Asesino' },
    { id: 'a30', name: 'Oscuridad siniestra', rarity: '4★', role: 'Asesino' },
    { id: 'a31', name: 'Plenitud de amor', rarity: '4★', role: 'Soporte' },
    { id: 'a32', name: 'Presagio de despertar', rarity: '4★', role: 'Destructor' },
    { id: 'a33', name: 'Subidón de azúcar', rarity: '4★', role: 'Destructor' },
    { id: 'a34', name: 'Vuelo del halcón', rarity: '4★', role: 'Asesino' }
  ]
};
