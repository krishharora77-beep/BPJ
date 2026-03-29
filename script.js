let lastPrice = 0;
let chart;
let prices = [];
let labels = [];

async function fetchGold() {
    try {
        const res = await fetch("/api/gold");

        if (!res.ok) throw new Error("API failed");

        const data = await res.json();

        console.log("API DATA:", data); // 🔍 DEBUG

        // ✅ SAFE CHECK
        if (!data || !data.price) {
            throw new Error("Invalid data");
        }

        let price = data.price;

        const el = document.getElementById("goldPrice");

        if (lastPrice !== 0) {
            if (price > lastPrice) el.className = "up";
            else if (price < lastPrice) el.className = "down";
            else el.className = "";
        }

        el.innerText = "₹ " + price;

        lastPrice = price;

        updateGraph(price);

    } catch (err) {
        console.log("ERROR:", err);

        document.getElementById("goldPrice").innerText =
            "Data unavailable ⚠️";
    }
}

// 📈 GRAPH
function startChart() {
    const ctx = document.getElementById("chart");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Gold Price",
                data: prices,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            animation: false
        }
    });
}

// 🔄 UPDATE GRAPH
function updateGraph(price) {
    const time = new Date().toLocaleTimeString();

    prices.push(price);
    labels.push(time);

    if (prices.length > 20) {
        prices.shift();
        labels.shift();
    }

    chart.update();
}

// 🚀 START
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("goldPrice")) {
        startChart();
        fetchGold();
    }
});

// buy suggestion
function updateSuggestion(currentPrice) {
    const adviceEl = document.getElementById("advice");

    if (!adviceEl) return;

    if (lastPrice !== 0) {
        if (currentPrice > lastPrice) {
            adviceEl.innerText = "WAIT ⏳ (Price rising)";
            adviceEl.className = "up";
        } else if (currentPrice < lastPrice) {
            adviceEl.innerText = "BUY 💰 (Price dropping)";
            adviceEl.className = "down";
        } else {
            adviceEl.innerText = "HOLD 🤝 (Stable)";
            adviceEl.className = "";
        }
    }
}
