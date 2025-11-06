// Canvas setup
const sceneCanvas = document.getElementById('scene-canvas');
const sceneCtx = sceneCanvas.getContext('2d');
const minigameCanvas = document.getElementById('minigame-canvas');
const minigameCtx = minigameCanvas.getContext('2d');
const fishButton = document.getElementById('fish-button');
const statusDiv = document.getElementById('status');

sceneCanvas.width = window.innerWidth;
sceneCanvas.height = window.innerHeight;
minigameCanvas.width = 300;
minigameCanvas.height = 500;

let fishing = false;
let minigameActive = false;

// Fish types with different difficulties
const fishTypes = {
    bluegill: {
        name: 'Bluegill',
        color: '#4682B4',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.007,
        fishRandomness: 0.12,
        fishChangeInterval: 38,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 8,
        spawnWeight: 65
    },
    goldfish: {
        name: 'Goldfish',
        color: '#FFD700',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0075,
        fishRandomness: 0.14,
        fishChangeInterval: 39,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 5,
        spawnWeight: 10
    },
    chub: {
        name: 'Chub',
        color: '#FF6B35',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.008,
        fishRandomness: 0.15,
        fishChangeInterval: 40,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 18,
        spawnWeight: 60
    },
    perch: {
        name: 'Perch',
        color: '#FFD700',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.009,
        fishRandomness: 0.18,
        fishChangeInterval: 45,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 12,
        spawnWeight: 55
    },
    rockBass: {
        name: 'Rock Bass',
        color: '#8B6914',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0085,
        fishRandomness: 0.16,
        fishChangeInterval: 43,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 10,
        spawnWeight: 52
    },
    trout: {
        name: 'Trout',
        color: '#8B7355',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.01,
        fishRandomness: 0.2,
        fishChangeInterval: 42,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 4,
        maxWeight: 20,
        spawnWeight: 50
    },
    bullhead: {
        name: 'Bullhead',
        color: '#654321',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0095,
        fishRandomness: 0.19,
        fishChangeInterval: 44,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 14,
        spawnWeight: 48
    },
    herring: {
        name: 'Herring',
        color: '#C0C0C0',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0105,
        fishRandomness: 0.21,
        fishChangeInterval: 41,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 9,
        spawnWeight: 46
    },
    crappie: {
        name: 'Crappie',
        color: '#B8B8B8',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0108,
        fishRandomness: 0.23,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 16,
        spawnWeight: 42
    },
    crucianCarp: {
        name: 'Crucian Carp',
        color: '#CD853F',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.011,
        fishRandomness: 0.22,
        fishChangeInterval: 48,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 5,
        maxWeight: 15,
        spawnWeight: 40
    },
    ranchuGoldfish: {
        name: 'Ranchu Goldfish',
        color: '#FF8C00',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0105,
        fishRandomness: 0.23,
        fishChangeInterval: 47,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 8,
        spawnWeight: 8
    },
    koi: {
        name: 'Koi',
        color: '#FF6347',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.011,
        fishRandomness: 0.24,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 5,
        maxWeight: 30,
        spawnWeight: 5
    },
    whitefish: {
        name: 'Whitefish',
        color: '#F5F5DC',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0115,
        fishRandomness: 0.24,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 4,
        maxWeight: 18,
        spawnWeight: 38
    },
    smallmouthBass: {
        name: 'Smallmouth Bass',
        color: '#8B4726',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.012,
        fishRandomness: 0.26,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 5,
        maxWeight: 22,
        spawnWeight: 35
    },
    salmon: {
        name: 'Salmon',
        color: '#FF6B35',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.012,
        fishRandomness: 0.25,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 30,
        spawnWeight: 33
    },
    largemouthBass: {
        name: 'Largemouth Bass',
        color: '#3D5E3D',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0125,
        fishRandomness: 0.27,
        fishChangeInterval: 54,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 6,
        maxWeight: 25,
        spawnWeight: 32
    },
    rainbowTrout: {
        name: 'Rainbow Trout',
        color: '#FF1493',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.013,
        fishRandomness: 0.28,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 6,
        maxWeight: 25,
        spawnWeight: 30
    },
    walleye: {
        name: 'Walleye',
        color: '#DAA520',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.014,
        fishRandomness: 0.3,
        fishChangeInterval: 55,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 10,
        maxWeight: 35,
        spawnWeight: 28
    },
    cherrySalmon: {
        name: 'Cherry Salmon',
        color: '#DC143C',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.016,
        fishRandomness: 0.5,
        fishChangeInterval: 58,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 10,
        maxWeight: 28,
        spawnWeight: 22
    },
    catfish: {
        name: 'Catfish',
        color: '#696969',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.018,
        fishRandomness: 0.6,
        fishChangeInterval: 59,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 12,
        maxWeight: 50,
        spawnWeight: 20
    },
    cohoSalmon: {
        name: 'Coho Salmon',
        color: '#FF4500',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.019,
        fishRandomness: 0.65,
        fishChangeInterval: 61,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 15,
        maxWeight: 35,
        spawnWeight: 18
    },
    carp: {
        name: 'Carp',
        color: '#8B4513',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.02,
        fishRandomness: 0.7,
        fishChangeInterval: 60,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 15,
        maxWeight: 60,
        spawnWeight: 16
    },
    pike: {
        name: 'Pike',
        color: '#228B22',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.022,
        fishRandomness: 0.8,
        fishChangeInterval: 63,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 18,
        maxWeight: 55,
        spawnWeight: 14
    },
    gar: {
        name: 'Gar',
        color: '#556B2F',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.025,
        fishRandomness: 0.9,
        fishChangeInterval: 65,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 20,
        maxWeight: 70,
        spawnWeight: 12
    },
    kingSalmon: {
        name: 'King Salmon',
        color: '#B22222',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.026,
        fishRandomness: 1.0,
        fishChangeInterval: 66,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 25,
        maxWeight: 80,
        spawnWeight: 10
    },
    sturgeon: {
        name: 'Sturgeon',
        color: '#2F4F4F',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.028125,
        fishRandomness: 1.125,
        fishChangeInterval: 67,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 30,
        maxWeight: 100,
        spawnWeight: 8
    },
    muskellunge: {
        name: 'Muskellunge',
        color: '#2F4F2F',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.03,
        fishRandomness: 1.25,
        fishChangeInterval: 68,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 35,
        maxWeight: 110,
        spawnWeight: 5
    }
};

let currentFish = null;
let currentFishWeight = 0;

// Inventory and shop system
let maxInventorySlots = 20;
const absoluteMaxInventorySlots = 100;
let inventory = [];
let money = 0;
const inventorySlotPrice = 100;
let currentPage = 'fishing'; // 'fishing' or 'shop'

// Fish selling prices (per pound)
const fishPrices = {
    'Bluegill': 2,
    'Herring': 3,
    'Perch': 3,
    'Rock Bass': 3,
    'Bullhead': 4,
    'Chub': 4,
    'Trout': 5,
    'Whitefish': 5,
    'Crappie': 6,
    'Crucian Carp': 6,
    'Salmon': 7,
    'Smallmouth Bass': 8,
    'Largemouth Bass': 8,
    'Rainbow Trout': 8,
    'Cherry Salmon': 9,
    'Walleye': 10,
    'Catfish': 11,
    'Carp': 12,
    'Coho Salmon': 13,
    'Pike': 14,
    'Gar': 14,
    'Sturgeon': 15,
    'King Salmon': 16,
    'Muskellunge': 18,
    'Goldfish': 20,
    'Ranchu Goldfish': 25,
    'Koi': 30
};

// Bait system
const baitTypes = {
    worms: {
        name: 'Worms',
        price: 50,
        description: 'Great for panfish',
        boosts: ['bluegill', 'perch', 'rockBass', 'crappie', 'bullhead'],
        multiplier: 8
    },
    grubs: {
        name: 'Grubs',
        price: 75,
        description: 'Attracts small fish',
        boosts: ['chub', 'herring', 'whitefish', 'goldfish'],
        multiplier: 8
    },
    minnows: {
        name: 'Minnows',
        price: 150,
        description: 'Perfect for bass',
        boosts: ['smallmouthBass', 'largemouthBass', 'pike', 'walleye'],
        multiplier: 8
    },
    crawfish: {
        name: 'Crawfish',
        price: 200,
        description: 'Irresistible to catfish',
        boosts: ['catfish', 'bullhead', 'carp'],
        multiplier: 8
    },
    spinners: {
        name: 'Spinners',
        price: 250,
        description: 'Best for trout',
        boosts: ['trout', 'rainbowTrout', 'salmon', 'cherrySalmon', 'cohoSalmon', 'kingSalmon'],
        multiplier: 8
    },
    leeches: {
        name: 'Leeches',
        price: 300,
        description: 'Premium for walleye',
        boosts: ['walleye', 'pike', 'muskellunge'],
        multiplier: 8
    },
    doughBalls: {
        name: 'Dough Balls',
        price: 100,
        description: 'Carp favorite',
        boosts: ['carp', 'crucianCarp', 'koi'],
        multiplier: 8
    },
    cutBait: {
        name: 'Cut Bait',
        price: 350,
        description: 'For trophy fish',
        boosts: ['sturgeon', 'gar', 'muskellunge', 'kingSalmon'],
        multiplier: 8
    }
};

let currentBait = null; // Currently equipped bait
let baitInventory = {}; // Stores quantity of each bait type

// Trinket system
const trinketTypes = {
    luckyCharm: {
        name: 'Lucky Charm',
        price: 50000,
        description: 'Increases catch zone by 20%',
        effect: 'catchZone',
        bonus: 0.20,
        icon: '🍀'
    },
    goldenClover: {
        name: 'Golden Clover',
        price: 200000,
        description: 'Increases catch zone by 40%',
        effect: 'catchZone',
        bonus: 0.40,
        icon: '☘️'
    },
    coinPurse: {
        name: 'Coin Purse',
        price: 75000,
        description: 'Increases sell prices by 20%',
        effect: 'sellBonus',
        bonus: 0.20,
        icon: '👛'
    },
    treasureChest: {
        name: 'Treasure Chest',
        price: 250000,
        description: 'Increases sell prices by 40%',
        effect: 'sellBonus',
        bonus: 0.40,
        icon: '💰'
    },
    trophyLure: {
        name: 'Trophy Lure',
        price: 100000,
        description: 'Increases trophy fish odds by 20%',
        effect: 'trophyOdds',
        bonus: 0.20,
        icon: '🎖️'
    },
    masterLure: {
        name: 'Master Lure',
        price: 300000,
        description: 'Increases trophy fish odds by 40%',
        effect: 'trophyOdds',
        bonus: 0.40,
        icon: '🏆'
    },
    weightCharm: {
        name: 'Weight Charm',
        price: 80000,
        description: 'Increases fish weight by 20%',
        effect: 'weightBonus',
        bonus: 0.20,
        icon: '⚖️'
    },
    heavyCharm: {
        name: 'Heavy Charm',
        price: 275000,
        description: 'Increases fish weight by 40%',
        effect: 'weightBonus',
        bonus: 0.40,
        icon: '🪨'
    }
};

let equippedTrinkets = []; // Array of currently equipped trinkets
let trinketInventory = {}; // Stores owned trinkets (boolean)
let maxTrinketSlots = 1; // Default: can equip 1 trinket
let trinketSlotUpgrades = [
    { slots: 2, price: 500000, purchased: false },
    { slots: 3, price: 5000000, purchased: false }
];

// Fishing rods
const fishingRods = [
    { name: 'Plastic Rod', barSizeBonus: 0, price: 0, owned: true },
    { name: 'Bamboo Rod', barSizeBonus: 20, price: 5000, owned: false },
    { name: 'Rubber Rod', barSizeBonus: 40, price: 10000, owned: false },
    { name: 'Iron Rod', barSizeBonus: 60, price: 100000, owned: false },
    { name: 'Titanium Rod', barSizeBonus: 80, price: 1000000, owned: false }
];

let currentRodIndex = 0;

// Load game data from localStorage
function loadGameData() {
    const savedData = localStorage.getItem('fishingGameSave');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            inventory = data.inventory || [];
            money = data.money || 0;
            maxInventorySlots = data.maxInventorySlots || 20;
            currentRodIndex = data.currentRodIndex || 0;
            
            // Restore owned rods
            if (data.ownedRods) {
                data.ownedRods.forEach((owned, index) => {
                    if (fishingRods[index]) {
                        fishingRods[index].owned = owned;
                    }
                });
            }
            
            // Restore bait inventory and equipped bait
            baitInventory = data.baitInventory || {};
            currentBait = data.currentBait || null;
            
            // Restore trinket inventory and equipped trinkets
            trinketInventory = data.trinketInventory || {};
            equippedTrinkets = data.equippedTrinkets || [];
            maxTrinketSlots = data.maxTrinketSlots || 1;
            
            // Restore trinket slot upgrades
            if (data.trinketSlotUpgrades) {
                data.trinketSlotUpgrades.forEach((purchased, index) => {
                    if (trinketSlotUpgrades[index]) {
                        trinketSlotUpgrades[index].purchased = purchased;
                    }
                });
            }
            
            console.log('Game data loaded successfully');
        } catch (e) {
            console.error('Error loading game data:', e);
        }
    }
}

// Save game data to localStorage
function saveGameData() {
    const data = {
        inventory: inventory,
        money: money,
        maxInventorySlots: maxInventorySlots,
        currentRodIndex: currentRodIndex,
        ownedRods: fishingRods.map(rod => rod.owned),
        baitInventory: baitInventory,
        currentBait: currentBait,
        trinketInventory: trinketInventory,
        equippedTrinkets: equippedTrinkets,
        maxTrinketSlots: maxTrinketSlots,
        trinketSlotUpgrades: trinketSlotUpgrades.map(u => u.purchased)
    };
    localStorage.setItem('fishingGameSave', JSON.stringify(data));
    console.log('Game data saved');
}

// Helper function to get total bonus from all equipped trinkets of a specific effect
function getTrinketBonus(effectType) {
    let totalBonus = 0;
    equippedTrinkets.forEach(trinketKey => {
        if (trinketTypes[trinketKey] && trinketTypes[trinketKey].effect === effectType) {
            totalBonus += trinketTypes[trinketKey].bonus;
        }
    });
    return totalBonus;
}

// Helper function to check if any equipped trinket has a specific effect
function hasTrinketEffect(effectType) {
    return equippedTrinkets.some(trinketKey => 
        trinketTypes[trinketKey] && trinketTypes[trinketKey].effect === effectType
    );
}

// Minigame variables - Circular ring design
let barAngle = 0; // Angle position of the bar around the ring (in radians)
let barAngleSize = Math.PI / 3; // Size of the bar arc (60 degrees)
let barAngularSpeed = 0;

let fishAngle = 0; // Angle position of the fish around the ring
let fishAngularSpeed = 0;
let fishTargetAngle = 0;
let fishChangeTimer = 0;

let progress = 0;
let progressDecayRate = 0.2;
let progressGainRate = 0.4;
const maxProgress = 100;
const winThreshold = 100;
let isPerfectCatch = true; // Track if player has maintained perfect catch
let lastProgress = 0; // Track last frame's progress to detect decreases

let leftMouseDown = false;
let rightMouseDown = false;
let animationFrameId = null;

// Ring properties
const ringRadius = 120;
const ringThickness = 40;

// Delta time variables for frame-rate independent movement
let lastFrameTime = 0;
const TARGET_FPS = 60;
const TARGET_FRAME_TIME = 1000 / TARGET_FPS;

// Draw the main scene (fisherman on dock with lake)
function drawScene() {
    // Sky (gradient) - Night time
    const skyGradient = sceneCtx.createLinearGradient(0, 0, 0, sceneCanvas.height * 0.6);
    skyGradient.addColorStop(0, '#0B1026');
    skyGradient.addColorStop(1, '#1a2947');
    sceneCtx.fillStyle = skyGradient;
    sceneCtx.fillRect(0, 0, sceneCanvas.width, sceneCanvas.height * 0.6);
    
    // Stars
    sceneCtx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 50; i++) {
        const x = (i * 137.5) % sceneCanvas.width;
        const y = (i * 73.3) % (sceneCanvas.height * 0.6);
        const size = (i % 3) + 1;
        sceneCtx.beginPath();
        sceneCtx.arc(x, y, size, 0, Math.PI * 2);
        sceneCtx.fill();
    }
    
    // Moon - Crescent
    const moonX = sceneCanvas.width * 0.8;
    const moonY = sceneCanvas.height * 0.15;
    const moonRadius = 40;
    
    // Full moon circle
    sceneCtx.fillStyle = '#F0E68C';
    sceneCtx.beginPath();
    sceneCtx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    sceneCtx.fill();
    
    // Shadow circle to create crescent
    sceneCtx.fillStyle = '#0B1026';
    sceneCtx.beginPath();
    sceneCtx.arc(moonX + 15, moonY - 5, moonRadius, 0, Math.PI * 2);
    sceneCtx.fill();

    // Water (gradient)
    const waterGradient = sceneCtx.createLinearGradient(0, sceneCanvas.height * 0.6, 0, sceneCanvas.height);
    waterGradient.addColorStop(0, '#1a2947');
    waterGradient.addColorStop(1, '#0d1b3a');
    sceneCtx.fillStyle = waterGradient;
    sceneCtx.fillRect(0, sceneCanvas.height * 0.6, sceneCanvas.width, sceneCanvas.height * 0.4);

    // Water ripples - extended to cover full water area
    sceneCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    sceneCtx.lineWidth = 2;
    const waterHeight = sceneCanvas.height * 0.4;
    const numRipples = Math.floor(waterHeight / 20) + 5;
    
    for (let i = 0; i < numRipples; i++) {
        const y = sceneCanvas.height * 0.6 + i * 20 + (Date.now() / 500 % 20);
        if (y > sceneCanvas.height) continue;
        sceneCtx.beginPath();
        sceneCtx.moveTo(0, y);
        for (let x = 0; x < sceneCanvas.width; x += 20) {
            sceneCtx.lineTo(x + 10, y + Math.sin((x + Date.now() / 200) * 0.1) * 3);
        }
        sceneCtx.stroke();
    }

    // Dock (wooden platform)
    sceneCtx.fillStyle = '#8B4513';
    sceneCtx.fillRect(sceneCanvas.width * 0.6, sceneCanvas.height * 0.55, sceneCanvas.width * 0.4, 70);
    
    // Dock planks
    sceneCtx.strokeStyle = '#654321';
    sceneCtx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
        const x = sceneCanvas.width * 0.6 + i * 50;
        sceneCtx.beginPath();
        sceneCtx.moveTo(x, sceneCanvas.height * 0.55);
        sceneCtx.lineTo(x, sceneCanvas.height * 0.55 + 70);
        sceneCtx.stroke();
    }

    // Dock posts
    sceneCtx.fillStyle = '#654321';
    sceneCtx.fillRect(sceneCanvas.width * 0.65, sceneCanvas.height * 0.625, 15, sceneCanvas.height * 0.375);
    sceneCtx.fillRect(sceneCanvas.width * 0.85, sceneCanvas.height * 0.625, 15, sceneCanvas.height * 0.375);

    // Fisherman (stick figure)
    const fishermanX = sceneCanvas.width * 0.75;
    const fishermanY = sceneCanvas.height * 0.55;

    // Head
    sceneCtx.fillStyle = '#FFD0B0';
    sceneCtx.beginPath();
    sceneCtx.arc(fishermanX, fishermanY - 60, 20, 0, Math.PI * 2);
    sceneCtx.fill();

    // Hat
    sceneCtx.fillStyle = '#8B4513';
    sceneCtx.fillRect(fishermanX - 25, fishermanY - 75, 50, 10);
    sceneCtx.fillRect(fishermanX - 15, fishermanY - 95, 30, 20);

    // Body
    sceneCtx.strokeStyle = '#4169E1';
    sceneCtx.lineWidth = 12;
    sceneCtx.lineCap = 'round';
    sceneCtx.beginPath();
    sceneCtx.moveTo(fishermanX, fishermanY - 40);
    sceneCtx.lineTo(fishermanX, fishermanY + 10);
    sceneCtx.stroke();

    // Arms
    sceneCtx.lineWidth = 8;
    sceneCtx.beginPath();
    sceneCtx.moveTo(fishermanX, fishermanY - 30);
    sceneCtx.lineTo(fishermanX - 30, fishermanY - 10);
    sceneCtx.stroke();

    sceneCtx.beginPath();
    sceneCtx.moveTo(fishermanX, fishermanY - 30);
    sceneCtx.lineTo(fishermanX + 40, fishermanY - 40);
    sceneCtx.stroke();

    // Fishing rod
    sceneCtx.strokeStyle = '#654321';
    sceneCtx.lineWidth = 4;
    sceneCtx.beginPath();
    sceneCtx.moveTo(fishermanX + 40, fishermanY - 40);
    sceneCtx.lineTo(fishermanX + 100, fishermanY - 80);
    sceneCtx.stroke();

    // Fishing line
    sceneCtx.strokeStyle = '#333';
    sceneCtx.lineWidth = 1;
    sceneCtx.beginPath();
    sceneCtx.moveTo(fishermanX + 100, fishermanY - 80);
    sceneCtx.lineTo(sceneCanvas.width * 0.4, sceneCanvas.height * 0.75);
    sceneCtx.stroke();

    // Bobber
    sceneCtx.fillStyle = '#FF4500';
    sceneCtx.beginPath();
    sceneCtx.arc(sceneCanvas.width * 0.4, sceneCanvas.height * 0.75 + Math.sin(Date.now() / 300) * 3, 8, 0, Math.PI * 2);
    sceneCtx.fill();

    // Legs
    sceneCtx.strokeStyle = '#2F4F4F';
    sceneCtx.lineWidth = 8;
    sceneCtx.beginPath();
    sceneCtx.moveTo(fishermanX, fishermanY + 10);
    sceneCtx.lineTo(fishermanX - 15, fishermanY + 45);
    sceneCtx.stroke();

    sceneCtx.beginPath();
    sceneCtx.moveTo(fishermanX, fishermanY + 10);
    sceneCtx.lineTo(fishermanX + 15, fishermanY + 45);
    sceneCtx.stroke();
}

// Start the minigame
function startMinigame() {
    console.log('startMinigame called');
    fishing = true;
    minigameActive = true;
    fishButton.disabled = true;
    
    // Reset and show status message
    statusDiv.style.opacity = '1';
    statusDiv.style.transition = 'none';
    
    // Randomly select a fish type based on spawn weights (modified by bait)
    const fishKeys = Object.keys(fishTypes);
    
    // Calculate total weight with bait multipliers
    const totalWeight = fishKeys.reduce((sum, key) => {
        let weight = fishTypes[key].spawnWeight;
        // If bait is equipped and this fish is boosted by it, multiply the spawn weight
        if (currentBait && baitTypes[currentBait].boosts.includes(key)) {
            weight *= baitTypes[currentBait].multiplier;
        }
        return sum + weight;
    }, 0);
    
    let random = Math.random() * totalWeight;
    
    let selectedFish = fishKeys[0];
    for (const key of fishKeys) {
        let weight = fishTypes[key].spawnWeight;
        // Apply bait multiplier
        if (currentBait && baitTypes[currentBait].boosts.includes(key)) {
            weight *= baitTypes[currentBait].multiplier;
        }
        random -= weight;
        if (random <= 0) {
            selectedFish = key;
            break;
        }
    }
    
    // Consume bait if equipped
    if (currentBait) {
        baitInventory[currentBait]--;
        if (baitInventory[currentBait] <= 0) {
            delete baitInventory[currentBait];
            currentBait = null;
            updateShopDisplay();
        }
    }
    
    currentFish = fishTypes[selectedFish];
    console.log('Current fish:', currentFish);
    
    // Generate random weight for this fish
    let weightRoll = Math.random();
    
    // Apply trophy odds bonus from equipped trinkets
    const trophyOddsBonus = getTrinketBonus('trophyOdds');
    if (trophyOddsBonus > 0) {
        // Push the random roll toward 1 (higher weight)
        weightRoll = weightRoll + (1 - weightRoll) * trophyOddsBonus;
    }
    
    currentFishWeight = Math.floor(weightRoll * (currentFish.maxWeight - currentFish.minWeight + 1)) + currentFish.minWeight;
    
    // Apply weight bonus from equipped trinkets
    const weightBonus = getTrinketBonus('weightBonus');
    if (weightBonus > 0) {
        const weightRange = currentFish.maxWeight - currentFish.minWeight;
        currentFishWeight = Math.floor(currentFishWeight + (weightRange * weightBonus));
        // Clamp to max weight
        currentFishWeight = Math.min(currentFishWeight, currentFish.maxWeight);
    }
    
    // Calculate weight factor (0 to 1, where 1 is maximum weight)
    const weightFactor = (currentFishWeight - currentFish.minWeight) / (currentFish.maxWeight - currentFish.minWeight);
    
    // Adjust difficulty based on weight
    // Heavier fish are faster, more erratic, and change direction more often
    const weightAdjustedSpeed = currentFish.fishSpeed * (1 + weightFactor * 0.3); // Up to 30% faster
    const weightAdjustedRandomness = currentFish.fishRandomness * (1 + weightFactor * 0.4); // Up to 40% more erratic
    const weightAdjustedInterval = currentFish.fishChangeInterval * (1 - weightFactor * 0.25); // Up to 25% more frequent changes
    
    statusDiv.textContent = 'Left click to move bar left, right click to move bar right!';
    
    console.log('Hiding scene canvas, showing minigame canvas');
    sceneCanvas.style.display = 'none';
    minigameCanvas.style.display = 'block';
    console.log('Canvas display states - scene:', sceneCanvas.style.display, 'minigame:', minigameCanvas.style.display);
    
    // Reset minigame variables for circular ring design
    let barSizeInDegrees = (currentFish.barSize + (fishingRods[currentRodIndex]?.barSizeBonus || 0)) / 2;
    
    // Apply catch zone bonus from equipped trinkets
    const catchZoneBonus = getTrinketBonus('catchZone');
    if (catchZoneBonus > 0) {
        barSizeInDegrees *= (1 + catchZoneBonus);
    }
    
    barAngleSize = (barSizeInDegrees / 180) * Math.PI; // Convert to radians
    barAngle = 0; // Start at top
    barAngularSpeed = 0;
    fishAngle = 0; // Start fish at top
    fishAngularSpeed = 0;
    fishTargetAngle = 0;
    fishChangeTimer = 0;
    progress = 15;
    progressGainRate = currentFish.progressGainRate;
    progressDecayRate = currentFish.progressDecayRate;
    isPerfectCatch = true; // Reset perfect catch tracker
    lastProgress = progress; // Initialize last progress
    
    // Store weight-adjusted values for use in game loop
    currentFish.adjustedSpeed = weightAdjustedSpeed;
    currentFish.adjustedRandomness = weightAdjustedRandomness;
    currentFish.adjustedInterval = weightAdjustedInterval;
    leftMouseDown = false;
    rightMouseDown = false;
    
    lastFrameTime = performance.now(); // Initialize timing
    
    gameLoop();
}

// Minigame loop
function gameLoop() {
    if (!minigameActive) return;
    
    // Calculate delta time
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    const deltaMultiplier = deltaTime / TARGET_FRAME_TIME;
    lastFrameTime = currentTime;
    
    // Update bar angle based on mouse input with momentum
    const rotationAcceleration = 0.003; // Acceleration rate
    const maxRotationSpeed = 0.08; // Maximum rotation speed
    const rotationDrag = 0.85; // Deceleration factor (0-1, lower = more drag)
    
    if (leftMouseDown) {
        barAngularSpeed -= rotationAcceleration * deltaMultiplier; // Counter-clockwise
    } else if (rightMouseDown) {
        barAngularSpeed += rotationAcceleration * deltaMultiplier; // Clockwise
    } else {
        // Apply drag when no input
        barAngularSpeed *= Math.pow(rotationDrag, deltaMultiplier);
    }
    
    // Clamp speed
    barAngularSpeed = Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, barAngularSpeed));
    
    barAngle += barAngularSpeed * deltaMultiplier;
    
    // Normalize angle to 0-2π range
    if (barAngle < 0) barAngle += Math.PI * 2;
    if (barAngle >= Math.PI * 2) barAngle -= Math.PI * 2;
    
    // Update fish position around the ring
    fishChangeTimer += deltaMultiplier;
    if (fishChangeTimer > currentFish.adjustedInterval) {
        fishTargetAngle = Math.random() * Math.PI * 2;
        fishChangeTimer = 0;
    }
    
    // Move fish towards target angle (30% easier - reduced speed and randomness)
    let angleDiff = fishTargetAngle - fishAngle;
    // Take shortest path around circle
    if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    
    // Apply 30% difficulty reduction (multiply speed by 0.7)
    fishAngularSpeed = (angleDiff * currentFish.adjustedSpeed * 0.7 + (Math.random() - 0.5) * currentFish.adjustedRandomness * 0.1 * 0.7) * deltaMultiplier;
    fishAngle += fishAngularSpeed;
    
    // Normalize fish angle
    if (fishAngle < 0) fishAngle += Math.PI * 2;
    if (fishAngle >= Math.PI * 2) fishAngle -= Math.PI * 2;
    
    // Check if fish is in the bar arc
    let fishAngleInBar = false;
    let barStartAngle = barAngle - barAngleSize / 2;
    let barEndAngle = barAngle + barAngleSize / 2;
    
    // Normalize bar angles
    if (barStartAngle < 0) barStartAngle += Math.PI * 2;
    if (barEndAngle >= Math.PI * 2) barEndAngle -= Math.PI * 2;
    
    // Check if fish is within bar arc (handle wraparound)
    if (barStartAngle < barEndAngle) {
        fishAngleInBar = fishAngle >= barStartAngle && fishAngle <= barEndAngle;
    } else {
        fishAngleInBar = fishAngle >= barStartAngle || fishAngle <= barEndAngle;
    }
    
    if (fishAngleInBar) {
        progress += progressGainRate * deltaMultiplier;
    } else {
        progress -= progressDecayRate * deltaMultiplier;
    }
    
    progress = Math.max(0, Math.min(maxProgress, progress));
    
    // Check if progress decreased from last frame - if so, not a perfect catch
    if (progress < lastProgress) {
        isPerfectCatch = false;
    }
    lastProgress = progress;
    
    // Check for win/lose
    if (progress >= winThreshold) {
        endMinigame(true);
        return;
    }
    
    if (progress <= 0) {
        endMinigame(false);
        return;
    }
    
    // Draw minigame
    drawMinigame(fishAngleInBar);
    
    animationFrameId = requestAnimationFrame(gameLoop);
}

// Draw the minigame - Circular ring design
function drawMinigame(fishInBar) {
    // Background - match night water color
    minigameCtx.fillStyle = '#0d1b3a';
    minigameCtx.fillRect(0, 0, minigameCanvas.width, minigameCanvas.height);
    
    const centerX = minigameCanvas.width / 2;
    const centerY = minigameCanvas.height / 2 - 30;
    
    // Draw outer ring (white transparent)
    minigameCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    minigameCtx.lineWidth = ringThickness;
    minigameCtx.beginPath();
    minigameCtx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
    minigameCtx.stroke();
    
    // Draw green bar arc
    const barStartAngle = barAngle - barAngleSize / 2 - Math.PI / 2; // Adjust for canvas coordinate system
    const barEndAngle = barAngle + barAngleSize / 2 - Math.PI / 2;
    
    minigameCtx.strokeStyle = fishInBar ? '#4CAF50' : '#2E7D32';
    minigameCtx.lineWidth = ringThickness;
    minigameCtx.beginPath();
    minigameCtx.arc(centerX, centerY, ringRadius, barStartAngle, barEndAngle);
    minigameCtx.stroke();
    
    // Draw fish on the ring
    const fishX = centerX + Math.cos(fishAngle - Math.PI / 2) * ringRadius;
    const fishY = centerY + Math.sin(fishAngle - Math.PI / 2) * ringRadius;
    
    // Fish icon (circular)
    minigameCtx.fillStyle = currentFish.color;
    minigameCtx.beginPath();
    minigameCtx.arc(fishX, fishY, 15, 0, Math.PI * 2);
    minigameCtx.fill();
    
    // Fish eye
    minigameCtx.fillStyle = '#FFFFFF';
    minigameCtx.beginPath();
    minigameCtx.arc(fishX + 3, fishY - 3, 4, 0, Math.PI * 2);
    minigameCtx.fill();
    
    // Progress ring (outer ring around the fishing ring)
    const progressRingRadius = ringRadius + ringThickness / 2 + 15;
    const progressRingThickness = 10;
    
    // Determine progress color
    let progressColor;
    if (progress < 20) {
        progressColor = '#FF6B6B';
    } else if (progress < 70) {
        const factor = (progress - 20) / 50;
        const r = 255;
        const g = Math.floor(107 + factor * (215 - 107));
        const b = Math.floor(107 - factor * 107);
        progressColor = `rgb(${r}, ${g}, ${b})`;
    } else {
        const factor = (progress - 70) / 30;
        const r = Math.floor(255 - factor * (255 - 102));
        const g = Math.floor(215 + factor * (187 - 215));
        const b = Math.floor(0 + factor * 106);
        progressColor = `rgb(${r}, ${g}, ${b})`;
    }
    
    // Draw progress ring background (grey)
    minigameCtx.strokeStyle = 'rgba(85, 85, 85, 0.5)';
    minigameCtx.lineWidth = progressRingThickness;
    minigameCtx.beginPath();
    minigameCtx.arc(centerX, centerY, progressRingRadius, 0, Math.PI * 2);
    minigameCtx.stroke();
    
    // Draw progress ring fill (colored based on progress)
    const progressAngle = (progress / maxProgress) * Math.PI * 2;
    minigameCtx.strokeStyle = progressColor;
    minigameCtx.lineWidth = progressRingThickness;
    minigameCtx.beginPath();
    minigameCtx.arc(centerX, centerY, progressRingRadius, -Math.PI / 2, -Math.PI / 2 + progressAngle);
    minigameCtx.stroke();
    
    // Progress text in center
    minigameCtx.fillStyle = '#FFFFFF';
    minigameCtx.font = 'bold 24px Arial';
    minigameCtx.textAlign = 'center';
    minigameCtx.fillText(Math.floor(progress) + '%', centerX, centerY + 10);
    
    // Perfect catch indicator
    if (isPerfectCatch) {
        minigameCtx.fillStyle = '#FFD700';
        minigameCtx.font = 'bold 16px Arial';
        minigameCtx.fillText('⭐ PERFECT ⭐', centerX, centerY - 20);
    }
    
    // Instructions
    minigameCtx.fillStyle = '#FFFFFF';
    minigameCtx.font = '14px Arial';
    minigameCtx.fillText('Left click = Counter-clockwise | Right click = Clockwise', minigameCanvas.width / 2, minigameCanvas.height - 10);
}

// End the minigame
function endMinigame(success) {
    minigameActive = false;
    fishing = false;
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    sceneCanvas.style.display = 'block';
    minigameCanvas.style.display = 'none';
    fishButton.disabled = false;
    
    // Show message and make it visible
    statusDiv.style.opacity = '1';
    statusDiv.style.transition = 'none';
    
    if (success) {
        // Apply perfect catch bonus
        let finalWeight = currentFishWeight;
        let perfectCatchBonus = '';
        
        if (isPerfectCatch) {
            finalWeight = Math.floor(currentFishWeight * 1.30); // 30% bonus
            perfectCatchBonus = ' ⭐ PERFECT CATCH! +30% weight!';
        }
        
        // Add fish to inventory
        if (inventory.length < maxInventorySlots) {
            inventory.push({
                type: currentFish.name,
                weight: finalWeight
            });
            statusDiv.textContent = `🐟 You caught a ${currentFish.name} weighing ${finalWeight} lbs!${perfectCatchBonus} (${inventory.length}/${maxInventorySlots})`;
            updateInventoryDisplay();
            saveGameData();
        } else {
            statusDiv.textContent = `🐟 You caught a ${currentFish.name} weighing ${finalWeight} lbs!${perfectCatchBonus} But your inventory is full!`;
        }
    } else {
        statusDiv.textContent = `❌ The ${currentFish.name} got away... Try again!`;
    }
    
    // Fade out after 5 seconds
    setTimeout(() => {
        statusDiv.style.transition = 'opacity 1s ease-out';
        statusDiv.style.opacity = '0';
    }, 5000);
}

// Event listeners
fishButton.addEventListener('click', () => {
    if (!fishing) {
        // Check if inventory is full
        if (inventory.length >= maxInventorySlots) {
            statusDiv.style.opacity = '1';
            statusDiv.style.transition = 'none';
            statusDiv.textContent = '❌ Your inventory is full! Sell some fish at the shop.';
            setTimeout(() => {
                statusDiv.style.transition = 'opacity 1s ease-out';
                statusDiv.style.opacity = '0';
            }, 3000);
            return;
        }
        startMinigame();
    }
});

// Mouse/click controls for the minigame - Circular ring design
document.addEventListener('mousedown', (e) => {
    if (minigameActive) {
        if (e.button === 0) { // Left click
            leftMouseDown = true;
        } else if (e.button === 2) { // Right click
            rightMouseDown = true;
        }
        e.preventDefault();
    }
});

document.addEventListener('mouseup', (e) => {
    if (minigameActive) {
        if (e.button === 0) { // Left click
            leftMouseDown = false;
        } else if (e.button === 2) { // Right click
            rightMouseDown = false;
        }
    }
});

// Prevent context menu on right click during minigame
document.addEventListener('contextmenu', (e) => {
    if (minigameActive) {
        e.preventDefault();
    }
});

// Keyboard controls (A/D or Arrow keys)
document.addEventListener('keydown', (e) => {
    if (minigameActive) {
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
            leftMouseDown = true;
            e.preventDefault();
        } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
            rightMouseDown = true;
            e.preventDefault();
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (minigameActive) {
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
            leftMouseDown = false;
            e.preventDefault();
        } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
            rightMouseDown = false;
            e.preventDefault();
        }
    }
});

// Touch controls for mobile - left/right side of screen
document.addEventListener('touchstart', (e) => {
    if (minigameActive) {
        const touch = e.touches[0];
        if (touch.clientX < window.innerWidth / 2) {
            leftMouseDown = true;
        } else {
            rightMouseDown = true;
        }
        e.preventDefault();
    }
});

document.addEventListener('touchend', (e) => {
    if (minigameActive) {
        leftMouseDown = false;
        rightMouseDown = false;
        e.preventDefault();
    }
});

// Draw initial scene
drawScene();

// Get fish color based on type
function getFishColor(fishType) {
    switch(fishType) {
        case 'Chub':
            return '#808080'; // Gray
        case 'Salmon':
            return '#FF6B6B'; // Red
        case 'Sturgeon':
            return '#8B4513'; // Brown
        default:
            return '#FF6B35'; // Orange fallback
    }
}

// Update inventory display
// Function to update the bait indicator on the fishing page
function updateBaitIndicator() {
    // Remove equipped bait if inventory is empty
    if (currentBait && (!baitInventory[currentBait] || baitInventory[currentBait] <= 0)) {
        currentBait = null;
    }
}

// Function to update the bait popup
function updateBaitPopup() {
    const baitGrid = document.getElementById('bait-popup-grid');
    baitGrid.innerHTML = '';
    
    Object.keys(baitTypes).forEach(baitKey => {
        const bait = baitTypes[baitKey];
        const count = baitInventory[baitKey] || 0;
        const isEquipped = currentBait === baitKey;
        
        const baitSlot = document.createElement('div');
        baitSlot.className = 'bait-slot';
        
        if (count === 0) {
            baitSlot.classList.add('empty');
        }
        
        if (isEquipped) {
            baitSlot.classList.add('equipped');
        }
        
        const icon = document.createElement('div');
        icon.className = 'bait-slot-icon';
        icon.textContent = '🪱';
        
        const name = document.createElement('div');
        name.className = 'bait-slot-name';
        name.textContent = bait.name;
        if (isEquipped) {
            name.textContent += ' ✓';
        }
        
        const countDiv = document.createElement('div');
        countDiv.className = 'bait-slot-count';
        countDiv.textContent = count === 0 ? 'None owned' : `${count} remaining`;
        
        const desc = document.createElement('div');
        desc.className = 'bait-slot-desc';
        desc.textContent = bait.description;
        
        baitSlot.appendChild(icon);
        baitSlot.appendChild(name);
        baitSlot.appendChild(countDiv);
        baitSlot.appendChild(desc);
        
        // Click to equip/unequip
        if (count > 0) {
            baitSlot.addEventListener('click', () => {
                if (isEquipped) {
                    unequipBait();
                } else {
                    equipBait(baitKey);
                }
                updateBaitPopup();
            });
        }
        
        baitGrid.appendChild(baitSlot);
    });
}

// Function to update the trinket popup
function updateTrinketPopup() {
    const trinketGrid = document.getElementById('trinket-popup-grid');
    trinketGrid.innerHTML = '';
    
    // Add slots info at the top
    const slotsHeader = document.createElement('div');
    slotsHeader.style.gridColumn = '1 / -1';
    slotsHeader.style.padding = '15px';
    slotsHeader.style.background = 'rgba(186, 104, 200, 0.3)';
    slotsHeader.style.borderRadius = '8px';
    slotsHeader.style.textAlign = 'center';
    slotsHeader.style.fontWeight = 'bold';
    slotsHeader.style.fontSize = '18px';
    slotsHeader.style.color = '#6A1B9A';
    slotsHeader.style.marginBottom = '10px';
    slotsHeader.textContent = `Equipped: ${equippedTrinkets.length}/${maxTrinketSlots}`;
    trinketGrid.appendChild(slotsHeader);
    
    Object.keys(trinketTypes).forEach(trinketKey => {
        const trinket = trinketTypes[trinketKey];
        const isOwned = trinketInventory[trinketKey] || false;
        const isEquipped = equippedTrinkets.includes(trinketKey);
        
        const trinketSlot = document.createElement('div');
        trinketSlot.className = 'trinket-slot';
        
        if (!isOwned) {
            trinketSlot.classList.add('unowned');
        }
        
        if (isEquipped) {
            trinketSlot.classList.add('equipped');
        }
        
        const icon = document.createElement('div');
        icon.className = 'trinket-slot-icon';
        icon.textContent = trinket.icon;
        
        const name = document.createElement('div');
        name.className = 'trinket-slot-name';
        name.textContent = trinket.name;
        if (isEquipped) {
            name.textContent += ' ✓';
        }
        
        const desc = document.createElement('div');
        desc.className = 'trinket-slot-desc';
        desc.textContent = trinket.description;
        
        const status = document.createElement('div');
        status.className = 'trinket-slot-status';
        status.textContent = isOwned ? (isEquipped ? 'Equipped' : 'Owned') : 'Not owned';
        
        trinketSlot.appendChild(icon);
        trinketSlot.appendChild(name);
        trinketSlot.appendChild(desc);
        trinketSlot.appendChild(status);
        
        // Click to equip/unequip
        if (isOwned) {
            trinketSlot.addEventListener('click', () => {
                if (isEquipped) {
                    unequipTrinket(trinketKey);
                } else {
                    if (equippedTrinkets.length < maxTrinketSlots) {
                        equipTrinket(trinketKey);
                    }
                }
                updateTrinketPopup();
            });
        }
        
        trinketGrid.appendChild(trinketSlot);
    });
}

function updateInventoryDisplay() {
    const fishCountDiv = document.getElementById('fish-count');
    fishCountDiv.textContent = `${inventory.length}/${maxInventorySlots}`;
    
    // Update bait display
    updateBaitIndicator();
    
    const inventoryGrid = document.getElementById('inventory-grid');
    inventoryGrid.innerHTML = '';
    
    // Create 20 slots
    for (let i = 0; i < maxInventorySlots; i++) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';
        
        if (i < inventory.length) {
            const fish = inventory[i];
            slot.classList.add('filled');
            
            // Fish icon with color
            const fishIcon = document.createElement('div');
            fishIcon.className = 'fish-icon';
            fishIcon.textContent = '🐟';
            fishIcon.style.filter = `hue-rotate(${getFishHueRotation(fish.type)}deg)`;
            fishIcon.style.color = getFishColor(fish.type);
            
            // Fish name
            const fishName = document.createElement('div');
            fishName.className = 'fish-name';
            fishName.textContent = fish.type;
            
            // Fish weight
            const fishWeight = document.createElement('div');
            fishWeight.className = 'fish-weight';
            fishWeight.textContent = `${fish.weight} lbs`;
            
            slot.appendChild(fishIcon);
            slot.appendChild(fishName);
            slot.appendChild(fishWeight);
        }
        
        inventoryGrid.appendChild(slot);
    }
}

function getFishHueRotation(fishType) {
    // Adjust hue rotation for fish emoji color
    switch(fishType) {
        case 'Chub':
            return 0; // Gray
        case 'Salmon':
            return 0; // Red (natural)
        case 'Sturgeon':
            return 30; // Brown
        default:
            return 0;
    }
}

// Backpack icon click handler
document.getElementById('backpack-icon').addEventListener('click', () => {
    const popup = document.getElementById('inventory-popup');
    popup.style.display = 'block';
    updateInventoryDisplay();
});

// Close inventory popup
document.getElementById('close-inventory').addEventListener('click', () => {
    document.getElementById('inventory-popup').style.display = 'none';
});

// Bait inventory popup
document.getElementById('bait-button').addEventListener('click', () => {
    const popup = document.getElementById('bait-popup');
    popup.style.display = 'block';
    updateBaitPopup();
});

// Close bait popup
document.getElementById('close-bait-popup').addEventListener('click', () => {
    document.getElementById('bait-popup').style.display = 'none';
});

// Trinket inventory popup
document.getElementById('trinket-button').addEventListener('click', () => {
    const popup = document.getElementById('trinket-popup');
    popup.style.display = 'block';
    updateTrinketPopup();
});

// Close trinket popup
document.getElementById('close-trinket-popup').addEventListener('click', () => {
    document.getElementById('trinket-popup').style.display = 'none';
});

// Shop navigation
const shopCanvas = document.getElementById('shop-canvas');
const shopCtx = shopCanvas.getContext('2d');
shopCanvas.width = window.innerWidth;
shopCanvas.height = window.innerHeight;

document.getElementById('shop-button').addEventListener('click', () => {
    currentPage = 'shop';
    document.getElementById('fishing-page').style.display = 'none';
    document.getElementById('shop-page').style.display = 'block';
    drawShop();
    updateShopDisplay();
});

document.getElementById('back-to-fishing').addEventListener('click', () => {
    currentPage = 'fishing';
    document.getElementById('shop-page').style.display = 'none';
    document.getElementById('fishing-page').style.display = 'block';
});

// Shop tab switching
document.getElementById('sell-tab').addEventListener('click', () => {
    document.getElementById('sell-tab').classList.add('active');
    document.getElementById('buy-tab').classList.remove('active');
    document.getElementById('sell-section').classList.add('active');
    document.getElementById('buy-section').classList.remove('active');
});

document.getElementById('buy-tab').addEventListener('click', () => {
    document.getElementById('buy-tab').classList.add('active');
    document.getElementById('sell-tab').classList.remove('active');
    document.getElementById('buy-section').classList.add('active');
    document.getElementById('sell-section').classList.remove('active');
});

// Draw shop scene
function drawShop() {
    // Background - Night time sky
    const skyGradient = shopCtx.createLinearGradient(0, 0, 0, shopCanvas.height);
    skyGradient.addColorStop(0, '#0B1026');
    skyGradient.addColorStop(1, '#1a2947');
    shopCtx.fillStyle = skyGradient;
    shopCtx.fillRect(0, 0, shopCanvas.width, shopCanvas.height);
    
    // Stars
    shopCtx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 50; i++) {
        const x = (i * 137.5) % shopCanvas.width;
        const y = (i * 73.3) % (shopCanvas.height * 0.7);
        const size = (i % 3) + 1;
        shopCtx.beginPath();
        shopCtx.arc(x, y, size, 0, Math.PI * 2);
        shopCtx.fill();
    }
    
    // Moon
    const moonX = shopCanvas.width * 0.2;
    const moonY = shopCanvas.height * 0.15;
    const moonRadius = 40;
    
    // Full moon circle
    shopCtx.fillStyle = '#F0E68C';
    shopCtx.beginPath();
    shopCtx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    shopCtx.fill();
    
    // Shadow circle to create crescent
    shopCtx.fillStyle = '#0B1026';
    shopCtx.beginPath();
    shopCtx.arc(moonX + 15, moonY - 5, moonRadius, 0, Math.PI * 2);
    shopCtx.fill();
    
    // Ground - darker for night
    shopCtx.fillStyle = '#2F4F2F';
    shopCtx.fillRect(0, shopCanvas.height * 0.7, shopCanvas.width, shopCanvas.height * 0.3);
    
    // Shop building
    const shopWidth = 400;
    const shopHeight = 300;
    const shopX = shopCanvas.width / 2 - shopWidth / 2;
    const shopY = shopCanvas.height * 0.7 - shopHeight;
    
    // Building main
    shopCtx.fillStyle = '#D2691E';
    shopCtx.fillRect(shopX, shopY, shopWidth, shopHeight);
    
    // Roof
    shopCtx.fillStyle = '#8B4513';
    shopCtx.beginPath();
    shopCtx.moveTo(shopX - 30, shopY);
    shopCtx.lineTo(shopX + shopWidth / 2, shopY - 80);
    shopCtx.lineTo(shopX + shopWidth + 30, shopY);
    shopCtx.closePath();
    shopCtx.fill();
    
    // Door
    shopCtx.fillStyle = '#654321';
    shopCtx.fillRect(shopX + shopWidth / 2 - 50, shopY + shopHeight - 120, 100, 120);
    
    // Door knob
    shopCtx.fillStyle = '#FFD700';
    shopCtx.beginPath();
    shopCtx.arc(shopX + shopWidth / 2 + 30, shopY + shopHeight - 60, 8, 0, Math.PI * 2);
    shopCtx.fill();
    
    // Windows
    shopCtx.fillStyle = '#87CEEB';
    shopCtx.fillRect(shopX + 50, shopY + 80, 80, 80);
    shopCtx.fillRect(shopX + shopWidth - 130, shopY + 80, 80, 80);
    
    // Window frames
    shopCtx.strokeStyle = '#654321';
    shopCtx.lineWidth = 4;
    shopCtx.strokeRect(shopX + 50, shopY + 80, 80, 80);
    shopCtx.strokeRect(shopX + shopWidth - 130, shopY + 80, 80, 80);
    
    // Sign
    shopCtx.fillStyle = '#F5DEB3';
    shopCtx.fillRect(shopX + shopWidth / 2 - 80, shopY - 30, 160, 50);
    shopCtx.strokeStyle = '#8B4513';
    shopCtx.lineWidth = 3;
    shopCtx.strokeRect(shopX + shopWidth / 2 - 80, shopY - 30, 160, 50);
    
    // Sign text
    shopCtx.fillStyle = '#8B4513';
    shopCtx.font = 'bold 24px Arial';
    shopCtx.textAlign = 'center';
    shopCtx.fillText('FISH SHOP', shopX + shopWidth / 2, shopY - 5);
}

// Update shop display
function updateShopDisplay() {
    updateMoneyDisplay();
    updateSellInventory();
    updateBuyButton();
}

function updateMoneyDisplay() {
    document.getElementById('money-amount').textContent = money;
    document.getElementById('shop-money-amount').textContent = money;
}

function updateSellInventory() {
    const sellGrid = document.getElementById('sell-inventory-grid');
    sellGrid.innerHTML = '';
    
    if (inventory.length === 0) {
        sellGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No fish to sell</p>';
        return;
    }
    
    inventory.forEach((fish, index) => {
        const slot = document.createElement('div');
        slot.className = 'sell-slot';
        
        const fishIcon = document.createElement('div');
        fishIcon.className = 'fish-icon';
        fishIcon.textContent = '🐟';
        fishIcon.style.color = getFishColor(fish.type);
        
        const fishName = document.createElement('div');
        fishName.className = 'fish-name';
        fishName.textContent = fish.type;
        
        const fishWeight = document.createElement('div');
        fishWeight.className = 'fish-weight';
        fishWeight.textContent = `${fish.weight} lbs`;
        
        let price = fishPrices[fish.type] * fish.weight;
        
        // Apply sell bonus from equipped trinkets
        const sellBonus = getTrinketBonus('sellBonus');
        if (sellBonus > 0) {
            price = Math.floor(price * (1 + sellBonus));
        }
        
        const priceTag = document.createElement('div');
        priceTag.className = 'sell-price';
        priceTag.textContent = `$${price}`;
        
        slot.appendChild(fishIcon);
        slot.appendChild(fishName);
        slot.appendChild(fishWeight);
        slot.appendChild(priceTag);
        
        slot.addEventListener('click', () => sellFish(index));
        
        sellGrid.appendChild(slot);
    });
}

function sellFish(index) {
    const fish = inventory[index];
    let price = fishPrices[fish.type] * fish.weight;
    
    // Apply sell bonus from equipped trinkets
    const sellBonus = getTrinketBonus('sellBonus');
    if (sellBonus > 0) {
        price = Math.floor(price * (1 + sellBonus));
    }
    
    money += price;
    inventory.splice(index, 1);
    updateShopDisplay();
    updateInventoryDisplay();
    saveGameData();
}

function sellAllFish() {
    let totalEarned = 0;
    inventory.forEach(fish => {
        let price = fishPrices[fish.type] * fish.weight;
        
        // Apply sell bonus from equipped trinkets
        const sellBonus = getTrinketBonus('sellBonus');
        if (sellBonus > 0) {
            price = Math.floor(price * (1 + sellBonus));
        }
        
        totalEarned += price;
    });
    money += totalEarned;
    inventory = [];
    updateShopDisplay();
    updateInventoryDisplay();
    saveGameData();
}

function updateBuyButton() {
    const buyButton = document.getElementById('buy-slot-button');
    const canAfford = money >= inventorySlotPrice;
    const notAtMax = maxInventorySlots < absoluteMaxInventorySlots;
    
    buyButton.disabled = !canAfford || !notAtMax;
    
    if (!notAtMax) {
        buyButton.textContent = 'Max Capacity Reached';
    } else {
        buyButton.textContent = `Buy for $${inventorySlotPrice}`;
    }
    
    // Update sell all button
    const sellAllButton = document.getElementById('sell-all-button');
    sellAllButton.disabled = inventory.length === 0;
    
    // Update fishing rods
    updateRodsDisplay();
    
    // Update bait display
    updateBaitDisplay();
    
    // Update trinket display
    updateTrinketDisplay();
}

function updateRodsDisplay() {
    const rodsContainer = document.getElementById('rods-container');
    rodsContainer.innerHTML = '';
    
    fishingRods.forEach((rod, index) => {
        const rodItem = document.createElement('div');
        rodItem.className = 'shop-item';
        
        const rodInfo = document.createElement('div');
        rodInfo.className = 'shop-item-info';
        
        const rodIcon = document.createElement('div');
        rodIcon.className = 'shop-item-icon';
        rodIcon.textContent = '🎣';
        
        const rodDetails = document.createElement('div');
        const rodName = document.createElement('div');
        rodName.className = 'shop-item-name';
        rodName.textContent = rod.name;
        if (index === currentRodIndex) {
            rodName.textContent += ' (Equipped)';
            rodName.style.color = '#4CAF50';
        }
        
        const rodDesc = document.createElement('div');
        rodDesc.className = 'shop-item-desc';
        rodDesc.textContent = `+${rod.barSizeBonus} bar size`;
        
        rodDetails.appendChild(rodName);
        rodDetails.appendChild(rodDesc);
        
        rodInfo.appendChild(rodIcon);
        rodInfo.appendChild(rodDetails);
        
        rodItem.appendChild(rodInfo);
        
        if (!rod.owned) {
            const buyButton = document.createElement('button');
            buyButton.className = 'buy-button';
            buyButton.textContent = `Buy for $${rod.price}`;
            buyButton.disabled = money < rod.price;
            buyButton.addEventListener('click', () => buyRod(index));
            rodItem.appendChild(buyButton);
        } else if (index !== currentRodIndex) {
            const equipButton = document.createElement('button');
            equipButton.className = 'buy-button';
            equipButton.textContent = 'Equip';
            equipButton.addEventListener('click', () => equipRod(index));
            rodItem.appendChild(equipButton);
        }
        
        rodsContainer.appendChild(rodItem);
    });
}

function buyRod(index) {
    const rod = fishingRods[index];
    if (money >= rod.price && !rod.owned) {
        money -= rod.price;
        rod.owned = true;
        currentRodIndex = index;
        updateShopDisplay();
        saveGameData();
    }
}

function updateBaitDisplay() {
    const baitContainer = document.getElementById('bait-container');
    baitContainer.innerHTML = '';
    
    Object.keys(baitTypes).forEach(baitKey => {
        const bait = baitTypes[baitKey];
        const baitItem = document.createElement('div');
        baitItem.className = 'shop-item';
        
        const baitInfo = document.createElement('div');
        baitInfo.className = 'shop-item-info';
        
        const baitIcon = document.createElement('div');
        baitIcon.className = 'shop-item-icon';
        baitIcon.textContent = '🪱';
        
        const baitDetails = document.createElement('div');
        const baitName = document.createElement('div');
        baitName.className = 'shop-item-name';
        baitName.textContent = bait.name;
        if (baitInventory[baitKey]) {
            baitName.textContent += ` (${baitInventory[baitKey]})`;
        }
        if (currentBait === baitKey) {
            baitName.textContent += ' ✓ Equipped';
            baitName.style.color = '#4CAF50';
        }
        
        const baitDesc = document.createElement('div');
        baitDesc.className = 'shop-item-desc';
        baitDesc.textContent = bait.description;
        
        baitDetails.appendChild(baitName);
        baitDetails.appendChild(baitDesc);
        
        baitInfo.appendChild(baitIcon);
        baitInfo.appendChild(baitDetails);
        
        baitItem.appendChild(baitInfo);
        
        // Buy button
        const buyButton = document.createElement('button');
        buyButton.className = 'buy-button';
        buyButton.textContent = `Buy 5 for $${bait.price}`;
        buyButton.disabled = money < bait.price;
        buyButton.addEventListener('click', () => buyBait(baitKey));
        baitItem.appendChild(buyButton);
        
        baitContainer.appendChild(baitItem);
    });
}

function buyBait(baitKey) {
    const bait = baitTypes[baitKey];
    if (money >= bait.price) {
        money -= bait.price;
        if (!baitInventory[baitKey]) {
            baitInventory[baitKey] = 0;
        }
        baitInventory[baitKey] += 5; // Buy 5 at a time
        updateShopDisplay();
        saveGameData();
    }
}

function equipBait(baitKey) {
    if (baitInventory[baitKey] && baitInventory[baitKey] > 0) {
        currentBait = baitKey;
        updateShopDisplay();
        updateBaitIndicator();
        saveGameData();
    }
}

function unequipBait() {
    currentBait = null;
    updateShopDisplay();
    updateBaitIndicator();
    saveGameData();
}

function updateTrinketDisplay() {
    const trinketContainer = document.getElementById('trinket-container');
    trinketContainer.innerHTML = '';
    
    // Add trinket slot upgrades section
    trinketSlotUpgrades.forEach((upgrade, index) => {
        if (!upgrade.purchased) {
            const upgradeItem = document.createElement('div');
            upgradeItem.className = 'shop-item';
            upgradeItem.style.background = 'rgba(186, 104, 200, 0.1)';
            
            const upgradeInfo = document.createElement('div');
            upgradeInfo.className = 'shop-item-info';
            
            const upgradeIcon = document.createElement('div');
            upgradeIcon.className = 'shop-item-icon';
            upgradeIcon.textContent = '💎';
            
            const upgradeDetails = document.createElement('div');
            const upgradeName = document.createElement('div');
            upgradeName.className = 'shop-item-name';
            upgradeName.textContent = `Trinket Slot Upgrade (${upgrade.slots} slots)`;
            upgradeName.style.color = '#BA68C8';
            upgradeName.style.fontWeight = 'bold';
            
            const upgradeDesc = document.createElement('div');
            upgradeDesc.className = 'shop-item-desc';
            upgradeDesc.textContent = `Equip up to ${upgrade.slots} trinkets at once!`;
            
            upgradeDetails.appendChild(upgradeName);
            upgradeDetails.appendChild(upgradeDesc);
            
            upgradeInfo.appendChild(upgradeIcon);
            upgradeInfo.appendChild(upgradeDetails);
            
            upgradeItem.appendChild(upgradeInfo);
            
            const buyButton = document.createElement('button');
            buyButton.className = 'buy-button';
            buyButton.textContent = `Buy for $${upgrade.price.toLocaleString()}`;
            buyButton.disabled = money < upgrade.price;
            buyButton.addEventListener('click', () => buyTrinketSlot(index));
            upgradeItem.appendChild(buyButton);
            
            trinketContainer.appendChild(upgradeItem);
        }
    });
    
    // Show current equipped trinkets info
    const slotsInfo = document.createElement('div');
    slotsInfo.style.padding = '10px';
    slotsInfo.style.marginBottom = '10px';
    slotsInfo.style.background = 'rgba(186, 104, 200, 0.2)';
    slotsInfo.style.borderRadius = '8px';
    slotsInfo.style.textAlign = 'center';
    slotsInfo.style.fontWeight = 'bold';
    slotsInfo.textContent = `Trinket Slots: ${equippedTrinkets.length}/${maxTrinketSlots}`;
    trinketContainer.appendChild(slotsInfo);
    
    Object.keys(trinketTypes).forEach(trinketKey => {
        const trinket = trinketTypes[trinketKey];
        const isOwned = trinketInventory[trinketKey] || false;
        const isEquipped = equippedTrinkets.includes(trinketKey);
        
        const trinketItem = document.createElement('div');
        trinketItem.className = 'shop-item';
        
        const trinketInfo = document.createElement('div');
        trinketInfo.className = 'shop-item-info';
        
        const trinketIcon = document.createElement('div');
        trinketIcon.className = 'shop-item-icon';
        trinketIcon.textContent = trinket.icon;
        
        const trinketDetails = document.createElement('div');
        const trinketName = document.createElement('div');
        trinketName.className = 'shop-item-name';
        trinketName.textContent = trinket.name;
        if (isEquipped) {
            trinketName.textContent += ' ✓ Equipped';
            trinketName.style.color = '#BA68C8';
        }
        
        const trinketDesc = document.createElement('div');
        trinketDesc.className = 'shop-item-desc';
        trinketDesc.textContent = trinket.description;
        
        trinketDetails.appendChild(trinketName);
        trinketDetails.appendChild(trinketDesc);
        
        trinketInfo.appendChild(trinketIcon);
        trinketInfo.appendChild(trinketDetails);
        
        trinketItem.appendChild(trinketInfo);
        
        if (!isOwned) {
            const buyButton = document.createElement('button');
            buyButton.className = 'buy-button';
            buyButton.textContent = `Buy for $${trinket.price.toLocaleString()}`;
            buyButton.disabled = money < trinket.price;
            buyButton.addEventListener('click', () => buyTrinket(trinketKey));
            trinketItem.appendChild(buyButton);
        }
        
        trinketContainer.appendChild(trinketItem);
    });
}

function buyTrinket(trinketKey) {
    const trinket = trinketTypes[trinketKey];
    if (money >= trinket.price && !trinketInventory[trinketKey]) {
        money -= trinket.price;
        trinketInventory[trinketKey] = true;
        updateShopDisplay();
        saveGameData();
    }
}

function equipTrinket(trinketKey) {
    if (trinketInventory[trinketKey]) {
        // Check if already equipped
        const index = equippedTrinkets.indexOf(trinketKey);
        if (index === -1) {
            // Not equipped, try to equip it
            if (equippedTrinkets.length < maxTrinketSlots) {
                equippedTrinkets.push(trinketKey);
            } else {
                // Replace the first trinket if at max capacity
                equippedTrinkets[0] = trinketKey;
            }
        }
        updateShopDisplay();
        saveGameData();
    }
}

function unequipTrinket(trinketKey) {
    const index = equippedTrinkets.indexOf(trinketKey);
    if (index > -1) {
        equippedTrinkets.splice(index, 1);
    }
    updateShopDisplay();
    saveGameData();
}

function buyTrinketSlot(upgradeIndex) {
    const upgrade = trinketSlotUpgrades[upgradeIndex];
    if (money >= upgrade.price && !upgrade.purchased) {
        money -= upgrade.price;
        upgrade.purchased = true;
        maxTrinketSlots = upgrade.slots;
        updateShopDisplay();
        saveGameData();
    }
}

function equipRod(index) {
    if (fishingRods[index].owned) {
        currentRodIndex = index;
        updateShopDisplay();
        saveGameData();
    }
}

document.getElementById('buy-slot-button').addEventListener('click', () => {
    if (money >= inventorySlotPrice && maxInventorySlots < absoluteMaxInventorySlots) {
        money -= inventorySlotPrice;
        maxInventorySlots++;
        updateShopDisplay();
        updateInventoryDisplay();
        saveGameData();
    }
});

document.getElementById('sell-all-button').addEventListener('click', () => {
    if (inventory.length > 0) {
        sellAllFish();
    }
});

// Animate the scene
function animateScene() {
    if (!minigameActive && currentPage === 'fishing') {
        drawScene();
    } else if (currentPage === 'shop') {
        drawShop();
    }
    requestAnimationFrame(animateScene);
}
animateScene();

// Handle window resize
window.addEventListener('resize', () => {
    sceneCanvas.width = window.innerWidth;
    sceneCanvas.height = window.innerHeight;
    shopCanvas.width = window.innerWidth;
    shopCanvas.height = window.innerHeight;
    if (currentPage === 'fishing') {
        drawScene();
    } else {
        drawShop();
    }
});

// Load saved data when page loads
loadGameData();
updateInventoryDisplay();
updateMoneyDisplay();
drawScene();

// Initialize shop tabs (show sell section by default)
document.getElementById('sell-section').classList.add('active');
document.getElementById('sell-tab').classList.add('active');
