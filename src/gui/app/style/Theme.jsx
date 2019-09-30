import { createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8e99f3',
      main: '#5c6bc0',
      dark: '#26418f',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#88ffff',
      main: '#4dd0e1',
      dark: '#009faf',
      contrastText: '#000000',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '0.9rem',
      },
      body2: {
        fontSize: '0.9rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        lineHeight: 1,
      },
    },
    MuiTableCell: {
      root: {
        '&:last-child': {
          paddingRight: 10,
        },
        padding: '4px 12px 4px 12px',
      },
    },
    MuiOutlinedInput: {
      multiline: {
        padding: 0,
      },
      input: {
        boxSizing: 'border-box',
      },
      inputMultiline: {
        padding: '18.5px 14px',
      },
      root: {
        '&$error': {
          '& $notchedOutline': {
            borderColor: '#ffade1',
            borderWidth: 1,
          },
          '&$focused $notchedOutline': {
            borderColor: '#f7a4d9',
            borderWidth: 2,
          },
        },
      },
    },
    MuiTableRow: {
      root: {
        height: 'auto',
      },
      head: {
        height: 40,
      },
    },
    MuiButton: {
      root: {
        padding: 2,
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: 20,
      },
    },
    MuiMenuItem: {
      root: {
        height: 8,
        minHeight: 30,
      },
    },
    MuiTab: {
      labelIcon: {
        paddingTop: 0,
        minHeight: 50,
      },
    },
    MuiPrivateTextarea: {
      root: {
        width: '99.3%',
      },
    },
    MuiFormHelperText: {
      contained: {
        marginTop: 4,
        marginBottom: 4,
      },
      root: {
        '&$error': {
          color: '#fd00a0',
        },
      },
    },
    MuiDialogContent: {
      root: {
        paddingTop: 2,
      },
    },
    MuiDialogTitle: {
      root: {
        paddingBottom: 8,
      },
    },
    PrivateSwitchBase: {
      root: {
        paddingTop: 5,
        paddingBottom: 5,
      },
    },
  },
});
