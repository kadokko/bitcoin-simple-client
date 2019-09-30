import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableHead, TableBody, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Div, Span } from 'gui/app/components/base';
import { BasicBtn, SquareIconBtn as squareIconBtn } from 'gui/app/components/button';
import { ModalDialog } from 'gui/app/components/dialog';
import { Input, CheckboxGroup, Checkbox } from 'gui/app/components/field/form';
import { Search } from 'gui/app/components/icon';
import { Col, ColGroup, HeaderCell, StrCell, NumCell } from 'gui/app/components/table';
import { ErrorMessage } from 'gui/app/components/message';
import { ScriptType } from 'lib/constant';
import { ViewHelper } from 'lib/view/ViewHelper';
import ScriptAnalizer from 'lib/util/ScriptAnalizer';


const SquareIconBtn = withStyles(() => ({
  squareButton: {
    maxWidth: 30,
    maxHeight: 30,
    minWidth: 30,
    minHeight: 30,
    marginRight: 10,
  },
}))(squareIconBtn);

const CondAmount = withStyles(() => ({
  input: {
    width: 120,
  },
  inputBase: {
    height: 32,
    width: 110,
    textAlign: 'right',
  },
}))(Input);

const Symbol = withStyles(() => ({
  root: {
    textAlign: 'center',
    width: 30,
  },
}))(Div);

const CondArea = withStyles(() => ({
  root: {
    display: 'table',
  },
}))(Span);

const CondItem = withStyles(() => ({
  root: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
}))(Div);

const Margin = withStyles(() => ({
  root: {
    height: 20,
  },
}))(Div);

const refValue = ref => (ref.current != null ? ref.current.value : '');

export const SearchUtxoDialog = ({
  states: {
    idx,
    isUtxoModalOpen,
  },
  utxoStates: {
    utxos,
    error,
  },
  actions: {
    searchUtxos,
    setSelectedUtxo,
    closeUtxoModal,
  },
  classes,
}) => {

  const amountMinRef = useRef(null);
  const amountMaxRef = useRef(null);
  const [ scriptTypes, setScriptTypes ] = useState([ '' ]);

  const handleChange = (e) => {
    const checked = e.target.value;
    if (scriptTypes.indexOf(checked) > -1) {
      setScriptTypes(scriptTypes.filter((s) => s !== checked));
    } else {
      setScriptTypes([ ...scriptTypes, checked ]);
    }
  };

  return (
    <div>
      { isUtxoModalOpen && (
        <ModalDialog
          title="Search UTXO"
          isDialogOpen={ isUtxoModalOpen }
          closeDialog={ closeUtxoModal }
        >
          <CondArea>
            <CondItem>
              <CheckboxGroup>
                { ScriptType.entries()
                  .filter(entry => entry[1] !== 'nulldata')
                  .map((entry) => (
                    <Checkbox
                      key={ entry[0] }
                      label={ entry[0] }
                      checked={ scriptTypes.indexOf(entry[0]) > -1 }
                      onChange={ e => handleChange(e) }
                    />
                  ))}
              </CheckboxGroup>
            </CondItem>
          </CondArea>
          <CondArea>
            <CondItem>
              <CondAmount
                label="btc: min"
                maxLength={ 10 }
                inputRef={ amountMinRef }
              />
            </CondItem>
            <CondItem>
              <Symbol>～</Symbol>
            </CondItem>
            <CondItem>
              <CondAmount
                label="btc: max"
                maxLength={ 10 }
                inputRef={ amountMaxRef }
              />
            </CondItem>
            <CondItem>
              <SquareIconBtn
                label="search"
                onClick={ () => {
                  searchUtxos(refValue(amountMinRef), refValue(amountMaxRef), scriptTypes);
                }}
              >
                <Search />
              </SquareIconBtn>
            </CondItem>
          </CondArea>

          <Margin />

          <Paper className={ classes.utxoDialogPaper }>
            <Table className={ classes.utxoDialogTable }>
              <ColGroup>
                <Col width="70px" />
                <Col width="70px" />
                <Col width="80px" />
                <Col width="80px" />
                <Col width="80px" />
                <Col width="40px" />
              </ColGroup>
              <TableHead>
                { utxos && utxos.length !== 0 && (
                  <TableRow>
                    <HeaderCell />
                    <HeaderCell>ScriptType</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
                    <HeaderCell>Confirmations</HeaderCell>
                    <HeaderCell>Txid</HeaderCell>
                    <HeaderCell>Vout</HeaderCell>
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                { utxos && utxos.map(utxo => (
                  <TableRow key={ utxo.txid + utxo.vout }>
                    <StrCell>
                      <BasicBtn
                        label="set"
                        onClick={ () => {
                          setSelectedUtxo(idx, utxo);
                        }}
                      />
                    </StrCell>
                    <StrCell>{ ScriptAnalizer.type(utxo.scriptPubKey) }</StrCell>
                    <NumCell>{ utxo.amount }</NumCell>
                    <NumCell>{ utxo.confirmations }</NumCell>
                    <StrCell>{ ViewHelper.shorten(utxo.txid) }</StrCell>
                    <NumCell>{ utxo.vout }</NumCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <ErrorMessage>
            { error && error.message }
          </ErrorMessage>
        </ModalDialog>
      )}
    </div>
  );
};

SearchUtxoDialog.propTypes = {
  states: PropTypes.PropTypes.shape({
    idx: PropTypes.number,
    isUtxoModalOpen: PropTypes.bool,
  }),
  utxoStates: PropTypes.PropTypes.shape({
    utxos: PropTypes.array,
  }),
};
