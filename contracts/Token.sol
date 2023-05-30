// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Token {
  string public name = "My Hardhat Token";
  string public symbol = "MHT";

  uint public totalSupply = 1000000;

  address public owner;

  mapping(address => uint256) balances;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  constructor() {
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address _to, uint256 _value) external {
    require(balances[msg.sender] >= _value, "Not enough tokens");

    console.log(
        "Transferring from %s to %s tokens with owner %s",
        msg.sender,
        _to,
        owner
    );

    balances[msg.sender] -= _value;
    balances[_to] += _value;
    
    emit Transfer(msg.sender, _to, _value);
  }

  function balanceOf(address _owner) external view returns (uint256 balance) {
    return balances[_owner];
  }
}