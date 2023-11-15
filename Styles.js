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
    paddingHorizontal: '5%',
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
    flex: 0.6,
    width: '100%',
    paddingLeft: '10%',
    paddingTop: '10%'
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
