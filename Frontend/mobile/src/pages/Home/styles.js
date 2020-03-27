import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        paddingTop: Constants.statusBarHeight
    },

    statusBar: {
        backgroundColor: "#282828"
    },

    statusBarText: {
        color: "#FFF",
        lineHeight: 24,
        textAlign: "center"
    },

    gateItem: {
        width: 130,
        height: 130,
        margin: 15,

        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 8,
        
        justifyContent: "center"
    },

    gateItemText: {
        color: "#FFF",
        lineHeight: 24,
        fontSize: 18,
        textAlign: "center"
    }
});