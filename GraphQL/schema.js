//const {gql} = require('apollo-server');

/*
	orders Query defines a list i.e full order responses or the top 40 bids and asks
	Input 1 represents the top 40 bids and asks, Input 2 represents the full lists of all bids 
	and asks 
*/
const typeDefs = `
	#The OrderBook fields GraphQL representation.
	type OrderBook {
		side:String!
		quantity:String!
		price:String!
		currencyPair:String!,
		orderCount:Int!
	}

	#A Currency fields GraphQL representation.
	type Currency {
		symbol:String!
		isActive:Boolean!
		shortName:String!
		longName:String!
		decimalPlaces:String!
		withdrawalDecimalPlaces:Int!
	}

	#The CurrencyPair fields GraphQL representation.
	type CurrencyPair {
		symbol: String!
    	baseCurrency: String!
   		quoteCurrency: String!
    	shortName: String!
    	active: Boolean!
    	minBaseAmount: String!
    	maxBaseAmount: String!
    	minQuoteAmount: String!
    	maxQuoteAmount: String!
    	tickSize: String!
    	baseDecimalPlaces: String!
	} 

	#The OrderType fields GraphQL representation.
	type OrderType{
		currencyPair:String!
		orderTypes:[String]!
	}

	#The MarketSummary fields GraphQL representation.
	type MarketSummary{
		currencyPair: String!
	    askPrice: String!
	    bidPrice: String!
	    lastTradedPrice: String!
	    previousClosePrice: String!
	    baseVolume: String!
	    highPrice: String!
	    lowPrice: String!
	    created: String!
	    changeFromPrevious: String!
	}

	#The MarketSummary fields GraphQL representation.
	type ServerTime {
		epochTime: Int!
		time: String!
	}

	#The VALRstatus fields GraphQL representation.
	type VALRStatus {
		status: String!
	}

	#The TradeHistory fields GraphQL representation.
	type TradeHistory {	
	    price: String!
	    quantity: String!
	    currencyPair: String!
	    tradedAt: String!
	    takerSide: String!
	    sequenceId: Int!
	    id: String!
	    quoteVolume: String!
	}

	#All the GraphQL Queries will be available here.
	type Query {
		#Represents a list of OrderBooks.The orders Query defines a list of full order Bids and Asks or a top 40 list of Bids and Asks.
		#
		# The URL https://api.valr.com/v1/public/:currencyPair/orderbook can be executed as follows: orders(category:1,currencyPair:"BTCZAR"),
		# and the URL https://api.valr.com/v1/public/:currencyPair/orderbook/full can be executed as follows: orders(category:2,currencyPair:"BTCZAR").
		#
		# Supported currencyPair types can be found on the official VALR documentation. 
		orders(category:Int!,currencyPair:String!):[OrderBook]!
		
		#Get a list of currencies supported by VALR.
		currencies:[Currency]!
		
		#Get a currency by symbol or shortName or longName,the currency should be supported by VALR.
		currency(symbol:String,shortName:String,longName:String):Currency!

		#Get a list of all the currency pairs supported by VALR.
		currencyPairs:[CurrencyPair]!

		#Get all the order types supported for all currency pairs.
		#
		#An array of currency pairs is returned along with an array of order types for each currency pair. You can only place an order that is supported by that currency pair.
		orderTypes:[OrderType]!
		
		#Get the order types supported for a given currency pair.
		#
		#An array of order types is returned. You can only place an order that is listed in this array for this currency pair.
		orderTypesByCurrencyPair(currencyPair:String!):OrderType!
		
		#Get the market summary for all supported currency pairs.
		marketSummary:[MarketSummary]!

		#Get the market summary for a given currency pair.
		marketSummaryByCurrencyPair(currencyPair:String!):MarketSummary!

		#Get the server time. Please note: The server time is returned in seconds.
		serverTime:ServerTime!

		#Get the current status of VALR.
		#
		#May be "online" when all functionality is available, or "read-only" when only GET and OPTIONS requests are accepted. All other requests in read-only mode will respond with a 503 error code.
		VALRstatus:VALRStatus!

		#Get the trade history for a given currency pair.
		tradeHistory(currencyPair:String!,skip:Int!,limit: Int!):[TradeHistory]!
	}
`;

module.exports = typeDefs;