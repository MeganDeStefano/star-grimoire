/* ========================================== VARIABLES =========================================== */

let customSpellName = "";


/* ========================================== PAGE NOVICE =========================================== */

let tankPosture = 0;

function changeTankPosture(amount) {

    if (amount > 0) {

        if (tankPosture >= 1) {
            return;
        }

        tankPosture = 1;

    }

    if (amount < 0) {

        if (tankPosture <= 0) {
            return;
        }

        tankPosture = 0;

    }

    document.getElementById("tank-posture").textContent =
        `${tankPosture} / 1`;

    const postureElement =
        document.getElementById("tank-posture")
            .closest(".affinity");

    postureElement.classList.toggle(
        "active",
        tankPosture > 0
    );

    updateActivePassives();
}

function updateActivePassives() {

    const container =
        document.getElementById("activePassives");

    let html = "";

    Object.keys(affinities).forEach(element => {

        if (affinities[element] > 0) {

            html += `

                <div class="active-passive-row">

                    <span class="active-passive-name element-${element}">
                        <img
                            src="${magicIcons[element]}"
                            alt="${element}"
                            class="active-passive-icon"
                        > 
                        Affinité ${element}
                    </span>

                    <span class="active-passive-value">
                        +10
                    </span>

                </div>

            `;

        }

    });

                /* Posture défensive */

            if (tankPosture > 0) {

                html += `

                    <div class="active-passive-row">

                        <span class="active-passive-name">
                            <div class="active-passive-name">
                                <img
                                    src="images/general/tank.png"
                                    alt="Posture défensive"
                                    class="active-passive-icon"
                                >
                                Posture défensive
                            </div>
                        </span>

                        <span class="active-passive-value">
                            Active
                        </span>

                    </div>

                `;

            }



    if (html === "") {

        html = `

            <div class="empty-passives">
                Aucun passif élémentaire actif.
            </div>

        `;

    }


    container.innerHTML = html;

}


function changeAffinity(element, amount) {

    const currentValue = affinities[element];


    /* AJOUT D'UN POINT */

    if (amount > 0) {

        if (availableAffinityPoints <= 0) {
            return;
        }

        if (currentValue >= maxAffinity) {
            return;
        }

        affinities[element]++;
        availableAffinityPoints--;

    }


    /* RETRAIT D'UN POINT */

    if (amount < 0) {

        if (currentValue <= 0) {
            return;
        }

        affinities[element]--;
        availableAffinityPoints++;

    }


    /* Mise à jour de l'affinité */

    document.getElementById(
        `affinity-${element}`
    ).textContent =
        `${affinities[element]} / ${maxAffinity}`;

    const affinityElement =
        document.getElementById(`affinity-${element}`)
            .closest(".affinity");

    affinityElement.classList.toggle(
        "active",
        affinities[element] > 0
    );


    /* Mise à jour des points disponibles */

    document.getElementById(
        "availablePoints"
    ).textContent =
        availableAffinityPoints;

    updateActivePassives();

}


function renderCurrentPage() {

    const novicePage =
        document.getElementById("novicePage");

    const magicBuilder =
        document.getElementById("magicBuilder");

    if (currentMagic === "NOVICE") {

        novicePage.style.display = "block";
        magicBuilder.style.display = "none";

    } else {

        novicePage.style.display = "none";
        magicBuilder.style.display = "grid";

    }

}

/* ========================================== CREATION DES ONGLETS =========================================== */

function renderMagicTabs() {

    const container = document.getElementById("magicTabs");

    container.innerHTML = "";

    magics.forEach(magic => {

        const button = document.createElement("button");

        button.className =
            "magic-tab" +
            (magic === currentMagic ? " active" : "");

        if (magic === "NOVICE") {
            button.textContent = `⚔️ ${magic}`;
        } else {
            button.innerHTML = `
                <img src="${magicIcons[magic]}" alt="${magic}">
                <span>${magic}</span>
            `;
        }

        button.onclick = () => {

            currentMagic = magic;

            selectedPrimary = null;
            selectedSecondary = null;
            selectedRange = null;
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
            refreshRangeDisplay();
            renderSpellIcons();
            updateResult();
            renderCurrentPage();

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


    /* Si un autre module de la même catégorie est sélectionné,
       celui-ci passe à 50% */

    if (
        !selected &&
        (
            (type === "primary" && selectedPrimary) ||
            (type === "secondary" && selectedSecondary)
        )
    ) {
        element.classList.add("dimmed");
    }


    /* Vérification compatibilité secondaire */

    if (type === "secondary") {

        if (!selectedPrimary) {
            element.classList.add("disabled");
        }

        else if (
            !selectedPrimary.compatible.includes(module.id)
        ) {
            element.classList.add("disabled");
        }

    }


    element.innerHTML = `

        <div class="module-icon">
            ${typeof module.icon === "object"
                ? `<img src="${module.icon[currentMagic]}" alt="${module.latin}">`
                : module.icon}
        </div>

        <div class="module-rank">
            ${"★".repeat(module.stats?.[currentMagic]?.rank || 0)}
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
                selectedRange = null;

                refreshRangeDisplay();

            } else {

                selectedPrimary = module;

                /* Gestion automatique de la portée */

                if (
                    [
                        "damage-single",
                        "damage-area",
                        "damage-dot",
                        "damage-dot-area"
                    ].includes(module.id)
                ) {

                    selectedRange = null;

                } else {

                    selectedRange = "distance";

                }


                /* Si le secondaire actuel devient incompatible
                   avec le nouveau module principal */

                if (
                    selectedSecondary &&
                    !module.compatible.includes(selectedSecondary.id)
                ) {
                    selectedSecondary = null;
                }

            }

            refreshRangeDisplay();

        } else {

            if (!selectedPrimary) return;

            if (
                !selectedPrimary.compatible.includes(module.id)
            ) {
                return;
            }

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


    primaryModules.forEach(module => {

        primaryContainer.appendChild(
            createModuleElement(module, "primary")
        );

    });


    secondaryModules.forEach(module => {

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

/* ========================================== PORTEE =========================================== */

function refreshRangeDisplay() {

    const melee = document.getElementById("rangeMelee");
    const distance = document.getElementById("rangeDistance");

    const rangeChoiceAllowed =
        selectedPrimary &&
        [
            "damage-single",
            "damage-area",
            "damage-dot",
            "damage-dot-area"
        ].includes(selectedPrimary.id);

    melee.classList.toggle(
        "selected",
        selectedRange === "melee"
    );

    distance.classList.toggle(
        "selected",
        selectedRange === "distance"
    );


    if (!selectedPrimary) {

        melee.classList.add("disabled");
        distance.classList.add("disabled");

    }

    else if (!rangeChoiceAllowed) {

        melee.classList.add("disabled");
        distance.classList.remove("disabled");

    }

    else if (!selectedRange) {

        melee.classList.remove("disabled");
        distance.classList.remove("disabled");

    }

    else if (selectedRange === "melee") {

        melee.classList.remove("disabled");
        distance.classList.add("disabled");

    }

    else if (selectedRange === "distance") {

        distance.classList.remove("disabled");
        melee.classList.add("disabled");

    }

}


function selectRange(range) {

    if (!selectedPrimary) return;

    const rangeChoiceAllowed = [
        "damage-single",
        "damage-area",
        "damage-dot",
        "damage-dot-area"
    ].includes(selectedPrimary.id);

    if (!rangeChoiceAllowed) {
        selectedRange = "distance";
        refreshRangeDisplay();
        updateResult();
        return;
    }

    if (selectedRange === range) {
        selectedRange = null;
    } else {
        selectedRange = range;
    }

    refreshRangeDisplay();
    updateResult();
}


function isDamageModule(module) {

    if (!module) return false;

    return [
        "damage-single",
        "damage-area",
        "damage-dot",
        "damage-dot-area"
    ].includes(module.id);

}

/* ========================================== AFFICHAGE DES EFFETS =========================================== */

function generateEffectLine(module, stats) {

    if (!module || !stats) {
        return "";
    }

    let displayedPower = stats.power;

    if (
        selectedRange === "melee" &&
        isDamageModule(module) &&
        displayedPower !== undefined
    ) {
        displayedPower *= 1.10;
        displayedPower = Math.round(displayedPower * 10) / 10;
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
            value = `${element} ${displayedPower}%`;
            break;

        case "damage-area":
            label = "Dégâts de zone";
            value = `${element} ${displayedPower}% · ${stats.aoe}m`;
            break;

        case "damage-dot":
            label = "Dégâts sur la durée";
            value = `${element} ${displayedPower}% / ${stats.duration}s · ${stats.ticks} tics`;
            break;

        case "damage-dot-area":
            label = "Dégâts de zone sur la durée";
            value = `${element} ${displayedPower}% / ${stats.duration}s · ${stats.ticks} tics · ${stats.aoe}m`;
            break;

        case "heal-single":
            label = "Soins";
            value = `${element} ${stats.power}%`;
            break;

        case "heal-group":
            label = "Soins de groupe";
            value = `${element} ${stats.power}% · ${stats.aoe}m`;
            break;

        case "heal-hot":
            label = "Soins sur la durée";
            value = `${element} ${stats.power}% / ${stats.duration}s · ${stats.ticks} tics`;
            break;

        case "heal-hot-area":
            label = "Soins de groupe sur la durée";
            value = `${element} ${stats.power}% / ${stats.duration}s · ${stats.ticks} tics · ${stats.aoe}m`;
            break;

        case "shield":
            label = "Bouclier";
            value = `${element} ${stats.power}% · ${stats.duration}s`;
            break;

        case "shield-area":
            label = "Bouclier de groupe";
            value = `${element} ${stats.power}% · ${stats.duration}s · ${stats.aoe}m`;
            break;

        case "control":
            label = "Contrôle";
            value = `${stats.duration}s · ${stats.aoe}m`;
            break;

        case "combat-buff":
            label = "Buff";
            value = `${element} +${stats.effect}% · ${stats.duration}s`;
            break;

        case "debuff":
            label = "Débuff";
            value = `${element} ${stats.effect}% · ${stats.duration}s`;
            break;

        case "persistent-buff":
            label = "Affinité";
            value = `${element} +${stats.effect}% · 1h`;
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


    /* Modules identiques : on fusionne */

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

    if (
        primaryStats.duration !== undefined &&
        secondaryStats.duration !== undefined
    ) {
        combinedStats.duration =
            primaryStats.duration +
            secondaryStats.duration;
    }

    if (
        primaryStats.ticks !== undefined &&
        secondaryStats.ticks !== undefined
    ) {
        combinedStats.ticks =
            primaryStats.ticks +
            secondaryStats.ticks;
    }

    return generateEffectLine(
        primary,
        combinedStats
    );

}

/* ========================================== RESULTAT EN TEMPS REEL =========================================== */

function canChooseRange() {

    if (!selectedPrimary) {
        return false;
    }

    return [
        "damage-single",
        "damage-area",
        "damage-dot",
        "damage-dot-area"
    ].includes(selectedPrimary.id);

}


function updateResult() {

    const container =
        document.getElementById("spellResult");


    if (!selectedPrimary) {

        container.innerHTML = `

            <div class="empty-result">
                Sélectionnez un module principal pour commencer la création d'une compétence.
                <br><br>
                Un module secondaire pourra ensuite être ajouté si la combinaison est compatible.
            </div>

        `;

        return;
    }


    const primaryStats =
        selectedPrimary.stats?.[currentMagic];

    const secondaryStats =
        selectedSecondary?.stats?.[currentMagic];


    const totalCost =
        selectedPrimary.id === "summon"
            ? (primaryStats?.cost || 0)
            : (primaryStats?.cost || 0) +
              (secondaryStats?.cost || 0);

    const costDisplay =
        primaryStats
            ? totalCost
            : "—";


    const totalCast =
        selectedPrimary.id === "summon"
            ? (primaryStats?.cast || 0)
            : (primaryStats?.cast || 0) +
              (secondaryStats?.cast || 0);

    const castDisplay =
        primaryStats
            ? `${totalCast}s`
            : "—";


    const totalCooldown =
        selectedPrimary.id === "summon"
            ? (primaryStats?.cooldown || 0)
            : (primaryStats?.cooldown || 0) +
              (secondaryStats?.cooldown || 0);

    const cooldownDisplay =
        primaryStats
            ? `${totalCooldown}s`
            : "—";


    const rangeValue =
        selectedRange === "melee"
            ? "0m"
            : selectedRange === "distance"
            ? "10m"
            : "—";


    const rangeWarning =
        !selectedRange
            ? `
                <div class="range-warning">
                    ⚠ Portée non sélectionnée
                </div>
            `
            : "";


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

        ${rangeWarning}

        <div class="spell-info">

            ${generateCombinedEffects(
                selectedPrimary,
                primaryStats,
                selectedSecondary,
                secondaryStats
            )}

            <div class="info-row">
                <span class="info-label">
                    Coût
                </span>

                <span class="info-value">
                    ${costDisplay}
                </span>
            </div>

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
                <span class="info-label">
                    Portée
                </span>

                <span class="info-value">
                    ${rangeValue}
                </span>
            </div>

        </div>

    `;

}


/* ========================================== INITIALISATION =========================================== */

renderMagicTabs();
renderCurrentPage();
renderModules();
refreshRangeDisplay();
renderSpellIcons();
updateResult();
updateActivePassives();
