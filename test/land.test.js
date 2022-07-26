const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require('hardhat')
const { expect, assert } = require( "chai" );

describe( "Land registry Test Suite", async () => {
  let assetList = [];
    const deployFixture = async () => {
        const LandContract = await ethers.getContractFactory( "LandRegistration" );
        const [ owner, addr1, addr2, addr3 ] = await ethers.getSigners();
        const landcontract = await LandContract.deploy();
      await landcontract.deployed();
      
      
        console.log( "landregistration Contract adddress:", landcontract.address );
        return { landcontract, owner, addr1, addr2, addr3 };
    }
  it( "should set right owner", async () => {
    const { landcontract, owner } = await loadFixture( deployFixture );
    expect( await landcontract.Deployer() ).to.equal( owner.address );
       
  } );

  it( "should make manager", async () => {
    const { landcontract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );

    const addManager = await landcontract.addManager( owner.address, "south" );
    await addManager.wait();
    console.log( "added successfully" );
    
  })
   
    it( "Should register Land ", async () => {
        
      const { landcontract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
      
      let testVal = ['kaduna', "south", "kaduna", "total", 50, owner.address, 100 ]
       const createEvent = await landcontract.connect( owner ).register( testVal[ 0 ], testVal[ 1 ], testVal[ 2 ], testVal[ 3 ], testVal[ 4 ], testVal[ 5 ],testVal[ 6] );
      await createEvent.wait();
      // assetList.push( {state: } )
     
      
    } )
  it( "should Generate Unique Number and check owner", async () => {
    const { landcontract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
      
      let testVal = ['kaduna', "south", "kaduna", "total", 50, owner.address, 100 ]
       const createEvent = await landcontract.connect( owner ).register( testVal[ 0 ], testVal[ 1 ], testVal[ 2 ], testVal[ 3 ], testVal[ 4 ], testVal[ 5 ],testVal[ 6] );
    await createEvent.wait();
    const generateNumber = await landcontract.connect( owner ).calculateNumber( testVal[ 4 ], testVal[ 2 ], testVal[ 1 ], testVal[ 0 ] );
   
    expect( generateNumber ).to.be.eq( 5144053833767 );
    const returnOwner = await landcontract.connect( owner ).Owner( 5144053833767 );
    // expect( returnOwner).to.be.eq(["kaduna", "south", "kaduna",50,true,])

  } )
  it( "view asset", async () => {
    
  })
  it( "should purchase land", async () => {
    
  } )
  it( "should remove ownership", async () => {
    console.log("heyyy")
  })
    
    });
