// Canvas setup
const sceneCanvas = document.getElementById('scene-canvas');
const sceneCtx = sceneCanvas.getContext('2d');
const minigameCanvas = document.getElementById('minigame-canvas');
const minigameCtx = minigameCanvas.getContext('2d');
const snowCanvas = document.getElementById('snow-canvas');
const snowCtx = snowCanvas.getContext('2d');
const fishButton = document.getElementById('fish-button');
const statusDiv = document.getElementById('status');

sceneCanvas.width = window.innerWidth;
sceneCanvas.height = window.innerHeight;
minigameCanvas.width = 300;
minigameCanvas.height = 500;
snowCanvas.width = window.innerWidth;
snowCanvas.height = window.innerHeight;

let fishing = false;
let minigameActive = false;

// Fish types with different difficulties
const fishTypes = {
    bluegill: {
        name: 'Bluegill',
        color: '#4682B4',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.005,
        fishRandomness: 0.12,
        fishChangeInterval: 38,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 4,
        minLength: 4,
        maxLength: 16,
        spawnWeight: 65
    },
    sunfish: {
        name: 'Sunfish',
        color: '#FFA500',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.005,
        fishRandomness: 0.12,
        fishChangeInterval: 38,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 6,
        minLength: 3,
        maxLength: 15,
        spawnWeight: 58
    },
    spottedSunfish: {
        name: 'Spotted Sunfish',
        color: '#FF8C00',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.005,
        fishRandomness: 0.13,
        fishChangeInterval: 39,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 6,
        minLength: 3,
        maxLength: 9,
        spawnWeight: 54
    },
    redbreastSunfish: {
        name: 'Redbreast Sunfish',
        color: '#FF6347',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0052,
        fishRandomness: 0.13,
        fishChangeInterval: 39,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 6,
        minLength: 4,
        maxLength: 12,
        spawnWeight: 52
    },
    goldfish: {
        name: 'Goldfish',
        color: '#FFD700',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.005,
        fishRandomness: 0.14,
        fishChangeInterval: 39,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 10,
        minLength: 3,
        maxLength: 19,
        spawnWeight: 10
    },
    chub: {
        name: 'Chub',
        color: '#FF6B35',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0055,
        fishRandomness: 0.15,
        fishChangeInterval: 40,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 12,
        minLength: 8,
        maxLength: 24,
        spawnWeight: 60
    },
    perch: {
        name: 'Perch',
        color: '#FFD700',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.006,
        fishRandomness: 0.18,
        fishChangeInterval: 45,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 5,
        minLength: 6,
        maxLength: 15,
        spawnWeight: 55
    },
    rockBass: {
        name: 'Rock Bass',
        color: '#8B6914',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.006,
        fishRandomness: 0.16,
        fishChangeInterval: 43,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 3,
        minLength: 5,
        maxLength: 13,
        spawnWeight: 52
    },
    trout: {
        name: 'Trout',
        color: '#8B7355',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.007,
        fishRandomness: 0.2,
        fishChangeInterval: 42,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 15,
        maxWeight: 100,
        minLength: 12,
        maxLength: 48,
        spawnWeight: 50
    },
    bullhead: {
        name: 'Bullhead',
        color: '#654321',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0065,
        fishRandomness: 0.19,
        fishChangeInterval: 44,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 8,
        minLength: 6,
        maxLength: 24,
        spawnWeight: 48
    },
    herring: {
        name: 'Herring',
        color: '#C0C0C0',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.007,
        fishRandomness: 0.21,
        fishChangeInterval: 41,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 4,
        minLength: 8,
        maxLength: 18,
        spawnWeight: 46
    },
    asp: {
        name: 'Asp',
        color: '#A8A8A8',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0065,
        fishRandomness: 0.18,
        fishChangeInterval: 42,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 5,
        minLength: 10,
        maxLength: 32,
        spawnWeight: 44
    },
    arcticGrayling: {
        name: 'Arctic Grayling',
        color: '#708090',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0068,
        fishRandomness: 0.19,
        fishChangeInterval: 43,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 9,
        minLength: 8,
        maxLength: 23,
        spawnWeight: 42
    },
    australianGrayling: {
        name: 'Australian Grayling',
        color: '#778899',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0066,
        fishRandomness: 0.18,
        fishChangeInterval: 42,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 5,
        minLength: 8,
        maxLength: 16,
        spawnWeight: 40
    },
    brookTrout: {
        name: 'Brook Trout',
        color: '#8B6914',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0067,
        fishRandomness: 0.19,
        fishChangeInterval: 43,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 6,
        minLength: 6,
        maxLength: 21,
        spawnWeight: 41
    },
    chainPickerel: {
        name: 'Chain Pickerel',
        color: '#556B2F',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0069,
        fishRandomness: 0.20,
        fishChangeInterval: 44,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 8,
        minLength: 12,
        maxLength: 39,
        spawnWeight: 39
    },
    europeanPerch: {
        name: 'European Perch',
        color: '#DAA520',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0067,
        fishRandomness: 0.19,
        fishChangeInterval: 43,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 10,
        minLength: 6,
        maxLength: 24,
        spawnWeight: 40
    },
    giantKokopu: {
        name: 'Giant Kokopu',
        color: '#4A4A4A',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0064,
        fishRandomness: 0.17,
        fishChangeInterval: 41,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 4,
        minLength: 10,
        maxLength: 23,
        spawnWeight: 38
    },
    goldeye: {
        name: 'Goldeye',
        color: '#FFD700',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0066,
        fishRandomness: 0.18,
        fishChangeInterval: 42,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 10,
        minLength: 10,
        maxLength: 20,
        spawnWeight: 39
    },
    goldenMandarinFish: {
        name: 'Golden Mandarin Fish',
        color: '#FFB90F',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0065,
        fishRandomness: 0.18,
        fishChangeInterval: 42,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 10,
        minLength: 12,
        maxLength: 28,
        spawnWeight: 37
    },
    mayanCichlid: {
        name: 'Mayan Cichlid',
        color: '#CD5C5C',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0063,
        fishRandomness: 0.17,
        fishChangeInterval: 41,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 3,
        minLength: 6,
        maxLength: 15,
        spawnWeight: 36
    },
    mooneye: {
        name: 'Mooneye',
        color: '#E0E0E0',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0062,
        fishRandomness: 0.16,
        fishChangeInterval: 40,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 2,
        minLength: 8,
        maxLength: 20,
        spawnWeight: 35
    },
    pinkSalmon: {
        name: 'Pink Salmon',
        color: '#FFB6C1',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0068,
        fishRandomness: 0.19,
        fishChangeInterval: 43,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 12,
        minLength: 16,
        maxLength: 30,
        spawnWeight: 38
    },
    pumpkinseed: {
        name: 'Pumpkinseed',
        color: '#FF8C00',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0061,
        fishRandomness: 0.16,
        fishChangeInterval: 40,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 3,
        minLength: 4,
        maxLength: 16,
        spawnWeight: 45
    },
    redhookMyleus: {
        name: 'Redhook Myleus',
        color: '#CD5555',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0064,
        fishRandomness: 0.17,
        fishChangeInterval: 41,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 5,
        minLength: 10,
        maxLength: 20,
        spawnWeight: 37
    },
    riverBlackfish: {
        name: 'River Blackfish',
        color: '#2F4F4F',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0063,
        fishRandomness: 0.17,
        fishChangeInterval: 41,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 5,
        minLength: 6,
        maxLength: 24,
        spawnWeight: 36
    },
    sauger: {
        name: 'Sauger',
        color: '#B8860B',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0066,
        fishRandomness: 0.18,
        fishChangeInterval: 42,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 5,
        minLength: 10,
        maxLength: 25,
        spawnWeight: 38
    },
    sleepyCod: {
        name: 'Sleepy Cod',
        color: '#8B7355',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0065,
        fishRandomness: 0.18,
        fishChangeInterval: 42,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 10,
        minLength: 8,
        maxLength: 24,
        spawnWeight: 37
    },
    spottedGalaxias: {
        name: 'Spotted Galaxias',
        color: '#696969',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0055,
        fishRandomness: 0.14,
        fishChangeInterval: 38,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 0.01,
        maxWeight: 0.1,
        minLength: 2,
        maxLength: 5,
        spawnWeight: 50
    },
    reeyasShrimp: {
        name: "Reeya's Shrimp",
        color: '#FF69B4',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0056,
        fishRandomness: 0.14,
        fishChangeInterval: 38,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 0.1,
        maxWeight: 1,
        minLength: 2,
        maxLength: 9,
        spawnWeight: 48
    },
    yellowcheek: {
        name: 'Yellowcheek',
        color: '#FFFF00',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0064,
        fishRandomness: 0.17,
        fishChangeInterval: 41,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 10,
        minLength: 8,
        maxLength: 20,
        spawnWeight: 36
    },
    crappie: {
        name: 'Crappie',
        color: '#B8B8B8',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0075,
        fishRandomness: 0.23,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 5,
        minLength: 5,
        maxLength: 19,
        spawnWeight: 42
    },
    warmouth: {
        name: 'Warmouth',
        color: '#8B4513',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0078,
        fishRandomness: 0.24,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 4,
        minLength: 5,
        maxLength: 12,
        spawnWeight: 38
    },
    crucianCarp: {
        name: 'Crucian Carp',
        color: '#CD853F',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0075,
        fishRandomness: 0.22,
        fishChangeInterval: 48,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 5,
        minLength: 6,
        maxLength: 20,
        spawnWeight: 40
    },
    ranchuGoldfish: {
        name: 'Ranchu Goldfish',
        color: '#FF8C00',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.007,
        fishRandomness: 0.23,
        fishChangeInterval: 47,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 4,
        minLength: 5,
        maxLength: 10,
        spawnWeight: 8
    },
    koi: {
        name: 'Koi',
        color: '#FF6347',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0075,
        fishRandomness: 0.24,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 35,
        maxWeight: 100,
        minLength: 24,
        maxLength: 48,
        spawnWeight: 5
    },
    whitefish: {
        name: 'Whitefish',
        color: '#F5F5DC',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.008,
        fishRandomness: 0.24,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 22,
        minLength: 12,
        maxLength: 30,
        spawnWeight: 38
    },
    smallmouthBass: {
        name: 'Smallmouth Bass',
        color: '#8B4726',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.008,
        fishRandomness: 0.26,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 13,
        minLength: 7,
        maxLength: 27,
        spawnWeight: 35
    },
    salmon: {
        name: 'Salmon',
        color: '#FF6B35',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.008,
        fishRandomness: 0.25,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 5,
        maxWeight: 20,
        minLength: 20,
        maxLength: 38,
        spawnWeight: 33
    },
    largemouthBass: {
        name: 'Largemouth Bass',
        color: '#3D5E3D',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0085,
        fishRandomness: 0.27,
        fishChangeInterval: 54,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 23,
        minLength: 10,
        maxLength: 38,
        spawnWeight: 32
    },
    whiteBass: {
        name: 'White Bass',
        color: '#E8E8E8',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0083,
        fishRandomness: 0.26,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 6,
        minLength: 8,
        maxLength: 17,
        spawnWeight: 34
    },
    rainbowTrout: {
        name: 'Rainbow Trout',
        color: '#FF1493',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.009,
        fishRandomness: 0.28,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 50,
        minLength: 12,
        maxLength: 45,
        spawnWeight: 30
    },
    walleye: {
        name: 'Walleye',
        color: '#DAA520',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.01,
        fishRandomness: 0.3,
        fishChangeInterval: 55,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 25,
        minLength: 10,
        maxLength: 42,
        spawnWeight: 28
    },
    anguillidae: {
        name: 'Anguillidae',
        color: '#4A5240',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0105,
        fishRandomness: 0.35,
        fishChangeInterval: 54,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 4,
        maxWeight: 17,
        minLength: 20,
        maxLength: 60,
        spawnWeight: 26
    },
    silverArowana: {
        name: 'Silver Arowana',
        color: '#C0C0C0',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0092,
        fishRandomness: 0.28,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 15,
        minLength: 24,
        maxLength: 48,
        spawnWeight: 27
    },
    asianArowana: {
        name: 'Asian Arowana',
        color: '#FFD700',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0093,
        fishRandomness: 0.29,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 15,
        minLength: 24,
        maxLength: 35,
        spawnWeight: 15
    },
    australianBass: {
        name: 'Australian Bass',
        color: '#4A7C59',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0088,
        fishRandomness: 0.27,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 12,
        minLength: 10,
        maxLength: 25,
        spawnWeight: 29
    },
    basa: {
        name: 'Basa',
        color: '#8B8989',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0086,
        fishRandomness: 0.26,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 6,
        maxWeight: 20,
        minLength: 24,
        maxLength: 47,
        spawnWeight: 30
    },
    biara: {
        name: 'Biara',
        color: '#8B7355',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0089,
        fishRandomness: 0.27,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 25,
        minLength: 18,
        maxLength: 60,
        spawnWeight: 28
    },
    bicuda: {
        name: 'Bicuda',
        color: '#5F9EA0',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.009,
        fishRandomness: 0.28,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 20,
        minLength: 18,
        maxLength: 40,
        spawnWeight: 27
    },
    blackArowana: {
        name: 'Black Arowana',
        color: '#1C1C1C',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0091,
        fishRandomness: 0.28,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 20,
        minLength: 24,
        maxLength: 40,
        spawnWeight: 18
    },
    bowfin: {
        name: 'Bowfin',
        color: '#556B2F',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0094,
        fishRandomness: 0.29,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 22,
        minLength: 16,
        maxLength: 43,
        spawnWeight: 26
    },
    butterflyPeacockBass: {
        name: 'Butterfly Peacock Bass',
        color: '#FFD700',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0095,
        fishRandomness: 0.29,
        fishChangeInterval: 54,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 18,
        minLength: 12,
        maxLength: 30,
        spawnWeight: 24
    },
    clanwilliamYellowfish: {
        name: 'Clanwilliam Yellowfish',
        color: '#FFD700',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0087,
        fishRandomness: 0.27,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 14,
        minLength: 12,
        maxLength: 28,
        spawnWeight: 28
    },
    clownFeatherback: {
        name: 'Clown Featherback',
        color: '#696969',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0088,
        fishRandomness: 0.27,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 20,
        minLength: 20,
        maxLength: 39,
        spawnWeight: 25
    },
    coastalCutthroatTrout: {
        name: 'Coastal Cutthroat Trout',
        color: '#FF8C69',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0089,
        fishRandomness: 0.28,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 12,
        minLength: 10,
        maxLength: 28,
        spawnWeight: 27
    },
    barbel: {
        name: 'Barbel',
        color: '#8B7765',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0088,
        fishRandomness: 0.27,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 25,
        minLength: 16,
        maxLength: 47,
        spawnWeight: 29
    },
    bream: {
        name: 'Bream',
        color: '#C0C0C0',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0085,
        fishRandomness: 0.26,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 14,
        minLength: 8,
        maxLength: 32,
        spawnWeight: 31
    },
    goldenPerch: {
        name: 'Golden Perch',
        color: '#DAA520',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0087,
        fishRandomness: 0.27,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 15,
        minLength: 10,
        maxLength: 30,
        spawnWeight: 28
    },
    gulfSaratoga: {
        name: 'Gulf Saratoga',
        color: '#CD853F',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0091,
        fishRandomness: 0.28,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 20,
        minLength: 24,
        maxLength: 40,
        spawnWeight: 20
    },
    ide: {
        name: 'Ide',
        color: '#FFD700',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0086,
        fishRandomness: 0.26,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 20,
        minLength: 12,
        maxLength: 39,
        spawnWeight: 29
    },
    largemouthYellowfish: {
        name: 'Largemouth Yellowfish',
        color: '#FFD700',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0088,
        fishRandomness: 0.27,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 18,
        minLength: 12,
        maxLength: 35,
        spawnWeight: 27
    },
    longnoseGar: {
        name: 'Longnose Gar',
        color: '#708090',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0093,
        fishRandomness: 0.29,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 30,
        minLength: 24,
        maxLength: 78,
        spawnWeight: 24
    },
    masuSalmon: {
        name: 'Masu Salmon',
        color: '#FF6347',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0089,
        fishRandomness: 0.28,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 20,
        minLength: 18,
        maxLength: 35,
        spawnWeight: 26
    },
    blackBass: {
        name: 'Black Bass',
        color: '#2F4F4F',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0087,
        fishRandomness: 0.27,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 20,
        minLength: 10,
        maxLength: 30,
        spawnWeight: 28
    },
    smallmouthBuffalo: {
        name: 'Smallmouth Buffalo',
        color: '#8B7355',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0088,
        fishRandomness: 0.27,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 25,
        minLength: 18,
        maxLength: 35,
        spawnWeight: 27
    },
    smallmouthYellowfish: {
        name: 'Smallmouth Yellowfish',
        color: '#FFD700',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0085,
        fishRandomness: 0.26,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 12,
        minLength: 10,
        maxLength: 24,
        spawnWeight: 28
    },
    sterlet: {
        name: 'Sterlet',
        color: '#696969',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0092,
        fishRandomness: 0.28,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 22,
        minLength: 24,
        maxLength: 49,
        spawnWeight: 23
    },
    zander: {
        name: 'Zander',
        color: '#556B2F',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0094,
        fishRandomness: 0.29,
        fishChangeInterval: 53,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 30,
        minLength: 16,
        maxLength: 51,
        spawnWeight: 25
    },
    africanArowana: {
        name: 'African Arowana',
        color: '#8B4513',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0118,
        fishRandomness: 0.52,
        fishChangeInterval: 48,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 24,
        minLength: 24,
        maxLength: 40,
        spawnWeight: 12
    },
    africanPike: {
        name: 'African Pike',
        color: '#4A7C59',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0145,
        fishRandomness: 0.68,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 120,
        minLength: 24,
        maxLength: 60,
        spawnWeight: 14
    },
    africanSharptoothCatfish: {
        name: 'African Sharptooth Catfish',
        color: '#696969',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0142,
        fishRandomness: 0.65,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 93,
        minLength: 20,
        maxLength: 66,
        spawnWeight: 13
    },
    amurCatfish: {
        name: 'Amur Catfish',
        color: '#8B7355',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0128,
        fishRandomness: 0.56,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 48,
        minLength: 24,
        maxLength: 48,
        spawnWeight: 16
    },
    amurPike: {
        name: 'Amur Pike',
        color: '#556B2F',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0122,
        fishRandomness: 0.54,
        fishChangeInterval: 48,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 5,
        maxWeight: 28,
        minLength: 24,
        maxLength: 54,
        spawnWeight: 18
    },
    amurSturgeon: {
        name: 'Amur Sturgeon',
        color: '#2F4F4F',
        difficulty: 'Hard',
        barSize: 45,
        fishSpeed: 0.028,
        fishRandomness: 1.5,
        fishChangeInterval: 40,
        progressGainRate: 0.12,
        progressDecayRate: 0.6,
        minWeight: 20,
        maxWeight: 430,
        minLength: 72,
        maxLength: 144,
        spawnWeight: 4
    },
    atlanticSturgeon: {
        name: 'Atlantic Sturgeon',
        color: '#36454F',
        difficulty: 'Hard',
        barSize: 40,
        fishSpeed: 0.032,
        fishRandomness: 1.8,
        fishChangeInterval: 38,
        progressGainRate: 0.1,
        progressDecayRate: 0.7,
        minWeight: 50,
        maxWeight: 820,
        minLength: 84,
        maxLength: 180,
        spawnWeight: 2
    },
    barramundi: {
        name: 'Barramundi',
        color: '#C0C0C0',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0148,
        fishRandomness: 0.70,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 130,
        minLength: 24,
        maxLength: 78,
        spawnWeight: 11
    },
    barredSorubim: {
        name: 'Barred Sorubim',
        color: '#8B7355',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0146,
        fishRandomness: 0.69,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 12,
        maxWeight: 110,
        minLength: 30,
        maxLength: 60,
        spawnWeight: 10
    },
    bayad: {
        name: 'Bayad',
        color: '#696969',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0135,
        fishRandomness: 0.61,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 55,
        minLength: 24,
        maxLength: 52,
        spawnWeight: 14
    },
    blueTigerfish: {
        name: 'Blue Tigerfish',
        color: '#4682B4',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0125,
        fishRandomness: 0.55,
        fishChangeInterval: 48,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 33,
        minLength: 16,
        maxLength: 39,
        spawnWeight: 16
    },
    boal: {
        name: 'Boal',
        color: '#8B8989',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0147,
        fishRandomness: 0.70,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 130,
        minLength: 24,
        maxLength: 72,
        spawnWeight: 11
    },
    bullseyeSnakehead: {
        name: 'Bullseye Snakehead',
        color: '#4A4A4A',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0141,
        fishRandomness: 0.64,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 70,
        minLength: 20,
        maxLength: 45,
        spawnWeight: 12
    },
    burbot: {
        name: 'Burbot',
        color: '#8B7765',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0127,
        fishRandomness: 0.56,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 40,
        minLength: 16,
        maxLength: 48,
        spawnWeight: 17
    },
    coloradoPikeminnow: {
        name: 'Colorado Pikeminnow',
        color: '#8B8878',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0132,
        fishRandomness: 0.59,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 4,
        maxWeight: 40,
        minLength: 24,
        maxLength: 72,
        spawnWeight: 16
    },
    cod: {
        name: 'Cod',
        color: '#8B8B7A',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0139,
        fishRandomness: 0.63,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 70,
        minLength: 24,
        maxLength: 72,
        spawnWeight: 13
    },
    giantBarb: {
        name: 'Giant Barb',
        color: '#CD853F',
        difficulty: 'Hard',
        barSize: 45,
        fishSpeed: 0.027,
        fishRandomness: 1.4,
        fishChangeInterval: 46,
        progressGainRate: 0.12,
        progressDecayRate: 0.6,
        minWeight: 25,
        maxWeight: 300,
        minLength: 60,
        maxLength: 120,
        spawnWeight: 5
    },
    giantPangasius: {
        name: 'Giant Pangasius',
        color: '#696969',
        difficulty: 'Hard',
        barSize: 40,
        fishSpeed: 0.033,
        fishRandomness: 1.9,
        fishChangeInterval: 36,
        progressGainRate: 0.1,
        progressDecayRate: 0.7,
        minWeight: 90,
        maxWeight: 650,
        minLength: 84,
        maxLength: 120,
        spawnWeight: 1
    },
    giantRiverCatfish: {
        name: 'Giant River-Catfish',
        color: '#4A4A4A',
        difficulty: 'Hard',
        barSize: 40,
        fishSpeed: 0.033,
        fishRandomness: 1.9,
        fishChangeInterval: 36,
        progressGainRate: 0.1,
        progressDecayRate: 0.7,
        minWeight: 90,
        maxWeight: 650,
        minLength: 72,
        maxLength: 120,
        spawnWeight: 1
    },
    goldenDorado: {
        name: 'Golden Dorado',
        color: '#FFD700',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0137,
        fishRandomness: 0.62,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 60,
        minLength: 24,
        maxLength: 42,
        spawnWeight: 14
    },
    goldenMahseer: {
        name: 'Golden Mahseer',
        color: '#DAA520',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0143,
        fishRandomness: 0.66,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 80,
        minLength: 24,
        maxLength: 108,
        spawnWeight: 12
    },
    goliathTigerfish: {
        name: 'Goliath Tigerfish',
        color: '#B22222',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0175,
        fishRandomness: 0.88,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 25,
        maxWeight: 125,
        minLength: 48,
        maxLength: 72,
        spawnWeight: 7
    },
    guabine: {
        name: 'Guabine',
        color: '#8B7355',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0131,
        fishRandomness: 0.58,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 40,
        minLength: 18,
        maxLength: 39,
        spawnWeight: 16
    },
    huchen: {
        name: 'Huchen',
        color: '#CD5C5C',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0140,
        fishRandomness: 0.64,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 70,
        minLength: 30,
        maxLength: 72,
        spawnWeight: 13
    },
    humpbackMahseer: {
        name: 'Humpback Mahseer',
        color: '#B8860B',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0133,
        fishRandomness: 0.60,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 4,
        maxWeight: 50,
        minLength: 18,
        maxLength: 60,
        spawnWeight: 15
    },
    iridescentShark: {
        name: 'Iridescent Shark',
        color: '#9370DB',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0134,
        fishRandomness: 0.60,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 4,
        maxWeight: 50,
        minLength: 30,
        maxLength: 51,
        spawnWeight: 15
    },
    kaluga: {
        name: 'Kaluga',
        color: '#2F4F4F',
        difficulty: 'Hard',
        barSize: 45,
        fishSpeed: 0.026,
        fishRandomness: 1.35,
        fishChangeInterval: 48,
        progressGainRate: 0.12,
        progressDecayRate: 0.6,
        minWeight: 30,
        maxWeight: 300,
        minLength: 72,
        maxLength: 216,
        spawnWeight: 5
    },
    kampango: {
        name: 'Kampango',
        color: '#696969',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0124,
        fishRandomness: 0.55,
        fishChangeInterval: 48,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 30,
        minLength: 18,
        maxLength: 66,
        spawnWeight: 17
    },
    murrayCod: {
        name: 'Murray Cod',
        color: '#8B7355',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0149,
        fishRandomness: 0.71,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 12,
        maxWeight: 120,
        minLength: 30,
        maxLength: 72,
        spawnWeight: 10
    },
    vampireFish: {
        name: 'Vampire Fish',
        color: '#8B0000',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0130,
        fishRandomness: 0.58,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 40,
        minLength: 16,
        maxLength: 47,
        spawnWeight: 16
    },
    paddlefish: {
        name: 'Paddlefish',
        color: '#708090',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0162,
        fishRandomness: 0.78,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 200,
        minLength: 36,
        maxLength: 87,
        spawnWeight: 8
    },
    piranha: {
        name: 'Piranha',
        color: '#DC143C',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0129,
        fishRandomness: 0.57,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 50,
        minLength: 6,
        maxLength: 20,
        spawnWeight: 15
    },
    rita: {
        name: 'Rita',
        color: '#8B8B7A',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0130,
        fishRandomness: 0.58,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 40,
        minLength: 18,
        maxLength: 60,
        spawnWeight: 16
    },
    royalPeacockBass: {
        name: 'Royal Peacock Bass',
        color: '#FFD700',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0133,
        fishRandomness: 0.60,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 4,
        maxWeight: 40,
        minLength: 18,
        maxLength: 36,
        spawnWeight: 15
    },
    vundu: {
        name: 'Vundu',
        color: '#696969',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0168,
        fishRandomness: 0.82,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 25,
        maxWeight: 150,
        minLength: 48,
        maxLength: 66,
        spawnWeight: 9
    },
    wolfFish: {
        name: 'Wolf Fish',
        color: '#4A4A4A',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0144,
        fishRandomness: 0.67,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 15,
        maxWeight: 88,
        minLength: 36,
        maxLength: 60,
        spawnWeight: 11
    },
    arapaima: {
        name: 'Arapaima',
        color: '#8B4513',
        difficulty: 'Hard',
        barSize: 45,
        fishSpeed: 0.030,
        fishRandomness: 1.6,
        fishChangeInterval: 42,
        progressGainRate: 0.12,
        progressDecayRate: 0.6,
        minWeight: 80,
        maxWeight: 440,
        minLength: 72,
        maxLength: 180,
        spawnWeight: 2
    },
    cherrySalmon: {
        name: 'Cherry Salmon',
        color: '#DC143C',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.01265,
        fishRandomness: 0.575,
        fishChangeInterval: 49,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 20,
        minLength: 18,
        maxLength: 28,
        spawnWeight: 22
    },
    catfish: {
        name: 'Catfish',
        color: '#696969',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0138,
        fishRandomness: 0.69,
        fishChangeInterval: 50,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 130,
        minLength: 12,
        maxLength: 60,
        spawnWeight: 20
    },
    cohoSalmon: {
        name: 'Coho Salmon',
        color: '#FF4500',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.01495,
        fishRandomness: 0.7475,
        fishChangeInterval: 52,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 5,
        maxWeight: 36,
        minLength: 24,
        maxLength: 38,
        spawnWeight: 18
    },
    carp: {
        name: 'Carp',
        color: '#8B4513',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0161,
        fishRandomness: 0.805,
        fishChangeInterval: 51,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 120,
        minLength: 12,
        maxLength: 48,
        spawnWeight: 16
    },
    pike: {
        name: 'Pike',
        color: '#228B22',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.01725,
        fishRandomness: 0.92,
        fishChangeInterval: 54,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 55,
        minLength: 16,
        maxLength: 62,
        spawnWeight: 14
    },
    gar: {
        name: 'Gar',
        color: '#556B2F',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.01955,
        fishRandomness: 1.035,
        fishChangeInterval: 55,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 55,
        minLength: 24,
        maxLength: 72,
        spawnWeight: 12
    },
    spottedGar: {
        name: 'Spotted Gar',
        color: '#6B8E23',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0195,
        fishRandomness: 1.02,
        fishChangeInterval: 55,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 15,
        minLength: 18,
        maxLength: 44,
        spawnWeight: 10
    },
    shortnoseGar: {
        name: 'Shortnose Gar',
        color: '#556B2F',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.019,
        fishRandomness: 0.98,
        fishChangeInterval: 54,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 1,
        maxWeight: 8,
        minLength: 15,
        maxLength: 34,
        spawnWeight: 12
    },
    floridaGar: {
        name: 'Florida Gar',
        color: '#8B7355',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0192,
        fishRandomness: 1.01,
        fishChangeInterval: 54,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 2,
        maxWeight: 10,
        minLength: 20,
        maxLength: 52,
        spawnWeight: 11
    },
    alligatorGar: {
        name: 'Alligator Gar',
        color: '#4B5320',
        difficulty: 'Hard',
        barSize: 45,
        fishSpeed: 0.028,
        fishRandomness: 1.5,
        fishChangeInterval: 44,
        progressGainRate: 0.12,
        progressDecayRate: 0.6,
        minWeight: 80,
        maxWeight: 350,
        minLength: 48,
        maxLength: 120,
        spawnWeight: 3
    },
    kingSalmon: {
        name: 'King Salmon',
        color: '#B22222',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.0207,
        fishRandomness: 1.15,
        fishChangeInterval: 56,
        progressGainRate: 0.3,
        progressDecayRate: 0.3,
        minWeight: 10,
        maxWeight: 126,
        minLength: 24,
        maxLength: 60,
        spawnWeight: 10
    },
    sturgeon: {
        name: 'Sturgeon',
        color: '#2F4F4F',
        difficulty: 'Hard',
        barSize: 35,
        fishSpeed: 0.035,
        fishRandomness: 2.0,
        fishChangeInterval: 35,
        progressGainRate: 0.08,
        progressDecayRate: 0.8,
        minWeight: 5,
        maxWeight: 1800,
        minLength: 36,
        maxLength: 168,
        spawnWeight: 8
    },
    muskellunge: {
        name: 'Muskellunge',
        color: '#2F4F2F',
        difficulty: 'Hard',
        barSize: 50,
        fishSpeed: 0.025,
        fishRandomness: 1.2,
        fishChangeInterval: 50,
        progressGainRate: 0.15,
        progressDecayRate: 0.55,
        minWeight: 10,
        maxWeight: 67,
        minLength: 28,
        maxLength: 72,
        spawnWeight: 5
    }
};

// Ocean fish types - only available at ocean location
const oceanFishTypes = {
    // Tiny fish (under 0.1 lbs) - Easy
    caveTransparentGoby: { name: 'Cave Transparent Goby', color: '#E0E0E0', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0055, fishRandomness: 0.14, fishChangeInterval: 38, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.005, maxWeight: 0.02, minLength: 0.5, maxLength: 1.2, spawnWeight: 50 },
    neonGoby: { name: 'Neon Goby', color: '#00BFFF', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0056, fishRandomness: 0.14, fishChangeInterval: 38, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.005, maxWeight: 0.02, minLength: 0.8, maxLength: 2, spawnWeight: 50 },
    redheadGoby: { name: 'Redhead Goby', color: '#CD5C5C', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0056, fishRandomness: 0.14, fishChangeInterval: 38, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.005, maxWeight: 0.02, minLength: 0.8, maxLength: 2, spawnWeight: 48 },
    anemoneShrimp: { name: 'Anemone Shrimp', color: '#FF6B6B', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0057, fishRandomness: 0.14, fishChangeInterval: 38, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.001, maxWeight: 0.015, minLength: 0.5, maxLength: 1.5, spawnWeight: 48 },
    glassShrimp: { name: 'Glass Shrimp', color: '#F0F8FF', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0057, fishRandomness: 0.14, fishChangeInterval: 38, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.001, maxWeight: 0.015, minLength: 0.5, maxLength: 1.5, spawnWeight: 46 },
    sexyShrimp: { name: 'Sexy Shrimp', color: '#FF69B4', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0058, fishRandomness: 0.14, fishChangeInterval: 38, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.002, maxWeight: 0.003, minLength: 0.4, maxLength: 0.6, spawnWeight: 45 },
    bumbleBeeShrimp: { name: 'Bumble Bee Shrimp', color: '#FFD700', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0057, fishRandomness: 0.14, fishChangeInterval: 38, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.005, maxWeight: 0.007, minLength: 0.5, maxLength: 0.8, spawnWeight: 44 },
    commonJellyfish: { name: 'Common Jellyfish', color: '#E6E6FA', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0058, fishRandomness: 0.15, fishChangeInterval: 39, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.001, maxWeight: 1, minLength: 4, maxLength: 16, spawnWeight: 42 },
    duskyJawfish: { name: 'Dusky Jawfish', color: '#8B7D6B', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0056, fishRandomness: 0.14, fishChangeInterval: 38, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.001, maxWeight: 0.004, minLength: 1, maxLength: 3, spawnWeight: 40 },
    
    // Small fish (0.01 - 0.5 lbs) - Easy
    blackClownGoby: { name: 'Black Clown Goby', color: '#2F4F4F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.006, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 1, maxLength: 1.5, spawnWeight: 48 },
    catalinaGoby: { name: 'Catalina Goby', color: '#FF6347', difficulty: 'Easy', barSize: 80, fishSpeed: 0.006, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 1, maxLength: 2, spawnWeight: 46 },
    citronClownGoby: { name: 'Citron Clown Goby', color: '#FFD700', difficulty: 'Easy', barSize: 80, fishSpeed: 0.006, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 1, maxLength: 1.5, spawnWeight: 46 },
    courtJesterGoby: { name: 'Court Jester Goby', color: '#FF8C00', difficulty: 'Easy', barSize: 80, fishSpeed: 0.006, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 1, maxLength: 1.5, spawnWeight: 44 },
    yashaGoby: { name: 'Yasha Goby', color: '#F0E68C', difficulty: 'Easy', barSize: 80, fishSpeed: 0.006, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 1, maxLength: 2, spawnWeight: 42 },
    flamingPrawnGoby: { name: 'Flaming Prawn Goby', color: '#FF4500', difficulty: 'Easy', barSize: 80, fishSpeed: 0.006, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 1.5, maxLength: 3, spawnWeight: 40 },
    bandedPipefish: { name: 'Banded Pipefish', color: '#8B4513', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0061, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 4, maxLength: 7, spawnWeight: 38 },
    dragonfacePipefish: { name: 'Dragonface Pipefish', color: '#CD853F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0061, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 3, maxLength: 6, spawnWeight: 38 },
    bluelinedDottyback: { name: 'Bluelined Dottyback', color: '#4169E1', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 2, maxLength: 3, spawnWeight: 36 },
    cherryDottyback: { name: 'Cherry Dottyback', color: '#DC143C', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 2, maxLength: 2.5, spawnWeight: 36 },
    redDottyback: { name: 'Red Dottyback', color: '#FF0000', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 0.04, minLength: 2, maxLength: 3, spawnWeight: 34 },
    greatSeahorse: { name: 'Great Seahorse', color: '#DAA520', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0058, fishRandomness: 0.15, fishChangeInterval: 39, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.02, maxWeight: 0.06, minLength: 6, maxLength: 12, spawnWeight: 40 },
    thornySeahorse: { name: 'Thorny Seahorse', color: '#CD853F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0058, fishRandomness: 0.15, fishChangeInterval: 39, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.02, maxWeight: 0.06, minLength: 6, maxLength: 11, spawnWeight: 38 },
    yellowheadJawfish: { name: 'Yellowhead Jawfish', color: '#FFD700', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0059, fishRandomness: 0.15, fishChangeInterval: 39, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.001, maxWeight: 0.04, minLength: 3, maxLength: 5, spawnWeight: 38 },
    
    // 0.05-0.5 lb fish - Easy
    spinyheadBlenny: { name: 'Spinyhead Blenny', color: '#8B7D6B', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0061, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.3, minLength: 3, maxLength: 5, spawnWeight: 46 },
    bicolorBlenny: { name: 'Bicolor Blenny', color: '#4682B4', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0061, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 4, spawnWeight: 46 },
    canaryFangBlenny: { name: 'Canary Fang Blenny', color: '#FFD700', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0061, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 5, spawnWeight: 44 },
    diamondBlenny: { name: 'Diamond Blenny', color: '#B0E0E6', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0061, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2.5, maxLength: 4, spawnWeight: 44 },
    emberBlenny: { name: 'Ember Blenny', color: '#FF4500', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0061, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 42 },
    harptailBlenny: { name: 'Harptail Blenny', color: '#8B8B83', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0061, fishRandomness: 0.16, fishChangeInterval: 40, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 4, spawnWeight: 42 },
    bartlettsAnthias: { name: "Bartlett's Anthias", color: '#FF1493', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.5, minLength: 3, maxLength: 4, spawnWeight: 44 },
    bicolorAnthias: { name: 'Bicolor Anthias', color: '#FF69B4', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.5, minLength: 4, maxLength: 6, spawnWeight: 44 },
    coopersAnthias: { name: "Cooper's Anthias", color: '#FF6347', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.5, minLength: 3, maxLength: 5, spawnWeight: 42 },
    redbarAnthias: { name: 'Redbar Anthias', color: '#DC143C', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.5, minLength: 3, maxLength: 5, spawnWeight: 42 },
    squarebackAnthias: { name: 'Squareback Anthias', color: '#FF8C69', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.5, minLength: 3, maxLength: 4, spawnWeight: 40 },
    stockyAnthias: { name: 'Stocky Anthias', color: '#CD5C5C', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.5, minLength: 3, maxLength: 5, spawnWeight: 40 },
    threadfinAnthias: { name: 'Threadfin Anthias', color: '#FF6B6B', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.5, minLength: 3, maxLength: 5, spawnWeight: 38 },
    blackcapGramma: { name: 'Blackcap Gramma', color: '#4B0082', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.4, minLength: 3, maxLength: 4, spawnWeight: 40 },
    blueAssessor: { name: 'Blue Assessor', color: '#0000FF', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.4, minLength: 2, maxLength: 3, spawnWeight: 40 },
    royalGramma: { name: 'Royal Gramma', color: '#9400D3', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.4, minLength: 2, maxLength: 3, spawnWeight: 38 },
    yellowAssessor: { name: 'Yellow Assessor', color: '#FFD700', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.4, minLength: 2, maxLength: 3, spawnWeight: 38 },
    lawnmowerBlenny: { name: 'Lawnmower Blenny', color: '#8B7355', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.4, minLength: 4, maxLength: 5, spawnWeight: 42 },
    midasBlenny: { name: 'Midas Blenny', color: '#DAA520', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.4, minLength: 3, maxLength: 5, spawnWeight: 40 },
    starryBlenny: { name: 'Starry Blenny', color: '#4682B4', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.4, minLength: 4, maxLength: 6, spawnWeight: 40 },
    engineerGoby: { name: 'Engineer Goby', color: '#708090', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 42, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.4, minLength: 8, maxLength: 12, spawnWeight: 38 },
    glassEyeSquirrelfish: { name: 'Glass Eye Squirrelfish', color: '#FF6347', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0066, fishRandomness: 0.18, fishChangeInterval: 42, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.1, maxWeight: 0.4, minLength: 6, maxLength: 10, spawnWeight: 36 },
    fireFish: { name: 'Fire Fish', color: '#FF4500', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.1, minLength: 3, maxLength: 4, spawnWeight: 42 },
    purpleFireFish: { name: 'Purple Fire Fish', color: '#9370DB', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.1, minLength: 3, maxLength: 4, spawnWeight: 40 },
    scissortailDartfish: { name: 'Scissortail Dartfish', color: '#F0E68C', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.1, minLength: 3, maxLength: 5, spawnWeight: 40 },
    starryDragonet: { name: 'Starry Dragonet', color: '#4682B4', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.1, minLength: 2, maxLength: 3, spawnWeight: 38 },
    spottedMandarin: { name: 'Spotted Mandarin', color: '#FF8C00', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.1, minLength: 2, maxLength: 3, spawnWeight: 36 },
    decoyScorpionfish: { name: 'Decoy Scorpionfish', color: '#8B4513', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 42, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.12, minLength: 4, maxLength: 6, spawnWeight: 36 },
    leafScorpionfish: { name: 'Leaf Scorpionfish', color: '#556B2F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 42, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 5, maxLength: 10, spawnWeight: 34 },
    seaGoblin: { name: 'Sea Goblin', color: '#696969', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 42, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 6, maxLength: 10, spawnWeight: 34 },
    blackstripeCardinalfish: { name: 'Blackstripe Cardinalfish', color: '#2F4F4F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.15, minLength: 3, maxLength: 4, spawnWeight: 44 },
    bluestreakCardinalfish: { name: 'Bluestreak Cardinalfish', color: '#1E90FF', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 42 },
    flamefish: { name: 'Flamefish', color: '#FF4500', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.15, minLength: 3, maxLength: 4, spawnWeight: 42 },
    frostfinCardinalfish: { name: 'Frostfin Cardinalfish', color: '#B0E0E6', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 40 },
    pajamaCardinalfish: { name: 'Pajama Cardinalfish', color: '#FFD700', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 40 },
    ringtailedCardinalfish: { name: 'Ringtailed Cardinalfish', color: '#CD853F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0062, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 4, spawnWeight: 38 },
    blueChromis: { name: 'Blue Chromis', color: '#1E90FF', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 5, spawnWeight: 46 },
    barrierReefChromis: { name: 'Barrier Reef Chromis', color: '#4682B4', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 4, spawnWeight: 44 },
    damselfish: { name: 'Damselfish', color: '#FFD700', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 5, spawnWeight: 46 },
    halfAndHalfChromis: { name: 'Half-and-Half Chromis', color: '#F0E68C', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 4, spawnWeight: 42 },
    yellowspottedChromis: { name: 'Yellowspotted Chromis', color: '#FFD700', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 4, spawnWeight: 42 },
    cinnamonAnemonefish: { name: 'Cinnamon Anemonefish', color: '#D2691E', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 4.5, spawnWeight: 40 },
    pinkSkunkAnemonefish: { name: 'Pink Skunk Anemonefish', color: '#FFC0CB', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 4, spawnWeight: 40 },
    tomatoClownfish: { name: 'Tomato Clownfish', color: '#FF6347', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 5, spawnWeight: 38 },
    azureDamselfish: { name: 'Azure Damselfish', color: '#007FFF', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 44 },
    blueAndGoldDamselfish: { name: 'Blue-and-Gold Damselfish', color: '#4169E1', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 42 },
    blueVelvetDamselfish: { name: 'Blue Velvet Damselfish', color: '#000080', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 40 },
    cloudyDamselfish: { name: 'Cloudy Damselfish', color: '#B0C4DE', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 4, spawnWeight: 40 },
    dominoDamselfish: { name: 'Domino Damselfish', color: '#2F4F4F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 3, maxLength: 5, spawnWeight: 38 },
    jewelDamselfish: { name: 'Jewel Damselfish', color: '#4169E1', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 38 },
    lemonDamselfish: { name: 'Lemon Damselfish', color: '#FFFF00', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 36 },
    longfinGregory: { name: 'Longfin Gregory', color: '#F0E68C', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 4, spawnWeight: 36 },
    neonDamselfish: { name: 'Neon Damselfish', color: '#00BFFF', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 34 },
    starksDamselfish: { name: "Stark's Damselfish", color: '#4682B4', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 4, spawnWeight: 34 },
    tuxedoDamselfish: { name: 'Tuxedo Damselfish', color: '#2F4F4F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0063, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.2, minLength: 2, maxLength: 3, spawnWeight: 32 },
    blackHamlet: { name: 'Black Hamlet', color: '#2F4F4F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 3, maxLength: 5, spawnWeight: 40 },
    blueHamlet: { name: 'Blue Hamlet', color: '#1E90FF', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 3, maxLength: 5, spawnWeight: 38 },
    goldenHamlet: { name: 'Golden Hamlet', color: '#FFD700', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 3, maxLength: 5, spawnWeight: 36 },
    indigoHamlet: { name: 'Indigo Hamlet', color: '#4B0082', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 3, maxLength: 5, spawnWeight: 36 },
    butterHamlet: { name: 'Butter Hamlet', color: '#F0E68C', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 3, maxLength: 5, spawnWeight: 34 },
    shyHamlet: { name: 'Shy Hamlet', color: '#CD853F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0064, fishRandomness: 0.17, fishChangeInterval: 41, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 3, maxLength: 5, spawnWeight: 34 },
    coralHawkfish: { name: 'Coral Hawkfish', color: '#FF6347', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 42, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 3, maxLength: 4, spawnWeight: 36 },
    flameHawkfish: { name: 'Flame Hawkfish', color: '#FF4500', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 42, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 3, maxLength: 4, spawnWeight: 34 },
    goldenHawkfish: { name: 'Golden Hawkfish', color: '#DAA520', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 42, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 3, maxLength: 4, spawnWeight: 32 },
    yellowCucumber: { name: 'Yellow Cucumber', color: '#FFFF00', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0057, fishRandomness: 0.14, fishChangeInterval: 38, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.05, maxWeight: 0.25, minLength: 6, maxLength: 12, spawnWeight: 42 },
    hermitCrab: { name: 'Hermit Crab', color: '#CD853F', difficulty: 'Easy', barSize: 80, fishSpeed: 0.0058, fishRandomness: 0.15, fishChangeInterval: 39, progressGainRate: 0.3, progressDecayRate: 0.3, minWeight: 0.01, maxWeight: 1, minLength: 2, maxLength: 4, spawnWeight: 44 },
    
    // Medium fish (0.5-5 lbs) - Average difficulty
    atlanticSpadefish: { name: 'Atlantic Spadefish', color: '#C0C0C0', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 10, maxLength: 20, spawnWeight: 36 },
    grayAngelfish: { name: 'Gray Angelfish', color: '#808080', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 12, maxLength: 24, spawnWeight: 36 },
    yellowEdgedLyretail: { name: 'Yellow-Edged Lyretail', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 4, maxLength: 6, spawnWeight: 34 },
    bicolorAngelfish: { name: 'Bicolor Angelfish', color: '#4169E1', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 5, maxLength: 6, spawnWeight: 34 },
    blueAngelfish: { name: 'Blue Angelfish', color: '#0000FF', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 12, maxLength: 15, spawnWeight: 32 },
    cherubfish: { name: 'Cherubfish', color: '#FF69B4', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 1, minLength: 2, maxLength: 3, spawnWeight: 32 },
    coralBeauty: { name: 'Coral Beauty', color: '#FF6B6B', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 1, minLength: 3, maxLength: 4, spawnWeight: 30 },
    flameAngelfish: { name: 'Flame Angelfish', color: '#FF4500', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 1, minLength: 3, maxLength: 4, spawnWeight: 28 },
    frenchAngelfish: { name: 'French Angelfish', color: '#2F4F4F', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 12, maxLength: 15, spawnWeight: 30 },
    goldflakeAngelfish: { name: 'Goldflake Angelfish', color: '#DAA520', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 5, maxLength: 8, spawnWeight: 28 },
    heraldAngelfish: { name: 'Herald Angelfish', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 1, minLength: 4, maxLength: 5, spawnWeight: 28 },
    lemonpeelAngelfish: { name: 'Lemonpeel Angelfish', color: '#FFFF00', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 1, minLength: 4, maxLength: 5.5, spawnWeight: 26 },
    multicolorAngelfish: { name: 'Multicolor Angelfish', color: '#FF8C00', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 1, minLength: 3, maxLength: 3.5, spawnWeight: 26 },
    pearlScaleAngelfish: { name: 'Pearlscale Angelfish', color: '#F0E68C', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 5, maxLength: 6, spawnWeight: 24 },
    potterAngelfish: { name: "Potter's Angelfish", color: '#FF6347', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 1, minLength: 3, maxLength: 4, spawnWeight: 24 },
    queenAngelfish: { name: 'Queen Angelfish', color: '#4169E1', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3.5, minLength: 14, maxLength: 18, spawnWeight: 28 },
    raspyAngelfish: { name: 'Raspy Angelfish', color: '#CD853F', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 5, maxLength: 7, spawnWeight: 26 },
    regaliAngelfish: { name: 'Regal Angelfish', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 6, maxLength: 10, spawnWeight: 22 },
    rockBeautyAngelfish: { name: 'Rock Beauty Angelfish', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 8, maxLength: 14, spawnWeight: 26 },
    rustyAngelfish: { name: 'Rusty Angelfish', color: '#CD5C5C', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 1, minLength: 3, maxLength: 4.5, spawnWeight: 24 },
    scribbledAngelfish: { name: 'Scribbled Angelfish', color: '#4682B4', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 10, maxLength: 14, spawnWeight: 24 },
    sixbarAngelfish: { name: 'Sixbar Angelfish', color: '#F0E68C', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 16, maxLength: 20, spawnWeight: 22 },
    threeSpotAngelfish: { name: 'Three Spot Angelfish', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 8, maxLength: 10, spawnWeight: 22 },
    tibicenAngelfish: { name: 'Tibicen Angelfish', color: '#4682B4', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 6, maxLength: 8, spawnWeight: 20 },
    yellowfinAngelfish: { name: 'Yellowfin Angelfish', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 5, maxLength: 6, spawnWeight: 20 },
    blackfootedLionfish: { name: 'Blackfooted Lionfish', color: '#8B4513', difficulty: 'Average', barSize: 70, fishSpeed: 0.0068, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 8, maxLength: 10, spawnWeight: 24 },
    redLionfish: { name: 'Red Lionfish', color: '#DC143C', difficulty: 'Average', barSize: 70, fishSpeed: 0.0069, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 12, maxLength: 15, spawnWeight: 24 },
    russellsLionfish: { name: "Russell's Lionfish", color: '#CD853F', difficulty: 'Average', barSize: 70, fishSpeed: 0.0069, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2.5, minLength: 10, maxLength: 12, spawnWeight: 22 },
    turkeyfish: { name: 'Turkeyfish', color: '#8B4513', difficulty: 'Average', barSize: 70, fishSpeed: 0.0068, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 10, maxLength: 12, spawnWeight: 22 },
    goldrimmedSurgeonfish: { name: 'Goldrimmed Surgeonfish', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 12, maxLength: 16, spawnWeight: 28 },
    orangeshoulderSurgeonfish: { name: 'Orangeshoulder Surgeonfish', color: '#FF8C00', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 10, maxLength: 14, spawnWeight: 26 },
    powderBlueTang: { name: 'Powder Blue Tang', color: '#B0E0E6', difficulty: 'Average', barSize: 70, fishSpeed: 0.0074, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 8, maxLength: 9, spawnWeight: 24 },
    regalTang: { name: 'Regal Tang', color: '#4169E1', difficulty: 'Average', barSize: 70, fishSpeed: 0.0074, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 10, maxLength: 12, spawnWeight: 26 },
    sailfinTang: { name: 'Sailfin Tang', color: '#4682B4', difficulty: 'Average', barSize: 70, fishSpeed: 0.0074, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 12, maxLength: 16, spawnWeight: 26 },
    yellowTang: { name: 'Yellow Tang', color: '#FFFF00', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 2, minLength: 7, maxLength: 8, spawnWeight: 28 },
    zebrasomaTang: { name: 'Zebrasoma Tang', color: '#F0E68C', difficulty: 'Average', barSize: 70, fishSpeed: 0.0074, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 8, maxLength: 10, spawnWeight: 24 },
    goldSpottedRabbitfish: { name: 'Gold-Spotted Rabbitfish', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 12, maxLength: 16, spawnWeight: 28 },
    magnificentFoxface: { name: 'Magnificent Foxface', color: '#F0E68C', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 9, maxLength: 10, spawnWeight: 26 },
    oneSpotFoxface: { name: 'One-Spot Foxface', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 8, maxLength: 9, spawnWeight: 24 },
    clarkiiAnemonefish: { name: 'Clarkii Anemonefish', color: '#FF8C00', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 3, minLength: 4, maxLength: 6, spawnWeight: 32 },
    maroonClownfish: { name: 'Maroon Clownfish', color: '#800000', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 4, minLength: 5, maxLength: 6.5, spawnWeight: 30 },
    sebaeAnemonefish: { name: 'Sebae Anemonefish', color: '#FF6347', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 3, minLength: 4, maxLength: 6, spawnWeight: 28 },
    yellowBoxfish: { name: 'Yellow Boxfish', color: '#FFFF00', difficulty: 'Average', barSize: 70, fishSpeed: 0.0068, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 12, maxLength: 18, spawnWeight: 30 },
    bluespottedBoxfish: { name: 'Bluespotted Boxfish', color: '#4682B4', difficulty: 'Average', barSize: 70, fishSpeed: 0.0068, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 12, maxLength: 18, spawnWeight: 28 },
    greenspottedPuffer: { name: 'Greenspotted Puffer', color: '#228B22', difficulty: 'Average', barSize: 70, fishSpeed: 0.0069, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 5, maxLength: 6.5, spawnWeight: 28 },
    orangespottedFilefish: { name: 'Orangespotted Filefish', color: '#FF8C00', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 6, maxLength: 8, spawnWeight: 26 },
    radiateFilefish: { name: 'Radiate Filefish', color: '#F0E68C', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 6, maxLength: 8, spawnWeight: 26 },
    scopasFilefish: { name: 'Scopas Filefish', color: '#CD853F', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 6, maxLength: 8, spawnWeight: 24 },
    threadfinFilefish: { name: 'Threadfin Filefish', color: '#8B7D6B', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 6, maxLength: 8, spawnWeight: 24 },
    twoBarredRabbitfish: { name: 'Two-Barred Rabbitfish', color: '#F0E68C', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 10, maxLength: 14, spawnWeight: 24 },
    cherryBarb: { name: 'Cherry Barb', color: '#DC143C', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 6, maxLength: 8, spawnWeight: 28 },
    lanceButterfly: { name: 'Lance Butterfly', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 6, maxLength: 8, spawnWeight: 26 },
    raccoonButterflyfish: { name: 'Raccoon Butterflyfish', color: '#F0E68C', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 7, maxLength: 8, spawnWeight: 26 },
    threadfinButterflyfish: { name: 'Threadfin Butterflyfish', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 6, maxLength: 9, spawnWeight: 24 },
    doublebarBream: { name: 'Doublebar Bream', color: '#C0C0C0', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 5, minLength: 10, maxLength: 14, spawnWeight: 28 },
    barredFlagfish: { name: 'Barred Flagfish', color: '#FF6347', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 6, maxLength: 8, spawnWeight: 26 },
    peacockGrouper: { name: 'Peacock Grouper', color: '#4169E1', difficulty: 'Average', barSize: 70, fishSpeed: 0.0074, fishRandomness: 0.22, fishChangeInterval: 47, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 2, maxWeight: 10, minLength: 16, maxLength: 28, spawnWeight: 30 },
    goldbarBass: { name: 'Goldbar Bass', color: '#DAA520', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 5, minLength: 10, maxLength: 14, spawnWeight: 28 },
    halfblackMinibass: { name: 'Halfblack Minibass', color: '#2F4F4F', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 4, maxLength: 5, spawnWeight: 26 },
    goldenGoatfish: { name: 'Golden Goatfish', color: '#DAA520', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 12, maxLength: 16, spawnWeight: 28 },
    yellowfinGoatfish: { name: 'Yellowfin Goatfish', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 12, maxLength: 20, spawnWeight: 26 },
    bannerfish: { name: 'Bannerfish', color: '#F0E68C', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 6, maxLength: 9, spawnWeight: 26 },
    butterflyBream: { name: 'Butterfly Bream', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 10, maxLength: 14, spawnWeight: 24 },
    spotfinSquirrelfish: { name: 'Spotfin Squirrelfish', color: '#FF6347', difficulty: 'Average', barSize: 70, fishSpeed: 0.0071, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 6, maxLength: 8, spawnWeight: 26 },
    blueCrab: { name: 'Blue Crab', color: '#4682B4', difficulty: 'Average', barSize: 70, fishSpeed: 0.0067, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 1, minLength: 3, maxLength: 9, spawnWeight: 32 },
    arrowCrab: { name: 'Arrow Crab', color: '#CD853F', difficulty: 'Average', barSize: 70, fishSpeed: 0.0067, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.1, maxWeight: 0.3, minLength: 3, maxLength: 6, spawnWeight: 30 },
    emeraldCrab: { name: 'Emerald Crab', color: '#50C878', difficulty: 'Average', barSize: 70, fishSpeed: 0.0067, fishRandomness: 0.19, fishChangeInterval: 44, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.1, maxWeight: 0.5, minLength: 1, maxLength: 2, spawnWeight: 30 },
    boxJellyfish: { name: 'Box Jellyfish', color: '#E6E6FA', difficulty: 'Average', barSize: 70, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 43, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.5, maxWeight: 4, minLength: 4, maxLength: 10, spawnWeight: 28 },
    moonJellyfish: { name: 'Moon Jellyfish', color: '#F0F8FF', difficulty: 'Average', barSize: 70, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 43, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 5, minLength: 10, maxLength: 16, spawnWeight: 32 },
    cannonballJellyfish: { name: 'Cannonball Jellyfish', color: '#DCDCDC', difficulty: 'Average', barSize: 70, fishSpeed: 0.0066, fishRandomness: 0.18, fishChangeInterval: 43, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 2, minLength: 5, maxLength: 7, spawnWeight: 30 },
    pacificSeaNettle: { name: 'Pacific Sea Nettle', color: '#FFA07A', difficulty: 'Average', barSize: 70, fishSpeed: 0.0065, fishRandomness: 0.18, fishChangeInterval: 43, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 10, minLength: 12, maxLength: 36, spawnWeight: 28 },
    
    // Larger fish (5-50 lbs) - Hard difficulty
    porcupinePuffer: { name: 'Porcupine Puffer', color: '#F0E68C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 20, minLength: 12, maxLength: 36, spawnWeight: 22 },
    dogioPuffer: { name: 'Dogio Puffer', color: '#8B7D6B', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0079, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 10, maxLength: 20, spawnWeight: 20 },
    guineafowlPuffer: { name: 'Guineafowl Puffer', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0079, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 20, minLength: 10, maxLength: 20, spawnWeight: 20 },
    mapPuffer: { name: 'Map Puffer', color: '#CD853F', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 25, minLength: 14, maxLength: 26, spawnWeight: 18 },
    starsandStripesPuffer: { name: 'Stars and Stripes Puffer', color: '#F0E68C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 20, minLength: 12, maxLength: 18, spawnWeight: 18 },
    clownTriggerfish: { name: 'Clown Triggerfish', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 12, maxLength: 20, spawnWeight: 20 },
    picassoTriggerfish: { name: 'Picasso Triggerfish', color: '#CD853F', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 12, minLength: 8, maxLength: 12, spawnWeight: 20 },
    nigerTriggerfish: { name: 'Niger Triggerfish', color: '#4B0082', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 12, maxLength: 20, spawnWeight: 18 },
    blueTriggerfish: { name: 'Blue Triggerfish', color: '#4169E1', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 18, minLength: 12, maxLength: 16, spawnWeight: 18 },
    dogfaceBoxfish: { name: 'Dogface Boxfish', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0078, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 10, maxLength: 14, spawnWeight: 20 },
    longhorncowfish: { name: 'Longhorn Cowfish', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0077, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 12, maxLength: 18, spawnWeight: 20 },
    scrawledCowfish: { name: 'Scrawled Cowfish', color: '#4682B4', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0077, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 10, maxLength: 18, spawnWeight: 18 },
    longspineBatfish: { name: 'Longspine Batfish', color: '#C0C0C0', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0076, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 12, maxLength: 18, spawnWeight: 18 },
    polkadotBatfish: { name: 'Polkadot Batfish', color: '#2F4F4F', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0076, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 10, maxLength: 16, spawnWeight: 16 },
    pinnateBatfish: { name: 'Pinnate Batfish', color: '#D3D3D3', difficulty: 'Average', barSize: 70, fishSpeed: 0.007, fishRandomness: 0.2, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 8, maxLength: 12, spawnWeight: 26 },
    snowflakeMorayEel: { name: 'Snowflake Moray Eel', color: '#F0E68C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 18, maxLength: 36, spawnWeight: 22 },
    goldenDwarfMorayEel: { name: 'Golden Dwarf Moray Eel', color: '#DAA520', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 12, maxLength: 14, spawnWeight: 20 },
    chainlinkMorayEel: { name: 'Chainlink Moray Eel', color: '#696969', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 20, minLength: 18, maxLength: 28, spawnWeight: 18 },
    zebraEel: { name: 'Zebra Eel', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 24, maxLength: 40, spawnWeight: 18 },
    dragonEel: { name: 'Dragon Eel', color: '#8B4513', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0083, fishRandomness: 0.27, fishChangeInterval: 52, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 30, minLength: 30, maxLength: 36, spawnWeight: 16 },
    ribbonEel: { name: 'Ribbon Eel', color: '#0000FF', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0083, fishRandomness: 0.27, fishChangeInterval: 52, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 30, maxLength: 50, spawnWeight: 16 },
    peacockFlounder: { name: 'Peacock Flounder', color: '#8B7D6B', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0075, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 12, minLength: 12, maxLength: 18, spawnWeight: 20 },
    pantherFlounder: { name: 'Panther Flounder', color: '#2F4F4F', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0075, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 12, minLength: 10, maxLength: 14, spawnWeight: 18 },
    sargassumFrogfish: { name: 'Sargassum Frogfish', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0073, fishRandomness: 0.22, fishChangeInterval: 47, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 8, minLength: 6, maxLength: 8, spawnWeight: 16 },
    giantFrogfish: { name: 'Giant Frogfish', color: '#FF6347', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0074, fishRandomness: 0.22, fishChangeInterval: 47, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 12, maxLength: 16, spawnWeight: 14 },
    blueStripeSnapper: { name: 'Blue Stripe Snapper', color: '#4682B4', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 25, minLength: 14, maxLength: 24, spawnWeight: 24 },
    oneSpotSnapper: { name: 'One-Spot Snapper', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 20, minLength: 12, maxLength: 20, spawnWeight: 22 },
    harlequinTilefish: { name: 'Harlequin Tilefish', color: '#4169E1', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0079, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 12, maxLength: 18, spawnWeight: 20 },
    blueDotJawfish: { name: 'Blue Dot Jawfish', color: '#4682B4', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0078, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 4, maxLength: 6, spawnWeight: 18 },
    copperbandbutterflyfish: { name: 'Copperband Butterflyfish', color: '#FF8C00', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0077, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 8, minLength: 6, maxLength: 8, spawnWeight: 20 },
    longnoseButterfly: { name: 'Longnose Butterfly', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0077, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 8, minLength: 6, maxLength: 9, spawnWeight: 20 },
    saddledButterfly: { name: 'Saddled Butterfly', color: '#F0E68C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0077, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 7, maxLength: 10, spawnWeight: 18 },
    bluefaceAngelfish: { name: 'Blueface Angelfish', color: '#1E90FF', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0079, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 8, minLength: 10, maxLength: 15, spawnWeight: 18 },
    emperorAngelfish: { name: 'Emperor Angelfish', color: '#4169E1', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 7, minLength: 12, maxLength: 15, spawnWeight: 16 },
    koranAngelfish: { name: 'Koran Angelfish', color: '#4682B4', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0079, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 7, minLength: 10, maxLength: 15, spawnWeight: 16 },
    majesticAngelfish: { name: 'Majestic Angelfish', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 7, minLength: 10, maxLength: 12, spawnWeight: 14 },
    yellowmaskAngelfish: { name: 'Yellowmask Angelfish', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0079, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 8, minLength: 8, maxLength: 11, spawnWeight: 14 },
    miniataGrouper: { name: 'Miniata Grouper', color: '#DC143C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0083, fishRandomness: 0.27, fishChangeInterval: 52, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 40, minLength: 16, maxLength: 24, spawnWeight: 20 },
    coralGrouper: { name: 'Coral Grouper', color: '#FF6347', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 30, minLength: 16, maxLength: 24, spawnWeight: 20 },
    polkadotGrouper: { name: 'Polkadot Grouper', color: '#CD853F', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 35, minLength: 18, maxLength: 32, spawnWeight: 18 },
    blackEdgedGrouper: { name: 'Black-Edged Grouper', color: '#2F4F4F', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0083, fishRandomness: 0.27, fishChangeInterval: 52, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 50, minLength: 24, maxLength: 36, spawnWeight: 18 },
    yellowfinGrouper: { name: 'Yellowfin Grouper', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 40, minLength: 18, maxLength: 36, spawnWeight: 16 },
    cometGrouper: { name: 'Comet Grouper', color: '#FF6B6B', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 30, minLength: 16, maxLength: 24, spawnWeight: 16 },
    pantherGrouper: { name: 'Panther Grouper', color: '#2F4F4F', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0083, fishRandomness: 0.27, fishChangeInterval: 52, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 50, minLength: 20, maxLength: 28, spawnWeight: 14 },
    blacktipGrouper: { name: 'Blacktip Grouper', color: '#8B4513', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 35, minLength: 18, maxLength: 32, spawnWeight: 16 },
    lunarGrouper: { name: 'Lunar Grouper', color: '#F0E68C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 30, minLength: 16, maxLength: 24, spawnWeight: 14 },
    squareSpotGrouper: { name: 'Square Spot Grouper', color: '#CD853F', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 35, minLength: 18, maxLength: 28, spawnWeight: 14 },
    redspottedGrouper: { name: 'Redspotted Grouper', color: '#DC143C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 40, minLength: 20, maxLength: 30, spawnWeight: 14 },
    goldribbonGrouper: { name: 'Goldribbon Grouper', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 35, minLength: 18, maxLength: 30, spawnWeight: 12 },
    greasyGrouper: { name: 'Greasy Grouper', color: '#8B7D6B', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 30, minLength: 16, maxLength: 28, spawnWeight: 12 },
    leopardGrouper: { name: 'Leopard Grouper', color: '#CD853F', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0083, fishRandomness: 0.27, fishChangeInterval: 52, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 45, minLength: 20, maxLength: 32, spawnWeight: 12 },
    barredSoapfish: { name: 'Barred Soapfish', color: '#8B7D6B', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 12, minLength: 10, maxLength: 12, spawnWeight: 16 },
    sixlinedSoapfish: { name: 'Sixlined Soapfish', color: '#696969', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 8, maxLength: 10, spawnWeight: 14 },
    bluePinstripeHogfish: { name: 'Blue Pinstripe Hogfish', color: '#4682B4', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 10, maxLength: 14, spawnWeight: 18 },
    cubanHogfish: { name: 'Cuban Hogfish', color: '#FF6347', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 12, maxLength: 16, spawnWeight: 18 },
    spotfishHogfish: { name: 'Spotfin Hogfish', color: '#DC143C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 12, minLength: 8, maxLength: 12, spawnWeight: 16 },
    spanishHogfish: { name: 'Spanish Hogfish', color: '#FF8C00', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 8, maxLength: 14, spawnWeight: 16 },
    peacockParrotfish: { name: 'Peacock Parrotfish', color: '#00CED1', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 25, minLength: 12, maxLength: 18, spawnWeight: 18 },
    midnightParrotfish: { name: 'Midnight Parrotfish', color: '#191970', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 10, maxWeight: 30, minLength: 16, maxLength: 30, spawnWeight: 16 },
    cleanerWrasse: { name: 'Cleaner Wrasse', color: '#4169E1', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.2, maxWeight: 0.5, minLength: 2, maxLength: 4, spawnWeight: 28 },
    yellowtailCoris: { name: 'Yellowtail Coris', color: '#FFD700', difficulty: 'Average', barSize: 70, fishSpeed: 0.0074, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 10, maxLength: 12, spawnWeight: 26 },
    dividedWrasse: { name: 'Divided Wrasse', color: '#FF6347', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 4, minLength: 10, maxLength: 12, spawnWeight: 24 },
    exquisiteWrasse: { name: 'Exquisite Wrasse', color: '#9370DB', difficulty: 'Average', barSize: 70, fishSpeed: 0.0074, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 4, maxLength: 5, spawnWeight: 22 },
    dragonWrasse: { name: 'Dragon Wrasse', color: '#8B4513', difficulty: 'Average', barSize: 70, fishSpeed: 0.0075, fishRandomness: 0.22, fishChangeInterval: 47, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 2, maxWeight: 5, minLength: 8, maxLength: 10, spawnWeight: 20 },
    leopardWrasse: { name: 'Leopard Wrasse', color: '#DEB887', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 4, maxLength: 6, spawnWeight: 24 },
    lunarWrasse: { name: 'Lunar Wrasse', color: '#7FFF00', difficulty: 'Average', barSize: 70, fishSpeed: 0.0074, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 2, maxWeight: 4, minLength: 8, maxLength: 12, spawnWeight: 22 },
    sixlineWrasse: { name: 'Sixline Wrasse', color: '#FF4500', difficulty: 'Average', barSize: 70, fishSpeed: 0.0072, fishRandomness: 0.20, fishChangeInterval: 45, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 0.1, maxWeight: 0.3, minLength: 2, maxLength: 3, spawnWeight: 30 },
    melanurusWrasse: { name: 'Melanurus Wrasse', color: '#4682B4', difficulty: 'Average', barSize: 70, fishSpeed: 0.0073, fishRandomness: 0.21, fishChangeInterval: 46, progressGainRate: 0.24, progressDecayRate: 0.35, minWeight: 1, maxWeight: 3, minLength: 3, maxLength: 5, spawnWeight: 26 },
    blueprintSweetlips: { name: 'Blueprint Sweetlips', color: '#4682B4', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 20, minLength: 14, maxLength: 20, spawnWeight: 18 },
    clownSweetlips: { name: 'Clown Sweetlips', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 25, minLength: 16, maxLength: 28, spawnWeight: 16 },
    orientalSweetlips: { name: 'Oriental Sweetlips', color: '#F0E68C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 30, minLength: 18, maxLength: 28, spawnWeight: 16 },
    harlequinSweetlips: { name: 'Harlequin Sweetlips', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0081, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 20, minLength: 14, maxLength: 18, spawnWeight: 16 },
    paintedGrunt: { name: 'Painted Grunt', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 10, maxLength: 16, spawnWeight: 18 },
    goldspottedBoxfish: { name: 'Goldspotted Boxfish', color: '#FFD700', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0078, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 12, minLength: 8, maxLength: 12, spawnWeight: 16 },
    scrawledFilefish: { name: 'Scrawled Filefish', color: '#8B7D6B', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0079, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 15, minLength: 8, maxLength: 14, spawnWeight: 16 },
    whiteSpottedBurrfish: { name: 'White-Spotted Burrfish', color: '#F0E68C', difficulty: 'Hard', barSize: 60, fishSpeed: 0.008, fishRandomness: 0.25, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 10, maxLength: 18, spawnWeight: 18 },
    blueHeadGoby: { name: 'Blue Head Goby', color: '#1E90FF', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0077, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 8, minLength: 3, maxLength: 5, spawnWeight: 16 },
    fireGoby: { name: 'Fire Goby', color: '#FF4500', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0077, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 8, minLength: 2, maxLength: 3, spawnWeight: 14 },
    dragonGoby: { name: 'Dragon Goby', color: '#696969', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0078, fishRandomness: 0.24, fishChangeInterval: 49, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 10, minLength: 8, maxLength: 10, spawnWeight: 14 },
    peppermintShrimp: { name: 'Peppermint Shrimp', color: '#FF6B6B', difficulty: 'Hard', barSize: 60, fishSpeed: 0.0076, fishRandomness: 0.23, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 5, maxWeight: 8, minLength: 2, maxLength: 3, spawnWeight: 18 },
    
    // Very large fish and rays (50-500 lbs) - Hard difficulty
    atlanticTorpedoRay: { name: 'Atlantic Torpedo Ray', color: '#696969', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0085, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 50, maxWeight: 200, minLength: 36, maxLength: 60, spawnWeight: 14 },
    blueSpottedRay: { name: 'Blue-Spotted Ray', color: '#4682B4', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0084, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 20, maxWeight: 100, minLength: 24, maxLength: 36, spawnWeight: 16 },
    coachwhipRay: { name: 'Coachwhip Ray', color: '#8B7D6B', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0085, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 30, maxWeight: 150, minLength: 48, maxLength: 72, spawnWeight: 14 },
    cownosseRay: { name: 'Cownose Ray', color: '#CD853F', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0084, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 40, maxWeight: 100, minLength: 24, maxLength: 36, spawnWeight: 16 },
    eagleRay: { name: 'Eagle Ray', color: '#2F4F4F', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0087, fishRandomness: 0.29, fishChangeInterval: 54, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 100, maxWeight: 500, minLength: 60, maxLength: 120, spawnWeight: 10 },
    electricRay: { name: 'Electric Ray', color: '#708090', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0084, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 20, maxWeight: 80, minLength: 24, maxLength: 72, spawnWeight: 14 },
    jenkinsWhipray: { name: 'Jenkins Whipray', color: '#8B7D6B', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0086, fishRandomness: 0.29, fishChangeInterval: 54, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 50, maxWeight: 300, minLength: 60, maxLength: 96, spawnWeight: 12 },
    marbledRay: { name: 'Marbled Ray', color: '#696969', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0085, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 30, maxWeight: 120, minLength: 24, maxLength: 48, spawnWeight: 14 },
    whitespottedEagleRay: { name: 'Whitespotted Eagle Ray', color: '#2F4F4F', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0087, fishRandomness: 0.29, fishChangeInterval: 54, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 100, maxWeight: 500, minLength: 72, maxLength: 120, spawnWeight: 10 },
    porcupineRay: { name: 'Porcupine Ray', color: '#8B7D6B', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0085, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 40, maxWeight: 180, minLength: 36, maxLength: 60, spawnWeight: 12 },
    roundRay: { name: 'Round Ray', color: '#696969', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0084, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 30, maxWeight: 120, minLength: 24, maxLength: 36, spawnWeight: 14 },
    roughTailStingray: { name: 'Rough Tail Stingray', color: '#708090', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0086, fishRandomness: 0.29, fishChangeInterval: 54, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 50, maxWeight: 300, minLength: 48, maxLength: 84, spawnWeight: 12 },
    southernStingray: { name: 'Southern Stingray', color: '#696969', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0086, fishRandomness: 0.29, fishChangeInterval: 54, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 50, maxWeight: 200, minLength: 48, maxLength: 72, spawnWeight: 14 },
    
    // Large sharks (50-500 lbs) - Hard difficulty
    blacknoseShark: { name: 'Blacknose Shark', color: '#696969', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0088, fishRandomness: 0.3, fishChangeInterval: 55, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 50, maxWeight: 100, minLength: 48, maxLength: 60, spawnWeight: 14 },
    blacktipReefShark: { name: 'Blacktip Reef Shark', color: '#2F4F4F', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0089, fishRandomness: 0.3, fishChangeInterval: 55, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 100, maxWeight: 300, minLength: 60, maxLength: 84, spawnWeight: 12 },
    blacktipShark: { name: 'Blacktip Shark', color: '#696969', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0089, fishRandomness: 0.3, fishChangeInterval: 55, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 100, maxWeight: 200, minLength: 60, maxLength: 96, spawnWeight: 12 },
    blueShark: { name: 'Blue Shark', color: '#4682B4', difficulty: 'Hard', barSize: 50, fishSpeed: 0.011, fishRandomness: 0.4, fishChangeInterval: 52, progressGainRate: 0.14, progressDecayRate: 0.55, minWeight: 100, maxWeight: 400, minLength: 96, maxLength: 150, spawnWeight: 10 },
    bullShark: { name: 'Bull Shark', color: '#808080', difficulty: 'Hard', barSize: 45, fishSpeed: 0.013, fishRandomness: 0.5, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 200, maxWeight: 500, minLength: 84, maxLength: 132, spawnWeight: 8 },
    caribbeanReefShark: { name: 'Caribbean Reef Shark', color: '#708090', difficulty: 'Hard', barSize: 50, fishSpeed: 0.0105, fishRandomness: 0.38, fishChangeInterval: 54, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 100, maxWeight: 150, minLength: 72, maxLength: 96, spawnWeight: 10 },
    duskyShark: { name: 'Dusky Shark', color: '#696969', difficulty: 'Hard', barSize: 50, fishSpeed: 0.011, fishRandomness: 0.4, fishChangeInterval: 52, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 150, maxWeight: 400, minLength: 96, maxLength: 144, spawnWeight: 10 },
    lemonShark: { name: 'Lemon Shark', color: '#F0E68C', difficulty: 'Hard', barSize: 50, fishSpeed: 0.011, fishRandomness: 0.4, fishChangeInterval: 52, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 100, maxWeight: 400, minLength: 84, maxLength: 132, spawnWeight: 10 },
    nurseShark: { name: 'Nurse Shark', color: '#8B7D6B', difficulty: 'Hard', barSize: 50, fishSpeed: 0.0105, fishRandomness: 0.38, fishChangeInterval: 54, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 100, maxWeight: 300, minLength: 84, maxLength: 120, spawnWeight: 12 },
    sandbarShark: { name: 'Sandbar Shark', color: '#D2B48C', difficulty: 'Hard', barSize: 52, fishSpeed: 0.0105, fishRandomness: 0.37, fishChangeInterval: 54, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 100, maxWeight: 200, minLength: 72, maxLength: 96, spawnWeight: 10 },
    spinnerShark: { name: 'Spinner Shark', color: '#696969', difficulty: 'Hard', barSize: 52, fishSpeed: 0.0105, fishRandomness: 0.37, fishChangeInterval: 54, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 100, maxWeight: 200, minLength: 72, maxLength: 108, spawnWeight: 10 },
    tigerShark: { name: 'Tiger Shark', color: '#8B7D6B', difficulty: 'Hard', barSize: 40, fishSpeed: 0.016, fishRandomness: 0.75, fishChangeInterval: 42, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 300, maxWeight: 1400, minLength: 132, maxLength: 216, spawnWeight: 6 },
    whitetipReefShark: { name: 'Whitetip Reef Shark', color: '#808080', difficulty: 'Hard', barSize: 55, fishSpeed: 0.01, fishRandomness: 0.35, fishChangeInterval: 55, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 50, maxWeight: 100, minLength: 48, maxLength: 60, spawnWeight: 12 },
    shortfinMakoShark: { name: 'Shortfin Mako Shark', color: '#4682B4', difficulty: 'Hard', barSize: 40, fishSpeed: 0.015, fishRandomness: 0.7, fishChangeInterval: 44, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 200, maxWeight: 1200, minLength: 96, maxLength: 168, spawnWeight: 6 },
    hammerheadShark: { name: 'Hammerhead Shark', color: '#696969', difficulty: 'Hard', barSize: 40, fishSpeed: 0.015, fishRandomness: 0.65, fishChangeInterval: 45, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 200, maxWeight: 1000, minLength: 84, maxLength: 240, spawnWeight: 6 },
    
    // Sea turtles (50-500 lbs) - Hard difficulty
    greenSeaTurtle: { name: 'Green Sea Turtle', color: '#228B22', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0084, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 200, maxWeight: 500, minLength: 36, maxLength: 60, spawnWeight: 8 },
    flatbackSeaTurtle: { name: 'Flatback Sea Turtle', color: '#8B7D6B', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0083, fishRandomness: 0.27, fishChangeInterval: 52, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 150, maxWeight: 200, minLength: 30, maxLength: 42, spawnWeight: 10 },
    hawksbillSeaTurtle: { name: 'Hawksbill Sea Turtle', color: '#CD853F', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0083, fishRandomness: 0.27, fishChangeInterval: 52, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 100, maxWeight: 200, minLength: 24, maxLength: 36, spawnWeight: 10 },
    kempsRidleySeaTurtle: { name: "Kemp's Ridley Sea Turtle", color: '#696969', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0082, fishRandomness: 0.26, fishChangeInterval: 51, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 80, maxWeight: 100, minLength: 24, maxLength: 30, spawnWeight: 12 },
    leatherbackSeaTurtle: { name: 'Leatherback Sea Turtle', color: '#2F4F4F', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0087, fishRandomness: 0.29, fishChangeInterval: 54, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 500, maxWeight: 2000, minLength: 60, maxLength: 96, spawnWeight: 4 },
    loggerheadSeaTurtle: { name: 'Loggerhead Sea Turtle', color: '#8B4513', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0084, fishRandomness: 0.28, fishChangeInterval: 53, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 200, maxWeight: 400, minLength: 30, maxLength: 48, spawnWeight: 8 },
    oliveRidleySeaTurtle: { name: 'Olive Ridley Sea Turtle', color: '#808000', difficulty: 'Hard', barSize: 55, fishSpeed: 0.0083, fishRandomness: 0.27, fishChangeInterval: 52, progressGainRate: 0.16, progressDecayRate: 0.46, minWeight: 80, maxWeight: 100, minLength: 24, maxLength: 30, spawnWeight: 10 },
    
    // Massive marine animals (500+ lbs) - Hard difficulty
    giantGrouper: { name: 'Giant Grouper', color: '#696969', difficulty: 'Hard', barSize: 40, fishSpeed: 0.016, fishRandomness: 0.8, fishChangeInterval: 42, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 400, maxWeight: 880, minLength: 84, maxLength: 120, spawnWeight: 4 },
    goliathGrouper: { name: 'Goliath Grouper', color: '#8B7D6B', difficulty: 'Hard', barSize: 40, fishSpeed: 0.017, fishRandomness: 0.85, fishChangeInterval: 40, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 400, maxWeight: 800, minLength: 96, maxLength: 120, spawnWeight: 4 },
    atlanticGoliathGrouper: { name: 'Atlantic Goliath Grouper', color: '#696969', difficulty: 'Hard', barSize: 40, fishSpeed: 0.017, fishRandomness: 0.85, fishChangeInterval: 40, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 400, maxWeight: 800, minLength: 96, maxLength: 120, spawnWeight: 4 },
    giantMantaRay: { name: 'Giant Manta Ray', color: '#2F4F4F', difficulty: 'Hard', barSize: 35, fishSpeed: 0.019, fishRandomness: 0.9, fishChangeInterval: 38, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 1500, maxWeight: 5300, minLength: 180, maxLength: 300, spawnWeight: 0.8 },
    greatWhiteShark: { name: 'Great White Shark', color: '#C0C0C0', difficulty: 'Hard', barSize: 35, fishSpeed: 0.02, fishRandomness: 0.95, fishChangeInterval: 36, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 1500, maxWeight: 5000, minLength: 180, maxLength: 240, spawnWeight: 0.8 },
    whaleshark: { name: 'Whale Shark', color: '#4682B4', difficulty: 'Hard', barSize: 35, fishSpeed: 0.015, fishRandomness: 0.7, fishChangeInterval: 45, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 15000, maxWeight: 41000, minLength: 240, maxLength: 480, spawnWeight: 0.3 },
    oceanSunfish: { name: 'Ocean Sunfish', color: '#C0C0C0', difficulty: 'Hard', barSize: 45, fishSpeed: 0.012, fishRandomness: 0.5, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 500, maxWeight: 5000, minLength: 72, maxLength: 132, spawnWeight: 1.5 },
    bluefinTuna: { name: 'Bluefin Tuna', color: '#4682B4', difficulty: 'Hard', barSize: 45, fishSpeed: 0.013, fishRandomness: 0.55, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 500, maxWeight: 1500, minLength: 96, maxLength: 120, spawnWeight: 2 },
    marlin: { name: 'Marlin', color: '#4169E1', difficulty: 'Hard', barSize: 45, fishSpeed: 0.014, fishRandomness: 0.6, fishChangeInterval: 46, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 500, maxWeight: 1800, minLength: 120, maxLength: 180, spawnWeight: 2 },
    sailfish: { name: 'Sailfish', color: '#4682B4', difficulty: 'Hard', barSize: 50, fishSpeed: 0.012, fishRandomness: 0.5, fishChangeInterval: 50, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 100, maxWeight: 220, minLength: 72, maxLength: 132, spawnWeight: 3 },
    swordfish: { name: 'Swordfish', color: '#708090', difficulty: 'Hard', barSize: 45, fishSpeed: 0.013, fishRandomness: 0.55, fishChangeInterval: 48, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 200, maxWeight: 1400, minLength: 96, maxLength: 180, spawnWeight: 2.5 },
    orca: { name: 'Orca', color: '#000000', difficulty: 'Hard', barSize: 30, fishSpeed: 0.018, fishRandomness: 0.85, fishChangeInterval: 35, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 8000, maxWeight: 12000, minLength: 240, maxLength: 384, spawnWeight: 0.4 },
    humpbackWhale: { name: 'Humpback Whale', color: '#696969', difficulty: 'Hard', barSize: 25, fishSpeed: 0.022, fishRandomness: 1.0, fishChangeInterval: 30, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 40000, maxWeight: 80000, minLength: 480, maxLength: 720, spawnWeight: 0.2 },
    grayWhale: { name: 'Gray Whale', color: '#808080', difficulty: 'Hard', barSize: 25, fishSpeed: 0.021, fishRandomness: 0.95, fishChangeInterval: 32, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 30000, maxWeight: 80000, minLength: 420, maxLength: 600, spawnWeight: 0.2 },
    spermWhale: { name: 'Sperm Whale', color: '#2F4F4F', difficulty: 'Hard', barSize: 25, fishSpeed: 0.023, fishRandomness: 1.05, fishChangeInterval: 28, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 35000, maxWeight: 90000, minLength: 480, maxLength: 780, spawnWeight: 0.15 },
    blueWhale: { name: 'Blue Whale', color: '#4682B4', difficulty: 'Hard', barSize: 20, fishSpeed: 0.025, fishRandomness: 1.2, fishChangeInterval: 25, progressGainRate: 0.18, progressDecayRate: 0.42, minWeight: 200000, maxWeight: 400000, minLength: 900, maxLength: 1200, spawnWeight: 0.1 }
};

let currentFish = null;
let currentFishWeight = 0;
let currentFishLength = 0;
let currentFishRarity = 'normal'; // Track rarity during minigame for visual effects

// Inventory and shop system
let maxInventorySlots = 20;
const absoluteMaxInventorySlots = 100;
let inventory = [];
let money = 0;
const baseInventorySlotPrice = 100;

// Location system
let currentLocation = 'lake'; // 'lake' or 'ocean'

// Museum section tracking
let currentMuseumSection = 'freshwater'; // 'freshwater' or 'saltwater'

// Museum completion tracking
let freshwaterMuseumCompleted = false;
let saltwaterMuseumCompleted = false;
let completeMuseumBonusAwarded = false;

// Museum system - tracks fish catches
let museum = {};
// Structure: { 'fishTypeName': { discovered: true, totalCaught: number, biggestWeight: number } }

// Function to calculate current inventory slot price
function getInventorySlotPrice() {
    // Base price of $100 for slots up to 20
    // After 20 slots, each additional slot costs $100 more
    if (maxInventorySlots < 20) {
        return baseInventorySlotPrice;
    } else {
        const slotsAbove20 = maxInventorySlots - 20;
        return baseInventorySlotPrice + (slotsAbove20 * 100);
    }
}

let currentPage = 'fishing'; // 'fishing' or 'shop'

// Time tracking
let timePlayed = 0; // in seconds
let gameStartTime = Date.now();
let lastUpdateTime = Date.now();

// Fish selling prices (per pound)
const fishPrices = {
    'Spotted Galaxias': 50,
    "Reeya's Shrimp": 30,
    'Bluegill': 3,
    'Sunfish': 3,
    'Spotted Sunfish': 3,
    'Redbreast Sunfish': 3,
    'Mooneye': 3,
    'Pumpkinseed': 3,
    'Mayan Cichlid': 3,
    'Herring': 4,
    'Perch': 4,
    'Rock Bass': 4,
    'Asp': 4,
    'Giant Kokopu': 4,
    'River Blackfish': 4,
    'Redhook Myleus': 4,
    'Australian Grayling': 4,
    'Sauger': 4,
    'Bullhead': 5,
    'Chub': 5,
    'Brook Trout': 5,
    'Crappie': 6,
    'Warmouth': 6,
    'Crucian Carp': 6,
    'Pink Salmon': 6,
    'Trout': 7,
    'Whitefish': 7,
    'Chain Pickerel': 7,
    'Arctic Grayling': 7,
    'Yellowcheek': 7,
    'Sleepy Cod': 8,
    'European Perch': 8,
    'Goldeye': 8,
    'Golden Mandarin Fish': 8,
    'Smallmouth Bass': 9,
    'Salmon': 10,
    'Largemouth Bass': 10,
    'White Bass': 9,
    'Silver Arowana': 10,
    'Basa': 10,
    'Bream': 10,
    'Smallmouth Yellowfish': 10,
    'Rainbow Trout': 11,
    'Australian Bass': 11,
    'Coastal Cutthroat Trout': 11,
    'Clanwilliam Yellowfish': 11,
    'Walleye': 12,
    'Anguillidae': 12,
    'Biara': 12,
    'Bicuda': 12,
    'Barbel': 12,
    'Golden Perch': 12,
    'Cherry Salmon': 13,
    'Bowfin': 13,
    'Butterfly Peacock Bass': 13,
    'Clown Featherback': 13,
    'Catfish': 18,
    'Black Arowana': 14,
    'Largemouth Yellowfish': 14,
    'Black Bass': 14,
    'Coho Salmon': 20,
    'Asian Arowana': 15,
    'Ide': 15,
    'Masu Salmon': 15,
    'Smallmouth Buffalo': 15,
    'Sterlet': 15,
    'Carp': 20,
    'Gulf Saratoga': 16,
    'Longnose Gar': 30,
    'Zander': 16,
    'Pike': 22,
    'Gar': 32,
    'Spotted Gar': 50,
    'Shortnose Gar': 60,
    'Florida Gar': 55,
    'African Arowana': 18,
    'Amur Pike': 18,
    'Kampango': 18,
    'King Salmon': 20,
    'Blue Tigerfish': 20,
    'Burbot': 20,
    'Guabine': 20,
    'Vampire Fish': 20,
    'Piranha': 20,
    'Rita': 20,
    'Muskellunge': 22,
    'Amur Catfish': 22,
    'Colorado Pikeminnow': 22,
    'Royal Peacock Bass': 22,
    'Goldfish': 25,
    'Bayad': 25,
    'Ranchu Goldfish': 30,
    'Huchen': 30,
    'Cod': 30,
    'Bullseye Snakehead': 30,
    'Humpback Mahseer': 30,
    'Iridescent Shark': 30,
    'Alligator Gar': 50,
    'Golden Dorado': 35,
    'Golden Mahseer': 35,
    'Wolf Fish': 35,
    'Koi': 40,
    'African Sharptooth Catfish': 40,
    'Boal': 40,
    'Barramundi': 40,
    'Paddlefish': 45,
    'Sturgeon': 80,
    'Barred Sorubim': 50,
    'Vundu': 55,
    'African Pike': 55,
    'Murray Cod': 55,
    'Goliath Tigerfish': 60,
    'Giant Barb': 70,
    'Kaluga': 75,
    'Amur Sturgeon': 80,
    'Atlantic Sturgeon': 90,
    'Arapaima': 100,
    'Giant Pangasius': 120,
    'Giant River-Catfish': 120,
    // Ocean fish prices (per pound)
    'Cave Transparent Goby': 80, 'Neon Goby': 80, 'Redhead Goby': 75, 'Anemone Shrimp': 100, 'Glass Shrimp': 90, 'Sexy Shrimp': 120, 'Bumble Bee Shrimp': 110, 'Common Jellyfish': 5, 'Dusky Jawfish': 85,
    'Black Clown Goby': 70, 'Catalina Goby': 70, 'Citron Clown Goby': 70, 'Court Jester Goby': 65, 'Yasha Goby': 60, 'Flaming Prawn Goby': 60, 'Banded Pipefish': 55, 'Dragonface Pipefish': 55, 'Bluelined Dottyback': 50, 'Cherry Dottyback': 50, 'Red Dottyback': 45, 'Great Seahorse': 100, 'Thorny Seahorse': 95, 'Yellowhead Jawfish': 75,
    'Spinyhead Blenny': 30, 'Bicolor Blenny': 30, 'Canary Fang Blenny': 30, 'Diamond Blenny': 28, 'Ember Blenny': 28, 'Harptail Blenny': 26, "Bartlett's Anthias": 35, 'Bicolor Anthias': 35, "Cooper's Anthias": 32, 'Redbar Anthias': 32, 'Squareback Anthias': 30, 'Stocky Anthias': 30, 'Threadfin Anthias': 28, 'Blackcap Gramma': 40, 'Blue Assessor': 40, 'Royal Gramma': 38, 'Yellow Assessor': 38, 'Lawnmower Blenny': 25, 'Midas Blenny': 24, 'Starry Blenny': 24, 'Engineer Goby': 22, 'Glass Eye Squirrelfish': 20, 'Fire Fish': 45, 'Purple Fire Fish': 42, 'Scissortail Dartfish': 40, 'Starry Dragonet': 38, 'Spotted Mandarin': 35, 'Decoy Scorpionfish': 35, 'Leaf Scorpionfish': 32, 'Sea Goblin': 32, 'Blackstripe Cardinalfish': 28, 'Bluestreak Cardinalfish': 26, 'Flamefish': 26, 'Frostfin Cardinalfish': 24, 'Pajama Cardinalfish': 24, 'Ringtailed Cardinalfish': 22, 'Blue Chromis': 18, 'Barrier Reef Chromis': 18, 'Damselfish': 16, 'Half-and-Half Chromis': 20, 'Yellowspotted Chromis': 20, 'Cinnamon Anemonefish': 30, 'Pink Skunk Anemonefish': 30, 'Tomato Clownfish': 28, 'Azure Damselfish': 16, 'Blue-and-Gold Damselfish': 18, 'Blue Velvet Damselfish': 20, 'Cloudy Damselfish': 15, 'Domino Damselfish': 18, 'Jewel Damselfish': 18, 'Lemon Damselfish': 20, 'Longfin Gregory': 20, 'Neon Damselfish': 22, "Stark's Damselfish": 22, 'Tuxedo Damselfish': 24, 'Black Hamlet': 25, 'Blue Hamlet': 28, 'Golden Hamlet': 30, 'Indigo Hamlet': 30, 'Butter Hamlet': 32, 'Shy Hamlet': 32, 'Coral Hawkfish': 35, 'Flame Hawkfish': 38, 'Golden Hawkfish': 40, 'Yellow Cucumber': 10, 'Hermit Crab': 8,
    'Atlantic Spadefish': 15, 'Gray Angelfish': 25, 'Yellow-Edged Lyretail': 30, 'Bicolor Angelfish': 35, 'Blue Angelfish': 30, 'Cherubfish': 40, 'Coral Beauty': 45, 'Flame Angelfish': 50, 'French Angelfish': 30, 'Goldflake Angelfish': 55, 'Herald Angelfish': 40, 'Lemonpeel Angelfish': 45, 'Multicolor Angelfish': 45, 'Pearlscale Angelfish': 50, "Potter's Angelfish": 50, 'Queen Angelfish': 35, 'Raspy Angelfish': 40, 'Regal Angelfish': 60, 'Rock Beauty Angelfish': 40, 'Rusty Angelfish': 45, 'Scribbled Angelfish': 45, 'Sixbar Angelfish': 50, 'Three Spot Angelfish': 50, 'Tibicen Angelfish': 55, 'Yellowfin Angelfish': 55, 'Blackfooted Lionfish': 40, 'Red Lionfish': 40, "Russell's Lionfish": 42, 'Turkeyfish': 42, 'Goldrimmed Surgeonfish': 25, 'Orangeshoulder Surgeonfish': 28, 'Powder Blue Tang': 35, 'Regal Tang': 32, 'Sailfin Tang': 28, 'Yellow Tang': 40, 'Zebrasoma Tang': 35, 'Gold-Spotted Rabbitfish': 20, 'Magnificent Foxface': 22, 'One-Spot Foxface': 25, 'Clarkii Anemonefish': 25, 'Maroon Clownfish': 30, 'Sebae Anemonefish': 28, 'Yellow Boxfish': 30, 'Bluespotted Boxfish': 32, 'Greenspotted Puffer': 28, 'Orangespotted Filefish': 25, 'Radiate Filefish': 25, 'Scopas Filefish': 28, 'Threadfin Filefish': 28, 'Two-Barred Rabbitfish': 22, 'Cherry Barb': 20, 'Lance Butterfly': 30, 'Raccoon Butterflyfish': 28, 'Threadfin Butterflyfish': 30, 'Doublebar Bream': 18, 'Barred Flagfish': 22, 'Peacock Grouper': 35, 'Goldbar Bass': 30, 'Halfblack Minibass': 28, 'Golden Goatfish': 20, 'Yellowfin Goatfish': 22, 'Bannerfish': 25, 'Butterfly Bream': 20, 'Spotfin Squirrelfish': 22, 'Blue Crab': 15, 'Arrow Crab': 20, 'Emerald Crab': 18, 'Box Jellyfish': 8, 'Moon Jellyfish': 5, 'Cannonball Jellyfish': 8, 'Pacific Sea Nettle': 6,
    'Porcupine Puffer': 55, 'Dogio Puffer': 60, 'Guineafowl Puffer': 58, 'Map Puffer': 50, 'Stars and Stripes Puffer': 56, 'Clown Triggerfish': 65, 'Picasso Triggerfish': 70, 'Niger Triggerfish': 62, 'Blue Triggerfish': 58, 'Dogface Boxfish': 65, 'Longhorn Cowfish': 75, 'Scrawled Cowfish': 75, 'Longspine Batfish': 62, 'Polkadot Batfish': 64, 'Pinnate Batfish': 63, 'Snowflake Moray Eel': 68, 'Golden Dwarf Moray Eel': 78, 'Chainlink Moray Eel': 60, 'Zebra Eel': 70, 'Dragon Eel': 50, 'Ribbon Eel': 80, 'Peacock Flounder': 65, 'Panther Flounder': 68, 'Sargassum Frogfish': 85, 'Giant Frogfish': 90, 'Blue Stripe Snapper': 50, 'One-Spot Snapper': 58, 'Harlequin Tilefish': 72, 'Blue Dot Jawfish': 75, 'Copperband Butterflyfish': 80, 'Longnose Butterfly': 82, 'Saddled Butterfly': 70, 'Blueface Angelfish': 90, 'Emperor Angelfish': 95, 'Koran Angelfish': 95, 'Majestic Angelfish': 100, 'Yellowmask Angelfish': 98, 'Miniata Grouper': 65, 'Coral Grouper': 72, 'Polkadot Grouper': 68, 'Black-Edged Grouper': 62, 'Yellowfin Grouper': 66, 'Comet Grouper': 74, 'Panther Grouper': 64, 'Blacktip Grouper': 68, 'Lunar Grouper': 75, 'Square Spot Grouper': 70, 'Redspotted Grouper': 67, 'Goldribbon Grouper': 72, 'Greasy Grouper': 74, 'Leopard Grouper': 68, 'Barred Soapfish': 78, 'Sixlined Soapfish': 80, 'Blue Pinstripe Hogfish': 62, 'Cuban Hogfish': 62, 'Spotfin Hogfish': 68, 'Spanish Hogfish': 70, 'Peacock Parrotfish': 50, 'Midnight Parrotfish': 55, 'Cleaner Wrasse': 25, 'Yellowtail Coris': 30, 'Divided Wrasse': 28, 'Exquisite Wrasse': 32, 'Dragon Wrasse': 30, 'Leopard Wrasse': 28, 'Lunar Wrasse': 30, 'Sixline Wrasse': 26, 'Melanurus Wrasse': 28, 'Blueprint Sweetlips': 55, 'Clown Sweetlips': 60, 'Oriental Sweetlips': 58, 'Harlequin Sweetlips': 56, 'Painted Grunt': 62, 'Goldspotted Boxfish': 65, 'Scrawled Filefish': 62, 'White-Spotted Burrfish': 68, 'Blue Head Goby': 85, 'Fire Goby': 90, 'Dragon Goby': 72, 'Peppermint Shrimp': 80,
    'Atlantic Torpedo Ray': 80, 'Blue-Spotted Ray': 70, 'Coachwhip Ray': 75, 'Cownose Ray': 70, 'Eagle Ray': 90, 'Electric Ray': 85, 'Jenkins Whipray': 85, 'Marbled Ray': 75, 'Whitespotted Eagle Ray': 90, 'Porcupine Ray': 80, 'Round Ray': 75, 'Rough Tail Stingray': 85, 'Southern Stingray': 80,
    'Blacknose Shark': 120, 'Blacktip Reef Shark': 130, 'Blacktip Shark': 130, 'Blue Shark': 140, 'Bull Shark': 150, 'Caribbean Reef Shark': 135, 'Dusky Shark': 140, 'Lemon Shark': 140, 'Nurse Shark': 120, 'Sandbar Shark': 130, 'Spinner Shark': 130, 'Tiger Shark': 180, 'Whitetip Reef Shark': 125, 'Shortfin Mako Shark': 200, 'Hammerhead Shark': 190,
    'Green Sea Turtle': 200, 'Flatback Sea Turtle': 180, 'Hawksbill Sea Turtle': 180, "Kemp's Ridley Sea Turtle": 170, 'Leatherback Sea Turtle': 250, 'Loggerhead Sea Turtle': 200, 'Olive Ridley Sea Turtle': 170,
    'Giant Grouper': 300, 'Goliath Grouper': 300, 'Atlantic Goliath Grouper': 300, 'Giant Manta Ray': 400, 'Great White Shark': 500, 'Whale Shark': 450, 'Ocean Sunfish': 350, 'Bluefin Tuna': 400, 'Marlin': 450, 'Sailfish': 420, 'Swordfish': 430, 'Orca': 600, 'Humpback Whale': 550, 'Gray Whale': 550, 'Sperm Whale': 550, 'Blue Whale': 600
};

// Bait system
const baitTypes = {
    // Freshwater/Lake Baits
    worms: {
        name: 'Worms',
        price: 500,
        description: 'Great for panfish',
        boosts: ['bluegill', 'sunfish', 'spottedSunfish', 'redbreastSunfish', 'perch', 'rockBass', 'crappie', 'warmouth', 'bullhead'],
        multiplier: 8,
        location: 'lake'
    },
    grubs: {
        name: 'Grubs',
        price: 800,
        description: 'Attracts small fish',
        boosts: ['chub', 'herring', 'whitefish', 'goldfish'],
        multiplier: 8,
        location: 'lake'
    },
    minnows: {
        name: 'Minnows',
        price: 2000,
        description: 'Perfect for bass',
        boosts: ['smallmouthBass', 'largemouthBass', 'whiteBass', 'pike', 'walleye'],
        multiplier: 8,
        location: 'lake'
    },
    spinners: {
        name: 'Spinners',
        price: 5000,
        description: 'Best for trout',
        boosts: ['trout', 'rainbowTrout', 'salmon', 'cherrySalmon', 'cohoSalmon', 'kingSalmon'],
        multiplier: 8,
        location: 'lake'
    },
    leeches: {
        name: 'Leeches',
        price: 8000,
        description: 'Premium for walleye',
        boosts: ['walleye', 'pike', 'muskellunge'],
        multiplier: 8,
        location: 'lake'
    },
    doughBalls: {
        name: 'Dough Balls',
        price: 10000,
        description: 'Carp favorite',
        boosts: ['carp', 'crucianCarp', 'koi'],
        multiplier: 8,
        location: 'lake'
    },
    crawfish: {
        name: 'Crawfish',
        price: 15000,
        description: 'Irresistible to catfish',
        boosts: ['catfish', 'bullhead', 'carp'],
        multiplier: 8,
        location: 'lake'
    },
    cutBait: {
        name: 'Cut Bait',
        price: 20000,
        description: 'For trophy fish',
        boosts: ['sturgeon', 'gar', 'spottedGar', 'shortnoseGar', 'floridaGar', 'muskellunge', 'kingSalmon'],
        multiplier: 8,
        location: 'lake'
    },
    // Ocean/Saltwater Baits
    shrimpBait: {
        name: 'Shrimp Bait',
        price: 1000,
        description: 'Attracts small reef fish',
        boosts: ['anemoneShrimp', 'glassShrimp', 'sexyShrimp', 'bumbleBeeShrimp', 'peppermintShrimp', 'neonGoby', 'redheadGoby', 'caveTransparentGoby'],
        multiplier: 8,
        location: 'ocean'
    },
    squidLures: {
        name: 'Squid Lures',
        price: 2500,
        description: 'Perfect for snappers',
        boosts: ['blueStripeSnapper', 'oneSpotSnapper', 'yellowtailSnapper', 'mangroveSnapper'],
        multiplier: 8,
        location: 'ocean'
    },
    crabPieces: {
        name: 'Crab Pieces',
        price: 4000,
        description: 'Attracts bottom feeders',
        boosts: ['blueCrab', 'arrowCrab', 'emeraldCrab', 'hermitCrab', 'flameGoby', 'fireGoby'],
        multiplier: 8,
        location: 'ocean'
    },
    artificialFlies: {
        name: 'Artificial Flies',
        price: 6000,
        description: 'Great for colorful reef fish',
        boosts: ['clownfish', 'tomato Clownfish', 'cinnamonAnemonefish', 'pinkSkunkAnemonefish', 'clarkiiAnemonefish', 'maroonClownfish', 'sebaeAnemonefish'],
        multiplier: 8,
        location: 'ocean'
    },
    jerkbaits: {
        name: 'Jerkbaits',
        price: 12000,
        description: 'For aggressive predators',
        boosts: ['redLionfish', 'blackfootedLionfish', 'turkeyfish', 'peacockGrouper', 'coralGrouper', 'miniataGrouper'],
        multiplier: 8,
        location: 'ocean'
    },
    liveBaitfish: {
        name: 'Live Baitfish',
        price: 30000,
        description: 'Irresistible to big fish',
        boosts: ['bluefinTuna', 'marlin', 'sailfish', 'swordfish', 'giantGrouper', 'goliathGrouper'],
        multiplier: 8,
        location: 'ocean'
    },
    chum: {
        name: 'Chum',
        price: 50000,
        description: 'Attracts sharks',
        boosts: ['blacknoseShark', 'blacktipShark', 'blueShark', 'bullShark', 'lemonShark', 'tigerShark', 'hammerheadShark', 'greatWhiteShark'],
        multiplier: 8,
        location: 'ocean'
    },
    giantLures: {
        name: 'Giant Lures',
        price: 200000,
        description: 'For massive ocean giants',
        boosts: ['giantMantaRay', 'whaleshark', 'oceanSunfish', 'orca', 'humpbackWhale', 'grayWhale', 'spermWhale', 'blueWhale'],
        multiplier: 8,
        location: 'ocean'
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

// Boat
let boatOwned = false;
const boatPrice = 100000;

// Fishing rods
const fishingRods = [
    { name: 'Plastic Rod', barSizeBonus: 0, price: 0, owned: true, color: '#808080' },
    { name: 'Bamboo Rod', barSizeBonus: 10, price: 5000, owned: false, color: '#D2691E' },
    { name: 'Rubber Rod', barSizeBonus: 20, price: 10000, owned: false, color: '#2F4F4F' },
    { name: 'Iron Rod', barSizeBonus: 30, price: 100000, owned: false, color: '#708090' },
    { name: 'Titanium Rod', barSizeBonus: 40, price: 1000000, owned: false, color: '#C0C0C0' },
    { name: 'Diamond Rod', barSizeBonus: 50, price: 5000000, owned: false, color: '#00CED1' },
    { name: 'Fire Rod', barSizeBonus: 60, price: 10000000, owned: false, color: '#FF4500' },
    { name: 'Ice Rod', barSizeBonus: 70, price: 25000000, owned: false, color: '#87CEEB' },
    { name: 'Wind Rod', barSizeBonus: 80, price: 50000000, owned: false, color: '#98FB98' },
    { name: "Wizard's Rod", barSizeBonus: 100, price: 100000000, owned: false, color: '#9370DB' }
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
            timePlayed = data.timePlayed || 0;
            gameStartTime = Date.now();
            lastUpdateTime = Date.now();
            
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
            
            // Restore museum data
            museum = data.museum || {};
            
            // Migrate museum data to add perfectCatches if missing
            Object.keys(museum).forEach(fishName => {
                if (museum[fishName] && museum[fishName].perfectCatches === undefined) {
                    museum[fishName].perfectCatches = 0;
                }
            });
            
            // Restore boat ownership
            boatOwned = data.boatOwned || false;
            
            // Restore location
            currentLocation = data.currentLocation || 'lake';
            updateLocationDisplay();
            
            // Restore museum completion flags
            freshwaterMuseumCompleted = data.freshwaterMuseumCompleted || false;
            saltwaterMuseumCompleted = data.saltwaterMuseumCompleted || false;
            completeMuseumBonusAwarded = data.completeMuseumBonusAwarded || false;
            
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
        trinketSlotUpgrades: trinketSlotUpgrades.map(u => u.purchased),
        timePlayed: timePlayed,
        museum: museum,
        boatOwned: boatOwned,
        currentLocation: currentLocation,
        freshwaterMuseumCompleted: freshwaterMuseumCompleted,
        saltwaterMuseumCompleted: saltwaterMuseumCompleted,
        completeMuseumBonusAwarded: completeMuseumBonusAwarded
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

    // Santa and sleigh above the moon (Nov 1 - Jan 31)
    if (isSantaSeason()) {
        const santaX = moonX - 80;
        const santaY = moonY - 60;
        
        // Draw all 9 reindeer in formation (4 pairs + Rudolph)
        const reindeerPositions = [
            { x: -130, y: 0, name: 'Rudolph' },  // Front lead
            { x: -115, y: -8, name: 'Dasher' },   // Row 2 top
            { x: -115, y: 8, name: 'Dancer' },    // Row 2 bottom
            { x: -95, y: -8, name: 'Prancer' },   // Row 3 top
            { x: -95, y: 8, name: 'Vixen' },      // Row 3 bottom
            { x: -75, y: -8, name: 'Comet' },     // Row 4 top
            { x: -75, y: 8, name: 'Cupid' },      // Row 4 bottom
            { x: -55, y: -8, name: 'Donner' },    // Row 5 top
            { x: -55, y: 8, name: 'Blitzen' }     // Row 5 bottom
        ];
        
        reindeerPositions.forEach((pos, index) => {
            const reindeerX = santaX + pos.x;
            const reindeerY = santaY + pos.y;
            
            // Reindeer body
            sceneCtx.fillStyle = '#8B4513';
            sceneCtx.fillRect(reindeerX - 6, reindeerY - 2, 10, 6);
            
            // Reindeer head
            sceneCtx.beginPath();
            sceneCtx.arc(reindeerX - 8, reindeerY - 3, 4, 0, Math.PI * 2);
            sceneCtx.fill();
            
            // Legs
            sceneCtx.strokeStyle = '#654321';
            sceneCtx.lineWidth = 1.5;
            sceneCtx.beginPath();
            sceneCtx.moveTo(reindeerX - 4, reindeerY + 4);
            sceneCtx.lineTo(reindeerX - 4, reindeerY + 8);
            sceneCtx.stroke();
            sceneCtx.beginPath();
            sceneCtx.moveTo(reindeerX + 2, reindeerY + 4);
            sceneCtx.lineTo(reindeerX + 2, reindeerY + 8);
            sceneCtx.stroke();
            
            // Antlers
            sceneCtx.lineWidth = 1.5;
            sceneCtx.beginPath();
            sceneCtx.moveTo(reindeerX - 9, reindeerY - 6);
            sceneCtx.lineTo(reindeerX - 11, reindeerY - 10);
            sceneCtx.stroke();
            sceneCtx.beginPath();
            sceneCtx.moveTo(reindeerX - 9, reindeerY - 6);
            sceneCtx.lineTo(reindeerX - 7, reindeerY - 9);
            sceneCtx.stroke();
            sceneCtx.beginPath();
            sceneCtx.moveTo(reindeerX - 7, reindeerY - 6);
            sceneCtx.lineTo(reindeerX - 5, reindeerY - 10);
            sceneCtx.stroke();
            sceneCtx.beginPath();
            sceneCtx.moveTo(reindeerX - 7, reindeerY - 6);
            sceneCtx.lineTo(reindeerX - 6, reindeerY - 8);
            sceneCtx.stroke();
            
            // Red nose only for Rudolph (first one)
            if (index === 0) {
                sceneCtx.fillStyle = '#FF0000';
                sceneCtx.shadowColor = '#FF0000';
                sceneCtx.shadowBlur = 6;
                sceneCtx.beginPath();
                sceneCtx.arc(reindeerX - 11, reindeerY - 3, 2.5, 0, Math.PI * 2);
                sceneCtx.fill();
                sceneCtx.shadowBlur = 0;
            }
            
            // Eye
            sceneCtx.fillStyle = '#000000';
            sceneCtx.beginPath();
            sceneCtx.arc(reindeerX - 9, reindeerY - 4, 1, 0, Math.PI * 2);
            sceneCtx.fill();
        });
        
        // Reins connecting reindeer to sleigh
        sceneCtx.strokeStyle = '#654321';
        sceneCtx.lineWidth = 1;
        for (let i = 0; i < reindeerPositions.length; i++) {
            const pos = reindeerPositions[i];
            sceneCtx.beginPath();
            sceneCtx.moveTo(santaX + pos.x + 4, santaY + pos.y);
            sceneCtx.lineTo(santaX - 40, santaY + 10);
            sceneCtx.stroke();
        }
        
        // Sleigh body - more detailed
        sceneCtx.fillStyle = '#8B0000';
        sceneCtx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        sceneCtx.shadowBlur = 4;
        sceneCtx.shadowOffsetY = 2;
        
        // Main sleigh body with curved shape
        sceneCtx.beginPath();
        sceneCtx.moveTo(santaX - 40, santaY + 8);
        sceneCtx.quadraticCurveTo(santaX - 45, santaY + 15, santaX - 40, santaY + 22);
        sceneCtx.lineTo(santaX + 35, santaY + 22);
        sceneCtx.quadraticCurveTo(santaX + 40, santaY + 15, santaX + 35, santaY + 8);
        sceneCtx.closePath();
        sceneCtx.fill();
        
        sceneCtx.shadowBlur = 0;
        
        // Gold trim on sleigh
        sceneCtx.strokeStyle = '#FFD700';
        sceneCtx.lineWidth = 2;
        sceneCtx.beginPath();
        sceneCtx.moveTo(santaX - 40, santaY + 10);
        sceneCtx.lineTo(santaX + 35, santaY + 10);
        sceneCtx.stroke();
        
        // Sleigh runners - curved
        sceneCtx.strokeStyle = '#C0C0C0';
        sceneCtx.lineWidth = 3;
        sceneCtx.lineCap = 'round';
        sceneCtx.beginPath();
        sceneCtx.moveTo(santaX - 45, santaY + 25);
        sceneCtx.quadraticCurveTo(santaX - 30, santaY + 28, santaX - 20, santaY + 25);
        sceneCtx.stroke();
        sceneCtx.beginPath();
        sceneCtx.moveTo(santaX + 20, santaY + 25);
        sceneCtx.quadraticCurveTo(santaX + 30, santaY + 28, santaX + 40, santaY + 25);
        sceneCtx.stroke();
        
        // Gift bag in sleigh
        sceneCtx.fillStyle = '#654321';
        sceneCtx.fillRect(santaX + 8, santaY + 8, 20, 15);
        sceneCtx.strokeStyle = '#FFD700';
        sceneCtx.lineWidth = 2;
        sceneCtx.beginPath();
        sceneCtx.moveTo(santaX + 18, santaY + 8);
        sceneCtx.lineTo(santaX + 18, santaY + 23);
        sceneCtx.stroke();
        
        // Santa sitting in sleigh
        sceneCtx.fillStyle = '#DC143C';
        // Santa's body/coat
        sceneCtx.fillRect(santaX - 12, santaY + 3, 18, 20);
        
        // Santa's legs
        sceneCtx.fillRect(santaX - 8, santaY + 18, 6, 8);
        sceneCtx.fillRect(santaX + 2, santaY + 18, 6, 8);
        
        // Black boots
        sceneCtx.fillStyle = '#000000';
        sceneCtx.fillRect(santaX - 8, santaY + 24, 6, 4);
        sceneCtx.fillRect(santaX + 2, santaY + 24, 6, 4);
        
        // White fur trim on coat
        sceneCtx.fillStyle = '#FFFFFF';
        sceneCtx.fillRect(santaX - 12, santaY + 21, 18, 3);
        sceneCtx.fillRect(santaX - 12, santaY + 3, 18, 2);
        
        // Santa's arms holding reins
        sceneCtx.fillStyle = '#DC143C';
        sceneCtx.fillRect(santaX - 16, santaY + 6, 8, 4);
        
        // Black gloves
        sceneCtx.fillStyle = '#000000';
        sceneCtx.beginPath();
        sceneCtx.arc(santaX - 17, santaY + 8, 3, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Santa's head
        sceneCtx.fillStyle = '#FFD0B0';
        sceneCtx.beginPath();
        sceneCtx.arc(santaX - 3, santaY - 2, 9, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Santa's hat
        sceneCtx.fillStyle = '#DC143C';
        sceneCtx.beginPath();
        sceneCtx.moveTo(santaX - 11, santaY - 2);
        sceneCtx.lineTo(santaX + 2, santaY - 18);
        sceneCtx.lineTo(santaX + 5, santaY - 2);
        sceneCtx.closePath();
        sceneCtx.fill();
        
        // White fur on hat brim
        sceneCtx.fillStyle = '#FFFFFF';
        sceneCtx.fillRect(santaX - 11, santaY - 2, 16, 3);
        
        // Hat pom-pom
        sceneCtx.beginPath();
        sceneCtx.arc(santaX + 2, santaY - 18, 4, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Santa's beard
        sceneCtx.beginPath();
        sceneCtx.ellipse(santaX - 3, santaY + 2, 6, 5, 0, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Mustache
        sceneCtx.beginPath();
        sceneCtx.ellipse(santaX - 6, santaY - 1, 3, 2, 0, 0, Math.PI * 2);
        sceneCtx.fill();
        sceneCtx.beginPath();
        sceneCtx.ellipse(santaX, santaY - 1, 3, 2, 0, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Rosy cheeks
        sceneCtx.fillStyle = 'rgba(255, 105, 180, 0.4)';
        sceneCtx.beginPath();
        sceneCtx.arc(santaX - 8, santaY + 1, 3, 0, Math.PI * 2);
        sceneCtx.fill();
        sceneCtx.beginPath();
        sceneCtx.arc(santaX + 2, santaY + 1, 3, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Eyes
        sceneCtx.fillStyle = '#000000';
        sceneCtx.beginPath();
        sceneCtx.arc(santaX - 6, santaY - 3, 1.5, 0, Math.PI * 2);
        sceneCtx.fill();
        sceneCtx.beginPath();
        sceneCtx.arc(santaX, santaY - 3, 1.5, 0, Math.PI * 2);
        sceneCtx.fill();
    }

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

    // Snow cover on dock (winter only)
    if (isWinterSeason()) {
        sceneCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        sceneCtx.shadowColor = 'rgba(173, 216, 230, 0.6)';
        sceneCtx.shadowBlur = 8;
        sceneCtx.fillRect(sceneCanvas.width * 0.6, sceneCanvas.height * 0.55, sceneCanvas.width * 0.4, 70);
        sceneCtx.shadowBlur = 0;
        
        // Snow texture (subtle variations)
        sceneCtx.fillStyle = 'rgba(240, 248, 255, 0.4)';
        for (let i = 0; i < 15; i++) {
            const x = sceneCanvas.width * 0.6 + Math.random() * (sceneCanvas.width * 0.4);
            const y = sceneCanvas.height * 0.55 + Math.random() * 70;
            sceneCtx.beginPath();
            sceneCtx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
            sceneCtx.fill();
        }
    }

    // Dock posts - extend from bottom of dock to bottom of screen
    sceneCtx.fillStyle = '#654321';
    const dockBottom = sceneCanvas.height * 0.55 + 70; // Bottom of the dock
    const postHeight = sceneCanvas.height - dockBottom; // From dock bottom to screen bottom
    sceneCtx.fillRect(sceneCanvas.width * 0.65, dockBottom, 15, postHeight);
    sceneCtx.fillRect(sceneCanvas.width * 0.85, dockBottom, 15, postHeight);

    // Fisherman (stick figure) OR Snowman (winter)
    const fishermanX = sceneCanvas.width * 0.62; // Position at left edge of dock
    const fishermanY = sceneCanvas.height * 0.55;

    if (isWinterSeason()) {
        // Draw snowman facing toward the water (left side)
        sceneCtx.shadowColor = 'rgba(173, 216, 230, 0.6)';
        sceneCtx.shadowBlur = 8;
        
        // Bottom snowball (body)
        sceneCtx.fillStyle = '#FFFFFF';
        sceneCtx.beginPath();
        sceneCtx.arc(fishermanX, fishermanY + 15, 28, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Middle snowball
        sceneCtx.beginPath();
        sceneCtx.arc(fishermanX, fishermanY - 20, 22, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Head snowball
        sceneCtx.beginPath();
        sceneCtx.arc(fishermanX, fishermanY - 55, 18, 0, Math.PI * 2);
        sceneCtx.fill();
        
        sceneCtx.shadowBlur = 0;
        
        // Carrot nose (pointing left)
        sceneCtx.fillStyle = '#FF6347';
        sceneCtx.beginPath();
        sceneCtx.moveTo(fishermanX - 18, fishermanY - 55);
        sceneCtx.lineTo(fishermanX - 35, fishermanY - 53);
        sceneCtx.lineTo(fishermanX - 18, fishermanY - 50);
        sceneCtx.fill();
        
        // Coal eyes (looking left)
        sceneCtx.fillStyle = '#000000';
        sceneCtx.beginPath();
        sceneCtx.arc(fishermanX - 12, fishermanY - 59, 3, 0, Math.PI * 2);
        sceneCtx.fill();
        sceneCtx.beginPath();
        sceneCtx.arc(fishermanX - 2, fishermanY - 60, 3, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Coal smile
        for (let i = 0; i < 5; i++) {
            sceneCtx.beginPath();
            const angle = (Math.PI / 6) * (i - 2);
            const smileX = fishermanX + Math.sin(angle) * 10;
            const smileY = fishermanY - 45 + Math.cos(angle) * 5;
            sceneCtx.arc(smileX, smileY, 2, 0, Math.PI * 2);
            sceneCtx.fill();
        }
        
        // Coal buttons
        sceneCtx.beginPath();
        sceneCtx.arc(fishermanX, fishermanY - 28, 3, 0, Math.PI * 2);
        sceneCtx.fill();
        sceneCtx.beginPath();
        sceneCtx.arc(fishermanX, fishermanY - 18, 3, 0, Math.PI * 2);
        sceneCtx.fill();
        sceneCtx.beginPath();
        sceneCtx.arc(fishermanX, fishermanY - 8, 3, 0, Math.PI * 2);
        sceneCtx.fill();
        
        // Top hat
        sceneCtx.fillStyle = '#1a1a1a';
        sceneCtx.fillRect(fishermanX - 22, fishermanY - 73, 44, 8);
        sceneCtx.fillRect(fishermanX - 15, fishermanY - 100, 30, 27);
        
        // Hat band
        sceneCtx.fillStyle = '#8B0000';
        sceneCtx.fillRect(fishermanX - 15, fishermanY - 78, 30, 5);
        
        // Both stick arms holding fishing rod
        sceneCtx.strokeStyle = '#654321';
        sceneCtx.lineWidth = 4;
        sceneCtx.lineCap = 'round';
        
        // Right arm (holding bottom of rod)
        sceneCtx.beginPath();
        sceneCtx.moveTo(fishermanX + 22, fishermanY - 15);
        sceneCtx.lineTo(fishermanX - 20, fishermanY - 5);
        sceneCtx.stroke();
        
        // Right hand fingers on rod
        sceneCtx.lineWidth = 2;
        sceneCtx.beginPath();
        sceneCtx.moveTo(fishermanX - 20, fishermanY - 5);
        sceneCtx.lineTo(fishermanX - 22, fishermanY - 8);
        sceneCtx.stroke();
        sceneCtx.beginPath();
        sceneCtx.moveTo(fishermanX - 20, fishermanY - 5);
        sceneCtx.lineTo(fishermanX - 23, fishermanY - 3);
        sceneCtx.stroke();
        
        // Left arm (holding middle of rod)
        sceneCtx.lineWidth = 4;
        sceneCtx.beginPath();
        sceneCtx.moveTo(fishermanX - 22, fishermanY - 20);
        sceneCtx.lineTo(fishermanX - 50, fishermanY - 25);
        sceneCtx.stroke();
        
        // Left hand fingers on rod
        sceneCtx.lineWidth = 2;
        sceneCtx.beginPath();
        sceneCtx.moveTo(fishermanX - 50, fishermanY - 25);
        sceneCtx.lineTo(fishermanX - 52, fishermanY - 28);
        sceneCtx.stroke();
        sceneCtx.beginPath();
        sceneCtx.moveTo(fishermanX - 50, fishermanY - 25);
        sceneCtx.lineTo(fishermanX - 53, fishermanY - 23);
        sceneCtx.stroke();
        
    } else {
        // Normal fisherman (original code)
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

    // Get fishing rod color based on current rod
    function getRodColor(rodIndex) {
        switch(rodIndex) {
            case 0: return '#8B4513'; // Plastic Rod - brown
            case 1: return '#D2B48C'; // Bamboo Rod - tan
            case 2: return '#2F4F4F'; // Rubber Rod - dark slate gray
            case 3: return '#778899'; // Iron Rod - light slate gray
            case 4: return '#B0C4DE'; // Titanium Rod - light steel blue
            default: return '#654321'; // Default brown
        }
    }

    // Fishing rod (adjusted position based on winter/normal)
    if (isWinterSeason()) {
        // Snowman holding rod with both hands - rod extends from lower hand toward water (left)
        sceneCtx.strokeStyle = getRodColor(currentRodIndex);
        sceneCtx.lineWidth = 4;
        sceneCtx.beginPath();
        sceneCtx.moveTo(fishermanX - 20, fishermanY - 5);
        sceneCtx.lineTo(fishermanX - 110, fishermanY - 30);
        sceneCtx.stroke();
    } else {
        // Normal fisherman rod position
        sceneCtx.strokeStyle = getRodColor(currentRodIndex);
        sceneCtx.lineWidth = 4;
        sceneCtx.beginPath();
        sceneCtx.moveTo(fishermanX + 40, fishermanY - 40);
        sceneCtx.lineTo(fishermanX + 100, fishermanY - 80);
        sceneCtx.stroke();
    }

    // Fishing line (adjusted based on season)
    const lineStartX = isWinterSeason() ? fishermanX - 110 : fishermanX + 100;
    const lineStartY = isWinterSeason() ? fishermanY - 30 : fishermanY - 80;
    
    sceneCtx.strokeStyle = '#333';
    sceneCtx.lineWidth = 1;
    sceneCtx.beginPath();
    sceneCtx.moveTo(lineStartX, lineStartY);
    sceneCtx.lineTo(sceneCanvas.width * 0.4, sceneCanvas.height * 0.75);
    sceneCtx.stroke();

    // Bobber
    sceneCtx.fillStyle = '#FF4500';
    sceneCtx.beginPath();
    sceneCtx.arc(sceneCanvas.width * 0.4, sceneCanvas.height * 0.75 + Math.sin(Date.now() / 300) * 3, 8, 0, Math.PI * 2);
    sceneCtx.fill();
    
    // Draw boat if owned
    if (boatOwned) {
        const boatX = sceneCanvas.width * 0.15;
        const boatY = sceneCanvas.height * 0.68;
        const boatWidth = 120;
        const boatHeight = 40;
        
        // Boat hull
        sceneCtx.fillStyle = '#8B4513';
        sceneCtx.beginPath();
        sceneCtx.moveTo(boatX, boatY);
        sceneCtx.lineTo(boatX + boatWidth, boatY);
        sceneCtx.lineTo(boatX + boatWidth - 15, boatY + boatHeight);
        sceneCtx.lineTo(boatX + 15, boatY + boatHeight);
        sceneCtx.closePath();
        sceneCtx.fill();
        
        // Boat rim
        sceneCtx.strokeStyle = '#654321';
        sceneCtx.lineWidth = 3;
        sceneCtx.stroke();
        
        // Boat interior
        sceneCtx.fillStyle = '#A0522D';
        sceneCtx.fillRect(boatX + 20, boatY + 5, boatWidth - 40, boatHeight - 15);
        
        // Seats
        sceneCtx.fillStyle = '#8B4513';
        sceneCtx.fillRect(boatX + 25, boatY + 15, boatWidth - 50, 8);
        
        // Store boat bounds for click detection
        window.boatBounds = {
            x: boatX,
            y: boatY,
            width: boatWidth,
            height: boatHeight
        };
    }
    
    // Location indicator in top-left corner
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
    
    // Select fish pool based on location
    const fishPool = currentLocation === 'ocean' ? oceanFishTypes : fishTypes;
    const fishKeys = Object.keys(fishPool);
    
    let selectedFish = fishKeys[0];
    
    // If bait is equipped, 90% chance to get a boosted fish type
    if (currentBait && baitTypes[currentBait].boosts.length > 0) {
        const boostedFish = baitTypes[currentBait].boosts;
        
        if (Math.random() < 0.9) {
            // 90% chance: pick from boosted fish only
            const totalBoostedWeight = boostedFish.reduce((sum, key) => {
                return fishPool[key] ? sum + fishPool[key].spawnWeight : sum;
            }, 0);
            
            let random = Math.random() * totalBoostedWeight;
            for (const key of boostedFish) {
                if (fishPool[key]) {
                    random -= fishPool[key].spawnWeight;
                    if (random <= 0) {
                        selectedFish = key;
                        break;
                    }
                }
            }
        } else {
            // 10% chance: normal weighted random from all fish
            const totalWeight = fishKeys.reduce((sum, key) => {
                return sum + fishPool[key].spawnWeight;
            }, 0);
            
            let random = Math.random() * totalWeight;
            for (const key of fishKeys) {
                random -= fishPool[key].spawnWeight;
                if (random <= 0) {
                    selectedFish = key;
                    break;
                }
            }
        }
    } else {
        // No bait equipped: normal weighted random
        const totalWeight = fishKeys.reduce((sum, key) => {
            return sum + fishPool[key].spawnWeight;
        }, 0);
        
        let random = Math.random() * totalWeight;
        for (const key of fishKeys) {
            random -= fishPool[key].spawnWeight;
            if (random <= 0) {
                selectedFish = key;
                break;
            }
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
    
    currentFish = fishPool[selectedFish];
    console.log('Current fish:', currentFish);
    
    // Generate random weight for this fish
    let weightRoll = Math.random();
    
    // Apply trophy odds bonus from equipped trinkets
    const trophyOddsBonus = getTrinketBonus('trophyOdds');
    if (trophyOddsBonus > 0) {
        // Push the random roll toward 1 (higher weight)
        weightRoll = weightRoll + (1 - weightRoll) * trophyOddsBonus;
    }
    
    currentFishWeight = Math.round((weightRoll * (currentFish.maxWeight - currentFish.minWeight) + currentFish.minWeight) * 1000) / 1000;
    
    // Apply weight bonus from equipped trinkets
    const weightBonus = getTrinketBonus('weightBonus');
    if (weightBonus > 0) {
        const weightRange = currentFish.maxWeight - currentFish.minWeight;
        currentFishWeight = Math.round((currentFishWeight + (weightRange * weightBonus)) * 1000) / 1000;
        // Clamp to max weight
        currentFishWeight = Math.min(currentFishWeight, currentFish.maxWeight);
    }
    
    // Generate length based on the percentage of weight relative to max weight
    if (currentFish.minLength !== undefined && currentFish.maxLength !== undefined) {
        // Calculate what percentage the current weight is of the max weight
        const weightPercentage = (currentFishWeight - currentFish.minWeight) / (currentFish.maxWeight - currentFish.minWeight);
        // Apply the same percentage to length
        currentFishLength = Math.round((weightPercentage * (currentFish.maxLength - currentFish.minLength) + currentFish.minLength) * 10) / 10;
    } else {
        currentFishLength = 0;
    }
    
    // Determine fish rarity upfront for visual effects during minigame
    const rarityRoll = Math.random();
    if (rarityRoll < 1/4000) { // 1/4000 chance for shiny
        currentFishRarity = 'shiny';
    } else if (rarityRoll < 1/1000) { // 1/1000 chance for golden
        currentFishRarity = 'golden';
    } else if (rarityRoll < 1/100) { // 1/100 chance for mutated
        currentFishRarity = 'mutated';
    } else {
        currentFishRarity = 'normal';
    }
    
    // Calculate weight factor (0 to 1, where 1 is maximum weight for this species)
    const weightFactor = (currentFishWeight - currentFish.minWeight) / (currentFish.maxWeight - currentFish.minWeight);
    
    // Define difficulty-based scaling factors to keep fish in their categories
    let difficultyScaling = {
        speedMultiplier: 0.3,     // Easy fish: up to 30% speed increase
        randomnessMultiplier: 0.4, // Easy fish: up to 40% randomness increase
        intervalMultiplier: 0.25,  // Easy fish: up to 25% more frequent changes
        barSizeReduction: 0.1      // Easy fish: up to 10% smaller bar
    };
    
    if (currentFish.difficulty === 'Average') {
        difficultyScaling = {
            speedMultiplier: 0.5,     // Average fish: up to 50% speed increase
            randomnessMultiplier: 0.6, // Average fish: up to 60% randomness increase
            intervalMultiplier: 0.35,  // Average fish: up to 35% more frequent changes
            barSizeReduction: 0.15     // Average fish: up to 15% smaller bar
        };
    } else if (currentFish.difficulty === 'Hard') {
        difficultyScaling = {
            speedMultiplier: 0.8,     // Hard fish: up to 80% speed increase
            randomnessMultiplier: 1.0, // Hard fish: up to 100% randomness increase
            intervalMultiplier: 0.5,   // Hard fish: up to 50% more frequent changes
            barSizeReduction: 0.25     // Hard fish: up to 25% smaller bar
        };
    }
    
    // Calculate absolute size-based bonus (massive multipliers for truly giant creatures)
    let absoluteSizeBonus = 1;
    if (currentFishWeight >= 100000) {
        // Ultra-massive fish (100,000+ lbs): Absolutely brutal multiplier
        absoluteSizeBonus = 3.5;
    } else if (currentFishWeight >= 50000) {
        // Super-massive fish (50,000-99,999 lbs): Extreme multiplier
        absoluteSizeBonus = 3.0;
    } else if (currentFishWeight >= 10000) {
        // Massive fish (10,000-49,999 lbs): Very high multiplier
        absoluteSizeBonus = 2.5;
    } else if (currentFishWeight >= 5000) {
        // Very large fish (5,000-9,999 lbs): High multiplier
        absoluteSizeBonus = 2.0;
    } else if (currentFishWeight >= 1000) {
        // Giant fish (1,000-4,999 lbs): Significant multiplier
        absoluteSizeBonus = 1.6;
    } else if (currentFishWeight >= 500) {
        // Large fish (500-999 lbs): Moderate multiplier
        absoluteSizeBonus = 1.4;
    } else if (currentFishWeight >= 100) {
        // Medium-large fish (100-499 lbs): Small multiplier
        absoluteSizeBonus = 1.2;
    } else if (currentFishWeight >= 50) {
        // Medium fish (50-99 lbs): Very small multiplier
        absoluteSizeBonus = 1.1;
    }
    
    // Adjust difficulty based on weight within the fish's difficulty category
    // Heavier specimens of each species are more challenging, with massive creatures being absolutely brutal
    const weightAdjustedSpeed = currentFish.fishSpeed * (1 + weightFactor * difficultyScaling.speedMultiplier * absoluteSizeBonus);
    const weightAdjustedRandomness = currentFish.fishRandomness * (1 + weightFactor * difficultyScaling.randomnessMultiplier * absoluteSizeBonus);
    const weightAdjustedInterval = currentFish.fishChangeInterval * (1 - weightFactor * difficultyScaling.intervalMultiplier * Math.min(absoluteSizeBonus, 2.0));
    
    statusDiv.textContent = 'Left click to move bar left, right click to move bar right!';
    
    console.log('Hiding scene canvas, showing minigame canvas');
    sceneCanvas.style.display = 'none';
    minigameCanvas.style.display = 'block';
    console.log('Canvas display states - scene:', sceneCanvas.style.display, 'minigame:', minigameCanvas.style.display);
    
    // Reset minigame variables for circular ring design
    // Use constant bar size for all fish (no difficulty/weight adjustment)
    let barSizeInDegrees = (80 + (fishingRods[currentRodIndex]?.barSizeBonus || 0)) / 2;
    
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
    const rotationAcceleration = 0.0025; // Reduced for smoother acceleration
    const maxRotationSpeed = 0.07; // Slightly reduced max speed for more control
    const rotationDrag = 0.92; // Increased drag for smoother gliding (closer to 1 = less drag)
    const inputDrag = 0.96; // Drag applied even when holding input for smoother feel
    
    if (leftMouseDown) {
        barAngularSpeed -= rotationAcceleration * deltaMultiplier; // Counter-clockwise
        barAngularSpeed *= Math.pow(inputDrag, deltaMultiplier); // Apply smoothing during input
    } else if (rightMouseDown) {
        barAngularSpeed += rotationAcceleration * deltaMultiplier; // Clockwise
        barAngularSpeed *= Math.pow(inputDrag, deltaMultiplier); // Apply smoothing during input
    } else {
        // Apply stronger drag when no input for smooth deceleration
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
    
    // Add glow effect for rare fish
    if (currentFishRarity === 'shiny') {
        // Shiny: Rainbow sparkle glow
        const glowSize = 40;
        const gradient = minigameCtx.createRadialGradient(fishX, fishY, 0, fishX, fishY, glowSize);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
        gradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.5)');
        gradient.addColorStop(0.6, 'rgba(255, 105, 180, 0.4)');
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
        minigameCtx.fillStyle = gradient;
        minigameCtx.beginPath();
        minigameCtx.arc(fishX, fishY, glowSize, 0, Math.PI * 2);
        minigameCtx.fill();
        
        // Add sparkle particles
        for (let i = 0; i < 3; i++) {
            const sparkleAngle = (Date.now() / 500 + i * (Math.PI * 2 / 3)) % (Math.PI * 2);
            const sparkleDistance = 20 + Math.sin(Date.now() / 300 + i) * 5;
            const sparkleX = fishX + Math.cos(sparkleAngle) * sparkleDistance;
            const sparkleY = fishY + Math.sin(sparkleAngle) * sparkleDistance;
            minigameCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            minigameCtx.beginPath();
            minigameCtx.arc(sparkleX, sparkleY, 3, 0, Math.PI * 2);
            minigameCtx.fill();
        }
    } else if (currentFishRarity === 'golden') {
        // Golden: Bright gold glow
        const glowSize = 40;
        const gradient = minigameCtx.createRadialGradient(fishX, fishY, 0, fishX, fishY, glowSize);
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.7)');
        gradient.addColorStop(0.4, 'rgba(255, 223, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        minigameCtx.fillStyle = gradient;
        minigameCtx.beginPath();
        minigameCtx.arc(fishX, fishY, glowSize, 0, Math.PI * 2);
        minigameCtx.fill();
    } else if (currentFishRarity === 'mutated') {
        // Mutated: Purple/pink glow
        const glowSize = 40;
        const gradient = minigameCtx.createRadialGradient(fishX, fishY, 0, fishX, fishY, glowSize);
        gradient.addColorStop(0, 'rgba(156, 39, 176, 0.7)');
        gradient.addColorStop(0.4, 'rgba(233, 30, 99, 0.5)');
        gradient.addColorStop(1, 'rgba(156, 39, 176, 0)');
        minigameCtx.fillStyle = gradient;
        minigameCtx.beginPath();
        minigameCtx.arc(fishX, fishY, glowSize, 0, Math.PI * 2);
        minigameCtx.fill();
    }
    
    // Fish icon (circular) - use rarity color if rare
    let fishColor = currentFish.color;
    if (currentFishRarity === 'shiny') {
        fishColor = '#FFD700'; // Gold
    } else if (currentFishRarity === 'golden') {
        fishColor = '#FFD700'; // Gold
    } else if (currentFishRarity === 'mutated') {
        fishColor = '#9C27B0'; // Purple
    }
    
    minigameCtx.fillStyle = fishColor;
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
            finalWeight = Math.round(currentFishWeight * 1.30 * 1000) / 1000; // 30% bonus with 3 decimals
            perfectCatchBonus = ` ⭐ PERFECT CATCH! +30% weight!`;
        }
        
        // Use the pre-determined rarity from minigame start
        let rarity = currentFishRarity;
        let rarityMultiplier = 1;
        let rarityText = '';
        
        if (rarity === 'shiny') {
            rarityMultiplier = 4000;
            rarityText = ' ✨ SHINY! 4000x value!';
        } else if (rarity === 'golden') {
            rarityMultiplier = 1000;
            rarityText = ' 🌟 GOLDEN! 1000x value!';
        } else if (rarity === 'mutated') {
            rarityMultiplier = 100;
            rarityText = ' 🧬 MUTATED! 100x value!';
        }
        
        // Add fish to inventory
        if (inventory.length < maxInventorySlots) {
            inventory.push({
                type: currentFish.name,
                weight: finalWeight,
                length: currentFishLength,
                rarity: rarity,
                rarityMultiplier: rarityMultiplier
            });
            
            // Update museum records
            if (!museum[currentFish.name]) {
                museum[currentFish.name] = {
                    discovered: true,
                    totalCaught: 0,
                    biggestWeight: 0,
                    longestLength: 0,
                    perfectCatches: 0,
                    showcaseFish: null
                };
            }
            museum[currentFish.name].totalCaught++;
            if (isPerfectCatch) {
                museum[currentFish.name].perfectCatches++;
            }
            if (finalWeight > museum[currentFish.name].biggestWeight) {
                museum[currentFish.name].biggestWeight = finalWeight;
            }
            if (currentFishLength > museum[currentFish.name].longestLength) {
                museum[currentFish.name].longestLength = currentFishLength;
            }
            
            statusDiv.textContent = `🐟 You caught a ${currentFish.name} weighing ${formatWeight(currentFishWeight)} lbs and ${currentFishLength}" long!${perfectCatchBonus}${rarityText} (${inventory.length}/${maxInventorySlots})`;
            updateInventoryDisplay();
            saveGameData();
        } else {
            statusDiv.textContent = `🐟 You caught a ${currentFish.name} weighing ${formatWeight(currentFishWeight)} lbs and ${currentFishLength}" long!${perfectCatchBonus}${rarityText} But your inventory is full!`;
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

// Keyboard controls (A/D or Arrow keys for minigame, Space for casting)
document.addEventListener('keydown', (e) => {
    if (minigameActive) {
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
            leftMouseDown = true;
            e.preventDefault();
        } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
            rightMouseDown = true;
            e.preventDefault();
        }
    } else if (!minigameActive && currentPage === 'fishing' && e.code === 'Space') {
        e.preventDefault(); // Prevent page scrolling
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
        
        // Only show baits for the current location
        if (bait.location !== currentLocation) {
            return; // Skip this bait
        }
        
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
        // Different icons for lake vs ocean bait
        icon.textContent = bait.location === 'lake' ? '🪱' : '🦐';
        
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

function updateRodPopup() {
    const rodGrid = document.getElementById('rod-popup-grid');
    rodGrid.innerHTML = '';
    
    // Add current rod info at the top
    const currentRodHeader = document.createElement('div');
    currentRodHeader.style.gridColumn = '1 / -1';
    currentRodHeader.style.padding = '15px';
    currentRodHeader.style.background = 'rgba(139, 69, 19, 0.3)';
    currentRodHeader.style.borderRadius = '8px';
    currentRodHeader.style.textAlign = 'center';
    currentRodHeader.style.fontWeight = 'bold';
    currentRodHeader.style.fontSize = '18px';
    currentRodHeader.style.color = '#8B4513';
    currentRodHeader.style.marginBottom = '10px';
    currentRodHeader.textContent = `Current Rod: ${fishingRods[currentRodIndex].name}`;
    rodGrid.appendChild(currentRodHeader);
    
    fishingRods.forEach((rod, index) => {
        const isOwned = rod.owned;
        const isEquipped = currentRodIndex === index;
        
        const rodSlot = document.createElement('div');
        rodSlot.className = 'rod-slot';
        
        if (!isOwned) {
            rodSlot.classList.add('locked');
        }
        
        if (isEquipped) {
            rodSlot.classList.add('equipped');
        }
        
        const icon = document.createElement('div');
        icon.className = 'rod-slot-icon';
        icon.textContent = '🎣';
        
        const name = document.createElement('div');
        name.className = 'rod-slot-name';
        name.textContent = rod.name;
        if (isEquipped) {
            name.textContent += ' ✓';
        }
        // Apply rod color to the name
        if (rod.color) {
            name.style.color = rod.color;
            name.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.7)';
        }
        
        const desc = document.createElement('div');
        desc.className = 'rod-slot-desc';
        desc.textContent = rod.barSizeBonus > 0 ? `Catch Zone: +${rod.barSizeBonus}` : 'Standard fishing rod';
        
        const status = document.createElement('div');
        status.className = 'rod-slot-status';
        if (isOwned) {
            status.textContent = isEquipped ? 'Equipped' : 'Owned';
            status.style.color = isEquipped ? '#FF6B6B' : '#666';
            status.style.fontWeight = isEquipped ? 'bold' : 'normal';
        } else {
            status.textContent = 'Not owned';
            status.style.color = '#999';
        }
        
        rodSlot.appendChild(icon);
        rodSlot.appendChild(name);
        rodSlot.appendChild(desc);
        rodSlot.appendChild(status);
        
        // Click to equip
        if (isOwned && !isEquipped) {
            rodSlot.addEventListener('click', () => {
                currentRodIndex = index;
                saveGameData();
                updateRodPopup();
            });
        }
        
        rodGrid.appendChild(rodSlot);
    });
}

function displayFishInMuseum(inventoryIndex) {
    const fish = inventory[inventoryIndex];
    if (!fish) return;
    
    // Helper function to get rarity display text
    const getRarityText = (rarity) => {
        if (rarity === 'shiny') return '✨ SHINY';
        if (rarity === 'golden') return '🌟 GOLDEN';
        if (rarity === 'mutated') return '🧬 MUTATED';
        return 'Normal';
    };
    
    // Check if museum already has a showcase fish for this type
    const hasExistingDisplay = museum[fish.type] && museum[fish.type].showcaseFish;
    
    let confirmMessage;
    if (!museum[fish.type] || !museum[fish.type].discovered) {
        // New fish being added to museum
        const newRarity = getRarityText(fish.rarity || 'normal');
        confirmMessage = `Add this ${fish.type} (${formatWeight(fish.weight)} lbs, ${fish.length || 0}") to the museum?\n\nRarity: ${newRarity}\n\nThis fish will be removed from your inventory and displayed in the museum.`;
    } else if (hasExistingDisplay) {
        // Replacing existing display
        const currentWeight = museum[fish.type].showcaseFish.weight;
        const currentLength = museum[fish.type].showcaseFish.length || 0;
        const currentRarity = getRarityText(museum[fish.type].showcaseFish.rarity || 'normal');
        const newRarity = getRarityText(fish.rarity || 'normal');
        confirmMessage = `Replace the current museum display?\n\nCurrent: ${fish.type} (${formatWeight(currentWeight)} lbs, ${currentLength}") - ${currentRarity}\nNew: ${fish.type} (${formatWeight(fish.weight)} lbs, ${fish.length || 0}") - ${newRarity}\n\nThis fish will be removed from your inventory.`;
    } else {
        // Adding display to discovered fish
        const newRarity = getRarityText(fish.rarity || 'normal');
        confirmMessage = `Display this ${fish.type} (${formatWeight(fish.weight)} lbs, ${fish.length || 0}") in the museum?\n\nRarity: ${newRarity}\n\nThis fish will be removed from your inventory.`;
    }
    
    // Show custom confirmation popup
    showMuseumConfirmation(confirmMessage, () => {
        // User confirmed - proceed with museum display
        
        // Initialize museum entry if it doesn't exist
        if (!museum[fish.type]) {
            museum[fish.type] = {
                discovered: true,
                totalCaught: 0,
                biggestWeight: 0,
                showcaseFish: null
            };
        }
        
        // Store the fish data in museum showcase
        museum[fish.type].showcaseFish = {
            weight: fish.weight,
            rarity: fish.rarity || 'normal',
            rarityMultiplier: fish.rarityMultiplier || 1
        };
        
        // Remove fish from inventory
        inventory.splice(inventoryIndex, 1);
        
        // Check for museum completion
        checkMuseumCompletion();
        
        // Update displays
        updateInventoryDisplay();
        saveGameData();
        
        // Update museum display if it's currently open
        if (currentPage === 'museum') {
            updateMuseumDisplay();
        }
        
        // Show confirmation message
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = `🏛️ ${fish.type} is now displayed in the museum!`;
        statusDiv.style.opacity = '1';
        setTimeout(() => {
            statusDiv.style.opacity = '0';
        }, 3000);
    });
}

function checkMuseumCompletion() {
    const freshwaterFish = Object.values(fishTypes);
    const saltwaterFish = Object.values(oceanFishTypes);
    
    // Check freshwater completion
    if (!freshwaterMuseumCompleted) {
        const allFreshwaterHaveDisplay = freshwaterFish.every(fishType => {
            const museumData = museum[fishType.name];
            return museumData && museumData.showcaseFish;
        });
        
        if (allFreshwaterHaveDisplay) {
            freshwaterMuseumCompleted = true;
            money += 200000;
            saveGameData();
            updateMoneyDisplay();
            
            // Show reward message
            const statusDiv = document.getElementById('status');
            statusDiv.textContent = `🎉 FRESHWATER MUSEUM COMPLETED! You've earned $200,000!`;
            statusDiv.style.opacity = '1';
            statusDiv.style.fontSize = '24px';
            statusDiv.style.fontWeight = 'bold';
            setTimeout(() => {
                statusDiv.style.opacity = '0';
                statusDiv.style.fontSize = '18px';
                statusDiv.style.fontWeight = 'normal';
            }, 5000);
        }
    }
    
    // Check saltwater completion
    if (!saltwaterMuseumCompleted) {
        const allSaltwaterHaveDisplay = saltwaterFish.every(fishType => {
            const museumData = museum[fishType.name];
            return museumData && museumData.showcaseFish;
        });
        
        if (allSaltwaterHaveDisplay) {
            saltwaterMuseumCompleted = true;
            money += 1000000;
            saveGameData();
            updateMoneyDisplay();
            
            // Show reward message
            const statusDiv = document.getElementById('status');
            statusDiv.textContent = `🎉 SALTWATER MUSEUM COMPLETED! You've earned $1,000,000!`;
            statusDiv.style.opacity = '1';
            statusDiv.style.fontSize = '24px';
            statusDiv.style.fontWeight = 'bold';
            setTimeout(() => {
                statusDiv.style.opacity = '0';
                statusDiv.style.fontSize = '18px';
                statusDiv.style.fontWeight = 'normal';
            }, 5000);
        }
    }
    
    // Check if both museums are completed for the ultimate bonus
    if (freshwaterMuseumCompleted && saltwaterMuseumCompleted && !completeMuseumBonusAwarded) {
        completeMuseumBonusAwarded = true;
        money += 2000000;
        saveGameData();
        updateMoneyDisplay();
        
        // Show ultimate completion message
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = `🏆 COMPLETE MUSEUM MASTERY! You've earned an additional $2,000,000!`;
        statusDiv.style.opacity = '1';
        statusDiv.style.fontSize = '26px';
        statusDiv.style.fontWeight = 'bold';
        statusDiv.style.color = '#FFD700'; // Gold color
        setTimeout(() => {
            statusDiv.style.opacity = '0';
            statusDiv.style.fontSize = '18px';
            statusDiv.style.fontWeight = 'normal';
            statusDiv.style.color = '';
        }, 6000);
    }
}

function showMuseumConfirmation(message, onConfirm) {
    const popup = document.getElementById('museum-confirm-popup');
    const messageElement = document.getElementById('museum-confirm-message');
    const yesButton = document.getElementById('museum-confirm-yes');
    const noButton = document.getElementById('museum-confirm-no');
    
    messageElement.textContent = message;
    popup.style.display = 'block';
    
    // Remove old event listeners by cloning buttons
    const newYesButton = yesButton.cloneNode(true);
    const newNoButton = noButton.cloneNode(true);
    yesButton.parentNode.replaceChild(newYesButton, yesButton);
    noButton.parentNode.replaceChild(newNoButton, noButton);
    
    // Add new event listeners
    newYesButton.addEventListener('click', () => {
        popup.style.display = 'none';
        onConfirm();
    });
    
    newNoButton.addEventListener('click', () => {
        popup.style.display = 'none';
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
            
            // Apply rarity styling
            const rarity = fish.rarity || 'normal';
            if (rarity === 'shiny') {
                slot.style.background = 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)';
                slot.style.boxShadow = '0 0 15px #FFD700';
                slot.style.borderColor = '#FFD700';
            } else if (rarity === 'golden') {
                slot.style.background = 'linear-gradient(135deg, #FFD700, #FFED4E)';
                slot.style.boxShadow = '0 0 10px #FFD700';
                slot.style.borderColor = '#FFD700';
            } else if (rarity === 'mutated') {
                slot.style.background = 'linear-gradient(135deg, #9C27B0, #E91E63)';
                slot.style.boxShadow = '0 0 10px #9C27B0';
                slot.style.borderColor = '#9C27B0';
            }
            
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
            
            // Check if this fish type has a display fish in museum
            const museumData = museum[fish.type];
            const hasDisplayFish = museumData && museumData.showcaseFish;
            
            // Display fish indicator
            if (hasDisplayFish) {
                const displayIndicator = document.createElement('div');
                displayIndicator.className = 'has-display-indicator';
                const rarity = museumData.showcaseFish.rarity;
                if (rarity === 'shiny') {
                    displayIndicator.textContent = '✨';
                    displayIndicator.title = 'Shiny fish displayed in museum';
                } else if (rarity === 'golden') {
                    displayIndicator.textContent = '🌟';
                    displayIndicator.title = 'Golden fish displayed in museum';
                } else if (rarity === 'mutated') {
                    displayIndicator.textContent = '🧬';
                    displayIndicator.title = 'Mutated fish displayed in museum';
                } else {
                    displayIndicator.textContent = '📍';
                    displayIndicator.title = 'Fish displayed in museum';
                }
                fishName.appendChild(displayIndicator);
            }
            
            // Fish weight
            const fishWeight = document.createElement('div');
            fishWeight.className = 'fish-weight';
            fishWeight.textContent = `${formatWeight(fish.weight)} lbs`;
            
            // Fish length
            const fishLength = document.createElement('div');
            fishLength.className = 'fish-length';
            fishLength.textContent = `${fish.length || 0}"`;
            
            // Museum button
            const museumBtn = document.createElement('button');
            museumBtn.className = 'museum-display-btn';
            museumBtn.textContent = '🏛️';
            museumBtn.title = 'Display in Museum';
            museumBtn.onclick = (e) => {
                e.stopPropagation();
                displayFishInMuseum(i);
            };
            
            slot.appendChild(fishIcon);
            slot.appendChild(fishName);
            slot.appendChild(fishWeight);
            slot.appendChild(fishLength);
            slot.appendChild(museumBtn);
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

// Rod inventory popup
document.getElementById('rod-button').addEventListener('click', () => {
    const popup = document.getElementById('rod-popup');
    popup.style.display = 'block';
    updateRodPopup();
});

// Close rod popup
document.getElementById('close-rod-popup').addEventListener('click', () => {
    document.getElementById('rod-popup').style.display = 'none';
});

// Shop navigation
const shopCanvas = document.getElementById('shop-canvas');
const shopCtx = shopCanvas.getContext('2d');
shopCanvas.width = window.innerWidth;
shopCanvas.height = window.innerHeight;

// Scene canvas click handler for boat
sceneCanvas.addEventListener('click', (e) => {
    if (!boatOwned || fishing) return;
    
    const rect = sceneCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if click is within boat bounds
    if (window.boatBounds && 
        x >= window.boatBounds.x && 
        x <= window.boatBounds.x + window.boatBounds.width &&
        y >= window.boatBounds.y && 
        y <= window.boatBounds.y + window.boatBounds.height) {
        
        // Toggle between lake and ocean
        if (currentLocation === 'lake') {
            const confirmed = confirm('Travel to the ocean?\n\nYou will be able to catch ocean fish there.');
            if (confirmed) {
                currentLocation = 'ocean';
                localStorage.setItem('currentLocation', currentLocation);
                updateLocationDisplay();
                console.log('Switched to ocean location');
            }
        } else {
            const confirmed = confirm('Return to the lake?\n\nYou will be able to catch lake fish there.');
            if (confirmed) {
                currentLocation = 'lake';
                localStorage.setItem('currentLocation', currentLocation);
                updateLocationDisplay();
                console.log('Switched to lake location');
            }
        }
    }
});

// Scene canvas mousemove for boat cursor
sceneCanvas.addEventListener('mousemove', (e) => {
    if (!boatOwned || fishing) {
        sceneCanvas.style.cursor = 'default';
        return;
    }
    
    const rect = sceneCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if hovering over boat
    if (window.boatBounds && 
        x >= window.boatBounds.x && 
        x <= window.boatBounds.x + window.boatBounds.width &&
        y >= window.boatBounds.y && 
        y <= window.boatBounds.y + window.boatBounds.height) {
        sceneCanvas.style.cursor = 'pointer';
    } else {
        sceneCanvas.style.cursor = 'default';
    }
});

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

// Museum navigation
const museumCanvas = document.getElementById('museum-canvas');
const museumCtx = museumCanvas.getContext('2d');
museumCanvas.width = window.innerWidth;
museumCanvas.height = window.innerHeight;

document.getElementById('museum-button').addEventListener('click', () => {
    currentPage = 'museum';
    document.getElementById('fishing-page').style.display = 'none';
    document.getElementById('museum-page').style.display = 'block';
    drawMuseum();
    updateMuseumDisplay();
});

document.getElementById('back-from-museum').addEventListener('click', () => {
    currentPage = 'fishing';
    document.getElementById('museum-page').style.display = 'none';
    document.getElementById('fishing-page').style.display = 'block';
});

// Reset progress button
document.getElementById('reset-button').addEventListener('click', () => {
    const resetPopup = document.getElementById('reset-confirm-popup');
    resetPopup.style.display = 'block';
});

// Reset confirmation handlers
document.getElementById('reset-confirm-yes').addEventListener('click', () => {
    // Clear all localStorage data
    localStorage.clear();
    
    // Reload the page to reset everything
    location.reload();
});

document.getElementById('reset-confirm-no').addEventListener('click', () => {
    document.getElementById('reset-confirm-popup').style.display = 'none';
});

// Museum section switching
document.getElementById('freshwater-section-btn').addEventListener('click', () => {
    currentMuseumSection = 'freshwater';
    document.getElementById('freshwater-section-btn').classList.add('active');
    document.getElementById('saltwater-section-btn').classList.remove('active');
    updateMuseumDisplay();
});

document.getElementById('saltwater-section-btn').addEventListener('click', () => {
    currentMuseumSection = 'saltwater';
    document.getElementById('saltwater-section-btn').classList.add('active');
    document.getElementById('freshwater-section-btn').classList.remove('active');
    updateMuseumDisplay();
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
    
    // Santa and sleigh on the right side (Nov 1 - Jan 31)
    if (isSantaSeason()) {
        const santaX = shopCanvas.width * 0.8;
        const santaY = shopCanvas.height * 0.15 - 60;
        
        // Draw all 9 reindeer in formation (4 pairs + Rudolph)
        const reindeerPositions = [
            { x: -130, y: 0, name: 'Rudolph' },  // Front lead
            { x: -115, y: -8, name: 'Dasher' },   // Row 2 top
            { x: -115, y: 8, name: 'Dancer' },    // Row 2 bottom
            { x: -95, y: -8, name: 'Prancer' },   // Row 3 top
            { x: -95, y: 8, name: 'Vixen' },      // Row 3 bottom
            { x: -75, y: -8, name: 'Comet' },     // Row 4 top
            { x: -75, y: 8, name: 'Cupid' },      // Row 4 bottom
            { x: -55, y: -8, name: 'Donner' },    // Row 5 top
            { x: -55, y: 8, name: 'Blitzen' }     // Row 5 bottom
        ];
        
        reindeerPositions.forEach((pos, index) => {
            const reindeerX = santaX + pos.x;
            const reindeerY = santaY + pos.y;
            
            // Reindeer body
            shopCtx.fillStyle = '#8B4513';
            shopCtx.fillRect(reindeerX - 6, reindeerY - 2, 10, 6);
            
            // Reindeer head
            shopCtx.beginPath();
            shopCtx.arc(reindeerX - 8, reindeerY - 3, 4, 0, Math.PI * 2);
            shopCtx.fill();
            
            // Legs
            shopCtx.strokeStyle = '#654321';
            shopCtx.lineWidth = 1.5;
            shopCtx.beginPath();
            shopCtx.moveTo(reindeerX - 4, reindeerY + 4);
            shopCtx.lineTo(reindeerX - 4, reindeerY + 8);
            shopCtx.stroke();
            shopCtx.beginPath();
            shopCtx.moveTo(reindeerX + 2, reindeerY + 4);
            shopCtx.lineTo(reindeerX + 2, reindeerY + 8);
            shopCtx.stroke();
            
            // Antlers
            shopCtx.lineWidth = 1.5;
            shopCtx.beginPath();
            shopCtx.moveTo(reindeerX - 9, reindeerY - 6);
            shopCtx.lineTo(reindeerX - 11, reindeerY - 10);
            shopCtx.stroke();
            shopCtx.beginPath();
            shopCtx.moveTo(reindeerX - 9, reindeerY - 6);
            shopCtx.lineTo(reindeerX - 7, reindeerY - 9);
            shopCtx.stroke();
            shopCtx.beginPath();
            shopCtx.moveTo(reindeerX - 7, reindeerY - 6);
            shopCtx.lineTo(reindeerX - 5, reindeerY - 10);
            shopCtx.stroke();
            shopCtx.beginPath();
            shopCtx.moveTo(reindeerX - 7, reindeerY - 6);
            shopCtx.lineTo(reindeerX - 6, reindeerY - 8);
            shopCtx.stroke();
            
            // Red nose only for Rudolph (first one)
            if (index === 0) {
                shopCtx.fillStyle = '#FF0000';
                shopCtx.shadowColor = '#FF0000';
                shopCtx.shadowBlur = 6;
                shopCtx.beginPath();
                shopCtx.arc(reindeerX - 11, reindeerY - 3, 2.5, 0, Math.PI * 2);
                shopCtx.fill();
                shopCtx.shadowBlur = 0;
            }
            
            // Eye
            shopCtx.fillStyle = '#000000';
            shopCtx.beginPath();
            shopCtx.arc(reindeerX - 9, reindeerY - 4, 1, 0, Math.PI * 2);
            shopCtx.fill();
        });
        
        // Reins connecting reindeer to sleigh
        shopCtx.strokeStyle = '#654321';
        shopCtx.lineWidth = 1;
        for (let i = 0; i < reindeerPositions.length; i++) {
            const pos = reindeerPositions[i];
            shopCtx.beginPath();
            shopCtx.moveTo(santaX + pos.x + 4, santaY + pos.y);
            shopCtx.lineTo(santaX - 40, santaY + 10);
            shopCtx.stroke();
        }
        
        // Sleigh body - more detailed
        shopCtx.fillStyle = '#8B0000';
        shopCtx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        shopCtx.shadowBlur = 4;
        shopCtx.shadowOffsetY = 2;
        
        // Main sleigh body with curved shape
        shopCtx.beginPath();
        shopCtx.moveTo(santaX - 40, santaY + 8);
        shopCtx.quadraticCurveTo(santaX - 45, santaY + 15, santaX - 40, santaY + 22);
        shopCtx.lineTo(santaX + 35, santaY + 22);
        shopCtx.quadraticCurveTo(santaX + 40, santaY + 15, santaX + 35, santaY + 8);
        shopCtx.closePath();
        shopCtx.fill();
        
        shopCtx.shadowBlur = 0;
        
        // Gold trim on sleigh
        shopCtx.strokeStyle = '#FFD700';
        shopCtx.lineWidth = 2;
        shopCtx.beginPath();
        shopCtx.moveTo(santaX - 40, santaY + 10);
        shopCtx.lineTo(santaX + 35, santaY + 10);
        shopCtx.stroke();
        
        // Sleigh runners - curved
        shopCtx.strokeStyle = '#C0C0C0';
        shopCtx.lineWidth = 3;
        shopCtx.lineCap = 'round';
        shopCtx.beginPath();
        shopCtx.moveTo(santaX - 45, santaY + 25);
        shopCtx.quadraticCurveTo(santaX - 30, santaY + 28, santaX - 20, santaY + 25);
        shopCtx.stroke();
        shopCtx.beginPath();
        shopCtx.moveTo(santaX + 20, santaY + 25);
        shopCtx.quadraticCurveTo(santaX + 30, santaY + 28, santaX + 40, santaY + 25);
        shopCtx.stroke();
        
        // Gift bag in sleigh
        shopCtx.fillStyle = '#654321';
        shopCtx.fillRect(santaX + 8, santaY + 8, 20, 15);
        shopCtx.strokeStyle = '#FFD700';
        shopCtx.lineWidth = 2;
        shopCtx.beginPath();
        shopCtx.moveTo(santaX + 18, santaY + 8);
        shopCtx.lineTo(santaX + 18, santaY + 23);
        shopCtx.stroke();
        
        // Santa sitting in sleigh
        shopCtx.fillStyle = '#DC143C';
        // Santa's body/coat
        shopCtx.fillRect(santaX - 12, santaY + 3, 18, 20);
        
        // Santa's legs
        shopCtx.fillRect(santaX - 8, santaY + 18, 6, 8);
        shopCtx.fillRect(santaX + 2, santaY + 18, 6, 8);
        
        // Black boots
        shopCtx.fillStyle = '#000000';
        shopCtx.fillRect(santaX - 8, santaY + 24, 6, 4);
        shopCtx.fillRect(santaX + 2, santaY + 24, 6, 4);
        
        // White fur trim on coat
        shopCtx.fillStyle = '#FFFFFF';
        shopCtx.fillRect(santaX - 12, santaY + 21, 18, 3);
        shopCtx.fillRect(santaX - 12, santaY + 3, 18, 2);
        
        // Santa's arms holding reins
        shopCtx.fillStyle = '#DC143C';
        shopCtx.fillRect(santaX - 16, santaY + 6, 8, 4);
        
        // Black gloves
        shopCtx.fillStyle = '#000000';
        shopCtx.beginPath();
        shopCtx.arc(santaX - 17, santaY + 8, 3, 0, Math.PI * 2);
        shopCtx.fill();
        
        // Santa's head
        shopCtx.fillStyle = '#FFD0B0';
        shopCtx.beginPath();
        shopCtx.arc(santaX - 3, santaY - 2, 9, 0, Math.PI * 2);
        shopCtx.fill();
        
        // Santa's hat
        shopCtx.fillStyle = '#DC143C';
        shopCtx.beginPath();
        shopCtx.moveTo(santaX - 11, santaY - 2);
        shopCtx.lineTo(santaX + 2, santaY - 18);
        shopCtx.lineTo(santaX + 5, santaY - 2);
        shopCtx.closePath();
        shopCtx.fill();
        
        // White fur on hat brim
        shopCtx.fillStyle = '#FFFFFF';
        shopCtx.fillRect(santaX - 11, santaY - 2, 16, 3);
        
        // Hat pom-pom
        shopCtx.beginPath();
        shopCtx.arc(santaX + 2, santaY - 18, 4, 0, Math.PI * 2);
        shopCtx.fill();
        
        // Santa's beard
        shopCtx.beginPath();
        shopCtx.ellipse(santaX - 3, santaY + 2, 6, 5, 0, 0, Math.PI * 2);
        shopCtx.fill();
        
        // Mustache
        shopCtx.beginPath();
        shopCtx.ellipse(santaX - 6, santaY - 1, 3, 2, 0, 0, Math.PI * 2);
        shopCtx.fill();
        shopCtx.beginPath();
        shopCtx.ellipse(santaX, santaY - 1, 3, 2, 0, 0, Math.PI * 2);
        shopCtx.fill();
        
        // Rosy cheeks
        shopCtx.fillStyle = 'rgba(255, 105, 180, 0.4)';
        shopCtx.beginPath();
        shopCtx.arc(santaX - 8, santaY + 1, 3, 0, Math.PI * 2);
        shopCtx.fill();
        shopCtx.beginPath();
        shopCtx.arc(santaX + 2, santaY + 1, 3, 0, Math.PI * 2);
        shopCtx.fill();
        
        // Eyes
        shopCtx.fillStyle = '#000000';
        shopCtx.beginPath();
        shopCtx.arc(santaX - 6, santaY - 3, 1.5, 0, Math.PI * 2);
        shopCtx.fill();
        shopCtx.beginPath();
        shopCtx.arc(santaX, santaY - 3, 1.5, 0, Math.PI * 2);
        shopCtx.fill();
    }
    
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

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatWeight(weight) {
    if (weight < 0.1) {
        return weight.toFixed(3);
    } else if (weight < 10) {
        return weight.toFixed(2);
    } else {
        return weight.toFixed(1);
    }
}

function updateTimeDisplay() {
    const formattedTime = formatTime(timePlayed);
    document.getElementById('time-amount').textContent = formattedTime;
    document.getElementById('shop-time-amount').textContent = formattedTime;
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
        
        // Apply rarity styling
        const rarity = fish.rarity || 'normal';
        if (rarity === 'shiny') {
            slot.style.background = 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)';
            slot.style.boxShadow = '0 0 15px #FFD700';
            slot.style.borderColor = '#FFD700';
        } else if (rarity === 'golden') {
            slot.style.background = 'linear-gradient(135deg, #FFD700, #FFED4E)';
            slot.style.boxShadow = '0 0 10px #FFD700';
            slot.style.borderColor = '#FFD700';
        } else if (rarity === 'mutated') {
            slot.style.background = 'linear-gradient(135deg, #9C27B0, #E91E63)';
            slot.style.boxShadow = '0 0 10px #9C27B0';
            slot.style.borderColor = '#9C27B0';
        }
        
        const fishIcon = document.createElement('div');
        fishIcon.className = 'fish-icon';
        fishIcon.textContent = '🐟';
        fishIcon.style.color = getFishColor(fish.type);
        
        const fishName = document.createElement('div');
        fishName.className = 'fish-name';
        fishName.textContent = fish.type;
        
        const fishWeight = document.createElement('div');
        fishWeight.className = 'fish-weight';
        fishWeight.textContent = `${formatWeight(fish.weight)} lbs`;
        
        const fishLength = document.createElement('div');
        fishLength.className = 'fish-length';
        fishLength.textContent = `${fish.length || 0}"`;
        
        let price = fishPrices[fish.type] * fish.weight;
        
        // Apply rarity multiplier
        const rarityMultiplier = fish.rarityMultiplier || 1;
        price = Math.floor(price * rarityMultiplier);
        
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
        slot.appendChild(fishLength);
        slot.appendChild(priceTag);
        
        slot.addEventListener('click', () => sellFish(index));
        
        sellGrid.appendChild(slot);
    });
}

function sellFish(index) {
    const fish = inventory[index];
    let price = fishPrices[fish.type] * fish.weight;
    
    // Apply rarity multiplier
    const rarityMultiplier = fish.rarityMultiplier || 1;
    price = Math.floor(price * rarityMultiplier);
    
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
        
        // Apply rarity multiplier
        const rarityMultiplier = fish.rarityMultiplier || 1;
        price = Math.floor(price * rarityMultiplier);
        
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
    const inventorySlotPrice = getInventorySlotPrice();
    const canAfford = money >= inventorySlotPrice;
    const notAtMax = maxInventorySlots < absoluteMaxInventorySlots;
    
    buyButton.disabled = !canAfford || !notAtMax;
    
    if (!notAtMax) {
        buyButton.textContent = 'Max Capacity Reached';
    } else {
        buyButton.textContent = `Buy for $${inventorySlotPrice}`;
    }
    
    // Update boat button
    const boatButton = document.getElementById('buy-boat-button');
    if (boatOwned) {
        boatButton.textContent = 'Owned';
        boatButton.disabled = true;
    } else {
        boatButton.textContent = `Buy for $${boatPrice.toLocaleString()}`;
        boatButton.disabled = money < boatPrice;
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
        rodDetails.className = 'shop-item-details';
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
        
        // Only show baits for the current location
        if (bait.location !== currentLocation) {
            return; // Skip this bait
        }
        
        const baitItem = document.createElement('div');
        baitItem.className = 'shop-item';
        
        const baitInfo = document.createElement('div');
        baitInfo.className = 'shop-item-info';
        
        const baitIcon = document.createElement('div');
        baitIcon.className = 'shop-item-icon';
        // Different icons for lake vs ocean bait
        baitIcon.textContent = bait.location === 'lake' ? '🪱' : '🦐';
        
        const baitDetails = document.createElement('div');
        baitDetails.className = 'shop-item-details';
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
            upgradeDetails.className = 'shop-item-details';
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
        trinketDetails.className = 'shop-item-details';
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
    const inventorySlotPrice = getInventorySlotPrice();
    if (money >= inventorySlotPrice && maxInventorySlots < absoluteMaxInventorySlots) {
        money -= inventorySlotPrice;
        maxInventorySlots++;
        updateShopDisplay();
        updateInventoryDisplay();
        saveGameData();
    }
});

document.getElementById('buy-boat-button').addEventListener('click', () => {
    if (!boatOwned && money >= boatPrice) {
        money -= boatPrice;
        boatOwned = true;
        updateShopDisplay();
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
updateTimeDisplay();
drawScene();

// Initialize shop tabs (show sell section by default)
document.getElementById('sell-section').classList.add('active');
document.getElementById('sell-tab').classList.add('active');

// Update time played every second
setInterval(() => {
    const currentTime = Date.now();
    const deltaSeconds = Math.floor((currentTime - lastUpdateTime) / 1000);
    if (deltaSeconds >= 1) {
        timePlayed += deltaSeconds;
        lastUpdateTime = currentTime;
        updateTimeDisplay();
        saveGameData(); // Auto-save time
    }
}, 1000);

// Update system date and time display
function updateSystemTime() {
    const now = new Date();
    
    // Format date: "Wednesday, Nov 6, 2025"
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    
    // Format time: "2:23:45 PM" (12-hour format)
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Update fishing page
    document.getElementById('system-date').textContent = dateString;
    document.getElementById('system-time').textContent = timeString;
    
    // Update shop page
    document.getElementById('shop-system-date').textContent = dateString;
    document.getElementById('shop-system-clock').textContent = timeString;
}

// Update system time immediately and then every second
updateSystemTime();
setInterval(updateSystemTime, 1000);

// Function to update location display
function updateLocationDisplay() {
    const locationIcon = document.getElementById('location-icon');
    const locationName = document.getElementById('location-name');
    const locationDisplay = document.getElementById('location-display');
    
    if (currentLocation === 'ocean') {
        locationIcon.textContent = '🌊';
        locationName.textContent = 'Ocean';
        locationDisplay.style.background = 'linear-gradient(135deg, rgba(33, 150, 243, 0.9), rgba(30, 136, 229, 0.95))';
        locationDisplay.style.borderColor = '#1976D2';
    } else {
        locationIcon.textContent = '🏞️';
        locationName.textContent = 'Lake';
        locationDisplay.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(67, 160, 71, 0.95))';
        locationDisplay.style.borderColor = '#388E3C';
    }
}

// Update location display on load
updateLocationDisplay();

// Snow effect - active between November 1st and March 1st
class Snowflake {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * snowCanvas.width;
        this.y = Math.random() * snowCanvas.height - snowCanvas.height;
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.6 + 0.4;
    }
    
    update() {
        this.y += this.speed;
        this.x += this.wind;
        
        // Reset snowflake when it goes off screen
        if (this.y > snowCanvas.height) {
            this.y = -10;
            this.x = Math.random() * snowCanvas.width;
        }
        
        if (this.x > snowCanvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = snowCanvas.width;
        }
    }
    
    draw() {
        snowCtx.beginPath();
        snowCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        snowCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        snowCtx.fill();
    }
}

let snowflakes = [];
let snowActive = false;

function initSnow() {
    snowflakes = [];
    for (let i = 0; i < 150; i++) {
        snowflakes.push(new Snowflake());
    }
}

// Museum functions
function drawMuseum() {
    // Background - Museum interior
    const bgGradient = museumCtx.createLinearGradient(0, 0, 0, museumCanvas.height);
    bgGradient.addColorStop(0, '#8B7355');
    bgGradient.addColorStop(1, '#6B5344');
    museumCtx.fillStyle = bgGradient;
    museumCtx.fillRect(0, 0, museumCanvas.width, museumCanvas.height);
    
    // Add some decorative elements - marble columns
    museumCtx.fillStyle = '#D3C5B5';
    museumCtx.fillRect(50, 0, 80, museumCanvas.height);
    museumCtx.fillRect(museumCanvas.width - 130, 0, 80, museumCanvas.height);
    
    // Column shadows
    museumCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    museumCtx.fillRect(120, 0, 10, museumCanvas.height);
    museumCtx.fillRect(museumCanvas.width - 60, 0, 10, museumCanvas.height);
    
    // Marble texture (simple)
    museumCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 20; i++) {
        const y = (i * 231.7) % museumCanvas.height;
        museumCtx.fillRect(50, y, 80, 30);
        museumCtx.fillRect(museumCanvas.width - 130, y, 80, 30);
    }
}

function updateMuseumDisplay() {
    const museumGrid = document.getElementById('museum-grid');
    museumGrid.innerHTML = '';
    
    // Get fish types based on current section
    const freshwaterFish = Object.values(fishTypes);
    const saltwaterFish = Object.values(oceanFishTypes);
    const allFishTypes = [...freshwaterFish, ...saltwaterFish];
    
    // Filter fish based on current section
    const displayedFish = currentMuseumSection === 'freshwater' ? freshwaterFish : saltwaterFish;
    
    // Calculate statistics for current section
    let totalSpeciesInSection = displayedFish.length;
    let discoveredInSection = 0;
    let totalCaughtInSection = 0;
    
    displayedFish.forEach(fishType => {
        const museumData = museum[fishType.name];
        if (museumData && museumData.discovered) {
            discoveredInSection++;
            totalCaughtInSection += museumData.totalCaught;
        }
    });
    
    // Update stats display for current section
    document.getElementById('species-count').textContent = discoveredInSection;
    document.getElementById('total-species').textContent = totalSpeciesInSection;
    document.getElementById('total-caught').textContent = totalCaughtInSection;
    
    // Create entries for fish in current section
    displayedFish.forEach(fishType => {
        const entry = document.createElement('div');
        const museumData = museum[fishType.name];
        const discovered = museumData && museumData.discovered;
        
        entry.className = 'museum-entry';
        if (!discovered) {
            entry.classList.add('undiscovered');
        }
        
        // Apply special styling if there's a showcased fish with rarity
        if (discovered && museumData.showcaseFish) {
            const rarity = museumData.showcaseFish.rarity;
            if (rarity === 'shiny') {
                entry.style.background = 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)';
                entry.style.boxShadow = '0 0 20px #FFD700, 0 4px 12px rgba(0, 0, 0, 0.3)';
                entry.style.borderColor = '#FFD700';
                entry.style.borderWidth = '4px';
            } else if (rarity === 'golden') {
                entry.style.background = 'linear-gradient(135deg, #FFD700, #FFED4E, #FFD700)';
                entry.style.boxShadow = '0 0 25px #FFD700, 0 4px 12px rgba(0, 0, 0, 0.3)';
                entry.style.borderColor = '#FFD700';
                entry.style.borderWidth = '4px';
            } else if (rarity === 'mutated') {
                entry.style.background = 'linear-gradient(135deg, #9C27B0, #E91E63, #9C27B0)';
                entry.style.boxShadow = '0 0 20px #9C27B0, 0 4px 12px rgba(0, 0, 0, 0.3)';
                entry.style.borderColor = '#9C27B0';
                entry.style.borderWidth = '4px';
            }
        }
        
        // Header with fish name and icon
        const header = document.createElement('div');
        header.className = 'museum-entry-header';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'museum-fish-name';
        nameDiv.textContent = discovered ? fishType.name : '???';
        
        const iconDiv = document.createElement('div');
        iconDiv.className = 'museum-fish-icon';
        iconDiv.textContent = discovered ? '🐟' : '❓';
        
        header.appendChild(nameDiv);
        header.appendChild(iconDiv);
        entry.appendChild(header);
        
        // Stats section
        const statsDiv = document.createElement('div');
        statsDiv.className = 'museum-entry-stats';
        
        if (discovered) {
            // Difficulty
            const difficultyRow = document.createElement('div');
            difficultyRow.className = 'museum-stat-row';
            difficultyRow.innerHTML = `
                <span class="museum-stat-label">Difficulty:</span>
                <span class="museum-stat-value">${fishType.difficulty}</span>
            `;
            statsDiv.appendChild(difficultyRow);
            
            // Total caught
            const caughtRow = document.createElement('div');
            caughtRow.className = 'museum-stat-row';
            caughtRow.innerHTML = `
                <span class="museum-stat-label">Total Caught:</span>
                <span class="museum-stat-value">${museumData.totalCaught}</span>
            `;
            statsDiv.appendChild(caughtRow);
            
            // Perfect catches
            const perfectRow = document.createElement('div');
            perfectRow.className = 'museum-stat-row';
            perfectRow.innerHTML = `
                <span class="museum-stat-label">Perfect Catches:</span>
                <span class="museum-stat-value">${museumData.perfectCatches || 0} ⭐</span>
            `;
            statsDiv.appendChild(perfectRow);
            
            // Biggest catch
            const biggestRow = document.createElement('div');
            biggestRow.className = 'museum-stat-row';
            biggestRow.innerHTML = `
                <span class="museum-stat-label">Biggest Catch:</span>
                <span class="museum-stat-value">${formatWeight(museumData.biggestWeight)} lbs</span>
            `;
            statsDiv.appendChild(biggestRow);
            
            // Longest catch
            const longestRow = document.createElement('div');
            longestRow.className = 'museum-stat-row';
            longestRow.innerHTML = `
                <span class="museum-stat-label">Longest Catch:</span>
                <span class="museum-stat-value">${museumData.longestLength || 0}"</span>
            `;
            statsDiv.appendChild(longestRow);
            
            // Weight range
            const rangeRow = document.createElement('div');
            rangeRow.className = 'museum-stat-row';
            rangeRow.innerHTML = `
                <span class="museum-stat-label">Weight Range:</span>
                <span class="museum-stat-value">${fishType.minWeight}-${fishType.maxWeight} lbs</span>
            `;
            statsDiv.appendChild(rangeRow);
            
            // Length range
            const lengthRangeRow = document.createElement('div');
            lengthRangeRow.className = 'museum-stat-row';
            lengthRangeRow.innerHTML = `
                <span class="museum-stat-label">Length Range:</span>
                <span class="museum-stat-value">${fishType.minLength}-${fishType.maxLength}"</span>
            `;
            statsDiv.appendChild(lengthRangeRow);
            
            // Showcase fish section
            if (museumData.showcaseFish) {
                const showcaseSection = document.createElement('div');
                showcaseSection.className = 'museum-showcase';
                
                // Apply rarity styling
                const rarity = museumData.showcaseFish.rarity;
                if (rarity === 'shiny') {
                    showcaseSection.style.background = 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)';
                    showcaseSection.style.boxShadow = '0 0 15px #FFD700';
                } else if (rarity === 'golden') {
                    showcaseSection.style.background = 'linear-gradient(135deg, #FFD700, #FFED4E)';
                    showcaseSection.style.boxShadow = '0 0 10px #FFD700';
                } else if (rarity === 'mutated') {
                    showcaseSection.style.background = 'linear-gradient(135deg, #9C27B0, #E91E63)';
                    showcaseSection.style.boxShadow = '0 0 10px #9C27B0';
                }
                
                const showcaseTitle = document.createElement('div');
                showcaseTitle.className = 'museum-showcase-title';
                showcaseTitle.textContent = '⭐ Museum Display';
                
                const showcaseWeight = document.createElement('div');
                showcaseWeight.className = 'museum-showcase-weight';
                showcaseWeight.textContent = `${formatWeight(museumData.showcaseFish.weight)} lbs`;
                
                const showcaseLength = document.createElement('div');
                showcaseLength.className = 'museum-showcase-length';
                showcaseLength.textContent = `${museumData.showcaseFish.length || 0}"`;
                
                const showcaseRarity = document.createElement('div');
                showcaseRarity.className = 'museum-showcase-rarity';
                if (rarity === 'shiny') {
                    showcaseRarity.textContent = '✨ SHINY';
                } else if (rarity === 'golden') {
                    showcaseRarity.textContent = '🌟 GOLDEN';
                } else if (rarity === 'mutated') {
                    showcaseRarity.textContent = '🧬 MUTATED';
                } else {
                    showcaseRarity.textContent = 'Normal';
                }
                
                showcaseSection.appendChild(showcaseTitle);
                showcaseSection.appendChild(showcaseWeight);
                showcaseSection.appendChild(showcaseLength);
                showcaseSection.appendChild(showcaseRarity);
                statsDiv.appendChild(showcaseSection);
            } else {
                const noShowcase = document.createElement('div');
                noShowcase.className = 'museum-no-showcase';
                noShowcase.textContent = 'No fish displayed yet';
                statsDiv.appendChild(noShowcase);
            }
        } else {
            const unknownText = document.createElement('div');
            unknownText.style.textAlign = 'center';
            unknownText.style.color = '#999';
            unknownText.style.fontStyle = 'italic';
            unknownText.textContent = 'Catch this fish to discover it!';
            statsDiv.appendChild(unknownText);
        }
        
        entry.appendChild(statsDiv);
        museumGrid.appendChild(entry);
    });
}

function isWinterSeason() {
    const now = new Date();
    const month = now.getMonth(); // 0-11 (0 = January, 10 = November)
    
    // November (10), December (11), January (0), February (1) only
    // Excludes March 1st and beyond
    if (month === 10 || month === 11 || month === 0 || month === 1) {
        return true;
    }
    
    return false;
}

function isSantaSeason() {
    const now = new Date();
    const month = now.getMonth(); // 0-11 (0 = January, 10 = November)
    
    // November (10), December (11), January (0) only
    if (month === 10 || month === 11 || month === 0) {
        return true;
    }
    
    return false;
}

function updateSnowEffect() {
    const shouldBeActive = isWinterSeason();
    
    if (shouldBeActive && !snowActive) {
        // Activate snow
        snowActive = true;
        snowCanvas.style.display = 'block';
        if (snowflakes.length === 0) {
            initSnow();
        }
    } else if (!shouldBeActive && snowActive) {
        // Deactivate snow
        snowActive = false;
        snowCanvas.style.display = 'none';
    }
}

function animateSnow() {
    if (!snowActive) return;
    
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    
    for (let snowflake of snowflakes) {
        snowflake.update();
        snowflake.draw();
    }
}

// Initialize and check snow effect
updateSnowEffect();
setInterval(updateSnowEffect, 60000); // Check every minute

// Add snow animation to the game loop
function snowGameLoop() {
    animateSnow();
    requestAnimationFrame(snowGameLoop);
}
snowGameLoop();

// Handle window resize for snow canvas
window.addEventListener('resize', () => {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
});
