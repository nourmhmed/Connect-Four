var player1 = prompt("Player One: Enter Your Name, you will be blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name, you will be red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

console.log(table);

function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}


function returnColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


function checkBottom(colIndex){
  var colorReport = returnColor(5, colIndex);
  for(var row = 5; row > -1 ; row--){
    colorReport = returnColor(row, colIndex);
    if(colorReport === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four){
  return(one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

function reportWin(row, col){
  console.log('You win starting from row ' + row + ' and column' + col + '.')
}

function horizontalWinCheck(){
  for (var row = 0; row < 6; row++){
    for (var col = 0; col < 5; col++){ // fixed condition
      if(colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))){
        console.log('Horiz');
        reportWin(row, col);
        return true;
      }else{
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for (var col = 0; col < 7; col++){
    for (var row = 0; row < 3; row++){ // added missing closing bracket
      if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))){
        reportWin(row, col);
        console.log('vert');
        return true;
      }else{
        continue;
      }
    }
  }
}

function diagonalWinCheck(){
  for (var col = 0; col < 7; col++){
    for (var row = 0; row < 4; row++){
      if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))){
        console.log('diag');
        reportWin(row, col);
        return true;
      }
      else if (row >= 3 && colorMatchCheck(returnColor(row, col), returnColor(row-1, col+1), returnColor(row-2, col+2), returnColor(row-3, col+3))){ // added check to prevent negative row access
        console.log('diag');
        reportWin(row, col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

// START WITH PLAYER 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + ' it is your turn, pick a column.');
$('.board button').on('click', function(){
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail, col, currentColor);

  if (diagonalWinCheck() || verticalWinCheck() || horizontalWinCheck()){
    $('h1').text('Player ' + currentName + ', You have won!')
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  currentPlayer = currentPlayer * -1;
  if (currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName + ' it is your turn.')
    currentColor = player1Color
  }else{
    currentName = player2;
    $('h3').text(currentName + ' it is your turn.');
    currentColor = player2Color;
  }
})
