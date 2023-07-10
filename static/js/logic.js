let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"




    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps = {
        "Street Map": streetmap
    };


    let map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: streetmap
    });
    
   


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


d3.json(url).then(function(data){
    let quakes = data.features;
    for(i=0;0<quakes.length;i++){
       let quake = quake[i];
       L.circle([quake.geometry.coordinates[1],quake.geometry.coordinates[0]],{
        radius: quake.properties.mag * 10,
        color: colorCircle(quake.geometry.coordinates[2])
       }).bindPopup(`This code works`);

    };

});
