import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",

        paddingTop: Constants.statusBarHeight,

        alignItems: "center",
        justifyContent: "center"
    },

    inputGroup: {
        flexDirection: "row"
    },

    textInput: {
        width: "60%",
        height: 40,

        backgroundColor: "#FFF",

        marginHorizontal: 8,
        borderRadius: 8,

        textAlign: "center"
    }
});