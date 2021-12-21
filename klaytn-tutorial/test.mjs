// import Contract from "./build/contracts/Count.json";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Contract = require("./build/contracts/Count.json");

import Caver from "caver-js";
const rpcURL = "https://api.baobab.klaytn.net:8651/";
const networkID = "1001";
const caver = new Caver(rpcURL);

const addr = "0x8404942b32ce196ed2e6a20be9c896cabe1ab470";
const addrkey =
  "0xe6804cfb0e738fc9932f86451dbe81aeb79cbe0e903dae283928a7957a8b8363";

async function test() {
  let ret;

  ret = caver.klay.accounts.createWithAccountKey(addr, addrkey);
  ret = caver.klay.accounts.wallet.add(ret);
  ret = caver.klay.accounts.wallet.getAccount(0);
  console.log("getAccount 0", ret.address);

  const deplyedNetworkAddress = Contract.networks[networkID].address;
  const contract = new caver.klay.Contract(Contract.abi, deplyedNetworkAddress);

  ret = await contract.methods.count().call();
  console.log("count", ret);

  ret = await contract.methods.plus().send({
    from: addr,
    gas: "200000",
  });
  console.log("plus");
}
test();
