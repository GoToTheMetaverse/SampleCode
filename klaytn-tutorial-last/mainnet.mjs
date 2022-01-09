// import Contract from "./build/contracts/Count.json";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Contract = require("./build/contracts/Count.json");

import Caver from "caver-js";

const rpcURL = "https://public-node-api.klaytnapi.com/v1/cypress";
const networkID = "8217";
const caver = new Caver(rpcURL);

const addr = "0x8404942b32ce196ed2e6a20be9c896cabe1ab470";
const addrkey =
  "0xe6804cfb0e738fc9932f86451dbe81aeb79cbe0e903dae283928a7957a8b8363";

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function test() {
  let ret;

  ret = caver.klay.accounts.createWithAccountKey(addr, addrkey);
  ret = caver.klay.accounts.wallet.add(ret);
  ret = caver.klay.accounts.wallet.getAccount(0);
  console.log("getAccount 0", ret.address);

  const deplyedNetworkAddress = Contract.networks[networkID].address;
  const contract = new caver.klay.Contract(Contract.abi, deplyedNetworkAddress);

  //-----------------
  // mint2 code
  //-----------------
  //   for (let i = 3; i < 100; i++) {
  //     await wait(3000);

  //     ret = await contract.methods.totalSupply().call();
  //     console.log("nft totalSupply", ret);

  //     ret = await caver.rpc.klay.getBalance(addr); // hex
  //     ret = caver.utils.hexToNumberString(ret); // number
  //     ret = caver.utils.convertFromPeb(ret, "KLAY"); // klay
  //     console.log("klaytn convertToPeb", ret);

  //     const uri = "https://mynft.gunillee.repl.co/res_json/json_" + i + ".json";
  //     console.log("uri", uri);

  //     ret = await contract.methods.mint2(i, uri).send({
  //       from: addr,
  //       gas: "800000",
  //     });
  //     console.log("mint2");
  //   }

  //-----------------
  // nft view code
  //-----------------
  ret = await contract.methods.totalSupply().call();
  console.log("nft totalSupply", ret);

  ret = await contract.methods.balanceOf(addr).call();
  const count = ret;
  console.log("nft balanceOf", ret);

  for (let i = 0; i < count; i++) {
    ret = await contract.methods.tokenOfOwnerByIndex(addr, i).call();
    const tokenId = ret;

    ret = await contract.methods.tokenURI(tokenId).call();
    const tokenUri = ret;

    console.log("nft", tokenId, tokenUri);
  }
}
test();
