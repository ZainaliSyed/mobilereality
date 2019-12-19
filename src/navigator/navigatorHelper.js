//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { Images, Metrics, AppStyles, Colors, Fonts } from "../theme";
import { Image, TouchableOpacity } from "react-native";

const headerColor = {
    headerStyle: {
        backgroundColor: Colors.secondary.azure,
        borderBottomWidth: 0
    }
};
const removeBorder = {
    headerStyle: {
        borderBottomWidth: 0
    }
};
const headerTransparent = {
    headerTransparent: true
};
const backImage = (tintColor = Colors.secondary.azure) => {
    return {
        headerBackTitle: null,
        headerBackImage: (
            <Image
                source={Images.icBack}
                style={{
                    marginLeft: Metrics.baseMargin,
                    tintColor: tintColor
                }}
            />
        )
    };
};
const title = title => ({
    title,
    headerTitleStyle: {
        color: Colors.secondary.azure,
        ...Fonts.font(
            Fonts.FontFamily.default,
            Fonts.Type.SemiBold,
            Fonts.Size.medium
        )
    }
});
const defaultNavOptions = navOptions => {
    return {
        defaultNavigationOptions: ({ navigation }) => navOptions
    };
};
const navOptions = navOptions => {
    return {
        navigationOptions: ({ navigation }) => navOptions
    };
};
const navButton = (image, navOptions) => {
    return {
        navigationOptions: ({ navigation }) => {
            console.log("navigation-navButton", navigation);
            return {
                headerRight: (
                    <TouchableOpacity
                        onPress={navigation.getParam("onPress", () =>
                            console.log("onPress not found")
                        )}
                    >
                        <Image
                            source={image}
                            style={{ marginRight: Metrics.baseMargin }}
                        />
                    </TouchableOpacity>
                ),
                ...navOptions
            };
        }
    };
};
const dyanimcTitle = (navOptions = {}) => {
    return {
        navigationOptions: ({ navigation }) => {
            console.log("navigation-navButton", navigation);
            return {
                title: navigation.getParam("title", ""),
                ...navOptions
            };
        }
    };
};
export {
    headerColor,
    removeBorder,
    headerTransparent,
    backImage,
    title,
    defaultNavOptions,
    navOptions,
    navButton,
    dyanimcTitle
};
