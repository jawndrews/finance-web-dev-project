// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  primary: {
    // prussian blue
    100: "#d2d6da",
    200: "#a6aeb5",
    300: "#798590",
    400: "#4d5d6b",
    500: "#203446",
    600: "#1a2a38",
    700: "#131f2a",
    800: "#0d151c",
    900: "#060a0e",
  },
  secondary: {
    // turquoise
    100: "#dbfaf5",
    200: "#b7f4ea",
    300: "#94efe0",
    400: "#70e9d5",
    500: "#4ce4cb",
    600: "#3db6a2",
    700: "#2e897a",
    800: "#1e5b51",
    900: "#0f2e29",
  },
  accent: {
    // indigo, NOT IN USE: FIX CONTRAST
    100: "#e2d6fb",
    200: "#c5adf7",
    300: "#a784f4",
    400: "#8a5bf0",
    500: "#6d32ec",
    600: "#5728bd",
    700: "#411e8e",
    800: "#2c145e",
    900: "#160a2f",
  },
};
// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            accent: {
              ...tokensDark.accent,
              main: tokensDark.accent[500],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            accent: {
              ...tokensDark.accent,
              main: tokensDark.accent[500],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Mulish", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Mulish", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
