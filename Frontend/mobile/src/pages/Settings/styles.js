import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",

        marginTop: 20,
        paddingLeft: 50,
        paddingRight: 50,
        

        alignItems: "center",
    },

    input: {
        backgroundColor: 'white',
        width: "100%",
        height: 40,

        borderRadius: 7,

        textAlign: 'center',
        fontSize: 14,
    },

    buttonIP: {
        backgroundColor: '#35AAFF',
        width: 115,
        height: 40,

        marginTop: 10,
        marginLeft: 2.5,
        marginRight: 2.5,
        borderRadius: 7,

        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonPass: {
        backgroundColor: '#35AAFF',
        width: 115,
        height: 40,

        marginTop: 10,
        borderRadius: 7,

        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },

    creditsText: {
        backgroundColor: '#191919', 
        textAlign: 'center',

        color: 'white', 
        fontSize: 12,
    }
});

export default styles;