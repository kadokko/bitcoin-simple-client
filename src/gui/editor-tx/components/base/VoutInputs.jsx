import React from 'react';
import { FieldArray } from 'redux-form';
import { SquareIconBtnMini as IconBtn } from 'gui/app/components/button';
import { AddBox, RemoveBox, Template } from 'gui/app/components/icon';
import { ScriptEditor } from 'gui/editor-tx/components/base';
import * as validator from 'gui/editor-tx/validator/validator';
import { RowLabel, RowContents } from './layout/Rows';
import { Content, ContentIndex, ContentFields } from './layout/Contents';
import { CurrencyInputField, TextAreaWithAssistField } from './field/InputFields';


export const initialVout = {
  value: 0,
  valueBtc: '0 BTC',
  scriptPubKey: '',
};

const renderVoutInputs = ({ fields, ...custom }) => (
  <div>
    <RowLabel>
      <div>
        vout
      </div>
      <div>
        <IconBtn onClick={ () => fields.push(initialVout) }>
          <AddBox />
        </IconBtn>
        <IconBtn onClick={ () => fields.length > 1 && fields.remove(fields.length - 1) }>
          <RemoveBox />
        </IconBtn>
      </div>
    </RowLabel>
    <RowContents>
      { fields.map((vout, index) => (
        // eslint-disable-next-line  react/no-array-index-key
        <Content key={ 'vout' + vout + index }>
          <ContentIndex>
            <div>
              { index }
            </div>
            <div>
              <IconBtn
                label="search script template"
                onClick={ () => custom.openTemplateModal(index) }
              >
                <Template />
              </IconBtn>
            </div>
          </ContentIndex>
          <ContentFields>
            <CurrencyInputField
              label="value"
              name={`${vout}.value`}
              validator={[ validator.isAmount ]}
              onBlur={ () => {
                custom.updateAmounts();
                custom.updateVoutValue(index);
              }}
            />
            <TextAreaWithAssistField
              label="scriptPubKey"
              name={`${vout}.scriptPubKey`}
              component={ ScriptEditor }
              validator={[ validator.isScript ]}
              onChange={ (value) => {
                custom.updateScriptWithSuggest(value);
              }}
            />
          </ContentFields>
        </Content>
      ))}
    </RowContents>
  </div>
);

export const VoutInputs = ({ openTemplateModal, updateVoutValue, updateAmounts, updateScriptWithSuggest }) => (
  <FieldArray
    name="vouts"
    component={ renderVoutInputs }
    props={{
      openTemplateModal,
      updateVoutValue,
      updateAmounts,
      updateScriptWithSuggest,
    }}
  />
);
