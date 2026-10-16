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

function getEquipmentIconPath(slug, piece) {
  if (!slug || !piece) return DEFAULT_AVATAR;
  return `assets/images/Equipment_Icon/${slug}_${piece}.png`;
}

function getMonsterlingIconPath(slug) {
  if (!slug) return DEFAULT_AVATAR;
  return `assets/images/Monsterling_Icon/monsterling_${slug}_00.png`;
}

const DB = {
  characters: typeof CHARACTERS_DB !== 'undefined' ? CHARACTERS_DB : [],
  equipments: typeof EQUIPMENTS_DB !== 'undefined' ? EQUIPMENTS_DB : [],
  monsterlings: typeof MONSTERLINGS_DB !== 'undefined' ? MONSTERLINGS_DB : [],
  artifacts: typeof ARTIFACTS_DB !== 'undefined' ? ARTIFACTS_DB : []
};
