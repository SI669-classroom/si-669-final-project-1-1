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
import DateTimePicker from '@react-native-community/datetimepicker'
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
  const { itinerary, dateIdx, tripIdx, startDate, item, navigation } = props
  const dispatch = useDispatch()
  const dateOptions = {
    month: 'short',
    day: 'numeric'
  }
  let destinations = []
  for (const [key, value] of Object.entries(itinerary.destinations)) {
    destinations.push(value)
  }
  const date = new Date(startDate)
  date.setDate(startDate.getDate() + dateIdx)

  const [time, setTime] = useState(itinerary.startTime.toDate())

  const onChangeTime = (event, selectedDate) => {
    setTime(selectedDate)
    dispatch(
      updateItem(item, {
        ...item,
        itinerary: item.itinerary.map((element, i) => {
          if (i === dateIdx) {
            return {
              destinations: {
                ...element.destinations,
                0: {
                  ...element.destinations[0],
                  startTime: Timestamp.fromDate(selectedDate)
                }
              },
              startTime: Timestamp.fromDate(selectedDate)
            }
          } else {
            return element
          }
        })
      })
    )
  }

  return (
    <View>
      <View style={styles.itineraryListHeader}>
        <View style={styles.itineraryListHeaderLeft}>
          <Text style={{ color: 'white' }}>{`Day ${dateIdx + 1}`}</Text>
        </View>
        <TouchableOpacity
          style={styles.itineraryListHeaderCenter}
          onPress={() => setShow(true)}
        >
          <DateTimePicker
            testID='dateTimePicker'
            value={time}
            mode='time'
            is24Hour={true}
            onChange={onChangeTime}
          />
        </TouchableOpacity>
        <View style={styles.itineraryListHeaderRight}>
          <Text>{date.toLocaleDateString('en-EN', dateOptions)}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.itineraryListBody}>
        <TouchableOpacity
          style={styles.itineraryAdd}
          onPress={() => {
            navigation.navigate('DestinationEdit', {
              item: item,
              destination: null,
              dateIdx: dateIdx,
              tripIdx: tripIdx,
              prevDesIdx: 0
            })
          }}
        >
          <Ionicons name='add-outline' size={24} color={primaryColor} />
          <Text>Add Location</Text>
        </TouchableOpacity>
        {destinations.length > 0 &&
          destinations.map((element, i) => {
            return (
              <ItineraryListItem
                key={i}
                item={item}
                destination={element}
                dateIdx={dateIdx}
                tripIdx={tripIdx}
                navigation={navigation}
                prevDesIdx={i}
              />
            )
          })}
        <View style={[styles.footer, { paddingBottom: '20%' }]}></View>
      </ScrollView>
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
  const { item, tripIdx, navigation } = props
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
    if (!trips[tripIdx]) {
      return
    }
    setCurrItem(trips[tripIdx])
    setItinerary(trips[tripIdx].itinerary)
    setStartDate(trips[tripIdx].startDate)
    console.log(trips)
    r = trips[tripIdx].itinerary.map((e, i) => {
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
          dateIdx={route.key}
          tripIdx={tripIdx}
          startDate={startDate}
          item={currItem}
          navigation={navigation}
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
