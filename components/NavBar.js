import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class NavBar extends Component {
    handlePress() {

    }

    render() {
        return (
            <View style={styles.navbar}>
                <Button onPress={this.handlePress} title="|<" color="#6E7B91" />
                <Button onPress={this.handlePress} title="< Prev" color="#6E7B91" />
                <Button onPress={this.handlePress} title="Random" color="#6E7B91" />
                <Button onPress={this.handlePress} title="Next >" color="#6E7B91" />
                <Button onPress={this.handlePress} title=">|" color="#6E7B91" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        flexDirection: 'row'
    }
})