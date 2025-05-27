$(document).ready(function() {
    let score = 0;
    let basketPos = 300; 

    // basket movement
    $(document).keydown(function(e) {
        if (e.key === "ArrowLeft" && basketPos > 20) {
            basketPos -= 20;
        } else if (e.key === "ArrowRight" && basketPos < 485) {
            basketPos += 20;
        }
        $("#basket").css("left", basketPos + "px");
    });

    $(document).ready(function() {
    let score = 0;
    let basketPos = 300;
    let touchStartX = 0;
    let touchEndX = 0;

    // Keyboard movement remains
    $(document).keydown(function(e) {
        moveBasket(e.key);
    });

    // Button taps for movement
    $("#leftBtn").click(() => moveBasket("ArrowLeft"));
    $("#rightBtn").click(() => moveBasket("ArrowRight"));

    // Swipe gestures for mobile
    $("#game-area").on("touchstart", function(event) {
        touchStartX = event.touches[0].clientX;
    });

    $("#game-area").on("touchend", function(event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });

    function moveBasket(direction) {
        if (direction === "ArrowLeft" && basketPos > 20) {
            basketPos -= 20;
        } else if (direction === "ArrowRight" && basketPos < 485) {
            basketPos += 20;
        }
        $("#basket").css("left", basketPos + "px");
    }

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            moveBasket("ArrowLeft"); // Swipe left
        } else if (touchEndX > touchStartX + 50) {
            moveBasket("ArrowRight"); // Swipe right
        }
    }
});


    
    // Function to drop pets
   function dropPet(petId) {
    let petPos = Math.random() * 400; //  horizontal position
    $("#" + petId).css({ "left": petPos + "px", "top": "0px", "opacity": "1", "display": "block" }); 

    $("#" + petId).animate({ top: "370px" }, 1800, function() {
        let basketLeft = $("#basket").position().left;
        let petLeft = $("#" + petId).position().left;

        if (petLeft > basketLeft && petLeft < basketLeft +30) {
            score += 1;
            $("#score").text(score);

            // Fade 
            $("#" + petId).fadeOut(500, function() {
                $(this).css("top", "0px");
                $(this).css("opacity", "1"); 
                $(this).css("display", "block"); 
            });
        } else {
            $("#" + petId).css("top", "0px");
        }
    });
}


    // Pets drop at different intervals
    setInterval(function() { dropPet("falling-cat"); }, 4000);
    setInterval(function() { dropPet("falling-dog"); }, 5000);
});
