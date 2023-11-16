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
import storage from 'firebase/storage'
import DateTimePicker from '@react-native-community/datetimepicker'

function TripMetaEditScreen (props) {
  const dispatch = useDispatch()

  const { navigation, route } = props
  const { item } = route.params

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [start, setStart] = useState(new Date(Date.now()))
  const [end, setEnd] = useState(new Date(Date.now()))

  const save = () => {
    if (title === '') {
      alert('Please set trip title.')
    } else if (image === '') {
      alert('Please upload the cover image.')
    } else if (start > end) {
      alert('Start date must be before end date.')
    } else {
      if (item.key === -1) {
        dispatch(
          addItem({
            title: title,
            cover: image,
            startDate: start,
            endDate: end
          })
        )
      } else {
        dispatch(
          updateItem(item, {
            title: title,
            cover: image,
            startDate: start,
            endDate: end
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
            <ImagePickerComponent onGetImg={setImage} />
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
