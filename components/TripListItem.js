import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native'
import React, { useState } from 'react'
import { ListItem, Button, Icon } from 'react-native-elements'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Avatar, Card } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import { useSelector, useDispatch } from 'react-redux'
import styles, { grayscale, secondaryColor } from '../Styles'
import { deleteItem } from '../data/Actions'
import { getAuthUser } from '../AuthManager'
import AvatarList from './AvatarList'

function TripListItem (props) {
  const { item, index, navigation } = props
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
    <ImageBackground
      source={{ uri: item.uri }}
      resizeMode='cover'
      style={styles.image}
    >
      <TouchableOpacity
        style={styles.tripListItemContainter}
        onPress={() => {
          navigation.navigate('TripDetails', {
            item: item,
            index: index
          })
        }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.menuButtonContainer}
        >
          <Menu
            visible={visible}
            anchor={
              <Entypo
                name='dots-three-horizontal'
                size={24}
                color='white'
                onPress={showMenu}
              />
            }
            onRequestClose={hideMenu}
          >
            <MenuItem
              onPress={() => {
                hideMenu()
                navigation.navigate('TripMetaEdit', {
                  item: item
                })
              }}
            >
              Edit
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => {
                hideMenu()
                dispatch(deleteItem(item))
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </LinearGradient>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.tripMetaInfoContainer}
        >
          <AvatarList tripItem={item} />
          <Text style={styles.tripMetaInfoTitle}>{item.title}</Text>
          <Text
            style={styles.tripMetaInfoDate}
          >{`${item.startDate.toLocaleDateString(
            'en-EN',
            options
          )} - ${item.endDate.toLocaleDateString('en-EN', options)}`}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  )
}

export default TripListItem
