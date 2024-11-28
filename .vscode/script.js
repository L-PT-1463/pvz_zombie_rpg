//define variables      ! As of now, these are all just text and don't actually have any effect on how the game works.
    //zombie_item_type
        let item_attack     = "An item designed to upgrade your attacks.";
        let item_passive    = "An item designed to give you passive bonuses.";
        let item_gadget     = "A single-use item.";
        
        let armor_helmet    = "Takes damage from all source instead of your health but doesn't prevent status conditions.";
        let armor_shield    = "Takes attacks from 'shooter' and 'melee' plants instead of your health and prevents status conditions.";
        let armor_umbrella  = "Takes attacks from 'lobber' plants instead of your health and prevents status conditions.";

    //plant_type
        let shooter     = "Shooter plants attack with straight-shooting projectiles.";
        let lobber      = "Lobber plants attack with lobbed projectiles.";
        let melee       = "Melee plants attack with contact.";
        let protector   = "Protector plants take hits for others; they must be attacked before the plants behind them.";
        let healer      = "Healer plants have powers allowing them to heal or buff other plants or zombies.";

        let ground      = "Ground plants cannot be attacked but don't need to be defeated to complete a level. They do damage to zombies that attack a plant behind them.";

    //dmg_type
        let bite        = "A bite based attack requires contact (adjFront (x)) and is affected by plants with 'eaten' and 'death_eaten' range."
        let strike      = "A non-bite based attack requires contact (adjFront (x)) but is unaffected by plants with 'eaten' and 'death_eaten' range.";
        let range       = "A ranged attack that does not require contact (lane) and is unaffected by plants with 'eaten' adn 'death_eaten' range.";    
    
        let lane        = "A lane of the map.";
        let row         = "A row of the map.";
        let eaten       = "The plant attakcs the zombie that attacked it if hit by a 'bite' type attack.";
        let adjFront    = "Adjacent tile in front (-x)."
        let adjX        = "Adjacent tiles in the same lane.";
        let adjY        = "Adjacent tiles in the same row.";
        let adjCross    = "Adjacent tiles in the same lane and row.";
        let adj3        = "Tiles in a 3x3 area centred around itself.";
        let adjEaten    = "The plant attacks the zombie that attacked the plant behind (+x) if it is hit by a 'bite' or 'strike' type attack.";
        let death       = "The plant attacks the zombie that kills it."
        let deathEaten  = "The plant attacks the zombie that kills it if it dies to a 'bite' type attack.";
        let leastHp     = "The plant with the least hp.";

    //dmg_tags
        let repeat      = "Attacks twice.";
        let pierce      = "Attack ignore armor shields and protector plants with the 'pass_through' tag.";
        let fire        = "Attack deals double damage to armor with the 'fire_weak' tag.";
        let chilling    = "Slows the target. It goes last the next turn.";
        let freezing    = "Freezes the target. It can't go that turn.";
        let stall       = "Stalls the target. It goes last the next turn."
        let butter      = "1/4 chance of applying 'buttered' condition.";

    //were_tags (weaknesses/resistances)
        let magnetisable    = "Weak to Magnetshroom's ability.";
        let pass_through    = "Attacks with a 'pierce' tag can hit through the armor/can hit the plants behind.";
        let fire_weak       = "Takes double damage from 'fire' tag projectile.";
        let ice_immune      = "Isn't affected by chilling and freezing attacks.";
        let cndt_immune     = "Isn't affected by any conditions.";

        //condition_tags
            let chilled     = "The zombie attacks last this turn.";
            let frozen      = "The zombie doesn't attack this turn.";
            let buttered    = "The zombie doesn't attack this turn.";

//define classes
class Zombie{
    constructor(name, description, health, priority, actions, armors, passives, were_tags){
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.health         = health;           //define as number
        this.priority       = priority;         //defines priority in turn order: 1 is first
        this.actions        = actions;          //define as an array of attack and gadget items that are available to it
        this.armors         = armors;           //define as an array of armor items that are available to it
        this.passives       = passives;         //define as an array of passive items that are available to it
        this.were_tags      = were_tags;        //define as an array of tags that affect it
        this.conditions     = [];               //add conditions to array. Code will remove all conditions at the end of the turn
    }
}

class Plant{
    constructor(name, health, dmg, dmg_tags, dmg_type, priority, plant_type){
        this.name           = name;             //define as words ""
        this.health         = health;           //define as number
        this.dmg            = dmg;              //define as number
        this.dmg_tags       = dmg_tags;         //define as an array of tags that affect it
        this.dmg_type       = dmg_type;         //define as one of the variables in the list at the top
        this.priority       = priority;         //defines priority in turn order: 1 is first
        this.plant_type     = plant_type;       //define as one of the variables in the list at the top
    }
}

class Plant_Ground{
    constructor(name, dmg, dmg_tags){
        this.name           = name;             //define as words ""
        this.dmg            = dmg;              //define as number
        this.dmg_tags       = dmg_tags;         //define as an array of tags that affect it
        this.dmg_type       = adjEaten;        
        this.plant_type     = ground;           
    }
}

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
        this.spawnlings     = spawnlings;       //define as spawnling (Zombie class) summoned if any or "" if none
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
        this.spawnlings     = spawnlings;       //define as spawnling (Zombie class) summoned if any or "" if none
        this.splg_amount    = splg_amount;      //define as number. Amount of spawnlings summoned (1-3)
        this.object_type    = item_gadget;
    }
}

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

//creating items
    //item_attack
        //bite
const munch = new Item_Attack(
    "Bite",
    "The standard zombie attack",
    1,
    bite,
    []
)

        //strike
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

        //range
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

    //armor_helmet
const cone = new Armor_Helmet(
    "Cone",
    "The classic zombie armor",
    8,
    [fire_weak]
)

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
    "It's like an aquarium, but space",
    8,
    []
)

    //armor_shield
const screendoor = new Armor_Shield(
    "Screendoor",
    "A door with a buch of holes",
    25,
    [cndt_immune, magnetisable, pass_through]
)

const zcorp_wc_door = new Armor_Shield(
    "ZCorp WC Door",
    "So this is where it went",
    25,
    [cndt_immune, magnetisable]
)

const holoShield = new Armor_Shield(
    "Holo-Shield",
    "Generated by the Z Corporation",
    20,
    [cndt_immune]
)

    //armor_umbrella

    //item_passive
        //buffs

    //item_gadget
        //buffs

        //armor
const zcorp_pocket_roboShield = new Item_GadgetArmor(
    "ZCorp Pocket Robo-Shield",
    "Nothing like an instant shield to help you in a fight",
    holoShield
)

//creating zombies
    //player
const player = new Zombie(
    "Player",
    "The hero of this adventure",
    12,
    1,
    [munch],                         //How to add actions to array inside player: player.actions.push("test")
    [],
    [],
    []
)

    //splg
const browncoat = new Zombie(
    "Browncoat",
    "The weakest of the week, but an ally none the less",
    8,
    4,
    [munch],
    [],
    [],
    []
)

const brownparka = new Zombie(
    "Brownparka",
    "A browncoat ready for winter",
    8,
    4,
    [munch],
    [],
    [],
    [ice_immune]
)

const conehead = new Zombie(
    "Conehead",
    "A weak but tough ally",
    8,
    4,
    [munch],
    [cone],
    [],
    []
)

const space_cadet = new Zombie(
    "Space Cadet",
    "Teleported in from space",
    8,
    4,
    [munch, space_gun],
    [space_helmet],
    [],
    []
)

const zcorp_costumer_service = new Zombie(
    "ZCorp Costumer Service",
    "Don't worry, he'll put a pin on your complaints",
    12,
    4,
    [munch, zcorp_pin],
    [],
    [],
    []
)

//creating spawner items
    //item_passive    
        //spgl
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

    //item_gadget
        //spgl
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

//plants
    //shooters
const cardboard_peashooter = new Plant(
    "Cardboard Peashooter",
    6,
    1,
    [],
    lane,
    3,
    shooter
)

const cardboard_repeater = new Plant(
    "Cardboard Repeater",
    6,
    1,
    [repeat],
    lane,
    3,
    shooter
)

const stallia = new Plant(
    "Stallia",
    6,
    0,
    [stall],
    adj3,
    3,
    shooter
)

    //lobber
const cardboard_kernelpult = new Plant(
    "Cardboard Kernelpult",
    6,
    1,
    [butter],
    lane,
    3,
    lobber
)

    //melee
const bonk_choy = new Plant(
    "Bonk Choy",
    10,
    1,
    [],
    adjX,
    3,
    melee
)

const iceberg_lettuce = new Plant(
    "Iceberg Lettuce",
    2,
    0,
    [freezing],
    death,
    3,
    melee
)

    //ground
const cardboard_spikeweed = new Plant_Ground(
    "Cardboard Spikeweed",
    1,
    []
)

    //protector
const cardboard_wallnut = new Plant(
    "Cardboard Wallnut",
    24,
    0,
    [],
    eaten,
    3,
    protector
)

const endurian = new Plant(
    "Endurian",
    24,
    1,
    [],
    eaten,
    3,
    protector
)

const peanut = new Plant(
    "Peanut",
    18,
    1,
    [repeat],
    lane,
    3,
    protector
)

    //healer
const cardboard_sunflower = new Plant(
    "Cardboard Sunflower",
    6,
    1,
    [],
    deathEaten,
    3,
    healer
)