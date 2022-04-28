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
  },
});

export default Theme;
