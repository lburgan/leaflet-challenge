let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(data => createFeatures(data));

function createMap(earthquakes){
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps = {
        "Street Map": streetmap
    };

    let overlayMaps = {
        "Earthquakes": earthquakes
    };

    let map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(map);
};

function colorCircle(depth){
    let color = " ";
    if (depth < 10) {
        color = "LimeGreen"
    }else if (depth < 30) {
        color = "GreenYellow"
    }else if(depth < 50 ){
        color = "Yellow"
    }else if(depth < 70){
        color = "Orange"
    }else if (depth < 90){
        color = "OrangeRed"
    }else{
        color = "red"
    };
    return color;

};

function sizeCircle(mag){
    return mag*2000;
};
function createFeatures(response){
    let jsonData = response.features;
    let earthquakes = [];
    for(let index = 0; index<jsonData.length; index ++){
        let quake = jsonData[index];

        let quakeMarker = L.marker([quake.geometry.coordinates[0],quake.geometry.coordinates[1]],{
            radius: sizeCircle(quake.properties.mag),
            fillColor:  colorCircle(quake.geometry.coordinates[2]),
            fillOpacity: 0.7,
            color: "black"
        }).bindPopup(`<h3>Location: ${quake.properties.place}</h3><hr><p>Date: ${new Date(quake.properties.time)}</p><p>Magnitude: ${quake.properties.mag}</p><p>Depth: ${quake.geometry.coordinates[2]}</p>`);
        earthquakes.push(quakeMarker);
    };
    createMap(L.layerGroup(earthquakes))
};