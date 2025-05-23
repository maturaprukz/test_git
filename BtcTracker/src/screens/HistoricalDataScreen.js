import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { getHistoricalBtcData } from '../services/api';
import { calculateSMA, getTrendIndicators } from '../../utils/analysis';

const HistoricalDataScreen = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [smaData, setSmaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(30); // Default to 30 days

  const fetchHistoricalData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHistoricalData([]); // Clear previous data
    setSmaData([]); // Clear previous SMA data
    try {
      const data = await getHistoricalBtcData(days);
      if (data && Array.isArray(data) && data.length > 0) {
        setHistoricalData(data);
        const prices = data.map(item => item[1]);
        const sma7 = calculateSMA(prices, 7);
        setSmaData(sma7);
      } else {
        setError('Failed to fetch historical BTC data or data is empty. The API returned an unexpected response.');
        setHistoricalData([]); 
      }
    } catch (e) {
      setError(`Failed to fetch historical BTC data for ${days} days. Please check your connection or try again later.`);
      setHistoricalData([]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  const changeDays = (newDays) => {
    setDays(newDays);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historical BTC Prices (Last {days} days)</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="7 Days" onPress={() => changeDays(7)} disabled={loading || days === 7} />
        <Button title="30 Days" onPress={() => changeDays(30)} disabled={loading || days === 30} />
        <Button title="90 Days" onPress={() => changeDays(90)} disabled={loading || days === 90} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : historicalData.length > 0 ? (
        <>
          <View style={styles.chartPlaceholder}>
            <Text>Chart will be displayed here</Text>
          </View>
          <Text style={styles.dataTitle}>SMA (7-day):</Text>
          {smaData.length > 0 ? (
            <Text style={styles.dataPoint}>
              {smaData.slice(0, 3).map(val => val.toFixed(2)).join(', ')}...
            </Text>
          ) : (
            <Text style={styles.dataPoint}>Calculating SMA...</Text>
          )}

          <Text style={styles.dataTitle}>Sample Raw Data Points:</Text>
          {historicalData.slice(0, 3).map((item, index) => (
            <Text key={index} style={styles.dataPoint}>
              Timestamp: {new Date(item[0]).toLocaleDateString()}, Price: ${item[1].toFixed(2)}
            </Text>
          ))}

          <View style={styles.analysisSection}>
            <Text style={styles.dataTitle}>Trend Analysis:</Text>
            <Text style={styles.dataPoint}>
              Current Trend: {getTrendIndicators(smaData.length > 0 ? smaData : historicalData.map(p => p[1]))}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.errorText}>{error || 'No historical data available for the selected period.'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 30,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
    borderRadius: 8,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  dataPoint: {
    fontSize: 12,
    color: '#333',
    marginBottom: 3,
  },
  analysisSection: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  }
});

export default HistoricalDataScreen;
