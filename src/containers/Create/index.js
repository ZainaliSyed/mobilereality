import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {push, pop} from '../../services/NavigationService';
import {Metrics} from '../../theme';
import {
  MaterialTextField,
  TextField,
  FormHandler,
  AppButton,
} from '../../reuseableComponents';
import {INPUT_TYPES} from '../../reuseableComponents/FormHandler/Constants';
import {CREATE_HOUSE, HOUSE} from '../../actions/ActionTypes';
import constant from '../../constants';
import {request} from '../../actions/ServiceAction';

class Create extends Component {
  state = {
    firstName: '',
    lastName: '',
    dob: '',
    mobileNumber: '',
    email: '',
    password: '',
  };

  componentDidMount() {}

  oncreateSubmit = () => {
    const formData = this.formHandler.onSubmitForm();
    formData && this.createRequest(formData);
  };

  _getHouse = () => {
    this.props.request(
      HOUSE,
      `${constant.house}`,
      'get',
      {},
      false,
      data => {
        // console.log('_getHouse ********* : ', data);
      },
      undefined,
      false,
    );
  };
  createRequest = formData => {
    let payload = new FormData();
    payload.append('address', formData.address);
    payload.append('owner', formData.owner);
    payload.append('price', formData.price);
    payload.append('area', formData.area);
    this.props.request(
      CREATE_HOUSE,
      constant.house,
      'post',
      payload,
      true,
      data => {
        this._getHouse();
        pop();
      },
      () => {},
    );
  };
  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <FormHandler ref={ref => (this.formHandler = ref)}>
            <MaterialTextField
              // keyboardTypeCustom={INPUT_TYPES.TEXT}
              // style={styles.textField}
              label="Address"
              error={'Address required'}
              type={INPUT_TYPES.TEXT}
              identifier="address"
              blurOnSubmit
              maxLength={50}
            />
            <MaterialTextField
              // keyboardTypeCustom={INPUT_TYPES.TEXT}
              // style={styles.textField}
              label="owner"
              error={'owner required'}
              type={INPUT_TYPES.TEXT}
              identifier="owner"
              blurOnSubmit
              maxLength={50}
            />
            <MaterialTextField
              // keyboardTypeCustom={INPUT_TYPES.TEXT}
              // style={styles.textField}
              label="price"
              error={'price required'}
              type={INPUT_TYPES.TEXT}
              identifier="price"
              blurOnSubmit
              maxLength={50}
            />
            <MaterialTextField
              // keyboardTypeCustom={INPUT_TYPES.TEXT}
              // style={styles.textField}
              label="area"
              error={'area required'}
              type={INPUT_TYPES.NUMBER}
              identifier="area"
              blurOnSubmit
              maxLength={50}
            />
          </FormHandler>
          <AppButton title="Create" onPress={this.oncreateSubmit} />
        </SafeAreaView>
      </Fragment>
    );
  }
}
const actions = {request};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, actions)(Create);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5FCFF'},
  top: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  bottom: {
    width: '100%',
    height: '100%',
    zIndex: 999,
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1
  },
});
