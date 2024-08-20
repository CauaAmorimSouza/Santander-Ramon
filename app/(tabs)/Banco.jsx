import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BalanceDisplay = ({ balance }) => {
  return (
    <View style={styles.balanceContainer}>
      <Text style={styles.label}>Saldo Atual:</Text>
      <Text style={styles.balance}>R$ {balance.toFixed(2)}</Text>
    </View>
  );
};

const TransactionButtons = ({ onDeposit, onWithdraw }) => {
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      onDeposit(value);
      setAmount('');
    }
  };

  const handleWithdraw = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      onWithdraw(value);
      setAmount('');
    }
  };

  return (
    <View style={styles.transactionContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={styles.buttonContainer}>
        <Button title="Depositar" onPress={handleDeposit} />
        <Button title="Sacar" onPress={handleWithdraw} />
      </View>
    </View>
  );
};

const AccountScreen = () => {
  const [balance, setBalance] = useState(7320.92);

  const handleDeposit = (amount) => {
    const bonus = amount * 0.01;
    setBalance(prevBalance => prevBalance + amount + bonus);
  };

  const handleWithdraw = (amount) => {
    const penalty = balance * 0.025;
    setBalance(prevBalance => prevBalance - amount - penalty);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BalanceDisplay balance={balance} />
      <TransactionButtons onDeposit={handleDeposit} onWithdraw={handleWithdraw} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  balanceContainer: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  transactionContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AccountScreen;
