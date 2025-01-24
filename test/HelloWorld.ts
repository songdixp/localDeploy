
import "@nomicfoundation/hardhat-ethers"
import {ethers} from "hardhat";
import {expect} from "chai";


//需要安装chai的 ts 变量
describe("HelloWorld", function(){
    it("should say hello", async function () {
        // 1. 安装合约 compile setup
        // 2. import 合约
        // 3.测试行为 test
        // 4.断言
        // 把编译好的合约添加到hw 变量中来，如何找到 helloworld 合约的？
        // 通过/Users/sason/Code/vscode_3/localDeploy/artifacts/contracts 下面的HelloWorld.json 中的合约信息，包含abi、bytescode deployedbytescode 等找到
        // 拿到的不是文件名称，而是命名的合约名称
        const HW = await ethers.getContractFactory("HelloWorld");
        // 上面拿到类（合约）之后，进行部署到链上
        const hw = await HW.deploy();
        // 区块链上部署合约有多个区块链节点进行确认，然后最终部署到链上，这个函数在合约部署成功之后执行
        await hw.waitForDeployment();
        expect(await hw.hello()).to.equal("Hello, World!");

        /*
        怎么把合约部署提交到链上的？
        hardhat 底层帮我们处理了这些事情，不需要管理实现的细节
        */ 
    });
});


