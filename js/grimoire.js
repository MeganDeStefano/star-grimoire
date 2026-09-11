/* ========================================== VARIABLES =========================================== */

let customSpellName = "";
let selectedSpellIcon = null;
let currentPosture = "neutral";

/* ========================================== CREATION DES ONGLETS =========================================== */

function renderMagicTabs() {

    const container = document.getElementById("magicTabs");

    container.innerHTML = "";

    magics.forEach(magic => {

        const button = document.createElement("button");

        button.className =
            "magic-tab" +
            (magic === currentMagic ? " active" : "");

        button.innerHTML = `
            <img src="${magicIcons[magic]}" alt="${magic}">
            <span>${magic}</span>
        `;

        button.onclick = () => {

            currentMagic = magic;
            currentMagicLevel = 10;
            
            const magicLevelValue =
                document.getElementById("currentMagicLevelValue");

            if (magicLevelValue) {
                magicLevelValue.textContent = currentMagicLevel;
            }

            const magicLevelIcon =
                document.getElementById("currentMagicLevelIcon");

            if (magicLevelIcon) {
                magicLevelIcon.src = magicIcons[currentMagic];
                magicLevelIcon.alt = currentMagic;
            }

            selectedPrimary = null;
            selectedSecondary = null;
            selectedTargeting = null;
            selectedSpellIcon = null;
            customSpellName = "";

            const customNameInput =
                document.getElementById("customSpellName");

            if (customNameInput) {
                customNameInput.value = "";
            }

            const customNameCount =
                document.getElementById("customNameCount");

            if (customNameCount) {
                customNameCount.textContent = "0";
            }

            renderMagicTabs();
            renderModules();
            refreshTargetingDisplay();
            renderSpellIcons();
            updateResult();
        };
        
        container.appendChild(button);

    });

}


/* ========================================== CREATION DES MODULES ========================================== */

function createModuleElement(module, type) {

    const element = document.createElement("div");

    element.className = "module";

    const selected =
        type === "primary"
            ? selectedPrimary?.id === module.id
            : selectedSecondary?.id === module.id;

    if (selected) {
        element.classList.add("selected");
    }


    if (
        !selected &&
        (
            (type === "primary" && selectedPrimary) ||
            (type === "secondary" && selectedSecondary)
        )
    ) {
        element.classList.add("dimmed");
    }

    /* Le module secondaire devient disponible dès qu'un module principal est sélectionné */

    if (type === "secondary" && !selectedPrimary) {
        element.classList.add("disabled");
    }


    element.innerHTML = `

        <div class="module-icon">
            ${typeof module.icon === "object"
                ? `<img src="${module.icon[currentMagic]}" alt="${module.latin}">`
                : module.icon}
        </div>

        <div class="module-name">
            ${module.latin}
        </div>

        <div class="tooltip">
            <strong>${module.name}</strong>
            ${module.description}
        </div>

    `;


    element.onclick = () => {

        if (type === "primary") {

            /* Si on reclique sur le module principal déjà sélectionné :
               on désélectionne le principal ET le secondaire */

            if (selectedPrimary?.id === module.id) {

                selectedPrimary = null;
                selectedSecondary = null;
                selectedTargeting = null;

                refreshTargetingDisplay();

            } else {

                selectedPrimary = module;
                selectedTargeting = null;

            }

            refreshTargetingDisplay();

        } else {

            if (!selectedPrimary) return;

            /* Cliquer à nouveau retire le secondaire */

            if (selectedSecondary?.id === module.id) {
                selectedSecondary = null;
            } else {
                selectedSecondary = module;
            }

        }

        renderModules();
        updateResult();

    };

    return element;

}


/* ========================================== AFFICHAGE MODULES ========================================== */

function renderModules() {

    const primaryContainer =
        document.getElementById("primaryModules");

    const secondaryContainer =
        document.getElementById("secondaryModules");

    primaryContainer.innerHTML = "";
    secondaryContainer.innerHTML = "";

    definitivePrimaryModules.forEach(module => {

        primaryContainer.appendChild(
            createModuleElement(module, "primary")
        );

    });


    definitiveSecondaryModules.forEach(module => {

        secondaryContainer.appendChild(
            createModuleElement(module, "secondary")
        );

    });

}

function renderSpellIcons() {

    const container = document.getElementById("spellIconOptions");

    if (!container) return;

    container.innerHTML = "";

    spellIcons.forEach(icon => {

        const option = document.createElement("div");

        option.className =
            "spell-icon-option" +
            (!icon.unlocked ? " locked" : "") +
            (selectedSpellIcon === icon.id ? " selected" : "");

        option.innerHTML = `
            <img src="${icon.image}" alt="Icône de compétence">

            <div class="tooltip">
                <strong class="${icon.unlocked ? "unlocked-text" : "locked-text"}">
                    ${icon.unlocked ? "Débloqué" : "Bloqué"}
                </strong>

                ${icon.condition}
            </div>
        `;

        if (icon.unlocked) {

            option.onclick = () => {

                if (selectedSpellIcon === icon.id) {
                    selectedSpellIcon = null;
                } else {
                    selectedSpellIcon = icon.id;
                }

                renderSpellIcons();
                updateResult();

            };

        }

        container.appendChild(option);

    });

}

/* ========================================== NOM PERSONNALISE =========================================== */

function updateCustomSpellName() {

    const input =
        document.getElementById("customSpellName");

    const counter =
        document.getElementById("customNameCount");

    if (!input) return;

    customSpellName = input.value;

    if (counter) {
        counter.textContent = customSpellName.length;
    }

    updateResult();

}

/* ========================================== DESCRIPTION DU SORT =========================================== */

function generateSpellDescription() {

    if (!selectedPrimary) return "";

    let text = selectedPrimary.description;

    if (selectedSecondary) {
        text += " " + selectedSecondary.description;
    }

    return text;

}


/* ========================================== NOM TEMPORAIRE DU SORT =========================================== */

function generateSpellName() {

    if (!selectedPrimary) return "";

    let name = selectedPrimary.latin;

    if (selectedSecondary) {
        name += " " + selectedSecondary.latin;
    }

    return name;

}

/* ========================================== CIBLAGE =========================================== */

function refreshTargetingDisplay() {

    const mono = document.getElementById("targetMono");
    const aoe = document.getElementById("targetAoe");

    if (!mono || !aoe) return;

    mono.classList.toggle(
        "selected",
        selectedTargeting === "mono"
    );

    aoe.classList.toggle(
        "selected",
        selectedTargeting === "aoe"
    );

    if (!selectedPrimary) {
        mono.classList.add("disabled");
        aoe.classList.add("disabled");
    } else {
        mono.classList.remove("disabled");
        aoe.classList.remove("disabled");
    }
}


function selectTargeting(targeting) {

    if (!selectedPrimary) return;

    if (selectedTargeting === targeting) {
        selectedTargeting = null;
    } else {
        selectedTargeting = targeting;
    }

    refreshTargetingDisplay();
    updateResult();
}

/* ========================================== AFFICHAGE DES EFFETS =========================================== */

function generateEffectLine(module, stats) {

    if (!module || !stats) {
        return "";
    }

    const isAoe = selectedTargeting === "aoe";

    let displayedPower = stats.power;
    let displayedEffect = stats.effect;

    /* Niveau de Magie : niveau 1 = 50 % de la valeur de référence niveau 10 = 100 % */

        const levelMultiplier =
            0.5 + ((currentMagicLevel - 1) / 9) * 0.5;

        if (displayedPower !== undefined) {
            displayedPower =
                Math.ceil(displayedPower * levelMultiplier);
        }

        if (
            displayedEffect !== undefined &&
            module.id !== "purga"
        ) {
            displayedEffect =
                Math.ceil(Math.abs(displayedEffect) * levelMultiplier);

            if (module.id === "debuff") {
                displayedEffect *= -1;
            }
        }

        /* Postures : bonus de puissance */

        if (
            currentPosture === "offensive" &&
            (
                module.id === "damage-single" ||
                module.id === "damage-dot"
            )
        ) {
            if (displayedPower !== undefined) {
                displayedPower = Math.ceil(displayedPower * 1.5);
            }
        }

        if (
            currentPosture === "affective" &&
            (
                module.id === "heal-single" ||
                module.id === "heal-hot" ||
                module.id === "shield"
            )
        ) {
            if (displayedPower !== undefined) {
                displayedPower = Math.ceil(displayedPower * 1.5);
            }
        }

    /* Puissance des modules en AoE : 50 % de la valeur Mono par cible */

    if (
        isAoe &&
        displayedPower !== undefined
    ) {
        displayedPower *= 0.5;
    }


    /* Bonus / Malus en AoE : intensité divisée par deux */

    if (
        isAoe &&
        (
            module.id === "combat-buff" ||
            module.id === "debuff"
        ) &&
        displayedEffect !== undefined
    ) {
        displayedEffect *= 0.5;
    }


    /* Purga en AoE : capacité divisée par deux par cible */

    if (
        isAoe &&
        module.id === "purga" &&
        displayedEffect !== undefined
    ) {
        displayedEffect *= 0.5;
    }


    const element = `
        <img
            src="${magicIcons[currentMagic]}"
            alt="${currentMagic}"
            class="element-icon-inline"
        >
    `;

    let label = module.name;
    let value = "";


    switch (module.id) {

        case "damage-single":
            label = "Dégâts";
            value = `${displayedPower} ${element}`;
            break;

        case "damage-dot":
            label = "Dégâts sur la durée";
            value = `${displayedPower} ${element} / ${stats.duration}s · ${stats.ticks} tics`;
            break;

        case "heal-single":
            label = "Soins";
            value = `${displayedPower} ${element}`;
            break;

        case "heal-hot":
            label = "Soins sur la durée";
            value = `${displayedPower} ${element} / ${stats.duration}s · ${stats.ticks} tics`;
            break;

        case "shield":
            label = "Bouclier";
            value = `${displayedPower} ${element} · ${stats.duration}s`;
            break;

        case "combat-buff":
            label = `Résistance ${element}`;
            value = `+${displayedEffect} % · ${stats.duration}s`;
            break;

        case "debuff":
            label = `Résistance ${element}`;
            value = `${displayedEffect} % · ${stats.duration}s`;
            break;

        case "purga":
            label = "Dissipation";

            value = isAoe
                ? `Jusqu'à ${displayedEffect} effet${displayedEffect > 1 ? "s" : ""} par cible`
                : `Jusqu'à ${displayedEffect} effet${displayedEffect > 1 ? "s" : ""}`;

            break;
    }


    return `
        <div class="info-row">
            <span class="info-label">
                ${label}
            </span>

            <span class="info-value">
                ${value}
            </span>
        </div>
    `;
}

/* ========================================== COMBINAISON DES EFFETS =========================================== */

function generateCombinedEffects(
    primary,
    primaryStats,
    secondary,
    secondaryStats
) {

    if (!primary || !primaryStats) {
        return "";
    }


    /* Aucun secondaire */

    if (!secondary || !secondaryStats) {

        return generateEffectLine(
            primary,
            primaryStats
        );
    }


    /* Modules différents */

    if (primary.id !== secondary.id) {

        return (
            generateEffectLine(
                primary,
                primaryStats
            )
            +
            generateEffectLine(
                secondary,
                secondaryStats
            )
        );
    }


    /* Modules identiques : les effets s'additionnent,
       mais leur durée et leur rythme restent inchangés */

    const combinedStats = {
        ...primaryStats
    };

    if (
        primaryStats.power !== undefined &&
        secondaryStats.power !== undefined
    ) {
        combinedStats.power =
            primaryStats.power +
            secondaryStats.power;
    }

    if (
        primaryStats.effect !== undefined &&
        secondaryStats.effect !== undefined
    ) {
        combinedStats.effect =
            primaryStats.effect +
            secondaryStats.effect;
    }


    /* Durée et nombre de tics :
       on conserve les valeurs du module */

    if (primaryStats.duration !== undefined) {
        combinedStats.duration =
            primaryStats.duration;
    }

    if (primaryStats.ticks !== undefined) {
        combinedStats.ticks =
            primaryStats.ticks;
    }


    return generateEffectLine(
        primary,
        combinedStats
    );

}

function generateTargetBehavior(primary, secondary) {

    if (!primary) {
        return "";
    }

    const offensiveModules = [
        "damage-single",
        "damage-dot",
        "debuff"
    ];

    const defensiveModules = [
        "heal-single",
        "heal-hot",
        "shield",
        "combat-buff"
    ];

    const modules = [primary, secondary].filter(Boolean);

    const offensive = modules.filter(module =>
        offensiveModules.includes(module.id)
    );

    const defensive = modules.filter(module =>
        defensiveModules.includes(module.id)
    );

    const purga = modules.filter(module =>
        module.id === "purga"
    );


    let enemyBehavior = "";
    let allyBehavior = "";


    /* PURGA SEUL / PURGA + PURGA */

    if (
        purga.length > 0 &&
        offensive.length === 0 &&
        defensive.length === 0
    ) {
        enemyBehavior =
            "Retire les Bonus de la cible ennemie";

        allyBehavior =
            "Retire les Malus de la cible alliée ou de soi-même";
    }


    /* OFFENSIF + PURGA */

    else if (
        offensive.length > 0 &&
        purga.length > 0
    ) {
        enemyBehavior =
            "Effet offensif + retrait des Bonus sur la cible ennemie";

        allyBehavior =
            "Aucun effet";
    }


    /* DÉFENSIF + PURGA */

    else if (
        defensive.length > 0 &&
        purga.length > 0
    ) {
        enemyBehavior =
            "Effet défensif + retrait des Malus sur le lanceur";

        allyBehavior =
            "Effet défensif + retrait des Malus sur la cible";
    }


    /* OFFENSIF + DÉFENSIF */

    else if (
        offensive.length > 0 &&
        defensive.length > 0
    ) {
        enemyBehavior =
            "Effet offensif sur la cible · effet défensif sur le lanceur";

        allyBehavior =
            "Effet défensif sur la cible · effet offensif sans effet";
    }


    /* OFFENSIF SEUL / OFFENSIF + OFFENSIF */

    else if (offensive.length > 0) {
        enemyBehavior =
            "Tous les effets sur la cible";

        allyBehavior =
            "Aucun effet";
    }


    /* DÉFENSIF SEUL / DÉFENSIF + DÉFENSIF */

    else if (defensive.length > 0) {
        enemyBehavior =
            "Tous les effets sur le lanceur";

        allyBehavior =
            "Tous les effets sur la cible";
    }


    return `
        <div class="info-row">
            <span class="info-label">
                Cible ennemie
            </span>

            <span class="info-value">
                ${enemyBehavior}
            </span>
        </div>

        <div class="info-row">
            <span class="info-label">
                Cible alliée
            </span>

            <span class="info-value">
                ${allyBehavior}
            </span>
        </div>
    `;
}

/* ========================================== RESULTAT EN TEMPS REEL =========================================== */

function updateResult() {

    const container =
        document.getElementById("spellResult");


    if (!selectedPrimary) {

        container.innerHTML = `

            <div class="empty-result">
                Sélectionnez un module principal pour commencer la création d'une compétence.
                <br><br>
                Un module secondaire pourra ensuite être ajouté pour combiner deux effets.
            </div>

        `;

        return;
    }


    const primaryStats =
        selectedPrimary.stats?.[currentMagic];

    const secondaryStats =
        selectedSecondary?.stats?.[currentMagic];

    const totalCast =
        (primaryStats?.cast || 0) +
        (secondaryStats?.cast || 0);

    const castDisplay =
        primaryStats
            ? `${totalCast}s`
            : "—";

    const totalCooldown =
        (primaryStats?.cooldown || 0) +
        (secondaryStats?.cooldown || 0);

    const cooldownDisplay =
        primaryStats
            ? `${totalCooldown}s`
            : "—";

    container.innerHTML = `

    <h2 class="spell-name">
        ${customSpellName.trim() || generateSpellName()}
        <img
            src="${magicIcons[currentMagic]}"
            alt="${currentMagic}"
            class="spell-name-element-icon"
        >
    </h2>

    ${customSpellName.trim() ? `
        <div class="spell-technical-name">
            ${generateSpellName()}
        </div>
    ` : ""}


        <div class="spell-main">

            <div class="spell-icon">

                ${selectedSpellIcon ? `

                    <div class="spell-icon-custom">
                        <img
                            src="${spellIcons.find(icon => icon.id === selectedSpellIcon).image}"
                            alt="Icône personnalisée"
                        >
                    </div>

                ` : `

                    <div class="spell-icon-primary">
                        ${typeof selectedPrimary.icon === "object"
                            ? `<img src="${selectedPrimary.icon[currentMagic]}" alt="${selectedPrimary.latin}">`
                            : selectedPrimary.icon}
                    </div>

                    ${selectedSecondary ? `
                        <div class="spell-icon-secondary">
                            ${typeof selectedSecondary.icon === "object"
                                ? `<img src="${selectedSecondary.icon[currentMagic]}" alt="${selectedSecondary.latin}">`
                                : selectedSecondary.icon}
                        </div>
                    ` : ""}

                `}

            </div>

            <div class="spell-description">
                ${generateSpellDescription()}
            </div>

        </div>

        <div class="spell-info">

            ${generateCombinedEffects(
                selectedPrimary,
                primaryStats,
                selectedSecondary,
                secondaryStats
            )}

            ${generateTargetBehavior(
                selectedPrimary,
                selectedSecondary
            )}

            <div class="info-row">
                <span class="info-label">
                    Incantation
                </span>

                <span class="info-value">
                    ${castDisplay}
                </span>
            </div>

            <div class="info-row">
                <span class="info-label">
                    Recharge
                </span>

                <span class="info-value">
                    ${cooldownDisplay}
                </span>
            </div>

            <div class="info-row">
                <span class="info-label">Ciblage</span>
                <span class="info-value">
                    ${
                        selectedTargeting === "mono"
                            ? "Mono · 1 cible · 100 %"
                            : selectedTargeting === "aoe"
                            ? "AoE · jusqu'à 4 cibles · 50 %"
                            : "—"
                    }
                </span>
            </div>

            <div class="info-row">
                <span class="info-label">Portée</span>
                <span class="info-value">10 m</span>
            </div>

        </div>

    `;

}

function changeCurrentMagicLevel(amount) {

    currentMagicLevel += amount;

    if (currentMagicLevel < 1) {
        currentMagicLevel = 1;
    }

    if (currentMagicLevel > 10) {
        currentMagicLevel = 10;
    }

    const value = document.getElementById("currentMagicLevelValue");

    if (value) {
        value.textContent = currentMagicLevel;
    }

    const icon = document.getElementById("currentMagicLevelIcon");

    if (icon) {
        icon.src = magicIcons[currentMagic];
        icon.alt = currentMagic;
    }

    updateResult();
}

function selectPosture(posture) {

    currentPosture = posture;

    const buttons = {
        neutral: document.getElementById("postureNeutral"),
        defensive: document.getElementById("postureDefensive"),
        offensive: document.getElementById("postureOffensive"),
        affective: document.getElementById("postureAffective")
    };

    Object.entries(buttons).forEach(([key, button]) => {

        if (!button) {
            return;
        }

        button.classList.toggle("active", key === currentPosture);
    });

    updateResult();
}

/* ========================================== INITIALISATION =========================================== */

renderMagicTabs();
renderModules();
refreshTargetingDisplay();
renderSpellIcons();
updateResult();
