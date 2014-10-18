var everlive = new Everlive("kbFKnpTMpEO9l6Kj");
var app = new kendo.mobile.Application();

var data = everlive.data("Tips");
data.create({ 'TipType' : 2, 'Title':'Test' },
    function(data){
        var result = JSON.stringify(data);
        var obj = jQuery.parseJSON( result );
    },
    function(error){
        alert(JSON.stringify(error));
    });;

