import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function IndexScreen() {
  const [age, setAge] = useState('');
  const [lowerLimit, setLowerLimit] = useState<number | null>(null);
  const [upperLimit, setUpperLimit] = useState<number | null>(null);

  const calculateHeartRateLimits = () => {
    const ageNumber = parseFloat(age.replace(',', '.')); // Korvataan pilkku pisteellä
    if (!isNaN(ageNumber)) {
      const lower = (220 - ageNumber) * 0.65;
      const upper = (220 - ageNumber) * 0.85;
      setLowerLimit(lower);
      setUpperLimit(upper);
    } else {
      setLowerLimit(null);
      setUpperLimit(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sydämen sykkeen rajat urheiluun</Text>
      <TextInput
        style={styles.input}
        placeholder="Syötä ikäsi"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <Button title="Laske rajat" onPress={calculateHeartRateLimits} />
      {lowerLimit !== null && upperLimit !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Alempi raja: {lowerLimit.toFixed(2)} bpm</Text>
          <Text style={styles.resultText}>Ylempi raja: {upperLimit.toFixed(2)} bpm</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
  },
});