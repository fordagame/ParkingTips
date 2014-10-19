
var map_view = null;
var map;
function Map(){
    map = null;
    navigator.geolocation.getCurrentPosition(InitializeMap);
}
var tips = [];
var markers = [];
function InitializeMap (location) {
    
var tipsDAL = everlive.data("Tips");
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
  };
    console.log(location);
    console.log(mapOptions);
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
    
    
tipsDAL.get()
    .then(function(data){
        console.log(data);
        var resultTip = JSON.stringify(data);
        tips = jQuery.parseJSON( resultTip );
        for(i = 0; i < tips.result.length; i++){
            var tip = tips.result[i];
            tip.Markers = [];
            for(j = 0; j < tip.CoordinateObject.length; j++){
                var coordinate = tip.CoordinateObject[j];
                console.log(coordinate);
                var latLng = new google.maps.LatLng(coordinate.Latitude, coordinate.Longitude);
                console.log(latLng);
               // addMarker(latLng)
                tip.Markers.push(latLng);

            }
            
               polygon = new google.maps.Polygon({
                paths: tip.Markers,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
              });
            
              polygon.setMap(map);
            
            google.maps.event.addListener(polygon, 'click', function (event) {
                DescriptionId = tip.Id
                 app.navigate('Views/TipDescription.html', tip.Id);
            });  
        }
    },
    function(error){
        alert(JSON.stringify(error));
    });
    
}


function addMarker(myLatlng) {
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });
    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function (event) {
        //Marker click 
    });
    return marker;
}


Map.init = function(){
    map_view = new Map();
    $("#map").height($("#map-view [data-role=content]").height());
}

function NavigateToAddNewParkingView(){
     app.navigate('Views/AddNewPlace.html');
}

