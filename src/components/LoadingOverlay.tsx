import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";

interface LoadingOverlayProps {
  visible: boolean;
}

const LoadingOverlay = ({ visible }: LoadingOverlayProps) => {
  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 100,
        elevation: 100
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default React.memo(LoadingOverlay);

// import React from "React";
// import { View, ActivityIndicator, StyleSheet } from "react-native";
// import { deviceHeight, deviceWidth } from "../../utils/constants";

// const LoadingOverlay = ({ visible }) => {
//   if (!visible) {
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.backdrop} />
//       <ActivityIndicator size={"large"} color="white" />
//     </View>
//   );
// };

// export default LoadingOverlay;

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     height: deviceHeight,
//     width: deviceWidth,
//     justifyContent: "center",
//     alignItems: "center",
//     // backgroundColor: "rgba(0,0,0,0.4)",
//     zIndex: 100
//   },
//   backdrop: {
//     backgroundColor: "rgba(0,0,0,0.4)",
//     height: "100%",
//     width: "100%",
//     position: "absolute"
//   }
// });
