const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3659/3659738.png';

const DB = {
  characters: [
    { id: 'c1', name: 'Angel', slug: 'angel', element: 'Fuego', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Habilidad especial de Angel.', desc: 'Personaje de elemento Fuego, rol Asesino y grado 4 estrellas.' },
    { id: 'c2', name: 'Benjamin', slug: 'benjamin', element: 'Rayo', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Habilidad especial de Benjamin.', desc: 'Personaje de elemento Rayo, rol Asesino y grado 4 estrellas.' },
    { id: 'c3', name: 'Bonnie', slug: 'bonnie', element: 'Viento', tier: '4★', role: 'Apoyo', weapon: 'Por definir', skills: 'Habilidad especial de Bonnie.', desc: 'Personaje de elemento Viento, rol Apoyo y grado 4 estrellas.' },
    { id: 'c4', name: 'Brisshell', slug: 'brisshell', element: 'Tierra', tier: '5★', role: 'Asesino', weapon: 'Por definir', skills: 'Habilidad especial de Brisshell.', desc: 'Personaje de elemento Tierra, rol Asesino y grado 5 estrellas.' },
    { id: 'c5', name: 'Cloud', slug: 'cloud', element: 'Hielo', tier: '4★', role: 'Destructor', weapon: 'Por definir', skills: 'Habilidad especial de Cloud.', desc: 'Personaje de elemento Hielo, rol Destructor y grado 4 estrellas.' },
    { id: 'c6', name: 'Daisy', slug: 'daisy', element: 'Tierra', tier: '4★', role: 'Apoyo', weapon: 'Por definir', skills: 'Habilidad especial de Daisy.', desc: 'Personaje de elemento Tierra, rol Apoyo y grado 4 estrellas.' },
    { id: 'c7', name: 'Ellie', slug: 'ellie', element: 'Tierra', tier: '4★', role: 'Destructor', weapon: 'Por definir', skills: 'Habilidad especial de Ellie.', desc: 'Personaje de elemento Tierra, rol Destructor y grado 4 estrellas.' },
    { id: 'c8', name: 'Esther', slug: 'esther', element: 'Viento', tier: '5★', role: 'Asesino', weapon: 'Por definir', skills: 'Habilidad especial de Esther.', desc: 'Personaje de elemento Viento, rol Asesino y grado 5 estrellas.' },
    { id: 'c9', name: 'Flare', slug: 'flare', element: 'Fuego', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Habilidad especial de Flare.', desc: 'Personaje de elemento Fuego, rol Destructor y grado 5 estrellas.' },
    { id: 'c10', name: 'Francis', slug: 'francis', element: 'Tierra', tier: '4★', role: 'Apoyo', weapon: 'Por definir', skills: 'Habilidad especial de Francis.', desc: 'Personaje de elemento Tierra, rol Apoyo y grado 4 estrellas.' },
    { id: 'c11', name: 'Francis Verano', slug: 'francis_verano', element: 'Tierra', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Habilidad especial de Francis Verano.', desc: 'Personaje de elemento Tierra, rol Apoyo y grado 5 estrellas.' },
    { id: 'c12', name: 'Gabi', slug: 'gabi', element: 'Tierra', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Habilidad especial de Gabi.', desc: 'Personaje de elemento Tierra, rol Luchador y grado 5 estrellas.' },
    { id: 'c13', name: 'Isabella', slug: 'isabella', element: 'Hielo', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Habilidad especial de Isabella.', desc: 'Personaje de elemento Hielo, rol Destructor y grado 5 estrellas.' },
    { id: 'c14', name: 'Jiwon', slug: 'jiwon', element: 'Viento', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Habilidad especial de Jiwon.', desc: 'Personaje de elemento Viento, rol Apoyo y grado 5 estrellas.' },
    { id: 'c15', name: 'Leeho', slug: 'leeho', element: 'Fuego', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Habilidad especial de Leeho.', desc: 'Personaje de elemento Fuego, rol Asesino y grado 4 estrellas.' },
    { id: 'c16', name: 'Mabel', slug: 'mabel', element: 'Rayo', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Habilidad especial de Mabel.', desc: 'Personaje de elemento Rayo, rol Destructor y grado 5 estrellas.' },
    { id: 'c17', name: 'Mina', slug: 'mina', element: 'Fuego', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Habilidad especial de Mina.', desc: 'Personaje de elemento Fuego, rol Luchador y grado 5 estrellas.' },
    { id: 'c18', name: 'Nagi', slug: 'nagi', element: 'Viento', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Habilidad especial de Nagi.', desc: 'Personaje de elemento Viento, rol Destructor y grado 5 estrellas.' },
    { id: 'c19', name: 'Narae', slug: 'narae', element: 'Hielo', tier: '5★', role: 'Apoyo', weapon: 'Por definir', skills: 'Habilidad especial de Narae.', desc: 'Personaje de elemento Hielo, rol Apoyo y grado 5 estrellas.' },
    { id: 'c20', name: 'Ophelia', slug: 'ophelia', element: 'Hielo', tier: '5★', role: 'Luchador', weapon: 'Por definir', skills: 'Habilidad especial de Ophelia.', desc: 'Personaje de elemento Hielo, rol Luchador y grado 5 estrellas.' },
    { id: 'c21', name: 'Pippa', slug: 'pippa', element: 'Rayo', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Habilidad especial de Pippa.', desc: 'Personaje de elemento Rayo, rol Luchador y grado 4 estrellas.' },
    { id: 'c22', name: 'Rene', slug: 'rene', element: 'Fuego', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Habilidad especial de Rene.', desc: 'Personaje de elemento Fuego, rol Luchador y grado 4 estrellas.' },
    { id: 'c23', name: 'Roc', slug: 'roc', element: 'Rayo', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Habilidad especial de Roc.', desc: 'Personaje de elemento Rayo, rol Luchador y grado 4 estrellas.' },
    { id: 'c24', name: 'Rosaria', slug: 'rosaria', element: 'Fuego', tier: '5★', role: 'Asesino', weapon: 'Por definir', skills: 'Habilidad especial de Rosaria.', desc: 'Personaje de elemento Fuego, rol Asesino y grado 5 estrellas.' },
    { id: 'c25', name: 'Sylvia', slug: 'sylvia', element: 'Hielo', tier: '4★', role: 'Asesino', weapon: 'Por definir', skills: 'Habilidad especial de Sylvia.', desc: 'Personaje de elemento Hielo, rol Asesino y grado 4 estrellas.' },
    { id: 'c26', name: 'Tate', slug: 'tate', element: 'Viento', tier: '4★', role: 'Luchador', weapon: 'Por definir', skills: 'Habilidad especial de Tate.', desc: 'Personaje de elemento Viento, rol Luchador y grado 4 estrellas.' },
    { id: 'c27', name: 'Valerie', slug: 'valerie', element: 'Tierra', tier: '5★', role: 'Destructor', weapon: 'Por definir', skills: 'Habilidad especial de Valerie.', desc: 'Personaje de elemento Tierra, rol Destructor y grado 5 estrellas.' },
    { id: 'c28', name: 'William', slug: 'william', element: 'Viento', tier: '4★', role: 'Destructor', weapon: 'Por definir', skills: 'Habilidad especial de William.', desc: 'Personaje de elemento Viento, rol Destructor y grado 4 estrellas.' }
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

function getPortraitPath(slug) {
  return `assets/images/Character_Portrait/portrait_${slug}_00.png`;
}
