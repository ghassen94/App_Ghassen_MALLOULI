import { Alert, Animated, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import styles, { COLOR_BLACK, COLOR_BLUE, COLOR_BLUE_1, COLOR_DARK_GREY_1, COLOR_GREEN, COLOR_YELLOW, COLOR_YELLOW_1, COLOR_YELLOW_2 } from '../assets/styles';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import auth from '@react-native-firebase/auth';
import { setPendingEmail } from './store/authSlice';
import AnimatedBtn from './UIKit/AnimatedBtn';

const Login = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const pendingEmail = useAppSelector((s: any) => s.auth.pendingEmail);

    useEffect(() => {
        if (pendingEmail) {
            navigation.replace('LoadingScreen');
        }
    }, [pendingEmail, navigation]);

    const [connectionMode, setConnectionMode] = useState('emailAddress');
    const [emailAddress, setEmailAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [link, setLink] = useState('');
    const [linkIsSent, setLinkIsSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isPressed, setIsPressed] = useState(-1);

    const DYNAMIC_LINK_HOSTNAME = 'my1for1.page.link';
    const DYNAMIC_LINK_URL = `https://${DYNAMIC_LINK_HOSTNAME}/finishSignIn`;


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
            return (
                <TextInput
                    value={emailAddress}
                    onChangeText={(email) => changeText(email)}
                    style={styles.loginInput}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    placeholder='Email'
                />
            )
        }
        return <TextInput value={phone} onChangeText={(phone) => changeText(phone)} keyboardType='phone-pad' style={styles.loginInput} placeholder='Phone' />
    }

    const displayLinkInput = () => {
        return (
            <TextInput
                value={link}
                onChangeText={(link) => setLink(link)}
                style={styles.loginInput}
                keyboardType='url'
                placeholder='Lien'
            />
        )
    }

    const loginAction = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

        if (connectionMode == 'emailAddress') {
            if ((!emailRegex.test(emailAddress.trim()))) {
                return Alert.alert('Erreur', 'Saisir une adresse email valide !');
            }

            // TODO: Replace the URL below with your Firebase Dynamic Link / action URL configured in the Firebase console
            const actionCodeSettings = {
                // This should be a URL from your Dynamic Links domain (added to Firebase Authorized domains)
                url: DYNAMIC_LINK_URL,
                handleCodeInApp: true,
                iOS: {
                    // iOS bundle id for your app — update if different in your Xcode project
                    bundleId: 'com.app_ghassen_mallouli'
                },
                android: {
                    // Android applicationId from android/app/build.gradle
                    packageName: 'com.app_ghassen_mallouli',
                    installApp: true,
                    minimumVersion: '1'
                }
            };

            setLoading(true);
            setLinkIsSent(true);
            try {
                console.warn('Sending sign-in link to', emailAddress.trim(), 'with url:', actionCodeSettings.url);

                await auth().sendSignInLinkToEmail(emailAddress.trim(), actionCodeSettings);
                // store the pending email in Redux so the link handler can complete the sign in
                dispatch(setPendingEmail(emailAddress.trim()));

                Alert.alert('Vérifiez votre e‑mail', 'Un lien de connexion a été envoyé. Ouvrez-le sur le même appareil pour vous connecter.');
            } catch (error: any) {
                // More actionable message when the domain is not authorized in Firebase
                if (error.code === 'auth/unauthorized-domain') {
                    const domain = actionCodeSettings?.url ? actionCodeSettings.url.replace(/^https?:\/\//, '').split('/')[0] : 'votre-domaine';
                    Alert.alert('Erreur : domaine non autorisé', `Le domaine ${domain} n'est pas autorisé pour les actions d'authentification. Ajoutez-le dans Firebase Console → Authentication → Settings → Authorized domains.`);
                } else {
                    Alert.alert('Erreur', error.message || "Erreur lors de l'envoi du lien de connexion.");
                }
            } finally {
                setLoading(false);
            }

            return;
        }
    }

    const cnxWithEmailAndLink = async () => {
        if (!emailAddress.trim() && !link.trim()) {
            return Alert.alert('Erreur', 'Veuillez saisir votre adresse e-mail et le lien de connexion.');
        }

        try {
            await auth().signInWithEmailLink(emailAddress, link.trim());
            // navigation.replace('LoadingScreen');
        } catch (error: any) {
            Alert.alert('Erreur', error.message || "Erreur lors de l'envoi du lien de connexion.");
        }
        navigation.replace('LoadingScreen');
    }

    const loginActionWithFacebook = () => {
    }

    const loginActionWithGoogle = () => {
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

                        {!linkIsSent && <AnimatedBtn
                            onPressIn={() => onPressIn(1)}
                            onPressOut={onPressOut}
                            onPressAction={() => { if (loading) return; loginAction(); }}
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
                        }

                        {linkIsSent && displayLinkInput()}
                        {linkIsSent &&
                            <AnimatedBtn
                                onPressIn={() => onPressIn(1)}
                                onPressOut={onPressOut}
                                onPressAction={() => cnxWithEmailAndLink()}
                                btnStyle={styles.loginBtnContainer}

                                displayLinearGradient1={false}

                                colors2={isPressed == 1 ? [COLOR_GREEN, COLOR_GREEN] : [COLOR_YELLOW, COLOR_YELLOW_2]}
                                startLinearGradient2={{ x: 0, y: 0 }}
                                stylesLinearGradient2={styles.loginBtn}
                                endLinearGradient2={{ x: 1, y: 0 }}

                                withIcon={false}
                                withGradientText={false}
                                btnTextStyle={styles.loginBtnText}
                                textContent='connexion'

                                colors3={isPressed == 1 ? ['transparent', 'transparent'] : ['transparent', COLOR_YELLOW_1]}
                                stylesLinearGradient3={styles.loginBtnBottomShadow}
                            />
                        }
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