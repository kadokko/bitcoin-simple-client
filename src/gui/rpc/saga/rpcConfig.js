export const rpcConfig = {
  node1: {
    node: 'node1',
    rpcurl: process.env.REACT_APP_BTC_NODE1_RPC_URL,
    rpcuser: process.env.REACT_APP_BTC_NODE1_RPC_USER,
    rpcpass: process.env.REACT_APP_BTC_NODE1_RPC_PASS,
  },
  node2: {
    node: 'node2',
    rpcurl: process.env.REACT_APP_BTC_NODE2_RPC_URL,
    rpcuser: process.env.REACT_APP_BTC_NODE2_RPC_USER,
    rpcpass: process.env.REACT_APP_BTC_NODE2_RPC_PASS,
  },
};
