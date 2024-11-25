//This is the complete list of plant enemies in PvZ ZPG

//plant_tags
    //plant_type
        var shooter     = "Shooter plants attack at a range with straight-shooting projectiles.";
        var lobber      = "Lobber plants attack at a range with lobbed projectiles.";
        var melee       = "Melee plants attack at close proximity.";
        var ground      = "Ground plants cannot be attacked by normal means but don't need to be defeated to complete a level. They do damage to zombies that attack a plant behind them.";
        var protector   = "Protector plants take hits for others; they must be attacked before the plants behind them.";
        var healer      = "Healer plants have powers allowing them to heal or buff other plants.";
        var debuffer    = "Debuffer plants have powers that weaken the player through status conditions.";

    //range
        var lane        = "A lane of the map.";
        var column      = "A columb of the map.";
        var adjX        = "Adjacent tiles in the same lane.";
        var adjCross    = "Adjacent tiles in the same lane and row.";
        var adj3        = "Tiles in a 3x3 area.";
        var leasthp     = "The plant with the least hp.";
        var eaten       = "The effects of the plant happen when eaten.";

    //dmg_boolean_tags
        var Boolean,    pierce      = "Attack passes hits past armor with the 'pass-through' tag.";
        var Boolean,    fire        = "Deals double damage to certain armors.";

//template_catergory

    //template_plant
        var description = "";
        var hp          = 8;
        var dmg         = 1;
        var range       = "Add Here";
        var special     = "";
        var plant_type  = "Add Here";

//training_grounds
    
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
        var special     = "Eaten; Heals the player for 1hp.";
        var plant_type  = healer;

    //cardboard_kernelpult
        var description = "";
        var hp          = 6;
        var dmg         = 0.5;
        var range       = lane;
        var special     = "Has a 1/4 chance of doing a debuff attack that blocks the target from playing its next turn.";
        var plant_type  = lobber;