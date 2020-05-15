import Web3 from 'web3'

const shh = (state = null, action) => {
  switch (action.type) {
    default:
      if (state === null) {
        const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8546"));
        return web3.shh
      }
      return state
  }
}

export default shh