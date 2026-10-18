// ============================================================
// DATOS DE LA GUÍA
// Aquí se añaden, corrigen o completan los personajes.
// No hace falta tocar index.html ni sw.js para cambiar datos.
//
// Para añadir un personaje, copia una línea existente, cambia
// los valores y guarda. El "id" debe ser en minúsculas, sin
// espacios (usa guion bajo), y debe coincidir con el nombre
// del icono: character_<id>_00.png
// Los iconos de artefactos se buscan con el nombre del
// artefacto: artifact_<nombre_del_artefacto>_00.png
// ============================================================

// Carpeta donde están los iconos de los personajes
const CARPETA_ICONOS = "assets/images/Character_Icon/";

// Carpeta donde están los iconos de los artefactos
const CARPETA_ARTEFACTOS = "assets/images/Artifact_Icon/";

// Devuelve la ruta del icono de un personaje
function iconoDe(p) {
  return `${CARPETA_ICONOS}character_${p.id}_00.png`;
}

// Convierte un nombre en parte de un archivo: "caída en desgracia" -> "caida_en_desgracia"
function nombreArchivo(t) {
  return String(t)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

// Devuelve la ruta del icono del artefacto de un personaje
function artefactoIconoDe(p) {
  return `${CARPETA_ARTEFACTOS}artifact_${nombreArchivo(p.artefacto)}_00.png`;
}

// Ficha de build vacía. Rellénala cuando tengas los datos.
function vacio() {
  return {
    ataques: [],        // { nombre: "...", descripcion: "..." }
    despertares: [],    // texto
    artefactos: [],     // texto
    equipamientos: [],  // texto
    monsterlings: []    // texto
  };
}

const PERSONAJES = [
  { id: 'angel', name: 'Angel', tier: '4★', element: 'Fuego', role: 'Asesino', rango: 'A distancia', artefacto: 'Caida en desgracia', build: vacio() },
  { id: 'benjamin', name: 'Benjamin', tier: '4★', element: 'Rayo', role: 'Asesino', rango: 'Cuerpo a cuerpo', artefacto: 'Vuelo de halcon', build: vacio() },
  { id: 'bonnie', name: 'Bonnie', tier: '4★', element: 'Viento', role: 'Apoyo', rango: 'A distancia', artefacto: 'Miembro descoordinado de una banda militar', build: vacio() },
  { id: 'brisshell', name: 'Brisshell', tier: '5★', element: 'Tierra', role: 'Asesino', rango: 'Cuerpo a cuerpo', artefacto: 'Anhelo monstruoso', build: vacio() },
  { id: 'chloe', name: 'Chloe', tier: '5★', element: 'Viento', role: 'Luchador', rango: 'Cuerpo a cuerpo', artefacto: 'Tren a toda marcha', build: vacio() },
  { id: 'cloud', name: 'Cloud', tier: '4★', element: 'Hielo', role: 'Destructor', rango: 'A distancia', artefacto: 'Aventurero soñador', build: vacio() },
  { id: 'daisy', name: 'Daisy', tier: '4★', element: 'Tierra', role: 'Apoyo', rango: 'A distancia', artefacto: 'Fragancia forestal', build: vacio() },
  { id: 'ellie', name: 'Ellie', tier: '4★', element: 'Tierra', role: 'Destructor', rango: 'A distancia', artefacto: 'Subidon de azucar', build: vacio() },
  { id: 'esther', name: 'Esther', tier: '5★', element: 'Viento', role: 'Asesino', rango: 'Cuerpo a cuerpo', artefacto: 'Escoba de los vientos', build: vacio() },
  { id: 'flare', name: 'Flare', tier: '5★', element: 'Fuego', role: 'Destructor', rango: 'A distancia', artefacto: 'Fuego de dragon exquisito', build: vacio() },
  { id: 'francis', name: 'Francis', tier: '4★', element: 'Tierra', role: 'Apoyo', rango: 'A distancia', artefacto: 'Plenitud de amor', build: vacio() },
  { id: 'francis_verano', name: 'Francis Verano', tier: '5★', element: 'Tierra', role: 'Apoyo', rango: 'A distancia', artefacto: 'Un verano empapado de amor', build: vacio() },
  { id: 'gabi', name: 'Gabi', tier: '5★', element: 'Tierra', role: 'Luchador', rango: 'Cuerpo a cuerpo', artefacto: 'Aquel ante quien se arrodillan los dokkaebi', build: vacio() },
  { id: 'isabella', name: 'Isabella', tier: '5★', element: 'Hielo', role: 'Destructor', rango: 'A distancia', artefacto: 'Superconductor estabilizado', build: vacio() },
  { id: 'jiwon', name: 'Jiwon', tier: '5★', element: 'Viento', role: 'Apoyo', rango: 'A distancia', artefacto: 'Melodia interpretada con fibras del corazon', build: vacio() },
  { id: 'leeho', name: 'Leeho', tier: '4★', element: 'Fuego', role: 'Asesino', rango: 'Cuerpo a cuerpo', artefacto: 'Determinacion del cazador de tigres', build: vacio() },
  { id: 'mabel', name: 'Mabel', tier: '5★', element: 'Rayo', role: 'Destructor', rango: 'A distancia', artefacto: 'Recompensa la bondad elimina la maldad', build: vacio() },
  { id: 'mina', name: 'Mina', tier: '5★', element: 'Fuego', role: 'Luchador', rango: 'A distancia', artefacto: 'Kumiho ardiente', build: vacio() },
  { id: 'nagi', name: 'Nagi', tier: '5★', element: 'Viento', role: 'Destructor', rango: 'A distancia', artefacto: 'Escama blanca del dragon serpenteante', build: vacio() },
  { id: 'narae', name: 'Narae', tier: '5★', element: 'Hielo', role: 'Apoyo', rango: 'A distancia', artefacto: 'Rocio bordador de llanuras', build: vacio() },
  { id: 'ophelia', name: 'Ophelia', tier: '5★', element: 'Hielo', role: 'Luchador', rango: 'Cuerpo a cuerpo', artefacto: 'Veredicto gelido', build: vacio() },
  { id: 'penny', name: 'Penny', tier: '5★', element: 'Rayo', role: 'Luchador', rango: 'A distancia', artefacto: 'Inversion inteligente', build: vacio() },
  { id: 'reina', name: 'Reina', tier: '4★', element: 'Rayo', role: 'Destructor', rango: 'Cuerpo a cuerpo', artefacto: 'Caballeria implacable', build: vacio() },
  { id: 'sangun', name: 'Sangun', tier: '5★', element: 'Viento', role: 'Luchador', rango: 'Cuerpo a cuerpo', artefacto: 'Amigo de la naturaleza', build: vacio() },
  { id: 'sera', name: 'Sera', tier: '4★', element: 'Hielo', role: 'Luchador', rango: 'Cuerpo a cuerpo', artefacto: 'La llave de futuras cerraduras', build: vacio() },
  { id: 'verna', name: 'Verna', tier: '4★', element: 'Fuego', role: 'Luchador', rango: 'Cuerpo a cuerpo', artefacto: 'Espada de fuego honesta', build: vacio() },
  { id: 'verna_verano', name: 'Verna Verano', tier: '5★', element: 'Fuego', role: 'Luchador', rango: 'Cuerpo a cuerpo', artefacto: 'La llama que suena con la justicia', build: vacio() },
  { id: 'vivian', name: 'Vivian', tier: '5★', element: 'Fuego', role: 'Apoyo', rango: 'Cuerpo a cuerpo', artefacto: 'Final sin fin', build: vacio() },
  { id: 'yeonhwa', name: 'Yeonhwa', tier: '4★', element: 'Rayo', role: 'Asesino', rango: 'Cuerpo a cuerpo', artefacto: 'Loto sombrio', build: vacio() }
];

// Descripciones de los roles (se muestran en Inicio)
const ROLES = [
  {
    nombre: 'Apoyo',
    descripcion: 'Destaca apoyando al equipo. El daño de apoyo aumenta en función del dominio de Apoyo del personaje de apoyo.'
  },
  {
    nombre: 'Asesino',
    descripcion: 'Destaca en infligir daño masivo al aprovechar los descuidos del enemigo. El daño de contención aumenta en función del dominio de Asesino del asesino.'
  },
  {
    nombre: 'Destructor',
    descripcion: 'Destaca en los combates contra jefes. El daño de neutralización aumenta en función del dominio de Destructor del destructor.'
  },
  {
    nombre: 'Luchador',
    descripcion: 'Destaca en batallas de combate cuerpo a cuerpo en las que luchan aliados y enemigos y reina el caos. El daño de refriega aumenta en función del dominio de Lucha del luchador.'
  }
];
