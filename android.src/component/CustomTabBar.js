import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ViewPropTypes,
  TouchableNativeFeedback,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../css/MainPageCSS.js';


const CustomTabBar = React.createClass({
  tabIcons: [],

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i));
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  // color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 216 + (204 - 216) * progress;
    const green = 19 + (204 - 19) * progress;
    const blue = 19 + (204 - 19) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  renderBtn(label) {
    if (!label) return null;
    // TODO: handle onPress event
    return (
      <TouchableOpacity key={label}
        style={[styles.flexOne, styles.button]}
        onPress={() => {}}>
        <Icon name={label} size={30}
          color='skyblue'
        />
      </TouchableOpacity>
    );
  },

  renderTab(tab, i) {
    return (
      <TouchableOpacity key={tab}
      onPress={() => this.props.goToPage(i)} style={styles.tab}>
        <Icon name={tab} size={30}
          color={this.props.activeTab === i ?
            'rgb(216, 19, 19)' : 'rgb(204,204,204)'}
          ref={(icon) => {
            this.tabIcons[i] = icon;
          }}
        />
      </TouchableOpacity>
    );
  },

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
          {this.renderBtn(this.props.leftBtnLabel)}
        {this.props.tabs.map(this.renderTab)}
          {this.renderBtn(this.props.rightBtnLabel)}
      </View>
    );
  },
});

module.exports = CustomTabBar;