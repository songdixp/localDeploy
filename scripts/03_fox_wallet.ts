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
小狐狸钱包
1 官网下载安装插件，因为应用最多的还是web

* 介绍：钱包
做应用接触最多的还是钱包，是一个相对安全的交易环境，也会封装一些以太坊底层的接口，我们很多时候是和钱包提供的api打交道
钱包应用最多的还是小狐狸，当然也有其他的如 phantom，教学以小狐狸为主
创建的时候会提供12个安全的助记词，测试的时候随便，如果用于真正交易，一定要把钱包的助记词保存在安全的位置，切记和测试环境区分开，很容易你的钱就被转走了。
钓鱼、私钥泄露、诈骗
第二，添加完小狐狸之后，将网络切换到正确的网络，测试网络就是 本地 localhost
网络地址，就是本地测试环境 http://127.0.0.1:8545/
名称自定义
链id，区分不同链的唯一标识符，维护这个id是社区进行维护的
货币符号，在编写名称和url的时候会给出推荐的货币符号，如以太坊主链是ETH 本地一般是 GO
PS：小狐狸不支持比特币交易的，有些钱包支持
区块链浏览器：你可以在这个url上查看到所有用户的所有交易信息

导入自己的账户
之前在创建本地链的时候，给了默认的20个账户，有20个私钥，导入就通过私钥来进行导入
账户初始的native token，也就是链上本来的货币，例如 以太坊是1ETH，比特币是 ETC，
导入之后发现金额并不是初始的10000ETH，因为部署HelloWorld的时候存在gas消耗，在 活动 页签中会记录交易信息，有缓存

*/ 