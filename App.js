import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Clipboard } from '@react-native-clipboard/clipboard';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [text, setText] = useState('Not yet scanned!');
  const [buttonText,setButtonText]= useState('Tap to scan')

  // const [copiedText, setCopiedText] = useState('')

  // const copyToClipboard = () => {
  //   Clipboard.setString('copiedText')
  // }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    setText(data);
    // setCopiedText(data);
  };

  if (hasPermission === null) {
    return  (
      <View style= {styles.cameraPermission}>
        <Text style= {styles.cameraPermissionText}>Requesting for camera permission</Text>
      </View>
    )
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
    <View style= {styles.title}>
      <Text style= {styles.titleText}>QR Code Scanner</Text>
    </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 500, width: 500, marginBottom: 30}}
      />
      <View style= {styles.data}>
        <Text style= {styles.dataText}>{text}</Text>
        {/* <Button
          title= {'copy text to clipboard'}
          onPress= {() => copyToClipboard()}
        /> */}
      </View>
      <View style= {styles.buttonStyle}>
        {<Button title={buttonText} color= '#FF3131'onPress={() => (
          setScanned(false),
          setButtonText('Scan Again')
        )} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEADE',
  },
  title: {
    padding: 30,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF3131',
    borderBottomColor: '#FF3131',
    borderBottomWidth: 3,
  },
  cameraPermission: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraPermissionText: {
    textAlign: 'center',
    fontSize: 20
  },
  buttonStyle: {
    width: 175,
    height: 75,
  },
  data: {
    marginBottom: 20,
  },
  dataText: {
    fontSize: 17,
    textAlign: 'center'
  }
});
