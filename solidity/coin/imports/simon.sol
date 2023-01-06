// SPDX-License-Identifier: MIT
// ██████  ██████   ██████  ████████ ██   ██ ███████ ██████    ███████ ██ ███    ███  ██████  ███    ██ 
// ██   ██ ██   ██ ██    ██    ██    ██   ██ ██      ██   ██   ██      ██ ████  ████ ██    ██ ████   ██ 
// ██████  ██████  ██    ██    ██    ███████ █████   ██████    ███████ ██ ██ ████ ██ ██    ██ ██ ██  ██ 
// ██   ██ ██   ██ ██    ██    ██    ██   ██ ██      ██   ██        ██ ██ ██  ██  ██ ██    ██ ██  ██ ██ 
// ██████  ██   ██  ██████     ██    ██   ██ ███████ ██   ██   ███████ ██ ██      ██  ██████  ██   ████ 
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&((#############(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/@//,@&(####################%@%,//@*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/%(#%(########&(////(@########%##(@(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&/(&(#######&(/*//////(%##########/@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#((#####(#((//*///////(%########%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%(((&@#((((*/*/*/*/*/*/*/((((%@%(##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(@@(((/////(  */*//////,  %////((((@&%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&(@@@/////*//(////*///////*((/////*//@@@(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(#@@@////////%@@@/*//////@@@(/////*/(@@@(#@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@((@@(%%(//////*////%@&#///*///*///#%%/@@(#@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%(&*              %%&#%&              @(#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%#(@*             *@@@@.             &@#%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@%#######@@                              @@#%%%###@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@########@@@       .&@(////%&@        @@@########@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@((#%@(###%##&%@@%        , ..        @@@%%#%%####&%###@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@(#######%&((#%%&%%@%@@@/.        .(@@&%@%%%%%#((@%#######(@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@#(###########%&%&%%%&@&%@%%%%&@&%%%%%&%&@&%%%@&&%###########(&@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@&(#####################%@@@@#########%@@@&######################(@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@(##########################&&&@%/&##&,@@&&%#########################((@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@&&@##########################(#. %(,#  ,&#########################%@&&@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@##%%&&##########%%&&&%#####%#/  ,.   *######%&&&%###########@%%%##@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@#####%&%((((((%#(((((((((@%&,  . &* *  #@%%((((((((#%#((((((%&%#####@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@#################%##########%    .&&    ,#############################@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@###########%&%###########%#%.  ,@%%&.  ,#(%#########################@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@%%%%%###################%%#(,(%%%@@%%&,,@#&#########################@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@######################%&#@%%%%%@%%&%%%%*%#%######################%@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@###################%&#@@#,,*%/%&*/*,,@@%#%%####%%%%&&&&&&&&&%%@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@%%######%###%%#@@@&@@&%%&&%%&&@@@@%#%%##%########%@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@&%%%%@@%######@@&%######@&######%@@%######%@&@@%%@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@#&##%#####%&&%%@####@&#.&@.(&%###%@%%@%%%###&#%@%#@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@#&###&#####%(*,@&@.(%.(/.&.,*.@###%##%##%%&##%#&%%#&@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@#%##%&#####%/*,%(%*#%#.,**/*%&.@@.#######%%%###%%&%#@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@%&###%@#####%/,,#/#%@,%.&/&./.,,*.%#######%%&####&%&#&@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@#%###%@#####&%&....%#,.#..**,,(%&*..,@#####%%%###&%&%%@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@#####%@####%@/,,/*%&#**@%@%%(,%/%%##########%@####%%%#@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@%%####%&####%@/&*((##&..*##%#%/**,,..,%######%%####@%&#@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@#&####%&####%&/,,/*#&,&######################%%%###%%%##@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@&#%####%%####%&/,##############################%&####&%%#@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@#######%######@/*/#############################%@####@%&##@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@%#######&#######################################%&####%%%##&@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@&########&#######################################%&#####&%%##@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@########%########################################%&#####@%%%##@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@#########%########################################%%#####%%%%###@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@#########&#########################################%#######&%%%###@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@#########&##################################################@%%%%##%@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@&#######%###################################################%%%%%%&@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@%###################################################%&@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(,,,*/,,(#*@@@@@@@@@@@@@@@(,&*,,*,,,,#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/(  @( *@ (,*@@@@@@@@@@@@@@,,. @   @  ,%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&@@@@@@@@@@@@@@@@@@@@@@@@&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                                                                                                                                           
pragma solidity^0.8.11;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
                                                                                                                             
contract BrotherSimon is ERC20Burnable, Ownable,ReentrancyGuard{   
    using SafeMath for uint256;

    ERC721Enumerable public erc721Token;
    uint256 public cost = 0.000001 ether;
    event Bought(uint256 amount);
    uint256 public maxSupply = 3000000000;
    uint256 public circulatingSupply = 0;
    uint256 public erc20sStaked = 0;
    uint256 public stakedNfts = 0;
    uint256 public SECONDS_IN_YEAR = 31536000;
    uint256 public APY = .0509*1e18;
    uint256 public TAX = 7; 
    address[] internal stakeholders;
    bool public erc20StakingPaused = true;
    bool public erc721StakingPaused = true;
    mapping(address => uint256) internal erc20StakersArray;
    mapping(address => uint256)   public erc20StakersWithTime;
    mapping(address => mapping(uint256 => uint256)) public nftStakersWithTime;
    mapping(address => uint256[]) private nftStakersWithArray;
    mapping(address => uint256) public rewardsInWei;

    constructor() ERC20("SIMON", "SIMON") payable {
        _mint(address(this), maxSupply/2);
    }

    function transfer(address recipient, uint256 amount) public  nonReentrant virtual override returns (bool) { 
        if (msg.sender != owner()) {
        uint256 taxResult= (amount / 100) * TAX;
        require(balanceOf(msg.sender) >= amount + taxResult, "Not enough balance to transfer with TAX included");
        _transfer(msg.sender,address(this),taxResult);
        }
        _transfer(msg.sender,recipient, amount);
        return true;
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function setErc721address(address _addy) public onlyOwner {
        erc721Token = ERC721Enumerable(_addy);
    }

    function setMaxSupply(uint256 _amount) public onlyOwner {
        require(circulatingSupply < _amount, "Cant set new total supply less than old supply.");
        maxSupply = _amount;
    }

    function setAPY(uint256 _amount) public onlyOwner {
        APY = _amount*10^14;
    }

    function setTAX(uint256 _amount) public onlyOwner {
        TAX = _amount;
    }

    function setErc20StakingPaused(bool _b) public onlyOwner {
        erc20StakingPaused = _b;
    }
    function setErc721StakingPaused(bool _b) public onlyOwner {
        erc721StakingPaused = _b;
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


    function withdrawFromContractToOwner(uint256 _amount) public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: _amount}("");
        require(os);
    }

    function withdrawUtilityToken(uint256 _amount) public payable onlyOwner {
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

   
   function isStakeholder(address _address)public view returns(bool, uint256){                                
        if(_address == address(this)){
        return (true, balanceOf(address(this)) - erc20sStaked);
        }
        for (uint256 s = 0; s < stakeholders.length; s += 1){
            if (_address == stakeholders[s]){
            uint256 stakeOfAddress = stakeOf(stakeholders[s]);
            return (true, stakeOfAddress );
            } 
        }
        return (false, 0);
    }



    function becomeStakeholder() private {
       (bool _isStakeholder, ) = isStakeholder(msg.sender);
       if(!_isStakeholder) stakeholders.push(msg.sender);
    }

    function removeStakeholder() private  {
       (bool _isStakeholder, uint256 s) = isStakeholder(msg.sender);
       if(_isStakeholder){
           stakeholders[s] = stakeholders[stakeholders.length - 1];
           stakeholders.pop();
       }
    }

    function stakeOf(address _stakeholder) public view returns(uint256){
       if(_stakeholder == address(this)){
        return  balanceOf(address(this)) - erc20sStaked;
       }
        return erc20StakersArray[_stakeholder];
    }


    function createStake(uint256 _stake) public {
        require(!erc20StakingPaused, "Staking is currently paused.");
        require(stakeOf(msg.sender) >=100 || _stake >=100, "Minimum stake is 100 tokens.");
        _transfer(msg.sender,address(this), _stake);
        if(erc20StakersArray[msg.sender] == 0){

         becomeStakeholder();   
        erc20StakersWithTime[msg.sender] = block.timestamp;
        erc20StakersArray[msg.sender] = _stake;
        } else{

            rewardsInWei[msg.sender] += calculateDividendsinWei();
            erc20StakersWithTime[msg.sender] = block.timestamp;
            erc20StakersArray[msg.sender] += _stake;

        }
        erc20sStaked += _stake;
    }

    function calculateDividendsinWei() public view returns(uint256) {
        uint256 principal= erc20StakersArray[msg.sender];
        uint256 origStakedTime= erc20StakersWithTime[msg.sender];
        uint256 timeSpentStakingInWei = (((block.timestamp)-origStakedTime)*1e18/SECONDS_IN_YEAR);
        uint256 dividend = principal * (APY) * timeSpentStakingInWei / 1000000000000000000; 
        return dividend;
    }

    function collectStakingReward() public nonReentrant {
        require(!erc20StakingPaused, "Staking is currently paused.");
       if(rewardsInWei[msg.sender] == 0){
        rewardsInWei[msg.sender] = calculateDividendsinWei();
       }  
       if((rewardsInWei[msg.sender]  / 1e18) < 1000000000000000000){
        rewardsInWei[msg.sender] += calculateDividendsinWei();
       }        
       uint256 amountThatCanBeWithdrawn = rewardsInWei[msg.sender]  / 1e18;
       require(amountThatCanBeWithdrawn > 0, "Need atleast 1 to be able to withdraw.");
       _transfer(address(this),msg.sender, amountThatCanBeWithdrawn);
       erc20StakersWithTime[msg.sender] = block.timestamp;
       rewardsInWei[msg.sender] -=  amountThatCanBeWithdrawn*1e18;
    }

    function removeStake(uint256 _stake) public payable nonReentrant {
        if(erc20StakersArray[msg.sender].sub(_stake) == 0){
            _transfer(address(this),msg.sender, _stake);

            erc20StakersArray[msg.sender] = erc20StakersArray[msg.sender].sub(_stake);
            erc20StakersWithTime[msg.sender] = 0;
            removeStakeholder();  
        }else{
            require(erc20StakersArray[msg.sender].sub(_stake) > 99,"Cant have less than 100 in account");
            _transfer(address(this),msg.sender, _stake);
            erc20StakersArray[msg.sender] = erc20StakersArray[msg.sender].sub(_stake);         
           
        }
         erc20sStaked -= _stake;
    }
   
    function stakeNft(uint256 _tokenID) public  {
        require(!erc721StakingPaused, "Staking NFTs is currently paused.");
        require(nftStakersWithTime[msg.sender][_tokenID] == 0,"This token already staked.");
        erc721Token.transferFrom(msg.sender,address(this),_tokenID);
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
                require(!erc721StakingPaused, "Staking NFTs is currently paused.");
                 uint256 sumOfNFTRewards =   potentialAllStakedNftReward(_addy); 
                 _transfer(address(this),_addy, sumOfNFTRewards);

                    uint256[] memory nfts = getUsersStakedNfts(_addy);
                    for(uint256 i = 0; i < nfts.length; i++){
                        nftStakersWithTime[_addy][nfts[i]]= block.timestamp;
                    }
    }

    function collectStakedNftReward(address _addy, uint256 _tokenID ) public nonReentrant  {

        require(!erc721StakingPaused, "Staking NFTs is currently paused.");
        require(nftStakersWithTime[_addy][_tokenID]!= 0,"This token not staked.");
        require(potentialStakedNftReward(_addy,_tokenID)!= 0,"You dont have enough to claim.");

        uint256 tokens =potentialStakedNftReward(_addy,_tokenID);
        _transfer(address(this),_addy,tokens);
        nftStakersWithTime[_addy][_tokenID]= block.timestamp;  
    }

    function removeStakedNft(uint256 _stakedNFT) public {
           require(nftStakersWithTime[msg.sender][_stakedNFT] !=0,"Cant Unstake something your not staking.");
            erc721Token.transferFrom(address(this),msg.sender,_stakedNFT);
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
