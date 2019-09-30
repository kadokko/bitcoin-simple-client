export const baseInputWidth = 600;
export const readOnlyBackgroundColor = '#fafafa';
export const readOnlyTextColor = 'rgb(0, 0, 0, 0.38)';
export const padding = '12px 6px 6px 10px';
export const borderRadius = 5;

export const borderStyle = 'solid';
export const borderColor = 'white';
export const borderWidth = 1;

export const styles = theme => ({

  // ============================
  // application
  // ============================
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  appBar: {
    flexGrow: 1,
    marginBottom: '1.5em',
    backgroundColor: theme.palette.background.paper,
  },

  // ============================
  // tab
  // ============================
  tabContainer: {
    paddingTop: 18,
    paddingLeft: 12,
  },

  // ============================
  // table
  // ============================
  table: {
    padding: theme.spacing(1/5),
  },
  headerCell: {
    textAlign: 'center',
  },

  // ============================
  // field
  // ============================
  input: {
    marginTop: theme.spacing(1),
    width: baseInputWidth,
    fontSize: '10em',
  },
  inputBase: {
    padding,
    height: 40,
  },
  inputReadOnly: {
    backgroundColor: readOnlyBackgroundColor,
  },
  textArea: {
    marginTop: theme.spacing(1),
    width: baseInputWidth,
    height: 90,
    fontSize: '10em',
  },
  textAreaBase: {
    padding,
    height: '90px !important',
  },
  textAreaReadOnly: {
    margin: '1px 2px 2px 2px',
    borderRadius,
    backgroundColor: readOnlyBackgroundColor,
  },

  // ============================
  // field (redux-form)
  // ============================
  inputField: {
    width: baseInputWidth,
    fontSize: '10em',
  },
  inputFieldBase: {
    padding: '5px 6px 5px 10px',
    margin: 1,
    height: 27,
  },
  inputFieldReadOnly: {
    backgroundColor: readOnlyBackgroundColor,
    color: readOnlyTextColor,
    borderRadius,
    margin: 1,
  },
  inputFieldError: {
    width: baseInputWidth,
    fontSize: '10em',
  },
  textAreaFieldBase: {
    padding: '5px 6px 5px 10px',
    margin: 1,
    height: '62px !important',
  },
  markField: {
    padding: '3px 4px 3px 4px',
    borderRadius,
    backgroundColor: '#b2cbe4',
    marginTop: 5,
    width: 70,
    textAlign: 'center',
    color: '#808080',
  },

  // ============================
  // button
  // ============================
  fab: {
    margin: theme.spacing(1/5),
  },
  basicButton: {
  },
  squareButton: {
    marginTop: theme.spacing(1),
    marginLeft: 5,
    maxWidth: 24,
    maxHeight: 24,
    minWidth: 24,
    minHeight: 24,
  },

  // ============================
  // tips
  // ============================
  msgTip: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1/2),
    paddingTop: theme.spacing(1/2),
    paddingBottom: theme.spacing(1/2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius,
    backgroundColor: '#000000',
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 10,
    transform: 'scale(0.9)',
  },

  // ============================
  // icon
  // ============================
  actionIcon: {
    position: 'relative',
    top: 5,
    left: 4,
  },

  // ============================
  // modal
  // ============================
  utxoDialogPaper: {
    width: 520,
  },
  templatePaper: {
    padding: theme.spacing(1/5),
    width: 720,
    boxShadow: 'none',
  },
  signatureDialogPaper: {
    padding: theme.spacing(1/5),
    width: 640,
    boxShadow: 'none',
  },
  utxoDialogTable: {
    padding: theme.spacing(1/5),
    width: 500,
  },
  templateTable: {
    padding: theme.spacing(1/5),
    width: 690,
  },

  // ============================
  // editor with value assist
  // ============================
  assist: {
    zIndex: 2,
    position: 'absolute',
  },
  messageError: {
    backgroundColor: '#ffe0ef',
    color: '#fd00a0',
    borderRadius,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
  },
  messageInfo: {
    backgroundColor: '#d6eaff',
    color: '#5c6bc0',
    borderRadius,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
  },

  // ============================
  // block
  // ============================
  blockIdsTable: {
    padding: theme.spacing(1/5),
    width: 580,
  },
  blockIdsPaper: {
    width: 600,
  },
});
