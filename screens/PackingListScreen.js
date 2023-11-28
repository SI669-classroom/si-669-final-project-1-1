import { useState, useEffect } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ScrollView
} from 'react-native'
import { Input, Button, Divider, CheckBox } from '@rneui/themed'
import { useSelector, useDispatch } from 'react-redux'
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  FontAwesome5
} from '@expo/vector-icons'
import styles, { primaryColor, secondaryColor } from '../Styles'
import { addItem, updateItem, deleteItem } from '../data/Actions'

function PackingListScreen (props) {
  const dispatch = useDispatch()
  const { navigation, route } = props
  const { tripItem } = route.params
  const [packingList, setPackingList] = useState(tripItem.packingList)

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.withDividerBelow]}>
        <Text style={styles.headerText}>Trips</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.packingListContainer}>
          <FlatList
            data={packingList}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.packingListItem}>
                  <CheckBox
                    checked={item.checked}
                    title={item.name}
                    onPress={() => {
                      let newPackingList = packingList.map((elm, idx) => {
                        if (idx === index) {
                          return {
                            ...elm,
                            checked: !item.checked
                          }
                        } else {
                          return elm
                        }
                      })
                      setPackingList(newPackingList)
                      dispatch(
                        updateItem(tripItem, {
                          ...tripItem,
                          packingList: newPackingList
                        })
                      )
                    }}
                    iconType='material-community'
                    checkedIcon='checkbox-marked'
                    uncheckedIcon='checkbox-blank-outline'
                    checkedColor={primaryColor}
                    containerStyle={styles.packingListCheckbox}
                  />
                  <TouchableOpacity>
                    <FontAwesome5
                      name='pencil-alt'
                      size={20}
                      color={primaryColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name='md-trash-sharp'
                      size={24}
                      color={secondaryColor}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.footer, styles.withDividerTop]}
        onPress={() => {
          navigation.navigate('TripMetaEdit', {
            item: { key: -1 }
          })
        }}
      >
        <MaterialIcons name='add-circle' size={40} color={primaryColor} />
      </TouchableOpacity>
    </View>
  )
}

export default PackingListScreen
