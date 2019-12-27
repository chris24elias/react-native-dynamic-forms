import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    // flex: 1,
    marginBottom: 15,
  },
  radio: {
    marginVertical: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 0,
    alignItems: 'center',
  },
  tagCloseIcon: {
    top: '0%',
    right: '-10%',
    position: 'absolute',
  },
  tagText: {
    fontSize: 17,
    lineHeight: 18,
    top: 1.5,
    // color: color.deepLavender,
    marginRight: 2,
  },
  tag: {
    backgroundColor: '#EFDEF9',
    padding: 7,
    borderRadius: 4,
  },
  tagContainer: {
    height: 50,
    marginRight: 10,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: color.deepLavender,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
