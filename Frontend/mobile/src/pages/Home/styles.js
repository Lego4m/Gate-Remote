import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    statusBar: {
        width: "100%",
        backgroundColor: "#3c3c3c",
    },

    statusText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },

    controllers: {
        height: "100%",

        paddingBottom: 20,

        alignItems: "center",
    },

    gateItem: {
        height: 130,
        width: 130,
        margin: 14,

        backgroundColor: 'black',
        borderRadius: 5,
        borderWidth : 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: "center",
    },

    gateItemText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
    }

});

export default styles;