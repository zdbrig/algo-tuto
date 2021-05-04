const algosdk = require('algosdk');
const fs = require("fs");
const algodServer = "https://mainnet-algorand.api.purestake.io/ps2";
const port = "";




let createAsset = async () => {

    let bacemPass = await fs.readFileSync(".secret").toString("ascii");
    let token = require("./apikey");
    const passphrase = bacemPass;

    let myAccount = algosdk.mnemonicToSecretKey(passphrase)
    console.log("My address: %s", myAccount.addr);
    const algodClient = new algosdk.Algodv2(token, algodServer, port)

    let params = await algodClient.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    let note = undefined; 
    let addr = myAccount.addr;
    let defaultFrozen = false;
    let decimals = 3;
    let totalIssuance = 1000000;
    let unitName = "DINAR";
    let assetName = "SQOIN DINAR";
    let assetURL = "https://www.sqoin.us";
    let assetMetadataHash = "01234567890123456789012345678901";
    let manager = myAccount.addr;
    let reserve = myAccount.addr;
    let freeze = myAccount.addr;
    let clawback = myAccount.addr;
    let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(addr, note,
         totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
        clawback, unitName, assetName, assetURL, assetMetadataHash, params);

    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();
    console.log("Signed transaction with txID: %s", txId);
    await algodClient.sendRawTransaction(signedTxn).do();

}

createAsset();
