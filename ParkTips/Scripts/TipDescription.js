function initFormDescr(){
var descriptionTip;
var tipsDal = everlive.data("Tips");
    tipsDal.getById(DescriptionId).then(function(data){
        var resultTip = JSON.stringify(data);
        tip = jQuery.parseJSON( resultTip );
        console.log(tip);
        descriptionTip = tip;
        console.log(tip);
        $("#title").html(tip.result.Title);
        $("#startHour").html(tip.result.DescriptionObject[0].StartHour);
        $("#endHour").html(tip.result.DescriptionObject[0].EndHour);
        $("#descriptionText").html(tip.result.DescriptionObject[0].Description);
    }, function(data){
        
    });
    
    
}

function NavigateToMap(){
     app.pane.navigateToInitial();
}
