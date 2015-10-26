$(document).ready(function(){
    callAjax();
});

function callAjax(){
    $.ajax({
        type: "GET",
        url: "/data",
        success: createCarousel
    });
}

var indexTracker = 0;

function createCarousel(data) {
    var classmateArray = data.zeta;  //pull zeta[{object}] data from json

    createNav(classmateArray);  //call createNav function
    createClassmate(classmateArray); //all updateStudents function

    $("#navigation").on('click', '#next', function(){
        nextSlide(classmateArray);
    });  //on click move to nextslide

    $("#navigation").on('click', '#prev', function(){
        prevSlide(classmateArray);
    });  //on click move to prevslide
}

function createClassmate(array){  //add new person to array, this step does not loop through i
    for (i=0; i<array.length; i++) {
        if (i == indexTracker) {
            $("#mainContent").empty();
            $("#mainContent").append("<div class='Name: " + array[i].name + "'></div>");
            var $el = $("#mainContent").children().last();
            $el.append("<h2 class='classmateName'>Name: " + array[i].name + "</h2>");
            $el.append("<p><a class='github' href='" + array[i].github + "'>" + array[i].github + "</a></p>");
            $el.append("<p class='shoutout'>" + array[i].shoutout + "</p>");
        }
    }
    //console.log(array);
}

function createNav(array) {
    $("#navigation").append("<div id='prev' class='btn btn-default'>Prev</div>");
    createIndexPoints(array);
    $("#navigation").append("<div id='next' class='btn btn-default'>Next</div>");
    //$("#index 0").addClass("index-active");

    //console.log(array);
}

function createIndexPoints(array){
    for(var i = 0; i < array.length; i++){
        $("#navigation").append("<div class='index-point' id='index"+ i +"'></div>");
        $("#index0").addClass("index-point-active");
    }
}

function nextSlide(array){
    indexTracker++;
    if(indexTracker >= array.length){
        indexTracker = 0;
    }

    updateIndexPoints(array);
    createClassmate(array);
}

function prevSlide(array){
    indexTracker--;
    if(indexTracker < 0){
        indexTracker = array.length - 1;
    }

    updateIndexPoints(array);
    createClassmate(array);
}

function updateIndexPoints(array) {
    for (var i = 0; i < array.length; i++) {
        $("#index" + i).removeClass("index-point-active");


        if (i == indexTracker) {
            $("#index" + i).addClass("index-point-active");
        }
    }
}
