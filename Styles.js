import { StyleSheet } from 'react-native'

export const primaryColor = '#ef8557'
export const secondaryColor = '#293a47'
export const grayscale = '#d0daca'
export const inactivatedColor = '#88a3a7'

const styles = StyleSheet.create({
  // global
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '2%'
  },
  headerText: {
    fontSize: 20
  },
  withDividerBelow: {
    borderBottomColor: grayscale,
    borderBottomWidth: 1
  },
  // TripsHome
  personalInfoContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
  },
  personalInfoSubContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: '10%',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingTop: '5%'
  },
  // TripListItem
  tripListItemContainter: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '3%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: 250,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: '10%',
    marginTop: 0,
    marginBottom: '5%',
  },
  menuButtonContainer:{
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  tripMetaInfoContainer:{
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  tripMetaInfoTitle:{
    fontSize: 24,
    color: 'white'
  },
  tripMetaInfoDate:{
    fontSize: 16,
    color: 'white'
  },
  overlayView: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  overlayTitle: {
    flex: 0.2,
    fontSize: 24
  },
  overlayChoiceContainer: {
    flex: 0.8,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  overlayChoice: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '5%',
    width: '80%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3b5998'
  }
})

export default styles
