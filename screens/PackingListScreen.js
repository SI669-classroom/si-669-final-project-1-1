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
import { Input, Button, Overlay, CheckBox } from '@rneui/themed'
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
  const [visible, setVisible] = useState(false)
  const [packingItemName, setPackingItemName] = useState('')
  const [currItemIdx, setCurrItemIdx] = useState(-1)

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const updatePackingList = newPackingList => {
    setPackingList(newPackingList)
    dispatch(
      updateItem(tripItem, {
        ...tripItem,
        packingList: newPackingList
      })
    )
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.withDividerBelow]}>
        <Text style={styles.headerText}>Packing List</Text>
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
                      updatePackingList(newPackingList)
                    }}
                    iconType='material-community'
                    checkedIcon='checkbox-marked'
                    uncheckedIcon='checkbox-blank-outline'
                    checkedColor={primaryColor}
                    containerStyle={styles.packingListCheckbox}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setCurrItemIdx(index)
                      setPackingItemName(item.name)
                      toggleOverlay()
                    }}
                  >
                    <FontAwesome5
                      name='pencil-alt'
                      size={20}
                      color={primaryColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      let newPackingList = packingList.filter(
                        (elm, idx) => idx !== index
                      )
                      updatePackingList(newPackingList)
                    }}
                  >
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
        onPress={toggleOverlay}
      >
        <MaterialIcons name='add-circle' size={40} color={primaryColor} />
      </TouchableOpacity>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}
      >
        <Text style={styles.metaEditFieldLabel}>
          {currItemIdx === -1 ? 'New List Item' : 'Edit List Item'}
        </Text>
        <View style={styles.metaEditFieldContainer}>
          <Text style={styles.metaEditFieldLabel}>Item Name: </Text>
          <View style={styles.metaEditField}>
            <Input
              placeholder='Enter Item Name'
              value={packingItemName}
              onChangeText={text => {
                setPackingItemName(text)
              }}
            />
          </View>
        </View>
        <Button
          type='solid'
          color={primaryColor}
          buttonStyle={{ width: 150 }}
          onPress={() => {
            let newPackingList = []
            if (currItemIdx === -1) {
              // new
              newPackingList = [
                ...packingList,
                {
                  name: packingItemName,
                  checked: false
                }
              ]
            } else {
              // update
              newPackingList = packingList.map((elm, idx) => {
                if (idx === currItemIdx) {
                  return {
                    ...elm,
                    name: packingItemName
                  }
                } else {
                  return elm
                }
              })
            }
            updatePackingList(newPackingList)
            setCurrItemIdx(-1)
            setPackingItemName('')
            toggleOverlay()
          }}
          title='SAVE'
        />
      </Overlay>
    </View>
  )
}

export default PackingListScreen
