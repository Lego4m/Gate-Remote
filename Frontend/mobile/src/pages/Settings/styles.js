import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingLeft: 50,
        paddingRight: 50,
        
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        backgroundColor: 'white',
        width: 200,
        height: 40,

        marginLeft: 7,
        marginRight: 7,

        borderRadius: 7,

        fontSize: 14,
        textAlign: 'center',
    },

    creditsText: {
        color: 'white', 
        fontSize: 12,
        textAlign: 'center',
    }
});

export default styles;