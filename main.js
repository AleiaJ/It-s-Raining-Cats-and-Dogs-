$(document).ready(function() {
    let score = 0;
    let basketPos = 0; 

// basket movement

    $(document).keydown(function(e) {
        if (e.key === "ArrowLeft" && basketPos > 20) {
            basketPos -= 40;
        } else if (e.key === "ArrowRight" && basketPos < 250) {
            basketPos += 40;
        }
        $("#basket").css("left", basketPos + "px");
    });

    $(document).ready(function() {
    let score = 0;
    let basketPos = 400;
    let touchStartX = 0;
    let touchEndX = 0;

    $(document).keydown(function(e) {
        moveBasket(e.key);
    });

// Buttons for movement

    $("#leftBtn").click(() => moveBasket("ArrowLeft"));
    $("#rightBtn").click(() => moveBasket("ArrowRight"));

// mobile controls

    $("#game-area").on("touchstart", function(event) {
        touchStartX = event.touches[0].clientX;
    });

    $("#game-area").on("touchend", function(event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });

    function moveBasket(direction) {
        if (direction === "ArrowLeft" && basketPos > 20) {
            basketPos -= 40;
        } else if (direction === "ArrowRight" && basketPos < 445) {
            basketPos += 40;
        }
        $("#basket").css("left", basketPos + "px");
    }


// Swipe control

    function handleSwipe() {
        if (touchEndX < touchStartX - 80) {
            moveBasket("ArrowLeft"); // Swipe left
        } else if (touchEndX > touchStartX + 80) {
            moveBasket("ArrowRight"); // Swipe right
        }
    }
});
    
// Function to drop pets

   function dropPet(petId) {
    let petPos = Math.random() * 400;
    $("#" + petId).css({ "left": petPos + "px", "top": "0px", "opacity": "1", "display": "block" }); 

    $("#" + petId).animate({ top: "370px" }, 1800, function() {
        let basketLeft = $("#basket").position().left;
        let petLeft = $("#" + petId).position().left;

        if (petLeft > basketLeft && petLeft < basketLeft +30) {
            score += 1;
            $("#score").text(score);

// Fade after caught

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


// Pets drop timing

    setInterval(function() { dropPet("falling-cat"); }, 4000);
    setInterval(function() { dropPet("falling-dog"); }, 5000);
});
