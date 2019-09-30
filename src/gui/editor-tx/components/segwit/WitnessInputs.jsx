import React from 'react';
import { FieldArray } from 'redux-form';
import { SquareIconBtnMini as IconBtn } from 'gui/app/components/button';
import { AddBox, RemoveBox } from 'gui/app/components/icon';
import { Content, ContentIndex, ContentFields } from 'gui/editor-tx/components/base/layout/Contents';
import { RowLabel, RowContents } from 'gui/editor-tx/components/base/layout/Rows';
import { initialScript, ScriptInputs } from './ScriptInputs';


export const initialWitness = {
  scripts: [ initialScript, initialScript ],
};

const renderWitnessInputs = ({ fields }) => (
  <div>
    <RowLabel>
      <div>
        witness
      </div>
      <div>
        <IconBtn onClick={ () => fields.push(initialWitness) }>
          <AddBox />
        </IconBtn>
        <IconBtn onClick={ () => fields.length > 1 && fields.remove(fields.length - 1) }>
          <RemoveBox />
        </IconBtn>
      </div>
    </RowLabel>
    <RowContents>
      { fields.map((witness, index) => (
        <Content key={ `${witness}` }>
          <ContentIndex>
            <div>
              { index }
            </div>
          </ContentIndex>
          <ContentFields>
            <FieldArray
              name={`${witness}.scripts`}
              component={ ScriptInputs }
            />
          </ContentFields>
        </Content>
      ))}
    </RowContents>
  </div>
);

export const WitnessInputs = () => (
  <FieldArray
    name="witnesses"
    component={ renderWitnessInputs }
  />
);
