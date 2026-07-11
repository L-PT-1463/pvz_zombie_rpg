hp = 10;
selected = false;
has_acted = false;

endTurn = function() {
    selected = false;
    has_acted = true;
    
    obj_fight_manager.plantTurn();
}