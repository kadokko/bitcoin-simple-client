import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableHead, TableBody, TableRow } from '@material-ui/core';
import { BasicBtn } from 'gui/app/components/button';
import { ModalDialog } from 'gui/app/components/dialog';
import { Col, ColGroup, StrCell } from 'gui/app/components/table';


export const SearchTemplateDialog = ({
  states: {
    idx,
    isTemplateModalOpen,
  },
  actions: {
    setSelectedTemplate,
    closeTemplateModal,
  },
  classes,
}) => {

  const templates = {
    P2PKH: 'OP_DUP OP_HASH160 <hash160(pubkey)> OP_EQUALVERIFY OP_CHECKSIG',
    P2SH: 'OP_HASH160 <hash160(redeem script)> OP_EQUAL',
    P2PK: '<PubKey> OP_CHECKSIG',
    NullData: 'OP_RETURN <data>',
    Multisig: '<m> <A pubkey> <B pubkey> <..> <n> OP_CHECKMULTISIG',
    P2WPKH: 'OP_0 <hash160(pubkey)>',
    P2WSH: 'OP_0 <sha256(redeem script)>',
  };

  return (
    <div>
      { isTemplateModalOpen && (
        <ModalDialog
          title="Search a ScriptPubKey Template"
          isDialogOpen={ isTemplateModalOpen }
          closeDialog={ closeTemplateModal }
        >
          <Paper className={ classes.templatePaper }>
            <Table className={ classes.templateTable }>
              <ColGroup>
                <Col width="60px" />
                <Col width="70px" />
                <Col width="490px" />
              </ColGroup>
              <TableHead>
                <TableRow>
                  <StrCell />
                  <StrCell>type</StrCell>
                  <StrCell>script template</StrCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { Object.entries(templates).map(([ type, template ]) => (
                  <TableRow key={ type }>
                    <StrCell>
                      <BasicBtn
                        label="set"
                        onClick={ () => {
                          setSelectedTemplate(idx, template);
                        }}
                      />
                    </StrCell>
                    <StrCell>
                      { type }
                    </StrCell>
                    <StrCell>
                      { template }
                    </StrCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </ModalDialog>
      )}
    </div>
  );
};

SearchTemplateDialog.propTypes = {
  states: PropTypes.PropTypes.shape({
    idx: PropTypes.number,
    isTemplateModalOpen: PropTypes.bool,
  }),
};
