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
pragma solidity^0.8.11;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "solidity/coin/imports/reentrancyGuard.sol";
                                                                                                                             
contract TOON is ERC20Burnable, Ownable,ReentrancyGuard{   
    using SafeMath for uint256;

    ERC721Enumerable public devilCatzNft;
    // address constant public devilCatzNftAddress = 0x1c4a28690482b03F6991C8c24295016cba197C12; PRODUCTION
    address constant public devilCatzNftAddress = 0x2181eF3E8Fe13216FADf664334a8368eeba9A8D9;//DEV

    

    uint256 public cost = 0.000001 ether;
    event Bought(uint256 amount);
    uint256 public maxSupply = 1235813; //1,026,459
    uint256 public circulatingSupply = 0;
    uint256 public stakedNfts = 0;

    bool public nftStakingPaused = true;
    mapping(address => mapping(uint256 => uint256)) public nftStakersWithTime;
    mapping(address => uint256[]) private nftStakersWithArray;
    mapping(address => uint256) public rewardsInWei;

    constructor() ERC20("$TOON", "$TOON") payable {
        //MINT TO ME
        //MINT TO HIM
        //MINT TO THIS ADDRESS
        _mint(address(this), 5);
        devilCatzNft = ERC721Enumerable(devilCatzNftAddress);

    }


    function decimals() public view virtual override returns (uint8) {
        return 0;
    }


    function setMaxSupply(uint256 _amount) public onlyOwner {
        require(circulatingSupply < _amount, "Cant set new total supply less than old supply.");
        maxSupply = _amount;
    }


    function setNftStakingPaused(bool _b) public onlyOwner {
        nftStakingPaused = _b;
    }

    function buy(uint _quantity) payable public {

        require(_quantity > 0, "Quantity needs to be greater than 1");
        require(circulatingSupply + _quantity <= maxSupply,"Not enough left to mint that amount.");
        uint256 totalCostEth = _quantity * cost;
        if (msg.sender != owner()) {
            require(msg.value >= totalCostEth, "Did not send enough ETH");
        }
        _mint(msg.sender, _quantity);
        circulatingSupply +=_quantity;
        emit Bought(_quantity);          
    }


    function withdrawEth(uint256 _amount) public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: _amount}("");
        require(os);
    }

    function withdrawToon(uint256 _amount) public payable onlyOwner {
    _transfer(address(this),owner(),_amount);
    }

    function setCost(uint256 _newCost) public  onlyOwner {
        cost = _newCost;
    }

    function burn(uint256 _amount) public virtual  override {
        _burn(_msgSender(), _amount);
        maxSupply -= _amount;
        circulatingSupply -= _amount;
    }

   
    function stakeNft(uint256 _tokenID) public  {
        require(!nftStakingPaused, "Staking NFTs is currently paused.");
        require(nftStakersWithTime[msg.sender][_tokenID] == 0,"This token already staked.");
        devilCatzNft.transferFrom(msg.sender,address(this),_tokenID);
        nftStakersWithTime[msg.sender][_tokenID] = block.timestamp;
        stakedNfts +=1;
        nftStakersWithArray[msg.sender].push(_tokenID);
    }

    function getUsersStakedNfts(address _staker) public view returns( uint256[] memory) {
        return nftStakersWithArray[_staker];
    }

    function potentialAllStakedNftReward(address _addy) public view returns (uint256){
        uint256[] memory nfts = getUsersStakedNfts(_addy);
        uint256 intDate = 0;
        uint256 subtracted = 0;
        uint256 utilToken = 0;

        for(uint256 i = 0; i < nfts.length; i++){
            if(nftStakersWithTime[_addy][nfts[i]]!= 0){
              intDate = nftStakersWithTime[_addy][nfts[i]];
              subtracted = block.timestamp - intDate;
              utilToken += subtracted / 3600 ;
            }

        }
        return utilToken*1;
     }

    function potentialStakedNftReward(address _addy,uint256 _tokenID) public view returns (uint256){
        require(nftStakersWithTime[_addy][_tokenID]!= 0,"This token not staked.");
        uint256 intDate = nftStakersWithTime[_addy][_tokenID];
        uint256 subtracted = block.timestamp - intDate;
        uint256 tokens = subtracted / 3600;
        return tokens*1;
    
     }

    function collectAllStakedNftReward(address _addy) public  {
                require(!nftStakingPaused, "Staking NFTs is currently paused.");
                 uint256 sumOfNFTRewards =   potentialAllStakedNftReward(_addy); 
                 _transfer(address(this),_addy, sumOfNFTRewards);

                    uint256[] memory nfts = getUsersStakedNfts(_addy);
                    for(uint256 i = 0; i < nfts.length; i++){
                        nftStakersWithTime[_addy][nfts[i]]= block.timestamp;
                    }
    }

    function collectStakedNftReward(address _addy, uint256 _tokenID ) public nonReentrant  {

        require(!nftStakingPaused, "Staking NFTs is currently paused.");
        require(nftStakersWithTime[_addy][_tokenID]!= 0,"This token not staked.");
        require(potentialStakedNftReward(_addy,_tokenID)!= 0,"You dont have enough to claim.");

        uint256 tokens =potentialStakedNftReward(_addy,_tokenID);
        _transfer(address(this),_addy,tokens);
        nftStakersWithTime[_addy][_tokenID]= block.timestamp;  
    }

    function removeStakedNft(uint256 _stakedNFT) public {
           require(nftStakersWithTime[msg.sender][_stakedNFT] !=0,"Cant Unstake something your not staking.");
            devilCatzNft.transferFrom(address(this),msg.sender,_stakedNFT);
            nftStakersWithTime[msg.sender][_stakedNFT] = 0; 
            stakedNfts-=1;

            uint256[] storage tempArray =  nftStakersWithArray[msg.sender];
        for (uint256 i = 0; i < tempArray.length; i++){
            if(tempArray[i]== _stakedNFT){

              if (i >= tempArray.length) return;

                    for (uint j = i; j<tempArray.length-1; j++){
                        tempArray[j] = tempArray[j+1];
                    }
                tempArray.pop();
                nftStakersWithArray[msg.sender] = tempArray;
            }
        }  
    }

}
