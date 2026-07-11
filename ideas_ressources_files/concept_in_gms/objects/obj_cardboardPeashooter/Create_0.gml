hp = 6;
zombie = instance_find(obj_playerZombie, 0);
zHp = zombie.hp;

attack = function() {
    zHp -= 5;
    show_debug_message("Zombie hit! HP now:" + string(zHp));
    
    if (zHp <= 0) {
        instance_destroy(zombie);
        show_debug_message("Zombie died!");
    }
    
    zombie.has_acted = false;
    show_debug_message("Hurrah! It's your turn now!");
}