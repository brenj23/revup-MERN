// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F5F5F5",
    50: "#EEEEEE",
    100: "#E0E0E0",
    200: "#BDBDBD",
    300: "#9E9E9E",
    400: "#757575",
    500: "#616161",
    600: "#424242",
    700: "#303030",
    800: "#212121",
    900: "#121212",
    1000: "#000000",
  },
  primary: {
    50: "#EBF1F5",
    100: "#D0DBE6",
    200: "#A2B6CC",
    300: "#7591B3",
    400: "#4A6B99",
    500: "#1F467F", // Darker blue
    600: "#193A66",
    700: "#132C4D",
    800: "#0C1E33",
    900: "#06101A",
  },
  secondary: {
    50: "#F2E9E1",
    100: "#E6D2C3",
    200: "#CCAB87",
    300: "#B3854A",
    400: "#995F0D",
    500: "#804A00", // Rich brown
    600: "#663A00",
    700: "#4D2B00",
    800: "#331B00",
    900: "#1A0C00",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[700],
            },
            secondary: {
              dark: colorTokens.secondary[200],
              main: colorTokens.secondary[500],
              light: colorTokens.secondary[700],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[100],
            },
            secondary: {
              dark: colorTokens.secondary[700],
              main: colorTokens.secondary[500],
              light: colorTokens.secondary[100],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
