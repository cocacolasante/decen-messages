// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract DecenMessaging{
    address public admin;

    uint public messageLength = 100;
    
    uint public messageCount;

    // mapping of users to messages
    mapping(address=>Message[]) public ToUser;
    mapping(address=>Message[]) public FromUser;


    

    // message struct defining sender of message, receive, time of message and message content
    struct Message{
        uint messageNumber;
        address sender;
        address receiver;
        uint timestamp;
        string textMessage;
    }

    Message[] allMessages;

    event MessageSent(
        uint messageNumber,
        address sender,
        address to,
        uint timestamp
    );

    modifier onlyAdmin {
        require(msg.sender == admin, "only admin can call this function");
        _;
    }

    constructor(){
        admin = payable(msg.sender);
    }


    function sendMessage(address to, string memory message) external {
        require(bytes(message).length <= messageLength, "Message too long");
        messageCount++;

        Message memory newMessage = Message(
            messageCount,
            msg.sender,
            to,
            block.timestamp,
            message
        );
        allMessages.push(newMessage);

        ToUser[to].push(newMessage);
        FromUser[msg.sender].push(newMessage);

        emit MessageSent(messageCount, msg.sender, to, block.timestamp);
    }







    // helper functions

    function setMessageLimit(uint _messageLimit) external onlyAdmin {
        messageLength = _messageLimit;
    }

}
