import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    
    textGet:{
        marginBottom: 10,
        height: 30,
        fontSize: 20,
    },
    
    viewStyle:{
        flex: 1,
        padding: 20,
        marginTop: 50,
    },
    viewStylePesan:{
        flex: 1,
        padding: 20,
        marginTop: 50,
        height: 700,
    },

    textInput:{
        borderBottomColor: '#984400',
        borderBottomWidth: 1,
        marginBottom: 20,
        height: 30,
        fontSize: 20,
        flex: 1,
    },

    
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 150,
        borderRadius: 10,
        backgroundColor: 'black',
    },

    action: {
        flexDirection: 'row',
        paddingBottom: 10,
        width: '80%',
        alignSelf: 'center',
    },
    
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: '600',
        letterSpacing: 0.25,
        color: '#474747',
        textTransform: 'uppercase'
    },

    loginButtonSection: {
        width: '80%',
        // height: '30%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    loginButton: {
        backgroundColor: '#FFAE6D',
        color: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        borderRadius: 15,
        marginBottom: 30,
    },
    registerButton: {
        backgroundColor: '#FECD70',
        color: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        borderRadius: 15,
        marginBottom: 30,
    }
})

export default styles;