import fs from 'fs/promises';
import path from 'path';

export interface Cession {
    name: string;
    date: Date;
}

export interface President {
    name: string;
    start: Date;
    end: Date;
}

export interface TreatyData {
    type: 'Feature';
    id: string;
    properties: {
        Name: string;
        description: string;
        Slug: string;
        color: string;
        FrenchName: string;
        FrenchDescription: string;
    };
    geometry: {
        type: string;
        coordinates: number[][][]
    }
}

export async function getCessions(): Promise<Cession[]> {
    return JSON.parse(await loadDataFile('cessions.json'))
        .map(({ name, date }: Record<string, string>) => ({ name, date: new Date(date) }));
}

export async function getPresidents(): Promise<President[]> {
    return JSON.parse(await loadDataFile('presidents.json'))
        .map(({ name, start, end }: Record<string, string>) => ({ name, start: new Date(start), end: new Date(end) }));
}

export async function getTreatyData(): Promise<TreatyData[]> {
    return JSON.parse(await loadDataFile('native-land-treaties.json')).features;
}

async function loadDataFile(filename: string): Promise<string> {
    return (await fs.readFile(path.join(__dirname, '..', '..', 'data', filename))).toString();
}
