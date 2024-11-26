//define variables      ! As of now, these are all just text and don't actually have any effect on how things work.
    //zombie_dmg_type
        var bite        = "A bite based attack requires contact and is affected by plants with 'eaten' range."
        var strike      = "A non-bite based attack requires contact but is unaffected by plants with 'eaten' range.";
        var range       = "A ranged attack that does not require contact and is unaffected by plants with 'eaten' range.";

    //zombie_armor_type
        var armor_helmet    = "Takes damage from all source instead of your health but doesn't prevent status conditions.";
        var armor_shield    = "Takes attacks from 'shooter' and 'melee' plants instead of your health and prevents status conditions.";
        var armor_umbrella  = "Takes attacks from 'lobber' plants instead of your health and prevents status conditions.";

        //armor_tags
            var magnetisable    = "Weak to Magnetshroom's ability.";
            var pass_through    = "Attacks with a 'pierce' tag can hit through the armor.";
            var fire_weak       = "Takes double damage from 'fire' tag projectile.";

    //zombie_item_type
        var item_attack     = "An item designed to upgrade your attacks.";
        var item_passive    = "An item design to give you passive bonuses.";
        var item_gadget     = "A single-use item.";

    //plant_type
        var shooter     = "Shooter plants attack at a range with straight-shooting projectiles.";
        var lobber      = "Lobber plants attack at a range with lobbed projectiles.";
        var melee       = "Melee plants attack at close proximity.";
        var ground      = "Ground plants cannot be attacked by normal means but don't need to be defeated to complete a level. They do damage to zombies that attack a plant behind them.";
        var protector   = "Protector plants take hits for others; they must be attacked before the plants behind them.";
        var healer      = "Healer plants have powers allowing them to heal or buff other plants or zombies.";
        var debuffer    = "Debuffer plants have powers that weaken their target through status conditions but don't damage it.";

    //plant_range
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

        //plant_dmg_tags
            var pierce      = "Attack ignore armor with the 'pass_through' tag.";
            var fire        = "Attack deals double damage to armor with the 'fire_weak' tag. Disables 'chilled' and 'frozen' conditions.";
        

//define classes
class Zombie{
    constructor(name, description, health, priority, actions, armors, passives){
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.health         = health;           //define as number
        this.priority       = priority;         //defines priority in turn order: 1 is first
        this.actions        = actions;          //define as an array of attack and gadget items that are available to it
        this.armors         = armors;           //define as an array of armor items that are available to it
        this.passives       = passives;         //define as an array of passive items that are available to it
    }
}

class Plant{
    constructor(name, health, dmg, range, priority, plant_type, plant_dmg_tags){
        this.name           = name;             //define as words ""
        this.health         = health;           //define as number
        this.dmg            = dmg;              //define as number
        this.range          = range;            //define as one of the variables in the list at the top
        this.priority       = priority;         //defines priority in turn order: 1 is first
        this.plant_type     = plant_type;       //define as one of the variables in the list at the top
        this.plant_dmg_tags = plant_dmg_tags;   //define as an array of tags that affect it
    }
}

class Item_Attack {
    constructor(name, description, dmg, dmg_type) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.dmg            = dmg;              //define as number
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
    constructor(name, description, armor, armor_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as a number
        this.object_type    = armor_helmet;     
        this.armor_tags     = armor_tags;       //define as an array of tags that affect it
    }
}

class Armor_Shield {
    constructor(name, description, armor, armor_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as a number "" 
        this.object_type    = armor_shield;
        this.armor_tags     = armor_tags;       //define as an array of tags that affect it
    }
}

class Armor_Umbrella {
    constructor(name, description, armor, armor_tags) {
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.armor          = armor;            //define as number ""
        this.object_type    = armor_umbrella;
        this.armor_tags     = armor_tags;       //define as an array of tags that affect it
    }
}

//creating items
    //item attack
const bite = new Item_Attack(
    "Bite",
    "The standard zombie attack",
    1,
    bite
)

const riot_cane = new Item_Attack(
    "Rito Cane",
    "A weak cane used to fend off plant riots",
    1,
    strike
)

const cardboard_shooters = new Item_Attack(
    "Cardboard Shooters",
    "Roles of toilet paper make for a perfect ranged weapon",
    1,
    range
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
    [bite],
    [],
    []
)