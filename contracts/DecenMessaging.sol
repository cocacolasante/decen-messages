// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract DecenMessaging{
    address public admin;

    uint public messageLength = 100;
    
    uint public messageCount;

    // mapping of users to messages
    mapping(address=>Message[]) public toUser;
    mapping(address=>Message[]) public fromUser;
    

    // message struct defining sender of message, receive, time of message and message content
    struct Message{
        uint messageNumber;
        address sender;
        address receiver;
        uint timestamp;
        string textMessage;
    }


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

        toUser[to].push(newMessage);
        fromUser[msg.sender].push(newMessage);

        emit MessageSent(messageCount, msg.sender, to, block.timestamp);
    }

    function viewReceivedMessages(address to) external view returns(Message[] memory){
        uint iterateCount = toUser[to].length;
        Message[] memory receivedMessages = new Message[](iterateCount);
            for(uint i = 0; i < iterateCount; i++){
                receivedMessages[i] = toUser[to][i];
            }

        return receivedMessages;
    }
    function viewSentMessages(address from) external view returns(Message[] memory){
        uint iterateCount = fromUser[from].length;
        Message[] memory receivedMessages = new Message[](iterateCount);
            for(uint i = 0; i < iterateCount; i++){
                receivedMessages[i] = fromUser[from][i];
            }

        return receivedMessages;
    }

    function deleteReceivedMessage(uint messageNumber) external {
        delete toUser[msg.sender][messageNumber];
    }

    






    // setter functions

    function setMessageLimit(uint _messageLimit) external onlyAdmin {
        messageLength = _messageLimit;
    }

}
