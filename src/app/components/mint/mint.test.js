//  import Web3 from "web3";
 const Web3 = require('web3');
const assert = require('assert');
const ganache = require('ganache-cli');
const { parse } = require('path');

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
	// We are in the browser and metamask is running.
	window.ethereum.request({ method: "eth_requestAccounts" });
	web3 = new Web3(window.ethereum);
} else {
	// We are on the server *OR* the user is not running metamask
	const provider = new Web3.providers.HttpProvider(
		"https://rinkeby.infura.io/v3/b2adaf49640e474b9dc19f254845979f"
	);
	web3 = new Web3(provider);
}


const erc20TokenABI = require("./bep20/Abi.json");


let accounts;
let token;



beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	token = await new web3.eth.Contract(erc20TokenABI.abi, null).deploy({
		data: erc20TokenABI.bytecode,
		arguments: ['TestToken', 'TSTKN']
	}).send({ from: accounts[0], gas: '4000000' });

});


describe('******ERC20 W/ Staking Pool.******', () => {

	it('***Deploys a ERC20 W / Staking Pool***', async () => {
		assert.ok(token.options.address);
		console.log("***BASIC DEPLOYMENT***")

		console.log("Contract address = " + token.options.address)
		let symbol = await token.methods.symbol().call();
		let name = await token.methods.name().call();
		assert(name == "TestToken", "symbol not correct");
		assert(symbol == "TSTKN", "Name not correct");
		console.log("Creates name and symbol. " + name + " : " + symbol)
		let owner = await token.methods.owner().call();
		assert(accounts[0] == owner, "Contract Owner is not deployer.");
		console.log("Contract Owner and deployer are one in the same.");

		let totalSupply = await token.methods.totalSupply().call()
		assert(totalSupply == 1000000, totalSupply + " were NOT minted");
		let tokenBalance = await token.methods.balanceOf(token.options.address).call();
		assert(totalSupply == tokenBalance, totalSupply + " were NOT minted");
		console.log(totalSupply + " were minted to address of this contract.")
		maxSupply = await token.methods.maxSupply().call();
		assert(maxSupply == 2000000, maxSupply + " is max supply failed");
		console.log(maxSupply + " is max supply set.")
		cost = await token.methods.cost().call();
		assert.ok(cost, " cost failed");
		console.log("Has a Cost Value in WEI :  " + cost)

		console.log(" ")
		console.log("***PURCHASE OF TOKENS***")
		console.log("--- CASE 1 : Manager Purchases (No Burn No Stake Fee's) ---")

		let numToBuy = 1000;
		await token.methods.buy(numToBuy).send({ from: accounts[0], gas: '4000000' });
		console.log("Owner purchased : " + numToBuy + " Tokens")
		let newtotalSupply = await token.methods.totalSupply().call();
		let tokenBalance0 = await token.methods.balanceOf(accounts[0]).call();
		var t = parseFloat(numToBuy) + parseFloat(totalSupply)
		maxSupplyNew = await token.methods.maxSupply().call();
		assert(t == newtotalSupply, "New total supply not correct for owner purchase.");
		assert(maxSupply == maxSupplyNew, "Max supply changed for owner purchase when it shouldnt have. (No burn)");
		console.log("totalSupply and max supply updated correctly : " + newtotalSupply + " : " + maxSupply)
		assert(tokenBalance0 == numToBuy, "Token balance for purchaser not correct");
		console.log("Accounts 0 bought correct amount of tokens : " + tokenBalance0)
		let circulatingSupply = await token.methods.circulatingSupply().call()

		await token.methods.faucet().send({
			from: accounts[0]
		})
		newtokenBalance0 = await token.methods.balanceOf(accounts[0]).call();
		assert(parseFloat(newtokenBalance0) - parseFloat(tokenBalance0) == 25, " Faucet did not update user balance to 25")
		console.log("Faucet 25 tokens updated owner wallet. newtokenBalance0 : " + newtokenBalance0)

		newMaxSupply = await token.methods.maxSupply().call()
		assert(maxSupply - newMaxSupply == 1, "Max supply decreased more than 1 when faucet called")
		maxSupply = newMaxSupply;
		let newCirculatingSupply = await token.methods.circulatingSupply().call()
		assert(parseFloat(newCirculatingSupply) == parseFloat(circulatingSupply) + 26)
		circulatingSupply = newCirculatingSupply
		console.log('circulatingSupply increased by by 26 (25 owner + 1stake) when hitting faucet. circulatingSupply : ' + circulatingSupply)
		console.log('maxSupply decreased by 1 when hitting faucet.  maxSupply : ' + maxSupply)

		// CASE 2
		console.log("")
		console.log("--- CASE 2 : Normal User Purchases (+1 Burn +1 Stake Fee's) ---")

		let price = numToBuy * cost;
		console.log('price = ' + price)
		await token.methods.buy(numToBuy).send({ from: accounts[1], value: price, gas: 100000 });
		console.log('circulatingSupply before : ' + circulatingSupply)

		let tokenBalance1 = await token.methods.balanceOf(accounts[1]).call();
		assert(tokenBalance1 == numToBuy, "Account 1 did not buy : " + numToBuy + " tokens.")
		console.log("Normal User purchased : " + tokenBalance1 + " Tokens")
		newCirculatingSupply = await token.methods.totalSupply().call()
		assert(newCirculatingSupply == (parseFloat(circulatingSupply) + parseFloat(numToBuy) + 1), "numToBuy +1 staking did not happen in transaction...")
		console.log("newCirculatingSupply is now " + circulatingSupply + " + " + numToBuy + " + 1 token stake fee. TotalSuppy : " + newCirculatingSupply + " Tokens")
		circulatingSupply = newCirculatingSupply

		let newmaxSupply = await token.methods.maxSupply().call()
		assert(parseFloat(maxSupply) - parseFloat(newmaxSupply) == 1, "max supply did NOT decrease by 1.")
		console.log('maxSupply DID DECREASE BUY ONE for transaction burn. newmaxSupply : ' + newmaxSupply)


		console.log(" ")
		console.log("***STAKING OF TOKENS***")
		console.log("--- CASE 1 : Regular User Stakes 1000. ---")
		let contractBalance = await token.methods.balanceOf(token.options.address).call()
		tokenBalance1 = await token.methods.balanceOf(accounts[1]).call()
		console.log('contractBalance  before ' + contractBalance)
		console.log('tokenBalance1  before ' + tokenBalance1)

		await token.methods.createStake(tokenBalance1 - 2).send({
			from: accounts[1],
			gas: '4000000'
		});
		newtokenBalance1 = await token.methods.balanceOf(accounts[1]).call()
		newContractBalance = await token.methods.balanceOf(token.options.address).call()
		console.log("newtokenBalance1 : " + newtokenBalance1)
		console.log("newContractBalance : " + newContractBalance)
		//+ 98
		// 1001001 ==            1000002 +       1000
		assert(newContractBalance == (parseFloat(contractBalance) + parseFloat(tokenBalance1) - 1), "Contract Staking pool did not update correctly.")
		console.log("Contract Staking pool updated correctly.")

		assert(newtokenBalance1 == 0, "Did not clear users balance when staking all tokens.")
		console.log("newtokenBalance1 is now 0 because sent all to staking pool")

		let usersStakedTokens = await token.methods.stakeOf(accounts[1]).call()
		console.log('usersStakedTokens   ' + usersStakedTokens)
		console.log("tokenBalance1 : " + tokenBalance1)
		assert(usersStakedTokens == (parseFloat(tokenBalance1) - 2), "Did not clear users balance when staking all tokens.")
		console.log("usersStakedTokens is now staking " + usersStakedTokens + " Tokens. 1 got burned 1 got sent to community fund.")
		tokenBalance1 = newtokenBalance1

		await token.methods.distributeRewards().send({
			from: accounts[0]
		})
		console.log("MANAGER distributes reward. (1% of staked tokens)")
		let stakingrewards = await token.methods.rewardOf(accounts[1]).call()

		assert(stakingrewards == Math.floor((parseInt(usersStakedTokens) / 100)))
		console.log("Normal user can now withdraw stakingrewards " + stakingrewards + "  - (1 burn + 1 stake fee.)")



		await token.methods.withdrawReward().send({
			from: accounts[1]
		})
		let newStakingrewards = await token.methods.rewardOf(accounts[1]).call()
		console.log("newStakingrewards " + newStakingrewards)
		assert(newStakingrewards == 0, "Staking rewards not subtracted.")
		let balanceOfUser = await token.methods.balanceOf(accounts[1]).call()
		console.log("balanceOfUser " + balanceOfUser)

		assert(balanceOfUser == (stakingrewards - 2), "Collection of rewards didnt burn1 and keep 1 and transfer")
		console.log("User did receive rewards. balanceOfUser " + balanceOfUser + " (1burn and 1 stake tax.)")
		stakingrewards = newStakingrewards
		usersStakedTokens = await token.methods.stakeOf(accounts[1]).call()
		console.log("usersStakedTokens   : " + usersStakedTokens)

		console.log("User Remove Stake. usersStakedTokens " + usersStakedTokens + " (1 token burn fee)")

		await token.methods.removeStake(usersStakedTokens).send({
			from: accounts[1]
		})

		let newUsersStakedTokens = await token.methods.stakeOf(accounts[1]).call()
		assert(newUsersStakedTokens == 0, "Didnt remove all staked tokens.")


		let newUserBalance = await token.methods.balanceOf(accounts[1]).call()

		assert(newUserBalance == (parseInt(balanceOfUser) + parseInt(usersStakedTokens) - 1), "Didnt remove all staked tokens.")
		console.log("newUserBalance after balanceOfUser +  usersStakedTokens -1  " + (parseInt(balanceOfUser) + parseInt(usersStakedTokens)) + " -1 = " + newUserBalance + " (1 burn to withdraw)")
		console.log("*Stake, Reward, Collect Reward, and Unstake SUCCESSFUL!*")



		console.log("")
		console.log("***OWNER ONLY LOGIC***")
		NonAdminCanCallRenounceOwnerShip = true
		try {
			await token.methods.renounceOwnership().send({
				from: accounts[1]
			})
		} catch (error) {
			NonAdminCanCallRenounceOwnerShip = false;
		}
		assert(NonAdminCanCallRenounceOwnerShip == false, "Non admin should not be able to call renounceOwnership()")
		console.log("Regular user can NOT renounceOwnership of contract. onlyOwner. ");


		NonAdminCanCallTransferOwnerShip = true
		try {
			await token.methods.transferOwnership(accounts[1]).send({
				from: accounts[1]
			})
		} catch (error) {
			NonAdminCanCallTransferOwnerShip = false;
		}
		assert(NonAdminCanCallTransferOwnerShip == false, "Non admin should not be able to call transferOwnership()")
		console.log("Regular user can NOT TransferOwnerShip of contract. onlyOwner. ");


		NonAdminCanSetCost = true
		try {
			await token.methods.setCost(100000).send({
				from: accounts[1]
			})
		} catch (error) {
			NonAdminCanSetCost = false;
		}
		assert(NonAdminCanSetCost == false, "Non admin should not be able to call setCost()")
		console.log("Regular user can NOT setCost of token. onlyOwner. ");


		NonAdminCanDistributeReward = true
		try {
			await token.methods.distributeRewards().send({
				from: accounts[1]
			})
		} catch (error) {
			NonAdminCanSetCost = false;
		}
		assert(NonAdminCanSetCost == false, "Non admin should not be able to call distributeRewards()")
		console.log("Regular user can NOT distributeRewards of token. onlyOwner. ");

		NonAdminCanDistributeReward = true
		try {
			await token.methods.withdrawEthFromContractToOwner().send({
				from: accounts[1]
			})
		} catch (error) {
			NonAdminCanSetCost = false;
		}
		assert(NonAdminCanSetCost == false, "Non admin should not be able to call withdrawEthFromContractToOwner()")
		console.log("Regular user can NOT withdrawEthFromContractToOwner. onlyOwner. ");

	});

});


