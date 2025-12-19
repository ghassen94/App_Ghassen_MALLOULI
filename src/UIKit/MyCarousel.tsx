import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";


// const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

const data = [
  { title: 'Slide 1', image: 'https://picsum.photos/1440/2842?random=1' },
  { title: 'Slide 2', image: 'https://picsum.photos/1440/2842?random=2' },
  { title: 'Slide 3', image: 'https://picsum.photos/1440/2842?random=3' },
  // Add more...
];

function MyCarousel() {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue(0);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                ref={ref}
                // style={{ width, height: width / 2 }}
                width={width}
                height={width / 2} // Adjust height as needed
                data={data}
                onProgressChange={progress}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
                    </View>
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                containerStyle={{ gap: 5, marginTop: 10 }}
                onPress={onPressPagination}
            />
        </View>
);
}

export default MyCarousel;