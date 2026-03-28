const apiKey = "goldapi-1n1ypo19mn96w2wu-io";

fetch("https://www.goldapi.io/api/XAU/INR", {
    method: "GET",
    headers: {
        "x-access-token": apiKey,
        "Content-Type": "application/json"
    }
})
    .then(response => response.json())
    .then(data => {
        let goldRate = (data.price / 31.1).toFixed(2); // per gram

        document.getElementById("goldPrice").innerText =
            "₹ " + goldRate + " per gram";

        // Calculator
        window.calculate = function () {
            let grams = document.getElementById("grams").value;
            let total = grams * goldRate;

            document.getElementById("result").innerText =
                "Total Price: ₹ " + total;
        };

        // Suggestion logic
        if (goldRate < 6000) {
            document.getElementById("suggestion").innerText =
                "🟢 Good time to BUY";
        } else {
            document.getElementById("suggestion").innerText =
                "🔴 Price is high, wait";
        }

    })
    .catch(error => {
        document.getElementById("goldPrice").innerText =
            "Error loading price 😢";
    });

window.toggleTab = function (element) {
    alert("Clicked!");

    let tab = element.parentElement;

    document.querySelectorAll(".tab").forEach(t => {
        t.classList.remove("active");
    });

    tab.classList.add("active");
}

const ctx = document.getElementById('chart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Gold Price (₹/gram)',
            data: [5900, 6100, 6050, 6200, 6150],
            borderWidth: 2,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

let goldRate = 6200;

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("goldPrice")) {
        document.getElementById("goldPrice").innerText =
            "₹ " + goldRate + " per gram";
    }

});

function calculate() {
    let grams = document.getElementById("grams").value;
    let total = grams * goldRate;

    document.getElementById("result").innerText =
        "₹ " + total;
}

function contact() {
    window.open("https://wa.me/91XXXXXXXXXX", "_blank");
}