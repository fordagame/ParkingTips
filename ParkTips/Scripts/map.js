
var map_view = null;
var map;
function Map(){
    map = null;
    navigator.geolocation.getCurrentPosition(InitializeMap);
}

function InitializeMap (location) {
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
  };
    console.info(mapOptions);
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
}

Map.init = function(){
    map_view = new Map();
    $("#map").height($("#map-view [data-role=content]").height());
}

function NavigateToAddNewParkingView(){
     app.navigate('Views/AddNewPlace.html');
}


var expandExp = {
  "Descriptions" : true,
  "Coordinates" : true
};
var query = new Everlive.Query();
query.expand(expandExp);
var tipsDAL = everlive.data("Tips");
tipsDAL.get(query)
    .then(function(data){
        var resultTip = JSON.stringify(data);
        var tip = jQuery.parseJSON( resultTip );
        console.log(tip);
    },
    function(error){
        alert(JSON.stringify(error));
    });