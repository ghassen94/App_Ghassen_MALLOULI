import { Alert, Animated, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import styles, { COLOR_BLACK, COLOR_BLUE, COLOR_BLUE_1, COLOR_DARK_GREY_1, COLOR_GREEN, COLOR_YELLOW, COLOR_YELLOW_1, COLOR_YELLOW_2 } from '../assets/styles';
import { useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from './GradientText';
import AnimatedBtn from './AnimatedBtn';


const Login = ({ navigation }: any) => {
    // const { id, title } = route.params;
    const [connectionMode, setConnectionMode] = useState('emailAddress');
    const [emailAddress, setEmailAddress] = useState('');
    const [phone, setPhone] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isPressed, setIsPressed] = useState(-1);

    const translate = () => {
        // translate
    }


    const onPressIn = (val: number) => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: false, }).start();
        setIsPressed(val);
    };

    const onPressOut = () => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 100, useNativeDriver: false, }).start();
        setIsPressed(-1);
    };

    const chooseConnectionMode = (mode: string) => {
        setConnectionMode(mode);
    }

    const changeText = (text: string) => {
        if (connectionMode === 'emailAddress') {
            setEmailAddress(text)
        } else {
            setPhone(text)
        }
    }

    const displayTextInput = () => {
        if (connectionMode === 'emailAddress') {
            return <TextInput value={emailAddress} onChangeText={(email) => changeText(email)} style={styles.loginInput} keyboardType='email-address' />
        }
        return <TextInput value={phone} onChangeText={(phone) => changeText(phone)} keyboardType='phone-pad' style={styles.loginInput} />
    }

    const loginAction = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

        if (connectionMode == 'emailAddress') {
            if ((!emailRegex.test(emailAddress.trim()))) {
                return Alert.alert('Erreur', 'Saisir une adresse email valide !');
            }
        }
        navigation.replace('Home');
    }

    const loginActionWithFacebook = () => {
        navigation.replace('Home');
    }

    const loginActionWithGoogle = () => {
        navigation.replace('Home');
    }


    return (
        <SafeAreaProvider style={styles.loginScreen}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.loginScreenHeader}>
                        <ImageBackground
                            source={require('../assets/images/Background-loginPage.png')}
                            style={styles.loginImage}
                            resizeMode="cover"
                        >
                            <TouchableOpacity style={styles.translateIconContainer} onPress={translate}>
                                <Image source={require('../assets/images/translateIcon.png')} />
                            </TouchableOpacity>
                            <Text style={styles.slogan}>Welcome to</Text>
                            <Image
                                source={require('../assets/images/Logo1for1White.png')}
                                style={styles.sloganLogo}
                                resizeMode="contain"
                            />
                            <Text style={styles.slogan}>Learn 1FOR1 your way</Text>
                        </ImageBackground>
                    </View>

                    <View style={styles.connectionZone}>
                        <RadioButton.Group
                            onValueChange={mode => chooseConnectionMode(mode)}
                            value={connectionMode}
                        >
                            <View style={styles.connectionModeContainer}>
                                <RadioButton.Item label="Email address" value="emailAddress" position='leading' labelStyle={styles.connectionModeItemLabelStyle} style={styles.connectionModeItem} color={COLOR_BLUE} />
                                <RadioButton.Item label="Phone" value="phone" position='leading' labelStyle={styles.connectionModeItemLabelStyle} style={styles.connectionModeItem} color={COLOR_BLUE} />
                            </View>
                        </RadioButton.Group>

                        {displayTextInput()}

                        <AnimatedBtn
                            onPressIn={() => onPressIn(1)}
                            onPressOut={onPressOut}
                            onPressAction={loginAction}
                            btnStyle={styles.loginBtnContainer}

                            displayLinearGradient1={false}

                            colors2={isPressed == 1 ? [COLOR_GREEN, COLOR_GREEN] : [COLOR_YELLOW, COLOR_YELLOW_2]}
                            startLinearGradient2={{ x: 0, y: 0 }}
                            stylesLinearGradient2={styles.loginBtn}
                            endLinearGradient2={{ x: 1, y: 0 }}

                            withIcon={false}
                            withGradientText={false}
                            btnTextStyle={styles.loginBtnText}
                            textContent='Continue'

                            colors3={isPressed == 1 ? ['transparent', 'transparent'] : ['transparent', COLOR_YELLOW_1]}
                            stylesLinearGradient3={styles.loginBtnBottomShadow}
                        />
                    </View>

                    <View style={styles.bottomLogin}>
                        <AnimatedBtn
                            onPressIn={() => onPressIn(2)}
                            onPressOut={onPressOut}
                            onPressAction={loginActionWithFacebook}
                            btnStyle={styles.socialCnxLoginBtnContainer}

                            colors1={isPressed == 2 ? [COLOR_BLUE, COLOR_BLUE] : [COLOR_BLUE, 'transparent']}
                            stylesLinearGradient1={styles.socialCnxLoginBtnTopShadow}
                            startLinearGradient1={{ x: 0, y: 0 }}
                            endLinearGradient1={{ x: 1, y: 0 }}

                            colors2={isPressed == 2 ? [COLOR_BLUE, COLOR_BLUE_1] : [COLOR_BLACK, COLOR_DARK_GREY_1]}
                            startLinearGradient2={{ x: 0, y: 0 }}
                            endLinearGradient2={{ x: 1, y: 0 }}
                            stylesLinearGradient2={styles.socialCnxLoginBtn}

                            iconeSrc={require('../assets/images/facebook-icon.png')}
                            iconeStyle={styles.socialCnxLoginBtnIcon}

                            withGradientText={true}
                            GradientTextColors={isPressed == 2 ? [COLOR_BLUE, COLOR_YELLOW] : [COLOR_YELLOW, COLOR_BLUE]}
                            GradientTextStyle={styles.socialCnxLoginBtnText}
                            GradientTextContent='Continue with Facebook'

                            colors3={isPressed == 2 ? ['transparent', COLOR_BLUE] : ['transparent', COLOR_BLUE]}
                            stylesLinearGradient3={styles.socialCnxLoginBtnBottomShadow}
                        />

                        <AnimatedBtn
                            onPressIn={() => onPressIn(3)}
                            onPressOut={onPressOut}
                            onPressAction={loginActionWithGoogle}
                            btnStyle={styles.socialCnxLoginBtnContainer}

                            colors1={isPressed == 3 ? [COLOR_BLUE, COLOR_BLUE] : [COLOR_BLUE, 'transparent']}
                            stylesLinearGradient1={styles.socialCnxLoginBtnTopShadow}
                            startLinearGradient1={{ x: 0, y: 0 }}
                            endLinearGradient1={{ x: 1, y: 0 }}

                            colors2={isPressed == 3 ? [COLOR_BLUE, COLOR_BLUE_1] : [COLOR_BLACK, COLOR_DARK_GREY_1]}
                            startLinearGradient2={{ x: 0, y: 0 }}
                            endLinearGradient2={{ x: 1, y: 0 }}
                            stylesLinearGradient2={styles.socialCnxLoginBtn}

                            iconeSrc={require('../assets/images/google-icon.png')}
                            iconeStyle={styles.socialCnxLoginBtnIcon}

                            withGradientText={true}
                            GradientTextColors={isPressed == 3 ? [COLOR_BLUE, COLOR_YELLOW] : [COLOR_YELLOW, COLOR_BLUE]}
                            GradientTextStyle={styles.socialCnxLoginBtnText}
                            GradientTextContent='Continue with google'

                            colors3={isPressed == 3 ? ['transparent', COLOR_BLUE] : ['transparent', COLOR_BLUE]}
                            stylesLinearGradient3={styles.socialCnxLoginBtnBottomShadow}
                        />

                        <Text style={styles.legalNoticesText}>
                            By continuing, you agree to 1for1 <Text style={styles.importantText}>Terms of Use</Text> and confirm that you have read our <Text style={styles.importantText}>Privacy Policy</Text>. Learn more about how we collect data.
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Login;