import { useEffect, useRef } from 'react';
import { Animated, Image } from 'react-native';
import styles from '../assets/styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }: any) => {
    // Animated values
    const fadeAnim = useRef(new Animated.Value(0)).current;   // opacity
    const scaleAnim = useRef(new Animated.Value(0.5)).current; // scale

    useEffect(() => {
        // Animation: fade + scale
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();

        // Redirection après 3 secondes
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaProvider style={styles.splashScreenContainer}>
            <Animated.Image
                source={require('../assets/images/Logo1for1.png')}
                style={[
                    styles.splashScreenImage,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
                resizeMode="contain"
            />
        </SafeAreaProvider>
    );
};

export default SplashScreen;
