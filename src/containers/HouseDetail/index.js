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
  requireNativeComponent,
  FlatList,
} from 'react-native';
import {push} from '../../services/NavigationService';
import {Metrics} from '../../theme';
import {ButtonView} from '../../reuseableComponents';
import {HOUSE, HOUSE_DETAIL} from '../../actions/ActionTypes';
import {request} from '../../actions/ServiceAction';
import constant from '../../constants';
import _ from 'lodash';
class HomeDetail extends Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this._getHouse();
  }

  _getHouse = () => {
    const data = this.props.navigation;
    this.props.request(
      HOUSE_DETAIL,
      `${constant.houseDetail}/${this.props.navigation.state.params.data._id}`,
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

  render() {
    const {houseDetail} = this.props;

    if (_.isUndefined(houseDetail) || houseDetail == null) {
      return null;
    }
    return (
      <Fragment>
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>owner : {houseDetail.owner} </Text>
          <Text>Address : {houseDetail.address}</Text>
          <Text>Price :{houseDetail.price} </Text>
          <Text>Area : {houseDetail.area}</Text>
        </SafeAreaView>
      </Fragment>
    );
  }
}
const actions = {request};
const mapStateToProps = state => ({
  houseDetail: state.houseDetail.data.response,
});

export default connect(mapStateToProps, actions)(HomeDetail);

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
