import { useState } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Keyboard,
  Image
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
import styles, { primaryColor } from '../Styles'
import { addItem, updateItem, deleteItem } from '../data/Actions'
import ImagePickerComponent from '../components/ImagePicker'
import DateTimePicker from '@react-native-community/datetimepicker'
import { getAuthUser } from '../AuthManager'

function DestinationEditScreen (props) {
  const dispatch = useDispatch()

  const { navigation, route } = props
  const { item, destination, dateIdx, tripIdx, prevDesIdx } = route.params

  const [title, setTitle] = useState(
    !destination ? '' : destination.destination
  )
  const [duration, setDuration] = useState(
    !destination ? '0' : destination.duration
  )
  const [notes, setNotes] = useState(!destination ? '' : destination.notes)
  const [address, setAddress] = useState(
    !destination ? '' : destination.address
  )

  let currUser = getAuthUser()

  const save = () => {
    if (title === '') {
      alert('Please set destination name.')
    } else {
      if (destination) {
        dispatch(
          updateItem(item, {
            ...item,
            itinerary: item.itinerary.map((element, i) => {
              if (i === dateIdx) {
                return {
                  ...element,
                  destinations: {
                    ...element.destinations,
                    [destination.key]: {
                      address: address,
                      destination: title,
                      duration: duration.toString(),
                      notes: notes,
                      startTime: element.startTime,
                      key: destination.key
                    }
                  }
                }
              } else {
                return element
              }
            })
          })
        )
      } else {
        let newDestinations = {}
        for (const [key, value] of Object.entries(
          item.itinerary[dateIdx].destinations
        )) {
          console.log(`${key}: ${value}`)
          if (parseInt(key) <= prevDesIdx) {
            newDestinations[key] = value
          } else {
            newDestinations[(parseInt(key) + 1).toString()] = {
              ...value,
              key: (parseInt(key) + 1).toString()
            }
          }
        }
        newDestinations[(prevDesIdx + 1).toString()] = {
          address: address,
          destination: title,
          duration: duration.toString(),
          notes: notes,
          startTime: item.itinerary[dateIdx].startTime,
          key: (prevDesIdx + 1).toString()
        }

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
          <View style={styles.metaEditFieldContainer}>
            <Text style={styles.metaEditFieldLabel}>Name: </Text>
            <View style={styles.metaEditField}>
              <Input
                placeholder='Enter Destination Name'
                value={title}
                onChangeText={text => setTitle(text)}
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
