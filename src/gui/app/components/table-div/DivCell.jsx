import { withStyles } from '@material-ui/core/styles';
import { Div } from 'gui/app/components/base';


export const DivCell = withStyles(() => ({
  root: {
    display: 'table-cell',
  },
}))(Div);
