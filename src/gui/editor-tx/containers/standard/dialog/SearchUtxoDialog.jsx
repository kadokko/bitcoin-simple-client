import { connected, SearchUtxoDialog } from 'gui/editor-tx/containers/base';
import * as actionDefs from 'gui/editor-tx/actions/standard';


export default connected(SearchUtxoDialog, 'standard', actionDefs);
