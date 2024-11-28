//This is the complete list of plant enemies in PvZ ZPG

//plant_tags
    //plant_type
        var shooter     = "Shooter plants attack at a range with straight-shooting projectiles.";
        var lobber      = "Lobber plants attack at a range with lobbed projectiles.";
        var melee       = "Melee plants attack at close proximity.";
        var ground      = "Ground plants cannot be attacked by normal means but don't need to be defeated to complete a level. They do damage to zombies that attack a plant behind them.";
        var protector   = "Protector plants take hits for others; they must be attacked before the plants behind them.";
        var healer      = "Healer plants have powers allowing them to heal or buff other plants or zombies.";
        var debuffer    = "Debuffer plants have powers that weaken their target through status conditions but don't damage it.";

    //range
        var lane        = "A lane of the map.";
        var row         = "A row of the map.";
        var adjFront    = "Adjacent tile in front."
        var adjX        = "Adjacent tiles in the same lane.";
        var adjY        = "Adjacent tiles in the same row.";
        var adjCross    = "Adjacent tiles in the same lane and row.";
        var adj3        = "Tiles in a 3x3 area centred around itself.";
        var leasthp     = "The plant with the least hp.";
        var eaten       = "The effects of the plant happen when it hit by a 'bite' type attack.";
        var ground      = "Range of Ground plants. Attacks on its own tile.";

    //dmg_boolean_tags
        var pierce      = "Attack ignore armor with the 'pass_through' tag.";
        var fire        = "Attack deals double damage to armor with the 'fire_weak' tag. Disables 'chilled' and 'frozen' conditions.";

//template_catergory

    //template_plant
        var description = "";
        var hp          = 8;
        var dmg         = 1;
        var range       = "Add Here";
        var special     = "";
        var plant_type  = "Add Here";

//already in script.js
    //cardboard_peashooter
        var description = "";
        var hp          = 6;
        var dmg         = 1;
        var range       = lane;
        var special     = "";
        var plant_type  = shooter;

    //cardboard_repeater
        var description = "";
        var hp          = 6;
        var dmg         = 1;
        var range       = lane;
        var special     = "Attacks twice";
        var plant_type  = shooter;

    //cardboard_sunflower
        var description = "";
        var hp          = 6;
        var dmg         = 0;
        var range       = eaten;
        var special     = "Death: Heals the creature that triggers the ability for 1hp.";
        var plant_type  = healer;

    //cardboard_kernelpult
        var description = "";
        var hp          = 6;
        var dmg         = 0.5;
        var range       = lane;
        var special     = "Has a 1/4 chance of applying 'buttered' condition to target.";
        var plant_type  = lobber;