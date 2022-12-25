const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

let whiteListAddresses = [
	"0x4bE40dFf0B2B77Aef1d3d783795900c89e6E8Fbf",
	"0x155CA9e02C57D8b20E22836Cd01Dc97C3D26b894",


]
const leafNodes = whiteListAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
//const rootHash = merkleTree.getRoot();
console.log("WhiteList merkle tree\n", merkleTree.toString());

const claimingAddress = leafNodes[0];
const claimingAddress2 = leafNodes[1];

const hexProof = merkleTree.getHexProof(claimingAddress)
const hexProof2 = merkleTree.getHexProof(claimingAddress2)

console.log("Merkle Proof 1 = ", hexProof)
console.log("Merkle Proof 2 = ", hexProof2)
