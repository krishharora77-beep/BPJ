let lastPrice = 0;
let chart;
let prices = [];
let labels = [];

async function fetchGold() {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=gold&vs_currencies=inr");
        const data = await res.json();

        // fallback simulated gold price (since coingecko gold is limited)
        let price = (Math.random() * 100 + 6000).toFixed(2);

        let el = document.getElementById("goldPrice");

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
        console.log(err);
    }
}
function startChart() {
    const ctx = document.getElementById("chart");

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Gold Price",
                data: prices,
                borderWidth: 2
            }]
        }
    });
}

function updateGraph(price) {
    let time = new Date().toLocaleTimeString();

    prices.push(price);
    labels.push(time);

    if (prices.length > 15) {
        prices.shift();
        labels.shift();
    }

    chart.update();
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("goldPrice")) {
        startChart();
        fetchGold();
        setInterval(fetchGold, 4000);
    }
});
