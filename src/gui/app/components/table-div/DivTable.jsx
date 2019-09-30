import { withStyles } from '@material-ui/core/styles';
import { Div } from 'gui/app/components/base';


export const DivTable = withStyles(() => ({
  root: {
    display: 'table',
  },
}))(Div);
