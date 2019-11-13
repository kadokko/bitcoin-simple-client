import React from 'react';
import { Field } from 'redux-form';
import { SquareIconBtnMini as IconBtn } from 'gui/app/components/button';
import { TextAreaField as TextArea } from 'gui/app/components/field/redux-form';
import { AddBox, RemoveBox } from 'gui/app/components/icon';
import { Content, ContentIndex as CIndex, ContentFields } from 'gui/editor-tx/components/base/layout/Contents';
import { RowLabel as RLabel, RowContents } from 'gui/editor-tx/components/base/layout/Rows';
import { withStyles } from 'gui/app/style';


export const initialScript = {
  script: '',
};

export const ContentIndex = withStyles(() => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
}))(CIndex);

export const RowLabel = withStyles(() => ({
  root: {
    backgroundColor: '#f5f5f5',
  },
}))(RLabel);


export const ScriptInputs = ({ fields }) => (
  <div>
    <RowLabel>
      <div>&nbsp;</div>
      <div>
        <IconBtn onClick={ () => fields.push(initialScript) }>
          <AddBox />
        </IconBtn>
        <IconBtn onClick={ () => fields.length > 1 && fields.remove(fields.length - 1) }>
          <RemoveBox />
        </IconBtn>
      </div>
    </RowLabel>
    <RowContents>
      { fields.map((script, index) => (
        <Content key={ `${script}` }>
          <ContentIndex>
            <div>
              { index }
            </div>
          </ContentIndex>
          <ContentFields>
            <Field
              component={ TextArea }
              name={`${script}.script`}
            />
          </ContentFields>
        </Content>
      ))}
    </RowContents>
  </div>
);
