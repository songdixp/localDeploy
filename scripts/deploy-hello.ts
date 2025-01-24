// @nomicfoundation 是专注以太坊开发者工具的组织账号
// 把 ehters.js 引入到hardhat环境中来，也就是HRE，让ehters.js 能在hardhat环境中使用
import "@nomicfoundation/hardhat-ethers";
// 在 hardhat环境中，引入ehters对象，导入之后可以直接进行 ethers. 来使用对应的工具API
import {ethers} from "hardhat";

async function deploy() {
    const HW  = await ethers.getContractFactory("HelloWorld");
    const hw = await HW.deploy();
    await hw.waitForDeployment();
    return hw;

}

// 编写一个函数，这个函数就是调用部署到链上合约的一个方法
async function sayHello(contract:any) {
    console.log(await contract.hello());
    
}

// 调用部署合约的方法，这个方法会返回调用合约的实例，通过Promise.then传递给 sayHello 函数，因此调用的时候不需要传递参数
deploy().then(sayHello)

// 终端中执行命令来部署合约到某一个网络
// 
// npx hardhat run ./scripts/deploy-hello.ts --network localhost  localhost 可以指定任意的目标网络 rinkeby 或者以太坊主网 都是这种形式
// HardhatError: HH108: Cannot connect to the network localhost.
// 本地没有区块链网络部署我们的合约，需要本地先构建网络
/*
和传统开发不一样的形式，
npx hardhat node 来构建本地的区块链，rpc默认地址是http://127.0.0.1:8545/
初始的情况下有20个默认账号，每个账号有1w eth，每次关闭网络重启的时候 账户和key的地址都不会变化，方便本地调试
然后重新执行部署命令
➜  localDeploy git:(main) ✗ npx hardhat run ./scripts/deploy-hello.ts --network localhost
Hello, World!

以下是本地链上发生的事情
eth_accounts
hardhat_metadata (20)
eth_blockNumber
eth_getBlockByNumber
eth_feeHistory
eth_maxPriorityFeePerGas
eth_sendTransaction
  Contract deployment: HelloWorld
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3 合约的地址和账户(以太坊的钱包地址)的地址是相同结构
  Transaction:         0xc662bc1d9361b460a2b4fbe6e1da43249f3a27eabd9c98cee2d5af396edab251  交易地址
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266  钱包的地址，这里使用的是account0 msg.sender
  Value:               0 ETH
  Gas used:            133169 of 30000000
  Block #1:            0xd53e388d8fa3ec97957e7280dac2c676a5a7b722f8fa67d8bbbdb30c633a5c1f

eth_getTransactionByHash
eth_getTransactionReceipt
eth_blockNumber
eth_call
  Contract call:       HelloWorld#hello
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:                  0x5fbdb2315678afecb367f032d93f642f64180aa3
*/ 


/*
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

Account #3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000 ETH)
Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

Account #4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000 ETH)
Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a

Account #5: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000 ETH)
Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba

Account #6: 0x976EA74026E726554dB657fA54763abd0C3a0aa9 (10000 ETH)
Private Key: 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e

Account #7: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000 ETH)
Private Key: 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356

Account #8: 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f (10000 ETH)
Private Key: 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97

Account #9: 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 (10000 ETH)
Private Key: 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

Account #10: 0xBcd4042DE499D14e55001CcbB24a551F3b954096 (10000 ETH)
Private Key: 0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897

Account #11: 0x71bE63f3384f5fb98995898A86B02Fb2426c5788 (10000 ETH)
Private Key: 0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82

Account #12: 0xFABB0ac9d68B0B445fB7357272Ff202C5651694a (10000 ETH)
Private Key: 0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1

Account #13: 0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec (10000 ETH)
Private Key: 0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd

Account #14: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097 (10000 ETH)
Private Key: 0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa

Account #15: 0xcd3B766CCDd6AE721141F452C550Ca635964ce71 (10000 ETH)
Private Key: 0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61

Account #16: 0x2546BcD3c84621e976D8185a91A922aE77ECEc30 (10000 ETH)
Private Key: 0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0

Account #17: 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E (10000 ETH)
Private Key: 0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd

Account #18: 0xdD2FD4581271e230360230F9337D5c0430Bf44C0 (10000 ETH)
Private Key: 0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0

Account #19: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 (10000 ETH)
Private Key: 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e
*/ 