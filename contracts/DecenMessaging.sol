// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract DecenMessaging{
    address public admin;

    uint public messageLength = 100;
    
    uint public messageCount;

    // mapping of users to messages
    mapping(address=>Message[]) public toUser; // messages sent to user
    mapping(address=>Message[]) public fromUser; // messages sent from user
    

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
        address from,
        address to,
        uint timestamp
    );

    event MessageDeleted(
        uint messageNumber,
        address from,
        address to
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

    // view messages you received
    function viewReceivedMessages(address to) external view returns(Message[] memory){
        uint iterateCount = toUser[to].length;
        Message[] memory receivedMessages = new Message[](iterateCount);
            for(uint i = 0; i < iterateCount; i++){
                receivedMessages[i] = toUser[to][i];
            }

        return receivedMessages;
    }

    // view messages you sent
    function viewSentMessages(address from) external view returns(Message[] memory){
        uint iterateCount = fromUser[from].length;
        Message[] memory receivedMessages = new Message[](iterateCount);
            for(uint i = 0; i < iterateCount; i++){
                receivedMessages[i] = fromUser[from][i];
            }

        return receivedMessages;
    }

    // deletes messages you received
    function deleteReceivedMessage(uint messageNumber) external {
        Message memory message = toUser[msg.sender][messageNumber];
        delete toUser[msg.sender][messageNumber];
        emit MessageDeleted(messageNumber, message.sender, message.receiver);
    }

    // deletes messages you sent and received
    function deleteSentMessage(uint messageNumber) external {
        Message memory message = fromUser[msg.sender][messageNumber];
        delete toUser[message.receiver][messageNumber];
        delete fromUser[msg.sender][messageNumber];
        emit MessageDeleted(messageNumber, message.sender, message.receiver);
        
    }

    
    // setter functions

    function setMessageLimit(uint _messageLimit) external onlyAdmin {
        messageLength = _messageLimit;
    }

    function setNewAdmin(address newAdmin) external onlyAdmin{
        admin = newAdmin;
    }
    

}
