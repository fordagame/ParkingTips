
function NavigateToMap(){
     app.navigate('Index.html');
}

function Description(){
    this.Description = "";
    this.StartHour = 0;
    this.EndHour = 0;
}

var descriptions = [];




function OnSave(){
    var title = '';
    var TipType = 0;
    var Coordinates = [];
    var Descriptions = [];
var tipsDAL = everlive.data("Tips");
tipsDAL.create({ 'TipType' : 2, 'Title':'Test' },
    function(data){
        var resultTip = JSON.stringify(data);
        var tip = jQuery.parseJSON( result );
            
        var tipsDAL = everlive.data("Tips");
        
        var tipDescriptionsDAL = everlive.data("TipDescriptions");
        for(i = 0; i < Descriptions.length; i++){
            tipDescriptionsDAL.create({'Description': Descriptions[i],'TipID': tip.result.Id, 
                                       'StartHour': Descriptions[i].StartHour , 'EndHour', Descriptions[i].EndHour,
                                       'IsPrimary': Descriptions[i].IsPrimary },
                                       function(data){ console.log(JSON.stringify(data)) }, function(data), { console.log(JSON.stringify(data))  });  
        }
        for(i = 0; i < Descriptions.length; i++){
            tipDescriptionsDAL.create({'TipID': tip.result.Id, 
                                       'Latitude': Coordinates[i].Latitude, 'Longitude', Coordinates[i].Longitude, },
                                       function(data){ console.log(JSON.stringify(data)) }, function(data), { console.log(JSON.stringify(data))  });  
        }
    },
    function(error){
    });
}