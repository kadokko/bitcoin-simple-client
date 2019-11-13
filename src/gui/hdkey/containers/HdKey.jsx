import React, { useRef } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connectf } from 'gui/app/containers/redux';
import { withStyles, styles } from 'gui/app/style';
import { InputField, TextAreaField } from 'gui/app/components/field/redux-form';
import { BasicBtn as basicBtn, SquareIconBtn as squareIconBtn } from 'gui/app/components/button';
import { Title } from 'gui/app/components/label';
import { Box } from 'gui/app/components/layout';
import { CopyIcon, NewIcon } from 'gui/app/components/icon';
import { ViewHelper as Helper } from 'lib/view/ViewHelper';
import Validator from 'lib/util/Validator';
import { initialValues } from './InitialValues';
import * as actionDefs from '../actions/hdkey';


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

const BasicBtn = withStyles(() => ({
  basicButton: {
    lineHeight: 1.5,
    marginTop: 1,
    marginLeft: 5,
  },
}))(basicBtn);

const SquareIconBtn = withStyles(() => ({
  squareButton: {
    marginTop: 0,
  },
}))(squareIconBtn);

const LowTextArea = withStyles(() => ({
  textAreaFieldBase: {
    height: '55px !important',
  },
}))(TextArea);


const HdKey = ({
  forms: {
    values,
    // syncErrors,
  },
  actions: {
    generateHdSeed, getHdMasterKeysFromSeed,
    getHdMasterKeysFromMnemonic, getHdMasterPubkey,
    getHdKeys, getHdPubkey, createP2pkhAddr, createP2wpkhAddr,
  },
}) => {
  const mnemonicRef = useRef(null);
  return (
    <div>
      <form>
        <Box>
          <Title>
            Wallet Seed
          </Title>
        </Box>

        <Box>
          <Field
            component={ Input }
            label="seed"
            name="seed"
          />
          <BasicBtn
            label="import"
            onClick={ () => getHdMasterKeysFromSeed(values.seed) }
          />
          <SquareIconBtn
            label="generate seed"
            onClick={ generateHdSeed }
          >
            <NewIcon />
          </SquareIconBtn>
        </Box>

        <Box>
          <Field
            component={ TextArea }
            label="mnemonic"
            name="mnemonic"
            props={{
              rows: 2,
              rowsMax: 2,
              inputRef: mnemonicRef,
            }}
          />
          <BasicBtn
            label="import"
            onClick={ () => getHdMasterKeysFromMnemonic(values.mnemonic) }
          />
          <SquareIconBtn
            label="copy to clipboard"
            onClick={ () => Helper.copyToClipboard(mnemonicRef) }
          >
            <CopyIcon />
          </SquareIconBtn>
        </Box>

        <Box>
          <Title>
            Extended Key
          </Title>
        </Box>

        <Box>
          <Field
            component={ LowTextArea }
            label="master/root private key"
            name="masterPrvkey"
            props={{
              rows: 2,
              rowsMax: 2,
            }}
            onBlur={ () => getHdMasterPubkey(values.masterPrvkey) }
          />
        </Box>

        <Box>
          <Field
            component={ LowTextArea }
            label="master/root public key"
            name="masterPubkey"
            props={{
              rows: 2,
              rowsMax: 2,
            }}
          />
        </Box>

        <Box>
          <Field
            component={ Input }
            label="hd path"
            name="hdpath"
            placeholder="m/1'/2"
          />
        </Box>

        <Box>
          <Field
            component={ LowTextArea }
            label="extended private key"
            name="hdprv"
            props={{
              readOnly: true,
              rows: 2,
              rowsMax: 2,
            }}
          />
          <BasicBtn
            label="create"
            onClick={ () => getHdKeys(values.masterPrvkey, values.masterPubkey, values.hdpath) }
            disabled={ Validator.isEmpty(values.masterPrvkey) }
          />
        </Box>

        <Box>
          <Field
            component={ LowTextArea }
            label="extended public key"
            name="hdpub"
            props={{
              readOnly: true,
              rows: 2,
              rowsMax: 2,
            }}
          />
          <BasicBtn
            label="create"
            onClick={ () => getHdPubkey(values.masterPubkey, values.hdpath) }
            disabled={ Validator.isEmpty(values.masterPubkey) }
          />
        </Box>

        <Box>
          <Title>
            Address
          </Title>
        </Box>

        <Box>
          <Field
            component={ Input }
            label="p2pkh address"
            name="p2pkhAddr"
            readOnly
          />
          <BasicBtn
            label="create"
            onClick={ () => {
              createP2pkhAddr(values.hdpub);
              createP2wpkhAddr(values.hdpub);
            }}
            disabled={ Validator.isEmpty(values.hdpub) }
          />
        </Box>

        <Box>
          <Field
            component={ Input }
            label="p2wpkh address"
            name="p2wpkhAddr"
            readOnly
          />
        </Box>
      </form>
    </div>
  );
};

const Connected = connectf(
  'hdkeyForm', actionDefs,
)(HdKey);

export default reduxForm({
  form: 'hdkeyForm',
  destroyOnUnmount: false,
  initialValues,
  // validate,
})(withStyles(styles)(Connected));
