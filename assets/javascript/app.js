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
  var len = response.data.length;

      for(var i = 0; i < len; i++) {
      //GET rate
      var pictureRated = response.data[i].rating;
      console.log("pictureRated:" + pictureRated);
      //GET image url
      var imgURL = response.data[i].images.fixed_height.url;

      //create div for rate
      var ratedDiv = $("<div>");
      ratedDiv.attr("class", "rated animated fadeInLeft");
      //insert rate information into the div
      ratedDiv.html("Rated: " + pictureRated);

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);
      image.attr("data-state", "animate");
      image.attr("data-still", response.data[i].images.fixed_height_still.url);
      image.attr("data-animate", response.data[i].images.fixed_height.url);
      image.attr("class", "img-responsive animated fadeInRight gif");


      //append
      var gifContainer = $("<div class = 'gifContainer'>");
        gifContainer.append(ratedDiv).append(image);
      $("#add-giphys").append(gifContainer);

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
    // btn.attr("class","zoomIn")
    btn.html(searchTerm[i]);

    $("#buttons").append(btn);

  }
}

buttons();

$("#add-gifs").on("click", function(event) {
  event.preventDefault();

  var gifs = $("#giphy-input").val().trim();

  searchTerm.push(gifs);
  console.log(searchTerm);

  buttons();
});

$("#buttons").on("click", ".giphy-btn", giphyButtons);

$(document).on("click", '.gif', function(){
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
}});
