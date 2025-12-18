import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Home = ({ navigation }: any) => {

    return (
        <SafeAreaProvider>
            <Text>Home</Text>
        </SafeAreaProvider>
    );
};

export default Home;