
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
        // 通过/Users/sason/Code/vscode_3/localDeploy/artifacts/contracts 下面的 HelloWorld.json 中的合约信息，包含abi、bytescode deployedbytescode 等找到
        // deployedbytescode 我们的合约通过编译，会使用二进制代码去部署到以太坊的虚拟机上（中间过程）而不是通过源码的方式来进行部署
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

        /*
        测试代码执行报错
        ➜  contracts git:(main) ✗ npx hardhat test
        An unexpected error occurred:

        error TS5109: Option 'moduleResolution' must be set to 'NodeNext' (or left unspecified) when option 'module' is set to 'NodeNext'.
        报错信息是在tsconfig.ts 模块（代码文件）中缺少指定两个字段 module 和 moduleResolution 
        */ 

        /* kimi 总结
        关系总结
        module：
            决定你代码中使用的模块语法（例如 require 还是 import）。
            决定编译器如何将你的模块代码转换为 JavaScript 代码。
        moduleResolution：
            决定编译器如何根据模块路径找到实际的模块文件。
            与 module 配置紧密相关，确保模块解析策略与模块语法一致
        */ 
    });
});


