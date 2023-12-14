import { useEffect, useState } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Animated,
  useWindowDimensions
} from 'react-native'
import { Input, Button, Divider, Avatar } from '@rneui/themed'
import { useSelector, useDispatch } from 'react-redux'
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons
} from '@expo/vector-icons'
import SlidingUpPanel from 'rn-sliding-up-panel'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync
} from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'
import styles, { darkGrayscale, grayscale, secondaryColor } from '../Styles'
import { addItem, updateItem, deleteItem, load } from '../data/Actions'
import ItineraryListTabs from '../components/ItineraryListTabs'
import { getAuthUser } from '../AuthManager'
import { GOOGLE_API_KEY } from '../Secrets'

function TripDetailsScreen (props) {
  const dispatch = useDispatch()
  const { navigation, route } = props
  const { item, index } = route.params
  const trips = useSelector(state => state.trips)
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }
  const initRegion =
    item.itinerary.length > 0 &&
    Object.keys(item.itinerary[0].destinations).length > 0
      ? {
          latitude: item.itinerary[0].destinations['1'].lat,
          longitude: item.itinerary[0].destinations['1'].lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      : {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }

  const { height } = Dimensions.get('window')
  const [currItem, setCurrItem] = useState(item)
  const [itineraryList, setIteneraryList] = useState([])
  const [mapRegion, setMapRegion] = useState(initRegion)

  useEffect(() => {
    if (!trips[index]) {
      return
    }
    setCurrItem(trips[index])
    il = []
    trips[index].itinerary.forEach((day, idx) => {
      il.push([])
      for (const [key, value] of Object.entries(day.destinations)) {
        il[idx].push({ latitude: value.lat, longitude: value.lng })
      }
    })
    setIteneraryList(il)
    if (il.length > 0 && il[0].length > 0) {
      setMapRegion({
        ...mapRegion,
        latitude: il[0][0].latitude,
        longitude: il[0][0].longitude
      })
    }
  }, [trips[index]])

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.withDividerBelow]}>
        <Text style={styles.headerText}>Plan</Text>
      </View>
      <View style={styles.tripSlidePanelContainer}>
        <View>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={mapRegion}
            showsUserLocation={true}
          >
            {itineraryList.map(day => {
              if (day.length === 1) {
                return <Marker coordinate={day[0]} />
              }
              if (day.length > 1) {
                return day.map((des, idx) => {
                  if (idx + 1 < day.length) {
                    return (
                      <>
                        <MapViewDirections
                          origin={des}
                          destination={day[idx + 1]}
                          apikey={GOOGLE_API_KEY}
                          strokeWidth={4}
                          strokeColor='red'
                        />
                        <Marker coordinate={des} />
                      </>
                    )
                  } else {
                    return <Marker coordinate={des} />
                  }
                })
              }
            })}
          </MapView>
        </View>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{ top: height / 1.25, bottom: 120 }}
          showBackdrop={false}
          height={height / 1.25}
        >
          {dragHandler => (
            <View style={styles.panel}>
              <View
                style={{ justifyContent: 'center', alignItems: 'center' }}
                {...dragHandler}
              >
                <FontAwesome5
                  name='window-minimize'
                  size={24}
                  color={darkGrayscale}
                  onPress={() => this._panel.hide()}
                />
              </View>
              <View style={styles.tripDetailMetaInfoContainer}>
                <View style={styles.tripDetailMetaInfoRow}>
                  <Text style={styles.tripDetailTitleText}>
                    {currItem.title}
                  </Text>
                </View>
                <View style={styles.tripDetailMetaInfoRow}>
                  <Text
                    style={styles.tripDetailTimeText}
                  >{`${currItem.startDate.toLocaleDateString(
                    'en-EN',
                    options
                  )} - ${currItem.endDate.toLocaleDateString(
                    'en-EN',
                    options
                  )}`}</Text>
                </View>
                <View style={styles.tripDetailMetaInfoRow}>
                  <View style={styles.avatarContainer}>
                    <Avatar
                      size={32}
                      rounded
                      icon={{
                        name: 'add',
                        type: 'MaterialIcons',
                        color: secondaryColor
                      }}
                      containerStyle={{ backgroundColor: grayscale }}
                    />
                  </View>
                </View>
                <View style={styles.tripDetailMetaInfoRow}>
                  <TouchableOpacity
                    style={styles.packingListButton}
                    onPress={() => {
                      navigation.navigate('PackingList', {
                        tripItem: currItem
                      })
                    }}
                  >
                    <Text style={styles.packingListText}>Packing List</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ItineraryListTabs
                item={currItem}
                tripIdx={index}
                navigation={navigation}
              />
            </View>
          )}
        </SlidingUpPanel>
      </View>
    </View>
  )
}

export default TripDetailsScreen
