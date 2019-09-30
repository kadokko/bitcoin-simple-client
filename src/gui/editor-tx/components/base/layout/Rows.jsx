import { withStyles } from '@material-ui/core/styles';
import { DivTable, DivCell } from 'gui/app/components/table-div';
import { borderStyle, borderColor, borderWidth, borderRadius } from 'gui/app/style/Styles';


export const Row = withStyles(() => ({
  root: {
    width: 1000,
  },
}))(DivTable);

export const RowLabel = withStyles(() => ({
  root: {
    width: 70,
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: '#eeeeee',
    borderRadius,
    borderWidth,
    borderColor,
    borderStyle,
  },
}))(DivCell);

export const RowContents = withStyles(() => ({
  root: {
    display: 'table-cell',
  },
}))(DivCell);
