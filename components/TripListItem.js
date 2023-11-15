import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'
import { Avatar, Card } from '@rneui/themed'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../Styles'

function TripListItem (props) {
  const { item, navigation } = props
  const users = [
    {
      name: 'brynn',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    }
  ]
  return (
    <ImageBackground
      source={{ uri: 'https://legacy.reactjs.org/logo-og.png' }}
      resizeMode='cover'
      style={styles.image}
    >
      <View style={styles.tripListItemContainter}>
        <View style={styles.menuButtonContainer}>
          <TouchableOpacity>
            <Entypo name='dots-three-horizontal' size={24} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.tripMetaInfoContainer}>
          <Avatar
            size={32}
            rounded
            icon={{ name: 'pencil', type: 'font-awesome' }}
            containerStyle={{ backgroundColor: '#9700b9' }}
          />
          <Text style={styles.tripMetaInfoTitle}>Travel Name</Text>
          <Text style={styles.tripMetaInfoDate}>start date - end date</Text>
        </View>
      </View>
    </ImageBackground>
  )
}

export default TripListItem
