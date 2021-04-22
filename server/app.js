const algosdk = require('algosdk');

const algodServer = "https://mainnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
    'X-API-Key': "yourKey"
};

let checkStatus = async () => {

    const algodClient = new algosdk.Algodv2(token, algodServer, port)
    let account2 = "DBUROLMFOUFDB22KZP7SBFAQXUFU7WWRG3DFOPLCYPBKWOKURS336LUZJ4";
    let accountInfo = await algodClient.accountInformation(account2).do();
    console.log("Account balance: %d algo", accountInfo.amount / 1000 / 1000);
}

checkStatus();
