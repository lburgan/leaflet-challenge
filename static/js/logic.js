let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(data => console.log(data));

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

    let map = L.map("map-id", {
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

function createFeatures(earthquakeData){
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
      };
    function createMarker()
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,

      });

}