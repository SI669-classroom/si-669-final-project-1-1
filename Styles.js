import { StyleSheet } from 'react-native'

export const primaryColor = '#ef8557'
export const secondaryColor = '#293a47'
export const grayscale = '#d0daca'
export const darkGrayscale = '#7C8178'
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
  withDividerTop: {
    borderTopColor: grayscale,
    borderTopWidth: 1
  },
  bodyContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '5%'
  },
  footerText: {
    fontSize: 20
  },
  linkText: {
    color: primaryColor,
    textDecorationLine: 'underline'
  },
  // TripsHome
  personalInfoContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '10%',
    paddingVertical: '5%'
  },
  personalInfoSubContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: '10%'
  },
  personalInfoMainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: secondaryColor
  },
  personalInfoText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: darkGrayscale
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
    flexDirection: 'column'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: 250,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: '10%',
    marginTop: 0,
    marginBottom: '5%'
  },
  menuButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: '3%'
  },
  tripMetaInfoContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: '3%'
  },
  tripMetaInfoTitle: {
    fontSize: 24,
    color: 'white'
  },
  tripMetaInfoDate: {
    fontSize: 16,
    color: 'white'
  },
  avatarContainer: {},
  // TripMetaEdit
  metaEditContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingTop: '5%',
    paddingHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  metaEditFieldContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    minHeight: '7%'
  },
  metaEditFieldLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  metaEditField: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  imageContainer: {
    width: '100%',
    height: '50%'
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
  },
  // login
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: '30%',
    paddingBottom: '10%'
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: '3%'
  },
  loginLabelContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  loginLabelText: {
    fontSize: 18
  },
  loginInputContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%'
  },
  loginInputBox: {
    width: '100%',
    borderColor: grayscale,
    borderBottomWidth: 1,
    fontSize: 18,
    padding: '2%'
  },
  loginButtonRow: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // trip detail
  tripSlidePanelContainer: {
    width: '100%',
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  tripDetailMetaInfoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 0,
    paddingHorizontal: '5%',
    marginTop: '2%'
  },
  tripDetailMetaInfoRow: {
    marginBottom: '2%'
  },
  tripDetailTitleText: {
    fontSize: 20
  },
  tripDetailTimeText: {
    fontSize: 16
  },
  packingListButton: {
    backgroundColor: primaryColor,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    borderRadius: '50%'
  },
  packingListText: {
    fontSize: 14,
    color: 'white'
  },
  // itinerary list
  itineraryListHeader: {
    justifyContent: 'center',
    alignItems: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: '2%'
  },
  itineraryListHeaderLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
    marginRight: '3%',
    paddingVertical: '1%',
    backgroundColor: secondaryColor,
    borderRadius: '50%'
  },
  itineraryListHeaderCenter: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: '1%',
    flex: 0.6
  },
  itineraryListHeaderRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: '1%',
    flex: 0.2
  },
  // itinerary list item
  itineraryItemContainter: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    height: 100
  },
  destinationTimeContainter: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  destinationTimeText: {
    fontSize: 12
  },
  destinationCardContainter: {
    flex: 0.8,
    height: '100%',
    marginLeft: '5%',
    backgroundColor: grayscale,
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '2%'
  },
  destinationCardDuration: {
    fontSize: 14
  },
  destinationCardTitle: {
    fontSize: 20
  },
  destinationCardAddress: {
    fontSize: 14,
    color: darkGrayscale
  },
  destinationCardNotes: {
    fontSize: 14
  },
  itineraryAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2%'
  }
})

export default styles
