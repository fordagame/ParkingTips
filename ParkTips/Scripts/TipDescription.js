function initFormDescr(){
    alert(DescriptionId);
    
var tipsDal = everlive.data("Tips");
    tipsDal.getById(DescriptionId).then(function(data){
        console.log(data);
        var resultTip = JSON.stringify(data);
        tip = jQuery.parseJSON( resultTip );
        console.log(tip);
    }, function(data){
        
    });
    $("#description").html("test");
}

function NavigateToMap(){
     app.pane.navigateToInitial();
}
