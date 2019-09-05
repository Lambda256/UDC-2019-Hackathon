import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  fakeHeader: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 21,
    color: '#fff',
    marginLeft: 15,
  },
});
