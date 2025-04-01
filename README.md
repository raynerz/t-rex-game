# Dino Game

A simple dinosaur game inspired by Chrome's offline T-Rex game. Jump over cacti and try to achieve the highest score!

## How to Play

1. Open `index.html` in your web browser
2. Press the Space bar to make the dinosaur jump
3. Avoid the cacti
4. Try to achieve the highest score possible
5. When you lose, press Space to restart

## Features

- Simple and intuitive controls
- Score tracking
- Progressive difficulty system
- Dynamic cactus spacing
- Dramatic speed progression
- Smooth animations
- Responsive design
- Visual difficulty level feedback

## Difficulty System

The game features a progressive difficulty system that increases challenge in multiple ways:

### Levels
- Level 1 (Easy): Base speed (2.0) and spacing
- Level 2 (Medium): Faster speed (3.0), reduced spacing
- Level 3 (Hard): Even faster (4.0), closer cacti
- Level 4 (Expert): Much faster (5.0), minimal spacing
- Level 5 (Master): Very fast (6.0), minimal spacing
- Level 6 (Legend): Maximum speed (7.0), minimal spacing

### Difficulty Parameters
1. **Speed**: Increases by 1.0 unit each level (starts at 2.0)
2. **Cactus Spacing**: Decreases by 50px each level (starts at 300px, minimum 150px)
3. **Jump Duration**: Decreases by 100ms each level (starts at 1000ms, minimum 800ms)

### Progression
- Uses Fibonacci sequence for level thresholds
- Starting threshold: 10 points
- Each subsequent threshold follows the Fibonacci pattern
- Creates a natural difficulty curve
- Dramatic speed increases make each level feel distinct

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+) 