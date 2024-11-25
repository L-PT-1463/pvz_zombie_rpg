//This is the complete list of objects for PvZ ZPG

//object_tags
    //object_type
        var armor_helmet    = "Takes damage from all source instead of your health but deosn't prevent status conditions.";
        var armor_shield    = "Takes attacks from 'shooter' and 'melee' plants instead of your health and prevents status conditions.";
        var armor_umbrella  = "Takes attacks from 'lobber' plants instead of your health and prevents status conditions.";
        var item_attack     = "An item designed to upgrade your attacks.";
        var item_passive    = "An item design to give you passive bonuses.";
        var item_gadget     = "A single-use item, often used to summon spawnlings.";

    //dmg_type
        var bite        = "A bite based attack is affected by plants with 'eaten' range."
        var strike      = "A non-bite based attack is unaffected by plants with eating based abilities.";
        var range       = "A ranged attack that does not require contact.";

    //armor_Booleanean_tags
        var magnetisable    = "Weak to Magnetshroom's ability.";
        var pass_through    = "Attacks with a 'pierce' tag can hit through the armor.";
        var fire_weak       = "Takes double damage from 'fire' tag projectile.";

    //status_conditions
        var frozen      = "The creature doesn't attack this turn.";
        var chilled     = "The creature attacks last this turn.";

//template_category
    
    //template_armor
        var description     = "";
        var armor           = 0;
        var special         = "";
        var object_type     = "Add Here";
        var Boolean,    magnetisable    = false;
        var Boolean,    pass_through    = false;
        var Boolean,    fire_weak       = false;
        //Note: Base hp is 12

    //template_item
        var description     = "";
        var dmg             = 0;
        var dmg_type        = "Add Here";
        var special         = "";
        var spawnlings      = "";
        var object_type     = "Add Here";   

//armor
    //cone
        var description     = "The most basic kind of armor.";
        var armor           = 8;
        var special         = "";
        var object_type     = armor_helmet;
        var Boolean,    magnetisable    = false;
        var Boolean,    pass_through    = false;
        var Boolean,    fire_weak       = true;

    //bucket
        var description     = "A strong metalic helmet.";
        var armor           = 25;
        var special         = "";
        var object_type     = armor_helmet;
        var Boolean,    magnetisable    = true;
        var Boolean,    pass_through    = false;
        var Boolean,    fire_weak       = false;

    //newspaper
        var description     = "A weak shield that buffs you upon destruction.";
        var armor           = 10;
        var special         = "Buffs the player's damage after it's destroyed.";
        var object_type     = armor_shield;
        var Boolean,    magnetisable    = false;
        var Boolean,    pass_through    = true;
        var Boolean,    fire_weak       = true;

    //screendoor
        var description     = "The classic and certainly strong shield.";
        var armor           = 25;
        var special         = "";
        var object_type     = armor_shield;
        var Boolean,    magnetisable    = true;
        var Boolean,    pass_through    = true;
        var Boolean,    fire_weak       = false;

    //zcorp_wc_door
        var description     = "So this is where it went.";
        var armor           = 25;
        var special         = "";
        var object_type     = armor_shield;
        var Boolean,    magnetisable    = true;
        var Boolean,    pass_through    = false;
        var Boolean,    fire_weak       = false;

    //party_cone
        var description     = "The more the merrier in a party!";
        var armor           = 8;
        var special         = "Gains +2 armor every time a spawnling is summoned.";
        var object_type     = armor_helmet;
        var Boolean,    magnetisable    = false;
        var Boolean,    pass_through    = false;
        var Boolean,    fire_weak       = true;

    //ice_block
        var description     = "Nothing like ice to fight frost.";
        var armor           = 16;
        var special         = "Blocks 'frozen' and 'chilled' status conditions.";
        var object_type     = armor_helmet;
        var Boolean,    magnetisable    = false;
        var Boolean,    pass_through    = false;
        var Boolean,    fire_weak       = true;

    //brick_head
        var description     = "Much better than hay and wood.";
        var armor           = 30;
        var special         = "";
        var object_type     = armor_helmet;
        var Boolean,    magnetisable    = false;
        var Boolean,    pass_through    = false;
        var Boolean,    fire_weak       = false;

//item_attack
    //bite
        var description     = "The standard zombie attack.";
        var dmg             = 1;
        var dmg_type        = bite;
        var special         = "";
        var object_type     = item_attack;

    //riot_cane
        var description     = "A weak cane used to fend off plant riots.";
        var dmg             = 1;
        var dmg_type        = strike;
        var special         = "";
        var object_type     = item_attack;  

    //cardboard_shooters
        var description     = "Roles of toilet paper make for a perfect weapon.";
        var dmg             = 1;
        var dmg_type        = range;
        var special         = "";
        var object_type     = item_attack;

    //excavator_shovel
        var description     = "A wonderful plant-thrower.";
        var dmg             = 1;
        var dmg_type        = strike;
        var special         = "Throws 'protecor' type plants back one tile (pushes whatever plant is there forwards).";
        var spawnlings      = "";
        var object_type     = item_attack;

    //torch
        var description     = "The best wall-destroyer.";
        var dmg             = 1;
        var dmg_type        = strike;
        var special         = "deals triple damage to 'protector' plants.";
        var spawnlings      = "";
        var object_type     = item_attack;

//item_passive
    //zcorp_mug

    //ducky_tube

    //flag
        var description     = "Creates many weak allies.";
        var special         = "Summons spawnlings every two waves.";
        var spawnlings      = 1, Browncoat;
        var object_type     = item_passive;

    //frozen_flag
        var description     = "Creates many frozen allies.";
        var special         = "Summons spawnlings every three waves.";
        var spawnlings      = 1, Brownparka;
        var object_type     = item_passive;

    //vaulting_pole
        var description     = "The best wall-avoider.";
        var special         = "Allows you to attack plants behind 'protector'.";
        var spawnlings      = "";
        var object_type     = item_passive;

//gadget
    //pocket_shield_gen
        var description     = "The peak of work insurance.";
        var special         = "Instantly summons spawnlings.";
        var spawnlings      = 1, ZCorp_Shield_Generator;
        var object_type     = item_gadget;

    //zcorp_cellphone
        var description     = "Costumer service please!";
        var special         = "Instantly summons spawnlings.";
        var spawnlings      = 2, ZCorp_Costumer_Service;
        var object_type     = item_gadget;

    //rally_flag
        var description     = "Creates few stronger allies.";
        var special         = "Instantly summons spawnlings.";
        var spawnlings      = 3, Conehead;
        var object_type     = item_gadget;

    //gravedigger's_shovel
        var description     = "Creates few stronger allies.";
        var special         = "Instantly summons spawnlings.";
        var spawnlings      = 1, Gravestone;
        var object_type     = item_gadget;

    //teleporter
        var description     = "Gadget Scientist's favourite gadget.";
        var special         = "Instantly summons spawnlings.";
        var spawnlings      = 2, Space_Cadet;
        var object_type     = item_gadget;