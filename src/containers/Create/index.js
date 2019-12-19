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
} from 'react-native';
import {push} from '../../services/NavigationService';
import {Metrics} from '../../theme';

class Create extends Component {
  state = {
    isLoaded: false,
  };
  componentDidMount() {}
  state = {isOn: false};
  _onStatusChange = e => {
    this.setState({isOn: e.nativeEvent.isOn});
  };
  render() {
    console.log(
      'Metrics',
      Metrics.heightRatio(100) + '-' + Metrics.widthRatio(100),
    );
    return (
      <Fragment>
        <SafeAreaView>
          <Text>create</Text>
        </SafeAreaView>
      </Fragment>
    );
  }
}
const actions = {};
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
