import { useState } from 'react'
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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import styles, { darkGrayscale, grayscale, secondaryColor } from '../Styles'
import { addItem, updateItem, deleteItem } from '../data/Actions'
import ItineraryListItem from './ItineraryListItem'

const DateRoute = (date, idx) => (
  <View>
    <View style={styles.itineraryListHeader}>
      <View style={styles.itineraryListHeaderLeft}>
        <Text style={{ color: 'white' }}>Day 2</Text>
      </View>
      <TouchableOpacity style={styles.itineraryListHeaderCenter}>
        <Text>Start Time: </Text>
      </TouchableOpacity>
      <View style={styles.itineraryListHeaderRight}>
        <Text>Date</Text>
      </View>
    </View>
    <ItineraryListItem />
    <ItineraryListItem />
  </View>
)

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const renderScene = SceneMap({
  first: DateRoute,
  second: SecondRoute
})

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: grayscale }}
    style={{ backgroundColor: secondaryColor }}
  />
)

function ItineraryListTabs (props) {
  const dispatch = useDispatch()
  const { navigation, route } = props
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }

  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' }
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export default ItineraryListTabs
