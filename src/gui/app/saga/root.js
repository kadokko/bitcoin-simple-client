import { all } from 'redux-saga/effects';
import { configSaga } from 'gui/config/saga/config';
import { hdkeySaga } from 'gui/hdkey/saga/hdkey';
import { standardSaga, segwitSaga } from 'gui/editor-tx/saga/editor-tx';
import { blockSaga } from 'gui/block/saga/block';


function* rootSaga() {
  yield all([
    ...configSaga,
    ...hdkeySaga,
    ...standardSaga,
    ...segwitSaga,
    ...blockSaga,
  ]);
}

export default rootSaga;
