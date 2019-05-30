$(document).ready(function(){
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
        }
     });

    var topics = ["charlie brown", "the jetsons", "tom and jerry", "rocky and bullwinkle", "felix the cat", "captain caveman", 
    "super friends", "hong kong phooey", "heckle and jeckle", "scooby doo", "mighty mouse" ]
    var results;

function makeButtons(){
        //Removes all elements within the btn-section
        $("#buttonArea").empty();
    for (var i = 0; i < topics.length; i++) {
        //Creates a new button
        var newBtn = $('<button>');
        //Adds a class to the button
        newBtn.addClass("cartoon-btn");
        //Gives the new button an attribute
        newBtn.attr("data-name", topics[i]);
        //Gives button a name that reflects array
        newBtn.text(topics[i]);
        //Add button to DOM
        $("#buttonArea").append(newBtn);
        };
    };
        //This takes the value from the input box and adds it to the topics array. The function takes each topic in the array and adds all to the page.//
    $("#add-cartoon").on("click", function(event) {
        event.preventDefault();

        var cartoon = $("#userInput").val().trim();
        topics.push(cartoon);
        $("#userInput").val("");
        makeButtons();
        console.log(topics);
    });

    makeButtons();

    //Function for grabbing GIPHY API content//
function displayGifs(){
    var cartoonName = $(this).attr("data-name");
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoonName + "&api_key=2U9VGJZHZ1zln2kbebNnY99c1RvUZWmF&limit=10";

    $.ajax({
        url: giphyURL,
        method: "GET"
    }).done(function(response){
        console.log(giphyURL);
        console.log(response);

        results = response.data;

        $("#gifs").empty();
    for (var i = 0; i < results.length; i++) {
        
            var cartoonDiv = $("<div>");
            var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
            var cartoonImage = $("<img>");

            para.addClass("rating-text")

            cartoonImage.addClass("image-gifs")
            cartoonImage.attr("src", results[i].images.fixed_height_still.url);
            cartoonImage.attr("data-state", "still");
            cartoonImage.attr("data-position", i);

            cartoonDiv.append(para);
            cartoonDiv.append(cartoonImage);
            cartoonDiv.addClass("individual-gifs")

            $("#gifs").prepend(cartoonDiv);
        }; //End For Loop
    }); //Ends AJAX function
};

    //On click event for elements after the page has loaded
    $(document).on("click",".cartoon-btn", (event) => {
        event.preventDefault()
        displayGifs 
    });

    //To animate GIFS

    function gifAnimation() {
        var state = $(this).attr("data-state");
        var position = $(this).attr("data-position"); //will return a string
        position = parseInt(position); //string to integer
  
        console.log(results[position].images.fixed_height.url);
        console.log(position);
  
        if (state === "still") {
          $(this).attr("src", results[position].images.fixed_height.url);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", results[position].images.fixed_height_still.url);
          $(this).attr("data-state", "still");
        }
      };
  
    $(document).on("click", ".image-gifs", gifAnimation);
  
  }); //document.ready


