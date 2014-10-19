function initFormDescr(){
var tipsDal = everlive.data("Tips");
    tipsDal.getById(DescriptionId).then(function(data){
        var resultTip = JSON.stringify(data);
        tip = jQuery.parseJSON( resultTip );
        console.log(tip);
        $("#title2").html(tip.result.Title);
        $("#startHour2").html(tip.result.DescriptionObject[0].StartHour);
        $("#endHour2").html(tip.result.DescriptionObject[0].EndHour);
        $("#descriptionText2").html(tip.result.DescriptionObject[0].Description);
    }, function(data){
        
    });
}

function NavigateToMap(){
     app.pane.navigateToInitial();
}
