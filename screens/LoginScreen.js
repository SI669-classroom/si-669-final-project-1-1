import { useState } from 'react'
import { View, Text } from 'react-native'

import styles from '../Styles'
import LoginBox from '../components/LoginBox'
import RegisterBox from '../components/RegisterBox'

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
    </View>
  )
}

export default LoginScreen
