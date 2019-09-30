class Prefix {

  constructor() {
    this.xprvkey = this.isMainnet() ? '0488ade4' : '04358394';
    this.xpubkey = this.isMainnet() ? '0488b21e' : '043587cf';
    this.addrP2pkh = this.isMainnet() ? '00' : '6f';
    this.addrP2sh = this.isMainnet() ? '05' : 'c4';
    this.addrPrvkey = this.isMainnet() ? '80' : 'ef';
    this.bech32 = this.isMainnet() ? 'bc' : (this.isTestnet() ? 'tb' : 'bcrt');
  }

  isMainnet = () => (
    JSON.stringify(process.env.NETWORK_MODE) === '"MAINNET"'
  )

  isTestnet = () => (
    JSON.stringify(process.env.NETWORK_MODE) === '"TESTNET"'
  )

}

export const AddrPrefix = () => (new Prefix());
