import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        alignSelf: 'center',
        margin: 3,
        borderRadius: 3,
        padding: 5
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
    inputContainer: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 5,
        margin: 3,
        paddingTop: 15
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
        width: 105,
        borderColor: 'black',
        paddingHorizontal: 5,
        marginHorizontal: 5,
        borderRadius: 5
    },
    descInput: {
        borderWidth: 1,
        width: 205,
        borderColor: 'black',
        paddingHorizontal: 5,
        marginHorizontal: 5,
        borderRadius: 5
    },
    btn:{
        backgroundColor:'green',
        padding:5,
        borderRadius:50
    }
})