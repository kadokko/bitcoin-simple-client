import { withStyles } from '@material-ui/core/styles';
import { DivTable, DivCell } from 'gui/app/components/table-div';
import { borderStyle, borderColor, borderWidth, borderRadius } from 'gui/app/style/Styles';
import { paddingBase } from './styles';


export const Form = withStyles(() => ({
}))(DivTable);

export const FormLabel = withStyles(() => ({
  root: {
    width: 120,
    textAlign: 'left',
    verticalAlign: 'middle',
    backgroundColor: '#f5f5f5',
    padding: paddingBase,
    borderRadius,
    borderWidth,
    borderColor,
    borderStyle,
    borderRightWidth: 3,
  },
}))(DivCell);

export const FormInput = withStyles(() => ({
  root: {
    width: 600,
  },
}))(DivCell);
