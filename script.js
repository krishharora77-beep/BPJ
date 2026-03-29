let lastPrice = 0;
let chart;
let prices = [];
let labels = [];

async function fetchGold() {
    try {
        const res = await fetch("/api/gold");

        if (!res.ok) throw new Error("API error");

        const data = await res.json();

        let price = data.price; // ✅ NO CONVERSION

        const el = document.getElementById("goldPrice");

        // 🟢🔴 COLOR CHANGE
        if (lastPrice !== 0) {
            if (price > lastPrice) {
                el.className = "up";
            } else if (price < lastPrice) {
                el.className = "down";
            } else {
                el.className = "";
            }
        }

        el.innerText = "₹ " + price;

        lastPrice = price;

        updateGraph(price);

        // 🕒 show update time
        const timeEl = document.getElementById("updateTime");
        if (timeEl) {
            timeEl.innerText = "Updated: " + new Date().toLocaleTimeString();
        }

    } catch (err) {
        console.log(err);
        document.getElementById("goldPrice").innerText = "API Error ❌";
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
        setInterval(fetchGold, 5000); // every 5 sec
    }
});
