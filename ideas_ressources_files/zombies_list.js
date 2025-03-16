//This is the complete of spawnlings, a.k.a. other zombies and companions you may summon for your fights, in PvZ ZPG

//zombies
class Zombie{
    constructor(name, description, maxHp, actions, armors, passives, were_tags) {
        this.name               = name;                 //define as words ""
        this.description        = description;          //define as words ""
        this.maxHp              = maxHp;                //define as number
        this.actions            = actions;              //define as an array of attack and gadget items, and utilitary actions that are available to it
        this.armors             = armors;               //define as an array of armor items that are available to it
        this.passives           = passives;             //define as an array of passive items that are available to it
        this.were_tags          = were_tags;            //define as an array of tags that affect it
    }
}

//player
const player = new Zombie(
    "Player",
    "The hero of this adventure",
    12,
    [bite],
    [],
    [],
    []
)

//spawnlings
const browncoat = new Zombie(
    "Browncoat",
    "The weakest of the weak, but an ally none the less",
    8,
    [bite],
    [],
    [],
    []
)

const brownparka = new Zombie(
    "Brownparka",
    "The weakest of the weak, but an ally none the less",
    8,
    [bite],
    [],
    [],
    [ice_immune]
)

const peasant_zombie = new Zombie(
    "Peasant Zombie",
    "Risen from the dark ages",
    6,
    [bite],
    [],
    [],
    []
)

const conehead = new Zombie(
    "Conehead",
    "The weakest of the weak, but an ally none the less",
    8,
    [bite],
    [cone],
    [],
    []
)

const space_cadet = new Zombie(
    "Space Cadet",
    "Teleported in from space",
    8,
    [bite, space_gun],
    [space_helmet],
    []
)

const zcorp_customer_service = new Zombie(
    "ZCorp Customer Service",
    "Hang on - he'll put a pin on it",
    12,
    [bite, zcorp_pin],
    [],
    [],
    []
)

const gravestone = new Zombie(
    "Gravestone",
    "Necromancy is all the rage nowadays",
    24,
    [],
    [],
    [necromancy],
    []
)