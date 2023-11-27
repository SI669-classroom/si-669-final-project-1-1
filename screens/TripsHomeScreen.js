import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import { Input, Button, Overlay, Avatar } from '@rneui/themed'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import styles, { primaryColor, secondaryColor } from '../Styles'
import TripListItem from '../components/TripListItem'
import { load } from '../data/Actions'
import { getAuthUser, signOut } from '../AuthManager'

function TripsHomeScreen (props) {
  const { navigation, route } = props
  const trips = useSelector(state => state.trips)
  const [overlayVisible, setOverlayVisible] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(load())
    getAuthUser()
  }, [route])

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.withDividerBelow]}>
        <Text style={styles.headerText}>Trips</Text>
      </View>
      <View style={[styles.personalInfoContainer, styles.withDividerBelow]}>
        <Avatar
          size={72}
          rounded
          title='AB'
          containerStyle={{ backgroundColor: secondaryColor }}
        />
        <View style={styles.personalInfoSubContainer}>
          {getAuthUser() ? (
            <>
              <Text style={styles.personalInfoMainText}>
                {getAuthUser().displayName}
              </Text>
              <Text style={styles.personalInfoText}>
                {getAuthUser().email}
              </Text>
            </>
          ) : (
            <Button
              type='solid'
              color={primaryColor}
              buttonStyle={{ width: 150 }}
              onPress={() => navigation.navigate('Login')}
              title='LOGIN'
            />
          )}
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={trips}
          renderItem={({ item }) => {
            return <TripListItem item={item} navigation={navigation} />
          }}
        />
      </View>
      <TouchableOpacity
        style={[styles.footer, styles.withDividerTop]}
        onPress={() => {
          navigation.navigate('TripMetaEdit', {
            item: { key: -1 }
          })
        }}
      >
        <MaterialIcons name='add-circle' size={40} color={primaryColor} />
      </TouchableOpacity>
    </View>
  )
}

export default TripsHomeScreen
