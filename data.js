// ============================================================
// DATOS DE LA GUÍA
// Aquí se añaden, corrigen o completan los personajes.
// No hace falta tocar index.html ni sw.js para cambiar datos.
//
// Para añadir un personaje, copia una línea existente, cambia
// los valores y guarda. El "id" debe ser en minúsculas, sin
// espacios (usa guion bajo), y debe coincidir con el nombre
// del icono: character_<id>_00.png
// ============================================================

// Carpeta donde están los iconos de los personajes
const CARPETA_ICONOS = "assets/images/Character_Icon/";

// Devuelve la ruta del icono de un personaje
function iconoDe(p) {
  return `${CARPETA_ICONOS}character_${p.id}_00.png`;
}

// Ficha de build vacía. Rellénala cuando tengas los datos.
function vacio() {
  return {
    equipamiento: [],
    artefacto: "",
    monsterlings: [],
    monstruoLegendario: "",
    equipoRecomendado: []
  };
}

const PERSONAJES = [
  { id: 'angel', name: 'Angel', tier: '4★', element: 'Fuego', role: 'Asesino', build: vacio() },
  { id: 'benjamin', name: 'Benjamin', tier: '4★', element: 'Rayo', role: 'Asesino', build: vacio() },
  { id: 'bonnie', name: 'Bonnie', tier: '4★', element: 'Viento', role: 'Apoyo', build: vacio() },
  { id: 'brisshell', name: 'Brisshell', tier: '5★', element: 'Tierra', role: 'Asesino', build: vacio() },
  { id: 'cloud', name: 'Cloud', tier: '4★', element: 'Hielo', role: 'Destructor', build: vacio() },
  { id: 'daisy', name: 'Daisy', tier: '4★', element: 'Tierra', role: 'Apoyo', build: vacio() },
  { id: 'ellie', name: 'Ellie', tier: '4★', element: 'Tierra', role: 'Destructor', build: vacio() },
  { id: 'esther', name: 'Esther', tier: '5★', element: 'Viento', role: 'Asesino', build: vacio() },
  { id: 'flare', name: 'Flare', tier: '5★', element: 'Fuego', role: 'Destructor', build: vacio() },
  { id: 'francis', name: 'Francis', tier: '4★', element: 'Tierra', role: 'Apoyo', build: vacio() },
  { id: 'francis_verano', name: 'Francis Verano', tier: '5★', element: 'Tierra', role: 'Apoyo', build: vacio() },
  { id: 'gabi', name: 'Gabi', tier: '5★', element: 'Tierra', role: 'Luchador', build: vacio() },
  { id: 'isabella', name: 'Isabella', tier: '5★', element: 'Hielo', role: 'Destructor', build: vacio() },
  { id: 'jiwon', name: 'Jiwon', tier: '5★', element: 'Viento', role: 'Apoyo', build: vacio() },
  { id: 'leeho', name: 'Leeho', tier: '4★', element: 'Fuego', role: 'Asesino', build: vacio() },
  { id: 'mabel', name: 'Mabel', tier: '5★', element: 'Rayo', role: 'Destructor', build: vacio() },
  { id: 'mina', name: 'Mina', tier: '5★', element: 'Fuego', role: 'Luchador', build: vacio() },
  { id: 'nagi', name: 'Nagi', tier: '5★', element: 'Viento', role: 'Destructor', build: vacio() },
  { id: 'narae', name: 'Narae', tier: '5★', element: 'Hielo', role: 'Apoyo', build: vacio() },
  { id: 'ophelia', name: 'Ophelia', tier: '5★', element: 'Hielo', role: 'Luchador', build: vacio() },
  { id: 'penny', name: 'Penny', tier: '5★', element: 'Rayo', role: 'Luchador', build: vacio() },
  { id: 'reina', name: 'Reina', tier: '4★', element: 'Rayo', role: 'Destructor', build: vacio() },
  { id: 'sangun', name: 'Sangun', tier: '5★', element: 'Viento', role: 'Luchador', build: vacio() },
  { id: 'sera', name: 'Sera', tier: '4★', element: 'Hielo', role: 'Luchador', build: vacio() },
  { id: 'verna', name: 'Verna', tier: '4★', element: 'Fuego', role: 'Luchador', build: vacio() },
  { id: 'verna_verano', name: 'Verna Verano', tier: '5★', element: 'Fuego', role: 'Luchador', build: vacio() },
  { id: 'vivian', name: 'Vivian', tier: '5★', element: 'Fuego', role: 'Apoyo', build: vacio() },
  { id: 'yeonhwa', name: 'Yeonhwa', tier: '4★', element: 'Rayo', role: 'Asesino', build: vacio() }
];
