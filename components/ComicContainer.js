import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import NavBar from './NavBar';
import PropTypes from 'prop-types';

export default class ComicContainer extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            comicData: {}
        }
    }

    componentDidMount() {
        this.getComicDataFromAPI();
    }

    getComicDataFromAPI = async(id = 0) => {
        if (id === 0) urlMod = 'info.0.json';
        else urlMod = `${id}/info.0.json`;

        try {
            const response = await fetch(`https://xkcd.com/${urlMod}`);
            const responseJSON = await response.json();
            this.setState({
                isLoading: false,
                comicData: responseJSON
            });
            return responseJSON;
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.comicData.title}</Text>
                <NavBar />
            </View>
        );
    }
}

ComicContainer.propTypes = {
    currentComicId: PropTypes.number
}

ComicContainer.defaultProps = {
    currentComicId: 0
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'        
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})