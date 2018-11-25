import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
    render() {
        return (
            <View style={styles.navbar}>
                <Button onPress={this.props.btnClickFunc.bind(this, 'first')} title="|<" color="#6E7B91" />
                <Button onPress={this.props.btnClickFunc.bind(this, 'prev')} title="< Prev" color="#6E7B91" />
                <Button onPress={this.props.btnClickFunc.bind(this, 'rand')} title="Random" color="#6E7B91" />
                <Button onPress={this.props.btnClickFunc.bind(this, 'next')} title="Next >" color="#6E7B91" />
                <Button onPress={this.props.btnClickFunc.bind(this, 'last')} title=">|" color="#6E7B91" />
            </View>
        );
    }
}

NavBar.propTypes = {
    btnClickFunc: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row'
    }
})