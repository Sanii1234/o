import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import { colors } from './components/utils/colors';
import { Focus } from './components/Focus/Focus';
import { Timer } from './components/Focus/Timer';
import { History } from './components/Focus/History';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <View style={styles.history}>
            <History history={history} />
          </View>
        </>
      ) : (
        // <View>
        //   <Text> focus subject {currentSubject} </Text>
        // </View>
        <Timer
          focusSubject={currentSubject}
          onEndTimer={(subject) => {
            setHistory(...history, subject);
          }}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  history: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});
