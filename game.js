class DinoGame {
    constructor() {
        this.dino = document.getElementById('dino');
        this.cactus = document.getElementById('cactus');
        this.scoreElement = document.getElementById('score');
        this.gameOverElement = document.getElementById('game-over');
        
        this.score = 0;
        this.isJumping = false;
        this.isGameOver = false;
        this.gameSpeed = 2;
        
        this.init();
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
        
        setTimeout(() => {
            this.dino.classList.remove('jump');
            this.isJumping = false;
        }, 500);
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
            this.cactus.style.right = '-20px';
        } else {
            this.cactus.style.right = `${currentPosition + this.gameSpeed}px`;
        }
    }
    
    checkCollision() {
        const dinoTop = parseInt(window.getComputedStyle(this.dino).getPropertyValue('bottom'));
        const cactusLeft = parseInt(window.getComputedStyle(this.cactus).getPropertyValue('right'));
        
        if (cactusLeft > 500 && cactusLeft < 560 && dinoTop < 50) {
            this.gameOver();
        }
    }
    
    updateScore() {
        this.score++;
        this.scoreElement.textContent = `Score: ${Math.floor(this.score / 50)}`;
        
        // Increase game speed every 500 points
        if (this.score % 500 === 0) {
            this.gameSpeed += 0.5;
        }
    }
    
    gameOver() {
        this.isGameOver = true;
        this.gameOverElement.classList.remove('hidden');
    }
    
    restart() {
        this.score = 0;
        this.gameSpeed = 2;
        this.isGameOver = false;
        this.scoreElement.textContent = 'Score: 0';
        this.gameOverElement.classList.add('hidden');
        this.cactus.style.right = '-20px';
        this.startGameLoop();
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new DinoGame();
}); 