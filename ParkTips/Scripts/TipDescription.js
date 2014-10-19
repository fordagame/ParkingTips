function initFormDescr(){
    alert(DescriptionId);
var descriptionTip;
var tipsDal = everlive.data("Tips");
    tipsDal.getById(DescriptionId).then(function(data){
        console.log(data);
        var resultTip = JSON.stringify(data);
        tip = jQuery.parseJSON( resultTip );
        descriptionTip = tip;
        console.log(tip);
    }, function(data){
        
    });
    
    //$("#title").html(descriptionTip.title);
    $("#descriptionText").html("test");
}

function NavigateToMap(){
     app.pane.navigateToInitial();
}
