const axios =require('axios');
const BASE_URL = 'https://api.valr.com/v1/';

const resolvers ={
	Query:{
		orders:async (parent,args,context,info) =>{
			try{
				let res;
				let response = [];
				switch(args.category){
					case 1:
						res = await axios.get(BASE_URL+`public/`+args.currencyPair+`/orderbook`)
						if(res.data.Asks){
							res.data.Asks.forEach(ask =>{
								response.push(ask)
							})
						}

						if(res.data.Bids){
							res.data.Bids.forEach(bid =>{
								response.push(bid)
							})
						}

						return response;
						break;
					case 2:
						res = await axios.get(BASE_URL+`public/`+args.currencyPair+`/orderbook/full`)
						response = []
						if(res.data.Asks){
							res.data.Asks.forEach(ask =>{
								response.push(ask)
							})
						}

						if(res.data.Bids){
							res.data.Bids.forEach(bid =>{
								response.push(bid)
							})
						}

						return response;
						break;
					default:
						throw new Error('Category option selected is not valid')
				}
			}catch(err){
				throw err;
			}
		},
		currencies:async () =>{
			try{
				const res = await axios.get(BASE_URL+`/public/currencies`)
				return res.data
			}catch(err){
				throw err;
			}
		},
		currency:async (parent,args,context,info) =>{
			try{
				if(!(args.symbol || args.longName || args.shortName)){
					throw new Error('Input at least one field');
				}

				const res = await axios.get(BASE_URL+`/public/currencies`);
				for(let i = 0 ; i < res.data.length; i++){
					if(args.symbol){
						if(res.data[i].symbol.toUpperCase() === args.symbol.toUpperCase()){
							return res.data[i];
						}
					}

					if(args.longName){
						if(res.data[i].longName.toUpperCase() === args.longName.toUpperCase()){
							return res.data[i];
						}
					}

					if(args.shortName){
						if(res.data[i].shortName.toUpperCase() === args.shortName.toUpperCase()){
							return res.data[i];
						}
					}
				}

				throw new Error('The currency is not supported by VALR.')
			}catch(err){
				throw err;
			}
		},
		currencyPairs:async () =>{
			try{
				const res = await axios.get(BASE_URL+`/public/pairs`);
				return res.data;
			}catch(err){
				throw err;
			}
		},
		orderTypes:async () =>{
			try{
				const res = await axios.get(BASE_URL+`/public/ordertypes`);
				return res.data;
			}catch(err){
				throw err;
			}
		},
		orderTypesByCurrencyPair: async (parent,args,context,info) =>{
			try{	
				const res = await axios.get(BASE_URL+`/public/`+args.currencyPair+`/ordertypes`);
				if(!res.data.length){
					throw new Error('No order type exists on VALR for the currencyPair provided.')
				}

				let response = res.data
				return {
					currencyPair:args.currencyPair,
					orderTypes:response
				}
			}catch(err){
				throw err;
			}
		},
		marketSummary:async () =>{
			try{
				const res = await axios.get(BASE_URL+`/public/marketsummary`);
				return res.data;
			}catch(err){
				throw err;
			}
		},
		marketSummaryByCurrencyPair: async (parent,args,context,info) => {
			try{	
				const res = await axios.get(BASE_URL+`/public/`+args.currencyPair+`/marketsummary`);
				if(!res.data){
					throw new Error('No market summary exists on VALR for the currencyPair provided.')
				}

				return res.data				
			}catch(err){
				throw err;
			}
		},
		serverTime: async () =>{
			try{
				const res = await axios.get(BASE_URL+`/public/time`);
				return res.data;
			}catch(err){
				throw err;
			}
		},
		VALRstatus: async () =>{
			try{
				const res = await axios.get(BASE_URL+`/public/status`);
				return res.data;
			}catch(err){
				throw err;
			}	
		},
		tradeHistory:async (parent,args,context,info) => {
			try{
				const res = await axios.get(BASE_URL+`/public/`+args.currencyPair+`/trades?skip=`+args.skip+`&limit=`+args.limit);
				return res.data;
			}catch(err){
				throw err;
			}
		}
	}
}

module.exports = resolvers;