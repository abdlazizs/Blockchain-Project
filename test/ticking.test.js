const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require('hardhat')
const { expect, assert } = require( "chai" );

// let ticketContract, contract, owner, addr1, addr2, addr3;

describe( "Ticketing Contract Test Suite", async () => {
  let events = [];
  let event_id_list = [];
 
  
  
  const deployFixture = async () => {
    const ticketContract = await ethers.getContractFactory( "Ticketing" );
    const [ owner, addr1, addr2, addr3 ] = await ethers.getSigners();
    const contract = await ticketContract.deploy();
    await contract.deployed();
    console.log( "Ticket Contract adddress:", contract.address );
    return { contract, owner, addr1, addr2, addr3 };
  };
  it( "should create event and checks for emmiited events", async () => {
    
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );

    let deadline = Math.round( new Date( "2022-07-28" ).getTime() / 1000 );
    testVal = [ 'concert', [ 100 ], [ 1 ], true, 5, deadline, owner.address ];
    const createEvent = await contract.connect( owner ).createEvent( "concert", [ 100 ], [ 1e16.toString() ], true, 5, deadline );
    await createEvent.wait();
    console.log( "owner address:___", owner.address );
    events.push( { event_id: "concert", num_tickets: 100, ticket_price: 1e16, per_customer_limit: true, max_per_customer: 4, owner: owner, deadline: deadline, event_id_list: event_id_list.length } );
    
    await expect( createEvent )
      .to.emit( contract, 'event_created' )
      .withArgs( owner.address, "concert" );
    console.log( "______________Event Emitted Succesfully" );

    console.log( events[ 0 ].event_id );
    
    
    
  } );
  it( "should Add another Event and delete first event", async () => {
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
    let deadline = Math.round( new Date( "2022-07-28" ).getTime() / 1000 );
    const createEvent2 = await contract.connect( addr1 ).createEvent( "colab", [ 50 ], [ 1e16.toString() ], true, 5, deadline );
    await createEvent2.wait();
    console.log( "owner address:___", addr1.address );
    events.push( { event_id: "colab", num_tickets: 50, ticket_price: 1e16, per_customer_limit: true, max_per_customer: 4, owner: owner, deadline: deadline, event_id_list: event_id_list.length } );
    
    await expect( createEvent2 )
      .to.emit( contract, 'event_created' )
      .withArgs( addr1.address, "colab" );
    console.log( "______________Event2 Emitted Succesfully" );

    console.log( events[ 1 ].event_id );
    
  } );
  it( "should add ticket", async () => {
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
    
  } )
  it( "should stop and continue sale", async () => {
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
    
  } )
  it( "should change ticket price", async () => {
    const { contract, owner, addr1, addr2, addr3 } = await loadFixture( deployFixture );
    
  } )
  it( "should buy ticket", async () => {
    
  } )
  it( "should return ticket", async () => {
    
  })

});