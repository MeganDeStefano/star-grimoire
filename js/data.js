/* =============================================== MAGIES =============================================== */

const magics = [
    "NOVICE",
    "IGNIS",
    "AQUA",
    "TERRA",
    "AER",
    "LUX",
    "UMBRA",
    "VITA",
    "MORS"
];

const magicIcons = {
    NOVICE: null,
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

let currentMagic = "NOVICE";


/* ===================================== MODULES PRINCIPAUX =============================================== */
/* Ce sont pour l'instant des modules de démonstration. Ils pourront être remplacés par les vrais modules de STAR. */

const primaryModules = [

{
    id: "damage-single",
    name: "Dégâts monocible",
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
    description: "Inflige des dégâts à une cible unique.",
    compatible: [
        "damage-single",
        "damage-area",
        "damage-dot",
        "damage-dot-area",
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
        "debuff"
    ],

    stats: {
        IGNIS: {
            rank: 5,
            power: 155,
            cost: 12,
            cast: 0,
            cooldown: 4
        },

        AQUA: {
            rank: 2,
            power: 115,
            cost: 8,
            cast: 0,
            cooldown: 2
        },

        TERRA: {
            rank: 4,
            power: 160,
            cost: 10,
            cast: 1,
            cooldown: 7
        },

        AER: {
            rank: 3,
            power: 120,
            cost: 6,
            cast: 0,
            cooldown: 1
        },

        LUX: {
            rank: 3,
            power: 140,
            cost: 14,
            cast: 0.75,
            cooldown: 5
        },

        UMBRA: {
            rank: 5,
            power: 175,
            cost: 18,
            cast: 1.5,
            cooldown: 8
        },

        VITA: {
            rank: 2,
            power: 120,
            cost: 10,
            cast: 0.25,
            cooldown: 3
        },

        MORS: {
            rank: 3,
            power: 145,
            cost: 15,
            cast: 1,
            cooldown: 6
        }
    }
},

{
    id: "damage-area",
    name: "Dégâts de zone",
    latin: "Explode",
    icon: {
        IGNIS: "images/sigils/ignis-explode.png",
        AQUA: "images/sigils/aqua-explode.png",
        TERRA: "images/sigils/terra-explode.png",
        AER: "images/sigils/aer-explode.png",
        LUX: "images/sigils/lux-explode.png",
        UMBRA: "images/sigils/umbra-explode.png",
        VITA: "images/sigils/vita-explode.png",
        MORS: "images/sigils/mors-explode.png"
    },
    description: "Inflige des dégâts aux cibles présentes dans une zone.",
    compatible: [
        "damage-single",
        "damage-area",
        "damage-dot",
        "damage-dot-area",
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
        "debuff"
    ],

    stats: {
        IGNIS: {
            rank: 5,
            power: 135,
            cost: 16,
            cast: 0,
            cooldown: 7,
            aoe: 4
        },

        AQUA: {
            rank: 2,
            power: 95,
            cost: 12,
            cast: 0,
            cooldown: 5,
            aoe: 4
        },

        TERRA: {
            rank: 4,
            power: 140,
            cost: 20,
            cast: 1,
            cooldown: 10,
            aoe: 4
        },

        AER: {
            rank: 4,
            power: 110,
            cost: 10,
            cast: 0,
            cooldown: 4,
            aoe: 4
        },

        LUX: {
            rank: 2,
            power: 110,
            cost: 18,
            cast: 0.75,
            cooldown: 8,
            aoe: 4
        },

        UMBRA: {
            rank: 3,
            power: 135,
            cost: 22,
            cast: 1.5,
            cooldown: 11,
            aoe: 4
        },

        VITA: {
            rank: 2,
            power: 100,
            cost: 14,
            cast: 0.25,
            cooldown: 6,
            aoe: 4
        },

        MORS: {
            rank: 3,
            power: 125,
            cost: 19,
            cast: 1,
            cooldown: 9,
            aoe: 4
        }
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
    description: "Inflige des dégâts progressivement pendant une durée déterminée.",
    compatible: [
        "damage-single",
        "damage-area",
        "damage-dot",
        "damage-dot-area",
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
        "debuff"
    ],

    stats: {
        IGNIS: {
            rank: 4,
            power: 145,
            duration: 6,
            ticks: 3,
            cost: 12,
            cast: 0,
            cooldown: 4
        },

        AQUA: {
            rank: 5,
            power: 145,
            duration: 12,
            ticks: 6,
            cost: 8,
            cast: 0,
            cooldown: 2
        },

        TERRA: {
            rank: 2,
            power: 140,
            duration: 8,
            ticks: 2,
            cost: 10,
            cast: 1,
            cooldown: 7
        },

        AER: {
            rank: 3,
            power: 120,
            duration: 8,
            ticks: 8,
            cost: 6,
            cast: 0,
            cooldown: 1
        },

        LUX: {
            rank: 2,
            power: 130,
            duration: 10,
            ticks: 5,
            cost: 14,
            cast: 0.75,
            cooldown: 5
        },

        UMBRA: {
            rank: 5,
            power: 175,
            duration: 10,
            ticks: 5,
            cost: 18,
            cast: 1.5,
            cooldown: 8
        },

        VITA: {
            rank: 2,
            power: 120,
            duration: 10,
            ticks: 5,
            cost: 10,
            cast: 0.25,
            cooldown: 3
        },

        MORS: {
            rank: 5,
            power: 165,
            duration: 12,
            ticks: 6,
            cost: 15,
            cast: 1,
            cooldown: 6
        }
    }
},

{
    id: "damage-dot-area",
    name: "Dégâts de zone sur la durée",
    latin: "Vexa",
    icon: {
        IGNIS: "images/sigils/ignis-vexa.png",
        AQUA: "images/sigils/aqua-vexa.png",
        TERRA: "images/sigils/terra-vexa.png",
        AER: "images/sigils/aer-vexa.png",
        LUX: "images/sigils/lux-vexa.png",
        UMBRA: "images/sigils/umbra-vexa.png",
        VITA: "images/sigils/vita-vexa.png",
        MORS: "images/sigils/mors-vexa.png"
    },
    description: "Inflige des dégâts progressivement aux ennemis dans une zone.",
    compatible: [
        "damage-single",
        "damage-area",
        "damage-dot",
        "damage-dot-area",
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
        "debuff"
    ],

    stats: {
        IGNIS: {
            rank: 4,
            power: 125,
            duration: 6,
            ticks: 3,
            cost: 16,
            cast: 0,
            cooldown: 7,
            aoe: 4
        },

        AQUA: {
            rank: 4,
            power: 115,
            duration: 12,
            ticks: 6,
            cost: 12,
            cast: 0,
            cooldown: 5,
            aoe: 4
        },

        TERRA: {
            rank: 2,
            power: 120,
            duration: 8,
            ticks: 2,
            cost: 20,
            cast: 1,
            cooldown: 10,
            aoe: 4
        },

        AER: {
            rank: 4,
            power: 110,
            duration: 8,
            ticks: 8,
            cost: 10,
            cast: 0,
            cooldown: 4,
            aoe: 4
        },

        LUX: {
            rank: 2,
            power: 110,
            duration: 10,
            ticks: 5,
            cost: 18,
            cast: 0.75,
            cooldown: 8,
            aoe: 4
        },

        UMBRA: {
            rank: 4,
            power: 145,
            duration: 10,
            ticks: 5,
            cost: 22,
            cast: 1.5,
            cooldown: 11,
            aoe: 4
        },

        VITA: {
            rank: 2,
            power: 100,
            duration: 10,
            ticks: 5,
            cost: 14,
            cast: 0.25,
            cooldown: 6,
            aoe: 4
        },

        MORS: {
            rank: 5,
            power: 145,
            duration: 12,
            ticks: 6,
            cost: 19,
            cast: 1,
            cooldown: 9,
            aoe: 4
        }
    }
},

{
    id: "heal-single",
    name: "Soins monocible",
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
    description: "Rend des points de vie à une cible unique.",
    compatible: [
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
    ],

    stats: {
        IGNIS: {
            rank: 2,
            power: 125,
            cost: 12,
            cast: 0,
            cooldown: 4
        },

        AQUA: {
            rank: 2,
            power: 115,
            cost: 8,
            cast: 0,
            cooldown: 2
        },

        TERRA: {
            rank: 2,
            power: 140,
            cost: 10,
            cast: 1,
            cooldown: 7
        },

        AER: {
            rank: 3,
            power: 120,
            cost: 6,
            cast: 0,
            cooldown: 1
        },

        LUX: {
            rank: 5,
            power: 160,
            cost: 14,
            cast: 0.75,
            cooldown: 5
        },

        UMBRA: {
            rank: 2,
            power: 145,
            cost: 18,
            cast: 1.5,
            cooldown: 8
        },

        VITA: {
            rank: 4,
            power: 140,
            cost: 10,
            cast: 0.25,
            cooldown: 3
        },

        MORS: {
            rank: 2,
            power: 135,
            cost: 15,
            cast: 1,
            cooldown: 6
        }
    }
},

{
    id: "heal-group",
    name: "Soins de groupe",
    latin: "Salva",
    icon: {
        IGNIS: "images/sigils/ignis-salva.png",
        AQUA: "images/sigils/aqua-salva.png",
        TERRA: "images/sigils/terra-salva.png",
        AER: "images/sigils/aer-salva.png",
        LUX: "images/sigils/lux-salva.png",
        UMBRA: "images/sigils/umbra-salva.png",
        VITA: "images/sigils/vita-salva.png",
        MORS: "images/sigils/mors-salva.png"
    },
    description: "Rend des points de vie à plusieurs cibles.",
    compatible: [
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
    ],

    stats: {
        IGNIS: {
            rank: 2,
            power: 105,
            cost: 16,
            cast: 0,
            cooldown: 7,
            aoe: 4
        },

        AQUA: {
            rank: 2,
            power: 95,
            cost: 12,
            cast: 0,
            cooldown: 5,
            aoe: 4
        },

        TERRA: {
            rank: 2,
            power: 120,
            cost: 20,
            cast: 1,
            cooldown: 10,
            aoe: 4
        },

        AER: {
            rank: 3,
            power: 100,
            cost: 10,
            cast: 0,
            cooldown: 4,
            aoe: 4
        },

        LUX: {
            rank: 4,
            power: 130,
            cost: 18,
            cast: 0.75,
            cooldown: 8,
            aoe: 4
        },

        UMBRA: {
            rank: 2,
            power: 125,
            cost: 22,
            cast: 1.5,
            cooldown: 11,
            aoe: 4
        },

        VITA: {
            rank: 4,
            power: 120,
            cost: 14,
            cast: 0.25,
            cooldown: 6,
            aoe: 4
        },

        MORS: {
            rank: 2,
            power: 115,
            cost: 19,
            cast: 1,
            cooldown: 9,
            aoe: 4
        }
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
    compatible: [
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
    ],

    stats: {
        IGNIS: {
            rank: 2,
            power: 125,
            duration: 6,
            ticks: 3,
            cost: 12,
            cast: 0,
            cooldown: 4
        },

        AQUA: {
            rank: 5,
            power: 145,
            duration: 12,
            ticks: 6,
            cost: 8,
            cast: 0,
            cooldown: 2
        },

        TERRA: {
            rank: 2,
            power: 140,
            duration: 8,
            ticks: 2,
            cost: 10,
            cast: 1,
            cooldown: 7
        },

        AER: {
            rank: 3,
            power: 120,
            duration: 8,
            ticks: 8,
            cost: 6,
            cast: 0,
            cooldown: 1
        },

        LUX: {
            rank: 3,
            power: 140,
            duration: 10,
            ticks: 5,
            cost: 14,
            cast: 0.75,
            cooldown: 5
        },

        UMBRA: {
            rank: 3,
            power: 155,
            duration: 10,
            ticks: 5,
            cost: 18,
            cast: 1.5,
            cooldown: 8
        },

        VITA: {
            rank: 5,
            power: 150,
            duration: 10,
            ticks: 5,
            cost: 10,
            cast: 0.25,
            cooldown: 3
        },

        MORS: {
            rank: 4,
            power: 155,
            duration: 12,
            ticks: 6,
            cost: 15,
            cast: 1,
            cooldown: 6
        }
    }
},

{
    id: "heal-hot-area",
    name: "Soins de groupe sur la durée",
    latin: "Recrea",
    icon: {
        IGNIS: "images/sigils/ignis-recrea.png",
        AQUA: "images/sigils/aqua-recrea.png",
        TERRA: "images/sigils/terra-recrea.png",
        AER: "images/sigils/aer-recrea.png",
        LUX: "images/sigils/lux-recrea.png",
        UMBRA: "images/sigils/umbra-recrea.png",
        VITA: "images/sigils/vita-recrea.png",
        MORS: "images/sigils/mors-recrea.png"
    },
    description: "Soigne progressivement les alliés dans une zone.",
    compatible: [
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
    ],

    stats: {
        IGNIS: {
            rank: 2,
            power: 105,
            duration: 6,
            ticks: 3,
            cost: 16,
            cast: 0,
            cooldown: 7,
            aoe: 4
        },

        AQUA: {
            rank: 4,
            power: 115,
            duration: 12,
            ticks: 6,
            cost: 12,
            cast: 0,
            cooldown: 5,
            aoe: 4
        },

        TERRA: {
            rank: 2,
            power: 120,
            duration: 8,
            ticks: 2,
            cost: 20,
            cast: 1,
            cooldown: 10,
            aoe: 4
        },

        AER: {
            rank: 3,
            power: 100,
            duration: 8,
            ticks: 8,
            cost: 10,
            cast: 0,
            cooldown: 4,
            aoe: 4
        },

        LUX: {
            rank: 3,
            power: 120,
            duration: 10,
            ticks: 5,
            cost: 18,
            cast: 0.75,
            cooldown: 8,
            aoe: 4
        },

        UMBRA: {
            rank: 2,
            power: 125,
            duration: 10,
            ticks: 5,
            cost: 22,
            cast: 1.5,
            cooldown: 11,
            aoe: 4
        },

        VITA: {
            rank: 4,
            power: 120,
            duration: 10,
            ticks: 5,
            cost: 14,
            cast: 0.25,
            cooldown: 6,
            aoe: 4
        },

        MORS: {
            rank: 3,
            power: 125,
            duration: 12,
            ticks: 6,
            cost: 19,
            cast: 1,
            cooldown: 9,
            aoe: 4
        }
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
    compatible: [
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
    ],

    stats: {
        IGNIS: {
            rank: 2,
            power: 125,
            cost: 12,
            cast: 0,
            cooldown: 9,
            duration: 8
        },

        AQUA: {
            rank: 2,
            power: 115,
            cost: 8,
            cast: 0,
            cooldown: 7,
            duration: 12
        },

        TERRA: {
            rank: 5,
            power: 170,
            cost: 10,
            cast: 1,
            cooldown: 12,
            duration: 12
        },

        AER: {
            rank: 2,
            power: 110,
            cost: 6,
            cast: 0,
            cooldown: 6,
            duration: 6
        },

        LUX: {
            rank: 3,
            power: 140,
            cost: 14,
            cast: 0.75,
            cooldown: 10,
            duration: 10
        },

        UMBRA: {
            rank: 2,
            power: 145,
            cost: 18,
            cast: 1.5,
            cooldown: 13,
            duration: 8
        },

        VITA: {
            rank: 3,
            power: 130,
            cost: 10,
            cast: 0.25,
            cooldown: 8,
            duration: 10
        },

        MORS: {
            rank: 2,
            power: 135,
            cost: 15,
            cast: 1,
            cooldown: 11,
            duration: 8
        }
    }
},

{
    id: "shield-area",
    name: "Bouclier de groupe",
    latin: "Munire",
    icon: {
        IGNIS: "images/sigils/ignis-munire.png",
        AQUA: "images/sigils/aqua-munire.png",
        TERRA: "images/sigils/terra-munire.png",
        AER: "images/sigils/aer-munire.png",
        LUX: "images/sigils/lux-munire.png",
        UMBRA: "images/sigils/umbra-munire.png",
        VITA: "images/sigils/vita-munire.png",
        MORS: "images/sigils/mors-munire.png"
    },
    description: "Applique un bouclier aux alliés présents dans une zone.",
    compatible: [
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
    ],

    stats: {
        IGNIS: {
            rank: 2,
            power: 105,
            cost: 16,
            cast: 0,
            cooldown: 12,
            duration: 8,
            aoe: 4
        },

        AQUA: {
            rank: 2,
            power: 95,
            cost: 12,
            cast: 0,
            cooldown: 10,
            duration: 12,
            aoe: 4
        },

        TERRA: {
            rank: 5,
            power: 150,
            cost: 20,
            cast: 1,
            cooldown: 15,
            duration: 12,
            aoe: 4
        },

        AER: {
            rank: 2,
            power: 90,
            cost: 10,
            cast: 0,
            cooldown: 9,
            duration: 6,
            aoe: 4
        },

        LUX: {
            rank: 3,
            power: 120,
            cost: 18,
            cast: 0.75,
            cooldown: 13,
            duration: 10,
            aoe: 4
        },

        UMBRA: {
            rank: 2,
            power: 125,
            cost: 22,
            cast: 1.5,
            cooldown: 16,
            duration: 8,
            aoe: 4
        },

        VITA: {
            rank: 2,
            power: 100,
            cost: 14,
            cast: 0.25,
            cooldown: 11,
            duration: 10,
            aoe: 4
        },

        MORS: {
            rank: 1,
            power: 105,
            cost: 19,
            cast: 1,
            cooldown: 14,
            duration: 8,
            aoe: 4
        }
    }
},

{
    id: "combat-buff",
    name: "Buff de combat",
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
    description: "Applique une amélioration temporaire au personnage.",
    compatible: [
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
    ],

    stats: {
        IGNIS: {
            effect: 20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        AQUA: {
            effect: 20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        TERRA: {
            effect: 20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        AER: {
            effect: 20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        LUX: {
            effect: 20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        UMBRA: {
            effect: 20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        VITA: {
            effect: 20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        MORS: {
            effect: 20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        }
    }
},

{
    id: "debuff",
    name: "Débuff",
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
    description: "Applique un affaiblissement temporaire à la cible.",
    compatible: [
        "damage-single",
        "damage-area",
        "damage-dot",
        "damage-dot-area",
        "heal-single",
        "heal-group",
        "heal-hot",
        "heal-hot-area",
        "shield",
        "shield-area",
        "combat-buff",
        "debuff"
    ],

    stats: {
        IGNIS: {
            effect: -20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        AQUA: {
            effect: -20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        TERRA: {
            effect: -20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        AER: {
            effect: -20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        LUX: {
            effect: -20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        UMBRA: {
            effect: -20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        VITA: {
            effect: -20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        },

        MORS: {
            effect: -20,
            cost: 20,
            cast: 1,
            cooldown: 40,
            duration: 10
        }
    }
},

];

/* =============================================== MODULES SECONDAIRES ================================================ */

const secondaryModules = [

{
    id: "damage-single",
    name: "Dégâts monocible",
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
    description: "Ajoute des dégâts monocible à la compétence.",

    stats: {
        IGNIS: {
            rank: 5,
            power: 77.5,
            cost: 6,
            cast: 0,
            cooldown: 2
        },

        AQUA: {
            rank: 2,
            power: 57.5,
            cost: 4,
            cast: 0,
            cooldown: 1
        },

        TERRA: {
            rank: 4,
            power: 80,
            cost: 5,
            cast: 0.5,
            cooldown: 3.5
        },

        AER: {
            rank: 3,
            power: 60,
            cost: 3,
            cast: 0,
            cooldown: 0.5
        },

        LUX: {
            rank: 3,
            power: 70,
            cost: 7,
            cast: 0.375,
            cooldown: 2.5
        },

        UMBRA: {
            rank: 5,
            power: 87.5,
            cost: 9,
            cast: 0.75,
            cooldown: 4
        },

        VITA: {
            rank: 2,
            power: 60,
            cost: 5,
            cast: 0.125,
            cooldown: 1.5
        },

        MORS: {
            rank: 3,
            power: 72.5,
            cost: 7.5,
            cast: 0.5,
            cooldown: 3
        }
    }
},

{
    id: "damage-area",
    name: "Dégâts de zone",
    latin: "Explode",
    icon: {
        IGNIS: "images/sigils/ignis-explode.png",
        AQUA: "images/sigils/aqua-explode.png",
        TERRA: "images/sigils/terra-explode.png",
        AER: "images/sigils/aer-explode.png",
        LUX: "images/sigils/lux-explode.png",
        UMBRA: "images/sigils/umbra-explode.png",
        VITA: "images/sigils/vita-explode.png",
        MORS: "images/sigils/mors-explode.png"
    },
    description: "Ajoute des dégâts de zone à la compétence.",

    stats: {
        IGNIS: {
            rank: 5,
            power: 67.5,
            cost: 8,
            cast: 0,
            cooldown: 3.5,
            aoe: 4
        },

        AQUA: {
            rank: 2,
            power: 47.5,
            cost: 6,
            cast: 0,
            cooldown: 2.5,
            aoe: 4
        },

        TERRA: {
            rank: 4,
            power: 70,
            cost: 10,
            cast: 0.5,
            cooldown: 5,
            aoe: 4
        },

        AER: {
            rank: 4,
            power: 55,
            cost: 5,
            cast: 0,
            cooldown: 2,
            aoe: 4
        },

        LUX: {
            rank: 2,
            power: 55,
            cost: 9,
            cast: 0.375,
            cooldown: 4,
            aoe: 4
        },

        UMBRA: {
            rank: 3,
            power: 67.5,
            cost: 11,
            cast: 0.75,
            cooldown: 5.5,
            aoe: 4
        },

        VITA: {
            rank: 2,
            power: 50,
            cost: 7,
            cast: 0.125,
            cooldown: 3,
            aoe: 4
        },

        MORS: {
            rank: 3,
            power: 62.5,
            cost: 9.5,
            cast: 0.5,
            cooldown: 4.5,
            aoe: 4
        }
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
    description: "Ajoute des dégâts périodiques à la compétence.",

    stats: {
        IGNIS: {
            rank: 4,
            power: 72.5,
            duration: 6,
            ticks: 3,
            cost: 6,
            cast: 0,
            cooldown: 2
        },

        AQUA: {
            rank: 5,
            power: 72.5,
            duration: 12,
            ticks: 6,
            cost: 4,
            cast: 0,
            cooldown: 1
        },

        TERRA: {
            rank: 2,
            power: 70,
            duration: 8,
            ticks: 2,
            cost: 5,
            cast: 0.5,
            cooldown: 3.5
        },

        AER: {
            rank: 3,
            power: 60,
            duration: 8,
            ticks: 8,
            cost: 3,
            cast: 0,
            cooldown: 0.5
        },

        LUX: {
            rank: 2,
            power: 65,
            duration: 10,
            ticks: 5,
            cost: 7,
            cast: 0.375,
            cooldown: 2.5
        },

        UMBRA: {
            rank: 5,
            power: 87.5,
            duration: 10,
            ticks: 5,
            cost: 9,
            cast: 0.75,
            cooldown: 4
        },

        VITA: {
            rank: 2,
            power: 60,
            duration: 10,
            ticks: 5,
            cost: 5,
            cast: 0.125,
            cooldown: 1.5
        },

        MORS: {
            rank: 5,
            power: 82.5,
            duration: 12,
            ticks: 6,
            cost: 7.5,
            cast: 0.5,
            cooldown: 3
        }
    }
},

{
    id: "damage-dot-area",
    name: "Dégâts de zone sur la durée",
    latin: "Vexa",
    icon: {
        IGNIS: "images/sigils/ignis-vexa.png",
        AQUA: "images/sigils/aqua-vexa.png",
        TERRA: "images/sigils/terra-vexa.png",
        AER: "images/sigils/aer-vexa.png",
        LUX: "images/sigils/lux-vexa.png",
        UMBRA: "images/sigils/umbra-vexa.png",
        VITA: "images/sigils/vita-vexa.png",
        MORS: "images/sigils/mors-vexa.png"
    },
    description: "Ajoute des dégâts périodiques dans une zone à la compétence.",

    stats: {
        IGNIS: {
            rank: 4,
            power: 62.5,
            duration: 6,
            ticks: 3,
            cost: 8,
            cast: 0,
            cooldown: 3.5,
            aoe: 4
        },

        AQUA: {
            rank: 4,
            power: 57.5,
            duration: 12,
            ticks: 6,
            cost: 6,
            cast: 0,
            cooldown: 2.5,
            aoe: 4
        },

        TERRA: {
            rank: 2,
            power: 60,
            duration: 8,
            ticks: 2,
            cost: 10,
            cast: 0.5,
            cooldown: 5,
            aoe: 4
        },

        AER: {
            rank: 4,
            power: 55,
            duration: 8,
            ticks: 8,
            cost: 5,
            cast: 0,
            cooldown: 2,
            aoe: 4
        },

        LUX: {
            rank: 2,
            power: 55,
            duration: 10,
            ticks: 5,
            cost: 9,
            cast: 0.375,
            cooldown: 4,
            aoe: 4
        },

        UMBRA: {
            rank: 4,
            power: 72.5,
            duration: 10,
            ticks: 5,
            cost: 11,
            cast: 0.75,
            cooldown: 5.5,
            aoe: 4
        },

        VITA: {
            rank: 2,
            power: 50,
            duration: 10,
            ticks: 5,
            cost: 7,
            cast: 0.125,
            cooldown: 3,
            aoe: 4
        },

        MORS: {
            rank: 5,
            power: 72.5,
            duration: 12,
            ticks: 6,
            cost: 9.5,
            cast: 0.5,
            cooldown: 4.5,
            aoe: 4
        }
    }
},

{
    id: "heal-single",
    name: "Soins monocible",
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
    description: "Ajoute un soin monocible à la compétence.",

    stats: {
        IGNIS: {
            rank: 2,
            power: 62.5,
            cost: 6,
            cast: 0,
            cooldown: 2
        },

        AQUA: {
            rank: 2,
            power: 57.5,
            cost: 4,
            cast: 0,
            cooldown: 1
        },

        TERRA: {
            rank: 2,
            power: 70,
            cost: 5,
            cast: 0.5,
            cooldown: 3.5
        },

        AER: {
            rank: 3,
            power: 60,
            cost: 3,
            cast: 0,
            cooldown: 0.5
        },

        LUX: {
            rank: 5,
            power: 80,
            cost: 7,
            cast: 0.375,
            cooldown: 2.5
        },

        UMBRA: {
            rank: 2,
            power: 72.5,
            cost: 9,
            cast: 0.75,
            cooldown: 4
        },

        VITA: {
            rank: 4,
            power: 70,
            cost: 5,
            cast: 0.125,
            cooldown: 1.5
        },

        MORS: {
            rank: 2,
            power: 67.5,
            cost: 7.5,
            cast: 0.5,
            cooldown: 3
        }
    }
},

{
    id: "heal-group",
    name: "Soins de groupe",
    latin: "Salva",
    icon: {
        IGNIS: "images/sigils/ignis-salva.png",
        AQUA: "images/sigils/aqua-salva.png",
        TERRA: "images/sigils/terra-salva.png",
        AER: "images/sigils/aer-salva.png",
        LUX: "images/sigils/lux-salva.png",
        UMBRA: "images/sigils/umbra-salva.png",
        VITA: "images/sigils/vita-salva.png",
        MORS: "images/sigils/mors-salva.png"
    },
    description: "Ajoute un soin de groupe à la compétence.",

    stats: {
        IGNIS: {
            rank: 2,
            power: 52.5,
            cost: 8,
            cast: 0,
            cooldown: 3.5,
            aoe: 4
        },

        AQUA: {
            rank: 2,
            power: 47.5,
            cost: 6,
            cast: 0,
            cooldown: 2.5,
            aoe: 4
        },

        TERRA: {
            rank: 2,
            power: 60,
            cost: 10,
            cast: 0.5,
            cooldown: 5,
            aoe: 4
        },

        AER: {
            rank: 3,
            power: 50,
            cost: 5,
            cast: 0,
            cooldown: 2,
            aoe: 4
        },

        LUX: {
            rank: 4,
            power: 65,
            cost: 9,
            cast: 0.375,
            cooldown: 4,
            aoe: 4
        },

        UMBRA: {
            rank: 2,
            power: 62.5,
            cost: 11,
            cast: 0.75,
            cooldown: 5.5,
            aoe: 4
        },

        VITA: {
            rank: 4,
            power: 60,
            cost: 7,
            cast: 0.125,
            cooldown: 3,
            aoe: 4
        },

        MORS: {
            rank: 2,
            power: 57.5,
            cost: 9.5,
            cast: 0.5,
            cooldown: 4.5,
            aoe: 4
        }
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
    description: "Ajoute un soin périodique à la compétence.",

    stats: {
        IGNIS: {
            rank: 2,
            power: 62.5,
            duration: 6,
            ticks: 3,
            cost: 6,
            cast: 0,
            cooldown: 2
        },

        AQUA: {
            rank: 5,
            power: 72.5,
            duration: 12,
            ticks: 6,
            cost: 4,
            cast: 0,
            cooldown: 1
        },

        TERRA: {
            rank: 2,
            power: 70,
            duration: 8,
            ticks: 2,
            cost: 5,
            cast: 0.5,
            cooldown: 3.5
        },

        AER: {
            rank: 3,
            power: 60,
            duration: 8,
            ticks: 8,
            cost: 3,
            cast: 0,
            cooldown: 0.5
        },

        LUX: {
            rank: 3,
            power: 70,
            duration: 10,
            ticks: 5,
            cost: 7,
            cast: 0.375,
            cooldown: 2.5
        },

        UMBRA: {
            rank: 3,
            power: 77.5,
            duration: 10,
            ticks: 5,
            cost: 9,
            cast: 0.75,
            cooldown: 4
        },

        VITA: {
            rank: 5,
            power: 75,
            duration: 10,
            ticks: 5,
            cost: 5,
            cast: 0.125,
            cooldown: 1.5
        },

        MORS: {
            rank: 4,
            power: 77.5,
            duration: 12,
            ticks: 6,
            cost: 7.5,
            cast: 0.5,
            cooldown: 3
        }
    }
},

{
    id: "heal-hot-area",
    name: "Soins de groupe sur la durée",
    latin: "Recrea",
        icon: {
            IGNIS: "images/sigils/ignis-recrea.png",
            AQUA: "images/sigils/aqua-recrea.png",
            TERRA: "images/sigils/terra-recrea.png",
            AER: "images/sigils/aer-recrea.png",
            LUX: "images/sigils/lux-recrea.png",
            UMBRA: "images/sigils/umbra-recrea.png",
            VITA: "images/sigils/vita-recrea.png",
            MORS: "images/sigils/mors-recrea.png"
        },

    description: "Ajoute des soins périodiques de groupe à la compétence.",

    stats: {
        IGNIS: {
            rank: 2,
            power: 52.5,
            duration: 6,
            ticks: 3,
            cost: 8,
            cast: 0,
            cooldown: 3.5,
            aoe: 4
        },

        AQUA: {
            rank: 4,
            power: 57.5,
            duration: 12,
            ticks: 6,
            cost: 6,
            cast: 0,
            cooldown: 2.5,
            aoe: 4
        },

        TERRA: {
            rank: 2,
            power: 60,
            duration: 8,
            ticks: 2,
            cost: 10,
            cast: 0.5,
            cooldown: 5,
            aoe: 4
        },

        AER: {
            rank: 3,
            power: 50,
            duration: 8,
            ticks: 8,
            cost: 5,
            cast: 0,
            cooldown: 2,
            aoe: 4
        },

        LUX: {
            rank: 3,
            power: 60,
            duration: 10,
            ticks: 5,
            cost: 9,
            cast: 0.375,
            cooldown: 4,
            aoe: 4
        },

        UMBRA: {
            rank: 2,
            power: 62.5,
            duration: 10,
            ticks: 5,
            cost: 11,
            cast: 0.75,
            cooldown: 5.5,
            aoe: 4
        },

        VITA: {
            rank: 4,
            power: 60,
            duration: 10,
            ticks: 5,
            cost: 7,
            cast: 0.125,
            cooldown: 3,
            aoe: 4
        },

        MORS: {
            rank: 3,
            power: 62.5,
            duration: 12,
            ticks: 6,
            cost: 9.5,
            cast: 0.5,
            cooldown: 4.5,
            aoe: 4
        }
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
    description: "Ajoute un bouclier à la compétence.",

    stats: {
        IGNIS: {
            rank: 2,
            power: 62.5,
            cost: 6,
            cast: 0,
            cooldown: 4.5,
            duration: 8
        },

        AQUA: {
            rank: 2,
            power: 57.5,
            cost: 4,
            cast: 0,
            cooldown: 3.5,
            duration: 12
        },

        TERRA: {
            rank: 5,
            power: 85,
            cost: 5,
            cast: 0.5,
            cooldown: 6,
            duration: 12
        },

        AER: {
            rank: 2,
            power: 55,
            cost: 3,
            cast: 0,
            cooldown: 3,
            duration: 6
        },

        LUX: {
            rank: 3,
            power: 70,
            cost: 7,
            cast: 0.375,
            cooldown: 5,
            duration: 10
        },

        UMBRA: {
            rank: 2,
            power: 72.5,
            cost: 9,
            cast: 0.75,
            cooldown: 6.5,
            duration: 8
        },

        VITA: {
            rank: 3,
            power: 65,
            cost: 5,
            cast: 0.125,
            cooldown: 4,
            duration: 10
        },

        MORS: {
            rank: 2,
            power: 67.5,
            cost: 7.5,
            cast: 0.5,
            cooldown: 5.5,
            duration: 8
        }
    }
},

{
    id: "shield-area",
    name: "Bouclier de groupe",
    latin: "Munire",
    icon: {
        IGNIS: "images/sigils/ignis-munire.png",
        AQUA: "images/sigils/aqua-munire.png",
        TERRA: "images/sigils/terra-munire.png",
        AER: "images/sigils/aer-munire.png",
        LUX: "images/sigils/lux-munire.png",
        UMBRA: "images/sigils/umbra-munire.png",
        VITA: "images/sigils/vita-munire.png",
        MORS: "images/sigils/mors-munire.png"
    },
    description: "Ajoute un bouclier de groupe à la compétence.",

    stats: {
        IGNIS: {
            rank: 2,
            power: 52.5,
            cost: 8,
            cast: 0,
            cooldown: 6,
            duration: 8,
            aoe: 4
        },

        AQUA: {
            rank: 2,
            power: 47.5,
            cost: 6,
            cast: 0,
            cooldown: 5,
            duration: 12,
            aoe: 4
        },

        TERRA: {
            rank: 5,
            power: 75,
            cost: 10,
            cast: 0.5,
            cooldown: 7.5,
            duration: 12,
            aoe: 4
        },

        AER: {
            rank: 2,
            power: 45,
            cost: 5,
            cast: 0,
            cooldown: 4.5,
            duration: 6,
            aoe: 4
        },

        LUX: {
            rank: 3,
            power: 60,
            cost: 9,
            cast: 0.375,
            cooldown: 6.5,
            duration: 10,
            aoe: 4
        },

        UMBRA: {
            rank: 2,
            power: 62.5,
            cost: 11,
            cast: 0.75,
            cooldown: 8,
            duration: 8,
            aoe: 4
        },

        VITA: {
            rank: 2,
            power: 50,
            cost: 7,
            cast: 0.125,
            cooldown: 5.5,
            duration: 10,
            aoe: 4
        },

        MORS: {
            rank: 1,
            power: 52.5,
            cost: 9.5,
            cast: 0.5,
            cooldown: 7,
            duration: 8,
            aoe: 4
        }
    }
},

{
    id: "combat-buff",
    name: "Buff de combat",
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
    description: "Ajoute une amélioration temporaire à la compétence.",

    stats: {
        IGNIS: {
            effect: 10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        AQUA: {
            effect: 10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        TERRA: {
            effect: 10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        AER: {
            effect: 10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        LUX: {
            effect: 10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        UMBRA: {
            effect: 10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        VITA: {
            effect: 10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        MORS: {
            effect: 10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        }
    }
},

{
    id: "debuff",
    name: "Débuff",
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
    description: "Ajoute un affaiblissement temporaire à la compétence.",

    stats: {
        IGNIS: {
            effect: -10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        AQUA: {
            effect: -10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        TERRA: {
            effect: -10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        AER: {
            effect: -10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        LUX: {
            effect: -10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        UMBRA: {
            effect: -10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        VITA: {
            effect: -10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        },

        MORS: {
            effect: -10,
            cost: 10,
            cast: 0.5,
            cooldown: 20,
            duration: 10
        }
    }
}

];

let selectedPrimary = null;
let selectedSecondary = null;
let selectedRange = null;

const characterLevel = 50;
const maxAffinity = 1;

let availableAffinityPoints = 5;

const affinities = {
    IGNIS: 0,
    AQUA: 0,
    TERRA: 0,
    AER: 0,
    LUX: 0,
    UMBRA: 0,
    VITA: 0,
    MORS: 0
};

