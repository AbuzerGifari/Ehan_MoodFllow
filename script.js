document.addEventListener("DOMContentLoaded", () => {
    // 1. AI Greeting Logic
    const hours = new Date().getHours();
    const greet = hours < 12 ? "Morning, Ehan" : hours < 18 ? "Afternoon, Ehan" : "Evening, Ehan";
    document.getElementById('userGreeting').innerText = `Good ${greet}.`;

    // 2. Local AI Sentiment Engine (Free & Fast)
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.addEventListener('click', () => {
        const text = document.getElementById('journalText').value.toLowerCase();
        const insightBox = document.getElementById('aiInsightBox');
        const insightText = document.getElementById('insightText');

        if (!text) return;

        insightBox.classList.remove('hidden');
        insightText.innerText = "Analyzing patterns...";

        // Open Source Logic: Pattern Matching Sentiment
        setTimeout(() => {
            let feedback = "";
            if (text.match(/(sad|down|tired|angry|hate|bad)/g)) {
                feedback = "I notice some heavy emotions. Remember, it's okay to feel this way. Let's try the Zen Focus for 1 minute.";
            } else if (text.match(/(happy|great|good|love|excited|achieved)/g)) {
                feedback = "Your energy is peak! This is a great time to tackle your biggest goal for today.";
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            } else {
                feedback = "You're in a stable flow. Perfect for deep reflection or creative work.";
            }
            insightText.innerText = feedback;
        }, 800);
    });

    // 3. Voice-to-Text (Premium Feature)
    const voiceBtn = document.getElementById('voiceBtn');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        voiceBtn.onclick = () => {
            recognition.start();
            voiceBtn.innerText = "🛑";
        };
        recognition.onresult = (event) => {
            document.getElementById('journalText').value += event.results[0][0].transcript;
            voiceBtn.innerText = "🎤";
        };
    }

    // 4. Zen Timer Logic
    let timerEl = document.getElementById('timer');
    let startBtn = document.getElementById('startZen');
    let timeLeft = 60;

    startBtn.onclick = () => {
        const interval = setInterval(() => {
            if(timeLeft <= 0) {
                clearInterval(interval);
                timerEl.innerText = "Done!";
                startBtn.innerText = "Reset";
            } else {
                timeLeft--;
                let mins = Math.floor(timeLeft / 60);
                let secs = timeLeft % 60;
                timerEl.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }
        }, 1000);
    };

    // 5. High-End Chart
    const ctx = document.getElementById('moodChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Mind Flow',
                data: [1, 2, 1.5, 2, 2.5],
                borderColor: '#8b5cf6',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(139, 92, 246, 0.05)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });
});
