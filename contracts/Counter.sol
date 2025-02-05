pragma solidity ^0.8.28;
import "hardhat/console.sol";

contract Counter{
    uint num; 
    // 合约上的事件，不仅仅时时根据block更新来监听状态变化，还能把事件保存在历史的区块上面
    // 这就是provider 内置的方式，监听到链上的状态变化，这就是事件log，每次发生变化的时候通过filter监听的合约变化
    // 再响应到具体的应用上来
    event CounterInc(uint num);
    // 这种好处是，可以传入address sender 参数，然后将调用者的信息返回出去，知道谁在调用这个方法，能解决很多场景的问题

    function count()public {
        num++;
        console.log("num is :", num);
        emit CounterInc(num);
    }

    function getNum()public view returns(uint){
        return num;
    }
}