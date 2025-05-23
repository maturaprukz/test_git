# BtcTracker App

## Description

A React Native application for tracking Bitcoin (BTC) prices and performing basic analysis. This project is developed to demonstrate core React Native concepts, API integration, and basic data visualization/analysis techniques.

## Features (Current & Conceptual)

*   **View Current BTC Price:** Fetches and displays the latest Bitcoin price in USD.
*   **View Historical BTC Price Data:** Allows viewing historical price data for different periods (e.g., 7 days, 30 days, 90 days).
*   **Basic Analysis:**
    *   Calculates Simple Moving Averages (SMA) on historical data.
    *   (Conceptual: Placeholder for trend indicators).
*   **Data Source:** Uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation) for cryptocurrency data.
*   **(Planned/Conceptual):**
    *   Chart visualization of historical data using `react-native-chart-kit`.
    *   More advanced analysis tools.
    *   User interface improvements.

## Tech Stack

*   **React Native:** Core framework for building the mobile application.
*   **JavaScript (ES6+):** Programming language.
*   **Axios:** For making HTTP requests to the CoinGecko API.
*   **CoinGecko API:** Public API for fetching Bitcoin price data.
*   **(Conceptual Dependencies):** `react-native-chart-kit` (for charts), `@react-navigation/native`, `@react-navigation/stack` (for navigation).

## Setup & Running (Conceptual)

Due to the current development environment limitations, direct execution of this React Native application (e.g., via `npm start` or building the app) is not possible. However, if you were to run this project in a standard React Native development environment, the steps would typically be:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd BtcTracker
    ```

2.  **Install dependencies:**
    (Ensure you have Node.js, npm/yarn, and React Native CLI set up)
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Run the application:**
    *   **For Android:**
        ```bash
        npx react-native run-android
        ```
    *   **For iOS:**
        ```bash
        npx react-native run-ios
        ```
    (This requires having an emulator running or a device connected, and appropriate platform-specific setup like Android Studio/SDK and Xcode).

## API Source

This application uses the free tier of the [CoinGecko API](https://www.coingecko.com/en/api/documentation) for all Bitcoin data. Please be mindful of their rate limits if you adapt or extend this project.
