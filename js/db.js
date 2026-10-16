const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3659/3659738.png';

const DB = {
  characters: [
    { id: 'c1', name: 'Angel', slug: 'angel', element: 'Fuego', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Destaca en batallas de combate cuerpo a cuerpo y aumento de refriega.', desc: 'Personaje de elemento Fuego, rol Asesino y grado 4 estrellas.' },
    { id: 'c2', name: 'Benjamin', slug: 'benjamin', element: 'Rayo', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Destaca en infligir daño masivo aprovechando descuidos del enemigo.', desc: 'Personaje de elemento Rayo, rol Asesino y grado 4 estrellas.' },
    { id: 'c3', name: 'Bonnie', slug: 'bonnie', element: 'Viento', tier: '4★', role: 'Apoyo', weapon: 'Por definir', skills: 'Destaca en los combates contra jefes y neutralización.', desc: 'Personaje de elemento Viento, rol Apoyo y grado 4 estrellas.' },
    { id: 'c4', name: 'Brisshell', slug: 'brisshell', element: 'Tierra', tier: '5★', role: 'Asesino', weapon: 'Por definir', skills: 'Destaca apoyando al equipo y potenciando el dominio de apoyo.', desc: 'Personaje de elemento Tierra, rol Asesino y grado 5 estrellas.' },
    { id: 'c5', name: 'Cloud', slug: 'cloud', element: 'Hielo', tier: '4★', role: 'Destructor', weapon: 'Por definir', skills: 'Especialista en demolición y ataques de hielo pesados.', desc: 'Personaje de elemento Hielo, rol Destructor y grado 4 estrellas.' },
    { id: 'c6', name: 'Daisy', slug: 'daisy', element: 'Tierra', tier: '4★', role: 'Apoyo', weapon: 'Por definir', skills: 'Aporta bonificadores defensivos y curación de área.', desc: 'Personaje de elemento Tierra, rol Apoyo y grado 4 estrellas.' },
    { id: 'c7', name: 'Ellie', slug: 'ellie', element: 'Tierra', tier: '4★', role: 'Destructor', weapon: 'Por definir', skills: 'Ruptura acelerada de escudos con daño de tierra.', desc: 'Personaje de elemento Tierra, rol Destructor y grado 4 estrellas.' },
    { id: 'c8', name: 'Esther', slug: 'esther', element: 'Viento', tier: '5★', role: 'Asesino', weapon: 'Por definir', skills: 'Golpes críticos fulminantes con velocidad de viento.', desc: 'Personaje de elemento Viento, rol Asesino y grado 5 estrellas.' },
    { id: 'c9', name: 'Flare', slug: 'flare', element: 'Fuego', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Quemadura masiva y daño crítico en área.', desc: 'Personaje de elemento Fuego, rol Destructor y grado 5 estrellas.' },
    { id: 'c10', name: 'Francis', slug: 'francis', element: 'Tierra', tier: '4★', role: 'Apoyo', weapon: 'Por definir', skills: 'Optimiza la regeneración de energía del equipo.', desc: 'Personaje de elemento Tierra, rol Apoyo y grado 4 estrellas.' },
    { id: 'c11', name: 'Francis Verano', slug: 'francis_verano', element: 'Tierra', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Versión estival con soporte mejorado y escudos.', desc: 'Personaje de elemento Tierra, rol Apoyo y grado 5 estrellas.' },
    { id: 'c12', name: 'Gabi', slug: 'gabi', element: 'Tierra', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Combate frontal incansable con alta resistencia.', desc: 'Personaje de elemento Tierra, rol Luchador y grado 5 estrellas.' },
    { id: 'c13', name: 'Isabella', slug: 'isabella', element: 'Hielo', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Congelación y destrucción de defensas blindadas.', desc: 'Personaje de elemento Hielo, rol Destructor y grado 5 estrellas.' },
    { id: 'c14', name: 'Jiwon', slug: 'jiwon', element: 'Viento', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Potenciación de velocidad y curación continua.', desc: 'Personaje de elemento Viento, rol Apoyo y grado 5 estrellas.' },
    { id: 'c15', name: 'Leeho', slug: 'leeho', element: 'Fuego', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Ataques rápidos a quemarropa con fuego.', desc: 'Personaje de elemento Fuego, rol Asesino y grado 4 estrellas.' },
    { id: 'c16', name: 'Mabel', slug: 'mabel', element: 'Rayo', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Descargas eléctricas de alto impacto en área.', desc: 'Personaje de elemento Rayo, rol Destructor y grado 5 estrellas.' },
    { id: 'c17', name: 'Mina', slug: 'mina', element: 'Fuego', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Artes marciales imbuidas en llamas destructivas.', desc: 'Personaje de elemento Fuego, rol Luchador y grado 5 estrellas.' },
    { id: 'c18', name: 'Nagi', slug: 'nagi', element: 'Viento', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Cortes de viento huracanado que desestabilizan jefes.', desc: 'Personaje de elemento Viento, rol Destructor y grado 5 estrellas.' },
    { id: 'c19', name: 'Narae', slug: 'narae', element: 'Hielo', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Escudos glaciales y reducción de daño recibido.', desc: 'Personaje de elemento Hielo, rol Apoyo y grado 5 estrellas.' },
    { id: 'c20', name: 'Ophelia', slug: 'ophelia', element: 'Hielo', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Lucha implacable con flujo de cristales de hielo.', desc: 'Personaje de elemento Hielo, rol Luchador y grado 5 estrellas.' },
    { id: 'c21', name: 'Pippa', slug: 'pippa', element: 'Rayo', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Agilidad eléctrica en combate cuerpo a cuerpo.', desc: 'Personaje de elemento Rayo, rol Luchador y grado 4 estrellas.' },
    { id: 'c22', name: 'Rene', slug: 'rene', element: 'Fuego', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Puños candentes con daño de fuego acumulativo.', desc: 'Personaje de elemento Fuego, rol Luchador y grado 4 estrellas.' },
    { id: 'c23', name: 'Roc', slug: 'roc', element: 'Rayo', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Golpes contundentes cargados de alto voltaje.', desc: 'Personaje de elemento Rayo, rol Luchador y grado 4 estrellas.' },
    { id: 'c24', name: 'Rosaria', slug: 'rosaria', element: 'Fuego', tier: '5★', role: 'Asesino', weapon: 'Por definir', skills: 'Ejecución sigilosa con daño crítico masivo.', desc: 'Personaje de elemento Fuego, rol Asesino y grado 5 estrellas.' },
    { id: 'c25', name: 'Sylvia', slug: 'sylvia', element: 'Hielo', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Emboscadas gélidas con ralentización.', desc: 'Personaje de elemento Hielo, rol Asesino y grado 4 estrellas.' },
    { id: 'c26', name: 'Tate', slug: 'tate', element: 'Viento', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Ataques frontales ágiles asistidos por corriente.', desc: 'Personaje de elemento Viento, rol Luchador y grado 4 estrellas.' },
    { id: 'c27', name: 'Valerie', slug: 'valerie', element: 'Tierra', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Terremotos devastadores contra estructuras y jefes.', desc: 'Personaje de elemento Tierra, rol Destructor y grado 5 estrellas.' },
    { id: 'c28', name: 'William', slug: 'william', element: 'Viento', tier: '4★', role: 'Destructor', weapon: 'Por definir', skills: 'Impactos eólicos de gran presión ofensiva.', desc: 'Personaje de elemento Viento, rol Destructor y grado 4 estrellas.' }
  ],
  equipments: [
    { id: 'e1', name: 'Cañón Estelar C-01', slot: 'Arma', rarity: 'SSR', stat: '+25% Daño Cósmico', effect: 'Aumenta la velocidad de ataque un 15% al acertar golpes críticos.' },
    { id: 'e2', name: 'Escudo de Plasma V2', slot: 'Defensa', rarity: 'SR', stat: '+18% DEF / +10% Vida', effect: 'Absorbe un pulso de daño equivalente al 12% de la vida máxima.' }
  ],
  monsterlings: [
    { id: 'm1', name: 'Astro-Gato', habitat: 'Sector Nebulosa', type: 'Apoyo', passive: '+10% Regeneración de Energía', active: 'Cura un 8% de la vida máxima a todos los aliados en combate.' },
    { id: 'm2', name: 'Drakon de Plasma', habitat: 'Núcleo Volcánico', type: 'Ataque', passive: '+20% Daño de Quemadura', active: 'Dispara un rayo concentrado de plasma en línea recta.' }
  ],
  artifacts: [
    { id: 'a1', name: 'Set del Conquistador Estelar', type: 'Ofensivo', bonus2: '+15% Ataque Total', bonus4: '+35% Daño Crítico contra enemigos con debilidad elemental.' },
    { id: 'a2', name: 'Set del Guardián Abisal', type: 'Defensivo', bonus2: '+20% Vida Máxima', bonus4: 'Otorga un escudo del 15% de vida al iniciar la batalla.' }
  ]
};

// Función robusta para normalizar slugs y apuntar a la ruta exacta de imágenes
function getPortraitPath(slug) {
  const cleanSlug = slug.toLowerCase().trim().replace(/\s+/g, '_');
  return `assets/images/Character_Portrait/portrait_${cleanSlug}_00.png`;
}
