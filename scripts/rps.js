
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
    const check_full = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j< 3; j++){
                if(board_state[i][j] == 0){
                    return false
                }
            }
        }
        return true;
    }
    const find_winner = () => {
        let winner = check_diagonal_winner() || check_horizontal_winner() || check_vertical_winner()
        if(!winner){ 
            if(check_full()){
                messages_element.innerHTML = "TIE";
                in_play = false;
                play_again_element.innerHTML = "PLAY AGAIN?";
                play_again_holder.classList.add('selectable');
                play_again_element.addEventListener('click', reset_game);
            }
        }
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
    let target_class = e.target.classList;

    if (in_play){
        if (target_class.contains("board-spot")){
            let id = e.target.id

            e.target.setHTML( "<img src=\"./assets/" + current_player + (Math.floor(Math.random() * 9) + 1) + ".png\">");
            b.place_move_abs(id, current_player);
            change_player();


        }
    }
}
function add_buttons(){
    let board_spots = document.querySelectorAll('.board-spot')
    board_spots.forEach((spot) => {
        spot.className = "xturn board-spot"
        spot.addEventListener('click', buttonFunction, true)
    })
}
function change_player(){
    let board_spots = document.querySelectorAll('.board-spot')
    if(current_player == 'x'){
        current_player = 'o'; 
    }else{
        current_player = 'x';
    }
    board_spots.forEach ( (spot) => {
        if(spot.childElementCount < 1){
            spot.className = current_player + "turn board-spot";
        }else{
            spot.className = "board-spot"
        }
    })
    
}

let board_spots = document.querySelectorAll('.board-spot')
add_buttons();
const game_board_element = document.querySelector('.body')
const messages_element = document.querySelector('.message')
const play_again_element = document.querySelector('.play-again')
const play_again_holder = document.querySelector('.play-agains');
function reset_game(){
    current_player = 'o';
    messages_element.innerHTML = "";
    play_again_element.innerHTML = "";
    play_again_holder.classList.remove('selectable');
    b.reset_board();
    
    game_board_element.innerHTML = "";
    for(var i = 1; i <= 9 ; i++){
        let my_spot = document.createElement("div")
        my_spot.className = "board-spot"
        my_spot.id = i
        game_board_element.appendChild(my_spot);
    }
    
    add_buttons();
    change_player();
    play_again_element.removeEventListener('click', reset_game);
}