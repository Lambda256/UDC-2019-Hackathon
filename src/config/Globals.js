const Globals = {
  __LuniSign_DEV__: true,
};

export function setNetwork(value) {
  Globals.__LuniSign_DEV__ = value; // used only release version (mainnet)
}

export default Globals;
