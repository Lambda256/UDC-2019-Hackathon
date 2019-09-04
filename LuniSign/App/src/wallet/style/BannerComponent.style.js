import {Dimensions, StyleSheet} from 'react-native';
import Borders from '../../common/style/Borders';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: (width - 30) * 0.25,
    width: width - 30,
    left: 15,
    right: 15,
    bottom: 20,
    borderRadius: Borders.mainBorderRadius,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,

    elevation: 5, // shadow style for Android
  },
  image: {
    // resizeMode: 'stretch',       // 배너 이미지 비율이 아래의 사이즈로 조정됨
    height: (width - 30) * 0.25,
    width: width - 36, // width: 화면 넓이 - 15(왼쪽 간격) - 15(오른쪽 간격) - 6(그림자 간격)
    borderRadius: Borders.mainBorderRadius,
    bottom: -4,
  },
});
