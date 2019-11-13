import { withStyles } from 'gui/app/style';
import { Div } from 'gui/app/components/base';


export const DivCell = withStyles(() => ({
  root: {
    display: 'table-cell',
  },
}))(Div);
