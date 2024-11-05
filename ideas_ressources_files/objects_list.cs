//This is the complete list of objects for PvZ ZPG

//object_tags
    //object_type
        string  armor_helmet    = "Takes damage from all source instead of your health but deosn't prevent status conditions.";
        string  armor_shield    = "Takes attacks from 'shooter' and 'melee' plants instead of your health and prevents status conditions.";
        string  armor_umbrella  = "Takes attacks from 'lobber' plants instead of your health and prevents status conditions.";
        string  item_attack     = "An item designed to upgrade your attacks.";
        string  item_passive    = "An item design to give you passive bonuses.";
        string  item_gadget     = "A single-use item, often used to summon spawnlings.";

    //dmg_type
        string  bite        = "A bite based attack is affected by plants with 'eaten' range."
        string  strike      = "A non-bite based attack is unaffected by plants with eating based abilities.";
        string  range       = "A ranged attack that does not require contact.";

    //armor_boolean_tags
        bool    magnetisable    = "Weak to Magnetshroom's ability.";
        bool    pass-through    = "Attacks with a 'pierce' tag can hit through the armor.";

//template_category
    
    //template_armor
        string  description     = "";
        double  armor           = 0;
        string  special         = "";
        string  object_type     = ;
        bool    magnetisable    = false;
        bool    pass-through    = false;
        //Note: Base hp is 12

    //template_item
        string  description     = "";
        string  dmg             = 0;
        string  dmg_type        = ;
        string  special         = "";
        string  spawnlings      = "";
        string  object_type     = ;   

//armor
    //cone
        string  description     = "The most basic kind of armor.";
        double  armor           = 8;
        string  special         = "";
        string  object_type     = armor_helmet;
        bool    magnetisable    = false;
        bool    pass-through    = false;

    //bucket
        string  description     = "A strong metalic helmet.";
        double  armor           = 25;
        string  special         = "";
        string  object_type     = armor_helmet;
        bool    magnetisable    = true;
        bool    pass-through    = false;

    //newspaper
        string  description     = "A weak shield that buffs you upon destruction.";
        double  armor           = 10;
        string  special         = "Buffs the player's damage after it's destroyed.";
        string  object_type     = armor_shield;
        bool    magnetisable    = false;
        bool    pass-through    = true;

    //screendoor
        string  description     = "The classic and certainly strong shield.";
        double  armor           = 25;
        string  special         = "";
        string  object_type     = armor_shield;
        bool    magnetisable    = true;
        bool    pass-through    = true;

    //zcorp_wc_door
        string  description     = "So this is where it went.";
        double  armor           = 25;
        string  special         = "";
        string  object_type     = armor_shield;
        bool    magnetisable    = true;
        bool    pass-through    = false;

    //party_cone

    //ice_block

    //brick_head

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

    //camera

    //excavator_shovel

//item_passive
    //zcorp_mug

    //ducky_tube

    //flag

    //frozen_flag

//gadget
    //pocket_shield_gen

    //zcorp_cellphone

    //rally_flag

    //gravedigger's_shovel

    //teleporter