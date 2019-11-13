import React, { useState } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { withStyles, styles } from 'gui/app/style';
import { OpCode } from 'lib/constant';
import { WithAssistField } from 'gui/app/components/field/redux-form';


const ScriptEditor = ({ classes, ...props }) => {

  const { input: { onChange: updateScript } } = props;
  const [ inputText, setInputText ] = useState('');
  const [ searchKey, setSearchKey ] = useState('');
  const [ searchKeyIdx, setSearchKeyIdx ] = useState('');
  const [ candidates, setCandidates ] = useState(OpCode.keys());
  const [ isOpen, setOpen ] = useState(false);

  const lastIndexOf = (text, to) => {
    const wsIndex = text.lastIndexOf(' ', to - 1);
    const lfIndex = text.lastIndexOf('\n', to - 1);
    const index = wsIndex > lfIndex ? wsIndex : lfIndex;
    return index > -1 ? index + 1 : 0;
  };

  const suggestOpCode = (e) => {
    const text = e.target.value;
    const to = e.target.selectionStart;
    const from = lastIndexOf(text, to);
    const keyword = text.slice(from, to);
    const ndata = e.nativeEvent.data;

    if (ndata != null && keyword.length > 3 && keyword.startsWith('OP_')) {
      setCandidates(OpCode.keys().filter(opCode => opCode.startsWith(keyword)));
      setSearchKey(keyword);
      setSearchKeyIdx(to);
      setOpen(true);
    }
    setInputText(text);
    updateScript(text);
  };

  const selectOpCode = (e) => {
    const text = ''
    + inputText.substring(0, searchKeyIdx - searchKey.length)
    + e.target.value
    + inputText.substring(searchKeyIdx, inputText.length);
    setInputText(text);
    setCandidates([]);
    setOpen(false);
    updateScript(text);
  };

  const closeOpCodes = () => {
    setCandidates([]);
    setOpen(false);
  };

  return (
    <span>
      { isOpen && (
        <FormControl
          className={ classes.assist }
        >
          <Select
            onChange={ e => selectOpCode(e) }
            onClose={ () => closeOpCodes() }
            open={ isOpen }
            value=""
          >
            {
              candidates.length > 0 && candidates.map(key => (
                <MenuItem
                  key={key}
                  value={ key }
                >
                  { key }
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      )}
      <WithAssistField
        {...props}
        multiline
        rows={ 3 }
        rowsMax={ 3 }
        onChange={ (e) => suggestOpCode(e) }
      />
    </span>
  );
};

export default withStyles(styles)(ScriptEditor);
