//testing Bite if just clicking zombie then plant

with (obj_playerZombie) {
    if (selected) {
        zombie = id;
    }
}

if (zombie != noone) {
    hp -= 2;
    show_debug_message("Plant bitten! HP now:" + string(hp));
    
    zombie.endTurn();
    
    if (hp <= 0) {
        instance_destroy();
        show_debug_message("Plant died!");
    }
}