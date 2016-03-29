import async from 'async';
import Web3 from 'web3';
import Pudding from 'ether-pudding';
import SimpleMarket from '../truffle/environments/development/contracts/SimpleMarket.sol';
import EYuan from '../truffle/environments/development/contracts/EYuan.sol';
import WxStock from '../truffle/environments/development/contracts/WxStock.sol';

// wrangle web3 stuff
if (typeof web3 !== 'undefined') {                            
  window.web3 = new Web3(web3.currentProvider);               
} else {                                                      
  // Use the provider from the config.                        
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
}
// load pudding contracts
Pudding.setWeb3(window.web3);
Pudding.load([SimpleMarket, EYuan, WxStock], window);

web3.eth.getAccounts(function(err, accounts){
  web3.eth.defaultAccount = accounts[0]
})

// load contracts
var simpleMarket = window.simpleMarket = SimpleMarket.deployed()
var eYuan = window.eYuan = EYuan.deployed()
var wxStock = window.wxStock = WxStock.deployed()

// dump contract state
console.log(simpleMarket.address)
dumpMarketState(function(err, state){
  console.log('market state:', state)
})

function dumpMarketState(cb){
  simpleMarket._getOrderCount.call().then(function(result){
    var orderCount = result.toNumber()
    console.log('order count:', orderCount)
    async.times(orderCount, function(index, next){
      var id = index+1
      getOrder(id, next)
    }, cb);
  })
}

function getOrder(id, cb){
  async.parallel({
    creator: pToCb(simpleMarket._getCreator(id)),
    offerToken: pToCb(simpleMarket._getOfferToken(id)),
    offerAmount: pToCb(simpleMarket._getOfferAmount(id)),
    wantToken: pToCb(simpleMarket._getWantToken(id)),
    wantAmount: pToCb(simpleMarket._getWantAmount(id)),
  }, function(err, result){
    // console.log('loaded order:', id, result)
    cb(err, result)
  })
}

module.exports = function() {
  const store = createStore()
  return store
}



function createStore(){
  return {
    createOffer,
  }
}

window.getBalanceEYuan = getBalanceEYuan
function getBalanceEYuan(){
  eYuan.coinBalance.call().then(function(result){
    console.log('balance eYuan:', result.toNumber())
  })
}

window.getBalanceWxStock = getBalanceWxStock
function getBalanceWxStock(){
  wxStock.coinBalance.call().then(function(result){
    console.log('balance wxStock:', result.toNumber())
  })
}

window.allowWxStockWithdrawal = allowWxStockWithdrawal
function allowWxStockWithdrawal(){
  wxStock.approveOnce(simpleMarket.address, 50)
  .then(function(result){
    console.log('success:', result)
  })
}

window.checkWxStockWithdrawal = checkWxStockWithdrawal
function checkWxStockWithdrawal(){
  wxStock.isApprovedOnceFor(web3.eth.defaultAccount, simpleMarket.address)
  .then(function(result){
    console.log('approved:', result.toNumber())
  })
}

window.createOffer = createOffer
function createOffer(){
  simpleMarket.placeOrder(
    // sell
    wxStock.address, 50,
    // buy
    eYuan.address, 1000
  ).then(function(result){
    console.log('success!')
  })
}


// util

function pToCb(promise){
  return function(cb){
    promise
    .then(function(result){ cb(null, result) })
    .error(function(error){ cb(error) })
  }
}