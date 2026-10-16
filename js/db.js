const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3659/3659738.png';

const DB = {
  characters: [
    { id: 'c1', name: 'Angel', slug: 'angel', element: 'Fuego', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Especialista en emboscadas y daño masivo de fuego.', desc: 'Personaje de elemento Fuego, rol Asesino y grado 4 estrellas.' },
    { id: 'c2', name: 'Benjamin', slug: 'benjamin', element: 'Rayo', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Ataques relámpago dirigidos a objetivos vulnerables.', desc: 'Personaje de elemento Rayo, rol Asesino y grado 4 estrellas.' },
    { id: 'c3', name: 'Bonnie', slug: 'bonnie', element: 'Viento', tier: '4★', role: 'Apoyo', weapon: 'Por definir', skills: 'Potenciación de velocidad y ráfagas de viento de soporte.', desc: 'Personaje de elemento Viento, rol Apoyo y grado 4 estrellas.' },
    { id: 'c4', name: 'Brisshell', slug: 'brisshell', element: 'Tierra', tier: '5★', role: 'Asesino', weapon: 'Por definir', skills: 'Ataques subterráneos fulminantes con elemento tierra.', desc: 'Personaje de elemento Tierra, rol Asesino y grado 5 estrellas.' },
    { id: 'c5', name: 'Cloud', slug: 'cloud', element: 'Hielo', tier: '4★', role: 'Destructor', weapon: 'Por definir', skills: 'Impactos helados que quiebran escudos enemigos.', desc: 'Personaje de elemento Hielo, rol Destructor y grado 4 estrellas.' },
    { id: 'c6', name: 'Daisy', slug: 'daisy', element: 'Tierra', tier: '4★', role: 'Apoyo', weapon: 'Por definir', skills: 'Barreras protectoras y curación de área.', desc: 'Personaje de elemento Tierra, rol Apoyo y grado 4 estrellas.' },
    { id: 'c7', name: 'Ellie', slug: 'ellie', element: 'Tierra', tier: '4★', role: 'Destructor', weapon: 'Por definir', skills: 'Ruptura de defensas blindadas con fuerza sísmica.', desc: 'Personaje de elemento Tierra, rol Destructor y grado 4 estrellas.' },
    { id: 'c8', name: 'Esther', slug: 'esther', element: 'Viento', tier: '5★', role: 'Asesino', weapon: 'Por definir', skills: 'Cortes ágiles de viento con alto índice crítico.', desc: 'Personaje de elemento Viento, rol Asesino y grado 5 estrellas.' },
    { id: 'c9', name: 'Flare', slug: 'flare', element: 'Fuego', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Explosiones termales destructivas en área.', desc: 'Personaje de elemento Fuego, rol Destructor y grado 5 estrellas.' },
    { id: 'c10', name: 'Francis', slug: 'francis', element: 'Tierra', tier: '4★', role: 'Apoyo', weapon: 'Por definir', skills: 'Regeneración constante de energía para el equipo.', desc: 'Personaje de elemento Tierra, rol Apoyo y grado 4 estrellas.' },
    { id: 'c11', name: 'Francis Verano', slug: 'francis_verano', element: 'Tierra', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Versión veraniega con soporte y barreras potenciadas.', desc: 'Personaje de elemento Tierra, rol Apoyo y grado 5 estrellas.' },
    { id: 'c12', name: 'Gabi', slug: 'gabi', element: 'Tierra', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Combate cuerpo a cuerpo incansable de alta resistencia.', desc: 'Personaje de elemento Tierra, rol Luchador y grado 5 estrellas.' },
    { id: 'c13', name: 'Isabella', slug: 'isabella', element: 'Hielo', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Congelación profunda y demolición masiva.', desc: 'Personaje de elemento Hielo, rol Destructor y grado 5 estrellas.' },
    { id: 'c14', name: 'Jiwon', slug: 'jiwon', element: 'Viento', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Amplificación de ataque y curación brisa.', desc: 'Personaje de elemento Viento, rol Apoyo y grado 5 estrellas.' },
    { id: 'c15', name: 'Leeho', slug: 'leeho', element: 'Fuego', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Ráfagas de fuego a gran velocidad.', desc: 'Personaje de elemento Fuego, rol Asesino y grado 4 estrellas.' },
    { id: 'c16', name: 'Mabel', slug: 'mabel', element: 'Rayo', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Descargas eléctricas de choque continuo.', desc: 'Personaje de elemento Rayo, rol Destructor y grado 5 estrellas.' },
    { id: 'c17', name: 'Mina', slug: 'mina', element: 'Fuego', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Artes marciales ignígeras de alto impacto.', desc: 'Personaje de elemento Fuego, rol Luchador y grado 5 estrellas.' },
    { id: 'c18', name: 'Nagi', slug: 'nagi', element: 'Viento', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Tornados de alta presión ofensiva contra jefes.', desc: 'Personaje de elemento Viento, rol Destructor y grado 5 estrellas.' },
    { id: 'c19', name: 'Narae', slug: 'narae', element: 'Hielo', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Escudos gélidos y mitigación de daño recibido.', desc: 'Personaje de elemento Hielo, rol Apoyo y grado 5 estrellas.' },
    { id: 'c20', name: 'Ophelia', slug: 'ophelia', element: 'Hielo', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Combate directo enriquecido con congelación.', desc: 'Personaje de elemento Hielo, rol Luchador y grado 5 estrellas.' },
    { id: 'c21', name: 'Penny', slug: 'penny', element: 'Rayo', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Ataques eléctricos continuos e implacables.', desc: 'Personaje de elemento Rayo, rol Luchador y grado 5 estrellas.' },
    { id: 'c22', name: 'Reina', slug: 'reina', element: 'Rayo', tier: '4★', role: 'Destructor', weapon: 'Por definir', skills: 'Demolición de escudos con descargas de alto voltaje.', desc: 'Personaje de elemento Rayo, rol Destructor y grado 4 estrellas.' },
    { id: 'c23', name: 'Sangun', slug: 'sangun', element: 'Viento', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Ofensiva frontal potente impulsada por viento.', desc: 'Personaje de elemento Viento, rol Luchador y grado 5 estrellas.' },
    { id: 'c24', name: 'Sera', slug: 'sera', element: 'Hielo', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Defensa sólida y contraataques congelantes.', desc: 'Personaje de elemento Hielo, rol Luchador y grado 4 estrellas.' },
    { id: 'c25', name: 'Verna', slug: 'verna', element: 'Fuego', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Puños candentes con daño acumulativo.', desc: 'Personaje de elemento Fuego, rol Luchador y grado 4 estrellas.' },
    { id: 'c26', name: 'Verna Verano', slug: 'verna_verano', element: 'Fuego', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Versión veraniega con combate de fuego potenciado.', desc: 'Personaje de elemento Fuego, rol Luchador y grado 5 estrellas.' },
    { id: 'c27', name: 'Vivian', slug: 'vivian', element: 'Fuego', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Soporte cálido con aumentos de daño de fuego al equipo.', desc: 'Personaje de elemento Fuego, rol Apoyo y grado 5 estrellas.' },
    { id: 'c28', name: 'Yeonhwa', slug: 'yeonhwa', element: 'Rayo', tier: '5★', role: 'Asesino', weapon: 'Por definir', skills: 'Ataques sigilosos relámpago de daño crítico masivo.', desc: 'Personaje de elemento Rayo, rol Asesino y grado 5 estrellas.' }
  ],
  equipments: [],
  monsterlings: [],
  artifact: [
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

function getPortraitPath(slug) {
  const cleanSlug = slug.toLowerCase().trim().replace(/\s+/g, '_');
  return `assets/images/Character_Portrait/portrait_${cleanSlug}_00.png`;
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
