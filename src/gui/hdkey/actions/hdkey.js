import { createAction } from 'gui/app/actions/Creator';
import * as types from './hdkey-types';


export const generateHdSeed = () =>
  createAction(
    types.USER_GEN_HD_SEED,
  );

export const receiveHdSeed = seed =>
  createAction(
    types.REDUCER_RECEIVE_HD_SEED, {
      seed,
    },
  );

export const getHdMasterKeysFromSeed = seed =>
  createAction(
    types.USER_GET_HD_MASTER_KEYS_FROM_SEED, {
      seed,
    },
  );

export const getHdMasterKeysFromMnemonic = mnemonic =>
  createAction(
    types.USER_GET_HD_MASTER_KEYS_FROM_MNEMONIC, {
      mnemonic,
    },
  );

export const receiveHdMnemonic = mnemonic =>
  createAction(
    types.REDUCER_RECEIVE_HD_MNEMONIC, {
      mnemonic,
    },
  );

export const getHdMasterPubkey = masterPrvkey =>
  createAction(
    types.USER_GET_HD_MASTER_PUBKEY, {
      masterPrvkey,
    },
  );

export const receiveHdMasterKeys = (masterPrvkey, masterPubkey) =>
  createAction(
    types.REDUCER_RECEIVE_HD_MASTER_KEYS, {
      masterPrvkey,
      masterPubkey,
    },
  );

export const setHdPath = hdpath =>
  createAction(
    types.USER_SET_HD_PATH, {
      hdpath,
    },
  );

export const receiveHdPath = hdpath =>
  createAction(
    types.REDUCER_RECEIVE_HD_PATH, {
      hdpath,
    },
  );

export const getHdPubkey = (pubkey, hdpath) =>
  createAction(
    types.USER_GET_HD_PUBKEY, {
      pubkey,
      hdpath,
    },
  );

export const getHdKeys = (prvkey, pubkey, hdpath) =>
  createAction(
    types.USER_GET_HD_KEYS, {
      prvkey,
      pubkey,
      hdpath,
    },
  );

export const receiveHdKeys = (hdprv, hdpub) =>
  createAction(
    types.REDUCER_RECEIVE_HD_KEYS, {
      hdprv,
      hdpub,
    },
  );

export const createP2pkhAddr = hdpub =>
  createAction(
    types.USER_CREATE_P2PKH_ADDR, {
      hdpub,
    },
  );

export const receiveP2pkhAddr = p2pkhAddr =>
  createAction(
    types.REDUCER_RECEIVE_P2PKH_ADDR, {
      p2pkhAddr,
    },
  );

export const createP2wpkhAddr = hdpub =>
  createAction(
    types.USER_CREATE_P2WPKH_ADDR, {
      hdpub,
    },
  );

export const receiveP2wpkhAddr = p2wpkhAddr =>
  createAction(
    types.REDUCER_RECEIVE_P2WPKH_ADDR, {
      p2wpkhAddr,
    },
  );
