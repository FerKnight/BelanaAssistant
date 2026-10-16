const EQUIPMENTS_DB = [
  { 
    id: 'eq_1', name: 'Abismo', slug: 'abismo', pieces: 4, 
    set2: 'Daño de viento +10 % durante 5 s al usar una habilidad especial', 
    set4: 'Daño de viento +10 % durante 5 s al asestar un golpe crítico' 
  },
  { 
    id: 'eq_2', name: 'Árbol milenario', slug: 'arbol_milenario', pieces: 2, 
    set2: 'Daño de fuego de todos los compañeros +7,5% durante 5s al usar una habilidad de apoyo', 
    set4: '' 
  },
  { 
    id: 'eq_3', name: 'Banquete grandioso de glotón', slug: 'banquete_grandioso_de_gloton', pieces: 2, 
    set2: 'Res al fuego del objetivo -6% durante 5s al impactar con una habilidad de relevo', 
    set4: '' 
  },
  { 
    id: 'eq_4', name: 'Corazón de escarcha eterna', slug: 'corazon_de_escarcha_eterna', pieces: 2, 
    set2: 'Daño de aturdimiento de ataque de rayo +7,5%', 
    set4: '' 
  },
  { 
    id: 'eq_5', name: 'Destructor despiadado', slug: 'destructor_despiadado', pieces: 4, 
    set2: 'Los ataques básicos infligen 5% más de daño de viento', 
    set4: 'Al usar la habilidad suprema, la res a viento del objetivo se reduce en 10% durante 5s' 
  },
  { 
    id: 'eq_6', name: 'Devorador del abismo', slug: 'devorador_del_abismo', pieces: 2, 
    set2: 'Daño de neutralización de ataque de hielo +7,5%', 
    set4: '' 
  },
  { 
    id: 'eq_7', name: 'El sin nombre', slug: 'el_sin_nombre', pieces: 4, 
    set2: 'Los ataques básicos infligen 5% más de daño de viento', 
    set4: 'Al usar una habilidad suprema, la res a viento del objetivo se reduce un 10% durante 5s' 
  },
  { 
    id: 'eq_8', name: 'Espíritu de lucha zorro youkai', slug: 'espiritu_de_lucha_zorro_youkai', pieces: 2, 
    set2: 'Res al rayo -6% durante 5s al usar una habilidad de relevo', 
    set4: '' 
  },
  { 
    id: 'eq_9', name: 'Flores en todo su esplendor', slug: 'flores_en_todo_su_esplendor', pieces: 2, 
    set2: 'Daño de hielo +7,5% durante 5s al usar una habilidad especial', 
    set4: '' 
  },
  { 
    id: 'eq_10', name: 'Juez', slug: 'juez', pieces: 4, 
    set2: 'Daño de hielo +10% durante 5s al usar una habilidad de cambio', 
    set4: 'Daño de hielo +10% al atacar a un enemigo con aflicción de hielo' 
  },
  { 
    id: 'eq_11', name: 'Nivel de glotón', slug: 'nivel_de_gloton', pieces: 4, 
    set2: 'Res de viento del objetivo -6% durante 5s al ejecutar con éxito una habilidad especial', 
    set4: 'Índice de crítico de todos los compañeros +6% durante 5s al usar una habilidad de relevo' 
  },
  { 
    id: 'eq_12', name: 'Noche de luna llena', slug: 'noche_de_luna_llena', pieces: 4, 
    set2: 'Daño de fuego +7,5% durante 5s al usar una habilidad especial', 
    set4: 'Daño de fuego +7,5% al atacar a un enemigo con aflicción de fuego' 
  },
  { 
    id: 'eq_13', name: 'Piedra ancestral', slug: 'piedra_ancestral', pieces: 2, 
    set2: 'Daño de neutralización de ataque de viento +7,5%', 
    set4: '' 
  },
  { 
    id: 'eq_14', name: 'Poder imponente del monte tai', slug: 'poder_imponente_del_monte_tai', pieces: 4, 
    set2: 'Índice de crítico +5% durante 5s al usar una habilidad de cambio', 
    set4: 'Daño de rayo +7,5% durante 5s al usar una habilidad especial' 
  },
  { 
    id: 'eq_15', name: 'Rey espiritual', slug: 'rey_espiritual', pieces: 4, 
    set2: 'Daño de rayo +8 % durante 3 s al usar un ataque básico', 
    set4: 'Daño de rayo +10 % al atacar a un enemigo con aflicción de rayo' 
  },
  { 
    id: 'eq_16', name: 'Ritos del general victorioso', slug: 'ritos_del_general_victorioso', pieces: 2, 
    set2: 'Daño de neutralización de ataque de tierra +7,5%', 
    set4: '' 
  },
  { 
    id: 'eq_17', name: 'Rugido de hanul', slug: 'rugido_de_hanul', pieces: 4, 
    set2: 'Daño de fuego +10 % durante 5 s al usar una habilidad suprema', 
    set4: 'Daño crítico +10 % al atacar a un enemigo con aflicción de fuego' 
  },
  { 
    id: 'eq_18', name: 'Señor de la ciénaga', slug: 'senor_de_la_cienaga', pieces: 4, 
    set2: 'Daño de hielo de todos los compañeros +5% durante 5s al conceder un escudo', 
    set4: 'Daño de debilidad elemental recibido por el objetivo +10% durante 5s al atacar a un enemigo que sufra aficción de hielo y aturdimiento' 
  },
  { 
    id: 'eq_19', name: 'Sirius', slug: 'sirius', pieces: 4, 
    set2: 'Daño de tierra de todos los compañeros +7,5% durante 5s al usar una habilidad de apoyo', 
    set4: 'Daño de apoyo +7,5% durante 5s al usar una habilidad de cambio' 
  },
  { 
    id: 'eq_20', name: 'Tirano del bosque', slug: 'tirano_del_bosque', pieces: 4, 
    set2: 'Daño de hielo +7,5% durante 3s al usar un ataque básico', 
    set4: 'Índice de crítico +5% durante 5s al atacar a un enemigo con aflicción de hielo' 
  },
  { 
    id: 'eq_21', name: 'Vanguardia de victoria', slug: 'vanguardia_de_victoria', pieces: 2, 
    set2: 'Daño de debilidad elemental del objetivo recibido +10% durante 5s al atacar a un enemigo con aficción de tierra', 
    set4: '' 
  },
  { 
    id: 'eq_22', name: 'Viento de poniente', slug: 'viento_de_poniente', pieces: 4, 
    set2: 'Daño de tierra +8 % durante 3 s al usar un ataque básico', 
    set4: 'Daño de tierra +10 % durante 5 s al usar una habilidad de cambio contra un enemigo con aflicción de tierra' 
  }
];
