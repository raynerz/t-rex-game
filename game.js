class DinoGame {
    constructor() {
        this.dino = document.getElementById('dino');
        this.cactus = document.getElementById('cactus');
        this.scoreElement = document.getElementById('score');
        this.gameOverElement = document.getElementById('game-over');
        
        this.score = 0;
        this.isJumping = false;
        this.isGameOver = false;
        this.gameSpeed = 3;
        this.jumpHeight = 100;
        
        // Difficulty settings
        this.difficultyLevel = 0;
        this.baseJumpDuration = 1000;
        this.minJumpDuration = 800;
        this.speedIncrement = 0.5; // Increased speed increment for more noticeable changes
        this.baseCactusSpacing = 300; // Base distance between cacti
        this.minCactusSpacing = 150; // Minimum distance between cacti
        this.spacingIncrement = 50; // How much to reduce spacing per level
        
        // Fibonacci sequence for difficulty thresholds
        this.difficultyThresholds = this.generateFibonacciThresholds(10);
        
        this.init();
    }
    
    generateFibonacciThresholds(start) {
        const thresholds = [start];
        let prev = start;
        let curr = start;
        
        // Generate 6 levels using Fibonacci sequence
        for (let i = 0; i < 5; i++) {
            const next = prev + curr;
            thresholds.push(next);
            prev = curr;
            curr = next;
        }
        
        return thresholds;
    }
    
    init() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                if (this.isGameOver) {
                    this.restart();
                } else if (!this.isJumping) {
                    this.jump();
                }
            }
        });
        
        this.startGameLoop();
    }
    
    jump() {
        this.isJumping = true;
        this.dino.classList.add('jump');
        
        // Calculate jump duration based on difficulty level
        const jumpDuration = Math.max(
            this.minJumpDuration,
            this.baseJumpDuration - (this.difficultyLevel * 100) // Increased reduction
        );
        
        setTimeout(() => {
            this.dino.classList.remove('jump');
            this.isJumping = false;
        }, jumpDuration);
    }
    
    startGameLoop() {
        const gameLoop = setInterval(() => {
            if (this.isGameOver) {
                clearInterval(gameLoop);
                return;
            }
            
            this.updateScore();
            this.moveCactus();
            this.checkCollision();
        }, 20);
    }
    
    moveCactus() {
        const currentPosition = parseInt(window.getComputedStyle(this.cactus).getPropertyValue('right'));
        
        if (currentPosition > 600) {
            // Calculate new spacing based on difficulty
            const spacing = Math.max(
                this.minCactusSpacing,
                this.baseCactusSpacing - (this.difficultyLevel * this.spacingIncrement)
            );
            this.cactus.style.right = `-${spacing}px`;
        } else {
            this.cactus.style.right = `${currentPosition + this.gameSpeed}px`;
        }
    }
    
    checkCollision() {
        const dinoRect = this.dino.getBoundingClientRect();
        const cactusRect = this.cactus.getBoundingClientRect();
        
        // More forgiving collision detection
        const collision = !(
            dinoRect.right < cactusRect.left + 10 ||
            dinoRect.left > cactusRect.right - 10 ||
            dinoRect.bottom < cactusRect.top + 10 ||
            dinoRect.top > cactusRect.bottom - 10
        );
        
        if (collision) {
            this.gameOver();
        }
    }
    
    updateScore() {
        this.score++;
        this.scoreElement.textContent = `Score: ${Math.floor(this.score / 50)}`;
        
        // Progressive difficulty system
        const newDifficultyLevel = this.difficultyThresholds.findIndex(threshold => this.score < threshold);
        if (newDifficultyLevel !== -1 && newDifficultyLevel !== this.difficultyLevel) {
            this.difficultyLevel = newDifficultyLevel;
            this.gameSpeed += this.speedIncrement;
            
            // Update jump animation duration in CSS
            const jumpDuration = Math.max(
                this.minJumpDuration,
                this.baseJumpDuration - (this.difficultyLevel * 100)
            );
            document.documentElement.style.setProperty('--jump-duration', `${jumpDuration}ms`);
            
            // Visual feedback for difficulty change
            this.showDifficultyChange();
        }
    }
    
    showDifficultyChange() {
        const levelNames = ['Easy', 'Medium', 'Hard', 'Expert', 'Master', 'Legend'];
        const feedback = document.createElement('div');
        feedback.textContent = `Level ${this.difficultyLevel + 1}: ${levelNames[this.difficultyLevel]}`;
        feedback.style.cssText = `
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            animation: fadeOut 2s forwards;
            z-index: 1000;
        `;
        document.querySelector('.game-container').appendChild(feedback);
        
        // Remove the feedback after animation
        setTimeout(() => feedback.remove(), 2000);
    }
    
    gameOver() {
        this.isGameOver = true;
        this.gameOverElement.classList.remove('hidden');
    }
    
    restart() {
        this.score = 0;
        this.gameSpeed = 3;
        this.difficultyLevel = 0;
        this.isGameOver = false;
        this.scoreElement.textContent = 'Score: 0';
        this.gameOverElement.classList.add('hidden');
        this.cactus.style.right = `-${this.baseCactusSpacing}px`;
        document.documentElement.style.setProperty('--jump-duration', `${this.baseJumpDuration}ms`);
        this.startGameLoop();
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new DinoGame();
}); 