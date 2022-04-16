import React from "react";
import { WebView } from "react-native-webview";
import { View } from "react-native";

export default function ShopsMaps() {
  return (
    <View style={{ width: 400, height: 400 }}>
      <WebView
        style={{ width: "100%", height: "100%" }}
        source={{
          html: `
                    <!DOCTYPE html>
                    <html>
                        <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
                        <body><div style="height:100vh;">
                            <iframe width="100%" height="100%" src="https://www.google.com/maps/d/embed?mid=1Gx28fiAtmIKgeVZo5GkTysyuBf_logAd&ehbc=2E312F" frameborder="0"></iframe>
                        </div></body>
                    </html>
                    `,
        }}
      />
    </View>
  );
}
