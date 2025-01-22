//define variables      ! As of now, these are all just text and don't actually have any effect on how the game works.
    //zombie_item_type
        let item_attack     = "An item designed to upgrade your attacks.";
        let item_passive    = "An item designed to give you passive bonuses.";
        let item_gadget     = "A single-use item.";
        
        let armor_helmet    = "Takes damage from all source instead of your health but doesn't prevent status conditions.";
        let armor_shield    = "Takes attacks from 'straight' and 'melee' attacks instead of your health and prevents status conditions.";
        let armor_umbrella  = "Takes attacks from 'lobbed' attacks instead of your health and prevents status conditions.";

    //plant_type
        let regular     = "Regular plants must be defeated to complete a level and don't protect the plants behind them.";
        let protector   = "Protector plants take hits for others; they must be attacked before the plants behind them. They must be defeated to complete a level.";
        let ground      = "Ground plants cannot be attacked but don't need to be defeated to complete a level. They do damage to zombies that attack a plant behind them.";

    //dmg_type
        let munch       = "A munch based attack requires contact (adjFront (x)) and is affected by plants with 'eaten' and 'death_eaten' range."
        let strike      = "A non-munch based attack requires contact (adjFront (x)) but is unaffected by plants with 'eaten' and 'death_eaten' range.";
        let range       = "A ranged attack that does not require contact (lane) and is unaffected by plants with 'eaten' adn 'death_eaten' range.";    
    
        let lane        = "A lane of the map.";
        let row         = "A row of the map.";

        let eaten       = "The plant attakcs the zombie that attacked it if hit by a 'munch' type attack.";
        let deathEaten  = "The plant attacks the zombie that kills it if it dies to a 'munch' type attack.";
        let adjEaten    = "The plant attacks the zombie that attacked the plant behind (row +1) if that planty is hit by a 'munch' or 'strike' type attack.";
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


//define classes
    //zombies
class Zombie{
    constructor(name, description, health, maxHp, priority, actions, armors, passives, were_tags) {
        this.name               = name;                 //define as words ""
        this.description        = description;          //define as words ""
        this.health             = health;               //define as number
        this.maxHp              = maxHp;                //define as number
        this.priority           = priority;             //defines priority in turn order: 1 is first
        this.actions            = actions;              //define as an array of attack and gadget items, and utilitary actions that are available to it
        this.armors             = armors;               //define as an array of armor items that are available to it
        this.equippedArmor      = null;
        this.passives           = passives;             //define as an array of passive items that are available to it
        this.equippedPassives   = [];
        this.were_tags          = were_tags;            //define as an array of tags that affect it
        this.conditions         = [];                   //add conditions to array
    }

    equipArmor(armor) {
        if (this.equippedArmor) {
            console.log(`${this.name} has already equipped an armor.`);
            return;
        }
        
        if (this.armors.includes(armor)) {
            this.equippedArmor = armor;
        } else {
            console.error(`${this.name} does not have this armor in its inventory.`);
            return;
        }
    }

    equipPassive(passive) {
        if (this.equippedPassives.length >= 3) {
            console.log(`${this.name} has already equipped its maximum amount of passives.`);
            return;
        }

        if (this.passives.includes(passive)){
            this.equippedPassives.push(passive);
        } else {
            console.error(`${this.name} does not have this passive in its inventory.`);
        }
    }

    takeDamage(takenDmg, dmgTags, dmgConder) {
        let effectiveArmor  = this.equippedArmor;
        let reducedDmg      = this.equippedArmor.armor;
        let armorType       = this.equippedArmor.object_type;
        let health          = this.health;
        let lostHp          = this.maxHp - health;
        let effectiveDmg;

            //heals up to maxHp instead of dealing damage if hit by a healing attack.
        if(dmgTags.includes(heal)) {
            if(takenDmg >= lostHp) {
                takenDmg = lostHp;
            }

            this.health = health + takenDmg;
            return;
        }

        function reduceDmg() {
                //doubles damage if armor is fire weak
            if(dmgTags.includes(fire)){
                if(this.equippedArmor.were_tags.includes(fire_weak)){
                    takenDmg = 2 * takenDmg;
                } else {
                    takenDmg = takenDmg;
                }
            }

            if(reducedDmg >= takenDmg) {                        
                effectiveDmg = 0;
                this.equippedArmor.takeDamage(takenDmg);
            } else {
                effectiveDmg = takenDmg - reducedDmg;
                this.equippedArmor.takenDamage(reducedDmg);
            }
        }

        function applyCondition(dmgConder) {
            if(dmgConder == null) {
                return;
            }

            if(dmgConder == freeze) {
                if(this.equippedArmor.were_tags.includes("ice_immune")) {
                    return;
                } else {
                    this.conditions.push(frozen);
                }
            }

            if(dmgConder == chill) {
                if(this.equippedArmor.were_tags.includes("ice_immune")) {
                    return;
                } else {
                    this.conditions.push(chilled);
                }
            }

            if(dmgConder == butter) {
                let n = Math.floor(Math.random() * 5) + 1;          //generates random integer from 1 to 4

                if(n == 4) {
                    this.conditions.push(buttered);
                }
            }

            if(dmgConder == stall) {
                this.conditions.push(stalled);
            }
        }

            //defines effective damage if wearing Helmet type armors and inflicts condition on player
        if(armorType = armor_helmet) {
            applyCondition(dmgConder);

            reduceDmg();
        }

            //defines effective damage if wearing Shield type armors
        if(armorType = armor_shield) {
            if(dmgTags.includes("melee") || dmgTags.includes("straight")) {
                if(this.equippedArmor.were_tags.includes("pass_through") && dmgTags.inclides("pierce")) {
                    armor = null;
                } else {
                    reduceDmg()
                }
            } else {
                effectiveArmor = null;
            }
        }

            //defines effective damage if wearing Umbrella type armors
        if(armorType = armor_umbrella) {
            if (dmgTags.includes("lobbed")) {
                reduceDmg()
            } else {
                effectiveArmor = null;
            }
        }

            //removes armor if it reaches 0 hp
        if(this.equippedArmor.armor <= 0) {
            this.equippedArmor = null;
            console.log(`${this.name} lost its armor.`);
        }

            //defines effective damage if player has no armor or if armor is irrelevent
        if(effectiveArmor == null) {
            applyCondition(dmgConder);

            effectiveDmg = takenDmg;
        }

            //applies effective damage
        if(effectiveDmg >= health){
            this.health = 0;
            console.log(`${this.name} has died.`);
        } else {
            this.health = health - effectiveDmg;
            console.log(`${this.name} has taken ${effectiveDmg} damage.`);
        }
    }
}

    //plants
class Plant_Regular{
    constructor(name, health, maxHp, dmg, dmg_tags, dmg_conder, dmg_type, priority){
        this.name           = name;             //define as words ""
        this.health         = health;           //define as number
        this.maxHp          = maxHp;            //define as number
        this.dmg            = dmg;              //define as number
        this.dmg_tags       = dmg_tags;         //define as an array of tags that affect it
        this.dmg_conder     = dmg_conder;       //define as null by default 
        this.dmg_type       = dmg_type;         //define as one of the variables in the list at the top
        this.priority       = priority;         //defines priority in turn order: 1 is first
        this.plant_type     = regular;          //define as one of the variables in the list at the top
    }

    attack(target) {
        target.takeDamage(this.dmg, this.dmg_tags, this.dmg_conder);

        if(this.dmg_tags.includes(repeat)){
            target.takeDamage(this.dmg, this.dmg_tags, this.dmg_conder);
        }
    }
}

class Plant_Eaten{          //version without priority as attack trigger is not turn-based
    constructor(name, health, maxHp, dmg, dmg_tags, dmg_conder, dmg_type){
        this.name           = name;             //define as words ""
        this.health         = health;           //define as number
        this.maxHp          = maxHp;            //define as number
        this.dmg            = dmg;              //define as number
        this.dmg_tags       = dmg_tags;         //define as an array of tags that affect it
        this.dmg_conder     = dmg_conder;       //define as an array of tags that affect it 
        this.dmg_type       = dmg_type;         //define as eaten, deathEaten, adjEaten or death
        this.plant_type     = regular;          //define as one of the variables in the list at the top
    }
}

class Plant_Protector{
    constructor(name, health, maxHp, dmg, dmg_tags, dmg_type, dmg_conder, priority){
        this.name           = name;             //define as words ""
        this.health         = health;           //define as number
        this.maxHp          = maxHp;            //define as number
        this.dmg            = dmg;              //define as number
        this.dmg_tags       = dmg_tags;         //define as an array of tags that affect it
        this.dmg_conder     = dmg_conder;       //define as an array of tags that affect it 
        this.dmg_type       = dmg_type;         //define as one of the variables in the list at the top
        this.priority       = priority;         //defines priority in turn order: 1 is first
        this.plant_type     = protector;        //define as one of the variables in the list at the top
    }
}

class Plant_Endurian{       //version without priority as attack trigger is not turn-based
    constructor(name, health, maxHp, dmg, dmg_tags, dmg_conder, dmg_type){
        this.name           = name;             //define as words ""
        this.health         = health;           //define as number
        this.maxHp          = maxHp;            //define as number
        this.dmg            = dmg;              //define as number
        this.dmg_tags       = dmg_tags;         //define as an array of tags that affect it
        this.dmg_conder     = dmg_conder;       //define as an array of tags that affect it 
        this.dmg_type       = dmg_type;         //define as eaten, deathEaten, adjEaten or death
        this.plant_type     = protector;        //define as one of the variables in the list at the top
    }
}

class Plant_Ground{         //has no priority as attack trigger is not turn-based
    constructor(name, health, maxHp, dmg, dmg_tags, dmg_conder){
        this.name           = name;             //define as words ""
        this.health         = health;           //define as number
        this.maxHp          = maxHp;            //define as number
        this.dmg            = dmg;              //define as number
        this.dmg_tags       = dmg_tags;         //define as an array of tags that affect it
        this.dmg_conder     = dmg_conder;       //define as an array of tags that affect it 
        this.dmg_type       = adjEaten;   
        this.plant_type     = ground;           
    }
}

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

    takeDamage(takenDmg) {
        this.armor = this.armor - takenDmg;
        console.log(`${this.name} has taken ${takenDmg} damage.`);
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
    
    takeDamage(takenDmg) {
        this.armor = this.armor - takenDmg;
        console.log(`${this.name} has taken ${takenDmg} damage.`);
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
    
    takeDamage(takenDmg) {
        this.armor = this.armor - takenDmg;
        console.log(`${this.name} has taken ${takenDmg} damage.`);
    }
}

//creating items
    //item_attack
        //munch
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
    [magnetisable, pass_through]
)

const zcorp_wc_door = new Armor_Shield(
    "ZCorp WC Door",
    "So this is where it went",
    25,
    [magnetisable]
)

const holoShield = new Armor_Shield(
    "Holo-Shield",
    "Generated by the Z Corporation",
    20,
    []
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

//creating utilitary actions
    //equip armor
class ActionEquipArmor {
    constructor(name, description) {
        this.name = name;               // define as words ""
        this.description = description; // define as words ""
    }

    execute(target, armor) {
        target.equipArmor(armor);
    }
}
    
const actionEquipArmor = new ActionEquipArmor(
    "Equip Armor",
    "Allows the zombie to equip a piece of armor from its inventory."
)

class ActionEquipPassive {
    constructor(name, description) {
        this.name = name;               // define as words ""
        this.description = description; // define as words ""
    }

    execute(target, passive) {
        target.equipPassive(passive);
    }
}

const actionEquipPassive = new ActionEquipPassive(
    "Equip Passive",
    "Allows the zombie to equip a passive item from its inventory."
)

//creating zombies
    //player
const player = new Zombie(
    "Player",
    "The hero of this adventure",
    12,
    12,
    1,
    [actionEquipArmor, actionEquipPassive, bite],
    [],
    [],
    []
)

    //splg
const browncoat = new Zombie(
    "Browncoat",
    "The weakest of the week, but an ally none the less",
    8,
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
    8,
    4,
    [actionEquipArmor, bite],
    [cone],
    [],
    []
)

const space_cadet = new Zombie(
    "Space Cadet",
    "Teleported in from space",
    8,
    8,
    4,
    [actionEquipArmor, bite, space_gun],
    [space_helmet],
    [],
    []
)

const zcorp_costumer_service = new Zombie(
    "ZCorp Costumer Service",
    "Don't worry, he'll put a pin on your complaints",
    12,
    12,
    4,
    [bite, zcorp_pin],
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
    //regular
        //shooters
const cardboard_peashooter = new Plant_Regular(
    "Cardboard Peashooter",
    6,
    6,
    1,
    [],
    null,
    lane,
    3
)

const peashooter = new Plant_Regular(
    "Peashooter",
    10,
    10,
    1,
    [],
    null,
    lane,
    3
)

const cardboard_repeater = new Plant_Regular(
    "Cardboard Repeater",
    6,
    6,
    1,
    [repeat],
    null,
    lane,
    3
)

const repeater = new Plant_Regular(
    "Repeater",
    10,
    10,
    1,
    [repeat],
    null,
    lane,
    3
)

const snow_pea = new Plant_Regular(
    "Snow Pea",
    10,
    10,
    1,
    [],
    chill,
    lane,
    3
)

const fire_peashooter = new Plant_Regular(
    "Fire Peashooter",
    10,
    10,
    1,
    [fire],
    null,
    lane,
    3
)

        //lobbers
const cardboard_kernelpult = new Plant_Regular(
    "Cardboard Kernelpult",
    6,
    6,
    1,
    [lobbed],
    butter,
    lane,
    3
)

    //stallers
const stallia = new Plant_Regular(
    "Stallia",
    6,
    6,
    0,
    [],
    stall,
    adj3,
    3
)

    //melee
const bonk_choy = new Plant_Regular(
    "Bonk Choy",
    10,
    10,
    1,
    [melee],
    null,
    adjX,
    3
)

    //eaten
        //death_eaten
const cardboard_sunflower = new Plant_Eaten(
    "Cardboard Sunflower",
    6,
    6,
    1,
    [heal],
    null,
    deathEaten
)

const sunflower = new Plant_Eaten(
    "Sunflower",
    6,
    6,
    1,
    [heal],
    null,
    eaten
)

        //death
const iceberg_lettuce = new Plant_Eaten(
    "Iceberg Lettuce",
    2,
    2,
    0,
    [melee],
    freeze,
    death
)

    //protector
        //reg
const cardboard_wallnut = new Plant_Protector(
    "Cardboard Wallnut",
    24,
    24,
    0,
    [],
    null,
    eaten,
    3
)

const peanut = new Plant_Protector(
    "Peanut",
    18,
    18,
    1,
    [repeat],
    null,
    lane,
    3
)

        //endurian
const endurian = new Plant_Endurian(
    "Endurian",
    24,
    24,
    1,
    [],
    [],
    eaten,
    3
)

//ground
const cardboard_spikeweed = new Plant_Ground(
    "Cardboard Spikeweed",
    10,
    10,
    1,
    [],
    null
)

//gameplay functions
function generateLawn(){
    const lanes = [T, C, B];
    const columns = [1, 2, 3, 4, 5, 6, 7, 8];

    const newLawn = document.createElement('div');
        newLawn.id.add('lawn');

    for(let i = 1; i < lanes.length + 1; i++) {
        const newTile = document.createElement('div');
            newTile.classList.add('tile');
            newTile.dataset.lane = lane[i];

        for(let j = 1; j < columns.length + 1; j++){
            newTile.dataset.column = column[j];
        }

        newLawn.appendChild(newTile);
    }
}

function spawnPlayer(){
    const lane = 'C';
    const column = '2';

    const targetTile = document.querySelector(`.tile[data-lane="${lane}"][data-column="${column}"]`);
        if (!targetTile) {
            console.error(`Tile at lane ${lane} and column ${column} not found.`);
            return;
        }

    const fileName = player.name.toLowerCase().replace(/ /g, '_');

    const playerElement = document.createElement('div');
        playerElement.classList.add('player');
        playerElement.dataset.name = player.name;
        playerElement.style.backgroundImage = `url(stand-ins/zombies/${fileName}.png)`

    targetTile.appendChild(playerElement);
        console.log(`${player.name} spawned at lane ${lane} column ${column}.`);
}

function spawnSplg(item) {
    if (!item || !item.spawnlings || item.splg_amount < 1 || item.splg_amount > 3) {
      console.error('Invalid item or spawnling data.');
      return;
    }

    const spawnLocations = {
        1: ['C1'],
        2: ['T1', 'B1'],
        3: ['T1', 'C1', 'B1']
      };

    const locations = spawnLocations[item.splg_amount];
        if (!locations) {
            console.error('Invalid number of spawnlings specified.');
            return;
        }

    locations.forEach(function(location, index) {
        const [lane, column] = location.split('');
        const targetTile = document.querySelector(`.tile[data-lane="${lane}"][data-column="${column}"]`);
            if (!targetTile) {
                console.error(`Tile at lane ${lane} and column ${column} not found.`);
                return;
            }

            if (targetTile.querySelector('.spawnling')) {
            console.warn(`Tile at lane ${lane} and column ${column} is already occupied. Skipping spawnling ${index + 1}.`);
            return;
            }

        const fileName = item.spawnlings.name.toLowerCase().replace(/ /g, '_');
    
        // Create the spawnling representation
        const spawnlingElement = document.createElement('div');
            spawnlingElement.classList.add('spawnling');
            spawnlingElement.dataset.name = item.spawnlings.name;
            spawnlingElement.style.backgroundImage = `url(stand-ins/zombies/${fileName}.png)`
            spawnlingElement.dataset.description = item.spawnlings.description;
    
        targetTile.appendChild(spawnlingElement);
            console.log(`${item.spawnlings.name} spawned at lane ${lane} column ${column}.`);
    });
}