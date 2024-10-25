// contractService.js
import { ethers } from 'ethers';


const contractAddress = "0xe8190bc4f850636ac22a3f12436de0e6e8dfbea9"; // Replace with your deployed contract address
const contractABI = [
  "function uploadFile(string memory _ipfsHash, string memory _fileName, uint256 _priceLifetime, uint256 _priceOneMonth, uint256 _priceThreeMonths, uint256 _priceOneWeek) public",
  "function hasAccess(uint256 _fileId) public view returns (bool)",
  "function getFile(uint256 _fileId) public view returns (string memory, string memory)",
  "event FileUploaded(uint256 indexed fileId, address indexed owner, string ipfsHash, string fileName)",
  "event AccessGranted(uint256 indexed fileId, address indexed user, uint8 subscriptionType)"
];

export const getContract = () => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }
  return null;
};

export const uploadFileToContract = async (ipfsHash, fileName, prices) => {
  try {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");

    const tx = await contract.uploadFile(
      ipfsHash,
      fileName,
      ethers.utils.parseEther(prices.lifetime),
      ethers.utils.parseEther(prices.oneMonth),
      ethers.utils.parseEther(prices.threeMonths),
      ethers.utils.parseEther(prices.oneWeek)
    );

    const receipt = await tx.wait();
    const event = receipt.events.find(e => e.event === 'FileUploaded');
    return event.args.fileId.toString();
  } catch (error) {
    console.error("Error uploading file to contract:", error);
    throw error;
  }
};

export const checkFileAccess = async (fileId) => {
  try {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");
    return await contract.hasAccess(fileId);
  } catch (error) {
    console.error("Error checking file access:", error);
    throw error;
  }
};

export const getFileDetails = async (fileId) => {
  try {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");
    return await contract.getFile(fileId);
  } catch (error) {
    console.error("Error getting file details:", error);
    throw error;
  }
};