// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract SubscriptionFileSharing is AccessControl, ReentrancyGuard {
    using SafeMath for uint256;
    using Address for address payable;

    enum SubscriptionType { Lifetime, OneMonth, ThreeMonths, OneWeek }

    struct File {
        address owner;
        string ipfsHash;
        string fileName;
        bool exists;
        mapping(address => Access) sharedWith;
        mapping(SubscriptionType => uint256) subscriptionPrices;
    }

    struct Access {
        bool hasAccess;
        uint256 expiryTime;
    }

    mapping(uint256 => File) private files;
    mapping(address => uint256) private pendingWithdrawals;
    uint256 private UploadedfileCount;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    uint256 public platformFeePercentage = 5; // 5% platform fee

    event FileUploaded(uint256 indexed fileId, address indexed owner, string ipfsHash, string fileName);
    event AccessGranted(uint256 indexed fileId, address indexed user, SubscriptionType subscriptionType);
    event SubscriptionPriceSet(uint256 indexed fileId, SubscriptionType subscriptionType, uint256 price);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event PlatformFeeUpdated(uint256 newFeePercentage);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    modifier fileExists(uint256 _fileId) {
        require(files[_fileId].exists, "File does not exist");
        _;
    }

    modifier onlyFileOwner(uint256 _fileId) {
        require(files[_fileId].owner == msg.sender, "Only the file owner can perform this action");
        _;
    }

    function uploadFile(
        string memory _ipfsHash, 
        string memory _fileName, 
        uint256 _priceLifetime, 
        uint256 _priceOneMonth, 
        uint256 _priceThreeMonths, 
        uint256 _priceOneWeek
    ) public nonReentrant {
        UploadedfileCount = UploadedfileCount.add(1);
        files[UploadedfileCount].owner = msg.sender;
        files[UploadedfileCount].ipfsHash = _ipfsHash;
        files[UploadedfileCount].fileName = _fileName;
        files[UploadedfileCount].exists = true;

        files[UploadedfileCount].subscriptionPrices[SubscriptionType.Lifetime] = _priceLifetime;
        files[UploadedfileCount].subscriptionPrices[SubscriptionType.OneMonth] = _priceOneMonth;
        files[UploadedfileCount].subscriptionPrices[SubscriptionType.ThreeMonths] = _priceThreeMonths;
        files[UploadedfileCount].subscriptionPrices[SubscriptionType.OneWeek] = _priceOneWeek;

        emit FileUploaded(UploadedfileCount, msg.sender, _ipfsHash, _fileName);
        emit SubscriptionPriceSet(UploadedfileCount, SubscriptionType.Lifetime, _priceLifetime);
        emit SubscriptionPriceSet(UploadedfileCount, SubscriptionType.OneMonth, _priceOneMonth);
        emit SubscriptionPriceSet(UploadedfileCount, SubscriptionType.ThreeMonths, _priceThreeMonths);
        emit SubscriptionPriceSet(UploadedfileCount, SubscriptionType.OneWeek, _priceOneWeek);
    }

    function purchaseAccess(uint256 _fileId, SubscriptionType _subscriptionType) 
        public 
        payable 
        nonReentrant 
        fileExists(_fileId) 
    {
        uint256 price = files[_fileId].subscriptionPrices[_subscriptionType];
        require(msg.value >= price, "Insufficient payment");

        uint256 duration;
        if (_subscriptionType == SubscriptionType.Lifetime) {
            duration = type(uint256).max;
        } else if (_subscriptionType == SubscriptionType.OneMonth) {
            duration = 30 days;
        } else if (_subscriptionType == SubscriptionType.ThreeMonths) {
            duration = 90 days;
        } else if (_subscriptionType == SubscriptionType.OneWeek) {
            duration = 7 days;
        }

        files[_fileId].sharedWith[msg.sender].hasAccess = true;
        files[_fileId].sharedWith[msg.sender].expiryTime = block.timestamp.add(duration);

        // Calculate and distribute payment
        uint256 platformFee = price.mul(platformFeePercentage).div(100);
        uint256 ownerPayment = price.sub(platformFee);
        
        pendingWithdrawals[files[_fileId].owner] = pendingWithdrawals[files[_fileId].owner].add(ownerPayment);
        pendingWithdrawals[address(this)] = pendingWithdrawals[address(this)].add(platformFee);

        // Refund excess payment if any
        if (msg.value > price) {
            payable(msg.sender).sendValue(msg.value.sub(price));
        }

        emit AccessGranted(_fileId, msg.sender, _subscriptionType);
    }

    function hasAccess(uint256 _fileId) public view fileExists(_fileId) returns (bool) {
        Access memory access = files[_fileId].sharedWith[msg.sender];
        return access.hasAccess && (access.expiryTime == type(uint256).max || access.expiryTime > block.timestamp);
    }

    function getFile(uint256 _fileId) public view fileExists(_fileId) returns (string memory, string memory) {
        require(hasAccess(_fileId), "No access to this file");
        return (files[_fileId].ipfsHash, files[_fileId].fileName);
    }

    function withdrawEarnings() public nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No earnings to withdraw");
        
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).sendValue(amount);
        
        emit FundsWithdrawn(msg.sender, amount);
    }

    // View all files uploaded
    function viewAllFiles() public view returns (uint256[] memory, address[] memory, string[] memory, string[] memory) {
        uint256[] memory fileIds = new uint256[](UploadedfileCount);
        address[] memory owners = new address[](UploadedfileCount);
        string[] memory ipfsHashes = new string[](UploadedfileCount);
        string[] memory fileNames = new string[](UploadedfileCount);

        for (uint256 i = 1; i <= UploadedfileCount; i++) {
            File storage file = files[i];
            if (file.exists) {
                fileIds[i - 1] = i;
                owners[i - 1] = file.owner;
                ipfsHashes[i - 1] = file.ipfsHash;
                fileNames[i - 1] = file.fileName;
            }
        }

        return (fileIds, owners, ipfsHashes, fileNames);
    }

    // Admin withdrawal of platform fees
    function withdrawPlatformFees() public onlyRole(ADMIN_ROLE) nonReentrant {
        uint256 amount = pendingWithdrawals[address(this)];
        require(amount > 0, "No platform fees to withdraw");
        
        pendingWithdrawals[address(this)] = 0;
        payable(msg.sender).sendValue(amount);
        
        emit FundsWithdrawn(msg.sender, amount);
    }
}
