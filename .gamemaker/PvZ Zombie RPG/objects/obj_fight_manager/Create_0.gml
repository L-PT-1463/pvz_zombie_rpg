plants_turn = 0;

plantTurn = function() {
    if (plants_turn) {
        obj_cardboardPeashooter.attack();
        show_debug_message("It's the Plant's turn now!");
    }
}