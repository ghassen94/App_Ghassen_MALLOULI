import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles, { COLOR_BLUE_2 } from '../assets/styles';

const LoadingScreen = ({ navigation }: any) => {
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });

        }, 30);

        setTimeout(() => {
            navigation.replace('Home');
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.loadingScreenContainer}>
            <AnimatedCircularProgress
                size={200}
                width={15}
                fill={progress}
                tintColor={COLOR_BLUE_2}
                backgroundColor={'rgba(0, 0, 0, 0.1)'}
                rotation={-90}
                duration={1}
                lineCap="round"
            >
                {(fill: number) => (
                    <Text style={styles.percentageIndicator}>{Math.round(fill)}%</Text>
                )}
            </AnimatedCircularProgress>

            <Text style={styles.percentageText}>Selecting topics <Text style={styles.pourcentageBlueText}>for you...</Text></Text>
        </View>
    );
};

export default LoadingScreen;