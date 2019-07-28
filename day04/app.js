var cities = [];

$.ajax({
    url: "https://raw.githubusercontent.com/attainu-nightingale/nightingale-course-module/master/coding-challenges/data/cities.json",
    method: "GET",
    datatype: "json",
    success: function (data) {
        data = JSON.parse(data);
        //console.log(data[0].name);
        for(var i = 0; i < data.length; i++) {
           cities.push(data[i]);
        }
    }
});


//console.log(cities);
 var searchField = document.querySelector("#search-keyword");
 var searchedForLetter;

 $("#submit-btn").on('click',  function(e) {
    e.preventDefault();
    searchedForLetter = searchField.value;
    $("#response-container ul").html("");
    for(var i = 0; i < cities.length; i++) {
         if(cities[i].name.charAt(0).toLowerCase().concat(cities[i].name.charAt(1).toLowerCase()) == searchedForLetter.toLowerCase() || cities[i].name.charAt(0).toLowerCase() == searchedForLetter.toLowerCase()) {
             $("#response-container ul").append('<li>City:'+cities[i].name+'<br><span> State :'+cities[i].state+'<span></li>');
         }
     }
});
