import axios from 'axios';


class BitcoinRpc {

  constructor(rpcurl, rpcuser, rpcpass) {
    this.rpcurl = rpcurl;
    this.rpcuser = rpcuser;
    this.rpcpass = rpcpass;
  }

  post(method, params) {
    return axios.create({
      baseURL: this.rpcurl,
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: this.rpcuser,
        password: this.rpcpass,
      },
    }).post('/rpc', {
      jsonrpc: '2.0',
      id: 'bitcoin-simple-client',
      method,
      params,
    }).then(res => ({
      payload: {
        data: res.data.data,
      },
      error: false,
    })).catch(err => {
      // unable to connect the node
      if (typeof err === 'object' && err.toString().startsWith('Error: timeout of')) {
        throw new Error('unable to connect to the bitcoin node');
      }
      // connected to the node but received error
      const res = err.response.data;
      const status = err.response.status;
      if (status === 500) {
        return {
          payload: {
            error: {
              code: res.code,
              message: res.message,
            },
          },
          error: true,
        };
      }
      throw new Error(err);
    });
  }
}

export default BitcoinRpc;
