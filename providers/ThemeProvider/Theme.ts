import { extendTheme, v3CompatibleTheme } from "native-base";

const Theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },

  colors: {
    primary: v3CompatibleTheme.colors.emerald,
  },

  components: {
    Button: {
      defaultProps: {
        colorScheme: "emerald",
      },
    },
    ModalHeader: {
      baseStyle: {
        _dark: {
          bg: "gray.700",
          borderColor: "emerald.800",
          color: "warmGray.50",
        },
      },
    },
    ModalBody: {
      baseStyle: {
        _dark: {
          bg: "gray.700",
          color: "coolGray.300",
        },
      },
    },
    ModalFooter: {
      baseStyle: {
        _dark: {
          bg: "gray.600",
          color: "text.50",
        },
      },
    },
    ModalCloseButton: {
      baseStyle: {
        _dark: {
          _icon: {
            color: "coolGray.100",
          },
        },
      },
    },
    ScrollView: {
      baseStyle: {
        _dark: {
          bg: "coolGray.800",
        },
        contentContainerStyle: {
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        },
      },
    },
  },
  fontConfig: {
    Ubuntu: {
      300: {
        normal: "Ubuntu_300Light",
        italic: "Ubuntu_300Light_Italic",
      },
      400: {
        normal: "Ubuntu_400Regular",
        italic: "Ubuntu_400Regular_Italic",
      },
      500: {
        normal: "Ubuntu_500Medium",
        italic: "Ubuntu_500Medium_Italic",
      },
      700: {
        normal: "Ubuntu_700Bold",
        italic: "Ubuntu_700Bold_Italic",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Ubuntu",
    body: "Ubuntu",
    mono: "Ubuntu",
  },
});

export default Theme;
