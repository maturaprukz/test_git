import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { getCurrentBtcPrice } from '../services/api';

const HomeScreen = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const currentPrice = await getCurrentBtcPrice();
      if (currentPrice !== null) {
        setPrice(currentPrice);
      } else {
        setError('Failed to fetch BTC price. The API returned an unexpected response.');
      }
    } catch (e) {
      setError('Failed to fetch BTC price. Please check your connection or try again later.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  // useEffect(() => {
  //   // Placeholder for setting up a periodic refresh timer
  //   // In a full app, you might use AppState to refresh when app comes to foreground
  //   // or a library like react-native-background-timer for background updates.
  //   const intervalId = setInterval(() => {
  //     console.log("Conceptual refresh triggered");
  //     // fetchPrice(); // Call the memoized fetch function
  //   }, 30000); // e.g., every 30 seconds
  //
  //   return () => clearInterval(intervalId);
  // }, [fetchPrice]); // fetchPrice is memoized with useCallback

  // Local storage for caching or offline access is not implemented in this iteration.
  // Future enhancement could involve using AsyncStorage to store the last fetched price
  // and display it on load before a fresh fetch, or to provide offline data.

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : price !== null ? (
        <>
          <Text style={styles.title}>Current BTC Price:</Text>
          <Text style={styles.priceText}>${price}</Text>
          <Text style={styles.placeholderText}>24h Change: N/A</Text>
        </>
      ) : (
        <Text style={styles.errorText}>No price data available.</Text> 
      )}
      <Button title="Refresh" onPress={fetchPrice} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
