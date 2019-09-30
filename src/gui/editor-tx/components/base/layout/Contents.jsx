import { withStyles } from '@material-ui/core/styles';
import { DivTable, DivCell } from 'gui/app/components/table-div';
import { borderStyle, borderColor, borderWidth, borderRadius } from 'gui/app/style/Styles';
import { paddingBase } from './styles';


export const Content = withStyles(() => ({
  root: {
    borderColor,
    borderWidth,
  },
}))(DivTable);

export const ContentIndex = withStyles(() => ({
  root: {
    width: 50,
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: '#f1f1f1',
    padding: paddingBase,
    borderRadius,
    borderWidth,
    borderColor,
    borderStyle,
  },
}))(DivCell);

export const ContentFields = withStyles(() => ({
}))(DivCell);
