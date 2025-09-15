// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract EspRulebook is AccessControl, Pausable {
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    event PlanUpdated(
        uint256 grantFmvUsd,
        uint64 startAt,
        uint64 purchaseAt,
        uint16 discountBp,
        bool lookback,
        uint256 annualCapUsd
    );
    event ContributionRecorded(address indexed user, uint256 usd, uint64 ts);
    event Settled(uint64 ts);

    struct PlanTerms {
        uint256 grantFmvUsd; // e.g., 1500.00 * 1e2 = cents
        uint64 startAt;
        uint64 purchaseAt;
        uint16 discountBp; // basis points (e.g., 1500 = 15%)
        bool lookback;
        uint256 annualCapUsd;
    }

    PlanTerms public terms;
    bool public settled;

    mapping(address => uint256) public contributionUsd;

    constructor(address admin, PlanTerms memory initial) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(OPERATOR_ROLE, admin);
        terms = initial;
        emit PlanUpdated(
            initial.grantFmvUsd,
            initial.startAt,
            initial.purchaseAt,
            initial.discountBp,
            initial.lookback,
            initial.annualCapUsd
        );
    }

    function updatePlan(PlanTerms calldata next) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!settled, "already settled");
        terms = next;
        emit PlanUpdated(
            next.grantFmvUsd,
            next.startAt,
            next.purchaseAt,
            next.discountBp,
            next.lookback,
            next.annualCapUsd
        );
    }

    function recordContribution(address user, uint256 usd) external whenNotPaused onlyRole(OPERATOR_ROLE) {
        contributionUsd[user] += usd;
        emit ContributionRecorded(user, usd, uint64(block.timestamp));
    }

    function canSettle() public view returns (bool) {
        return !settled && block.timestamp >= terms.purchaseAt;
    }

    function markSettled() external onlyRole(OPERATOR_ROLE) {
        require(canSettle(), "not ready");
        settled = true;
        emit Settled(uint64(block.timestamp));
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}

