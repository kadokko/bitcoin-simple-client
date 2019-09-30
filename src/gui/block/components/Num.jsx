import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { BasicBtn as basicBtn } from 'gui/app/components/button';
import { Input } from 'gui/app/components/field/form';
import { styles } from 'gui/app/style/Styles';


const BasicBtn = withStyles(() => ({
  basicButton: {
    lineHeight: 1.5,
    marginTop: 8,
    marginLeft: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
}))(basicBtn);

const Num = ({ generateBlocks }) => {

  const numRef = useRef(null);

  return (
    <div>
      <Input
        label="block num"
        inputRef={ numRef }
        defaultValue={ 1 }
      />
      <BasicBtn
        label="generate"
        onClick={ () => {
          generateBlocks(numRef.current.value);
        }}
      />
    </div>
  );
};

Num.propTypes = {
  generateBlocks: PropTypes.func.isRequired,
};

export default withStyles(styles)(Num);
