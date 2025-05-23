import axios from 'axios';

// Base URL for the CoinGecko API
const API_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Fetches the current price of Bitcoin in USD from the CoinGecko API.
 * API Endpoint: /simple/price?ids=bitcoin&vs_currencies=usd
 * @returns {Promise<number|null>} The current Bitcoin price in USD, or null if an error occurs.
 */
export const getCurrentBtcPrice = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/simple/price`, {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'usd',
      },
    });
    // Example response: {"bitcoin":{"usd":60000}}
    if (response.data && response.data.bitcoin && response.data.bitcoin.usd) {
      return response.data.bitcoin.usd;
    } else {
      console.error('Invalid response format for current BTC price');
      return null;
    }
  } catch (error) {
    console.error('Error fetching current BTC price:', error.message);
    // You might want to throw the error or handle it differently based on app requirements
    return null;
  }
};

/**
 * Fetches historical market data (prices) for Bitcoin in USD from the CoinGecko API
 * for a specified number of days.
 * API Endpoint: /coins/bitcoin/market_chart?vs_currency=usd&days={days}
 * @param {number} days - The number of days to fetch historical data for (e.g., 7, 30, 90). Defaults to 30.
 * @returns {Promise<Array<[number, number]>|null>} An array of [timestamp, price] pairs, or null if an error occurs.
 *                                                The API returns arrays for prices, market_caps, and total_volumes.
 *                                                We are primarily interested in the 'prices' array.
 */
export const getHistoricalBtcData = async (days = 30) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/bitcoin/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
      },
    });
    // Example response snippet for prices: { "prices": [[1672531200000, 20000.0], [1672617600000, 20100.0], ...] }
    if (response.data && response.data.prices) {
      return response.data.prices; // This is an array of [timestamp, price]
    } else {
      console.error('Invalid response format for historical BTC data');
      return null;
    }
  } catch (error) {
    console.error(`Error fetching historical BTC data for ${days} days:`, error.message);
    // You might want to throw the error or handle it differently based on app requirements
    return null;
  }
};
