import { useEffect, useState } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Keyboard,
  useWindowDimensions
} from 'react-native'
import { Input, Button, Divider, Avatar } from '@rneui/themed'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Timestamp } from 'firebase/firestore'
import styles, {
  darkGrayscale,
  grayscale,
  primaryColor,
  secondaryColor
} from '../Styles'
import { addItem, updateItem, deleteItem, load } from '../data/Actions'
import ItineraryListItem from './ItineraryListItem'
import { getAuthUser } from '../AuthManager'

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

function AddRoute (props) {
  const { item } = props
  const dispatch = useDispatch()
  return (
    <View style={styles.bodyContainer}>
      <TouchableOpacity
        style={styles.itineraryAdd}
        onPress={() => {
          dispatch(
            updateItem(item, {
              ...item,
              itinerary: [
                ...item.itinerary,
                {
                  destinations: {},
                  startTime: Timestamp.fromDate(new Date(2023, 12, 1, 8, 0))
                }
              ]
            })
          )
        }}
      >
        <Ionicons name='add-outline' size={24} color={primaryColor} />
        <Text>Add Day</Text>
      </TouchableOpacity>
    </View>
  )
}

function ItineraryListTabs (props) {
  const dispatch = useDispatch()
  const { item, idx, navigation } = props
  const trips = useSelector(state => state.trips)
  const layout = useWindowDimensions()
  let r = item.itinerary.map((e, i) => {
    return {
      key: i,
      title: `Day ${i + 1}`
    }
  })
  r = [...r, { key: 'add', title: '+' }]
  const [index, setIndex] = useState(0)
  const [routes, setRoutes] = useState(r)
  const [itinerary, setItinerary] = useState(item.itinerary)
  const [startDate, setStartDate] = useState(item.startDate)
  const [currItem, setCurrItem] = useState(item)
  useEffect(() => {
    let currUser = getAuthUser()
    dispatch(load(currUser.uid))
    setCurrItem(trips[idx])
    setItinerary(trips[idx].itinerary)
    setStartDate(trips[idx].startDate)
    r = trips[idx].itinerary.map((e, i) => {
      return {
        key: i,
        title: `Day ${i + 1}`
      }
    })
    r = [...r, { key: 'add', title: '+' }]
    setRoutes(r)
  }, [trips])

  const renderScene = ({ route }) => {
    if (route.key === 'add') {
      return <AddRoute item={currItem} />
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
