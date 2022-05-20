import {
    getColoradoTreaties,
    getGroupedPresidentTreaties,
    getMiningCessions,
    getTreatyGeoData,
} from './modules/data.js';
import { addLayerToMap, createMap, removeLayerFromMap } from './modules/map.js';

createMap('main-map');

function createViewControls(entity, layer) {
    const id = `entity-input-${entity.name.toLowerCase().replaceAll(' ', '-')}`;

    const div = document.createElement('div');

    div.classList.add('entity-selector');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.checked = false;
    addToggleListener(checkbox, layer);

    const label = document.createElement('label');
    label.attributes.for = id;
    label.innerText = entity.name;

    div.append(checkbox, label);

    if (entity.start) {
        const dates = document.createElement('span');
        dates.classList.add('president-dates');
        dates.innerText = `(${entity.start.split('-')[0]}-${entity.end.split('-')[0]})`;
        div.append(dates);
    }

    document.getElementById('header').append(div);
}

function addToggleListener(checkbox, layer) {
    checkbox.addEventListener('input', () => {
        if (checkbox.checked) {
            addLayerToMap(layer);
        } else {
            removeLayerFromMap(layer);
        }
    });
}

function addEntity(entity, cessions, c) {
    const layer = L.geoJSON(cessions, { style: (feature) => {
            const color = c ?? `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
            console.log(color);
            return { color, weight: 1, fillColor: color, fillOpacity: 0.4 }
        }});
    createViewControls(entity, layer);
}

const geoData = await getTreatyGeoData();

const groupedByPresident = await getGroupedPresidentTreaties(geoData);
const colors = ['#e55b13', '#f6c519','#699f17', '#1b4a75'];
groupedByPresident.forEach((d, i) => addEntity(d.president, d.cessions, colors[i]));

const coloradoTreaties = await getColoradoTreaties(geoData);
addEntity({ name: 'Colorado' }, coloradoTreaties, '#60099b');

const miningCessions = await getMiningCessions(geoData);
addEntity({ name: 'Mining Cessions' }, miningCessions);
