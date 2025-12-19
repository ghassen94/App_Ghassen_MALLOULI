import { Image, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../assets/styles';
import { useState } from 'react';
import { useAppDispatch } from './store/hooks';
import { clearPendingEmail } from './store/authSlice';
import auth from '@react-native-firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = ({ navigation }: any) => {

    const [isLiked, setIsLiked] = useState(false)
    const dispatch = useAppDispatch();

    const likeAction = () => {
        setIsLiked(!isLiked);
    }

    const signOut = async () => {
        try {
            await auth().signOut();
        } catch (e) {
            console.warn('signOut error', e);
        } finally {
            dispatch(clearPendingEmail());
            navigation.replace('Login');
        }
    }

    const displayContentCard = (title: string = '', likesCount: string = '', description: string = '', displayIcon: boolean = false) => {
        return (
            <View style={styles.contentCardContainer}>
                <Text style={styles.contentTitle}>{title}</Text>
                {displayIcon && <View style={styles.contentLikeContainer}>
                    <Image
                        source={require('../assets/images/favorites.png')}
                        resizeMode="cover"
                        style={styles.contentLikeIcon}
                    />
                    <Text style={styles.contentLikeText}>{likesCount}</Text>
                </View>}
                <Text style={styles.contentDescription}>{description}</Text>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ImageBackground
                    source={require('../assets/images/gradientBlue.png')}
                    resizeMode="cover"
                    style={styles.homeScreenGradientBgStyle}
                >
                    <View>
                        <Image
                            source={require('../assets/images/headerHomePageBG.png')}
                            resizeMode="cover"
                            style={styles.homeHeaderImageBackground}
                        />
                        <TouchableOpacity onPress={likeAction} style={styles.homeScreenLikeIconContainer}>
                            <Image source={isLiked ? require('../assets/images/activeLike.png') : require('../assets/images/like.png')} style={styles.homeScreenTopIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={signOut} style={styles.homeScreenSignOutIconContainer}>
                            <Image source={require('../assets/images/signOut.png')} style={styles.homeScreenTopIcon} />
                        </TouchableOpacity>
                        <Image source={require('../assets/images/tunisie.png')} style={styles.homeScreenFlag} />
                        <Text style={styles.homePageTitle}>Discover Tunisian traditions</Text>
                        {
                            displayContentCard(
                                'Tunisia',
                                '1.2k',
                                "Tunisia is a land where history, nature, and hospitality come together. From the golden dunes of the Sahara to the turquoise coasts of the Mediterranean, every corner tells a story. It’s a country of contrasts — ancient yet modern, peaceful yet vibrant, where tradition lives hand in hand with progress.",
                                true
                            )
                        }
                        {/* <GestureHandlerRootView style={{ flex: 1 }}>
                            <MyCarousel />
                        </GestureHandlerRootView> */}
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Home;