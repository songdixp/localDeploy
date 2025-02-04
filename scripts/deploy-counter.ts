import "@nomicfoundation/hardhat-ethers";
import {ethers} from "hardhat";


async function deploy(){
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment();
    return counter;
}

async function count(contract:any){
    await contract.count();
    console.log("num is-->",await contract.getNum());
}

deploy().then(count);

/*
我们在终端执行这个部署脚本的时候，发现并没有想要的打印结果，只看到了ContractTransactionResponse，
查看链上发生了什么，会看到console.log:num is : 1
为什么？

区块链上，修改状态变量就是 transation事务，需要消耗gas费用，
状态修改是异步的， 调用的时候不会马上把结果拿到，而是先返回你提交调用的信息，等待交易挖矿的过程
返回完成之后，还要等待块交到链上（添加新的块），需要时间，是异步等待的过程

想要拿到状态变量的结果需要手动编写 get方法来进行获取，如上面代码修改内容 console.log("num is-->",await contract.getNum());
打印结果 Compiled 1 Solidity file successfully (evm target: paris).
num is--> 1n
这个n 是bigIntnumber的含义，在js里面就是大数据的意思

链上
 Block #4:            0xbf4a93e1367ebd6c509afd26e4f79c6d281fd211cb87ecf13960f56fe4675892

  console.log:
    num is : 1
eth_call
  Contract call:       Counter#getNum
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:                  0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0
新增了一个块，并且调用getNum方法，没有产生新的block，以及gas
*/ 

/*
浏览器上面看到Num
接下来将我们的应用部署到浏览器上
写一个按钮，和数字，点击按钮数字+1

1.修改合约地址的环境变量， .env 文件
2.重新编写接口，吸怪index.ts
*/ 