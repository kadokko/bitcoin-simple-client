import { connected, SearchUtxoDialog } from 'gui/editor-tx/containers/base';
import * as actions from 'gui/editor-tx/actions/standard';


export default connected(SearchUtxoDialog, 'standard', actions);
