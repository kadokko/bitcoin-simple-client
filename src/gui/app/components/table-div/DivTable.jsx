import { withStyles } from 'gui/app/style';
import { Div } from 'gui/app/components/base';


export const DivTable = withStyles(() => ({
  root: {
    display: 'table',
  },
}))(Div);
