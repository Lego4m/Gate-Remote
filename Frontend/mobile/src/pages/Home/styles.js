import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    statusBar: {
        width: "100%",
        backgroundColor: "#3c3c3c",
    },

    statusText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
    },

    controllers: {
        maxWidth: 1200,
        margin: "auto",
        paddingTop: 8,
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