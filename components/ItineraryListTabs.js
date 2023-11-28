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
import styles, {
  darkGrayscale,
  grayscale,
  primaryColor,
  secondaryColor
} from '../Styles'
import { addItem, updateItem, deleteItem } from '../data/Actions'
import ItineraryListItem from './ItineraryListItem'

function DateRoute (props) {
  const { itinerary, idx, startDate } = props
  const options = {
    hour: 'numeric',
    minute: 'numeric'
  }
  const dateOptions = {
    month: 'short',
    day: 'numeric'
  }
  let destinations = []
  for (const [key, value] of Object.entries(itinerary.destinations)) {
    destinations.push(value)
  }
  const date = new Date(startDate)
  date.setDate(startDate.getDate() + idx)
  return (
    <View>
      <View style={styles.itineraryListHeader}>
        <View style={styles.itineraryListHeaderLeft}>
          <Text style={{ color: 'white' }}>{`Day ${idx + 1}`}</Text>
        </View>
        <TouchableOpacity style={styles.itineraryListHeaderCenter}>
          <Text>{`${itinerary.startTime
            .toDate()
            .toLocaleTimeString('en-EN', options)}`}</Text>
        </TouchableOpacity>
        <View style={styles.itineraryListHeaderRight}>
          <Text>{date.toLocaleDateString('en-EN', dateOptions)}</Text>
        </View>
      </View>
      {destinations.length > 0 ? (
        destinations.map((element, idx) => {
          return <ItineraryListItem key={idx} item={element} />
        })
      ) : (
        <TouchableOpacity style={styles.itineraryAdd}>
          <Ionicons name='add-outline' size={24} color={primaryColor} />
          <Text>Add Location</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

function AddRoute () {
  return (
    <View style={styles.bodyContainer}>
      <TouchableOpacity style={styles.itineraryAdd}>
        <Ionicons name='add-outline' size={24} color={primaryColor} />
        <Text>Add Day</Text>
      </TouchableOpacity>
    </View>
  )
}

function ItineraryListTabs (props) {
  const dispatch = useDispatch()
  const { itinerary, startDate, navigation } = props
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }
  const layout = useWindowDimensions()
  let r = itinerary.map((i, idx) => {
    return {
      key: idx,
      title: `Day ${idx + 1}`
    }
  })
  r = [...r, { key: 'add', title: '+' }]
  const [index, setIndex] = useState(0)
  const [routes] = useState(r)

  const renderScene = ({ route }) => {
    if (route.key === 'add') {
      return (
        <AddRoute
          itinerary={itinerary[route.key]}
          idx={route.key}
          startDate={startDate}
        />
      )
    } else {
      return (
        <DateRoute
          itinerary={itinerary[route.key]}
          idx={route.key}
          startDate={startDate}
        />
      )
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: grayscale }}
      style={{ backgroundColor: secondaryColor }}
      scrollEnabled={true}
      tabStyle={{ width: 70 }}
    />
  )

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
