let map;

export function createMap(id) {
    map = L.map(id).setView([39.833333, -98.583333], 4.5);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://native-land.ca/">Native Land Digital</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: '01hair/ckulisvuf0u5r18saefaik8yr',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiMDFoYWlyIiwiYSI6ImNrdWxpMW00ajNpaW4zMHFqaWlzeTBkczUifQ.1VRBYaus5ouRNtyGD92Lig',
    }).addTo(map);
}

export function addLayerToMap(layer) {
    layer.addTo(map);
}

export function removeLayerFromMap(layer) {
    layer.removeFrom(map);
}
