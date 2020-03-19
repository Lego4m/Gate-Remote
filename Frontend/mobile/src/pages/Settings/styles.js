import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",

        marginBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        
        alignItems: "center",
    },

    input: {
        backgroundColor: 'white',
        width: 200,
        height: 40,

        marginLeft: 7,
        marginRight: 7,

        borderRadius: 7,

        textAlign: 'center',
        fontSize: 14,
    },

    creditsText: {
        backgroundColor: '#191919', 
        textAlign: 'center',

        color: 'white', 
        fontSize: 12,
    }
});

export default styles;