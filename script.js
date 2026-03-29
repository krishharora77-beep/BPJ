let lastPrice = 0;
let chart;
let prices = [];
let labels = [];

// 🔥 FETCH REAL GOLD PRICE FROM YOUR BACKEND
async function fetchGold() {
    try {
        const res = await fetch("/api/gold");
        const data = await res.json();

        // Convert ounce → gram
        let price = (data.price / 31.1).toFixed(2);

        let el = document.getElementById("goldPrice");

        // 🔴🟢 COLOR CHANGE
        if (lastPrice != 0) {
            if (price > lastPrice) {
                el.className = "up";
            } else if (price < lastPrice) {
                el.className = "down";
            }
        }

        el.innerText = "₹ " + price + " / gram";

        lastPrice = price;

        updateGraph(price);

    } catch (err) {
        console.log("Error fetching gold price:", err);
    }
}

// 📈 START CHART
function startChart() {
    const ctx = document.getElementById("chart");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Gold Price (₹/g)",
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
    let time = new Date().toLocaleTimeString();

    prices.push(price);
    labels.push(time);

    // Keep last 20 points
    if (prices.length > 20) {
        prices.shift();
        labels.shift();
    }

    chart.update();
}

// 🚀 START EVERYTHING
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("goldPrice")) {
        startChart();
        fetchGold();
        setInterval(fetchGold, 4000); // update every 4 sec
    }
});
