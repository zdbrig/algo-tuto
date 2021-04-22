const algosdk = require('algosdk');
const fs = require("fs");
const algodServer = "https://mainnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
    'X-API-Key': "yourKey"
};



let sendAlgo = async () => {

    let bacemPass = await fs.readFileSync(".secret").toString("ascii");
    const passphrase = bacemPass;

    let myAccount = algosdk.mnemonicToSecretKey(passphrase)
    console.log("My address: %s", myAccount.addr);
    const algodClient = new algosdk.Algodv2(token, algodServer, port)

    let params = await algodClient.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;
   // const receiver = "DBUROLMFOUFDB22KZP7SBFAQXUFU7WWRG3DFOPLCYPBKWOKURS336LUZJ4";
   const receiver = "MGKEF4V6MSUBANEQ54HPLPH5R6UYGJ3YHWNDZZCLFY2TEUKL3Y3KHPZ2DU";
    let note = algosdk.encodeObj("1 Algo to Fedia");

    let txn = algosdk.makePaymentTxnWithSuggestedParams(myAccount.addr, 
        receiver, 1 * 1000 * 1000, 
        undefined, note, params);

    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();
    console.log("Signed transaction with txID: %s", txId);
    await algodClient.sendRawTransaction(signedTxn).do();

}

sendAlgo();
