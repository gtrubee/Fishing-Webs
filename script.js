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
        barSize: 120,
        fishSpeed: 0.01875,
        fishRandomness: 0.375,
        fishChangeInterval: 133,
        progressGainRate: 0.5,
        progressDecayRate: 0.3,
        minWeight: 3,
        maxWeight: 18
    },
    salmon: {
        name: 'Salmon',
        color: '#FF6B35',
        difficulty: 'Average',
        barSize: 120,
        fishSpeed: 0.03,
        fishRandomness: 0.75,
        fishChangeInterval: 100,
        progressGainRate: 0.5,
        progressDecayRate: 0.3,
        minWeight: 8,
        maxWeight: 30
    },
    sturgeon: {
        name: 'Sturgeon',
        color: '#FF6B35',
        difficulty: 'Hard',
        barSize: 120,
        fishSpeed: 0.0375,
        fishRandomness: 1.5,
        fishChangeInterval: 67,
        progressGainRate: 0.5,
        progressDecayRate: 0.3,
        minWeight: 30,
        maxWeight: 100
    }
};

let currentFish = null;
let currentFishWeight = 0;

// Minigame variables
let barY = 350;
let barHeight = 120;
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
    
    sceneCanvas.style.display = 'none';
    minigameCanvas.style.display = 'block';
    
    // Reset minigame variables with fish-specific difficulty (adjusted by weight)
    barY = 350;
    barHeight = currentFish.barSize;
    barSpeed = 0;
    fishY = minigameCanvas.height - 50;
    fishSpeed = 0;
    fishTargetY = minigameCanvas.height - 50;
    fishChangeTimer = 0;
    progress = 0;
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
        statusDiv.textContent = `🐟 You caught a ${currentFish.name} weighing ${currentFishWeight} lbs! Great job!`;
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

// Animate the scene
function animateScene() {
    if (!minigameActive) {
        drawScene();
    }
    requestAnimationFrame(animateScene);
}
animateScene();

// Handle window resize
window.addEventListener('resize', () => {
    sceneCanvas.width = window.innerWidth;
    sceneCanvas.height = window.innerHeight;
    drawScene();
});
