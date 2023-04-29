// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff",
    50: "#edefee",
    100: "#e9eceb",
    150: "#E3E7E5",
    200: "#d4d9d6",
    300: "#bec5c2",
    400: "#a9b2ad",
    500: "#939f99",
    600: "#767f7a",
    700: "#585f5c",
    800: "#3b403d",
    900: "#1d201f",
  },
  primary: {
    // eerie black
    100: "#d0d1d1",
    200: "#a0a3a3",
    300: "#717575",
    400: "#414747",
    500: "#121919",
    600: "#0e1414",
    700: "#0b0f0f",
    800: "#070a0a",
    900: "#040505",
  },
  secondary: {
    // malachite
    100: "#cff6e0",
    200: "#9eeec1",
    300: "#6ee5a1",
    400: "#3ddd82",
    500: "#0dd463",
    600: "#0aaa4f",
    700: "#087f3b",
    800: "#055528",
    900: "#032a14",
  },
  accent: {
    // caramel
    100: "#f7e5d8",
    200: "#efccb1",
    300: "#e8b289",
    400: "#e09962",
    500: "#d87f3b",
    600: "#ad662f",
    700: "#824c23",
    800: "#563318",
    900: "#2b190c",
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
              default: tokensDark.grey[50],
              alt: tokensDark.grey[150],
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
