
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../Styles';

function TripListItem(props) {
  const { item, navigation } = props;

  return (
    <View style={styles.listItemContainer}>
      <TouchableOpacity 
        style={styles.li1}
        onPress={()=>{
          navigation.navigate('Details', { 
            item: item 
          });
        }}  
      >
        <Text style={styles.listItemText}>{`${item.first_name} ${item.last_name}`}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TripListItem;