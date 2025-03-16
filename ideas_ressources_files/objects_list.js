//This is the complete list of objects for PvZ ZPG

//zombie_item_type
    let item_attack     = "An item designed to upgrade your attacks.";
    let item_passive    = "An item designed to give you passive bonuses.";
    let item_gadget     = "A single-use item.";

    let armor_helmet    = "Takes damage from all source instead of your health but doesn't prevent status conditions.";
    let armor_shield    = "Takes attacks from 'straight' and 'melee' attacks instead of your health and prevents status conditions.";
    let armor_umbrella  = "Takes attacks from 'lobbed' attacks instead of your health and prevents status conditions.";

//dmg_type
    let munch       = "A munch based attack requires contact (adjFront (x)) and is affected by plants with 'eaten' and 'death_eaten' range."
    let strike      = "A non-munch based attack requires contact (adjFront (x)) but is unaffected by plants with 'eaten' and 'death_eaten' range.";
    let range       = "A ranged attack that does not require contact (lane) and is unaffected by plants with 'eaten' adn 'death_eaten' range.";  
    
//dmg_tags
    let straight    = "The attack is shot at the target";
    let lobbed      = "The attack is lobbed at the target.";
    let melee       = "The attack requires physical contact.";

    let repeat      = "Attacks twice.";
    let pierce      = "Attack ignore armor shields and protector plants with the 'pass_through' tag.";
    let fire        = "Attack deals double damage to armor with the 'fire_weak' tag and triples damage to protector plants.";

    let heal        = "The attack heals the target using the dmg stat.";
    
//were_tags (weaknesses/resistances)
    let magnetisable    = "Weak to Magnetshroom's ability.";
    let pass_through    = "Attacks with a 'pierce' tag can hit through the armor/can hit the plants behind.";
    let fire_weak       = "Takes double damage from 'fire' tag projectile.";
    let ice_immune      = "Isn't affected by 'chill' and 'freeze' attacks.";

//condition_tags
    let chilled     = "The zombie attacks last this turn.";
    let frozen      = "The zombie doesn't attack this turn.";
    let stalled     = "The zombie attacks last this turn.";
    let buttered    = "The zombie doesn't attack this turn.";

//items
class Item_Attack {
    constructor(name, description, dmg, dmg_type, dmg_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.dmg            = dmg;              //define as number
        this.dmg_tags       = dmg_tags          //define as an array of tags that affect it
        this.dmg_type       = dmg_type;         //define as one of the variables in the list at the top
        this.object_type    = item_attack;
    }
}  


class Item_PassiveBuff {
    constructor(name, description, buffs, cooldown) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.buffs          = buffs;            //define as an array of condition_tags and/or were_tags
        this.cooldown       = cooldown;         //define as number of waves between activations of effect        
        this.object_type    = item_passive;
    }
}

class Item_PassiveSplg {
    constructor(name, description, spawnlings, splg_amount, cooldown) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.spawnlings     = spawnlings;       //define as spawnling (Zombie class) summoned
        this.splg_amount    = splg_amount;      //define as number. Amount of spawnlings summoned (1-3)
        this.cooldown       = cooldown;         //define as number of waves between activations of effect
        this.object_type    = item_passive;
    }
}

class Item_GadgetBuff {
    constructor(name, description, buffs) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.buffs          = buffs;            //define as an array of condition_tags and/or were_tags
        this.duration       = duration;         //define as number of waves the effect will last
        this.object_type    = item_gadget;
    }
}

class Item_GadgetArmor {
    constructor(name, description, armor) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as a shield that it will give the zombie
        this.object_type    = item_gadget;
    }
}

class Item_GadgetSpgl {
    constructor(name, description, spawnlings, splg_amount) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.spawnlings     = spawnlings;       //define as spawnling (Zombie class) summoned
        this.splg_amount    = splg_amount;      //define as number. Amount of spawnlings summoned (1-3)
        this.object_type    = item_gadget;
    }
}class Item_GadgetBuff {
    constructor(name, description, buffs) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.buffs          = buffs;            //define as an array of condition_tags and/or were_tags
        this.duration       = duration;         //define as number of waves the effect will last
        this.object_type    = item_gadget;
    }
}

class Item_GadgetArmor {
    constructor(name, description, armor) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as a shield that it will give the zombie
        this.object_type    = item_gadget;
    }
}

class Item_GadgetSpgl {
    constructor(name, description, spawnlings, splg_amount) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.spawnlings     = spawnlings;       //define as spawnling (Zombie class) summoned
        this.splg_amount    = splg_amount;      //define as number. Amount of spawnlings summoned (1-3)
        this.object_type    = item_gadget;
    }
}

//armors
class Armor_Helmet {
    constructor(name, description, armor, were_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as a number
        this.armor_tags     = were_tags;        //define as an array of tags that affect it
        this.object_type    = armor_helmet;     
    }
}

class Armor_Shield {
    constructor(name, description, armor, were_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as a number "" 
        this.armor_tags     = were_tags;        //define as an array of tags that affect it - Always include cndt_immune
        this.object_type    = armor_shield;
    }
}

class Armor_Umbrella {
    constructor(name, description, armor, were_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as number ""
        this.armor_tags     = were_tags;        //define as an array of tags that affect it - Always include cndt_immune
        this.object_type    = armor_umbrella;
    }
}

//item_attack
const bite = new Item_Attack(
    "Bite",
    "The standard zombie attack",
    1,
    munch,
    []
)

const riot_cane = new Item_Attack(
    "Riot Cane",
    "A weak cane used to fend off plant riots",
    1,
    strike,
    []
)

const zcorp_pin = new Item_Attack(
    "ZCorp Pin",
    "A small pin used to pierce papers and plants",
    1,
    strike,
    []
)

const torch = new Item_Attack(
    "Torch",
    "The perfect tool for an explorer, or a pyromaniac",
    2,
    strike,
    [fire]
)

const vaulting_pole = new Item_Attack(
    "Vaulting Pole",
    "A classic wall avoider",
    1,
    strike,
    [pierce]
)

const excavator_shovel = new Item_Attack()

const cardboard_shooters = new Item_Attack(
    "Cardboard Shooters",
    "Roles of toilet paper make for a perfect ranged weapon",
    1,
    range,
    []
)

const space_gun = new Item_Attack(
    "Space Gun",
    "Manufactured by Gadget Scientist Co.",
    1,
    range,
    [fire]
)

//armor
const cone = new Armor_Helmet(
    "Cone",
    "The classic zombie armor",
    8,
    [fire_weak]
)

const party_cone = new Armor_Helmet()

const bucket = new Armor_Helmet(
    "Bucket",
    "A metalic protection; tough and effecitve",
    25,
    [magnetisable]
)

const brick_head = new Armor_Helmet(
    "Brickhead",
    "Much better than hay and wood",
    30,
    []
)

const ice_block = new Armor_Helmet(
    "Ice Block",
    "Nothing like ice to fight frost.",
    16,
    [ice_immune, fire_weak]
)

const space_helmet = new Armor_Helmet(
    "Space Helmet",
    "It's like an aquarium, but with air inside",
    8,
    []
)

const screendoor = new Armor_Shield(
    "Screendoor",
    "A door with a buch of holes",
    25,
    [magnetisable, pass_through]
)

const zcorp_wc_door = new Armor_Shield(
    "ZCorp WC Door",
    "So this is where it went",
    25,
    [magnetisable]
)

const newspaper = new Armor_Shield()

const holoShield = new Armor_Shield(
    "Holo-Shield",
    "Generated by the Z Corporation",
    20,
    []
)

//gadgets
const zcorp_pocket_roboShield = new Item_GadgetArmor(
    "ZCorp Pocket Robo-Shield",
    "Nothing like an instant shield to help you in a fight",
    holoShield
)

const rally_flag = new Item_GadgetSpgl(
    "Rally Flag",
    "Instantly rallies stronger allies.",
    conehead,
    3
)

const zcorp_cellphone = new Item_GadgetSpgl(
    "ZCorp Cellphone",
    "Costumer service please!",
    zcorp_costumer_service,
    2
)

const teleporter = new Item_GadgetSpgl(
    "Teleporter",
    "Gadget Scientist's favourite gadget",
    space_cadet,
    2
)

const gravedigger_shovel = new Item_GadgetSpgl(
    "Gravedigger's Shovel",
    "It digs graves, shocking",
    gravestone,
    1
)

//passives
const zcorp_mug = new Item_PassiveBuff()

const ducky_tube = new Item_PassiveBuff()

const flag = new Item_PassiveSplg(
    "Flag",
    "Summons weak spawnlings every two waves.",
    browncoat,
    1,
    2
)

const frozen_flag = new Item_PassiveSplg(
    "Frozen Flag",
    "Summons spawnlings every three waves.",
    brownparka,
    1,
    3
)

const necromancy = new Item_PassiveSplg(
    "Necromancy",
    "Summons two weak spawnlings every three waves",
    peasant_zombie,
    2,
    3
)