const participants = [
  { name: 'Ueda', color: '#FF6B6B' },
  { name: 'Ojima', color: '#4ECDC4' },
  { name: 'Maruo', color: '#45B7D1' },
  { name: 'Mimura', color: '#96CEB4' },
  { name: 'Abe', color: '#FFEEAD' }
];

let isAnimating = false;
let animationFrameId = null;

function drawLottery() {
    if (isAnimating) return;
    isAnimating = true;
    
    const progressContainer = document.querySelector('.progress-container');
    const progressFill = document.querySelector('.progress-fill');
    const progressArrow = document.querySelector('.progress-arrow');
    
    progressContainer.classList.add('show');
    progressFill.classList.add('active');
    progressArrow.classList.add('active');
    
    startSlotAnimation();
}

function startSlotAnimation() {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    let startTime = null;
    const duration = 6250;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const progressPercent = Math.min((progress / duration) * 100, 100);

        if (progress < duration) {
            const randomLetters = participants
                .map(() => letters[Math.floor(Math.random() * letters.length)])
                .sort(() => Math.random() - 0.5);
                
            updateDisplay(randomLetters);
            animationFrameId = requestAnimationFrame(animate);
        } else {
            showFinalResult();
        }
    }

    animationFrameId = requestAnimationFrame(animate);
}

function showFinalResult() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    setTimeout(() => {
        const progressContainer = document.querySelector('.progress-container');
        const progressFill = document.querySelector('.progress-fill');
        const progressArrow = document.querySelector('.progress-arrow');
        
        progressContainer.classList.remove('show');
        progressFill.classList.remove('active');
        progressArrow.classList.remove('active');
    }, 500);

    const finalLetters = ['A', 'B', 'C', 'D', 'E'].sort(() => Math.random() - 0.5);
    updateDisplay(finalLetters);
    playSound();
    isAnimating = false;
    
    const resultContainer = document.getElementById('resultTable');
    resultContainer.classList.add('show');
}

function updateDisplay(letters) {
    participants.forEach((participant, index) => {
        const element = document.getElementById(`p${index + 1}`);
        if (!element) return;

        element.innerHTML = `
            <div class="result-content">
                <span class="name" style="color: ${participant.color}">${participant.name}</span>
                <span class="letter">${letters[index]}</span>
            </div>
        `;

        element.style.animation = 'highlight 0.5s ease-out';
    });
}

function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.warn('サウンド再生に失敗しました:', error);
    }
}

document.querySelectorAll('.result-item').forEach(element => {
    element.addEventListener('animationend', () => {
        element.style.animation = '';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            document.querySelectorAll('.result-item').forEach(element => {
                element.style.willChange = 'transform, opacity';
            });
        });
    }
});