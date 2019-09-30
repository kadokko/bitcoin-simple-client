import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconStyle } from 'gui/app/components/label';
import { styles } from 'gui/app/style/Styles';


const ActionIcon = ({ func, icon, classes }) => (
  <span className={ classes.actionIcon }>
    { func == null ? '' : <IconStyle onClick={ () => func() }>{ icon }</IconStyle>}
  </span>
);

export default withStyles(styles)(ActionIcon);
