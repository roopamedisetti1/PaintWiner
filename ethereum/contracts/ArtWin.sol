pragma solidity ^0.4.24;



//this will be our address.
contract ArtWineFactory {

    address[] public deployedArtWine;

    //type specifies whether it is Art or wine
    function createArtWine(string expectedType) public {
        //msg.sender is the user who creates the Art or Winery Contract
        address newArtWine = new ArtWine(msg.sender, expectedType);

        deployedArtWine.push(newArtWine);

    }

    function getDeployedArtWine() public view returns (address[])
    {
        return deployedArtWine;
    }

}

//actual contract created by Artist or Winery

contract ArtWine {

     address public contractOwner;
     //winery or art
     string ttype;

     struct Painting {
         string title;
         string picture;
         string description;
         uint256 amt;
     }

     //collection of all arts.
     Painting[] public arts;


    //maaping from token ID to owner
     mapping (uint => address) public artToOwner;

     //mapping from owner to list of owned token IDs
     mapping (address => uint256[]) public ownerArtCount;


      function ArtWine(address creator, string expectedType) public {
         contractOwner = creator;
          ttype = expectedType;
       }

      //This function creates the painting with given details.
      function createPainting(string title, string picture, string description, uint256 amt)  public {
         require(msg.sender.balance >= .01 ether);
          uint id = arts.push(Painting(title, picture, description, amt )) - 1;
          artToOwner[id] = msg.sender;
          ownerArtCount[msg.sender].push(id);

      }

      function tokenOf(address _owner) public view returns (uint256[]) {
          return ownerArtCount[_owner];
      }

      function getPaintingCount() public view returns (uint)
      {
         return arts.length;
      }


}
