import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Button } from '@rneui/themed'

import styles, { primaryColor } from '../Styles'
import { signIn, signUp } from '../AuthManager'

export default function LoginBox ({ navigation }) {
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
      <View style={[styles.loginRow, { marginTop: '20%' }]}>
        <Button
          type='solid'
          color={primaryColor}
          buttonStyle={{ width: 150 }}
          onPress={async () => {
            try {
              await signIn(email, password)
              navigation.reset({
                index: 0,
                routes: [{ name: 'TripsHome' }]
              })
            } catch (error) {
              let msg = ''
              switch (error.code) {
                case 'auth/invalid-login-credentials':
                  msg =
                    'Your login info is not correct. Please check your email and password and try again.'
                  break
                case 'auth/missing-password':
                  msg = 'Please enter your password and retry.'
                  break
                case 'auth/invalid-email':
                  msg =
                    'Email address is invalid. Please check your email and retry.'
                  break
                default:
                  break
              }
              Alert.alert('Login Error', msg === '' ? error.message : msg, [
                { text: 'OK' }
              ])
            }
          }}
          title='LOGIN'
        />
      </View>
    </View>
  )
}
