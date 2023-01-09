import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Clipboard } from 'react-native-web';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = () => {
    Clipboard.setString('hello world')
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    alert(`${data}`)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style= {styles.cameraPermission}>
        <Text style= {styles.cameraPermissionText}>No access to camera</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cameraPermission: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraPermissionText: {
    textAlign: 'center',
  }
});
