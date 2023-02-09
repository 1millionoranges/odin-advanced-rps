console.log('init')
let in_play = true
const makeBoard = () => {
    this.board_state = [[0,0,0],[0,0,0],[0,0,0]];
    const place_move = (pos, player) => {
        if(in_play ){
            board_state[pos[0]][pos[1]] = player;
            find_winner();
        }
    }
    const place_move_abs = (pos, player) => {
        y = Math.floor((parseInt(pos)-1) / 3);
        x = ((pos-1) % 3);
        place_move([y,x], player);
    }
    const check_horizontal_winner = () => {
        for(i = 0; i < 3; i++){
            let horiz_winner = this.board_state[i][0];
            if(horiz_winner != 0){
                for(j = 1; j<3; j++){
                    if(this.board_state[i][j] != horiz_winner){
                        horiz_winner = false;
                    }
                }
                if (horiz_winner) { return horiz_winner; }
            }
        }
        return false;
    }
    const check_vertical_winner = () => {
        for(i = 0; i < 3; i++){
            let vert_winner = this.board_state[0][i];
            if(vert_winner != 0){
                for(j = 1; j<3; j++){
                    if(this.board_state[j][i] != vert_winner){
                        vert_winner = false;
                    }
                }
                if (vert_winner) { return vert_winner; }
            }
        }
        return false;
    }
    const check_diagonal_winner = () => {
        let a = this.board_state;
        if (a[0][0] != 0 && a[0][0] == a[1][1] && a[0][0] == a[2][2]) { return a[0][0]}
        if (a[0][2] != 0 && a[0][2] == a[1][1] && a[0][2] == a[2][0]) { return a[0][2]}
    }
    const find_winner = () => {
        let winner = check_diagonal_winner() || check_horizontal_winner() || check_vertical_winner()
        if(winner) {
            in_play = false;
            play_again_element.innerHTML = "PLAY AGAIN?";
            play_again_holder.classList.add('selectable');
            play_again_element.addEventListener('click', reset_game);
            messages_element.innerHTML = winner.toUpperCase() + " WINS ! ";
        }
        return winner;
    }
    const reset_board = () => {
        in_play = true;
        this.board_state = [[0,0,0],[0,0,0],[0,0,0]];
        
    }
    return{ find_winner , place_move, place_move_abs, reset_board, in_play };
}
let b = makeBoard();
let current_player = 'x';

function buttonFunction(e){
    let id = e.target.getAttribute("id");
    let target_class = e.target.getAttribute("class");
    if (in_play){
        if (target_class == "board-spot"){
            e.target.setHTML( "<img src=\"./" + current_player + ".png\">");
            b.place_move_abs(id, current_player);
            if(current_player == 'x'){
            current_player = 'o'; 
            }else{
                current_player = 'x';
            }


        }
    }
}
function add_buttons(){
    const board_spots = document.querySelectorAll('.board-spot')
    board_spots.forEach((spot) => {
        console.log(spot.getAttribute("class"));
        spot.addEventListener('click', buttonFunction, true)
    })
}

add_buttons();
const game_board_element = document.querySelector('.body')
const messages_element = document.querySelector('.message')
const play_again_element = document.querySelector('.play-again')
const play_again_holder = document.querySelector('.play-agains');
function reset_game(){
    messages_element.innerHTML = "";
    play_again_element.innerHTML = "";
    play_again_holder.classList.remove('selectable');
    b.reset_board();
    
    game_board_element.innerHTML = "";
    for(var i = 1; i <= 9 ; i++){
        game_board_element.innerHTML += "<div class=\"board-spot\" id=\"" + i + "\"><\div>";
    }
    add_buttons();
    play_again_element.removeEventListener('click', reset_game);
}