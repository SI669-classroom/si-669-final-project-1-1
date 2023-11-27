import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Button } from '@rneui/themed'

import styles, { primaryColor } from '../Styles'

function RegisterBox ({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Email: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder='enter email address'
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder='enter password'
            autoCapitalize='none'
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Confirm: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder='confirm password'
            autoCapitalize='none'
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={[styles.loginRow, {marginTop: '20%'}]}>
      <Button
            type='solid'
            color={primaryColor}
            buttonStyle={{ width: 150 }}
            onPress={() => navigation.navigate('Home')}
            title='REGISTER'
          />
      </View>
      <View style={styles.loginRow}>
        <Text>Already Have an Account? </Text><TouchableOpacity onPress={() => {
            navigation.goBack()
          }}><Text style={styles.linkText}>Back to Login</Text></TouchableOpacity>
      </View>
    </View>
  )
}

function RegisterScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.withDividerBelow]}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <View style={styles.bodyContainer}>
        <RegisterBox navigation={navigation} />
      </View>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   bodyContainer: {
//     flex: 0.5,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   loginContainer: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '100%',
//     paddingTop: '30%',
//     paddingBottom: '10%'
//   },
//   loginHeader: {
//     width: '100%',
//     padding: '3%',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   loginHeaderText: {
//     fontSize: 24,
//     color: 'black',
//     paddingBottom: '5%'
//   },
//   loginRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '100%',
//     padding: '3%'
//   },
//   loginLabelContainer: {
//     flex: 0.3,
//     justifyContent: 'center',
//     alignItems: 'flex-end'
//   },
//   loginLabelText: {
//     fontSize: 18
//   },
//   loginInputContainer: {
//     flex: 0.5,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     width: '100%'
//   },
//   loginInputBox: {
//     width: '100%',
//     borderColor: 'lightgray',
//     borderWidth: 1,
//     borderRadius: 6,
//     fontSize: 18,
//     padding: '2%'
//   },
//   modeSwitchContainer: {
//     flex: 0.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     backgroundColor: 'pink'
//   },
//   loginButtonRow: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   listContainer: {
//     flex: 0.7,
//     backgroundColor: '#ccc',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%'
//   }
// })
export default RegisterScreen
