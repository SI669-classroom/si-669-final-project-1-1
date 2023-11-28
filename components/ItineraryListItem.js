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
  const { item, destination, dateIdx, tripIdx, navigation, prevDesIdx } = props
  const options = {
    hour: 'numeric',
    minute: 'numeric'
  }
  const startTime = destination.startTime.toDate()
  const endTime = destination.startTime.toDate()
  endTime.setHours(startTime.getHours() + parseInt(destination.duration))
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
        <TouchableOpacity
          style={styles.destinationCardContainter}
          onPress={() => {
            navigation.navigate('DestinationEdit', {
              item: item,
              destination: destination,
              dateIdx: dateIdx,
              tripIdx: tripIdx
            })
          }}
        >
          <Text
            style={styles.destinationCardDuration}
          >{`${destination.duration}H`}</Text>
          <Text style={styles.destinationCardTitle}>
            {destination.destination}
          </Text>
          <Text style={styles.destinationCardAddress} numberOfLines={1}>
            {destination.address}
          </Text>
          <Text style={styles.destinationCardNotes} numberOfLines={1}>
            {destination.notes}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.itineraryAdd}
        onPress={() => {
          navigation.navigate('DestinationEdit', {
            item: item,
            destination: null,
            dateIdx: dateIdx,
            tripIdx: tripIdx,
            prevDesIdx: prevDesIdx
          })
        }}
      >
        <Ionicons name='add-outline' size={24} color={primaryColor} />
        <Text>Add Location</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ItineraryListItem
