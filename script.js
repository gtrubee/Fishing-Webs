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
    chub: {
        name: 'Chub',
        color: '#FF6B35',
        difficulty: 'Easy',
        barSize: 80,
        fishSpeed: 0.0140625,
        fishRandomness: 0.28125,
        fishChangeInterval: 133,
        progressGainRate: 0.5,
        progressDecayRate: 0.4,
        minWeight: 3,
        maxWeight: 18
    },
    salmon: {
        name: 'Salmon',
        color: '#FF6B35',
        difficulty: 'Average',
        barSize: 80,
        fishSpeed: 0.0225,
        fishRandomness: 0.5625,
        fishChangeInterval: 100,
        progressGainRate: 0.5,
        progressDecayRate: 0.4,
        minWeight: 8,
        maxWeight: 30
    },
    sturgeon: {
        name: 'Sturgeon',
        color: '#FF6B35',
        difficulty: 'Hard',
        barSize: 80,
        fishSpeed: 0.028125,
        fishRandomness: 1.125,
        fishChangeInterval: 67,
        progressGainRate: 0.5,
        progressDecayRate: 0.4,
        minWeight: 30,
        maxWeight: 100
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
    'Chub': 4,
    'Salmon': 7,
    'Sturgeon': 15
};

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
        ownedRods: fishingRods.map(rod => rod.owned)
    };
    localStorage.setItem('fishingGameSave', JSON.stringify(data));
    console.log('Game data saved');
}

// Minigame variables
let barY = 350;
let barHeight = 80;
let barSpeed = 0;
let barGravity = 0.15;
let barJumpPower = -0.3;
let maxBarSpeed = 5;

let fishY = 100;
let fishSpeed = 0;
let fishTargetY = 100;
let fishChangeTimer = 0;

let progress = 0;
let progressDecayRate = 0.2;
let progressGainRate = 0.4;
const maxProgress = 100;
const winThreshold = 100;

let mouseDown = false;
let animationFrameId = null;

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
    
    // Randomly select a fish type
    const fishKeys = Object.keys(fishTypes);
    const randomFish = fishKeys[Math.floor(Math.random() * fishKeys.length)];
    currentFish = fishTypes[randomFish];
    console.log('Current fish:', currentFish);
    
    // Generate random weight for this fish
    currentFishWeight = Math.floor(Math.random() * (currentFish.maxWeight - currentFish.minWeight + 1)) + currentFish.minWeight;
    
    // Calculate weight factor (0 to 1, where 1 is maximum weight)
    const weightFactor = (currentFishWeight - currentFish.minWeight) / (currentFish.maxWeight - currentFish.minWeight);
    
    // Adjust difficulty based on weight
    // Heavier fish are faster, more erratic, and change direction more often
    const weightAdjustedSpeed = currentFish.fishSpeed * (1 + weightFactor * 0.3); // Up to 30% faster
    const weightAdjustedRandomness = currentFish.fishRandomness * (1 + weightFactor * 0.4); // Up to 40% more erratic
    const weightAdjustedInterval = currentFish.fishChangeInterval * (1 - weightFactor * 0.25); // Up to 25% more frequent changes
    
    statusDiv.textContent = 'Keep the fish in the green bar!';
    
    console.log('Hiding scene canvas, showing minigame canvas');
    sceneCanvas.style.display = 'none';
    minigameCanvas.style.display = 'block';
    console.log('Canvas display states - scene:', sceneCanvas.style.display, 'minigame:', minigameCanvas.style.display);
    
    // Reset minigame variables with fish-specific difficulty (adjusted by weight)
    barHeight = currentFish.barSize + (fishingRods[currentRodIndex]?.barSizeBonus || 0);
    barY = minigameCanvas.height - 50 - barHeight / 2;
    barSpeed = 0;
    fishY = minigameCanvas.height - 50;
    fishSpeed = 0;
    fishTargetY = minigameCanvas.height - 50;
    fishChangeTimer = 0;
    progress = 1;
    progressGainRate = currentFish.progressGainRate;
    progressDecayRate = currentFish.progressDecayRate;
    
    // Store weight-adjusted values for use in game loop
    currentFish.adjustedSpeed = weightAdjustedSpeed;
    currentFish.adjustedRandomness = weightAdjustedRandomness;
    currentFish.adjustedInterval = weightAdjustedInterval;
    mouseDown = false;
    
    gameLoop();
}

// Minigame loop
function gameLoop() {
    if (!minigameActive) return;
    
    // Update bar position
    if (mouseDown) {
        barSpeed += barJumpPower;
    }
    barSpeed += barGravity;
    
    // Limit bar speed for smoother movement
    barSpeed = Math.max(-maxBarSpeed, Math.min(maxBarSpeed, barSpeed));
    
    barY += barSpeed;
    
    // Keep bar in bounds
    if (barY < 0) {
        barY = 0;
        barSpeed = 0;
    }
    if (barY + barHeight > minigameCanvas.height) {
        barY = minigameCanvas.height - barHeight;
        barSpeed = 0;
    }
    
    // Update fish position
    fishChangeTimer++;
    if (fishChangeTimer > currentFish.adjustedInterval) {
        fishTargetY = Math.random() * (minigameCanvas.height - 40);
        fishChangeTimer = 0;
    }
    
    // Move fish towards target with weight-adjusted speed and randomness
    const fishDiff = fishTargetY - fishY;
    fishSpeed = fishDiff * currentFish.adjustedSpeed + (Math.random() - 0.5) * currentFish.adjustedRandomness;
    fishY += fishSpeed;
    
    // Keep fish in bounds
    fishY = Math.max(20, Math.min(minigameCanvas.height - 20, fishY));
    
    // Check if fish is in the bar
    const fishInBar = fishY >= barY && fishY <= barY + barHeight;
    
    if (fishInBar) {
        progress += progressGainRate;
    } else {
        progress -= progressDecayRate;
    }
    
    progress = Math.max(0, Math.min(maxProgress, progress));
    
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
    drawMinigame(fishInBar);
    
    animationFrameId = requestAnimationFrame(gameLoop);
}

// Draw the minigame
function drawMinigame(fishInBar) {
    // Background - match night water color
    minigameCtx.fillStyle = '#0d1b3a';
    minigameCtx.fillRect(0, 0, minigameCanvas.width, minigameCanvas.height);
    
    // Track background
    minigameCtx.fillStyle = '#1a2947';
    minigameCtx.fillRect(20, 0, 100, minigameCanvas.height);
    
    // Green bar
    minigameCtx.fillStyle = fishInBar ? '#00FF00' : '#00AA00';
    minigameCtx.fillRect(20, barY, 100, barHeight);
    
    // Bar border
    minigameCtx.strokeStyle = '#FFFFFF';
    minigameCtx.lineWidth = 3;
    minigameCtx.strokeRect(20, barY, 100, barHeight);
    
    // Fish icon
    minigameCtx.fillStyle = currentFish.color;
    minigameCtx.beginPath();
    minigameCtx.arc(70, fishY, 15, 0, Math.PI * 2);
    minigameCtx.fill();
    
    // Fish eye
    minigameCtx.fillStyle = '#FFFFFF';
    minigameCtx.beginPath();
    minigameCtx.arc(75, fishY - 3, 4, 0, Math.PI * 2);
    minigameCtx.fill();
    
    // Fish tail
    minigameCtx.fillStyle = currentFish.color;
    minigameCtx.beginPath();
    minigameCtx.moveTo(55, fishY);
    minigameCtx.lineTo(45, fishY - 10);
    minigameCtx.lineTo(45, fishY + 10);
    minigameCtx.closePath();
    minigameCtx.fill();
    
    // Progress bar
    minigameCtx.fillStyle = '#555';
    minigameCtx.fillRect(150, 50, 120, 400);
    
    // Progress fill
    const progressHeight = (progress / maxProgress) * 400;
    const gradient = minigameCtx.createLinearGradient(0, 450 - progressHeight, 0, 450);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(1, '#FFA500');
    minigameCtx.fillStyle = gradient;
    minigameCtx.fillRect(150, 450 - progressHeight, 120, progressHeight);
    
    // Progress bar border
    minigameCtx.strokeStyle = '#FFFFFF';
    minigameCtx.lineWidth = 3;
    minigameCtx.strokeRect(150, 50, 120, 400);
    
    // Progress text
    minigameCtx.fillStyle = '#FFFFFF';
    minigameCtx.font = 'bold 20px Arial';
    minigameCtx.textAlign = 'center';
    minigameCtx.fillText('PROGRESS', 210, 30);
    minigameCtx.fillText(Math.floor(progress) + '%', 210, 470);
    
    // Instructions
    minigameCtx.fillStyle = '#FFFFFF';
    minigameCtx.font = '14px Arial';
    minigameCtx.fillText('Click to move bar up!', minigameCanvas.width / 2, minigameCanvas.height - 10);
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
        // Add fish to inventory
        if (inventory.length < maxInventorySlots) {
            inventory.push({
                type: currentFish.name,
                weight: currentFishWeight
            });
            statusDiv.textContent = `🐟 You caught a ${currentFish.name} weighing ${currentFishWeight} lbs! (${inventory.length}/${maxInventorySlots})`;
            updateInventoryDisplay();
            saveGameData();
        } else {
            statusDiv.textContent = `🐟 You caught a ${currentFish.name} weighing ${currentFishWeight} lbs! But your inventory is full!`;
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

// Mouse/click controls for the minigame
document.addEventListener('mousedown', (e) => {
    if (minigameActive) {
        mouseDown = true;
    }
});

document.addEventListener('mouseup', (e) => {
    if (minigameActive) {
        mouseDown = false;
    }
});

// Keyboard controls (spacebar)
document.addEventListener('keydown', (e) => {
    if (minigameActive && e.code === 'Space') {
        mouseDown = true;
        e.preventDefault(); // Prevent page scrolling
    }
});

document.addEventListener('keyup', (e) => {
    if (minigameActive && e.code === 'Space') {
        mouseDown = false;
        e.preventDefault();
    }
});

// Touch controls for mobile
document.addEventListener('touchstart', (e) => {
    if (minigameActive) {
        mouseDown = true;
        e.preventDefault();
    }
});

document.addEventListener('touchend', (e) => {
    if (minigameActive) {
        mouseDown = false;
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
function updateInventoryDisplay() {
    const fishCountDiv = document.getElementById('fish-count');
    fishCountDiv.textContent = `${inventory.length}/${maxInventorySlots}`;
    
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
        
        const price = fishPrices[fish.type] * fish.weight;
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
    const price = fishPrices[fish.type] * fish.weight;
    money += price;
    inventory.splice(index, 1);
    updateShopDisplay();
    updateInventoryDisplay();
    saveGameData();
}

function sellAllFish() {
    let totalEarned = 0;
    inventory.forEach(fish => {
        const price = fishPrices[fish.type] * fish.weight;
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
