import React from 'react';
import { Image, Text, TextProps, TouchableOpacity } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR_BLUE, COLOR_YELLOW } from '../assets/styles';
import GradientText from './GradientText';

interface AnimatedBtnProps extends TextProps {
    onPressIn?: () => void;
    onPressOut?: () => void;
    onPressAction?: () => void;
    btnStyle?: any;

    displayLinearGradient1?: boolean;
    colors1?: string[];
    stylesLinearGradient1?: any;
    startLinearGradient1?: any;
    endLinearGradient1?: any;

    displayLinearGradient2?: boolean;
    colors2?: string[];
    stylesLinearGradient2?: any;
    startLinearGradient2?: any;
    endLinearGradient2?: any;

    withIcon?: boolean;
    iconeSrc?: any;
    iconeStyle?: any;


    displayLinearGradient3?: boolean;
    withGradientText?: boolean;
    GradientTextColors?: any[];
    GradientTextStyle?: any;
    GradientTextContent?: string;
    textContent?: string;
    btnTextStyle?: any;

    colors3?: string[];
    stylesLinearGradient3?: any;
}

const AnimatedBtn: React.FC<AnimatedBtnProps> = ({
    onPressIn,
    onPressOut,
    onPressAction,
    btnStyle,

    displayLinearGradient1 = true,
    colors1 = [COLOR_YELLOW, COLOR_BLUE],
    stylesLinearGradient1,
    startLinearGradient1 = { x: 0, y: 0 },
    endLinearGradient1 = { x: 0, y: 0 },

    displayLinearGradient2 = true,
    colors2 = [COLOR_YELLOW, COLOR_BLUE],
    stylesLinearGradient2,
    startLinearGradient2 = { x: 0, y: 0 },
    endLinearGradient2 = { x: 0, y: 0 },

    withIcon = true,
    iconeSrc,
    iconeStyle,

    displayLinearGradient3 = true,
    withGradientText = false,
    GradientTextColors = [COLOR_YELLOW, COLOR_BLUE],
    GradientTextStyle,
    GradientTextContent,
    textContent,
    btnTextStyle,

    colors3 = [COLOR_YELLOW, COLOR_BLUE],
    stylesLinearGradient3,
    ...props
}) => {

    const displayLinearGradient1Item = () => {
        if (displayLinearGradient1) {
            return <LinearGradient
                colors={colors1}
                style={stylesLinearGradient1}
                start={startLinearGradient1}
                end={endLinearGradient1}
            />
        }
    }
    const displayLinearGradient2Item = () => {
        if (displayLinearGradient2) {
            return <LinearGradient
                colors={colors2}
                style={stylesLinearGradient2}
                start={startLinearGradient2}
                end={endLinearGradient1}
            >
                {withIcon && <Image
                    source={iconeSrc}
                    style={iconeStyle}
                    resizeMode="contain"
                />}
                {withGradientText 
                    ? <GradientText
                        colors={GradientTextColors}
                        style={GradientTextStyle}>
                        {GradientTextContent}
                    </GradientText>
                    : <Text style={btnTextStyle}>{textContent}</Text>
                }
            </LinearGradient>
        }
    }
    const displayLinearGradient3Item = () => {
        if (displayLinearGradient3) {
            return <LinearGradient
                colors={colors3}
                style={stylesLinearGradient3} />
        }
    }
    return (
        <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={1}
            onPress={onPressAction}
            style={btnStyle}
        >
            {displayLinearGradient1Item()}
            {displayLinearGradient2Item()}
            {displayLinearGradient3Item()}
        </TouchableOpacity>
    );
};

export default AnimatedBtn;