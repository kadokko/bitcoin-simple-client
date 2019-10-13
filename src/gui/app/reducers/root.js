import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { config } from 'gui/config/reducers/config';
import { block } from 'gui/block/reducers/block';
import { standard, segwit } from 'gui/editor-tx/reducers/main';
import { standardForm, segwitForm } from 'gui/editor-tx/reducers/form';
import { standardUtxoDialog, segwitUtxoDialog } from 'gui/editor-tx/reducers/utxo';
import { standardSigForm, segwitSigForm } from 'gui/editor-tx/reducers/sig';
import { configForm } from 'gui/config/reducers/form';
import { keyForm } from 'gui/key/reducers/form';
import { hdkeyForm } from 'gui/hdkey/reducers/form';
import { scriptForm } from 'gui/script/reducers/form';


const rootReducer = combineReducers({
  config,
  block,
  standard,
  segwit,
  standardUtxoDialog,
  segwitUtxoDialog,
  form: formReducer.plugin({
    ...configForm,
    ...keyForm,
    ...hdkeyForm,
    ...scriptForm,
    ...standardForm,
    ...standardSigForm,
    ...segwitForm,
    ...segwitSigForm,
  }),
});

export default rootReducer;
