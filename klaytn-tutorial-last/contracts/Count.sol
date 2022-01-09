pragma solidity ^0.5.6;

import "../contracts-github/token/KIP17/KIP17Full.sol";

contract Count is KIP17Full {
  uint public count = 0;
  address public lastParticipant;

  constructor() public KIP17Full("Count", "C") {

  }

  uint256 id = 0;

  function mint(string memory uri) public {
    _mint(msg.sender, id);
    _setTokenURI(id, uri);

    id++;
  }

  
  function mint2(uint256 id, string memory uri) public {
    _mint(msg.sender, id);
    _setTokenURI(id, uri);
  }


  function plus() public {
    count++;
    lastParticipant = msg.sender;
  }

  function minus() public {
    count--;
    lastParticipant = msg.sender;
  }
}
