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
  const dispatch = useDispatch()
  const { item } = props
  const options = {
    hour: 'numeric',
    minute: 'numeric'
  }
  const startTime = item.startTime.toDate()
  const endTime = item.startTime.toDate()
  endTime.setHours(startTime.getHours() + parseInt(item.duration))

  return (
    <View>
      <View style={styles.itineraryItemContainter}>
        <View style={styles.destinationTimeContainter}>
          <Text style={styles.destinationTimeText}>
            {startTime.toLocaleTimeString('en-EN', options)}
          </Text>
          <FontAwesome5
            name='map-marker-alt'
            size={40}
            color={secondaryColor}
          />
          <Text style={styles.destinationTimeText}>
            {endTime.toLocaleTimeString('en-EN', options)}
          </Text>
        </View>
        <TouchableOpacity style={styles.destinationCardContainter}>
          <Text
            style={styles.destinationCardDuration}
          >{`${item.duration}H`}</Text>
          <Text style={styles.destinationCardTitle}>{item.destination}</Text>
          <Text style={styles.destinationCardAddress} numberOfLines={1}>
            {item.address}
          </Text>
          <Text style={styles.destinationCardNotes} numberOfLines={1}>
            {item.notes}
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
