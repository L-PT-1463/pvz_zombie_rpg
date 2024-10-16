
//This is the complete list of plant enemies in PvZ ZPG

//plant_tags
    string  shooter     = "Shooter plants attack at a range with straight-shooting projectiles.";
    string  lobber      = "Lobber plants attack at a range with lobbed projectiles.";
    string  melee       = "Melee plants attack at close proximity.";
    string  protector   = "Protector plants take hits for others; they must be attacked before the plants behind them.";
    string  eaten       = "Eaten plants have special powers that specifically trigger on being eaten.";
    string  healer      = "Healer plants have powers allowing them to heal or buff other plants.";
    string  debuffer    = "Debuffer plants have powers that weaken the player through status conditions.";
    string  ground      = "Ground plants cannot be attacked by normal means but don't need to be defeated to complete a level. They do damage to zombies that attack a plant behind them.";

    string  lane        = "A lane of the map.";
    string  column      = "A columb of the map.";
    string  adjX        = "Adjacent plants in the same lane.";
    string  adjCross    = "Adjacent plants in the same lane and row.";
    string  leasthp     = "The plant with the least hp.";


//template_catergory

    //template_plant
        string  description = "";
        double  hp          = ;
        double  dmg         = ;
        string  range       = ;
        string  special     = "";
        string  plant_type  = ;

//training_grounds
    
    //cardboard_peashooter
        string  description = "";
        double  hp          = 6;
        double  dmg         = 1;
        string  range       = lane;
        string  special     = "";
        string  plant_type  = shooter;

    //cardboard_repeater
        string  description = "";
        double  hp          = 6;
        double  dmg         = 1;
        string  range       = lane;
        string  special     = "Attacks twice";
        string  plant_type  = shooter;

    //cardboard_sunflower
        string  description = "";
        double  hp          = 6;
        double  dmg         = 0;
        string  range       = eaten;
        string  special     = "Eaten; Heals the player for 1hp.";
        string  plant_type  = healer;

    //cardboard_kernelpult
        string  description = "";
        double  hp          = 6;
        double  dmg         = 0.5;
        string  range       = lane;
        string  special     = "Has a 1/4 chance of doing a debuff attack that blocks the target from playing its next turn.";
        string  plant_type  = lobber;