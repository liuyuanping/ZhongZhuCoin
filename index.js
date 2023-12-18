// 1. Declare global variable to store the web3 instance
let ZhongZhuCoinContract;
let ZZCFaucetContract;
let accountsList;

// 2. Set contract address and ABI
const ZhongZhuCoin_Contract_Address = "0x640623ed5522Df03d539145eFCE531e18351B959";
const ZZCFaucet_Contract_Address = "0x2DF3830e64a80df7F61d3af3342dc656336E67E8";
const ZhongZhuCoin_Contract_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "numTokens",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "numTokens",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "delegate",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenOwner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const ZZCFaucet_Contract_ABI = [
  {
    "inputs": [],
    "name": "requestTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenContract",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "Receiver",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "Amount",
        "type": "uint256"
      }
    ],
    "name": "SendToken",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "amountAllowed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastRequestTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "year",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "month",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "day",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "hour",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minute",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "second",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
// console.log("ethers start!");
document.querySelector("#ZhongZhuToken-Address").innerText = ZhongZhuCoin_Contract_Address;
document.querySelector("#ZZCFaucet-Address").innerText = ZZCFaucet_Contract_Address;

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then(async (accounts) => {
    accountsList = accounts;
    // console.log("accounts: ");
    // console.log(accountsList);
    let name;
    let symbol;
    let decimals;
    // let totalSupply;
    try {
      const signer = provider.getSigner(accounts[0]);
      ZhongZhuCoinContract = new ethers.Contract(
        ZhongZhuCoin_Contract_Address,
        ZhongZhuCoin_Contract_ABI,
        signer
      );
      name = await ZhongZhuCoinContract.name();
      symbol = await ZhongZhuCoinContract.symbol();
      decimals = await ZhongZhuCoinContract.decimals();
      // totalSupply = await ZhongZhuCoinContract.totalSupply();
    } catch (error) {
      alert("名称、符号查询失败：" + error);
      return;
    }
    document.querySelector("#ZhongZhuToken-Name").innerText = name;
    document.querySelector("#ZhongZhuToken-Symbol").innerText = symbol;
    document.querySelector("#ZhongZhuToken-Decimals").innerText = decimals;
    // document.querySelector("#ZhongZhuToken-TotalSupply").innerText = totalSupply;
  });
});

const balanceOf = async () => {
  const accountInput = document.querySelector("#account-input");
  const account = accountInput.value;
  let balance;
  try {
    balance = await ZhongZhuCoinContract.balanceOf(account);
  } catch (error) {
    alert("余额查询失败：" + error);
    return;
  }
  alert("余额查询成功");
  document.querySelector(".balance-accout").innerText = balance;
};
const balanceOfButton = document.querySelector("#balance-of-btn");
balanceOfButton.addEventListener("click", balanceOf);


const transferTo = async () => {
  try {
    const accountInput = document.querySelector("#account-input");
    const accountTransferToInput = document.querySelector("#account-transfer-to");
    const numberTransferToInput = document.querySelector("#number-transfer-to");
    const account = accountInput.value;
    const accountTransferTo = accountTransferToInput.value;
    const numberTransferTo = numberTransferToInput.value;
    
    const signer = provider.getSigner(account);
    ZhongZhuCoinContract = new ethers.Contract(
      ZhongZhuCoin_Contract_Address,
      ZhongZhuCoin_Contract_ABI,
      signer
    );
    await ZhongZhuCoinContract.transfer(accountTransferTo, numberTransferTo);
  } catch (error) {
    alert("转账失败：" + error);
    return;
  }
  alert("转账成功");
};
const transferToBtn = document.querySelector("#transfer-btn");
transferToBtn.addEventListener("click", transferTo);

const approve = async () => {
  try {
    const accountInput = document.querySelector("#account-input");
    const accountApproveToInput = document.querySelector("#account-approve-to");
    const numberApproveToInput = document.querySelector("#number-approve-to");
    const account = accountInput.value;
    const accountApproveTo = accountApproveToInput.value;
    const numberApproveTo = numberApproveToInput.value;
    
    const signer = provider.getSigner(account);
    ZhongZhuCoinContract = new ethers.Contract(
      ZhongZhuCoin_Contract_Address,
      ZhongZhuCoin_Contract_ABI,
      signer
    );
    await ZhongZhuCoinContract.approve(accountApproveTo, numberApproveTo);
  } catch (error) {
    alert("‘允许’失败：" + error);
    return;
  }
  alert("‘允许’成功");
};
const approveToBtn = document.querySelector("#approve-btn");
approveToBtn.addEventListener("click", approve);


const allowance = async () => {
  let number;
  try {
    const accountInput = document.querySelector("#account-input");
    const accountAllowanceFromInput = document.querySelector("#account-allowance-from");
    const accountAllowanceToInput = document.querySelector("#account-allowance-to");
    const account = accountInput.value;
    const accountAllowanceFrom = accountAllowanceFromInput.value;
    const accountAllowanceTo = accountAllowanceToInput.value;
    
    const signer = provider.getSigner(account);
    ZhongZhuCoinContract = new ethers.Contract(
      ZhongZhuCoin_Contract_Address,
      ZhongZhuCoin_Contract_ABI,
      signer
    );
    number = await ZhongZhuCoinContract.allowance(accountAllowanceFrom, accountAllowanceTo);
  } catch (error) {
    alert("允许额查询失败：" + error);
    number = "---";
    return;
  }
  document.querySelector(".balance-allowance-accout").innerText = number;
  alert("允许额查询成功");
};
const allowanceBtn = document.querySelector("#allowance-btn");
allowanceBtn.addEventListener("click", allowance);



const decApprove = async () => {
  try {
    const accountInput = document.querySelector("#account-input");
    const accountDecApproveInput = document.querySelector("#account-dec-approve");
    const numberDecApproveInput = document.querySelector("#number-dec-approve");
    const account = accountInput.value;
    const accountDecApprove = accountDecApproveInput.value;
    const numberDecApprove = numberDecApproveInput.value;
    
    const signer = provider.getSigner(account);
    ZhongZhuCoinContract = new ethers.Contract(
      ZhongZhuCoin_Contract_Address,
      ZhongZhuCoin_Contract_ABI,
      signer
    );
    await ZhongZhuCoinContract.decreaseAllowance(accountDecApprove, numberDecApprove);
  } catch (error) {
    alert("降额失败：" + error);
    return;
  }
  alert("降额成功");
};
const decApproveBtn = document.querySelector("#dec-approve-btn");
decApproveBtn.addEventListener("click", decApprove);




const incApprove = async () => {
  try {
    const accountInput = document.querySelector("#account-input");
    const accountIncApproveInput = document.querySelector("#account-inc-approve");
    const numberIncApproveInput = document.querySelector("#number-inc-approve");
    const account = accountInput.value;
    const accountIncApprove = accountIncApproveInput.value;
    const numberIncApprove = numberIncApproveInput.value;
    
    const signer = provider.getSigner(account);
    ZhongZhuCoinContract = new ethers.Contract(
      ZhongZhuCoin_Contract_Address,
      ZhongZhuCoin_Contract_ABI,
      signer
    );
    await ZhongZhuCoinContract.increaseAllowance(accountIncApprove, numberIncApprove);
  } catch (error) {
    alert("提额失败：" + error);
    return;
  }
  alert("提额成功");
};
const incApproveBtn = document.querySelector("#inc-approve-btn");
incApproveBtn.addEventListener("click", incApprove);




const transferFrom = async () => {
  try {
    const accountInput = document.querySelector("#account-input");
    const accountTransferFromInput = document.querySelector("#account-transfer-from");
    const accountTransferFromToInput = document.querySelector("#account-transfer-from-to");
    const numberTransferFromToInput = document.querySelector("#number-transfer-from-to");
    const account = accountInput.value;
    const accountTransferFrom = accountTransferFromInput.value;
    const accountTransferFromTo = accountTransferFromToInput.value;
    const numberTransferFromTo = numberTransferFromToInput.value;
    
    const signer = provider.getSigner(account);
    ZhongZhuCoinContract = new ethers.Contract(
      ZhongZhuCoin_Contract_Address,
      ZhongZhuCoin_Contract_ABI,
      signer
    );
    await ZhongZhuCoinContract.transferFrom(accountTransferFrom, accountTransferFromTo, numberTransferFromTo);
  } catch (error) {
    alert("从其他地址转账失败：" + error);
    return;
  }
  alert("从其他地址转账成功");
};
const transferFromBtn = document.querySelector("#transfer-from-btn");
transferFromBtn.addEventListener("click", transferFrom);



const mint = async () => {
  try {
    const accountInput = document.querySelector("#account-input");
    const accountMintToInput = document.querySelector("#account-mint-to");
    const numberMintToInput = document.querySelector("#number-mint-to");
    const account = accountInput.value;
    const accountMintTo = accountMintToInput.value;
    const numberMintTo = numberMintToInput.value;
    
    const signer = provider.getSigner(account);
    ZhongZhuCoinContract = new ethers.Contract(
      ZhongZhuCoin_Contract_Address,
      ZhongZhuCoin_Contract_ABI,
      signer
    );
    await ZhongZhuCoinContract.mint(accountMintTo, numberMintTo);
  } catch (error) {
    alert("铸币失败：" + error);
    return;
  }
  alert("铸币成功");
  totalSupply();
};
const mintBtn = document.querySelector("#mint-btn");
mintBtn.addEventListener("click", mint);




const burn = async () => {
  try {
    const accountInput = document.querySelector("#account-input");
    const numberBurnInput = document.querySelector("#number-burn");
    const account = accountInput.value;
    const numberBurn = numberBurnInput.value;
    
    const signer = provider.getSigner(account);
    ZhongZhuCoinContract = new ethers.Contract(
      ZhongZhuCoin_Contract_Address,
      ZhongZhuCoin_Contract_ABI,
      signer
    );
    await ZhongZhuCoinContract.burn(numberBurn);
  } catch (error) {
    alert("销毁失败：" + error);
    return;
  }
  alert("销毁成功");
  totalSupply();
};
const burnBtn = document.querySelector("#burn-btn");
burnBtn.addEventListener("click", burn);



const totalSupply = async () => {
  let totalSupplyNumber;
  try {
    totalSupplyNumber = await ZhongZhuCoinContract.totalSupply();
  } catch (error) {
    alert("总供应量查询失败：" + error);
    return;
  }
  alert("总供应量查询成功");
  document.querySelector("#ZhongZhuToken-TotalSupply").innerText = totalSupplyNumber;
};
const totalSupplyBtn = document.querySelector("#total-supply-btn");
totalSupplyBtn.addEventListener("click", totalSupply);


const requestZZCFaucet = async () => {
  try {
    const accountInput = document.querySelector("#account-input");
    const account = accountInput.value;
    const signer = provider.getSigner(account);
    ZZCFaucetContract = new ethers.Contract(
      ZZCFaucet_Contract_Address,
      ZZCFaucet_Contract_ABI,
      signer
    );
    await ZZCFaucetContract.requestTokens();
  } catch (error) {
    alert("领取失败：" + error);
    return;
  }
  alert("领取成功");
  balanceOf();
}
const requestBtn = document.querySelector("#request-btn");
requestBtn.addEventListener("click", requestZZCFaucet);


const requestTimeZZCFaucet = async () => {
  let last_time;
  try {
    const accountInput = document.querySelector("#account-input");
    const account = accountInput.value;
    const signer = provider.getSigner(account);
    ZZCFaucetContract = new ethers.Contract(
      ZZCFaucet_Contract_Address,
      ZZCFaucet_Contract_ABI,
      signer
    );
    last_time = await ZZCFaucetContract.lastRequestTime();
  } catch (error) {
    alert("查询上次领取时间失败：" + error);
    return;
  }
  alert("查询上次领取时间成功");
  document.querySelector(".last-request-time").innerText = last_time[0] + "/" + last_time[1] + "/" + last_time[2] + "  " + last_time[3] + ":" + last_time[4] + ":" + last_time[5];
}
const requestTimeBtn = document.querySelector("#request-time-btn");
requestTimeBtn.addEventListener("click", requestTimeZZCFaucet);

