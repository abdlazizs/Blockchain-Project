const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require('hardhat')
const { expect, assert } = require( "chai" );

describe( "Decentralized storage Test Suite", async () => {
    const deployFixture = async () => {
        const DStorageContract = await ethers.getContractFactory( "DStorageDapp" );
        const [ owner, addr1, addr2, addr3 ] = await ethers.getSigners();
        const storageContract = await DStorageContract.deploy();
        await storageContract.deployed();
        console.log( "landregistration Contract adddress:", storageContract.address );
        return { storageContract, owner, addr1, addr2, addr3 };
    }
    it( "Should upload File", async () => {
        
        const { storageContract, addr1 } = await loadFixture( deployFixture );

       let testVal = [ "MyFile", 20, "document", "MyDoc", "problem" ];


        const UploadFile = await storageContract.connect( addr1 ).uploadFile( testVal[ 0 ], testVal[ 1 ], testVal[ 2 ], testVal[ 3 ], testVal[ 4 ] );
        await UploadFile.wait();
        console.log( "owner address:___", addr1.address )
        await expect( UploadFile )
      .to.emit( storageContract, 'FileUploadedEvent' )
      .withArgs( "File Uploaded", addr1.address );
    console.log( "______________Event Emitted Succesfully" );
    } )
  
   it( "Should delete file", async () => {
    const { storageContract, addr1 } = await loadFixture( deployFixture );
    const deleteFile = await storageContract.connect( addr1 ).deleteFile( 0 );
    await deleteFile.wait();
    console.log( "file deleted" );
    
  } )
  
   it( "check total file count", async () => {
    const { storageContract, addr1 } = await loadFixture( deployFixture );
    const checkFiles = await storageContract.connect( addr1 ).getTotalFileCount();
    expect( checkFiles ).to.eq( 0 );
    console.log( "passed" );

    
    
  })
  
    });
