async function loadJson(filename) {
    return (await fetch(`data/${filename}`)).json();
}

export async function getTreatyGeoData() {
    // this data originally from https://native-land.ca/wp-content/themes/Native-Land-Theme/files/indigenousTreaties.json
    return (await (await loadJson('native-land-treaties.json'))).features;
}

async function loadPresidentData() {
    return loadJson('presidents.json');
}

async function loadPresidentCessionData() {
    return loadJson('cessions.json');
}

async function loadColoradoCessions() {
    return loadJson('colorado.json');
}

function findTreatyByName(treaties, name) {
    return treaties.find((treaty) => treaty.properties.Name.match(new RegExp(`\\b${name}\\b`)));
}

export async function getGroupedPresidentTreaties(geoData) {
    const presidents = await loadPresidentData();
    const cessions = await loadPresidentCessionData();

    return presidents.map((president) => {
        return {
            president: president,
            cessions:
                cessions
                    .filter((cession) => cession.date >= president.start && cession.date < president.end)
                    .map((cession) => {
                        const treaty = findTreatyByName(geoData, cession.name);

                        if (!treaty) {
                            console.warn(`No treaty named ${cession.name}`);
                        }

                        return treaty;
                    })
                    .filter((t) => !!t),
        };
    });
}

export async function getColoradoTreaties(geoData) {
    const coloradoCessions = await loadColoradoCessions();

    return coloradoCessions.map(({ name }) => {
        const treaty = findTreatyByName(geoData, name)

        if (!treaty) {
            console.warn(`No treaty named ${cession.name}`);
        }

        return treaty;
    }).filter((t) => !!t);
}
