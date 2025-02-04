// 入口文件
//  和小狐狸钱包进行交互
// 这里有人喜欢使用 hardhat，因为也提供ethers工具，但是这里会报错，因为index.ts的执行环境是浏览器
// hardhat又是在nodejs环境下的工具，浏览器里面引用hardhat就会执行不了
import {ethers} from "ethers";
import {abi} from "../artifacts/contracts/Counter.sol/Counter.json";

// src 是前端的内容，scripts 和 contracts 是后端合约的内容，要做好区分

// 我们会在浏览器运行js，那么首先判断浏览器中是否存在小狐狸插件，注入到浏览器全局变量中
function getEth(){
    // @ts-ignore 这里还是会使用这个注解来忽略应用上的报错，如果实际应用开发的过程中尽量不要使用这个语法
    const eth = window.ethereum;
    // 首先判断环境中是否存在全局变量的插件
    if(!eth){
        throw new Error("not found ethereum provider ")
    }
    return eth;

}

// 判断账号是否可接入
// 一般是判断钱包账户是否存在，长度是否非零
async function requestAccess() {
    const eth = getEth();
    // 调用小狐狸钱包需要传入一个对象，指定方法，在小狐狸api里面会有讲到
    const res = await eth.request({method:"eth_requestAccounts"}) as string[];

    return res && res.length > 0;
    
}


async function hasSigners() {
    const metamask = getEth();
    const signers = await metamask.request({method:"eth_accounts"}) as string[];
    return signers.length > 0;
    
}

// 判断钱包之后，连接合约
async function getContract() {
    // 判断账号是否存在，同时也要判断是否有signer，能够支持付费的账号
    // if (!await hasSigner()  &&  !await requestAccess()){ 
    // 如果换成错误的写法， await !hasSigner() 浏览器会报错，因为没有连接小狐狸钱包，但是有请求了一个无权限的接口，因此需要线连接小狐狸
    if (!await hasSigners() && !await requestAccess()) {
        throw new Error("No ethereum provider found");
    }
    // 1.合约地址
    // 2.合约的abi，也就是合约的接口，1通过字符串来指定，2 通过abi二进制接口文件直接使用
    // 3.provider，提供一个和链网络连接的中介，修改合约状态的时候，凭借这个中阶是无法进行支付交易费用的
    // 4.支付交易费用还是需要调用者来提供，signer 就提供了权限，能深入钱包更私密的地方拿到交易者的权限，做签名、加密、解密，和数学相关
    const provider = new ethers.BrowserProvider(getEth());
    const address = process.env.CONTRACT_ADDRESS;
    const contract = new ethers.Contract(
        address,
        // 接口，就是合约 HelloWorld 的接口信息
        // [
        //     "function count()public",
        //     "function getNum()public view returns(uint)" 
        // ],
        // 通过abi 的形式来导入接口信息
        abi,
        // provider 指的就是小狐狸钱包，合约需要连接网络，单纯从eth 对象是不知道的，需要一个中介来知道连接哪个网络，谁能知道，只有小狐狸钱包
        // 需要signer的时候使用很简单
        await provider.getSigner(),
    )
    const count = document.createElement("div");
    // 获取num的方法
    async function getNum(){
        count.innerHTML =  await contract.getNum();
    }
    // 进入页面就调用一下, 把num设置到count里面
    getNum();

    // 设置变量的按钮
    // async function setCount() {
    //     return await contract.count();
    // }
    
    // btn按钮
    const btn = document.createElement("button");
    btn.innerHTML = "increament";
    btn.onclick = async function(){
        // 这里点击按钮之后，需要刷新页面才能拿到增加的数字，为什么？
        // const tx = await setCount(); // await 过程中，等待transcation事务提交，而不是等待transcation完成
        // await tx.wait(); //  这样就能等待tx 完成
        // getNum();
        /*
        这种开发方式是不合理的。
        每次都是调用方法，还要等待 tx 完成，之后再修改方法，非常难受。
        */ 
    /*
    我们希望能够监听到合约的变化，然后还通知你来进行改变，才是合理的。
    因此需要再合约里面写一个事件 CounterInc
    1.重新部署Counter合约
    2.将新合约的地址放到 .env 环境变量中
    2.1 在修改Contract 接口的列表，但实际生产中不需要这么麻烦，通过abi的形式来获取接口
    3.重启webpack
    这三个步骤是重复的，习惯之后就熟悉了，也可以通过脚本完成这一套操作
    */    
        // 修改方法,点击之后不在去获取状态，而是增加事件
        await contract.count();
    };

    // 增加监听事件, 在ethers里面通过filter来拿到事件
    // 在ethers 6之后，不再是传 参数列表过来，而是传 payload {args 对象包含参数列表其他信息}
    // 这些信息可以看官方文档 ??? 这里看的是哪个官方文档？
    contract.on(contract.filters.CounterInc(), async function({args}){
        // 事件监听常用的是这种方式，并且后台应用也会使用这种方式
        // 事件发出的时候，后台监听到事件，将事件状态内容存储到后台数据库里面
        // 在区块链上的接口访问是有一些限制的，大量访问的话，有峰值，不会让你在节点上访问过多次数，工程话的解决方案是：将链上的状态存储到链下缓解链上的网络压力
        count.innerHTML = args[0].toString() || await contract.getCount();
    });


    // 将创建好的两个元素添加到document body 中
    document.body.appendChild(count);
    document.body.appendChild(btn);

}

// 最后写一个入口启动函数, 页面加载到js 的时候执行
async function main() {
    await getContract();
    
}
main();

// 然后终端启动webpack
// npx webpack serve