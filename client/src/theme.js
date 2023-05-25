// color design tokens export
export const tokensDark = {
  grey: {
    0: "#FFFFFF",
    50: "#f2f2f2",
    100: "#EBEBEB",
    150: "#E0E0E0",
    200: "#d2d2d2",
    300: "#bcbcbc",
    400: "#a5a5a5",
    500: "#8f8f8f",
    600: "#727272",
    700: "#565656",
    800: "#393939",
    900: "#1d1d1d",
  },
  primary: {
    // black
    100: "#d0d0d0",
    200: "#a0a0a0",
    300: "#717171",
    400: "#414141",
    500: "#121212",
    600: "#0e0e0e",
    700: "#0b0b0b",
    800: "#070707",
    900: "#040404",
  },
  secondary: {
    // green
    100: "#e4f5da",
    200: "#caebb5",
    300: "#afe290",
    400: "#95d86b",
    500: "#7ace46",
    600: "#62a538",
    700: "#497c2a",
    800: "#31521c",
    900: "#18290e",
  },
  accent: {
    // brunswick green
    100: "#cdddda",
    200: "#9bbcb5",
    300: "#699a91",
    400: "#37796c",
    500: "#055747",
    600: "#044639",
    700: "#03342b",
    800: "#02231c",
    900: "#01110e",
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
              alt: tokensDark.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
