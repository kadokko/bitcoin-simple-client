import { Box as BaseBox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


export const Box = withStyles(() => ({
  root: {
    marginTop: 10,
    marginBottom: 5,
  },
}))(BaseBox);
