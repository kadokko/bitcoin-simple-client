import React from 'react';
import { IconStyle } from 'gui/app/components/label';
import { withStyles, styles } from 'gui/app/style';


const ActionIcon = ({ func, icon, classes }) => (
  <span className={ classes.actionIcon }>
    { func == null ? '' : <IconStyle onClick={ () => func() }>{ icon }</IconStyle>}
  </span>
);

export default withStyles(styles)(ActionIcon);
