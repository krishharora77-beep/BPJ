let lastPrice = 0;
let chart;
let prices = [];
let labels = [];

async function fetchGold() {
    try {
        const res = await fetch("https://api.metals.live/v1/spot/gold");
        const data = await res.json();

        let price = (data[0].gold / 31.1).toFixed(2);

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
