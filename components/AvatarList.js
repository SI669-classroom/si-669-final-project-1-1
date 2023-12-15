import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native'
import React, { useState } from 'react'
import { ListItem, Button, Icon, Overlay, Input } from 'react-native-elements'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Avatar, Card } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import { useSelector, useDispatch } from 'react-redux'
import styles, { grayscale, primaryColor, secondaryColor } from '../Styles'
import { deleteItem, updateItem } from '../data/Actions'

function AvatarList (props) {
  const dispatch = useDispatch()
  const { tripItem, showAdd } = props

  const users = useSelector(state => state.users)
  const owner = tripItem.owner
  const peers = tripItem.peers
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const updatePeers = newPeers => {
    dispatch(
      updateItem(tripItem, {
        ...tripItem,
        peers: newPeers
      })
    )
  }

  const findNameById = uid => {
    let name = 'NA'
    users.forEach(user => {
      if (user.uid === uid) {
        name = user.name
        return
      }
    })
    return name.substring(0, 2).toUpperCase()
  }

  const findIdByEmail = email => {
    let uid = ''
    users.forEach(user => {
      if (user.email === email) {
        console.log(user)
        uid = user.uid
        return
      }
    })
    return uid
  }

  return (
    <View style={styles.avatarContainer}>
      <Avatar
        size={32}
        rounded
        title={findNameById(owner)}
        containerStyle={{ backgroundColor: secondaryColor, marginRight: 5 }}
      />
      {peers &&
        peers.map(peer => (
          <Avatar
            size={32}
            rounded
            title={findNameById(peer)}
            containerStyle={{
              backgroundColor: secondaryColor,
              marginRight: 5
            }}
          />
        ))}
      {showAdd && (
        <Avatar
          size={32}
          rounded
          icon={{
            name: 'add',
            type: 'MaterialIcons',
            color: secondaryColor
          }}
          containerStyle={{ backgroundColor: grayscale }}
          onPress={() => {
            setEmail('')
            toggleOverlay()
          }}
        />
      )}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}
      >
        <Text style={styles.metaEditFieldLabel}>Invite Friends</Text>
        <View style={styles.metaEditFieldContainer}>
          <Text style={styles.metaEditFieldLabel}>Email: </Text>
          <View style={styles.metaEditField}>
            <Input
              placeholder="Enter Your Friend's Email"
              value={email}
              onChangeText={text => {
                setEmail(text)
              }}
            />
          </View>
        </View>
        <Button
          type='solid'
          color={primaryColor}
          buttonStyle={{ width: 150 }}
          onPress={() => {
            let newPeers = tripItem.peers
              ? [...tripItem.peers].concat(findIdByEmail(email))
              : [findIdByEmail(email)]
            console.log(newPeers)
            updatePeers(newPeers)
            setEmail('')
            toggleOverlay()
          }}
          title='INVITE'
        />
      </Overlay>
    </View>
  )
}

export default AvatarList
