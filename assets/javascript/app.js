var searchTerm = ["funny cat", "dogs", "snake"];

function giphyButtons(){
  var giphys = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphys +"&api_key=gI7eNmRqTov5mvPFmCv0I0QPVYf30rSI" + "&limit=10&offset=0&rating=G&lang=en";
  // Creating an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  var len = response.data
      for(var i = 0; i < len; i++) {
      var ratedDiv = $("<div id='rated'>");
      var pictureRated = response.data[i].rating;
      console.log(pictureRated);
      var pOne = $("#rated").html("Rated: " + pictureRated);
      console.log(pOne)
      ratedDiv.append(pOne);

      var imgURL = response.data[i].images.fixed_height.url;
      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      $("#add-giphys").append(image);

      }
});
}
function buttons() {

  $("#buttons").empty();
  // Looping through the array
  for (var i = 0; i < searchTerm.length; i++) {

    var btn = $("<button>");

    btn.addClass("giphy-btn");

    btn.attr("data-name", searchTerm[i]);

    btn.html(searchTerm[i]);

    $("#buttons").append(btn);
  }
}

buttons();

$("#add-giphys").on("click", function(event) {
  event.preventDefault();

  var gifs = $("#giphy-input").val().trim();

  searchTerm.push(gifs);
  console.log(searchTerm);

  buttons();
});
$(document).on("click", ".giphy-btn", giphyButtons);
