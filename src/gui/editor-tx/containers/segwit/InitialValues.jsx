import { initialVin } from 'gui/editor-tx/components/base/VinInputs';
import { initialVout } from 'gui/editor-tx/components/base/VoutInputs';
import { initialWitness } from 'gui/editor-tx/components/segwit/WitnessInputs';


export const initialTxValues = {
  version: 2,
  vins: [
    initialVin,
  ],
  vouts: [
    initialVout,
  ],
  locktime: 0,
  amounts: {
    fee: 0,
    vinAmounts: 0,
    voutAmounts: 0,
  },
  witnesses: [
    initialWitness,
  ],
  txhex: '',
  txid: '',
};
