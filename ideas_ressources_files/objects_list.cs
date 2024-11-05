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
        bool    fire-weak       = "Takes double damage from 'fire' tag projectile.";

    //status_conditions
        string  frozen      = "The creature doesn't attack this turn.";
        string  chilled     = "The creature attacks last this turn.";

//template_category
    
    //template_armor
        string  description     = "";
        double  armor           = 0;
        string  special         = "";
        string  object_type     = ;
        bool    magnetisable    = false;
        bool    pass-through    = false;
        bool    fire-weak       = false;
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
        bool    fire-weak       = true;

    //bucket
        string  description     = "A strong metalic helmet.";
        double  armor           = 25;
        string  special         = "";
        string  object_type     = armor_helmet;
        bool    magnetisable    = true;
        bool    pass-through    = false;
        bool    fire-weak       = false;

    //newspaper
        string  description     = "A weak shield that buffs you upon destruction.";
        double  armor           = 10;
        string  special         = "Buffs the player's damage after it's destroyed.";
        string  object_type     = armor_shield;
        bool    magnetisable    = false;
        bool    pass-through    = true;
        bool    fire-weak       = true;

    //screendoor
        string  description     = "The classic and certainly strong shield.";
        double  armor           = 25;
        string  special         = "";
        string  object_type     = armor_shield;
        bool    magnetisable    = true;
        bool    pass-through    = true;
        bool    fire-weak       = false;

    //zcorp_wc_door
        string  description     = "So this is where it went.";
        double  armor           = 25;
        string  special         = "";
        string  object_type     = armor_shield;
        bool    magnetisable    = true;
        bool    pass-through    = false;
        bool    fire-weak       = false;

    //party_cone
        string  description     = "The more the merrier in a party!";
        double  armor           = 8;
        string  special         = "Gains +2 armor every time a spawnling is summoned.";
        string  object_type     = armor_helmet;
        bool    magnetisable    = false;
        bool    pass-through    = false;
        bool    fire-weak       = true;

    //ice_block
        string  description     = "Nothing like ice to fight frost.";
        double  armor           = 16;
        string  special         = "Blocks 'frozen' and 'chilled' status conditions.";
        string  object_type     = armor_helmet;
        bool    magnetisable    = false;
        bool    pass-through    = false;
        bool    fire-weak       = true;

    //brick_head
        string  description     = "Much better than hay and wood.";
        double  armor           = 30;
        string  special         = "";
        string  object_type     = armor_helmet;
        bool    magnetisable    = false;
        bool    pass-through    = false;
        bool    fire-weak       = false;

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

    //excavator_shovel
        string  description     = "A wonderful plant-thrower.";
        string  dmg             = 1;
        string  dmg_type        = strike;
        string  special         = "Throws 'protecor' type plants back one tile (pushes whatever plant is there forwards).";
        string  spawnlings      = "";
        string  object_type     = item_attack;

    //torch
        string  description     = "The best wall-destroyer.";
        string  dmg             = 1;
        string  dmg_type        = strike;
        string  special         = "deals triple damage to 'protector' plants.";
        string  spawnlings      = "";
        string  object_type     = item_attack;

//item_passive
    //zcorp_mug

    //ducky_tube

    //flag
        string  description     = "Creates many weak allies.";
        string  special         = "Summons spawnlings every two waves.";
        string  spawnlings      = 1 "Browncoat";
        string  object_type     = item_passive;

    //frozen_flag
        string  description     = "Creates many frozen allies.";
        string  special         = "Summons spawnlings every three waves.";
        string  spawnlings      = 1 "Brownparka";
        string  object_type     = item_passive;

    //vaulting_pole
        string  description     = "The best wall-avoider.";
        string  special         = "Allows you to attack plants behind 'protector'.";
        string  spawnlings      = "";
        string  object_type     = item_passive;

//gadget
    //pocket_shield_gen
        string  description     = "The peak of work insurance.";
        string  special         = "Instantly summons spawnlings.";
        string  spawnlings      = 1 "ZCorp Shield Generator";
        string  object_type     = item_gadget;

    //zcorp_cellphone
        string  description     = "Costumer service please!";
        string  special         = "Instantly summons spawnlings.";
        string  spawnlings      = 2 "ZCorp Costumer Service";
        string  object_type     = item_gadget;

    //rally_flag
        string  description     = "Creates few stronger allies.";
        string  special         = "Instantly summons spawnlings.";
        string  spawnlings      = 3 "Conehead";
        string  object_type     = item_gadget;

    //gravedigger's_shovel
        string  description     = "Creates few stronger allies.";
        string  special         = "Instantly summons spawnlings.";
        string  spawnlings      = 1 "Gravestone";
        string  object_type     = item_gadget;

    //teleporter
        string  description     = "Gadget Scientist's favourite gadget.";
        string  special         = "Instantly summons spawnlings.";
        string  spawnlings      = 2 "Space Cadet";
        string  object_type     = item_gadget;