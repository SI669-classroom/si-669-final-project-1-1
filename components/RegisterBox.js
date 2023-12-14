import { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Button } from '@rneui/themed'

import { useSelector, useDispatch } from 'react-redux'
import styles, { primaryColor } from '../Styles'
import { getAuthUser, signIn, signUp } from '../AuthManager'
import { addUser } from '../data/Actions'

export default function RegisterBox ({ navigation }) {
  const dispatch = useDispatch()
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
              await signUp(displayName, email, password).then(() => {
                const user = getAuthUser()
                dispatch(
                  addUser({
                    email: user.email,
                    name: user.displayName,
                    uid: user.uid
                  })
                )
              })
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
