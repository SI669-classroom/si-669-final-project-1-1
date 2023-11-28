import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native'
import React, { useState } from 'react'
import { ListItem, Button, Icon } from 'react-native-elements'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Avatar, Card } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import { useSelector, useDispatch } from 'react-redux'
import styles, { grayscale, primaryColor, secondaryColor } from '../Styles'
import { deleteItem } from '../data/Actions'

function ItineraryListItem (props) {
  //   const { item, navigation } = props
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }

  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const hideMenu = () => setVisible(false)
  const showMenu = () => setVisible(true)

  return (
    <View>
      <View style={styles.itineraryItemContainter}>
        <View style={styles.destinationTimeContainter}>
          <Text style={styles.destinationTimeText}>13:30</Text>
          <FontAwesome5
            name='map-marker-alt'
            size={40}
            color={secondaryColor}
          />
          <Text style={styles.destinationTimeText}>13:30</Text>
        </View>
        <TouchableOpacity style={styles.destinationCardContainter}>
          <Text style={styles.destinationCardDuration}>2H</Text>
          <Text style={styles.destinationCardTitle}>Destination</Text>
          <Text style={styles.destinationCardAddress}>Address</Text>
          <Text style={styles.destinationCardNotes} numberOfLines={1}>
            Notes NotesNotesNotesNotesNotesNotesNotes
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.itineraryAdd}>
        <Ionicons name='add-outline' size={24} color={primaryColor} />
        <Text>Add Location</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItineraryListItem
