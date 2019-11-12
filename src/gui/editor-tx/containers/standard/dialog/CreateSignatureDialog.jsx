import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'gui/app/style/Styles';
import { SquareIconBtn } from 'gui/app/components/button';
import { DivContainer } from 'gui/app/components/container';
import { ModalDialog } from 'gui/app/components/dialog';
import { InputField, TextAreaField } from 'gui/app/components/field/redux-form';
import { CopyIcon, PlayIcon } from 'gui/app/components/icon';
import { Box } from 'gui/app/components/layout';
import { connected } from 'gui/editor-tx/containers/base';
import * as actionDefs from 'gui/editor-tx/actions/standard';
import { ViewHelper as Helper } from 'lib/view/ViewHelper';
import Hash from 'lib/util/Hash';
import Validator from 'lib/util/Validator';


const Input = withStyles(() => ({
  inputFieldBase: {
    height: '40px',
  },
}))(InputField);

const TextArea = withStyles(() => ({
  textAreaFieldBase: {
    height: '75px !important',
    paddingTop: 11,
  },
}))(TextAreaField);


const CreateSignatureDialog = ({
  states: {
    idx,
    isSignatureModalOpen,
  },
  formStates: {
    values: tx,
  },
  sigStates: {
    values,
  },
  actions: {
    dumpPrvkey,
    createSignature,
    closeSignatureModal,
  },
  classes,
}) => {
  const signatureRef = useRef(null);
  return (
    <div className={ classes.root }>
      <form>
        { isSignatureModalOpen && (
          <ModalDialog
            title="Create a Signature"
            isDialogOpen={ isSignatureModalOpen }
            closeDialog={ closeSignatureModal }
          >
            <DivContainer>
              <Box>
                <Field
                  component={ Input }
                  label="public key (for finding private key)"
                  name="condPubkey"
                />
                <SquareIconBtn
                  label="get private key from wallet"
                  onClick={ () => dumpPrvkey(Hash.hash160(values.condPubkey.trim())) }
                  disabled={ Validator.isEmpty(values.condPubkey) }
                  // TODO fix validation : type, length
                >
                  <PlayIcon />
                </SquareIconBtn>
              </Box>
            </DivContainer>
            <DivContainer>
              <Box>
                <Field
                  component={ Input }
                  label="public key hash160 (for finding private key)"
                  name="condPubkeyHash"
                />
                <SquareIconBtn
                  label="get private key from wallet"
                  onClick={ () => dumpPrvkey(values.condPubkeyHash.trim()) }
                  disabled={ Validator.isEmpty(values.condPubkeyHash) }
                >
                  <PlayIcon />
                </SquareIconBtn>
              </Box>
            </DivContainer>
            <DivContainer>
              <Box>
                <Field
                  component={ Input }
                  label="private key *"
                  name="prvkey"
                />
                <SquareIconBtn
                  label="create signature"
                  onClick={ () => createSignature(tx, idx, values.prvkey) }
                  disabled={ Validator.isEmpty(values.prvkey) }
                >
                  <PlayIcon />
                </SquareIconBtn>
              </Box>
            </DivContainer>
            <DivContainer>
              <Box>
                <Field
                  component={ TextArea }
                  label="signature"
                  name="signature"
                  readOnly
                  props={{
                    inputRef: signatureRef,
                  }}
                />
                <SquareIconBtn
                  label="copy to clipboard"
                  onClick={ () => Helper.copyToClipboard(signatureRef) }
                >
                  <CopyIcon />
                </SquareIconBtn>
              </Box>
            </DivContainer>
          </ModalDialog>
        )}
      </form>
    </div>
  );
};

CreateSignatureDialog.propTypes = {
  states: PropTypes.PropTypes.shape({
    idx: PropTypes.number,
    isSignatureModalOpen: PropTypes.bool,
  }),
};

const Connected = connected(
  CreateSignatureDialog, 'standard', actionDefs,
);

export default reduxForm({
  form: 'standardSigForm',
  destroyOnUnmount: true,
  initialValues: {},
  // validate,
})(withStyles(styles)(Connected));
