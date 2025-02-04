// 入口文件
//  和小狐狸钱包进行交互
// 这里有人喜欢使用 hardhat，因为也提供ethers工具，但是这里会报错，因为index.ts的执行环境是浏览器
// hardhat又是在nodejs环境下的工具，浏览器里面引用hardhat就会执行不了
import {ethers} from "ethers";

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
    // if (!await hasSigner()  &&  !await requestAccess()){  ???  这里的写法和讲师相同，但是编译的时候在浏览器上面报错，查询AI助手是正确的语法，但是谷哥没有查询到
    // 如果换成错误的写法， await !hasSigner() 浏览器会报错，因为没有连接小狐狸钱包，但是有请求了一个无权限的接口，因此需要线连接小狐狸
    if (!await hasSigners() && !await requestAccess()) {
        throw new Error("No ethereum provider found");
    }
    // 合约地址
    // 合约需要指定的方法、参数，1通过字符串来指定，2 通过abi二进制接口文件直接使用
    // provider
    const provider = new ethers.BrowserProvider(getEth());
    const address = process.env.CONTRACT_ADDRESS;
    const contract = new ethers.Contract(
        address,
        // 接口，就是合约 HelloWorld 的接口信息
        ["function hello()  public pure returns (string memory)"],
        // provider 指的就是小狐狸钱包，合约需要连接网络，单纯从eth 对象是不知道的，需要一个中介来知道连接哪个网络，谁能知道，只有小狐狸钱包
        provider
    )

    // 合约创建好之后，调用一下参数，将界面改写成这个 hello world
    document.body.innerHTML = await contract.hello();
    
}

// 最后写一个入口启动函数, 页面加载到js 的时候执行
async function main() {
    await getContract();
    
}
main()

// 然后终端启动webpack
// npx webpack serve