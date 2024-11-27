//define variables      ! As of now, these are all just text and don't actually have any effect on how things work.
    //zombie_item_type
        let item_attack     = "An item designed to upgrade your attacks.";
        let item_passive    = "An item design to give you passive bonuses.";
        let item_gadget     = "A single-use item.";
        
        let armor_helmet    = "Takes damage from all source instead of your health but doesn't prevent status conditions.";
        let armor_shield    = "Takes attacks from 'shooter' and 'melee' plants instead of your health and prevents status conditions.";
        let armor_umbrella  = "Takes attacks from 'lobber' plants instead of your health and prevents status conditions.";

    //plant_type
        let shooter     = "Shooter plants attack at a range with straight-shooting projectiles.";
        let lobber      = "Lobber plants attack at a range with lobbed projectiles.";
        let melee       = "Melee plants attack at close proximity.";
        let ground      = "Ground plants cannot be attacked by normal means but don't need to be defeated to complete a level. They do damage to zombies that attack a plant behind them.";
        let protector   = "Protector plants take hits for others; they must be attacked before the plants behind them.";
        let healer      = "Healer plants have powers allowing them to heal or buff other plants or zombies.";
        let debuffer    = "Debuffer plants have powers that weaken their target through status conditions but don't damage it.";

    //dmg_type
        let munch       = "A bite based attack requires contact and is affected by plants with 'eaten' range."
        let strike      = "A non-bite based attack requires contact but is unaffected by plants with 'eaten' range.";
        let range       = "A ranged attack that does not require contact and is unaffected by plants with 'eaten' range.";    
    
        let lane        = "A lane of the map.";
        let row         = "A row of the map.";
        let adjFront    = "Adjacent tile in front."
        let adjX        = "Adjacent tiles in the same lane.";
        let adjY        = "Adjacent tiles in the same row.";
        let adjCross    = "Adjacent tiles in the same lane and row.";
        let adj3        = "Tiles in a 3x3 area centred around itself.";
        let leasthp     = "The plant with the least hp.";
        let eaten       = "The effects of the plant happen when it hit by a 'bite' type attack.";
        let tile        = "Range of Ground plants. Attacks on its own tile.";

    //dmg_tags
        let pierce      = "Attack ignore armor with the 'pass_through' tag.";
        let fire        = "Attack deals double damage to armor with the 'fire_weak' tag.";
        let chilling    = "Slows the target. It goes last that turn.";
        let freezing    = "Freezes the target. It can't go that turn.";

    //were_tags (weaknesses/resistances)
        let magnetisable    = "Weak to Magnetshroom's ability.";
        let pass_through    = "Attacks with a 'pierce' tag can hit through the armor.";
        let fire_weak       = "Takes double damage from 'fire' tag projectile.";
        let ice_immune      = "Isn't affected by chilling and freezing attacks.";

        //condition_tags
            let chilled     = "The zombie attacks last this turn. Disabled by 'fire' tag projectiles.";
            let frozen      = "The zombie doesn't attack this turn. Disabled by 'fire' tag projectiles.";
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

class Item_Passive {
    constructor(name, description, spawnlings) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.spawnlings     = spawnlings;       //define as spawnling (Zombie class) summoned if any or "" if none
        this.object_type    = item_passive;
    }
}

class Item_Gadget {
    constructor(name, description, spawnlings) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.spawnlings     = spawnlings;       //define as spawnling (Zombie class) summoned if any or "" if none
        this.object_type    = item_gadget;
    }
}

class Armor_Helmet {
    constructor(name, description, armor, were_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as a number
        this.armor_tags     = were_tags;       //define as an array of tags that affect it
        this.object_type    = armor_helmet;     
    }
}

class Armor_Shield {
    constructor(name, description, armor, were_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as a number "" 
        this.armor_tags     = were_tags;       //define as an array of tags that affect it
        this.object_type    = armor_shield;
    }
}

class Armor_Umbrella {
    constructor(name, description, armor, were_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as number ""
        this.armor_tags     = were_tags;       //define as an array of tags that affect it
        this.object_type    = armor_umbrella;
    }
}

//creating items
    //item attack
        //bite
const bite = new Item_Attack(
    "Bite",
    "The standard zombie attack",
    1,
    munch,
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

    //armor helmet
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

    //armor shield
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

//creating zombies
const player = new Zombie(
    "Player",
    "The hero of this adventure",
    12,
    1,
    [bite],                         //How to add actions to array inside player: player.actions.push("test")
    [],
    [],
    []
)

const browncoat = new Zombie(
    "Browncoat",
    "The weakest of the week, but an ally none the less",
    8,
    4,
    [bite],
    [],
    [],
    []
)

const brownparka = new Zombie(
    "Brownparka",
    "A browncoat ready for winter",
    8,
    4,
    [bite],
    [],
    [],
    [ice_immune]
)

const conehead = new Zombie(
    "Conehead",
    "A weak but tough ally",
    8,
    4,
    [bite],
    [cone],
    [],
    []
)

const space_cadet = new Zombie(
    "Space Cadet",
    "Teleported in from space",
    8,
    4,
    [bite, space_gun],
    [space_helmet],
    [],
    []
)

const zcorp_costumer_service = new Zombie(
    "ZCorp Costumer Service",
    "Don't worry, he'll put a pin on your complaints",
    12,
    4,
    [bite, zcorp_pin],
    [],
    [],
    []
)