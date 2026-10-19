// ============================================================
// DATOS DE LA GUÍA
// Aquí se añaden, corrigen o completan los personajes y equipos.
// No hace falta tocar index.html ni sw.js para cambiar datos.
//
// Para añadir un personaje, copia una línea existente, cambia
// los valores y guarda. El "id" debe ser en minúsculas, sin
// espacios (usa guion bajo), y debe coincidir con el nombre
// del icono: character_<id>_00.png
//
// Equipos: cada equipo tiene dos grupos como máximo. Cada grupo
// indica el conjunto y las piezas: 1 casco, 2 pechera,
// 3 guantes, 4 calzado.
// ============================================================

// Carpetas de los iconos
const CARPETA_ICONOS = "assets/images/Character_Icon/";
const CARPETA_ARTEFACTOS = "assets/images/Artifact_Icon/";
const CARPETA_EQUIPO = "assets/images/Equipment_Icon/";
const CARPETA_MONSTER = "assets/images/Monsterling_Icon/";

// Nombre de cada pieza dentro del archivo del icono
const PIEZA_ICONO = { 1: "casco", 2: "pechera", 3: "guantes", 4: "calzado" };

// Convierte un nombre en parte de un archivo: "caída en desgracia" -> "caida_en_desgracia"
function nombreArchivo(t) {
  return String(t)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

// Devuelve la ruta del icono de un personaje
function iconoDe(p) {
  return `${CARPETA_ICONOS}character_${p.id}_00.png`;
}

// Devuelve la ruta del icono del artefacto de un personaje
function artefactoIconoDe(p) {
  return `${CARPETA_ARTEFACTOS}artifact_${nombreArchivo(p.artefacto)}_00.png`;
}

// Devuelve la ruta del icono de un monsterling (según su nombre)
function iconoMonster(nombre) {
  return `${CARPETA_MONSTER}${nombreArchivo(nombre)}.png`;
}

// Devuelve la ruta del icono de una pieza de un conjunto
function iconoConjunto(clave, pieza) {
  return `${CARPETA_EQUIPO}${clave}_${PIEZA_ICONO[pieza]}.png`;
}

// Conjuntos de equipamiento: efecto de 2 piezas y de 4 piezas (null si no tiene)
const CONJUNTOS = {
  'abismo': { nombre: 'Abismo', dos: 'Daño de viento +10 % durante 5 s al usar una habilidad especial', cuatro: 'Daño de viento +10 % durante 5 s al asestar un golpe crítico' },
  'arbol_milenario': { nombre: 'Arbol milenario', dos: 'Daño de fuego de todos los compañeros +7,5% durante 5s al usar una habilidad de apoyo', cuatro: null },
  'banquete_grandioso_de_gloton': { nombre: 'Banquete grandioso de gloton', dos: 'Res al fuego del objetivo -6% durante 5s al impactar con una habilidad de relevo', cuatro: null },
  'corazon_de_escarcha_eterna': { nombre: 'Corazón de escarcha eterna', dos: 'Daño de aturdimiento de ataque de rayo +7,5%', cuatro: null },
  'destructor_despiadado': { nombre: 'Destructor despiadado', dos: 'Los ataques básicos infligen 5% mas de daño de viento', cuatro: 'Al usar la habilidad suprema, la res a viento del objetivo se reduce en 10% durante 5s' },
  'devorador_del_abismo': { nombre: 'Devorador del abismo', dos: 'Daño de neutralización de ataque de hielo +7,5%', cuatro: null },
  'el_sin_nombre': { nombre: 'El sin nombre', dos: 'Los ataque básicos infligen 5% mas de daño de viento', cuatro: 'Al usar una habilidad suprema, la res a viento del objetivo se reduce un 10% durante 5s' },
  'espiritu_de_lucha_zorro_youkai': { nombre: 'Espiritu de lucha zorro youkai', dos: 'Res al rayo -6% durante 5s al usar una habilidad de relevo', cuatro: null },
  'flores_en_todo_su_esplendor': { nombre: 'Flores en todo su esplendor', dos: 'Daño de hielo +7,5% durante 5s al usar una habilidad especial', cuatro: null },
  'juez': { nombre: 'Juez', dos: 'Daño de hielo +10% durante 5s al usar una habilidad de cambio', cuatro: 'Daño de hielo +10% al atacar a un enemigo con aflicción de hielo' },
  'nivel_de_gloton': { nombre: 'Nivel de gloton', dos: 'Res de viento del objetivo -6% durante 5s al ejecutar con éxito una habilidad especial', cuatro: 'Índice de crítico de todos los compañeros +6% durante 5s al usar una habilidad de relevo' },
  'noche_de_luna_llena': { nombre: 'Noche de luna llena', dos: 'Daño de fuego +7,5% durante 5s al usar una habilidad especial', cuatro: 'Daño de fuego +7,5% al atacar a un enemigo con aflicción de fuego' },
  'piedra_ancestral': { nombre: 'Piedra ancestral', dos: 'Daño de neutralización de ataque de viento +7,5%', cuatro: null },
  'poder_imponente_del_monte_tai': { nombre: 'Poder imponente del monte tai', dos: 'Índice de crítico +5% durante 5s al usar una habilidad de cambio', cuatro: 'Daño de rayo +7,5% durante 5s al usar una habilidad especial' },
  'rey_espiritual': { nombre: 'Rey espiritual', dos: 'Daño de rayo +8 % durante 3 s al usar un ataque básico', cuatro: 'Daño de rayo +10 % al atacar a un enemigo con aflicción de rayo' },
  'ritos_del_general_victorioso': { nombre: 'Ritos del general victorioso', dos: 'Daño de neutralización de ataque de tierra +7,5%', cuatro: null },
  'rugido_de_hanul': { nombre: 'Rugido de hanul', dos: 'Daño de fuego +10 % durante 5 s al usar una habilidad suprema', cuatro: 'Daño crítico +10 % al atacar a un enemigo con aflicción de fuego' },
  'senor_de_la_cienaga': { nombre: 'Señor de la ciénaga', dos: 'Daño de hielo de todos los compañeros +5% durante 5s al conceder un escudo', cuatro: 'Daño de debilidad elemental recibido por el objetivo +10% durante 5s al atacar a un enemigo que sufra aflicción de hielo y aturdimiento' },
  'sirius': { nombre: 'Sirius', dos: 'Daño de tierra de todos los compañeros +7,5% durante 5s al usar una habilidad de apoyo', cuatro: 'Daño de apoyo +7,5% durante 5s al usar una habilidad de cambio' },
  'tirano_del_bosque': { nombre: 'Tirano del bosque', dos: 'Daño de hielo +7,5% durante 3s al usar un ataque básico', cuatro: 'Índice de crítico +5% durante 5s al atacar a un enemigo con aflicción de hielo' },
  'vanguardia_de_victoria': { nombre: 'Vanguardia de victoria', dos: 'Daño de debilidad elemental del objetivo recibido +10% durante 5s al atacar a un enemigo con aflicción de tierra', cuatro: null },
  'viento_de_poniente': { nombre: 'Viento de poniente', dos: 'Daño de tierra +8 % durante 3 s al usar un ataque básico', cuatro: 'Daño de tierra +10 % durante 5 s al usar una habilidad de cambio contra un enemigo con aflicción de tierra' }
};

const PERSONAJES = [
  { id: 'angel', name: 'Angel', tier: '4★', element: 'Fuego', role: 'Asesino', rol: 'SubDPS', rango: 'A distancia', artefacto: 'Caida en desgracia', equipos: [[{ conjunto: 'noche_de_luna_llena', piezas: [1, 2, 3, 4] }], [{ conjunto: 'arbol_milenario', piezas: [1, 2] }, { conjunto: 'noche_de_luna_llena', piezas: [3, 4] }]], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Guardian de el dorado', dos: 'Gulgak', tres: 'Amon', legendario: 'Reginula' } },
  { id: 'benjamin', name: 'Benjamin', tier: '4★', element: 'Rayo', role: 'Asesino', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'Vuelo de halcon', equipos: [[{ conjunto: 'rey_espiritual', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Raptor fidelis', dos: 'Gulgak', tres: 'Lechona', legendario: 'Reginula' } },
  { id: 'bonnie', name: 'Bonnie', tier: '4★', element: 'Viento', role: 'Apoyo', rol: 'Apoyo', rango: 'A distancia', artefacto: 'Miembro descoordinado de una banda militar', equipos: [[{ conjunto: 'nivel_de_gloton', piezas: [1, 2, 3, 4] }], []], monsters: { link: 'Guardian de el dorado', dos: 'Olvido', tres: 'Gulgak', legendario: 'Reginula' } },
  { id: 'brisshell', name: 'Brisshell', tier: '5★', element: 'Tierra', role: 'Asesino', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'Anhelo monstruoso', equipos: [[{ conjunto: 'viento_de_poniente', piezas: [1, 2, 3, 4] }], [{ conjunto: 'sirius', piezas: [1, 2, 3, 4] }]], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Secuaz de piedra', dos: 'Scar', tres: 'Coloso ajustado', legendario: 'Reginula' } },
  { id: 'chloe', name: 'Chloe', tier: '5★', element: 'Viento', role: 'Luchador', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'Tren a toda marcha', equipos: [[{ conjunto: 'abismo', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Nagi', dos: 'Secuaz de hielo', tres: 'Horda de chatarra', legendario: 'Reginula' } },
  { id: 'cloud', name: 'Cloud', tier: '4★', element: 'Hielo', role: 'Destructor', rol: 'DPS', rango: 'A distancia', artefacto: 'Aventurero soñador', equipos: [[{ conjunto: 'juez', piezas: [1, 2, 3, 4] }], [{ conjunto: 'flores_en_todo_su_esplendor', piezas: [1, 4] }, { conjunto: 'tirano_del_bosque', piezas: [2, 3] }]], monsters: { link: 'Sombra roja', dos: 'Secuaz de piedra', tres: 'Horda de chatarra', legendario: 'Sorin' } },
  { id: 'daisy', name: 'Daisy', tier: '4★', element: 'Tierra', role: 'Apoyo', rol: 'Apoyo', rango: 'A distancia', artefacto: 'Fragancia forestal', equipos: [[{ conjunto: 'sirius', piezas: [1, 2, 3, 4] }], []], monsters: { link: 'Demonio', dos: 'Custos', tres: 'Odong de la ciénaga', legendario: 'Reginula' } },
  { id: 'ellie', name: 'Ellie', tier: '4★', element: 'Tierra', role: 'Destructor', rol: 'DPS', rango: 'A distancia', artefacto: 'Subidon de azucar', equipos: [[{ conjunto: 'viento_de_poniente', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Secuaz de piedra', dos: 'Secuaz de hielo', tres: 'Scar', legendario: 'Reginula' } },
  { id: 'esther', name: 'Esther', tier: '5★', element: 'Viento', role: 'Asesino', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'Escoba de los vientos', equipos: [[{ conjunto: 'abismo', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Nagi', dos: 'Secuaz de hielo', tres: 'Horda de chatarra', legendario: 'Reginula' } },
  { id: 'flare', name: 'Flare', tier: '5★', element: 'Fuego', role: 'Destructor', rol: 'DPS/SubDPS', rango: 'A distancia', artefacto: 'Fuego de dragon exquisito', equipos: [[{ conjunto: 'noche_de_luna_llena', piezas: [1, 2, 3, 4] }], [{ conjunto: 'banquete_grandioso_de_gloton', piezas: [1, 2] }, { conjunto: 'noche_de_luna_llena', piezas: [3, 4] }]], monsters: { link: 'Guardian de el dorado', dos: 'Secuaz de hielo', tres: 'Gulgak', legendario: 'Reginula' } },
  { id: 'francis', name: 'Francis', tier: '4★', element: 'Tierra', role: 'Apoyo', rol: 'Apoyo', rango: 'A distancia', artefacto: 'Plenitud de amor', equipos: [[{ conjunto: 'sirius', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Demonio', dos: 'Custos', tres: 'Odong de la ciénaga', legendario: 'Reginula' } },
  { id: 'francis_verano', name: 'Francis Verano', tier: '5★', element: 'Tierra', role: 'Apoyo', rol: 'Apoyo', rango: 'A distancia', artefacto: 'Un verano empapado de amor', equipos: [[{ conjunto: 'sirius', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Demonio', dos: 'Custos', tres: 'Odong de la ciénaga', legendario: 'Reginula' } },
  { id: 'gabi', name: 'Gabi', tier: '5★', element: 'Tierra', role: 'Luchador', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'Aquel ante quien se arrodillan los dokkaebi', equipos: [[{ conjunto: 'viento_de_poniente', piezas: [1, 2, 3, 4] }], []], monsters: { link: 'Secuaz de piedra', dos: 'Scar', tres: 'Coloso ajustado', legendario: 'Reginula' } },
  { id: 'isabella', name: 'Isabella', tier: '5★', element: 'Hielo', role: 'Destructor', rol: 'DPS/SubDPS', rango: 'A distancia', artefacto: 'Superconductor estabilizado', equipos: [[{ conjunto: 'juez', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Neutralización'], monsters: { link: 'Sombra azul', dos: 'Secuaz de hielo', tres: 'Luppo de sombra lunar', legendario: 'Sorin' } },
  { id: 'jiwon', name: 'Jiwon', tier: '5★', element: 'Viento', role: 'Apoyo', rol: 'Apoyo', rango: 'A distancia', artefacto: 'Melodia interpretada con fibras del corazon', equipos: [[{ conjunto: 'nivel_de_gloton', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Guardian de el dorado', dos: 'Olvido', tres: 'Gulgak', legendario: 'Reginula' } },
  { id: 'leeho', name: 'Leeho', tier: '4★', element: 'Fuego', role: 'Asesino', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'Determinacion del cazador de tigres', equipos: [[{ conjunto: 'noche_de_luna_llena', piezas: [1, 2, 3, 4] }], [{ conjunto: 'arbol_milenario', piezas: [1, 2] }, { conjunto: 'noche_de_luna_llena', piezas: [3, 4] }]], monsters: { link: 'Guardian de el dorado', dos: 'Gulgak', tres: 'Amon', legendario: 'Reginula' } },
  { id: 'mabel', name: 'Mabel', tier: '5★', element: 'Rayo', role: 'Destructor', rol: 'DPS', rango: 'A distancia', artefacto: 'Recompensa la bondad elimina la maldad', equipos: [[{ conjunto: 'rey_espiritual', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Horda de chatarra', dos: 'Gulgak', tres: 'Lechona', legendario: 'Reginula' } },
  { id: 'mina', name: 'Mina', tier: '5★', element: 'Fuego', role: 'Luchador', rol: 'DPS', rango: 'A distancia', artefacto: 'Kumiho ardiente', equipos: [[{ conjunto: 'noche_de_luna_llena', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Duoxini', dos: 'Secuaz de hielo', tres: 'Scar', legendario: 'Reginula' } },
  { id: 'nagi', name: 'Nagi', tier: '5★', element: 'Viento', role: 'Destructor', rol: 'SubDPS', rango: 'A distancia', artefacto: 'Escama blanca del dragon serpenteante', equipos: [[{ conjunto: 'abismo', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Neutralización'], monsters: { link: 'Demonio', dos: 'Horda limpia', tres: 'Amon', legendario: 'Reginula' } },
  { id: 'narae', name: 'Narae', tier: '5★', element: 'Hielo', role: 'Apoyo', rol: 'Apoyo', rango: 'A distancia', artefacto: 'Rocio bordador de llanuras', equipos: [[{ conjunto: 'senor_de_la_cienaga', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Blanquin', dos: 'Gulgak', tres: 'Amon', legendario: 'Sorin' } },
  { id: 'ophelia', name: 'Ophelia', tier: '5★', element: 'Hielo', role: 'Luchador', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'Veredicto gelido', equipos: [[{ conjunto: 'juez', piezas: [1, 2, 3, 4] }], [{ conjunto: 'flores_en_todo_su_esplendor', piezas: [1, 4] }, { conjunto: 'tirano_del_bosque', piezas: [2, 3] }]], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Sombra roja', dos: 'Secuaz de hielo', tres: 'Scar', legendario: 'Sorin' } },
  { id: 'penny', name: 'Penny', tier: '5★', element: 'Rayo', role: 'Luchador', rol: 'DPS', rango: 'A distancia', artefacto: 'Inversion inteligente', equipos: [[{ conjunto: 'rey_espiritual', piezas: [1, 2, 3, 4] }], []], monsters: { link: 'Horda de chatarra', dos: 'Scar', tres: 'Lechona', legendario: 'Reginula' } },
  { id: 'reina', name: 'Reina', tier: '4★', element: 'Rayo', role: 'Destructor', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'Caballeria implacable', equipos: [[{ conjunto: 'rey_espiritual', piezas: [1, 2, 3, 4] }], []], monsters: { link: 'Raptor fidelis', dos: 'Gulgak', tres: 'Lechona', legendario: 'Reginula' } },
  { id: 'sangun', name: 'Sangun', tier: '5★', element: 'Viento', role: 'Luchador', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'Amigo de la naturaleza', equipos: [[{ conjunto: 'abismo', piezas: [1, 2, 3, 4] }], []], monsters: { link: 'Nagi', dos: 'Secuaz de hielo', tres: 'Horda de chatarra', legendario: 'Reginula' } },
  { id: 'sera', name: 'Sera', tier: '4★', element: 'Hielo', role: 'Luchador', rol: 'DPS', rango: 'Cuerpo a cuerpo', artefacto: 'La llave de futuras cerraduras', equipos: [[{ conjunto: 'juez', piezas: [1, 2, 3, 4] }], [{ conjunto: 'flores_en_todo_su_esplendor', piezas: [1, 4] }, { conjunto: 'tirano_del_bosque', piezas: [2, 3] }]], monsters: { link: 'Sombra azul', dos: 'Secuaz de hielo', tres: 'Horda de chatarra', legendario: 'Sorin' } },
  { id: 'verna', name: 'Verna', tier: '4★', element: 'Fuego', role: 'Luchador', rol: 'SubDPS', rango: 'Cuerpo a cuerpo', artefacto: 'Espada de fuego honesta', equipos: [[{ conjunto: 'noche_de_luna_llena', piezas: [1, 2, 3, 4] }], []], monsters: { link: 'Duoxini', dos: 'Secuaz de hielo', tres: 'Scar', legendario: 'Reginula' } },
  { id: 'verna_verano', name: 'Verna Verano', tier: '5★', element: 'Fuego', role: 'Luchador', rol: 'DPS/SubDPS', rango: 'Cuerpo a cuerpo', artefacto: 'La llama que suena con la justicia', equipos: [[{ conjunto: 'noche_de_luna_llena', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Reducción de recarga'], monsters: { link: 'Duoxini', dos: 'Secuaz de hielo', tres: 'Scar', legendario: 'Reginula' } },
  { id: 'vivian', name: 'Vivian', tier: '5★', element: 'Fuego', role: 'Apoyo', rol: 'Apoyo', rango: 'Cuerpo a cuerpo', artefacto: 'Final sin fin', equipos: [[{ conjunto: 'arbol_milenario', piezas: [1, 2] }, { conjunto: 'noche_de_luna_llena', piezas: [3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Reducción de recarga', 'Apoyo'], monsters: { link: 'Demonio', dos: 'Amon', tres: 'Ragnadon', legendario: 'Reginula' } },
  { id: 'yeonhwa', name: 'Yeonhwa', tier: '4★', element: 'Rayo', role: 'Asesino', rol: 'SubDPS', rango: 'Cuerpo a cuerpo', artefacto: 'Loto sombrio', equipos: [[{ conjunto: 'rey_espiritual', piezas: [1, 2, 3, 4] }], []], rasgos: ['Daño a Jefes', 'Debilidad elemental', 'Daño Crítico', 'Daño de rayo'], monsters: { link: 'Guardian de el dorado', dos: 'Asaltante cuchara', tres: 'Amon', legendario: 'Reginula' } }
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

// Equipos recomendados por elemento. Cada equipo son 3 personajes (id de PERSONAJES)
const EQUIPOS_RECOMENDADOS = [
  { elemento: 'Hielo', equipos: [
    ['narae', 'isabella', 'ophelia']
  ] },
  { elemento: 'Fuego', equipos: [
    ['mina', 'vivian', 'verna_verano'],
    ['angel', 'vivian', 'mina'],
    ['angel', 'vivian', 'verna_verano']
  ] },
  { elemento: 'Tierra', equipos: [
    ['brisshell', 'francis_verano', 'ellie'],
    ['brisshell', 'francis', 'ellie']
  ] },
  { elemento: 'Rayo', equipos: [
    ['yeonhwa', 'francis', 'benjamin'],
    ['yeonhwa', 'francis', 'mabel']
  ] },
  { elemento: 'Viento', equipos: [
    ['jiwon', 'nagi', 'esther'],
    ['jiwon', 'nagi', 'chloe']
  ] }
];
