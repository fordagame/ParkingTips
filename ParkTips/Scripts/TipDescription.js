function initFormDescr(){
var descriptionTip;
var tipsDal = everlive.data("Tips");
    tipsDal.getById(DescriptionId).then(function(data){
        console.log(data);
        var resultTip = JSON.stringify(data);
        tip = jQuery.parseJSON( resultTip );
        descriptionTip = tip;
        console.log(tip);
        $("#title").html(descriptionTip.Title);
        $("#startHour").html(descriptionTip.DescriptionObject[0].StartHour);
        $("#endHour").html(descriptionTip.DescriptionObject[0].EndHour);
        $("#descriptionText").html(descriptionTip.DescriptionObject[0].Description);
    }, function(data){
        
    });
    
    
}

function NavigateToMap(){
     app.pane.navigateToInitial();
}
