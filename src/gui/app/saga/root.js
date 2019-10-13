import { all } from 'redux-saga/effects';
import { configSaga } from 'gui/config/saga/config';
import { keySaga } from 'gui/key/saga/key';
import { hdkeySaga } from 'gui/hdkey/saga/hdkey';
import { standardSaga, segwitSaga } from 'gui/editor-tx/saga/editor-tx';
import { blockSaga } from 'gui/block/saga/block';
import { scriptSaga } from 'gui/script/saga/script';


function* rootSaga() {
  yield all([
    ...keySaga,
    ...hdkeySaga,
    ...scriptSaga,
    ...standardSaga,
    ...segwitSaga,
    ...blockSaga,
    ...configSaga,
  ]);
}

export default rootSaga;
