let prices = [7, 6, 4, 3, 1];

var maxProfit = function (prices) {
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[i] - prices[j] >= profit) {
        profit = prices[i] - prices[j];
      }
    }
  }
  return profit;
};

console.log(maxProfit(prices));
