const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3659/3659738.png';

function getPortraitPath(slug) {
  if (!slug) return DEFAULT_AVATAR;
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
    { id: '1', name: 'Angel', slug: 'angel', tier: '4★', element: 'Fuego', role: 'Asesino', skills: 'Habilidad especial de Angel.', desc: 'Descripción oficial de Angel.' },
    { id: '2', name: 'Benjamin', slug: 'benjamin', tier: '4★', element: 'Rayo', role: 'Asesino', skills: 'Habilidad especial de Benjamin.', desc: 'Descripción oficial de Benjamin.' },
    { id: '3', name: 'Bonnie', slug: 'bonnie', tier: '4★', element: 'Viento', role: 'Apoyo', skills: 'Habilidad especial de Bonnie.', desc: 'Descripción oficial de Bonnie.' },
    { id: '4', name: 'Brisshell', slug: 'brisshell', tier: '5★', element: 'Tierra', role: 'Asesino', skills: 'Habilidad especial de Brisshell.', desc: 'Descripción oficial de Brisshell.' },
    { id: '5', name: 'Cloud', slug: 'cloud', tier: '4★', element: 'Hielo', role: 'Destructor', skills: 'Habilidad especial de Cloud.', desc: 'Descripción oficial de Cloud.' },
    { id: '6', name: 'Daisy', slug: 'daisy', tier: '4★', element: 'Tierra', role: 'Apoyo', skills: 'Habilidad especial de Daisy.', desc: 'Descripción oficial de Daisy.' },
    { id: '7', name: 'Ellie', slug: 'ellie', tier: '4★', element: 'Tierra', role: 'Destructor', skills: 'Habilidad especial de Ellie.', desc: 'Descripción oficial de Ellie.' },
    { id: '8', name: 'Esther', slug: 'esther', tier: '5★', element: 'Viento', role: 'Asesino', skills: 'Habilidad especial de Esther.', desc: 'Descripción oficial de Esther.' },
    { id: '9', name: 'Flare', slug: 'flare', tier: '5★', element: 'Fuego', role: 'Destructor', skills: 'Habilidad especial de Flare.', desc: 'Descripción oficial de Flare.' },
    { id: '10', name: 'Francis', slug: 'francis', tier: '4★', element: 'Tierra', role: 'Apoyo', skills: 'Habilidad especial de Francis.', desc: 'Descripción oficial de Francis.' },
    { id: '11', name: 'Francis Verano', slug: 'francis_verano', tier: '5★', element: 'Tierra', role: 'Apoyo', skills: 'Habilidad especial de Francis Verano.', desc: 'Descripción oficial de Francis Verano.' },
    { id: '12', name: 'Gabi', slug: 'gabi', tier: '5★', element: 'Tierra', role: 'Luchador', skills: 'Habilidad especial de Gabi.', desc: 'Descripción oficial de Gabi.' },
    { id: '13', name: 'Isabella', slug: 'isabella', tier: '5★', element: 'Hielo', role: 'Destructor', skills: 'Habilidad especial de Isabella.', desc: 'Descripción oficial de Isabella.' },
    { id: '14', name: 'Jiwon', slug: 'jiwon', tier: '5★', element: 'Viento', role: 'Apoyo', skills: 'Habilidad especial de Jiwon.', desc: 'Descripción oficial de Jiwon.' },
    { id: '15', name: 'Leeho', slug: 'leeho', tier: '4★', element: 'Fuego', role: 'Asesino', skills: 'Habilidad especial de Leeho.', desc: 'Descripción oficial de Leeho.' },
    { id: '16', name: 'Mabel', slug: 'mabel', tier: '5★', element: 'Rayo', role: 'Destructor', skills: 'Habilidad especial de Mabel.', desc: 'Descripción oficial de Mabel.' },
    { id: '17', name: 'Mina', slug: 'mina', tier: '5★', element: 'Fuego', role: 'Luchador', skills: 'Habilidad especial de Mina.', desc: 'Descripción oficial de Mina.' },
    { id: '18', name: 'Nagi', slug: 'nagi', tier: '5★', element: 'Viento', role: 'Destructor', skills: 'Habilidad especial de Nagi.', desc: 'Descripción oficial de Nagi.' },
    { id: '19', name: 'Narae', slug: 'narae', tier: '5★', element: 'Hielo', role: 'Apoyo', skills: 'Habilidad especial de Narae.', desc: 'Descripción oficial de Narae.' },
    { id: '20', name: 'Ophelia', slug: 'ophelia', tier: '5★', element: 'Hielo', role: 'Luchador', skills: 'Habilidad especial de Ophelia.', desc: 'Descripción oficial de Ophelia.' },
    { id: '21', name: 'Penny', slug: 'penny', tier: '5★', element: 'Rayo', role: 'Luchador', skills: 'Habilidad especial de Penny.', desc: 'Descripción oficial de Penny.' },
    { id: '22', name: 'Reina', slug: 'reina', tier: '4★', element: 'Rayo', role: 'Destructor', skills: 'Habilidad especial de Reina.', desc: 'Descripción oficial de Reina.' },
    { id: '23', name: 'Sangun', slug: 'sangun', tier: '5★', element: 'Viento', role: 'Luchador', skills: 'Habilidad especial de Sangun.', desc: 'Descripción oficial de Sangun.' },
    { id: '24', name: 'Sera', slug: 'sera', tier: '4★', element: 'Hielo', role: 'Luchador', skills: 'Habilidad especial de Sera.', desc: 'Descripción oficial de Sera.' },
    { id: '25', name: 'Verna', slug: 'verna', tier: '4★', element: 'Fuego', role: 'Luchador', skills: 'Habilidad especial de Verna.', desc: 'Descripción oficial de Verna.' },
    { id: '26', name: 'Verna Verano', slug: 'verna_verano', tier: '5★', element: 'Fuego', role: 'Luchador', skills: 'Habilidad especial de Verna Verano.', desc: 'Descripción oficial de Verna Verano.' },
    { id: '27', name: 'Vivian', slug: 'vivian', tier: '5★', element: 'Fuego', role: 'Apoyo', skills: 'Habilidad especial de Vivian.', desc: 'Descripción oficial de Vivian.' },
    { id: '28', name: 'Yeonhwa', slug: 'yeonhwa', tier: '4★', element: 'Rayo', role: 'Asesino', skills: 'Habilidad especial de Yeonhwa.', desc: 'Descripción oficial de Yeonhwa.' }
  ],

  equipments: [],

  monsterlings: [],

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
