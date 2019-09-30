import { connected, SearchUtxoDialog } from 'gui/editor-tx/containers/base';
import * as actions from 'gui/editor-tx/actions/segwit';


export default connected(SearchUtxoDialog, 'segwit', actions);
