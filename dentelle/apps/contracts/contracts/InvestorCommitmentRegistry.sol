// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract InvestorCommitmentRegistry is AccessControl {
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    event Committed(address indexed investor, uint256 indexed programId, uint256 amount);
    event Reduced(address indexed investor, uint256 indexed programId, uint256 amount);

    mapping(address => bool) public whitelist;
    mapping(uint256 => uint256) public totalCommitted; // programId => total
    mapping(uint256 => mapping(address => uint256)) public committed; // programId => investor => amount

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(OPERATOR_ROLE, admin);
    }

    function setWhitelisted(address investor, bool allowed) external onlyRole(DEFAULT_ADMIN_ROLE) {
        whitelist[investor] = allowed;
    }

    function commit(uint256 programId, uint256 amount) external {
        require(whitelist[msg.sender], "not whitelisted");
        committed[programId][msg.sender] += amount;
        totalCommitted[programId] += amount;
        emit Committed(msg.sender, programId, amount);
    }

    function reduce(uint256 programId, uint256 amount) external {
        uint256 cur = committed[programId][msg.sender];
        require(amount <= cur, "exceeds");
        committed[programId][msg.sender] = cur - amount;
        totalCommitted[programId] -= amount;
        emit Reduced(msg.sender, programId, amount);
    }
}

