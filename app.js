import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [age, setAge] = useState('');
  const [lowerLimit, setLowerLimit] = useState(null);
  const [upperLimit, setUpperLimit] = useState(null);

  const calculateHeartRateLimits = () => {
    const ageNumber = parseInt(age, 10);

    if (!isNaN(ageNumber)) {
      const lower = (220 - ageNumber) * 0.65;
      const upper = (220 - ageNumber) * 0.85;

      setLowerLimit(lower.toFixed(2));
      setUpperLimit(upper.toFixed(2));
    } else {
      setLowerLimit(null);
      setUpperLimit(null);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Sydämen Sykkeen Rajoitusten Laskuri</Text>
      <Text>Syötä ikäsi:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Syötä ikä"
      />
      <Button title="Laske" onPress={calculateHeartRateLimits} />
      {lowerLimit !== null && upperLimit !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Alaraja: {lowerLimit} bpm</Text>
          <Text style={styles.resultText}>Yläraja: {upperLimit} bpm</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    width: '80%',
    paddingHorizontal: 8,
  },
  resultContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
  },
});