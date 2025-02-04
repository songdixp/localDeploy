pragma solidity ^0.8.28;
import "hardhat/console.sol";

contract Counter{
    uint num; 
    function count()public {
        num++;
        console.log("num is :", num);
    }

    function getNum()public view returns(uint){
        return num;
    }
}