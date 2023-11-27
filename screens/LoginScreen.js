import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Button } from '@rneui/themed'

import styles, { primaryColor } from '../Styles'
import { signIn, signUp } from '../AuthManager'

function LoginBox ({ navigation }) {
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

function RegisterBox ({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Display Name: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder='enter display name'
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text => setDisplayName(text)}
            value={displayName}
          />
        </View>
      </View>
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
        <Button
          type='solid'
          color={primaryColor}
          buttonStyle={{ width: 150 }}
          onPress={async () => {
            try {
              await signUp(displayName, email, password)
              navigation.reset({
                index: 0,
                routes: [{ name: 'TripsHome' }]
              })
            } catch (error) {
              let msg = ''
              switch (error.code) {
                case 'auth/invalid-login-credentials':
                  msg = ''
                  break
                case 'auth/missing-password':
                  msg = 'Please enter your password.'
                  break
                case 'auth/invalid-email':
                  msg = 'Email address is invalid. Please check your email.'
                  break
                case 'auth/weak-password':
                  msg =
                    'Password should be at least 6 characters. Please try a stronger password.'
                  break
                default:
                  break
              }
              Alert.alert('Register Error', msg === '' ? error.message : msg, [
                { text: 'OK' }
              ])
            }
          }}
          title='REGISTER'
        />
      </View>
    </View>
  )
}

function LoginScreen ({ navigation }) {
  const [loginMode, setLoginMode] = useState(true)
  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.withDividerBelow]}>
        <Text style={styles.headerText}>
          {loginMode ? 'Login' : 'Register'}
        </Text>
      </View>

      <View style={styles.bodyContainer}>
        {loginMode ? (
          <LoginBox navigation={navigation} />
        ) : (
          <RegisterBox navigation={navigation} />
        )}
      </View>
      <View>
        {loginMode ? (
          <Text>
            {'New user? '}
            <Text
              onPress={() => {
                setLoginMode(!loginMode)
              }}
              style={styles.linkText}
            >
              Register
            </Text>
          </Text>
        ) : (
          <Text>
            {'Returning user? '}
            <Text
              onPress={() => {
                setLoginMode(!loginMode)
              }}
              style={styles.linkText}
            >
              Login
            </Text>
          </Text>
        )}
      </View>
    </View>
  )
}

export default LoginScreen
