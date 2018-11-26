import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert } from 'react-native';
import NavBar from './NavBar';
import ComicImage from './ComicImage';
import PropTypes from 'prop-types';

export default class ComicContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            latestComicId: 0,
            currentComicId: 0,
            comicData: {}
        }

        this.handleNavBtnClick = this.handleNavBtnClick.bind(this);
    }

    componentDidMount() {
        this.getComicDataFromAPI();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentComicId !== prevState.currentComicId) {
            this.getComicDataFromAPI();
        }
    }

    getComicDataFromAPI = async () => {
        let urlMod = '';
        if (this.state.currentComicId === 0) urlMod = 'info.0.json';
        else urlMod = `${this.state.currentComicId}/info.0.json`;

        try {
            this.setState({ isLoading: true });
            const response = await fetch(`https://xkcd.com/${urlMod}`);
            const responseJSON = await response.json();
            // workaround for xkcd's random function being down.
            if (this.state.currentComicId === 0) {
                this.setState({ latestComicId: responseJSON.num });
            }
            this.setState({
                isLoading: false,
                currentComicId: responseJSON.num,
                comicData: responseJSON
            });
            return responseJSON;
        } catch (error) {
            Alert.alert('Unable to fetch data. Please try again.');
            // console.error(error);
        }
    }

    handleNavBtnClick(type) {
        switch (type) {
            case 'first':
                this.setState({ currentComicId: 1 });
                break;
            case 'prev':
                if (this.state.currentComicId !== 1) {
                    this.setState({ currentComicId: this.state.comicData.num - 1 });
                }
                break;
            case 'rand':
                this.setState({ currentComicId: Math.floor(Math.random() * (this.state.latestComicId - 1) + 1) })
                break;
            case 'next':
                if (this.state.currentComicId !== this.state.latestComicId) {
                    this.setState({ currentComicId: this.state.comicData.num + 1 });
                }
                break;
            case 'last':
                this.setState({ currentComicId: this.state.latestComicId });
                break;
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
                <NavBar btnClickFunc={this.handleNavBtnClick} />
                <ComicImage source={{uri: this.state.comicData.img}} />
                <NavBar btnClickFunc={this.handleNavBtnClick} />
            </View>
        );
    }
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