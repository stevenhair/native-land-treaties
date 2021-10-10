import { Cession, getCessions, getPresidents, getTreatyData, President, TreatyData } from './load';

function getTreaty(treaties: TreatyData[], name: string): TreatyData | null {
    return treaties.find((treaty) => treaty.properties.Name.match(new RegExp(`\\b${name}\\b`))) ?? null;
}

function groupTreatyData(
    presidents: President[],
    cessions: Cession[],
    treaties: TreatyData[],
): { president: string, cessions: TreatyData[] }[] {
    return presidents.map((president) => {
        return {
            president: president.name,
            cessions:
                cessions
                    .filter((cession) => cession.date >= president.start && cession.date < president.end)
                    .map((cession) => {
                        const treaty = getTreaty(treaties, cession.name);

                        if (!treaty) {
                            console.log(`No treaty named ${cession.name}`);
                        }

                        return treaty;
                    })
                    .filter((t): t is TreatyData => !!t),
        }
    });
}

async function go(): Promise<void> {
    const presidents = await getPresidents();
    const cessions = await getCessions();
    const treaties = await getTreatyData();
    const grouped = groupTreatyData(presidents, cessions, treaties);

    console.log(grouped);
}

go().catch((e) => console.error(e));
