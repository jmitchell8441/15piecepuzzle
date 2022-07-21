window.onload = function(){
    makeTiles();
    changeBackground();
    document.getElementById('hint').src = '';

}
//when button is clicked, call shuffle
// document.getElementById('button').onclick = shuffle;

function popUp() {
    var popup = document.getElementById("popupContent");
    popup.classList.toggle("show");
}

let solved = false;
//onclick and on mouseover

const game = document.getElementById('gameBoard');
//move piece
game.addEventListener('click', function(e) {
    moveTile(e.target);
});
//shuffle
document.getElementById('shuffle').addEventListener('click', function(e) {
    shuffle();
    document.getElementsByTagName('body')[0].style.backgroundColor = '';
    document.getElementById('winner').innerHTML = '';
});
//reload page
document.getElementById('reload').addEventListener('click', function(e) {
    window.location.reload();
    document.getElementsByTagName('body')[0].style.backgroundColor = '';
    return false;
});

//show valid moves by hover
game.addEventListener('mouseover', function(e) {
    //console.log('check tile'+checkValidTile(isNextTo(e.target)));
    if(checkValidTile(isNextTo(e.target)) !== -1 && !e.target.classList.contains('empty')){
        console.log('removeNotValid');
        e.target.classList.remove('notValid');
        e.target.classList.add('validMove');
        console.log('addValidMove');
    }
});
game.addEventListener('mouseout', function(e){
    //console.log(e.target.classList.contains('validMove'))
    if(e.target.classList.contains('validMove') && checkValidTile(isNextTo(e.target)) == -1){
        e.target.classList.remove('validMove');
        e.target.classList.add('notValid');
    }
});


//create cheat sheet
document.getElementById('cheat').addEventListener('mouseout', function(e){
    const img = document.getElementById('hint');
    img.src = '';
});
document.getElementById('cheat').addEventListener('mouseover', function(e){
    var imageSelect = document.getElementById("imageSelect");
    var selectedImage = imageSelect.options[imageSelect.selectedIndex].value;

    const img = document.getElementById('hint');
    img.src = './images/'+ selectedImage;

    console.log(img);
});

document.getElementById('imageSelect').addEventListener('change', function(e) {
    const img = document.getElementById('hint');
    img.src = '';
});
document.getElementById('imageSelect').addEventListener('change', function(e) {
    const img = document.getElementById('hint');
    img.src = '';
})

    function getImg(selectedImage){
        console.log(selectedImage);
        //document.getElementById('hint').src = './images/'+selectedImage;
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
    for(var i = 0; i < rows * cols; i++){
        //create the individual divs that will contain image and num in middle
        var individual = document.createElement("div");
        //each of the divs will have class tiles

        individual.setAttribute('class','tiles');
        individual.setAttribute('id', 'tile'+(i+1));
        individual.innerHTML = i+1;

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
        const tileClass = document.getElementsByClassName('tiles');
        tileClass[tileClass.length - 1].classList.add('empty');

        document.querySelector('.empty').style.backgroundImage = '';
        console.log(tileClass[tileClass.length - 1].id)

}
const tiles = document.getElementsByClassName('tiles');

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
    document.getElementById('hint').src = './images/background.jpg';
    document.querySelector('.empty').innerHTML = '';
    document.querySelector('.empty').style.backgroundImage = '';
}

function setBackground(){
    var rows = 4;
    var cols = 4;
    let tiles = document.getElementsByClassName('tiles');
    for (let i = 0; i < rows * cols; i++) {
        // background-image: url('background.jpg');
        tiles[i].style.backgroundImage = 'url("./images/background.jpg")';
    }
    document.querySelector('.empty').style.backgroundImage = '';
}

function shuffle(){

    let nextTo;
    let moves = 1000; //how many moves to shuffle (difficulty);

    for(let i=0; i < moves; i++){
        nextTo = isNextTo(empty());
        moveTile(nextTo[parseInt(Math.random() * nextTo.length)]);
    }

}

function getTile(n){ //gets the tile information based on tile Number
    return document.getElementById('tile'+n);
}

function empty(){ //finds the empty tile and gets the tile information
    return document.querySelector('.empty');
}

function isNextTo(selected){
    console.log(selected.id);

    let splitTileId = selected.id.split('tile'); //creates array of ['tile','tileNumber'];
    let tileNum = parseInt(splitTileId[1]); //splitTileId[1] refrences tile Number

    const x = 1; //horizontal movement
    const y = 4; //vertical movement

    let nextTo = [];

    //console for debugging 
        //console.log(tileNum);
        //console.log(selected);

    //corner cases
        //should only have 2 valid moves
    if(tileNum == 1){ //top left
        nextTo.push(getTile(tileNum+x),getTile(tileNum+y));
    }
    if(tileNum == 4){ //top right
        nextTo.push(getTile(tileNum-x),getTile(tileNum+y));
    }
    if(tileNum == 13){ //bottom left
        nextTo.push(getTile(tileNum+x),getTile(tileNum-y));
    }
    if(tileNum == 16){ //bottom right
        nextTo.push(getTile(tileNum-x),getTile(tileNum-y));
    }

    //center Tiles
        //four center cases
        //can have open tile is any direction 
    if(tileNum == 6 || tileNum == 7 || tileNum == 10 || tileNum == 11){
        nextTo.push(getTile(tileNum+x));
        nextTo.push(getTile(tileNum-x));
        nextTo.push(getTile(tileNum+y));
        nextTo.push(getTile(tileNum-y));

    }
    //edge cases
        //for the egde cases, which are not corners
        //should have only 3 vaild moves
    if(tileNum == 2 || tileNum == 3){ //top edge
        nextTo.push(getTile(tileNum+x));
        nextTo.push(getTile(tileNum-x));
        nextTo.push(getTile(tileNum+y));

    }
    if(tileNum == 14 || tileNum == 15){ //bottom edge
        nextTo.push(getTile(tileNum+x));
        nextTo.push(getTile(tileNum-x));
        nextTo.push(getTile(tileNum-y));
    }
    if(tileNum == 5 || tileNum == 9){ //left edge
        nextTo.push(getTile(tileNum+x));
        nextTo.push(getTile(tileNum+y));
        nextTo.push(getTile(tileNum-y));
    }
    if(tileNum == 8 || tileNum == 12){ //right edge
        nextTo.push(getTile(tileNum-x));
        nextTo.push(getTile(tileNum+y));
        nextTo.push(getTile(tileNum-y));
    }

    return nextTo; //return the array of possible tile moves from a given position 
}

function checkValidTile(nextTo){
    //console to help debug
        //console.log((tiles[15].className) === 'tiles empty');
        //console.log(nextTo.length);
    
        for(let i = 0; i < nextTo.length; i++){
            if(nextTo[i].classList.contains('empty')){
                return nextTo[i]; //if empty tile is found return
            }
        }
        return -1; //if empty tile isnt within valid spaces
}

function moveTile(selected){

    let empty = checkValidTile(isNextTo(selected));
    console.log(empty);

    if(empty == -1) return; // if the tile isn't in a valid space to move

    //hold all values for selected tile
    let holdClass = selected.className;
    let holdInner = selected.innerHTML;
    let holdPos = selected.style.backgroundPosition;
    let holdBackImg = selected.style.backgroundImage;

    let emptyClass = empty.className;
    let emptyInner = empty.innerHTML;
    let emptyPos = empty.style.backgroundPosition;
    let emptyBackImg = empty.style.backgroundImage;

    //set selected tile to empty tile
    selected.className = emptyClass;
    selected.innerHTML = emptyInner;
    selected.style.backgroundImage = emptyBackImg;
    selected.style.backgroundPosition = emptyPos;

    //set empty tile to selected tile
    empty.className = holdClass;
    empty.innerHTML = holdInner;
    empty.style.backgroundImage = holdBackImg;
    empty.style.backgroundPosition = holdPos;

    isSolved();

    let counter = 0; 
    let current;

    for(let i = 0; i < tiles.length; i++){
        counter++;
        current = getTile(i+1);
        hasValidMove(current);
    }
}

function hasValidMove(selected) {
    if(selected.classList.contains('validMove')){
        selected.classList.remove('validMove');
        selected.classList.add('notValid');
    }
}

function isSolved(){
    let counter = 0;
    let current;

    for(let i = 0; i < tiles.length; i++){
        counter++;
        current = getTile(i+1);

        if(!current.classList.contains('empty')){ //if class list doesnt have 'empty' class
            if(current.innerHTML != counter) return; //if the inner isn't == counter, not solved
        }
    }
    solved = true;
    //if(solved == true){
        alert('You Solved It!');
        startConfetti();
        document.getElementsByTagName('body')[0].style.backgroundColor = '#EF626C';
        document.getElementById('winner').innerHTML = '<h1>YOU WON!!</h1>';
        setTimeout(stopConfetti, 5000);
   // }

    return true;
}
