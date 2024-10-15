//This is the complete list of objects for PvZ ZPG

//object_tags
    string  armor_helmet    = "Takes damage from all sources instead of your health but deosn't prevent status conditions.";
    string  armor_shield    = "Takes attacks from the front instead of your health and prevents status conditions but can be countered by piercing attacks.";
    string  armor_umbrella  = "Takes attacks from the top instead of your health and prevents status conditions.";
    string  item_attack     = "An item designed to upgrade your attacks.";
    string  item_passive    = "An item design to give you passive bonuses.";

    string  bite        = "A bite based attack is affected by plants with eating based abilities."
    string  strike      = "A non-bite based attack is unaffected by plants with eating based abilities.";
    string  range       = "A ranged attack that does not require contact.";

    bool    magnetisable    = "Weak to Magnetshroom's ability.";

//template_category
    
    //template_armor
        string  description     = "";
        double  armor           = 0;
        string  special         = "";
        string  object_type     = ;
        bool    magnetisable    = false;
        //Note: Base hp is 12

    //template_item
        string  description     = "";
        string  dmg             = 0;
        string  dmg_type        = ;
        string  special         = "";
        string  object_type     = ;   

//armor
    //cone
        string  description     = "The most basic kind of armor.";
        double  armor           = 8;
        string  special         = "";
        string  object_type     = armor_helmet;
        bool    magnetisable    = false;

    //bucket
        string  description     = "A strong metalic helmet.";
        double  armor           = 25;
        string  special         = "";
        string  object_type     = armor_helmet;
        bool    magnetisable    = true;

    //newspaper
        string  description     = "A weak shield that buffs you upon destruction.";
        double  armor           = 10;
        string  special         = "Buffs the player's damage after it's destroyed.";
        string  object_type     = armor_shield;
        bool    magnetisable    = false;

    //screendoor
        string  description     = "The classic and certainly strong shield.";
        double  armor           = 25;
        string  special         = "";
        string  object_type     = armor_shield;
        bool    magnetisable    = true;

    //zcorp_wc_door
        string  description     = "So this is where it went.";
        double  armor           = 25;
        string  special         = "Blocks piercing attacks.";
        string  object_type     = armor_shield;
        bool    magnetisable    = true;

//item_attack
    //bite
        string  description     = "The standard zombie attack.";
        string  dmg             = 1;
        string  dmg_type        = bite;
        string  special         = "";
        string  object_type     = item_attack;

    //riot_cane
        string  description     = "A weak cane used to fend off plant riots.";
        string  dmg             = 1;
        string  dmg_type        = strike;
        string  special         = "";
        string  object_type     = item_attack;  

    //cardboard_shooters
        string  description     = "Roles of toilet paper make for a perfect weapon.";
        string  dmg             = 1;
        string  dmg_type        = range;
        string  special         = "";
        string  object_type     = item_attack;

//item_passive
    //zcorp_mug

//gadget
