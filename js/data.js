/* ========================================== CHOIX ICONS ======================================== */

const spellIcons = [
    {
        id: "spell-01",
        image: "images/icons/spell-01.png",
        unlocked: true,
        condition: 'Finir le donjon "Citadelle des anges" sans mourir.'
    },
    {
        id: "spell-02",
        image: "images/icons/spell-02.png",
        unlocked: false,
        condition: 'Finir le donjon "Volcan de braises" sans mourir.'
    },
    {
        id: "spell-03",
        image: "images/icons/spell-03.png",
        unlocked: true,
        condition: 'Offrir 10 offrandes au Dieu "Ignara".'
    },
    {
        id: "spell-04",
        image: "images/icons/spell-04.png",
        unlocked: true,
        condition: 'Atteindre une affinité de 50 avec Freya.'
    },
    {
        id: "spell-05",
        image: "images/icons/spell-05.png",
        unlocked: false,
        condition: 'Atteindre une affinité de 70 avec Freya.'
    },
    {
        id: "spell-06",
        image: "images/icons/spell-06.png",
        unlocked: true,
        condition: 'Vaincre 100 créatures élémentaires.'
    },
    {
        id: "spell-07",
        image: "images/icons/spell-07.png",
        unlocked: false,
        condition: 'Vaincre le boss "Cœur du Volcan".'
    },
    {
        id: "spell-08",
        image: "images/icons/spell-08.png",
        unlocked: true,
        condition: 'Découvrir le Sanctuaire oublié.'
    }
];

/* =============================================== MAGIES =============================================== */

const magics = [
    "AER",
    "LUX",
    "MORS",
    "AQUA",
    "IGNIS",
    "VITA",
    "UMBRA",
    "TERRA"
];

const magicIcons = {
    IGNIS: "images/elements/ignis.png",
    AQUA: "images/elements/aqua.png",
    TERRA: "images/elements/terra.png",
    AER: "images/elements/aer.png",
    LUX: "images/elements/lux.png",
    UMBRA: "images/elements/umbra.png",
    VITA: "images/elements/vita.png",
    MORS: "images/elements/mors.png"
};

const magicColors = {
    IGNIS: "#d85a4a",
    AQUA: "#55aee6",
    TERRA: "#a77a4d",
    AER: "#b8d8d8",
    LUX: "#e3c95f",
    UMBRA: "#9b78c6",
    VITA: "#65b96e",
    MORS: "#9b9b9b"
};

let currentMagic = "IGNIS";
let currentMagicLevel = 10;


/* ===================================== MODULES PRINCIPAUX =============================================== */
/* Ce sont pour l'instant des modules de démonstration. Ils pourront être remplacés par les vrais modules de STAR. */

const primaryModules = [

{
    id: "damage-single",
    name: "Dégâts directs",
    latin: "Percute",

    icon: {
        IGNIS: "images/sigils/ignis-percute.png",
        AQUA: "images/sigils/aqua-percute.png",
        TERRA: "images/sigils/terra-percute.png",
        AER: "images/sigils/aer-percute.png",
        LUX: "images/sigils/lux-percute.png",
        UMBRA: "images/sigils/umbra-percute.png",
        VITA: "images/sigils/vita-percute.png",
        MORS: "images/sigils/mors-percute.png"
    },

    description: "Inflige des dégâts à une cible.",

    stats: {
        IGNIS: { power: 60, cast: 1, cooldown: 5 },
        AQUA:  { power: 45, cast: 0.5, cooldown: 4 },
        TERRA: { power: 95, cast: 1.5, cooldown: 8 },
        AER:   { power: 10, cast: 0, cooldown: 1 },
        LUX:   { power: 20, cast: 0, cooldown: 2 },
        UMBRA: { power: 85, cast: 1.5, cooldown: 7 },
        VITA:  { power: 70, cast: 1, cooldown: 6 },
        MORS:  { power: 35, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "damage-dot",
    name: "Dégâts sur la durée",
    latin: "Dole",

    icon: {
        IGNIS: "images/sigils/ignis-dole.png",
        AQUA: "images/sigils/aqua-dole.png",
        TERRA: "images/sigils/terra-dole.png",
        AER: "images/sigils/aer-dole.png",
        LUX: "images/sigils/lux-dole.png",
        UMBRA: "images/sigils/umbra-dole.png",
        VITA: "images/sigils/vita-dole.png",
        MORS: "images/sigils/mors-dole.png"
    },

    description: "Inflige des dégâts progressivement, pendant une durée déterminée.",

    stats: {
        IGNIS: { power: 90, duration: 9, ticks: 9, cast: 1, cooldown: 5 },
        AQUA:  { power: 80, duration: 8, ticks: 8, cast: 0.5, cooldown: 4 },
        TERRA: { power: 120, duration: 12, ticks: 12, cast: 1.5, cooldown: 8 },
        AER:   { power: 50, duration: 5, ticks: 5, cast: 0, cooldown: 1 },
        LUX:   { power: 60, duration: 6, ticks: 6, cast: 0, cooldown: 2 },
        UMBRA: { power: 110, duration: 11, ticks: 11, cast: 1.5, cooldown: 7 },
        VITA:  { power: 100, duration: 10, ticks: 10, cast: 1, cooldown: 6 },
        MORS:  { power: 70, duration: 7, ticks: 7, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "heal-single",
    name: "Soins directs",
    latin: "Sana",

    icon: {
        IGNIS: "images/sigils/ignis-sana.png",
        AQUA: "images/sigils/aqua-sana.png",
        TERRA: "images/sigils/terra-sana.png",
        AER: "images/sigils/aer-sana.png",
        LUX: "images/sigils/lux-sana.png",
        UMBRA: "images/sigils/umbra-sana.png",
        VITA: "images/sigils/vita-sana.png",
        MORS: "images/sigils/mors-sana.png"
    },

    description: "Rend des points de vie.",

    stats: {
        IGNIS: { power: 60, cast: 1, cooldown: 5 },
        AQUA:  { power: 45, cast: 0.5, cooldown: 4 },
        TERRA: { power: 95, cast: 1.5, cooldown: 8 },
        AER:   { power: 10, cast: 0, cooldown: 1 },
        LUX:   { power: 20, cast: 0, cooldown: 2 },
        UMBRA: { power: 85, cast: 1.5, cooldown: 7 },
        VITA:  { power: 70, cast: 1, cooldown: 6 },
        MORS:  { power: 35, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "heal-hot",
    name: "Soins sur la durée",
    latin: "Cura",

    icon: {
        IGNIS: "images/sigils/ignis-cura.png",
        AQUA: "images/sigils/aqua-cura.png",
        TERRA: "images/sigils/terra-cura.png",
        AER: "images/sigils/aer-cura.png",
        LUX: "images/sigils/lux-cura.png",
        UMBRA: "images/sigils/umbra-cura.png",
        VITA: "images/sigils/vita-cura.png",
        MORS: "images/sigils/mors-cura.png"
    },

    description: "Rend progressivement des points de vie pendant une durée déterminée.",

    stats: {
        IGNIS: { power: 90, duration: 9, ticks: 9, cast: 1, cooldown: 5 },
        AQUA:  { power: 80, duration: 8, ticks: 8, cast: 0.5, cooldown: 4 },
        TERRA: { power: 120, duration: 12, ticks: 12, cast: 1.5, cooldown: 8 },
        AER:   { power: 50, duration: 5, ticks: 5, cast: 0, cooldown: 1 },
        LUX:   { power: 60, duration: 6, ticks: 6, cast: 0, cooldown: 2 },
        UMBRA: { power: 110, duration: 11, ticks: 11, cast: 1.5, cooldown: 7 },
        VITA:  { power: 100, duration: 10, ticks: 10, cast: 1, cooldown: 6 },
        MORS:  { power: 70, duration: 7, ticks: 7, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "shield",
    name: "Bouclier",
    latin: "Protege",

    icon: {
        IGNIS: "images/sigils/ignis-protege.png",
        AQUA: "images/sigils/aqua-protege.png",
        TERRA: "images/sigils/terra-protege.png",
        AER: "images/sigils/aer-protege.png",
        LUX: "images/sigils/lux-protege.png",
        UMBRA: "images/sigils/umbra-protege.png",
        VITA: "images/sigils/vita-protege.png",
        MORS: "images/sigils/mors-protege.png"
    },

    description: "Applique un bouclier absorbant des dégâts.",

    stats: {
        IGNIS: { power: 72, duration: 9, cast: 1, cooldown: 5 },
        AQUA:  { power: 64, duration: 8, cast: 0.5, cooldown: 4 },
        TERRA: { power: 96, duration: 12, cast: 1.5, cooldown: 8 },
        AER:   { power: 40, duration: 5, cast: 0, cooldown: 1 },
        LUX:   { power: 48, duration: 6, cast: 0, cooldown: 2 },
        UMBRA: { power: 88, duration: 11, cast: 1.5, cooldown: 7 },
        VITA:  { power: 80, duration: 10, cast: 1, cooldown: 6 },
        MORS:  { power: 56, duration: 7, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "combat-buff",
    name: "Amélioration",
    latin: "Bonus",

    icon: {
        IGNIS: "images/sigils/ignis-bonus.png",
        AQUA: "images/sigils/aqua-bonus.png",
        TERRA: "images/sigils/terra-bonus.png",
        AER: "images/sigils/aer-bonus.png",
        LUX: "images/sigils/lux-bonus.png",
        UMBRA: "images/sigils/umbra-bonus.png",
        VITA: "images/sigils/vita-bonus.png",
        MORS: "images/sigils/mors-bonus.png"
    },

    description: "Applique une amélioration temporaire augmentant l'Affinité de l'élément de la compétence.",

    stats: {
        IGNIS: { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        AQUA:  { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        TERRA: { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        AER:   { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        LUX:   { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        UMBRA: { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        VITA:  { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        MORS:  { effect: 20, duration: 10, cast: 1, cooldown: 40 }
    }
},

{
    id: "debuff",
    name: "Affaiblissement",
    latin: "Malus",

    icon: {
        IGNIS: "images/sigils/ignis-malus.png",
        AQUA: "images/sigils/aqua-malus.png",
        TERRA: "images/sigils/terra-malus.png",
        AER: "images/sigils/aer-malus.png",
        LUX: "images/sigils/lux-malus.png",
        UMBRA: "images/sigils/umbra-malus.png",
        VITA: "images/sigils/vita-malus.png",
        MORS: "images/sigils/mors-malus.png"
    },

    description: "Applique un affaiblissement temporaire réduisant l'Affinité de l'élément de la compétence.",

    stats: {
        IGNIS: { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        AQUA:  { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        TERRA: { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        AER:   { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        LUX:   { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        UMBRA: { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        VITA:  { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        MORS:  { effect: -20, duration: 10, cast: 1, cooldown: 40 }
    }
},

{
    id: "purga",
    name: "Dissipation",
    latin: "Purga",

    icon: {
        IGNIS: "images/sigils/ignis-purga.png",
        AQUA: "images/sigils/aqua-purga.png",
        TERRA: "images/sigils/terra-purga.png",
        AER: "images/sigils/aer-purga.png",
        LUX: "images/sigils/lux-purga.png",
        UMBRA: "images/sigils/umbra-purga.png",
        VITA: "images/sigils/vita-purga.png",
        MORS: "images/sigils/mors-purga.png"
    },

    description: "Retire les effets temporaires appliqués à une cible.",

    stats: {
        IGNIS: { effect: 2, cast: 1, cooldown: 20 },
        AQUA:  { effect: 2, cast: 1, cooldown: 20 },
        TERRA: { effect: 2, cast: 1, cooldown: 20 },
        AER:   { effect: 2, cast: 1, cooldown: 20 },
        LUX:   { effect: 2, cast: 1, cooldown: 20 },
        UMBRA: { effect: 2, cast: 1, cooldown: 20 },
        VITA:  { effect: 2, cast: 1, cooldown: 20 },
        MORS:  { effect: 2, cast: 1, cooldown: 20 }
    }
}

];

/* =============================================== MODULES SECONDAIRES ================================================ */

const secondaryModules = [

{
    id: "damage-single",
    name: "Dégâts directs",
    latin: "Percute",

    icon: {
        IGNIS: "images/sigils/ignis-percute.png",
        AQUA: "images/sigils/aqua-percute.png",
        TERRA: "images/sigils/terra-percute.png",
        AER: "images/sigils/aer-percute.png",
        LUX: "images/sigils/lux-percute.png",
        UMBRA: "images/sigils/umbra-percute.png",
        VITA: "images/sigils/vita-percute.png",
        MORS: "images/sigils/mors-percute.png"
    },

    description: "Ajoute des dégâts directs à la compétence.",

    stats: {
        IGNIS: { power: 60, cast: 1, cooldown: 5 },
        AQUA:  { power: 45, cast: 0.5, cooldown: 4 },
        TERRA: { power: 95, cast: 1.5, cooldown: 8 },
        AER:   { power: 10, cast: 0, cooldown: 1 },
        LUX:   { power: 20, cast: 0, cooldown: 2 },
        UMBRA: { power: 85, cast: 1.5, cooldown: 7 },
        VITA:  { power: 70, cast: 1, cooldown: 6 },
        MORS:  { power: 35, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "damage-dot",
    name: "Dégâts sur la durée",
    latin: "Dole",

    icon: {
        IGNIS: "images/sigils/ignis-dole.png",
        AQUA: "images/sigils/aqua-dole.png",
        TERRA: "images/sigils/terra-dole.png",
        AER: "images/sigils/aer-dole.png",
        LUX: "images/sigils/lux-dole.png",
        UMBRA: "images/sigils/umbra-dole.png",
        VITA: "images/sigils/vita-dole.png",
        MORS: "images/sigils/mors-dole.png"
    },

    description: "Ajoute des dégâts progressifs à la compétence.",

    stats: {
        IGNIS: { power: 90, duration: 9, ticks: 9, cast: 1, cooldown: 5 },
        AQUA:  { power: 80, duration: 8, ticks: 8, cast: 0.5, cooldown: 4 },
        TERRA: { power: 120, duration: 12, ticks: 12, cast: 1.5, cooldown: 8 },
        AER:   { power: 50, duration: 5, ticks: 5, cast: 0, cooldown: 1 },
        LUX:   { power: 60, duration: 6, ticks: 6, cast: 0, cooldown: 2 },
        UMBRA: { power: 110, duration: 11, ticks: 11, cast: 1.5, cooldown: 7 },
        VITA:  { power: 100, duration: 10, ticks: 10, cast: 1, cooldown: 6 },
        MORS:  { power: 70, duration: 7, ticks: 7, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "heal-single",
    name: "Soins directs",
    latin: "Sana",

    icon: {
        IGNIS: "images/sigils/ignis-sana.png",
        AQUA: "images/sigils/aqua-sana.png",
        TERRA: "images/sigils/terra-sana.png",
        AER: "images/sigils/aer-sana.png",
        LUX: "images/sigils/lux-sana.png",
        UMBRA: "images/sigils/umbra-sana.png",
        VITA: "images/sigils/vita-sana.png",
        MORS: "images/sigils/mors-sana.png"
    },

    description: "Ajoute des soins directs à la compétence.",

    stats: {
        IGNIS: { power: 60, cast: 1, cooldown: 5 },
        AQUA:  { power: 45, cast: 0.5, cooldown: 4 },
        TERRA: { power: 95, cast: 1.5, cooldown: 8 },
        AER:   { power: 10, cast: 0, cooldown: 1 },
        LUX:   { power: 20, cast: 0, cooldown: 2 },
        UMBRA: { power: 85, cast: 1.5, cooldown: 7 },
        VITA:  { power: 70, cast: 1, cooldown: 6 },
        MORS:  { power: 35, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "heal-hot",
    name: "Soins sur la durée",
    latin: "Cura",

    icon: {
        IGNIS: "images/sigils/ignis-cura.png",
        AQUA: "images/sigils/aqua-cura.png",
        TERRA: "images/sigils/terra-cura.png",
        AER: "images/sigils/aer-cura.png",
        LUX: "images/sigils/lux-cura.png",
        UMBRA: "images/sigils/umbra-cura.png",
        VITA: "images/sigils/vita-cura.png",
        MORS: "images/sigils/mors-cura.png"
    },

    description: "Ajoute des soins progressifs à la compétence.",

    stats: {
        IGNIS: { power: 90, duration: 9, ticks: 9, cast: 1, cooldown: 5 },
        AQUA:  { power: 80, duration: 8, ticks: 8, cast: 0.5, cooldown: 4 },
        TERRA: { power: 120, duration: 12, ticks: 12, cast: 1.5, cooldown: 8 },
        AER:   { power: 50, duration: 5, ticks: 5, cast: 0, cooldown: 1 },
        LUX:   { power: 60, duration: 6, ticks: 6, cast: 0, cooldown: 2 },
        UMBRA: { power: 110, duration: 11, ticks: 11, cast: 1.5, cooldown: 7 },
        VITA:  { power: 100, duration: 10, ticks: 10, cast: 1, cooldown: 6 },
        MORS:  { power: 70, duration: 7, ticks: 7, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "shield",
    name: "Bouclier",
    latin: "Protege",

    icon: {
        IGNIS: "images/sigils/ignis-protege.png",
        AQUA: "images/sigils/aqua-protege.png",
        TERRA: "images/sigils/terra-protege.png",
        AER: "images/sigils/aer-protege.png",
        LUX: "images/sigils/lux-protege.png",
        UMBRA: "images/sigils/umbra-protege.png",
        VITA: "images/sigils/vita-protege.png",
        MORS: "images/sigils/mors-protege.png"
    },

    description: "Ajoute un bouclier absorbant des dégâts à la compétence.",

    stats: {
        IGNIS: { power: 72, duration: 9, cast: 1, cooldown: 5 },
        AQUA:  { power: 64, duration: 8, cast: 0.5, cooldown: 4 },
        TERRA: { power: 96, duration: 12, cast: 1.5, cooldown: 8 },
        AER:   { power: 40, duration: 5, cast: 0, cooldown: 1 },
        LUX:   { power: 48, duration: 6, cast: 0, cooldown: 2 },
        UMBRA: { power: 88, duration: 11, cast: 1.5, cooldown: 7 },
        VITA:  { power: 80, duration: 10, cast: 1, cooldown: 6 },
        MORS:  { power: 56, duration: 7, cast: 0.5, cooldown: 3 }
    }
},

{
    id: "combat-buff",
    name: "Amélioration",
    latin: "Bonus",

    icon: {
        IGNIS: "images/sigils/ignis-bonus.png",
        AQUA: "images/sigils/aqua-bonus.png",
        TERRA: "images/sigils/terra-bonus.png",
        AER: "images/sigils/aer-bonus.png",
        LUX: "images/sigils/lux-bonus.png",
        UMBRA: "images/sigils/umbra-bonus.png",
        VITA: "images/sigils/vita-bonus.png",
        MORS: "images/sigils/mors-bonus.png"
    },

    description: "Ajoute une amélioration temporaire augmentant l'Affinité de l'élément de la compétence.",

    stats: {
        IGNIS: { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        AQUA:  { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        TERRA: { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        AER:   { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        LUX:   { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        UMBRA: { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        VITA:  { effect: 20, duration: 10, cast: 1, cooldown: 40 },
        MORS:  { effect: 20, duration: 10, cast: 1, cooldown: 40 }
    }
},

{
    id: "debuff",
    name: "Affaiblissement",
    latin: "Malus",

    icon: {
        IGNIS: "images/sigils/ignis-malus.png",
        AQUA: "images/sigils/aqua-malus.png",
        TERRA: "images/sigils/terra-malus.png",
        AER: "images/sigils/aer-malus.png",
        LUX: "images/sigils/lux-malus.png",
        UMBRA: "images/sigils/umbra-malus.png",
        VITA: "images/sigils/vita-malus.png",
        MORS: "images/sigils/mors-malus.png"
    },

    description: "Ajoute un affaiblissement temporaire réduisant l'Affinité de l'élément de la compétence.",

    stats: {
        IGNIS: { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        AQUA:  { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        TERRA: { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        AER:   { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        LUX:   { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        UMBRA: { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        VITA:  { effect: -20, duration: 10, cast: 1, cooldown: 40 },
        MORS:  { effect: -20, duration: 10, cast: 1, cooldown: 40 }
    }
},

{
    id: "purga",
    name: "Dissipation",
    latin: "Purga",

    icon: {
        IGNIS: "images/sigils/ignis-purga.png",
        AQUA: "images/sigils/aqua-purga.png",
        TERRA: "images/sigils/terra-purga.png",
        AER: "images/sigils/aer-purga.png",
        LUX: "images/sigils/lux-purga.png",
        UMBRA: "images/sigils/umbra-purga.png",
        VITA: "images/sigils/vita-purga.png",
        MORS: "images/sigils/mors-purga.png"
    },

    description: "Retire des effets temporaires appliqués à une cible.",

    stats: {
        IGNIS: { effect: 2, cast: 1, cooldown: 20 },
        AQUA:  { effect: 2, cast: 1, cooldown: 20 },
        TERRA: { effect: 2, cast: 1, cooldown: 20 },
        AER:   { effect: 2, cast: 1, cooldown: 20 },
        LUX:   { effect: 2, cast: 1, cooldown: 20 },
        UMBRA: { effect: 2, cast: 1, cooldown: 20 },
        VITA:  { effect: 2, cast: 1, cooldown: 20 },
        MORS:  { effect: 2, cast: 1, cooldown: 20 }
    }
}

];

/* ================================== ÉTAT DU GRIMOIRE ===================================== */

const definitivePrimaryModules = primaryModules;
const definitiveSecondaryModules = secondaryModules;

let selectedPrimary = null;
let selectedSecondary = null;
let selectedTargeting = null;
