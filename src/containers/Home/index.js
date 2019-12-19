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
import Swipeout from 'react-native-swipeout';
import _ from 'lodash';
var swipeoutBtns = [
  {
    text: 'Delete',
    onPress: index => {
      console.log('index : ', index);
      alert('show');
    },
  },
];
class Home extends Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this._getHouse();
  }

  state = {isOn: false};
  _onStatusChange = e => {
    this.setState({isOn: e.nativeEvent.isOn});
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
    console.log('_renderItem : ', item);
    return (
      <Swipeout
        right={swipeoutBtns}
        style={{backgroundColor: 'white'}}
        onOpen={(sectionID, rowId, index) => {
          console.log(
            'sectionID',
            sectionID,
            'rowId : ',
            rowId,
            'index : ',
            index,
          );
        }}>
        <ButtonView
          style={{
            paddingHorizontal: 10,
            flex: 1,
            paddingVertical: 20,
            borderWidth: 1,
            borderColor: 'black',
            opacity: 0.5,
          }}
          onPress={() => push('houseDetail', {data: item})}>
          <Text>owner : {item.owner} </Text>
          <Text>Address :{item.address} </Text>
          <Text>Price : {item.price}</Text>
          <Text>Area : {item.area} </Text>
        </ButtonView>
      </Swipeout>
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
          <FlatList
            data={houseList && houseList.houses.length && houseList.houses}
            renderItem={this._renderItem}
            keyExtractor={item => item.id}
            // ItemSeparatorComponent = {}
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
