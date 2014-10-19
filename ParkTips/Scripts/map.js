
var map_view = null;
var map;
var latLng = null;
function Map(){
    map = null;
    navigator.geolocation.getCurrentPosition(InitializeMap);
}
var tips = [];
var markers = [];
function InitializeMap (location) {
    
var tipsDAL = everlive.data("Tips");
   latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
  var mapOptions = {
    zoom: 12,
    center: latLng
  };
    console.log(location);
    console.log(mapOptions);
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
map.setCenter(latLng);    
    
tipsDAL.get()
    .then(function(data){
        var resultTip = JSON.stringify(data);
        tips = jQuery.parseJSON( resultTip );
        for(i = 0; i < tips.result.length; i++){
            var tip = tips.result[i];
            tip.Markers = [];
            for(j = 0; j < tip.CoordinateObject.length; j++){
                var coordinate = tip.CoordinateObject[j];

                var latLng = new google.maps.LatLng(coordinate.Latitude, coordinate.Longitude);
                
               // addMarker(latLng)
                tip.Markers.push(latLng);

            }
              var polygon = new google.maps.Polygon({
                paths: tip.Markers,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                 tipId: tip.Id
              });
            
              polygon.setMap(map);
            google.maps.event.addListener(polygon, 'click', function (event) {
                 DescriptionId = this.tipId;
                 app.navigate('Views/TipDescription.html');
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

