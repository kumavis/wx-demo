import 'Token.sol';

contract SimpleMarket {
    
    struct Order {
        address creator;
        address offerToken;
        uint256 offerAmount;
        address wantToken;
        uint256 wantAmount;
    }

    mapping ( uint256 => Order ) orders;
    uint256 nextOrderId = 1;

    event OrderPlaced(address indexed _offerToken, uint256 _offerAmount, address indexed _wantToken, uint256 _wantAmount);
    event OrderCanceled(uint256 indexed _orderId);
    event OrderTraded(bytes32 indexed currencyPair, address indexed seller, uint256 offerAmount, address indexed buyer, uint256 wantAmount);

    function placeOrder(address _offerToken, uint256 _offerAmount, address _wantToken, uint256 _wantAmount) returns (uint256 _orderId) {
        if (Token(_offerToken).sendCoinFrom(msg.sender, _offerAmount, this)) {
            _orderId = nextOrderId;
            nextOrderId += 1;
            orders[_orderId].creator = msg.sender;
            orders[_orderId].offerToken = _offerToken;
            orders[_orderId].offerAmount = _offerAmount;
            orders[_orderId].wantToken = _wantToken;
            orders[_orderId].wantAmount = _wantAmount;
            OrderPlaced(_offerToken, _offerAmount, _wantToken, _wantAmount);
        }
        else _orderId = 0;
    }

    function cancelOrder(uint256 _orderId) {
        Token(orders[_orderId].offerToken).sendCoin(orders[_orderId].offerAmount, orders[_orderId].creator);
        orders[_orderId].creator = 0;
        orders[_orderId].offerToken = 0;
        orders[_orderId].offerAmount = 0;
        orders[_orderId].wantToken = 0;
        orders[_orderId].wantAmount = 0;
        OrderCanceled(_orderId);
    }

    function claimOrder(uint256 _orderId) returns (bool _success) {
        if (Token(orders[_orderId].wantToken).sendCoinFrom(msg.sender, orders[_orderId].wantAmount, orders[_orderId].creator)) {
            Token(orders[_orderId].offerToken).sendCoin(orders[_orderId].offerAmount, msg.sender);
            bytes32 currencyPair = bytes32(((uint256(orders[_orderId].offerToken) / 2**32) * 2**128) + (uint256(orders[_orderId].wantToken) / 2**32));
            orders[_orderId].creator = 0;
            orders[_orderId].offerToken = 0;
            orders[_orderId].offerAmount = 0;
            orders[_orderId].wantToken = 0;
            orders[_orderId].wantAmount = 0;
            OrderTraded(currencyPair, orders[_orderId].creator, orders[_orderId].offerAmount, msg.sender, orders[_orderId].wantAmount);
            _success = true;
        }
        else _success = false;
    }

    //
    // state dumping
    //

    function _getOrderCount() constant returns (uint256 orderCount) { return nextOrderId-1; }

    // Order struct manual destructuring
    function _getCreator(uint256 _orderId)     constant returns (address result){ result = orders[_orderId].creator;     }
    function _getOfferToken(uint256 _orderId)  constant returns (address result){ result = orders[_orderId].offerToken;  }
    function _getOfferAmount(uint256 _orderId) constant returns (uint256 result){ result = orders[_orderId].offerAmount; }
    function _getWantToken(uint256 _orderId)   constant returns (address result){ result = orders[_orderId].wantToken;   }
    function _getWantAmount(uint256 _orderId)  constant returns (uint256 result){ result = orders[_orderId].wantAmount;  }

}