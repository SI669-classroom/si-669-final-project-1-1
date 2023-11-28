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

function TripMetaEditScreen (props) {
  const dispatch = useDispatch()

  const { navigation, route } = props
  const { item } = route.params

  const [title, setTitle] = useState(item.key === -1 ? '' : item.title)
  const [imageName, setImageName] = useState(item.key === -1 ? '' : item.cover)
  const [imageUri, setImageUri] = useState(item.key === -1 ? '' : item.uri)
  const [start, setStart] = useState(
    item.key === -1 ? new Date(Date.now()) : item.startDate
  )
  const [end, setEnd] = useState(
    item.key === -1 ? new Date(Date.now()) : item.endDate
  )
  let currUser = getAuthUser()

  const save = () => {
    if (title === '') {
      alert('Please set trip title.')
    } else if (imageName === '') {
      alert('Please upload the cover image.')
    } else if (start > end) {
      alert('Start date must be before end date.')
    } else {
      if (item.key === -1) {
        dispatch(
          addItem({
            title: title,
            cover: imageName,
            uri: imageUri,
            startDate: start,
            endDate: end,
            owner: currUser.uid
          })
        )
      } else {
        dispatch(
          updateItem(item, {
            ...item,
            title: title,
            cover: imageName,
            uri: imageUri,
            startDate: start,
            endDate: end,
            owner: currUser.uid
          })
        )
      }
      navigation.navigate('TripsHome')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={[styles.header, styles.withDividerBelow]}>
          <Text style={styles.headerText}>
            {item.key === -1 ? 'New Trip' : 'Edit Trip'}
          </Text>
        </View>
        <View style={styles.metaEditContainer}>
          <View style={styles.metaEditFieldContainer}>
            <Text style={styles.metaEditFieldLabel}>Trip Title: </Text>
            <View style={styles.metaEditField}>
              <Input
                placeholder='Enter Trip Title'
                value={title}
                onChangeText={text => setTitle(text)}
              />
            </View>
          </View>
          <View style={styles.metaEditFieldContainer}>
            <Text style={styles.metaEditFieldLabel}>Trip Start Date: </Text>
            <View style={styles.metaEditField}>
              <DateTimePicker
                value={start}
                mode={'date'}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate
                  setStart(currentDate)
                }}
              />
            </View>
          </View>
          <View style={styles.metaEditFieldContainer}>
            <Text style={styles.metaEditFieldLabel}>Trip End Date: </Text>
            <View style={styles.metaEditField}>
              <DateTimePicker
                value={end}
                mode={'date'}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate
                  setEnd(currentDate)
                }}
              />
            </View>
          </View>
          <View style={styles.metaEditFieldContainer}>
            <Text style={styles.metaEditFieldLabel}>Cover Image: </Text>
            <ImagePickerComponent
              onGetImg={setImageName}
              onGetImgUri={setImageUri}
              uri={imageUri}
            />
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

export default TripMetaEditScreen
