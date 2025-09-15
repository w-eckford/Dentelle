// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract DistributionAnchor is AccessControl {
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    event Anchored(uint256 indexed programId, bytes32 merkleRoot, string uri, uint64 ts);

    struct AnchorInfo {
        bytes32 merkleRoot;
        string uri;
        uint64 ts;
    }

    mapping(uint256 => AnchorInfo) public anchors;

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(OPERATOR_ROLE, admin);
    }

    function anchor(uint256 programId, bytes32 merkleRoot, string calldata uri)
        external
        onlyRole(OPERATOR_ROLE)
    {
        anchors[programId] = AnchorInfo({merkleRoot: merkleRoot, uri: uri, ts: uint64(block.timestamp)});
        emit Anchored(programId, merkleRoot, uri, uint64(block.timestamp));
    }
}

