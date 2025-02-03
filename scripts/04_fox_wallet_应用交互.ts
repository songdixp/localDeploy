import "@nomicfoundation/hardhat-ethers";
import {ethers} from "hardhat";


async function foo() {
    const HW = await ethers.getContractFactory("HelloWorld");
    const hw = await HW.deploy();
    await hw.waitForDeployment();
    return hw;
   
}
/*
我们一般将生成合约的方法，和部署 deploy 分开
*/ 
async function deployContract(){
    const hw  = await foo();
    return hw;
}

async function sayHello(contract:any) {
    console.log(await contract.hello());
    
}
/*
连接小狐狸钱包

前端工程化使用的打包工具 webpack


*/ 