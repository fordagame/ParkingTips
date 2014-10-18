
var map_view = null;

function Map(){
    this.map = null;
    google.maps.event.addDomListener(window, 'load', this.InitializeMap);
}

Map.prototype.InitializeMap = function() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(42.700, 23.33333)
  };
  this.map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
}

Map.init = function(){
    map_view = new Map();
    $("#map").width($("#map-view [data-role=content]").width());
    $("#map").height($("#map-view [data-role=content]").height());
}

function NavigateToAddNewParkingView(){
     app.navigate('Views/AddNewPlace.html');
}
