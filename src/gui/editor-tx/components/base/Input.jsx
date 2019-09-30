import React from 'react';
import { RowLabel, RowContents } from './layout/Rows';
import { Content, ContentIndex, ContentFields } from './layout/Contents';
import { TextInputField } from './field/InputFields';


export const Input = ({ label, name, type='text', readonly=false }) => (
  <div>
    <RowLabel>
      { label }
    </RowLabel>
    <RowContents>
      <Content>
        <ContentIndex />
        <ContentFields>
          <TextInputField
            name={ name }
            type={ type }
            readonly={ readonly }
          />
        </ContentFields>
      </Content>
    </RowContents>
  </div>
);
