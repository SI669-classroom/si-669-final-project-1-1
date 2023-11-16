import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Avatar, Card } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector, useDispatch } from 'react-redux'
import styles, { grayscale, secondaryColor } from '../Styles'

function TripListItem (props) {
  const { item, navigation } = props
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }
  return (
    <ImageBackground
      source={{ uri: item.uri }}
      resizeMode='cover'
      style={styles.image}
    >
      <View style={styles.tripListItemContainter}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.menuButtonContainer}
        >
          <TouchableOpacity>
            <Entypo name='dots-three-horizontal' size={24} color='white' />
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.tripMetaInfoContainer}
        >
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
          <Text style={styles.tripMetaInfoTitle}>{item.title}</Text>
          <Text
            style={styles.tripMetaInfoDate}
          >{`${item.startDate.toLocaleDateString(
            'en-EN',
            options
          )} - ${item.endDate.toLocaleDateString('en-EN', options)}`}</Text>
        </LinearGradient>
      </View>
    </ImageBackground>
  )
}

export default TripListItem
