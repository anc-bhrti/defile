import axios from 'axios';
import { ethers,utils } from 'ethers';
import contractABI from '../contract/contractABI.json'; // Correct the ABI import

const PINATA_API_KEY = 'b771101636ec3dca51f2';
const PINATA_SECRET_KEY = 'bfa1b03b5109e680d328992a2f4ef3467e52972934a39e5ce19b579f9e0900e2';

class ContractIntegration {
    constructor(contract) {
        this.contract = contract; // Inject your contract instance here
    }

    // Upload file to IPFS via Pinata
    async uploadFileToIPFS(file) {
        try {
            // Create form data
            const formData = new FormData();
            formData.append('file', file);

            // Optional: Add metadata
            const metadata = JSON.stringify({
                name: file.name,
                keyvalues: {
                    uploadDate: new Date().toISOString(),
                },
            });
            formData.append('pinataMetadata', metadata);

            // Optional: Add Pinata options
            const pinataOptions = JSON.stringify({
                cidVersion: 0,
            });
            formData.append('pinataOptions', pinataOptions);

            // Upload to Pinata
            const response = await axios.post(
                'https://api.pinata.cloud/pinning/pinFileToIPFS',
                formData,
                {
                    headers: {
                        'Content-Type': `multipart/form-data;`,
                        pinata_api_key: PINATA_API_KEY,
                        pinata_secret_api_key: PINATA_SECRET_KEY,
                    },
                }
            );

            // Return the IPFS hash (CID)
            return response.data.IpfsHash;
        } catch (error) {
            console.error('Pinata upload error:', error.response?.data || error);
            throw new Error(error.response?.data?.error?.details || error.message);
        }
    }

    // Upload file details to the smart contract
    async uploadFileToContract(ipfsHash, fileName, pricing) {
        try {
            const priceLifetime = ethers.parseEther(pricing.lifetime.toString());
            const priceOneMonth = ethers.parseEther(pricing.oneMonth.toString());
            const priceThreeMonths = ethers.parseEther(pricing.threeMonths.toString());
            const priceOneWeek = ethers.parseEther(pricing.oneWeek.toString());

            const tx = await this.contract.uploadFile(
                ipfsHash,
                fileName,
                priceLifetime,
                priceOneMonth,
                priceThreeMonths,
                priceOneWeek
            );

            const receipt = await tx.wait();
            const event = receipt.logs.find(log => {
                try {
                    return this.contract.interface.parseLog(log)?.name === 'FileUploaded';
                } catch {
                    return false;
                }
            });

            const parsedEvent = this.contract.interface.parseLog(event);
            return parsedEvent.args.fileId;
        } catch (error) {
            console.error('Error uploading to contract:', error);
            throw error;
        }
    }

    // Purchase access to a file
    async purchaseAccess(fileId, subscriptionType, price) {
        try {
            const tx = await this.contract.purchaseAccess(fileId, subscriptionType, {
                value: ethers.parseEther(price.toString()),
            });
            await tx.wait();
            return true;
        } catch (error) {
            console.error('Error purchasing access:', error);
            throw error;
        }
    }

    // Check if access is granted to a file
    async checkAccess(fileId) {
        try {
            return await this.contract.hasAccess(fileId);
        } catch (error) {
            console.error('Error checking access:', error);
            throw error;
        }
    }

    async getFile(fileId) {
        try {
          const [ipfsHash, fileName] = await this.contract.getFile(fileId);
          return {
            id: fileId,
            ipfsHash,
            fileName
          };
        } catch (error) {
          console.error(`Error fetching file ${fileId}:`, error.message);
          throw new Error("Failed to retrieve file. You may not have access.");
        }
      }

    // Listen for new file uploads
    onFileUploaded(callback) {
      this.contract.on("FileUploaded", (fileId, owner, ipfsHash, fileName) => {
        callback({
            fileId: fileId.toString(),
            owner,
            ipfsHash,
            fileName
        });
    });
    }

    // Listen for new access grants
    onAccessGranted(callback) {
      this.contract.on("AccessGranted", (fileId, user, subscriptionType) => {
        callback({
            fileId: fileId.toString(),
            user,
            subscriptionType
        });
    });
}
}

// Setup provider, signer, and contract instance
const provider = new ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology/');
const wallet = new ethers.Wallet('c972149179e99de8e5206b0206b04762153cce09da2fa4cf4dbd0e0a19f9868a', provider);
const contractAddress = '0xe8190bc4f850636ac22a3f12436de0e6e8dfbea9';
const contract = new ethers.Contract(contractAddress, contractABI, wallet); // Use the correct ABI property
//no signer needed, in ethers v6 wallet is the signer

// Export an instance of ContractIntegration
const contractIntegration = new ContractIntegration(contract);
export default contractIntegration;
