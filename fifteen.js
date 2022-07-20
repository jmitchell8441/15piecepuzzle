window.onload = function(){
    makeTiles();
}
//when button is clicked, call shuffle
// document.getElementById('button').onclick = shuffle;

function popUp() {
    var popup = document.getElementById("popupContent");
    popup.classList.toggle("show");
}

function makeTiles(){
    // 4x4
    var rows = 4;
    var cols = 4;
    var x = 0;
    var y = 0;
    
    //places gameBoard into HTML
    var gameBoard = document.getElementById('gameBoard');
    //15 boxes with 1 empty space
    for(var i = 1; i < rows * cols; i++){
        //create the individual divs that will contain image and num in middle
        var individual = document.createElement("div");
        //each of the divs will have class tiles
        individual.classList.add("tiles");
        individual.innerHTML = i;
        //background position 
        // 0px   0px  |  -100px   0px  | -200px   0px  | -300px   0px  |
        // 0px -100px |  -100px -100px | -200px -100px | -300px -100px |
        // 0px -200px |  -100px -200px | -200px -200px | -300px -200px |
        // 0px -300px |  -100px -300px | -200px -300px |
        individual.style.top = y + 'px';
		individual.style.left = x + 'px';
		individual.style.backgroundPosition = "-" + x + "px -" + y + "px";
		gameBoard.appendChild(individual);
			if (x >= (rows * 100) - 100) {
                x = 0;
				y += 100;
			}else {
				x += 100;
			}
        }

}

//extra feature change background
function changeBackground(){
    var rows = 4;
    var cols = 4;
    var imageSelect = document.getElementById("imageSelect");
    var selectedImage = imageSelect.options[imageSelect.selectedIndex].value;
    var element = document.getElementsByClassName('tiles');
    //iterate through all the tiles
    for(var i = 0; i < rows * cols; i++){
    // background-image: url('background.jpg');
    element[i].style.backgroundImage = "url('images/" + selectedImage + "')";
    }
}

function shuffle(){

}
