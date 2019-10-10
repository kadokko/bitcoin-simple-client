import { store } from 'gui/app/store/configureStore';
import BitcoinRpc from 'lib/rpc/BitcoinRpc';
import Unit from 'lib/util/Unit';
import Validator from 'lib/util/Validator';
import ScriptAnalizer from 'lib/util/ScriptAnalizer';


const post = (command, params) => {
  const state = store.getState();
  const config = state.config;
  const rpc = new BitcoinRpc(config.rpcurl, config.rpcuser, config.rpcpass);
  return rpc.post(command, params);
};

export const searchUtxos = async (amountMin, amountMax, scriptTypes) => {
  const amount = {};
  if (Validator.isNum(amountMin)) { amount.minimumAmount = amountMin; }
  if (Validator.isNum(amountMax)) { amount.maximumAmount = amountMax; }
  const { payload: { data: utxos } } = await post('listunspent', [ null, null, null, null, amount ]);
  return String(scriptTypes) === '' ?
    utxos :
    utxos.filter(utxo => scriptTypes.indexOf(ScriptAnalizer.type(utxo.scriptPubKey)) > -1);
};

export const getPrvkey = async (address) => {
  const { payload: { data: prvkeyWif } } = await post('dumpprivkey', [ address ]);
  return prvkeyWif;
};

export const getPubkey = async (address) => {
  const { payload: { data: { pubkey } } } = await post('getaddressinfo', [ address ]);
  return pubkey;
};

// export const getAddressInfo = async (address) => {
//   const { payload: { data: addrInfo } } = await post('getaddressinfo', [ address ]);
//   return addrInfo;
// };

export const decodeScript = async (scriptHex) => {
  const { payload: { data: { asm } } } = await post('decodescript', [ scriptHex ]);
  return asm;
};

export const sendRawTx = async (txHex) => (
  post('sendrawtransaction', [ txHex ])
);

export const generateBlocks = async (num) => {
  const { payload: { data: blockId } } = await post('generate', [ parseInt(num, 10) ]);
  return blockId;
};

export const getNewAddress = async (addrType='bech32') => {
  const { payload: { data: address } } = await post('getnewaddress', [ '', addrType ]);
  return address;
};

export const getTxOut = async (txid, n) => {
  const { payload: { data: txout } } = await post('gettxout', [ txid, parseInt(n, 10) ]);
  return {
    amount: txout != null ? Unit.toSat(txout.value) : '',
    scriptPubKey: txout != null ? txout.scriptPubKey.asm : '',
  };
};
