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
import {HOUSE} from '../../actions/ActionTypes';
import {request} from '../../actions/ServiceAction';
import constant from '../../constants';
// import Swipeout from 'react-native-swipeout';
import {SwipeListView} from 'react-native-swipe-list-view';

import _ from 'lodash';

class Home extends Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this._getHouse();
  }

  _deleteHouse = id => {
    this.props.request(
      HOUSE,
      `${constant.house}/${id}`,
      'delete',
      {},
      false,
      data => {
        // console.log('_deleteHouse ********* : ', data);
        this._getHouse();
      },
      undefined,
      false,
    );
  };
  _getHouse = () => {
    this.props.request(
      HOUSE,
      `${constant.house}`,
      'get',
      {},
      false,
      data => {
        console.log('_getHouse ********* : ', data);
      },
      undefined,
      false,
    );
  };
  _renderItem = ({item, index}) => {
    return (
      <ButtonView
        style={{
          paddingHorizontal: 10,
          flex: 1,
          paddingVertical: 20,
          borderWidth: 1,
          borderColor: 'black',
          opacity: 0.5,
          flexDirection: 'row',
        }}
        onPress={() => push('houseDetail', {data: item})}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <Text>owner : {item.owner} </Text>
          <Text>Address :{item.address} </Text>
          <Text>Price : {item.price}</Text>
          <Text>Area : {item.area} </Text>
        </View>
        <ButtonView
          onPress={() => {
            console.log('data : ', item);
            this._deleteHouse(item._id);
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
            Delete
          </Text>
        </ButtonView>
      </ButtonView>
    );
  };
  renderHiddenItem = (data, rowMap) => {
    return (
      <ButtonView
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          flex: 1,
        }}
        onPress={() => {
          // this._deleteHouse(data.item._id);
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
          Delete
        </Text>
      </ButtonView>
    );
  };
  render() {
    const {houseList} = this.props;
    console.log('houseList : ', houseList);
    if (_.isUndefined(houseList) || houseList == null) {
      return null;
    }
    // return null;
    return (
      <Fragment>
        <SafeAreaView>
          <SwipeListView
            data={houseList && houseList.houses}
            // data={[{key: 1}, {key: 2}]}
            renderItem={this._renderItem}
            // renderHiddenItem={this.renderHiddenItem}
            rightOpenValue={-75}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}
const actions = {request};
const mapStateToProps = state => ({
  houseList: state.houseList.data.response,
});

export default connect(mapStateToProps, actions)(Home);

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
