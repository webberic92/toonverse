//              (%%                               %&(/      // TOONVERSE STUDIOS PRESENTS!
//             (((            */%%#.              #&(/(     // THE DEVILCATS $TOON STAKING CONTRACT.
//            #*#*       ./#/(%%***/**,,,       .(%%/(.     // ARTIST: KEITH (GIP) MILLER.
//            ,*//.,   ,,##(#%(*/(((((((*//   .*#&#((*      // DEV: ERIC (SudoAkula) WEBB.
//             ,.,*..*/,#*#/%(,,*(#(######**/(##/*/*        // RULES: ONE $TOON A DAY WILL BE REWARED UNTIL 1,235,813 ARE CLAIMED.
//               ..*/(,*(/(#%.,,*///((/*** ,,,.,*,          // LEGAL: HOLDS NO FINANCIAL VALUE, STRICTLY FOR THE LOVE OF ART & BLOCKCHAIN
//                 ,(*./,#,(*..,********,,..   .                  /#**/#
//                 *,. ..,,*,.,*/(((///***,,,,,                     /(.
//                ,,.(//,,/((.((((*///#./**#.**.,                   /#,
//                  *,,**/(((((#####((((((//*,,.       /*******, .   (,
//                 %((,(%&%%%%&#(,/(((/%#%/(./*,       ,***********( //.
//                 %#,(((/&##%%(,/(((((*%%# . ,,       ,**************/, *
//                 %%,(#,(/#(%#/,( . ((*&%#**,,.   ,  ,,**************/*******.
//                  %,(  ((%*(#,,(/  ((*&%(..,,.  @(   ,,,,,/,,...,***/*,*******
//               & &##,  ((#**(,./(  (/,%#/..,.%%&.  *,,,,,.          ,,.*********
//               .@*&#,.,../*,**.,*  *,,#(/*((%/,@. .,,,,,,,,#(,      /*,(@&@******..
//                (@,#,*////*. .*(%&%%&@@/*(&#*@.&&...*(########* #%(@/(..@@%&@******,*,
//                ,*#&(.     . %@@@@&&@@@@&%/&#@// ,**/(##((//**( ((#&&(, @@@@@@********.,
//                  ,*%@%*,.,./#%&&%@@@@@&#,%/%#,,,**//***,,,,,,,***/%(#%%@@(#%    *******.,
//                 *  ./@@@&#(/#%%%(*///  *##*.*******,,.          ,,*(#%@@@(&%#    *******,.,
//                  @@/ * ,. ..  /*##(%#&,#,(((((,..**               ,,**//,**       ,,,,,,,,,,,*
//                   &&# /&* %* #&#,,/&*#,%%%%%%/,,,..                    ..            ,,,,,,,,%%%%&&%%%%%&&##%%
//                    . &@*,*&***/.,,.  ########%/,,*,....                ,.              ,,*%%%#(...       .#%%&%%
//                           ,,       ###%%#((####%. .,**..*(**///*.(      ,,             %#%(/.......        #%%%%%%
//                                  .%##,%#(/((####( .  , ###/,&&@&  #.,,,,,,,...     ##(#/*    ........            #%
//           **/(%%               */##*/#(,** /(,######%%%&#%(&%%%,*%.,,,,,,........,**,,.   ...........
//        &@%/#/**,             (. ##/.#/* , *.///((,####%%%%%%%%%%%.,,,.,,.,,,........     .. .........
//      #/@@@@@@@%@@@         .(*.(,* ** ,.  ..,,.*.,*(,###########.,,.,,..,,,......               . .
//     @@&%#%&@@%@@(///,  ,//(/,##/(/,   ,.    ...,,**.*,/*,*#####...,,,....,,.,.                .
//     (*@@@@@&%&###### #.#*%%%%. **,     .       ...,,*,,,, */(....,,,,,,,,.,                 ,
//      (#%%%%(((##/#%# %#(.%#(/*,                  ........,,,......,,.....                 .
//      */*,,,,../*((((((((//**           ..        ,,,,,,..........,. ..               .,.
//     #%&&%//,.                          ,         ,,,,,,,,,,,...    .            .
//    /%%%%%%((*,                                 ,.********,,,,,                .
//    *(*%///**/(                                  **********
//    ***#%****(                                   ,/****/,
//    /(,*///**                                    //////
//   ///*/*(/*,                                     //,
//  (**/*#(%//
//   /#%&%%&&#                                    .

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol";

contract $TOON is ERC20Burnable, Ownable {
    using SafeMath for uint256;

    ERC721A public devilCatzNft;

    uint256 public cost = 0.0005 ether;
    event Bought(uint256 amount);
    uint256 public maxSupply = 1235813;
    uint256 public stakedNfts = 0;
    uint256 public rewardsTime = 86400;

    bool public nftStakingPaused = false;
    bool public rewardsCollectionPaused = false;
    mapping(address => mapping(uint256 => uint256)) public nftStakersWithTime;
    mapping(address => uint256[]) private nftStakersWithArray;
    mapping(address => uint256) public rewardsInWei;

    constructor() payable ERC20("$TOON", "$TOON") {
        _mint(address(this), 935813);
        _mint(0x1aBC6efe814F2766003d0c4AA5496B9b0EBC6eA3, 150000);
        _mint(0x4538C3d93FfdE7677EF66aB548a4Dd7f39eca785, 150000);
        devilCatzNft = ERC721A(0x1c4a28690482b03F6991C8c24295016cba197C12);
    }

    function getUsersStakedNfts(address _staker)
        public
        view
        returns (uint256[] memory)
    {
        return nftStakersWithArray[_staker];
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function circulatingSupply() public view returns (uint256) {
        return (this.totalSupply() - balanceOf(address(this)));
    }

    function setMaxSupply(uint256 _amount) public onlyOwner {
        require(
            circulatingSupply() < _amount,
            "Cant set new total supply less than old supply."
        );
        maxSupply = _amount;
    }

    function setNftStakingPaused(bool _b) public onlyOwner {
        nftStakingPaused = _b;
    }

    function setRewardsCollectionPaused(bool _b) public onlyOwner {
        rewardsCollectionPaused = _b;
    }

    function buy(uint256 _quantity) public payable {
        require(_quantity > 0, "Quantity needs to be greater than 1");
        require(
            balanceOf(address(this)) > _quantity,
            "Not enough left in contract to buy.."
        );
        uint256 totalCostEth = _quantity * cost;
        require(msg.value >= totalCostEth, "Did not send enough ETH");
        _transfer(address(this), msg.sender, _quantity);
        emit Bought(_quantity);
    }

    function withdrawEthFromContract(uint256 _amount) public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: _amount}("");
        require(os);
    }

    function withdrawToonFromContract(uint256 _amount)
        public
        payable
        onlyOwner
    {
        _transfer(address(this), owner(), _amount);
    }

    function sendToonFromConract(address addy, uint256 _amount)
        public
        payable
        onlyOwner
    {
        _transfer(address(this), addy, _amount);
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function burn(uint256 _amount) public virtual override {
        _burn(_msgSender(), _amount);
        maxSupply -= _amount;
    }

    function stakeNft(uint256 _tokenID) public {
        require(!nftStakingPaused, "Staking NFTs is currently paused.");
        require(
            nftStakersWithTime[msg.sender][_tokenID] == 0,
            "This token already staked."
        );
        devilCatzNft.transferFrom(msg.sender, address(this), _tokenID);
        nftStakersWithTime[msg.sender][_tokenID] = block.timestamp;
        stakedNfts += 1;
        nftStakersWithArray[msg.sender].push(_tokenID);
    }

    function stakeMultipleNfts(uint256[] calldata _nftIds) public {
        require(!nftStakingPaused, "Staking NFTs is currently paused.");
        for (uint256 i = 0; i <= _nftIds.length - 1; i++) {
            require(
                devilCatzNft.ownerOf(_nftIds[i]) == msg.sender,
                "Not all of those NFTs are in your current wallet."
            );

            devilCatzNft.transferFrom(msg.sender, address(this), _nftIds[i]);
            nftStakersWithTime[msg.sender][_nftIds[i]] = block.timestamp;
            stakedNfts += 1;
            nftStakersWithArray[msg.sender].push(_nftIds[i]);
        }
    }

    function potentialAllStakedNftReward(address _addy)
        public
        view
        returns (uint256)
    {
        uint256[] memory nfts = getUsersStakedNfts(_addy);
        uint256 intDate = 0;
        uint256 subtracted = 0;
        uint256 utilToken = 0;

        for (uint256 i = 0; i < nfts.length; i++) {
            if (nftStakersWithTime[_addy][nfts[i]] != 0) {
                intDate = nftStakersWithTime[_addy][nfts[i]];
                subtracted = block.timestamp - intDate;
                utilToken += subtracted / rewardsTime;
            }
        }
        return utilToken * 1;
    }

    function potentialStakedNftReward(address _addy, uint256 _tokenID)
        public
        view
        returns (uint256)
    {
        require(
            nftStakersWithTime[_addy][_tokenID] != 0,
            "This token not staked."
        );
        uint256 intDate = nftStakersWithTime[_addy][_tokenID];
        uint256 subtracted = block.timestamp - intDate;
        uint256 tokens = subtracted / rewardsTime;
        return tokens * 1;
    }

    function collectStakedNftReward(address _addy, uint256 _tokenID) public {
        require(!nftStakingPaused, "Staking NFTs is currently paused.");
        require(
            nftStakersWithTime[_addy][_tokenID] != 0,
            "This token not staked."
        );
        require(
            potentialStakedNftReward(_addy, _tokenID) != 0,
            "You dont have enough to claim."
        );

        uint256 tokens = potentialStakedNftReward(_addy, _tokenID);
        _transfer(address(this), _addy, tokens);
        nftStakersWithTime[_addy][_tokenID] = block.timestamp;
    }

    function collectMultipleStakedNftReward(uint256[] calldata _nftIds) public {
        require(
            !rewardsCollectionPaused,
            "Collecting Rewards is currently paused."
        );

        for (uint256 i = 0; i <= _nftIds.length-1; i++) {
            require(
                nftStakersWithTime[msg.sender][_nftIds[i]] != 0,
                "Not all those tokens are staked."
            );
        collectStakedNftReward(msg.sender, _nftIds[i]);

        }

    }

    function removeStakedNft(uint256 _stakedNFT) public {
        require(
            nftStakersWithTime[msg.sender][_stakedNFT] != 0,
            "Cant Unstake something your not staking."
        );
        devilCatzNft.transferFrom(address(this), msg.sender, _stakedNFT);
        nftStakersWithTime[msg.sender][_stakedNFT] = 0;
        stakedNfts -= 1;

        uint256[] storage tempArray = nftStakersWithArray[msg.sender];
        for (uint256 i = 0; i < tempArray.length; i++) {
            if (tempArray[i] == _stakedNFT) {
                if (i >= tempArray.length) return;

                for (uint256 j = i; j < tempArray.length - 1; j++) {
                    tempArray[j] = tempArray[j + 1];
                }
                tempArray.pop();
                nftStakersWithArray[msg.sender] = tempArray;
            }
        }
    }

    function removeMultipleStakedNft(uint256[] calldata _nftIds) public {
        for (uint256 k = 0; k <= _nftIds.length - 1; k++) {
            require(
                nftStakersWithTime[msg.sender][_nftIds[k]] != 0,
                "Cant Unstake something your not staking."
            );
            removeStakedNft(_nftIds[k]);

        }

    }
}
