// IMPORTANT: The analysis functions provided are for informational purposes only and should not be considered financial advice or predictions.

/**
 * Calculates the Simple Moving Average (SMA) for a given dataset and period.
 * @param {number[]} data - An array of numbers (e.g., prices).
 * @param {number} period - The window size for the SMA (e.g., 7, 14, 30).
 * @returns {number[]} An array of SMA values. The length of the SMA array will be
 *                     shorter than the input data array by `period - 1`.
 *                     Returns an empty array if the data is too short for the period.
 */
export const calculateSMA = (data, period) => {
  if (!data || data.length < period || period <= 0) {
    return []; // Not enough data to calculate SMA for the given period or invalid period
  }

  const smaValues = [];
  for (let i = 0; i <= data.length - period; i++) {
    const window = data.slice(i, i + period);
    const sum = window.reduce((acc, val) => acc + val, 0);
    smaValues.push(sum / period);
  }
  return smaValues;
};

/**
 * Placeholder for a function to analyze recent price changes to determine trends.
 * This function is not fully implemented in this iteration.
 * Future enhancements could include logic for identifying "upward", "downward", or "sideways" trends.
 * @param {number[]} data - An array of numbers (e.g., prices or SMA values).
 * @returns {string} A string indicating the conceptual trend (e.g., "Trend analysis not yet implemented").
 */
export const getTrendIndicators = (data) => {
  // TODO: Implement logic to analyze data for trends.
  // This might involve comparing recent data points, looking at the slope of SMA, etc.
  // For now, it returns a placeholder message.
  if (data && data.length > 1) {
    // Conceptual: if last value > first value in a recent subset, trend might be upward.
    // This is a gross oversimplification.
    // const recentData = data.slice(-Math.min(5, data.length)); // Look at last 5 points or fewer
    // if (recentData[recentData.length - 1] > recentData[0]) return "Conceptual Upward";
    // if (recentData[recentData.length - 1] < recentData[0]) return "Conceptual Downward";
    // return "Conceptual Sideways";
  }
  return "Trend analysis not yet implemented.";
};

// Example Usage (for testing purposes, can be removed or commented out)
// const priceData = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// console.log("Price Data:", priceData);
// const sma7 = calculateSMA(priceData, 7);
// console.log("SMA(7):", sma7); // Expected: [13, 14, 15, 16, 17]
// const sma3 = calculateSMA(priceData, 3);
// console.log("SMA(3):", sma3); // Expected: [11, 12, 13, 14, 15, 16, 17, 18, 19]

// console.log("Trend for SMA(7):", getTrendIndicators(sma7));
// console.log("Trend for empty data:", getTrendIndicators([]));
