const algosdk = require('algosdk');
const fs = require("fs");
const algodServer = "https://mainnet-algorand.api.purestake.io/ps2";
const port = "";




let enableAsset = async () => {

    let bacemPass = await fs.readFileSync(".jawaher").toString("ascii");
    let token = require("./apikey");
    const passphrase = bacemPass;

    let myAccount = algosdk.mnemonicToSecretKey(passphrase)
    console.log("My address: %s", myAccount.addr);
    const algodClient = new algosdk.Algodv2(token, algodServer, port)
    let assetID = 198995172;
    let params = await algodClient.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    let sender = myAccount.addr;
    let recipient = myAccount.addr;
    // We set revocationTarget to undefined as 
    // This is not a clawback operation
    let revocationTarget = undefined;
    // CloseReaminerTo is set to undefined as
    // we are not closing out an asset
    let closeRemainderTo = undefined;
    // We are sending 0 assets
    amount = 0;
    let note = algosdk.encodeObj("enable this asset");
    // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
        amount, note, assetID, params);
   
    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();
    console.log("Signed transaction with txID: %s", txId);
    await algodClient.sendRawTransaction(signedTxn).do();

}

enableAsset();
