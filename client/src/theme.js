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
    400: "#313131",
    450: "#292929",
    500: "#121212",
    600: "#0e0e0e",
    700: "#0b0b0b",
    800: "#070707",
    900: "#040404",
  },
  secondary: {
    // robin egg blue
    100: "#d5f4f3",
    200: "#ace8e6",
    300: "#82ddda",
    400: "#59d1cd",
    500: "#2fc6c1",
    600: "#269e9a",
    700: "#1c7774",
    800: "#134f4d",
    900: "#092827",
  },
  accent: {
    // bondi blue
    100: "#d4e8ef",
    200: "#a9d1e0",
    300: "#7ebbd0",
    400: "#53a4c1",
    500: "#288db1",
    600: "#20718e",
    700: "#18556a",
    800: "#103847",
    900: "#081c23",
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
              default: tokensDark.primary[450],
              alt: tokensDark.primary[400],
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
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            "&.Mui-checked": {
              color: "white", // changes the thumb color
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#2FC6C1",
            },
          },
        },
      },
    },
  };
};
