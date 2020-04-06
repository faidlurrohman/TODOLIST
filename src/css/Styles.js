import {StyleSheet} from 'react-native';

const drawer = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#375CBA',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  containertopRow: {
    marginVertical: 30,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTopRow: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  containertopRowText: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  containerBody: {
    marginHorizontal: 10,
    flex: 1,
  },
  containerFooter: {
    marginHorizontal: 10,
    flex: 0,
  },
  txtBottom: {
    marginHorizontal: 13,
    color: '#FBFBFC',
    fontSize: 20,
    fontWeight: '100',
  },
  containerItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

const login = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFC',
  },
  containerTitle: {
    flex: 0,
    backgroundColor: '#375CBA',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#375CBA',
  },
  containerFormControl: {
    padding: 30,
    flex: 1,
    backgroundColor: '#FBFBFC',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  header: {
    paddingHorizontal: 17,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FBFBFC',
  },
  headerChild: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    fontSize: 16,
    color: '#FBFBFC',
    marginBottom: 20,
  },
  input: {
    color: '#375CBA',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 45,
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
    elevation: 1,
  },
  inputError: {
    color: '#375CBA',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 45,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderRadius: 20,
    elevation: 1,
  },
  btn1: {
    paddingVertical: 10,
    backgroundColor: '#375CBA',
    borderRadius: 50,
    alignItems: 'center',
    elevation: 1,
  },
  textBtn1: {
    color: '#FBFBFC',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const signup = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFC',
  },
  containerTitle: {
    flex: 0,
    backgroundColor: '#375CBA',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#375CBA',
  },
  containerFormControl: {
    padding: 30,
    flex: 1,
    backgroundColor: '#FBFBFC',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  header: {
    paddingHorizontal: 17,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FBFBFC',
    marginBottom: 20,
  },
  input: {
    color: '#375CBA',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 45,
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
    elevation: 1,
  },
  inputError: {
    color: '#375CBA',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 45,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    borderRadius: 20,
    elevation: 1,
  },
  btn1: {
    paddingVertical: 10,
    backgroundColor: '#375CBA',
    borderRadius: 50,
    alignItems: 'center',
    elevation: 1,
  },
  textBtn1: {
    color: '#FBFBFC',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const landing = StyleSheet.create({
  container: {
    backgroundColor: '#375CBA',
    padding: 15,
    flex: 1,
  },
  txtTitle: {
    textAlign: 'center',
    color: '#FBFBFC',
    fontWeight: 'bold',
    fontSize: 40,
    padding: 40,
  },
  text1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#202020',
  },
  text2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#202020',
  },
  img: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  btn1: {
    paddingVertical: 10,
    backgroundColor: '#FBFBFC',
    borderRadius: 50,
    alignItems: 'center',
    elevation: 3,
  },
  textBtn1: {
    color: '#375CBA',
    fontWeight: 'bold',
    fontSize: 20,
  },
  btn2: {
    marginVertical: 20,
    paddingVertical: 10,
    backgroundColor: '#375CBA',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#FBFBFC',
    alignItems: 'center',
    elevation: 3,
  },
  textBtn2: {
    color: '#FBFBFC',
    fontWeight: 'bold',
    fontSize: 20,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#375CBA',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#375CBA',
  },
  textSlide: {
    color: '#FBFBFC',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 60,
  },
});

const home = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFC',
  },
  containerTitle: {
    flex: 0,
    backgroundColor: '#375CBA',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#375CBA',
  },
  containerFormControl: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FBFBFC',
    borderTopLeftRadius: 25,
  },
  header: {
    paddingHorizontal: 17,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FBFBFC',
  },
  headerChild: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    fontSize: 14,
    color: '#FBFBFC',
    marginBottom: 20,
  },
  input: {
    color: '#375CBA',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
    elevation: 1,
  },
  btn1: {
    paddingVertical: 10,
    backgroundColor: '#375CBA',
    borderRadius: 50,
    alignItems: 'center',
    elevation: 1,
  },
  textBtn1: {
    color: '#FBFBFC',
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnAdd: {
    paddingVertical: 8,
    backgroundColor: '#FBFBFC',
    borderRadius: 5,
    elevation: 1,
  },
  textBtnAdd: {
    paddingHorizontal: 12,
    color: '#375CBA',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

const complete = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFC',
  },
  containerTitle: {
    flex: 0,
    backgroundColor: '#B51B22',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#B51B22',
  },
  header: {
    paddingHorizontal: 17,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FBFBFC',
  },
  headerChild: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    fontSize: 14,
    color: '#FBFBFC',
    marginBottom: 20,
  },
});

const favorite = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFC',
  },
  containerTitle: {
    flex: 0,
    backgroundColor: '#F79237',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#F79237',
  },
  header: {
    paddingHorizontal: 17,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FBFBFC',
  },
  headerChild: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    fontSize: 14,
    color: '#FBFBFC',
    marginBottom: 20,
  },
});

const todo = StyleSheet.create({
  containerFormControl: {
    flex: 1,
    backgroundColor: '#FBFBFC',
    borderTopLeftRadius: 25,
  },
  input: {
    color: '#375CBA',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
    elevation: 1,
  },
});

const modalAdd = StyleSheet.create({
  headerModalAdd: {
    color: '#375CBA',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 15,
  },
  editButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  inputDesc: {
    color: '#000',
    opacity: 0.5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#375CBA',
  },
  inputName: {
    color: '#000',
    opacity: 0.5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#375CBA',
    marginBottom: 30,
  },
  btnCreate: {
    backgroundColor: '#375CBA',
    alignItems: 'center',
  },
  btnCreateText: {
    paddingVertical: 15,
    fontSize: 20,
    fontWeight: '100',
    color: '#FBFBFC',
  },
  btnDate: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnCreateDate: {
    paddingVertical: 35,
    fontSize: 18,
    fontWeight: '100',
    color: '#375CBA',
  },
});

const modalEdit = StyleSheet.create({
  headerModaEdit: {
    color: '#375CBA',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 15,
  },
  editButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  inputDesc: {
    color: '#000',
    opacity: 0.5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#375CBA',
  },
  inputName: {
    color: '#000',
    opacity: 0.5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#375CBA',
    marginBottom: 30,
  },
  btnCreate: {
    backgroundColor: '#375CBA',
    alignItems: 'center',
  },
  btnCreateText: {
    paddingVertical: 15,
    fontSize: 20,
    fontWeight: '100',
    color: '#FBFBFC',
  },
  btnDate: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnCreateDate: {
    paddingVertical: 35,
    fontSize: 18,
    fontWeight: '100',
    color: '#375CBA',
  },
});

const modalDelete = StyleSheet.create({
  deleteContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBody: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#375CBA',
    width: 300,
    height: 150,
  },
  deleteHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FBFBFC',
  },
  deleteFooter: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 30,
  },
  deleteCancel: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: '#F79237',
    elevation: 3,
  },
  deleteOk: {
    flex: 1,
    backgroundColor: '#B51B22',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    elevation: 3,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 15,
    color: '#FBFBFC',
    fontWeight: 'bold',
  },
});

const modalProfile = StyleSheet.create({
  titleProfile: {
    color: '#FBFBFC',
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 15,
  },
  imageUpload: {
    elevation: 5,
    position: 'absolute',
    transform: [{translateX: -50}, {translateY: -50}],
    top: '85%',
    left: '80%',
    backgroundColor: '#FBFBFC',
    borderRadius: 100,
    padding: 10,
  },
  inputModalProfile: {
    color: '#fff',
    opacity: 0.5,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#FBFBFC',
  },
  textName: {
    fontSize: 18,
    color: '#FBFBFC',
    paddingHorizontal: 5,
  },
  txtEmailAndPass: {
    fontSize: 18,
    color: '#FBFBFC',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  btnSave: {
    marginHorizontal: 25,
    marginVertical: 30,
    backgroundColor: '#FBFBFC',
    alignItems: 'center',
  },
  txtBtnSave: {
    paddingVertical: 15,
    fontSize: 20,
    fontWeight: '100',
    color: '#375CBA',
  },
});

const modalAlert = StyleSheet.create({
  deleteContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testimoni: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBody: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#B51B22',
    width: 300,
    height: 500,
  },
  deleteHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FBFBFC',
  },
  deleteFooter: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 30,
  },
  deleteCancel: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: '#F79237',
    elevation: 3,
  },
  deleteOk: {
    flex: 1,
    backgroundColor: '#375CBA',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    elevation: 3,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 15,
    color: '#FBFBFC',
    fontWeight: 'bold',
  },
});
export {
  drawer,
  login,
  signup,
  landing,
  home,
  complete,
  favorite,
  todo,
  modalAdd,
  modalEdit,
  modalDelete,
  modalProfile,
  modalAlert,
};
