import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'

const storage = getStorage()

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
}

const manageFileUpload = async (fileBlob, imgName) => {
  // Create a reference
  const storageRef = ref(storage, `images/${imgName}.jpg`)
  const uploadTask = uploadBytesResumable(storageRef, fileBlob, metadata)

  console.log('uploading file', imgName)

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    'state_changed',
    snapshot => {},
    error => {},
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        console.log('File available at', downloadURL)
      })
    }
  )
}

const manageFileDownload = async imgName => {
  // Create a reference to the file we want to download
  const storageRef = ref(storage, `images/${imgName}.jpg`)
  let imgURI = null
  // Get the download URL
  await getDownloadURL(storageRef)
    .then(url => {
      imgURI = url
    })
    .catch(error => {
      imgURI = 'https://legacy.reactjs.org/logo-og.png'
    })
  return imgURI
}

export { manageFileUpload, manageFileDownload }
