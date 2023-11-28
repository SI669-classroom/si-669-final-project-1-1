import * as ImagePicker from 'expo-image-picker'
import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  useWindowDimensions
} from 'react-native'
import { Input, Button, Overlay, Avatar } from '@rneui/themed'
import { manageFileUpload } from '../data/Storage'
import styles, { primaryColor } from '../Styles'
import { AntDesign, Feather } from '@expo/vector-icons'

const hasMediaLibraryPermissionGranted = async () => {
  let granted = false

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

  if (!permission.canAskAgain || permission.status === 'denied') {
    granted = false
  }

  if (permission.granted) {
    granted = true
  }

  return granted
}

const uploadImageFromDevice = async () => {
  let imgURI = null
  let imgName = null
  const storagePermissionGranted = await hasMediaLibraryPermissionGranted()

  // Discard execution when  media library permission denied
  if (!storagePermissionGranted) return imgURI

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1
  })

  if (!result.canceled) {
    imgURI = result.assets[0].uri
    imgName = 'img-' + new Date().getTime()
    const blob = await getBlobFromUri(imgURI)
    await manageFileUpload(blob, imgName)
  }

  return { imgURI: imgURI, imgName: imgName }
}

const getBlobFromUri = async uri => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })

  return blob
}

export default function ImagePickerComponent (props) {
  const { onGetImg, onGetImgUri, uri } = props

  const [imgURI, setImageURI] = React.useState(uri)
  const { width } = useWindowDimensions()

  const handleLocalImageUpload = async () => {
    const imgData = await uploadImageFromDevice()
    if (imgData.imgURI) {
      setImageURI(imgData.imgURI)
      onGetImg(imgData.imgName)
      onGetImgUri(imgData.imgURI)
    }
  }

  return (
    <View style={styles.metaEditField}>
      {Boolean(imgURI) ? (
        <Image
          source={{ uri: imgURI }}
          resizeMode='contain'
          style={styles.imageContainer}
        />
      ) : (
        <Button
          type='solid'
          color={primaryColor}
          onPress={handleLocalImageUpload}
          title='Pick from Photos'
        />
      )}
    </View>
  )
}
