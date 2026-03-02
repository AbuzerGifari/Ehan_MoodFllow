document.addEventListener("DOMContentLoaded", () => {
    const vibeSlider = document.getElementById('vibeSlider');
    const vibeOrb = document.getElementById('vibeOrb');
    const vibeLabel = document.getElementById('vibeLabel');
    const auraBg = document.getElementById('auraBg');
    const songName = document.getElementById('songName');
    const songEmoji = document.getElementById('songEmoji');

    // 1. Dynamic Vibe & Song Engine
    const songs = {
        low: { name: "Comfort Chain - Instupendo", emoji: "🌊", color: "#3b82f6", label: "Low & Calm" },
        mid: { name: "Lofi Girl - Chill Beats", emoji: "✨", color: "#8b5cf6", label: "Steady Flow" },
        high: { name: "Blinding Lights - Weeknd", emoji: "🔥", color: "#f59e0b", label: "Peak Energy" }
    };

    vibeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        let mood;
        if (val < 35) mood = songs.low;
        else if (val < 75) mood = songs.mid;
        else mood = songs.high;

        vibeOrb.style.background = mood.color;
        vibeOrb.style.boxShadow = `0 0 30px ${mood.color}`;
        vibeLabel.innerText = mood.label;
        auraBg.style.background = `radial-gradient(circle at 50% -20%, ${mood.color}, transparent 70%)`;
        songName.innerText = mood.name;
        songEmoji.innerText = mood.emoji;
        document.documentElement.style.setProperty('--accent', mood.color);
    });

    // 2. Zen Breathing Logic
    const breathCircle = document.getElementById('breathCircle');
    const breathText = document.getElementById('breathText');
    let breathing = false;

    breathCircle.onclick = () => {
        breathing = !breathing;
        if (breathing) {
            breathText.innerText = "Inhale";
            breathCircle.classList.add('inhale');
            const interval = setInterval(() => {
                if(!breathing) clearInterval(interval);
                breathText.innerText = breathText.innerText === "Inhale" ? "Exhale" : "Inhale";
            }, 4000);
        } else {
            location.reload();
        }
    };

    // 3. AI Sentiment Insight
    document.getElementById('analyzeBtn').onclick = () => {
        const text = document.getElementById('journalInput').value.toLowerCase();
        const aiBox = document.getElementById('aiResponse');
        const aiText = document.getElementById('aiText');

        aiBox.classList.remove('hidden');
        aiText.innerText = "MoodFlow is sensing your energy...";

        setTimeout(() => {
            if (text.includes('sad') || text.includes('tired')) {
                aiText.innerText = "Insight: You're in a recovery phase. Listen to the suggested song and take 5 deep breaths.";
            } else if (text.includes('happy') || text.includes('good')) {
                aiText.innerText = "Insight: Your vibe is radiant! Perfect time for creative tasks.";
                confetti({ particleCount: 100, spread: 70 });
            } else {
                aiText.innerText = "Insight: You are grounded. A steady mind leads to a productive day.";
            }
        }, 1000);
    };

    // 4. Chart.js Setup
    const ctx = document.getElementById('moodChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                data: [50, 65, 40, 80, 70],
                borderColor: '#8b5cf6',
                tension: 0.5,
                fill: true,
                backgroundColor: 'rgba(139, 92, 246, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });
});
