import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export const COLOR_YELLOW = '#FFFF53';
export const COLOR_YELLOW_1 = '#BDDD06';
export const COLOR_YELLOW_2 = '#B8FF35';
export const COLOR_YELLOW_3 = '#FFEB3B';
export const COLOR_GREEN = '#96DD10';
const COLOR_WHITE  = '#FFF';
export const COLOR_BLACK  = '#000';
export const COLOR_LIGHT_GREY = '#e0e0e0ff';
const COLOR_DARK_GREY = '#212121';
export const COLOR_DARK_GREY_1 = '#242424';
export const COLOR_BLUE = '#44DBE5';
export const COLOR_BLUE_1 = '#0CF0FF';
export const COLOR_BLUE_2 = '#00e0ff';
export const COLOR_BLUE_3 = '#4000FF';


const LIGT = '300';
const NORMAL = '400';
const MEDIUM = '500';
const BOLD = '700';
const EXTRA_BOLD = '900';


const styles = StyleSheet.create({
    splashScreenContainer: {
        backgroundColor: COLOR_YELLOW,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },

    splashScreenImage: {
        width: 136,
        height: 84
    },

    loginScreen: {
        backgroundColor: COLOR_DARK_GREY,
    },

    loginScreenHeader: {
        borderRadius: 30,
        padding: 10,
    },

    translateIconContainer: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 44,
        height: 44,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%'
    },

    loginImage: {
        width:'100%',
        height: 291,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    slogan: {
        fontSize: 24,
        fontWeight: EXTRA_BOLD,
        color: COLOR_WHITE
    },

    sloganLogo: {
        width: 136,
        height: 84,
        marginVertical: 16
    },

    connectionZone: {
        marginTop:8,
        padding: 16,
    },

    connectionModeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 0,
    },

    connectionModeItemLabelStyle: {
        fontSize: 16,
        color: COLOR_WHITE,
        padding: 0,
        margin: 0
    },

    connectionModeItem: {
        paddingLeft: 0,
        marginLeft: 0,
    },

    bottomLogin: {
        marginTop: 8,
        padding: 16,
    },

    loginInput: {
        borderWidth: 1,
        borderColor: COLOR_WHITE,
        borderRadius: 20,
        padding: 16,
        color: COLOR_WHITE,
        opacity: 0.5,
        fontSize: 16,
        fontWeight: MEDIUM
    },

    loginBtnContainer: {
        width: '100%',
        height: 58,
        position: 'relative',
        marginBottom: 20,
        marginTop: 16,
    },
    
    loginBtn: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,

        shadowColor: COLOR_YELLOW_1,
        shadowOffset: { width: 0, height: 54 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 5, // Pour Android
    },

    loginBtnText: {
        fontSize: 16,
        fontWeight: MEDIUM,
        textAlign: 'center',
    },

    loginBtnBottomShadow: {
        position: 'absolute',
        bottom: -6,
        left: 0,
        right: 0,
        height: 50,
        borderRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    //socialCnx
    socialCnxLoginBtnContainer: {
        width: '100%',
        height: 58,
        position: 'relative',
        marginBottom: 16,
    },

    socialCnxLoginBtn: {
        flex: 1,
        borderRadius: 20,
        alignItems: 'center',
        padding: 16,
        opacity: 1,
        shadowColor: COLOR_DARK_GREY_1,
        shadowOffset: { width: 0, height: 54 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5, // Pour Android
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    socialCnxLoginBtnIcon: {
        width: 24,
        height: 24,
        marginRight: 16
    },

    socialCnxLoginBtnText: {
        fontSize: 16,
        fontWeight: MEDIUM,
        textAlign: 'center',
        color: COLOR_WHITE,
    },

    socialCnxLoginBtnTopShadow: {
        position: 'absolute',
        top: -2,
        left: -3,
        right: 0,
        height: '100%',
        borderRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    socialCnxLoginBtnBottomShadow: {
        position: 'absolute',
        bottom: -4,
        left: -3,
        right: 0,
        height: 50,
        borderRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    legalNoticesText: {
        fontSize: 14,
        fontWeight: NORMAL,
        color: COLOR_WHITE,
        textAlign: 'center',
        lineHeight: 23,
        letterSpacing: 1.1
    },

    importantText: {
        textDecorationLine: 'underline',
        fontWeight: BOLD
    },

    // Loading screen
    loadingScreenContainer: {
        flex: 1,
        backgroundColor: COLOR_YELLOW_3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    percentageIndicator: {
        fontSize: 20,
        fontWeight: BOLD,
        lineHeight: 21
    },

    percentageText: {
        fontSize: 16,
        fontWeight: BOLD,
        lineHeight: 21,
        marginTop: 30,
    },

    pourcentageBlueText: {
        color: COLOR_BLUE_3,
    }
});


export default styles;