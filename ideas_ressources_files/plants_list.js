//This is the complete list of plant enemies in PvZ ZPG

//plant_type
    let regular     = "Regular plants must be defeated to complete a level and don't protect the plants behind them.";
    let protector   = "Protector plants take hits for others; they must be attacked before the plants behind them. They must be defeated to complete a level.";
    let ground      = "Ground plants cannot be attacked but don't need to be defeated to complete a level. They do damage to zombies that attack a plant behind them.";

//dmg_type
    let lane        = "A lane of the map.";
    let row         = "A row of the map.";
    let tile        = "The tile it is on.";

    let hit         = "The plant attacks the zombie that attacked it if hit by a 'munch' or 'strike' type attack."
    let eaten       = "The plant attacks the zombie that attacked it if hit by a 'munch' type attack.";
    let deathEaten  = "The plant attacks the zombie that kills it if it dies to a 'munch' type attack.";
    let death       = "The plant attacks the zombie that kills it."
    
    let adjFront    = "Adjacent tile in front (row -1)."
    let adjX        = "Adjacent tiles in the same lane.";
    let adjY        = "Adjacent tiles in the same row.";
    let adjCross    = "Adjacent tiles in the same lane and row.";
    let adj3        = "Tiles in a 3x3 area centred around itself.";

//dmg_tags
    let straight    = "The attack is shot at the target";
    let lobbed      = "The attack is lobbed at the target.";
    let melee       = "The attack requires physical contact.";

    let repeat      = "Attacks twice.";
    let pierce      = "Attack ignore armor shields and protector plants with the 'pass_through' tag.";
    let fire        = "Attack deals double damage to armor with the 'fire_weak' tag and triples damage to protector plants.";

    let heal        = "The attack heals the target using the dmg stat.";

//dmg_conder ('conditioner' as in causes conditions)
    let chill       = "Slows the target. It goes last the next turn.";
    let freeze      = "Freezes the target. It can't go that turn.";
    let stall       = "Stalls the target. It goes last the next turn."
    let butter      = "1/4 chance of applying 'buttered' condition.";

//plants
class Plant{
    constructor(name, description, maxHp, dmg, dmg_tags, dmg_conder, dmg_type, plant_type){
        this.name           = name;             //define as words ""
        this.description    = description;      //define as words ""
        this.maxHp          = maxHp;            //define as number
        this.dmg            = dmg;              //define as number
        this.dmg_tags       = dmg_tags;         //define as an array of tags that affect it
        this.dmg_conder     = dmg_conder;       //define as null by default 
        this.dmg_type       = dmg_type;         //define as one of the variables in the list at the top
        this.plant_type     = plant_type;          //define as one of the variables in the list at the top
    }
}

//shooters
const cardboard_peashooter = new Plant(
    "Cardboard Peashooter",
    "The classic training model",
    6,
    1,
    [],
    null,
    lane,
    regular
)

const peashooter = new Plant(
    "Peashooter",
    "Not much better than a piece of cardboard",
    10,
    1,
    [],
    null,
    lnae,
    regular
)

const cardboard_repeater = new Plant(
    "Cardboard Repeater",
    "Still a training dummy, but it shoots twice",
    6,
    1,
    [repeat],
    null,
    lane,
    regular
)

const repeater = new Plant(
    "Repeater",
    "Twice as fast, twice as angry",
    10,
    1,
    [repeat],
    null,
    lane,
    regular
)

const snow_pea = new Plant(
    "Snow Pea",
    "A rather cold peashooter",
    10,
    1,
    [],
    chill,
    lane,
    regular
)

const fire_peashooter = new Plant(
    "Fire Peashooter",
    "Careful, it's hot",
    10,
    1,
    [fire],
    null,
    lane,
    regular
)

//lobbers
const cardboard_cabbagepult = new Plant(
    "Cardboard Cabbagepult",
    "All its attacks hit from above",
    6,
    1,
    [lobbed],
    null,
    lane,
    regular
)

const cabbagepult = new Plant(
    "Cabbagepult",
    "Basically just a peashooter",
    10,
    1,
    [lobbed],
    null,
    lane,
    regular
)

const cardboard_kernelpult = new Plant(
    "Cardboard Kernelpult",
    "It might be cardboard, but the butter is still buttery",
    6,
    1,
    [lobbed],
    butter,
    lane,
    regular
)

const kernelpult = new Plant(
    "Kernelpult",
    "Extra buttery",
    10,
    1,
    [lobbed],
    butter,
    lane,
    regular
)

//melee
const bonk_choy = new Plant(
    "Bonk Choy",
    "It can bonk",
    10,
    1,
    [melee],
    null,
    adjX,
    regular
)

//ground
const cardboard_spikeweed = new Plant(
    "Cardboard Spikeweed",
    "Careful where you step, because you can't kill it",
    6,
    1,
    [],
    null,
    ground
)

const spikeweed = new Plant(
    "Spikeweed",
    "It really doesn't like being stepped on",
    10,
    1,
    [],
    null,
    ground
)

//protectors
const cardboard_wallnut = new Plant(
    "Cardboard Wallnut",
    "The first road blocker in your training",
    24,
    0,
    [],
    null,
    eaten,
    protector
)

const wallnut = new Plant(
    "Wallnut",
    "The most classic of wall plants",
    40,
    0,
    [],
    null,
    eaten,
    protector
)

const peanut = new Plant(
    "Peanut",
    "A peashooter with more health, or a nut with more peas...",
    18,
    1,
    [repeat],
    null,
    lane,
    protector
)

const endurian = new Plant(
    "Enduriant",
    "Basically a spikey wallnut",
    24,
    1,
    [],
    null,
    hit,
    protector
)

//stallers
const stallia = new Plant(
    "Stallia",
    "Its fumes slow nearby zombies",
    6,
    0,
    [],
    stall,
    adj3,
    regular
)

const iceberg_lettuce = new Plant(
    "Iceberg Lettuce",
    "A small ball of pure ice",
    2,
    0,
    [melee],
    freeze,
    death,
    regular
)

//healers
const cardboard_sunflower = new Plant(
    "Cardboard Sunflower",
    "Eat it for a health refill",
    6,
    1,
    [heal],
    null,
    deathEaten,
    regular
)

const sunflower = new Plant(
    "Sunflower",
    "The slower you kill, the more heal",
    6,
    1,
    [heal],
    null,
    eaten,
    regular
)

const metal_petal = new Plant(
    "Metal Petal",
    "It acts as a shield, but still heals you",
    24,
    4,
    [heal],
    null,
    deathEaten,
    protector
)