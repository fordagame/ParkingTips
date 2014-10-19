
function NavigateToMap(){
     app.pane.navigateToInitial();
}

function initForm() {
    console.info('b');
    if (kendo.ui.DropDownList) {
        $("#type").kendoDropDownList();
    }
    navigator.geolocation.getCurrentPosition(createMap);
}


var event;
var markers = [];
var addMap;
var flightPath;
var flightPathManual;
var places;
var Coordinates = [];

function createMap(location) {
    
event = null;
markers = [];
addMap = null;
flightPath = null;
flightPathManual = null;
places = null;
Coordinates = [];
    var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
  };
    addMap = new google.maps.Map(document.getElementById("map-add"),
        mapOptions);

    google.maps.event.addListener(addMap, 'click', function (event) {
        if (places) {
            places = null;
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }
        addMarker(event.latLng);
        redrawPath();
        serializeCoordinatesToContainer();
    });


}


function serializeCoordinatesToContainer() {
    Coordinates = [];
    var coordinates = getLatLngFromMarkers();
    for (i = 0; i < coordinates.length; i++) {
        Coordinates[i] = {"Latitude" : coordinates[i].lat() , "Longitude" : coordinates[i].lng()};
    }
}
var polygon2;
function redrawPath() {
    if(polygon2 != null)
       polygon2.setMap(null);
   polygon2 = new google.maps.Polygon({
                paths: getLatLngFromMarkers(),
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
              });
            
  polygon2.setMap(addMap);
}

function getLatLngFromMarkers() {
    var coordinates = [];
    for (i = 0; i < markers.length; i++) {
        coordinates.push(markers[i].position);
    }
    return coordinates;
}

function addMarker(myLatlng) {
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: addMap
    });
    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function (event) {
        for (i = 0; i < markers.length; i++) {
            if (marker === markers[i]) {
                markers.splice(i, 1);
            }
        }
        marker.setMap(null);

        redrawPath();
        serializeCoordinatesToContainer();
    });
}

function centerMap(latLng) {
    addMap.setCenter(latLng);
}

function OnSave(){
    var title = $("#title").val();
    var TipType = $("#type").val();
    var Description = $("#description").val();
    var startHour = $("#startHour").val();
    var endHour = $("#endHour").val();
    console.log([{Description:Description,  StartHour: startHour , EndHour : endHour, IsPrimary: true }]);
var tipsDAL = everlive.data("Tips");
    tipsDAL.create({ 'TipType' : TipType, 'Title': title, 
                    'DescriptionObject' : [{Description:Description,  StartHour: startHour , EndHour : endHour, IsPrimary: true }], 
                    'CoordinateObject' : Coordinates  },
    function(data){
       /* var resultTip = JSON.stringify(data);
        var tip = jQuery.parseJSON( resultTip );
          var tipDescriptionsDAL = everlive.data("TipDescriptions");
            tipDescriptionsDAL.create({Description:Description ,TipID: tip.result.Id, 
                                       StartHour: startHour , EndHour : endHour,
                                       IsPrimary: true },
                                       function(data){ 
                                           
                                            var resultTipDescr = JSON.stringify(data);
                                            var tipDescr = jQuery.parseJSON( resultTipDescr );
                                            tipsDAL.updateSingle({ 'Id': tip.result.Id, 'Descriptions': [tipDescr.result.Id] }, // data
                                                                function(data){
                                                                    console.log(JSON.stringify(data));
                                                                },
                                                                function(error){
                                                                    alert(JSON.stringify(error));
                                                                });
                                           
                                       }, function(data) { console.log(JSON.stringify(data));  });  
        
       var tipDescriptionsDAL = everlive.data("TipDescriptions");
        for(i = 0; i < Descriptions.length; i++){
            tipDescriptionsDAL.create({'Description': Descriptions[i],'TipID': tip.result.Id, 
                                       'StartHour': Descriptions[i].StartHour , 'EndHour', Descriptions[i].EndHour,
                                       'IsPrimary': Descriptions[i].IsPrimary },
                                       function(data){ console.log(JSON.stringify(data)) }, function(data), { console.log(JSON.stringify(data))  });  
        }
        var tipCoordinatesDAL = everlive.data("TipCoordinates");
        for(i = 0; i < Coordinates.length; i++){
            tipCoordinatesDAL.create({TipID: tip.result.Id, 
                                      Latitude: Coordinates[i].Latitude, Longitude: Coordinates[i].Longitude, },
                                       function(data){
                                           var resultTipCoord = JSON.stringify(data);
                                            var tipCoord = jQuery.parseJSON( resultTipCoord );
                                            tipsDAL.updateSingle({ 'Id': tip.result.Id, 'Coordinates': [tipCoord.result.Id] }, // data
                                                                function(data){
                                                                    console.log(JSON.stringify(data));
                                                                },
                                                                function(error){
                                                                    alert(JSON.stringify(error));
                                                                });
                                       }, function(data) { console.log(JSON.stringify(data));  });  
           
        }
       */ 
        $("#title").val('');
        $("#type").val('');
        $("#description").val('');
        $("#startHour").val(0);
        $("#endHour").val(23);
        Coordinates = [];
        navigator.geolocation.getCurrentPosition(createMap);
    },
    function(error){
        alert(error);
    });
}