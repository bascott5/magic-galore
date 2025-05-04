"use strict";

document.addEventListener('alpine:init', () => {
    Alpine.data('cart', () => ({
        cost: 0,

        init() {
            let prices = document.querySelectorAll(".price");
            let qty = document.querySelectorAll(".qty");

            for (let i = 0; i < prices.length; i++) {
                this.cost += parseFloat(prices[i].textContent.slice(1)) * qty[i].children[0].value;

            }
            this.cost *= 1.0675;

            document.querySelector(".total").textContent = "$" + this.cost.toFixed(2);
        },
    }));
});