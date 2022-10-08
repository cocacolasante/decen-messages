// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract DecenMessaging{
    address public admin;
    address[] public users;
    
    uint public messageCount;

    // mapping of users to messages
    mapping(address=>Message[]) public messagesToUser;
    mapping(address=>Message[]) public messagesFromUser;

    

    // message struct defining sender of message, receive, time of message and message content
    struct Message{
        uint messageNumber;
        address sender;
        address to;
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

    constructor(){
        admin = payable(msg.sender);
    }


    function sendMessage(address to, string memory message)external{
        require(bytes(message).length <= 100, "Message too long");
        messageCount++;
        Message memory newMessage = Message(
            messageCount,
            msg.sender,
            to,
            block.timestamp,
            message
        );
        allMessages.push(newMessage);

        messagesToUser[msg.sender].push(newMessage);

        emit MessageSent(messageCount, msg.sender, to, block.timestamp);
    }
}
