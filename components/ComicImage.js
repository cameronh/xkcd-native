import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

export default class ComicImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            isLoading: true
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={this.props.source} />
                </View>
            </View>
        );
    }
}

ComicImage.propTypes = {
    source: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        width: 400,
        height: 300
    },
    image: {
        resizeMode: 'center',
        width: '100%',
        height: '100%'
    }
})