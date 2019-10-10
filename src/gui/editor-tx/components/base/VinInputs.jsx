import React from 'react';
import { FieldArray } from 'redux-form';
import { SquareIconBtnMini as IconBtn } from 'gui/app/components/button';
import { AddBox, RemoveBox, Search, Create } from 'gui/app/components/icon';
import * as validator from 'gui/editor-tx/validator/validator';
import Validator from 'lib/util/Validator';
import { RowLabel, RowContents } from './layout/Rows';
import { Content, ContentIndex, ContentFields } from './layout/Contents';
import { TextInputField, TextAreaField, CurrencyInputField } from './field/InputFields';


export const initialVin = {
  txid: '',
  vout: 0,
  amount: 0,
  amountBtc: '0 BTC',
  scriptPubKey: '',
  scriptSig: '',
  scriptType: '',
  sequence: 4294967295,
};

const loadUtxoDetail = (index, values, getUtxoDetail) => {
  const vin = values.vins[index];
  if (!Validator.isEmpty(vin.txid) && !Validator.isEmpty(vin.vout) && vin.txid.length === 64) {
    getUtxoDetail(index, vin.txid, vin.vout);
  }
};

const renderVinInputs = ({ fields, values, openUtxoModal, openSignatureModal, getUtxoDetail }) => (
  <div>
    <RowLabel>
      <div>vin</div>
      <div>
        <IconBtn onClick={ () => fields.push(initialVin) }>
          <AddBox />
        </IconBtn>
        <IconBtn onClick={ () => fields.length > 1 && fields.remove(fields.length - 1) }>
          <RemoveBox />
        </IconBtn>
      </div>
    </RowLabel>
    <RowContents>
      { fields.map((vin, index) => (
        <Content key={ `${vin}.txid ${vin}.vout` }>
          <ContentIndex>
            <div>
              { index }
            </div>
            <div>
              <IconBtn
                label="search utxo"
                onClick={ () => openUtxoModal(index) }
              >
                <Search />
              </IconBtn>
            </div>
          </ContentIndex>
          <ContentFields>
            <TextInputField
              label="txid"
              name={`${vin}.txid`}
              validator={[ validator.isTxid ]}
              onBlur={ () => loadUtxoDetail(index, values, getUtxoDetail) }
            />
            <TextInputField
              label="vout"
              name={`${vin}.vout`}
              onBlur={ () => loadUtxoDetail(index, values, getUtxoDetail) }
            />
            <CurrencyInputField
              label="amount"
              name={`${vin}.amount`}
              readonly
            />
            <TextAreaField
              label="scriptPubKey"
              name={`${vin}.scriptPubKeyAsm`}
              readonly
              mark={`${vin}.scriptType`}
            />
            <TextAreaField
              label="scriptSig"
              name={`${vin}.scriptSig`}
              func={ () => openSignatureModal(index) }
              icon={(
                <IconBtn label="create signature">
                  <Create />
                </IconBtn>
              )}
              validator={[ validator.isScript ]}
            />
            <TextInputField
              label="sequence"
              name={`${vin}.sequence`}
              type="number"
            />
          </ContentFields>
        </Content>
      ))}
    </RowContents>
  </div>
);

export const VinInputs = ({ values, openUtxoModal, openSignatureModal, getUtxoDetail }) => (
  <FieldArray
    name="vins"
    component={ renderVinInputs }
    props={{
      values,
      openUtxoModal,
      openSignatureModal,
      getUtxoDetail,
    }}
  />
);
