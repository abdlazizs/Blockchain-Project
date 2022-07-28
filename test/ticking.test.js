const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require('hardhat')
const { expect, assert } = require( "chai" );
let num = 20000000000000000n;

// let ticketContract, contract, owner, addr1, addr2, addr3;

describe( "Ticketing Contract Test Suite", async () => {
  let events = [];
  let event_id_list = [];
  let createEvent, createEvent2, contract, buyer
 
  
  
  const deployFixture = async () => {
    const ticketContract = await ethers.getContractFactory( "Ticketing" );
    const [ owner, addr1, addr2, addr3 ] = await ethers.getSigners();
    contract = await ticketContract.deploy();
    await contract.deployed();
    console.log( "Ticket Contract adddress:", contract.address );
    return { contract, owner, addr1, addr2, addr3 };
  };
  it( "should create event and checks for emmiited events", async () => {
    
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );

    let deadline = Math.round( new Date( "2022-07-29" ).getTime() / 1000 );
    testVal = [ 'concert', [ 100 ], [ 1 ], true, 5, deadline, owner.address ];
    createEvent = await contract.connect( owner ).createEvent( "concert", [ 100 ], [ 1e16.toString() ], true, 5, deadline );
    events.push( { createEvent } );
    await createEvent.wait();
    await expect( createEvent )
      .to.emit( contract, 'event_created' )
      .withArgs( owner.address, "concert" );
    console.log( "______________Event Emitted Succesfully" );

    console.log( events[ 0 ].event_id );
    
    
    
  } );
  it( "should Add another Event and buy ticket", async () => {
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
    let deadline = Math.round( new Date( "2022-07-29" ).getTime() / 1000 );
    createEvent2 = await contract.connect( addr1 ).createEvent( "colab", [ 50, 100 ], [ 1e16.toString(), 2000 ], true, 5, deadline );
    events.push( { createEvent2 } );
    await createEvent2.wait();
    await expect( createEvent2 )
      .to.emit( contract, 'event_created' )
      .withArgs( addr1.address, "colab" );
    console.log( "______________Event2 Emitted Succesfully" );

    console.log( "passed here" );

    buyer = addr3;
    let ticketsNumber = 2;

    let purchase = await contract.connect( buyer ).buy_tickets( "colab", 0, ticketsNumber, { value: ethers.utils.parseEther( "1" ) } );
    await purchase.wait();
    console.log( "passed" );

    let getFunds = await contract.connect( addr1 ).view_funds( "colab" );
    
     
    expect( getFunds ).to.eq(num);

  
    
  } );
  it( "should return values when owner calls onlyhost functions", async () => {
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
    
    
    
   
  } );
  it( "should get customers", async () => {
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
    let getCustomers = await contract.connect( owner ).get_customers( "colab" );
    
    expect( getCustomers ).to.be.an( "array" );
  } );
  
  

  it( "Revert when another account call the onlyhost functions", async () => {
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
   

    await expect( contract.connect( addr1 ).stop_sale( "concert" ) ).to.be.reverted;
    
    await expect( contract.connect( addr1 ).continue_sale( "concert" ) ).to.be.reverted;
    
    await expect( contract.connect( addr1 ).view_funds( "concert" ) ).to.be.reverted;
    
    await expect( contract.connect( addr1 ).withdraw_funds( "concert" ) ).to.be.reverted;
    
    await expect( contract.connect( addr1 ).add_tickets( "concert", [ 100 ] ) ).to.be.reverted;
    
    await expect( contract.connect( addr1 ).delete_event( "concert" ) ).to.be.reverted;
    
    await expect( contract.connect( addr1 ).change_ticket_price( "concert", 0, [ 100 ] ) ).to.be.reverted;
    
  } );
 
   

})

