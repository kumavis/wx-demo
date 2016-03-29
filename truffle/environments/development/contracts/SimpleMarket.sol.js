// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"}],"name":"claimOrder","outputs":[{"name":"_success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"uint256"}],"name":"_getWantAmount","outputs":[{"name":"result","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"}],"name":"cancelOrder","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"uint256"}],"name":"_getOfferToken","outputs":[{"name":"result","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"uint256"}],"name":"_getOfferAmount","outputs":[{"name":"result","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"uint256"}],"name":"_getWantToken","outputs":[{"name":"result","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_offerToken","type":"address"},{"name":"_offerAmount","type":"uint256"},{"name":"_wantToken","type":"address"},{"name":"_wantAmount","type":"uint256"}],"name":"placeOrder","outputs":[{"name":"_orderId","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"uint256"}],"name":"_getCreator","outputs":[{"name":"result","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"_getOrderCount","outputs":[{"name":"orderCount","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_offerToken","type":"address"},{"indexed":false,"name":"_offerAmount","type":"uint256"},{"indexed":true,"name":"_wantToken","type":"address"},{"indexed":false,"name":"_wantAmount","type":"uint256"}],"name":"OrderPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_orderId","type":"uint256"}],"name":"OrderCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currencyPair","type":"bytes32"},{"indexed":true,"name":"seller","type":"address"},{"indexed":false,"name":"offerAmount","type":"uint256"},{"indexed":true,"name":"buyer","type":"address"},{"indexed":false,"name":"wantAmount","type":"uint256"}],"name":"OrderTraded","type":"event"}],
    binary: "606060405260018055610785806100166000396000f3606060405236156100775760e060020a60003504633a3f823981146100795780633af364b2146103fa578063514fcac7146104215780637305b4b3146105d15780638795196714610603578063aa0716441461061d578063afe1841314610640578063e855f39814610759578063fdc9bf7e14610779575b005b61040f6004356000818152602081815260408220805460038201546004929092015460e160020a6333f5733902606090815233600160a060020a03908116606490815260849390935292831660a452859493909216926367eae6729260c4928187876161da5a03f115610002575050604051511590506103f4576000600050600084815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031663c86a90fe6000600050600086815260200190815260200160002060005060020160005054336040518360e060020a0281526004018083815260200182600160a060020a03168152602001925050506020604051808303816000876161da5a03f1156100025750505060405180519060200150506401000000006000600050600085815260200190815260200160002060005060030160009054906101000a9004600160a060020a0316600160a060020a0316046401000000006000600050600086815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a0316047001000000000000000000000000000000000201600102905060006000600050600085815260200190815260200160002060005060000160006101000a815481600160a060020a030219169083021790555060006000600050600085815260200190815260200160002060005060010160006101000a815481600160a060020a03021916908302179055506000600060005060008581526020019081526020016000206000506002016000508190555060006000600050600085815260200190815260200160002060005060030160006101000a815481600160a060020a03021916908302179055506000600060005060008581526020019081526020016000206000506004016000508190555033600160a060020a03166000600050600085815260200190815260200160002060005060000160009054906101000a9004600160a060020a0316600160a060020a0316827f6578106262dae040a96573f5165e1a16811257422dcd4c533d86690bd4bd54f860006000506000888152602001908152602001600020600050600201600050546000600050600089815260200190815260200160002060005060040160005054604051808381526020018281526020019250505060405180910390a4600191505b50919050565b60048035600090815260208190526040902001545b60408051918252519081900360200190f35b610077600435600081815260208181526040822080546002820154600192909201547fc86a90fe000000000000000000000000000000000000000000000000000000006060908152606493909352600160a060020a03918216608452169263c86a90fe9260a49290916044908290876161da5a03f11561000257505050604051805190602001505060006000600050600083815260200190815260200160002060005060000160006101000a815481600160a060020a030219169083021790555060006000600050600083815260200190815260200160002060005060010160006101000a815481600160a060020a03021916908302179055506000600060005060008381526020019081526020016000206000506002016000508190555060006000600050600083815260200190815260200160002060005060030160006101000a815481600160a060020a030219169083021790555060006000600050600083815260200190815260200160002060005060040160005081905550807fc41f4ceb2938876c35e61b705e9d2f18a02c4a26ce5e049a6308a943d46851b360405180905060405180910390a250565b600435600090815260208190526040902060010154600160a060020a03165b600160a060020a03166060908152602090f35b60043560009081526020819052604090206002015461040f565b600435600090815260208190526040902060030154600160a060020a03166105f0565b61040f60043560243560443560643560e160020a6333f5733902606090815233600160a060020a039081166064908152608486905230821660a452600092918716916367eae6729160c4916020918187876161da5a03f115610002575050604051511590506107515760408051600180548082018255808552602085815294849020805473ffffffffffffffffffffffffffffffffffffffff1990811633178255928101805484168b1790556002810189905560038101805490931688179092556004919091018590558682529281018490528151600160a060020a0386811693908916927ffd76c6965c2093a2d25ce325d3b12e92d3c64e257ae0d2d8eda4c33eb358fad4929081900390910190a35b949350505050565b600435600090815260208190526040902054600160a060020a03166105f0565b6001546000190161040f56",
    unlinked_binary: "606060405260018055610785806100166000396000f3606060405236156100775760e060020a60003504633a3f823981146100795780633af364b2146103fa578063514fcac7146104215780637305b4b3146105d15780638795196714610603578063aa0716441461061d578063afe1841314610640578063e855f39814610759578063fdc9bf7e14610779575b005b61040f6004356000818152602081815260408220805460038201546004929092015460e160020a6333f5733902606090815233600160a060020a03908116606490815260849390935292831660a452859493909216926367eae6729260c4928187876161da5a03f115610002575050604051511590506103f4576000600050600084815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a031663c86a90fe6000600050600086815260200190815260200160002060005060020160005054336040518360e060020a0281526004018083815260200182600160a060020a03168152602001925050506020604051808303816000876161da5a03f1156100025750505060405180519060200150506401000000006000600050600085815260200190815260200160002060005060030160009054906101000a9004600160a060020a0316600160a060020a0316046401000000006000600050600086815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316600160a060020a0316047001000000000000000000000000000000000201600102905060006000600050600085815260200190815260200160002060005060000160006101000a815481600160a060020a030219169083021790555060006000600050600085815260200190815260200160002060005060010160006101000a815481600160a060020a03021916908302179055506000600060005060008581526020019081526020016000206000506002016000508190555060006000600050600085815260200190815260200160002060005060030160006101000a815481600160a060020a03021916908302179055506000600060005060008581526020019081526020016000206000506004016000508190555033600160a060020a03166000600050600085815260200190815260200160002060005060000160009054906101000a9004600160a060020a0316600160a060020a0316827f6578106262dae040a96573f5165e1a16811257422dcd4c533d86690bd4bd54f860006000506000888152602001908152602001600020600050600201600050546000600050600089815260200190815260200160002060005060040160005054604051808381526020018281526020019250505060405180910390a4600191505b50919050565b60048035600090815260208190526040902001545b60408051918252519081900360200190f35b610077600435600081815260208181526040822080546002820154600192909201547fc86a90fe000000000000000000000000000000000000000000000000000000006060908152606493909352600160a060020a03918216608452169263c86a90fe9260a49290916044908290876161da5a03f11561000257505050604051805190602001505060006000600050600083815260200190815260200160002060005060000160006101000a815481600160a060020a030219169083021790555060006000600050600083815260200190815260200160002060005060010160006101000a815481600160a060020a03021916908302179055506000600060005060008381526020019081526020016000206000506002016000508190555060006000600050600083815260200190815260200160002060005060030160006101000a815481600160a060020a030219169083021790555060006000600050600083815260200190815260200160002060005060040160005081905550807fc41f4ceb2938876c35e61b705e9d2f18a02c4a26ce5e049a6308a943d46851b360405180905060405180910390a250565b600435600090815260208190526040902060010154600160a060020a03165b600160a060020a03166060908152602090f35b60043560009081526020819052604090206002015461040f565b600435600090815260208190526040902060030154600160a060020a03166105f0565b61040f60043560243560443560643560e160020a6333f5733902606090815233600160a060020a039081166064908152608486905230821660a452600092918716916367eae6729160c4916020918187876161da5a03f115610002575050604051511590506107515760408051600180548082018255808552602085815294849020805473ffffffffffffffffffffffffffffffffffffffff1990811633178255928101805484168b1790556002810189905560038101805490931688179092556004919091018590558682529281018490528151600160a060020a0386811693908916927ffd76c6965c2093a2d25ce325d3b12e92d3c64e257ae0d2d8eda4c33eb358fad4929081900390910190a35b949350505050565b600435600090815260208190526040902054600160a060020a03166105f0565b6001546000190161040f56",
    address: "0x0927d297af01d2f14f55f2d067e690cd83188599",
    generated_with: "2.0.6",
    contract_name: "SimpleMarket"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("SimpleMarket error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("SimpleMarket error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("SimpleMarket error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("SimpleMarket error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.SimpleMarket = Contract;
  }

})();
