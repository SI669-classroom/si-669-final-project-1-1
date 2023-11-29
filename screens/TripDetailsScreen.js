import { useEffect, useState } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Animated,
  useWindowDimensions
} from 'react-native'
import { Input, Button, Divider, Avatar } from '@rneui/themed'
import { useSelector, useDispatch } from 'react-redux'
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons
} from '@expo/vector-icons'
import SlidingUpPanel from 'rn-sliding-up-panel'
import styles, { darkGrayscale, grayscale, secondaryColor } from '../Styles'
import { addItem, updateItem, deleteItem, load } from '../data/Actions'
import ItineraryListTabs from '../components/ItineraryListTabs'
import { getAuthUser } from '../AuthManager'

function TripDetailsScreen (props) {
  const dispatch = useDispatch()
  const { navigation, route } = props
  const { item, index } = route.params
  const trips = useSelector(state => state.trips)
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }
  const { height } = Dimensions.get('window')
  const [currItem, setCurrItem] = useState(item)

  useEffect(() => {
    if (!trips[index]) {
      return
    }
    setCurrItem(trips[index])
  }, [trips[index]])

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.withDividerBelow]}>
        <Text style={styles.headerText}>Plan</Text>
      </View>
      <View style={styles.tripSlidePanelContainer}>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{ top: height / 1.25, bottom: 120 }}
          showBackdrop={false}
          height={height / 1.25}
        >
          {dragHandler => (
            <View style={styles.panel}>
              <View
                style={{ justifyContent: 'center', alignItems: 'center' }}
                {...dragHandler}
              >
                <FontAwesome5
                  name='window-minimize'
                  size={24}
                  color={darkGrayscale}
                  onPress={() => this._panel.hide()}
                />
              </View>
              <View style={styles.tripDetailMetaInfoContainer}>
                <View style={styles.tripDetailMetaInfoRow}>
                  <Text style={styles.tripDetailTitleText}>{currItem.title}</Text>
                </View>
                <View style={styles.tripDetailMetaInfoRow}>
                  <Text
                    style={styles.tripDetailTimeText}
                  >{`${currItem.startDate.toLocaleDateString(
                    'en-EN',
                    options
                  )} - ${currItem.endDate.toLocaleDateString(
                    'en-EN',
                    options
                  )}`}</Text>
                </View>
                <View style={styles.tripDetailMetaInfoRow}>
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
                </View>
                <View style={styles.tripDetailMetaInfoRow}>
                  <TouchableOpacity
                    style={styles.packingListButton}
                    onPress={() => {
                      navigation.navigate('PackingList', {
                        tripItem: currItem
                      })
                    }}
                  >
                    <Text style={styles.packingListText}>Packing List</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <ItineraryListTabs
                item={currItem}
                tripIdx={index}
                navigation={navigation}
              />
            </View>
          )}
        </SlidingUpPanel>
      </View>
    </View>
  )
}

export default TripDetailsScreen
