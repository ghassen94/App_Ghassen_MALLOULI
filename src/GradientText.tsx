import React from 'react';
import { Text, TextProps } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR_BLUE, COLOR_YELLOW } from '../assets/styles';

interface GradientTextProps extends TextProps {
    colors?: string[];
}

const GradientText: React.FC<GradientTextProps> = ({
    children,
    style,
    colors = [COLOR_YELLOW, COLOR_BLUE], 
    ...props
}) => {
    return (
        <MaskedView maskElement={<Text style={style} {...props}>{children}</Text>}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }} 
                style={{ flex: 1 }}
            >
                <Text style={[style, { opacity: 0 }]} {...props}>
                    {children}
                </Text>
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;