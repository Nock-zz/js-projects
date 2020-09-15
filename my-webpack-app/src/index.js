import {Contract, Wavelet} from "wavelet-client";
import JSBI from 'jsbi';

const BigInt = JSBI.BigInt;


let contract;
let consensus;
let wallet;
let walletAddress;
let nodeInfo;
let send_message;
let account;
//account is an object {account_id: "01fdcd2a7aadc4d746bb17a39e98416a86382f7c383b5bdf0778960ecfc45761", balance: 701177, event: "balance_updated", time: "2019-07-21T01:00:14Z"}
let accounts;
//accounts is a Websocket object: WebSocket {url: "wss://testnet.perlin.net/poll/accounts?id=01fdcd2a…746bb17a39e98416a86382f7c383b5bdf0778960ecfc45761", readyState: 1, bufferedAmount: 0, onopen: ƒ, onerror: ƒ, …}

let host = 'https://testnet.perlin.net';
let client // = new Wavelet(host);
let privateKey = "924b7d25ab23d363b1cc20617a03b6218959c492311aa93d9cdb9d56740bd71b01fdcd2a7aadc4d746bb17a39e98416a86382f7c383b5bdf0778960ecfc45761";
let contractAddress = "abfbe62a90d663d983f9c5b65b67d5acabf05f5ce8ede0181fe9924265a52aad" // original but now replaced with "abf.." "9f549686e464b2addfdcd5061deeeb7c622ea430c5f93ddaf5cf8a8f114f8b65" //nm "e9f2ad605ba8816bae31bcf4e68d6a15e374a48f3ae4c8f0df1b851d56ebfaab";
let message = '';
let chatLogs = [];
let sockets = {accounts: undefined, consensus: undefined};

let contractAccount;


function setNodeInfo(_await_client_getNodeInfo) {
    nodeInfo = _await_client_getNodeInfo;
}

function setAccount(_await_client_getAccount) {
    account = _await_client_getAccount;
}

function setContractAccount(_await_client_getContractAccount) {
    contractAccount = _await_client_getContractAccount;
}

function setClient(_client) {
    client = _client;
}

function setContract(_contract) {
    contract = _contract;
}

function setContractAddress(_contractAddress) {
    contract = _contractAddress;
}

function setAccounts(_accounts) {
    accounts = _accounts;
}

function setMessage(_message) {
    message = _message;
}

function setChatLogs(_chatLogs) {
    chatLogs = _chatLogs;
}

function setSockets(_sockets) {
    sockets = _sockets;
}


const reset = () => {
    setClient(undefined);
    setAccount(undefined);
    setNodeInfo(undefined);

    setContract(undefined);
    setContractAddress('');

	setAccounts(undefined);
    setMessage('');
    setChatLogs([]);



    if (sockets.accounts) {
      sockets.accounts.close(1000, 'connection closing normally');
    }

    if (sockets.consensus) {
      sockets.consensus.close(1000, 'connection closing normally');
    }

    setSockets({ accounts: undefined, consensus: undefined });
  };








const connect = async () => {
	console.log('000client000', client);
    if (client === undefined) {

	try {
    console.log('111client111', client);
	client = new Wavelet(host); // new Wavelet('https://testnet.perlin.net');    //new Wavelet(host);
	console.log('client0', client);

	await setNodeInfo((async function() {
    	try { let nodeInfo = await client.getNodeInfo();
          console.log('getNodeInfo', 'ok', nodeInfo);
          nodeId.textContent = nodeInfo.public_key;

    	return nodeInfo;
    	}
    	catch(err)  {
                  console.log('getNodeInfo', 'error:', err);
                 }
   		}
   		)()
	);

	const contract = new Contract(client, contractAddress);
	await contract.init();

	wallet = Wavelet.loadWalletFromPrivateKey(privateKey);
	walletAddress = Buffer.from(wallet.publicKey).toString('hex');
    console.log('walletAddress', walletAddress);
	await setAccount(await client.getAccount(walletAddress));
    console.log('account', account);
    yourBalance.textContent = account.balance + ' PERLs';

	setClient(client);
    console.log('client1', client);



	accounts = await client.pollAccounts(
          {
            onAccountUpdated: msgs => {
			console.log(msgs);
            let msgsArray = [msgs];

            msgsArray.forEach(msg => {console.log('msg::', msg);});
            // Strangely although we use msgs we seem to loop and deal with one message at a time so msg is more appropriate
            // On Poll msgs received when onAccountUpdate occurs : the accounts websocket object gets updated with the new balance
                switch (msgs.event) {
                  case 'balance_updated': {
                      setAccount({ ...account, balance: msgs.balance});
 //                   account.balance = msgs.balance ;
                    console.log('account with new balance', account);
                    break;
                  }
                  default: {
                    break;
                  }
                }
            }
          },
          { id: walletAddress } // we have to give our wallet address as information for the pollAccounts
        );

     setSockets(sockets);

      } catch (error) {
        console.log('catch triggered')
        reset();
        alert(error);
      }
    } else {
        console.log('else triggered')
      reset();
    }
  };

const load = async () => {

    client = new Wavelet(host);
    console.log('client3', client);
    // set the contractAccount
    setContractAccount(await client.getAccount(contractAddress));
	console.log('ContractAccount', contractAccount);
  contractGasBalance.textContent = contractAccount.gas_balance + ' PERLs';

    const wallet = Wavelet.loadWalletFromPrivateKey(privateKey);

    // Initialize

    if (chatContractAddress.value) {contractAddress = chatContractAddress.value;}
    const contract = new Contract(client, contractAddress);
    await contract.init();

    // Every single time consensus happens on Wavelet, query for the latest
    // chat logs by calling 'get_messages()' on the smart contract.

    sockets.consensus = await client.pollConsensus({
      onRoundEnded: _ => {
        if (contract === undefined) {
          return;
        }

        (async () => {
		  await contract.fetchAndPopulateMemoryPages();
          setChatLogs(contract.test(wallet, 'get_messages', BigInt(0)).logs);
		  //setChatLogs(chatLogs[0].split(/\n/));
        console.log('ChatLogs', chatLogs);
        chatMessages.textContent = chatLogs[0];

        })();
      }
    });

    //Here we get the contract gas balance
	sockets.contract = await client.pollAccounts(
            {
                onAccountUpdated: msg => {
                    switch (msg.event) {
                        case 'gas_balance_updated': {
                            setContractAccount({...contractAccount, gas_balance: msg.gas_balance});
                            console.log('ContractAccount with new gas_balance', contractAccount);
                            contractGasBalance.textContent = contractAccount.gas_balance + ' PERLs';
							break;
                        }
                        default: {
                            break;
                        }
                    }
                }
            },
            {id: contractAddress}
        );



    // Here - e.g. on initial load - we call for the chatLogs without asking for a consensus
    setSockets(sockets);
    setChatLogs(contract.test(wallet, 'get_messages', BigInt(0)).logs);
    console.log('ChatLogs::End:', chatLogs);

	//setChatLogs(chatLogs[0].split(/\n/));
	console.log('split chatLog::Without Consensus', chatLogs);
  chatMessages.textContent = chatLogs[0];
	setContract(contract);
  };

  const sendMessage = async () => {
    const wallet = Wavelet.loadWalletFromPrivateKey(privateKey);
    const contract = new Contract(client, contractAddress);
    await contract.init();
	console.log('contract::before sendMessage contract.call',contract);
    await contract.call(wallet, 'send_message', BigInt(0), BigInt(250000), BigInt(0), {
      type: 'string',
      value: message
    });

    setMessage('');
  };


// setMessage('250111');
// (async function () {
// await connect();
// sendMessage();
// load();
// console.log('client1 after sending message',client);
// })();




/**
  return (
    <>
      <h1 className="text-center title">
        A decentralized chat written in JavaScript + Rust (WebAssembly).
      </h2>
      <Box className="text-center" mb={4}>
        Powered by <a href="https://wavelet.perlin.net">Wavelet</a>. Click{' '}
        <a href="https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52">here</a> to learn how it works, and{' '}
        <a href="https://github.com/perlin-network/decentralized-chat">here</a>{' '}
        for the source code. Join our{' '}
        <a href="https://discord.gg/dMYfDPM">Discord</a> to get PERLs.
      </Box>
      <Flex mb={2} alignItems="center">
        <Box flex="0 0 150px">
          <label>[secret]</label>
        </Box>
        <Box flex="1">
          <input
            type="text"
            value={privateKey}
            disabled={client}
            data-lpignore="true"
            onChange={evt => setPrivateKey(evt.target.value)}
          />
        </Box>
      </Flex>

      <Flex mb={2} alignItems="center">
        <Box flex="0 0 150px">
          <label>[node]</label>
        </Box>
        <Box flex="1">
          <Flex width={1}>
            <Box width={9 / 12}>
              <input
                type="text"
                value={host}
                disabled={client}
                data-lpignore="true"
                onKeyPress={async e => {
                  if (e.key === 'Enter') {
                    await connect();
                  }
                }}
                onChange={evt => setHost(evt.target.value)}
              />
            </Box>
            <Box width={3 / 12} style={{ minWidth: '10em' }} ml={2}>
              <button
                style={{ width: '100%' }}
                onClick={connect}
                disabled={privateKey.length !== 128}
              >
                {client ? 'Disconnect' : 'Connect'}
              </button>
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Flex mb={4} alignItems="center">
        <Box flex="0 0 150px">
          <label>[contract]</label>
        </Box>
        <Box flex="1">
          <Flex width={1}>
            <Box width={9 / 12}>
              <input
                type="text"
                value={contractAddress}
                placeholder="input chat smart contract address..."
                disabled={!client}
                data-lpignore="true"
                onKeyPress={async e => {
                  if (e.key === 'Enter') await load();
                }}
                onChange={evt => setContractAddress(evt.target.value)}
              />
            </Box>
            <Box width={3 / 12} style={{ minWidth: '10em' }} ml={2}>
              <button
                style={{ width: "100%" }}
                disabled={!client || contractAddress.length !== 64}
                onClick={load}
              >
                Load Contract
              </button>
            </Box>
          </Flex>
        </Box>
      </Flex>

      <Flex mb={2} alignItems="center">
        <Box flex="0 0 150px">
          <label>[node id]</label>
        </Box>
        <Box flex="1" style={{ minWidth: 0 }}>
        style={{ height: "98%" }}
          <span
            className="truncate"
            title={`${node && node.public_key ? node.public_key : '???'}`}
          >{`${node && node.public_key ? node.public_key : '???'}`}</span>
        </Box>
      </Flex>

      <Flex mb={2} alignItems="center">
        <Box flex="0 0 150px">
          <label>[your id]</label>
        </Box>
        <Box flex="1" style={{ minWidth: 0 }}>
          <span
            className="truncate"
            title={`${
              account && account.public_key ? account.public_key : '???'
              }`}
          >{`${
            account && account.public_key ? account.public_key : '???'
            }`}</span>
        </Box>
      </Flex>

      <Flex mb={4} alignItems="center">
        <Box flex="0 0 150px">
          <label>[balance]</label>
        </Box>
        <Box flex="1">
          <span>{`${
            account && account.balance ? account.balance : 0
            } PERL(s)`}</span>
        </Box>
      </Flex>

      <Flex mb={3}>
        <Box flex="1" pr={2}>
          <textarea
            disabled={!client || !contract}
            value={message}
            placeholder="enter a message..."
            maxLength={240}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                if (
                  account.balance >= 250000 &&
                  message.length > 0 &&
                  message.length <= 240
                ) {
                  sendMessage();
                } else {
                  e.preventDefault();
                }
              }
            }}
            onChange={evt => setMessage(evt.target.value)}
            className="fw"
          />
        </Box>
        <Box flex="0 0 220px">
          <button
            className="fw"
            disabled={
              !client ||
              !contract ||
              !account ||
              account.balance < 250000 ||
              message.length === 0
            }
            onClick={sendMessage}
          >
            Send Message [250,000 PERLs]
          </button>
        </Box>
      </Flex>

      <textarea
        disabled={!client || !contract}
        className="fw"
        rows={35}
        readOnly
        placeholder="no messages here so far chief..."
        value={chatLogs.length === 1 ? chatLogs[0] : ''}
      />
    </>
  );
};

***/






/*
console.log('wallet', wallet);
console.log('wallet address', walletAddress);


*/



//await contract.call(
//  wallet,
//  'send_message',
//  JSBI.BigInt(0),
//  JSBI.BigInt(250000),
//  {type: "string", value: "Your chat message here!"},
//);
//

/*****
(async () => {
    await contract.init();
//        nodeInfo = await fetchNodeInfo();
//        setNodeInfo(await client.getNodeInfo());

    await setNodeInfo((async function() {
    try { let result = await client.getNodeInfo();
          console.log('getNodeInfo', 'ok', result);
    return result;
    }
    catch(err)  {
                  console.log('getNodeInfo', 'error:', err);
                 }
    }
    )()
    );

//    await client.pollConsensus({
//    onRoundEnded: msg => {
//        (async () => {
//            await contract.fetchAndPopulateMemoryPages();
//            console.log(msg);
//            console.log("Chat logs updated:", contract.test('get_messages', BigInt(0)));
//        })();
//    }
//    });

})();
*****/


// document.addEventListener("DOMContentLoaded", function(event) {
//   const element = document.createElement('h1')
//   element.innerHTML = "Hello World 2"
//   document.body.appendChild(element)
// })


let secretButton = document.querySelector('div.secret button');
let secretInput = document.querySelector('div.secret input');
secretButton.addEventListener('click',() => {
    secretInput.value = privateKey;
     });

let nodeButton = document.querySelector('div.node button');
let nodeId = document.querySelector('div.node-id span');
let yourBalance = document.querySelector('div.your-balance span');

secretButton.addEventListener('click',() => {
    connect();
     });

let loadContractButton = document.querySelector('div.contract button');
let chatContractAddress = document.querySelector('div.contract input');
let contractGasBalance = document.querySelector('div.contract-gas-balance span');

loadContractButton.removeAttribute('disabled');

loadContractButton.addEventListener('click',() => {
    load();
     });


let enterMessageContent = document.querySelector('div.message input.fw');
let enterMessageButton = document.querySelector('div.message button');

enterMessageButton.removeAttribute('disabled');

enterMessageButton.addEventListener('click',() => {
    console.log('enterMessageContent', enterMessageContent );
    if (enterMessageContent.value) {
      message = enterMessageContent.value;
      sendMessage()
    } else {
      alert('message must not be null');
    }
     });

let chatMessages = document.querySelector('div.chat-messages textarea');

chatMessages.removeAttribute('disabled');






function make_async(name, content) {
console.log(`
(async function() {
    try { let result = ${content};
          console.log('${name}', 'ok', result);
          return result;
    }
    catch(err)  {
                  console.log('${name}', 'error:', err);
                 }
    }
)()`);
};

//make_async('getNodeInfo', 'await client.getNodeInfo()');

//make_async(send_message, "await contract.call( wallet, 'send_message', \n JSBI.BigInt(0),  JSBI.BigInt(250000), \n {type: 'string', value: 'First chat message here!'}\n,)");




/*
(async function() {
await contract.init();
await client.pollConsensus({
    onRoundEnded: msg => {
        (async () => {
            await contract.fetchAndPopulateMemoryPages();
			console.log(msg);
            console.log("Chat logs updated:", contract.test('get_messages', BigInt(0)));
        })();
    }
});
})();
*/

// load
//
