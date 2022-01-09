const { checkAddressChecksum } = require("caver-js/packages/caver-utils");
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const Caver = require("caver-js");

const PRIVATE_ADDR = "0x8404942b32ce196ed2e6a20be9c896cabe1ab470";
const PRIVATE_KEY =
  "0xe6804cfb0e738fc9932f86451dbe81aeb79cbe0e903dae283928a7957a8b8363";

module.exports = {
  networks: {
    baobab: {
      provider: () =>
        new HDWalletProvider(PRIVATE_KEY, "https://api.baobab.klaytn.net:8651"),
      network_id: "1001",
      gas: "8500000",
      gasPrice: null,
    },

    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value: "Basic S0FTS~~~ 카스콘솔을 이용해 키를 받으셔야합니다.",
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          PRIVATE_KEY,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217",
      gas: "8500000",
      gasPrice: "25000000000",
    },
  },
  compilers: {
    solc: {
      version: "0.5.6",
    },
  },
};
