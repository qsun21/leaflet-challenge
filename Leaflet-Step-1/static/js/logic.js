d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Create our initial map object
  // Set the longitude, latitude, and the starting zoom level
  var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 1.8
  });

  // Add a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  function getColor(depth) {
    return depth > 60 ? '#de2d26' :
           depth > 40 ? '#fc9272' :
           depth > 20 ? '#feb24c' :
           depth > 10 ? '#ffeda0' :
           '#31a354';
  }

  function myStyle(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  function getRadius(mag) {
    if(mag < 2) {
      return 1;
    }
    return mag * 4;
  }

  L.geoJson(data, {
 
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    
    style: myStyle,

    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Place: " + feature.properties.place);
    }
  }).addTo(myMap);

});



