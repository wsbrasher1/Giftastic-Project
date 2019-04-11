
$(document).ready(function(){
/*Global Variables
=============================================*/
var topics = ["charlie brown", "the jetsons", "tom and jerry", "rocky and bullwinkle", "felix the cat", "captain caveman", "super friends", "hong kong phooey", "heckle and jeckle", "scooby doo", "mighty mouse" ];

/*Functions
=============================================*/
var createBtn = function(){
    //Removes all elements within the btn-section
    $("btn-section").empty();
for(var i = 0; i < topics.length; i++){
    //Creates new buttons//
    var newBtn = $('<button class="btn-success">');
    //Gives new button an attribute
    newBtn.attr("data-type",topics[i]);
    //Add class to button
    newBtn.attr("class", "gif btn-success");
    //Gives button a name that reflects array
    newBtn.text(topics[i]);
    //Add button to DOM
    $("#btn-section").append(newBtn);

}

}

var submit = function(){
    //When submit button is clicked
    $("#submit-btn").on("click",function(event){
        //Prevents the default form/input events
        event.preventDefault();
        //Get input text value//
        var inputVal = $("#userInput").val();
        //Push user input to array
        topics.push(inputVal);
        //Create new buttons
        createBtn();
        //Testing
        console.log(inputVal);
        console.log(topics);

    });
}

var displayGif = function(){
    var btnVal = $(this).data("type");
    console.log(btnVal);
}

/*Main
=============================================*/
createBtn();
submit();
$(document).on("click", ".gif", displayGif);


})