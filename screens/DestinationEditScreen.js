import { useState } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  FlatList
} from 'react-native'
import { Input, Button, Divider } from '@rneui/themed'
import { useSelector, useDispatch } from 'react-redux'
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo
} from '@expo/vector-icons'
import { Timestamp } from 'firebase/firestore'
import styles, { primaryColor } from '../Styles'
import { addItem, updateItem, deleteItem } from '../data/Actions'
import ImagePickerComponent from '../components/ImagePicker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { getAuthUser } from '../AuthManager'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { GOOGLE_API_KEY } from '../Secrets'

function DestinationEditScreen (props) {
  const dispatch = useDispatch()

  const { navigation, route } = props
  const { item, destination, dateIdx, tripIdx, prevDesIdx } = route.params

  const [title, setTitle] = useState(
    !destination ? '' : destination.destination
  )
  const [placeId, setPlaceId] = useState(
    !destination ? '' : destination.placeId
  )
  const [lat, setLat] = useState(!destination ? '' : destination.lat)
  const [lng, setLng] = useState(!destination ? '' : destination.lng)
  const [duration, setDuration] = useState(
    !destination ? '0' : destination.duration
  )
  const [notes, setNotes] = useState(!destination ? '' : destination.notes)
  const [address, setAddress] = useState(
    !destination ? '' : destination.address
  )
  const [searchResults, setSearchResults] = useState(null)
  const [isShowingResults, setIsShowingResults] = useState(false)

  const searchLocation = async text => {
    setTitle(text)
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${text}`
      })
      .then(response => {
        console.log(response.data)
        setSearchResults(response.data.predictions)
        setIsShowingResults(true)
      })
      .catch(e => {
        console.log(e.response)
      })
  }

  const searchGeo = async item => {
    setTitle(item.structured_formatting.main_text)
    setPlaceId(item.place_id)
    setIsShowingResults(false)
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/geocode/json?place_id=${item.place_id}&key=${GOOGLE_API_KEY}`
      })
      .then(response => {
        console.log(response)
        setLat(response.data.results[0].geometry.location.lat)
        setLng(response.data.results[0].geometry.location.lng)
        setAddress(response.data.results[0].formatted_address)
      })
      .catch(e => {
        console.log(e.response)
      })
  }

  const syncStartTimeWithDuration = destinations => {
    for (const [key, value] of Object.entries(destinations)) {
      if (key === '1') {
        continue
      } else {
        newStartTime =
          destinations[(parseInt(key) - 1).toString()].startTime.toDate()
        newStartTime.setHours(
          newStartTime.getHours() +
            parseInt(destinations[(parseInt(key) - 1).toString()].duration)
        )
        destinations[key] = {
          ...value,
          startTime: Timestamp.fromDate(newStartTime)
        }
      }
    }
    return destinations
  }

  const destinationsNewOrderUpdate = (action, pos) => {
    let newDestinations = {}
    for (const [key, value] of Object.entries(
      item.itinerary[dateIdx].destinations
    )) {
      if (parseInt(key) < pos) {
        newDestinations[key] = value
      } else if (parseInt(key) === pos && action === 'insert') {
        newDestinations[key] = value
      } else if (parseInt(key) > pos) {
        if (action === 'insert') {
          const newKey = (parseInt(key) + 1).toString()
          newDestinations[newKey] = {
            ...value,
            key: newKey
          }
        }
        if (action === 'delete' && parseInt(key) + 1 > pos) {
          const newKey = (parseInt(key) - 1).toString()
          newDestinations[newKey] = {
            ...value,
            key: newKey
          }
        }
      }
    }
    if (action === 'insert') {
      newDestinations[(pos + 1).toString()] = {
        address: address,
        destination: title,
        placeId: placeId,
        lat: lat,
        lng: lng,
        duration: duration.toString(),
        notes: notes,
        startTime: item.itinerary[dateIdx].startTime,
        key: (pos + 1).toString()
      }
    }
    newDestinations = syncStartTimeWithDuration(newDestinations)
    dispatch(
      updateItem(item, {
        ...item,
        itinerary: item.itinerary.map((element, i) => {
          if (i === dateIdx) {
            return {
              ...element,
              destinations: newDestinations
            }
          } else {
            return element
          }
        })
      })
    )
  }

  const save = () => {
    if (title === '') {
      alert('Please set destination name.')
    } else if (placeId === '') {
      alert('Please set destination through the search box.')
    } else {
      if (destination) {
        dispatch(
          updateItem(item, {
            ...item,
            itinerary: item.itinerary.map((element, i) => {
              if (i === dateIdx) {
                newDestinations = {
                  ...element.destinations,
                  [destination.key]: {
                    address: address,
                    destination: title,
                    placeId: placeId,
                    lat: lat,
                    lng: lng,
                    duration: duration.toString(),
                    notes: notes,
                    startTime: element.startTime,
                    key: destination.key
                  }
                }
                newDestinations = syncStartTimeWithDuration(newDestinations)
                return {
                  ...element,
                  destinations: newDestinations
                }
              } else {
                return element
              }
            })
          })
        )
      } else {
        destinationsNewOrderUpdate('insert', prevDesIdx)
      }
      navigation.navigate('TripDetails', {
        item: item,
        index: tripIdx
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={[styles.header, styles.withDividerBelow]}>
          <Text style={styles.headerText}>
            {!destination ? 'New Destination' : 'Edit Destination'}
          </Text>
        </View>
        <View style={styles.metaEditContainer}>
          <View style={[styles.metaEditFieldContainer, { zIndex: 10 }]}>
            <Text style={styles.metaEditFieldLabel}>Name: </Text>
            <View style={[styles.metaEditField, { zIndex: 10 }]}>
              <Input
                placeholder='Enter Destination Name'
                value={title}
                onChangeText={text => searchLocation(text)}
              />
              {isShowingResults && (
                <FlatList
                  data={searchResults}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.resultItem}
                        onPress={() => searchGeo(item)}
                      >
                        <Text numberOfLines={1}>{item.description}</Text>
                      </TouchableOpacity>
                    )
                  }}
                  keyExtractor={item => item.id}
                  style={styles.searchResultsContainer}
                />
              )}
            </View>
          </View>

          <View style={styles.metaEditFieldContainer}>
            <Text style={styles.metaEditFieldLabel}>Address: </Text>
            <View style={styles.metaEditField}>
              <Input
                placeholder='Enter Address'
                value={address}
                onChangeText={text => setAddress(text)}
              />
            </View>
          </View>
          <View style={styles.metaEditFieldContainer}>
            <Text style={styles.metaEditFieldLabel}>Stay Duration: </Text>
            <View style={styles.metaEditField}>
              <Input
                placeholder='Enter Stay Duration'
                value={duration}
                onChangeText={text => setDuration(text)}
                keyboardType='number-pad'
              />
            </View>
          </View>
          <View style={styles.metaEditFieldContainer}>
            <Text style={styles.metaEditFieldLabel}>Notes: </Text>
            <View style={styles.metaEditField}>
              <Input
                placeholder='Enter Trip Notes'
                value={notes}
                onChangeText={text => setNotes(text)}
              />
            </View>
          </View>
          {destination && (
            <TouchableOpacity
              style={[
                styles.metaEditFieldContainer,
                { alignItems: 'center', justifyContent: 'center' }
              ]}
              onPress={() => {
                destinationsNewOrderUpdate('delete', parseInt(destination.key))
                navigation.navigate('TripDetails', {
                  item: item,
                  index: tripIdx
                })
              }}
            >
              <Ionicons name='md-trash-sharp' size={24} color='red' />
              <Text style={[styles.metaEditFieldLabel, { marginLeft: '2%' }]}>
                Delete this Destination
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.footer, styles.withDividerTop]}>
          <TouchableOpacity onPress={save}>
            <Entypo name='save' size={40} color={primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default DestinationEditScreen
