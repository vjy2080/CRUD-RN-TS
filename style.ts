import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        alignSelf: 'center',
        margin: 3,
        borderRadius: 3,
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: -45,
    },
    internalView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
        // width:'100%'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inputBlock: {
        flex: 4 / 4
    },
    headerText: {
        fontWeight: 'bold',
        color: 'blue'
    },
    cardText: {
        paddingHorizontal: 5,
        marginHorizontal: 5
    },
    buttonContainer: {
        flex: 1 / 4,
        alignItems: 'center'
    },
    startButton: {
        // backgroundColor: 'red',
        alignItems: 'center',
        flexDirection: 'row',
        // alignContent:'space-between',
        // alignContent: 'flex-end',
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingBottom: 10,
        // width: '90%',
        paddingEnd: 10,

    },
    startbtn: {
        alignItems: 'center',
        borderRadius: 50,
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'green',
        padding: 3,
        marginEnd: 15,
    },
    inputContainer: {
        height: '100%',
        width: '100%',
        paddingTop: 15,
        paddingHorizontal: 5,
        // paddingBottom:8,
        // margin: 3,
        // borderWidth: 1,
        // borderColor: 'red',
        justifyContent: 'center'
    },
    inputs: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#ADD8E6',
        padding: 8,
        borderRadius: 5
    },
    titleInput: {
        borderWidth: 1,
        // width: 105,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical:5,
        marginHorizontal: 5,
        borderRadius: 5,
        marginBottom: 10,
    },
    descInput: {
        borderWidth: 1,
        textAlign: 'left',
        // width: 205,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical:5,
        marginHorizontal: 5,
        borderRadius: 5,
        marginBottom: 10,

    },
    btn: {
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 50,
    },
    status:{
        textAlign:'right',
        marginRight:10,
        color:'grey'
    }

})