# Testing Strategy for BtcTracker App (Conceptual)

Given the current development environment limitations where direct execution and automated testing (e.g., Jest, React Native Testing Library) are not feasible, this document outlines a conceptual manual testing approach for the BtcTracker application.

## I. Unit/Component Level Testing (Conceptual)

For each component and utility function, we would conceptually verify:

1.  **`src/services/api.js`:**
    *   **`getCurrentBtcPrice()`:**
        *   Mock `axios.get` to return a successful CoinGecko API response. Verify the function correctly parses the price.
        *   Mock `axios.get` to return an error response. Verify the function handles the error gracefully (e.g., returns null or error object).
        *   Mock `axios.get` to return an unexpected/malformed response. Verify robust error handling.
    *   **`getHistoricalBtcData(days)`:**
        *   Mock `axios.get` for various `days` parameters, ensuring the correct API endpoint is called.
        *   Verify successful parsing of the `prices` array from the response.
        *   Test error handling similar to `getCurrentBtcPrice`.
        *   Test with `days = 0` or invalid `days` values if specific logic for these exists.

2.  **`src/utils/analysis.js`:**
    *   **`calculateSMA(data, period)`:**
        *   Test with various datasets (empty, short, normal) and periods.
        *   Verify correct SMA calculation against manually calculated values.
        *   Check edge cases (e.g., `period` greater than data length, `period` <= 0).
    *   **`getTrendIndicators(data)`:**
        *   (Once implemented) Test with data representing clear upward, downward, and sideways trends.

3.  **`src/screens/HomeScreen.js`:**
    *   **Initial State:** Verify `loading` is true, `price` and `error` are null.
    *   **Data Loading:**
        *   Conceptually, after `componentDidMount` (or `useEffect` runs), if `getCurrentBtcPrice` succeeds, verify `price` state is updated, `loading` is false, and `error` is null.
        *   Verify the UI displays the fetched price.
    *   **Error State:** If `getCurrentBtcPrice` fails, verify `error` state is updated, `loading` is false, and an error message is displayed.
    *   **Refresh Button:** Verify pressing the button re-triggers `getCurrentBtcPrice`.
    *   **Navigation Button:** Verify the "View Historical Data" button (conceptually) attempts to navigate.

4.  **`src/screens/HistoricalDataScreen.js`:**
    *   **Initial State & Data Loading:** Similar to `HomeScreen`, but for `historicalData`, `smaData`, and `days` state.
    *   **Period Change:** Verify pressing period buttons (7D, 30D, 90D) updates the `days` state and re-fetches data.
    *   **SMA Calculation Display:** Verify `smaData` is correctly calculated from `historicalData` and a sample is displayed.
    *   **Chart Placeholder:** Verify the placeholder text for the chart is visible.
    *   **Trend Indicator Placeholder:** Verify placeholder text from `getTrendIndicators` is shown.

## II. Navigation Testing (Conceptual)

*   **`App.js` & `HomeScreen.js`:**
    *   Verify that the conceptual navigation setup in `App.js` correctly defines "Home" and "HistoricalData" routes.
    *   Verify that pressing the "View Historical Data" button on `HomeScreen` would trigger navigation to the `HistoricalDataScreen`.
    *   Verify that the Stack Navigator would provide a back button on `HistoricalDataScreen` to return to `HomeScreen`.

## III. General UI/UX Checks (Conceptual)

*   **Clarity:** Is information presented clearly?
*   **Consistency:** Is the design and interaction consistent across screens?
*   **Error States:** Are error messages user-friendly?
*   **Loading States:** Are loading indicators present during data fetching?

## IV. Limitations

This manual, conceptual testing is not a substitute for automated tests or real-device testing. Issues related to specific device rendering, performance, or native module interactions cannot be identified through this method.
