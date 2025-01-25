function drawLottery() {
    // 抽選ロジック
    const letters = ['A', 'B', 'C', 'D', 'E'].sort(() => Math.random() - 0.5);
    
    // DOM更新
    for (let i = 1; i <= 5; i++) {
        const cell = document.getElementById(`p${i}`);
        cell.textContent = letters[i-1];
        cell.style.animation = 'highlight 0.5s ease';
    }

    // 結果テーブルの表示アニメーション
    const resultTable = document.getElementById('resultTable');
    resultTable.classList.add('show');

    // サウンドフィードバック
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
}

// アニメーションリセット用
document.querySelectorAll('td').forEach(cell => {
    cell.addEventListener('animationend', () => {
        cell.style.animation = '';
    });
});
