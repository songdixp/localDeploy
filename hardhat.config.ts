import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";

type Config = import('hardhat/config').HardhatUserConfig;

/** @type import('hardhat/config').HardhatUserConfig */
const config:Config = {
  solidity: "0.8.28",
  typechain: { // 配置 TypeChain
    outDir: "typechain-types", // 指定输出目录
    target: "ethers-v6", // 指定目标库
  },
  networks:{
    hardhat:{
      chainId:31337
    }
  }
};

export default config;
