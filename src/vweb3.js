const { isString, isArray, isFinite } = require('lodash');

const { initProvider } = require('./providers');
const Contract = require('./contract');
const HttpProvider = require('./providers/http-provider');
const Encoder = require('./formatters/encoder');
const Decoder = require('./formatters/decoder');
const Utils = require('./utils');

class Vweb3 {
  /**
   * Vweb3 constructor.
   * @param {string|Vweb3Provider} provider Either URL string to create HttpProvider or a Vweb3 compatible provider.
   */
  constructor(provider) {
    this.provider = initProvider(provider);
    this.encoder = Encoder;
    this.decoder = Decoder;
    this.utils = Utils;
  }

  /**
   * Constructs a new Contract instance.
   * @param {string} address Address of the contract.
   * @param {array} abi ABI of the contract.
   * @return {Contract} Contract instance.
   */
  Contract(address, abi) {
    return new Contract(this.provider, address, abi);
  }

  /**
   * Constructs a new HttpProvider instance.
   * @param {string} urlString URL of the blockchain API. eg. http://user:pass@127.0.0.1:32916
   * @return {HttpProvider} HttpProvider instance.
   */
  HttpProvider(urlString) {
    return new HttpProvider(urlString);
  }

  /** ******** MISC ********* */
  /**
   * Checks if the blockchain is connected.
   * @return If blockchain is connected.
   */
  async isConnected() {
    try {
      const res = await this.provider.rawCall('getnetworkinfo');
      return typeof res === 'object';
    } catch (err) {
      return false;
    }
  }

  /** ******** BLOCKCHAIN ********* */
  /**
   * Returns the smart contract infomation.
   * @param contractAddress {String} The smart contract address.
   * @return {Promise} Smart contract infomation or Error.
   */
  getAccountInfo(contractAddress) {
    return this.provider.rawCall('getaccountinfo', [contractAddress]);
  }

  /**
   * Returns the hash of the best (tip) block in the longest blockchain.
   * @return {Promise} The hash of the best (tip) block.
   */
  getBestBlockHash() {
    return this.provider.rawCall('getbestblockhash');
  }

  /**
   * Returns the block info for a given block hash.
   * @param {string} blockHash The block hash to look up.
   * @param {boolean} verbose True for a json object or false for the hex encoded data.
   * @return {Promise} Latest block info or Error.
   */
  getBlock(blockHash, verbose = true) {
    return this.provider.rawCall('getblock', [blockHash, verbose]);
  }

  /**
   * Returns various state info regarding blockchain processing.
   * @return {Promise} Latest block info or Error.
   */
  getBlockchainInfo() {
    return this.provider.rawCall('getblockchaininfo');
  }

  /**
   * Returns the current block height that is synced.
   * @return {Promise} Current block count or Error.
   */
  getBlockCount() {
    return this.provider.rawCall('getblockcount');
  }

  /**
   * Returns the block hash of the block height number specified.
   * @param {number} blockNum The block number to look up.
   * @return {Promise} Block hash or Error.
   */
  getBlockHash(blockNum) {
    return this.provider.rawCall('getblockhash', [blockNum]);
  }

  /**
  * Returns the block header.
  * @param hash {String} The block hash.
  * @param verbose {Boolean} True for a json object or false for the hex encoded data.
  * @return {Promise} The block header or Error.
  */
  getBlockHeader(hash, verbose = true) {
    return this.provider.rawCall('getblockheader', [hash, verbose]);
  }

  /**
  * Returns information about all known tips in the block tree.
  * @return {Promise} Information about all known tips in the block tree or Error.
  */
  getChainTips() {
    return this.provider.rawCall('getchaintips');
  }

  /**
  * Returns information of synchronized checkpoint.
  * @return {Promise} Information of synchronized checkpointe or Error.
  */
  getCheckPoint() {
    return this.provider.request('getcheckpoint');
  }

  /**
  * Returns the proof-of-work difficulty and the proof-of-stake difficulty.
  * @return {Promise} Value of difficulty or Error.
  */
  getDifficulty() {
    return this.provider.rawCall('getdifficulty');
  }

  /**
  * Returns all in mempool ancestors.
  * @param hash {String} The transaction id.
  * @param verbose {Boolean} True for a json object or false for the hex encoded data.
  * @return {Promise} All in mempool ancestors or Error.
  */
  getMempoolAncestors(txid, verbose = true) {
    return this.provider.rawCall('getmempoolancestors', [txid, verbose]);
  }

  /**
  * Returns all in mempool descendants.
  * @param hash {String} The transaction id.
  * @param verbose {Boolean} True for a json object or false for the hex encoded data.
  * @return {Promise} All in mempool descendants or Error.
  */
  getMempoolDescendants(txid, verbose = true) {
    return this.provider.rawCall('getmempooldescendants', [txid, verbose]);
  }

  /**
  * Returns mempool data for given transaction.
  * @param hash {String} The transaction id.
  * @return {Promise} Mempool data for given transaction.
  */
  getMempoolEntry(txid) {
    return this.provider.rawCall('getmempoolentry', [txid]);
  }

  /**
  * Returns infomation of mempool.
  * @param hash {String} The transaction id.
  * @return {Promise} Infomation of mempool.
  */
  getMempoolInfo() {
    return this.provider.rawCall('getmempoolinfo');
  }

  /**
  * @param contractAddress {String} The smart contract address.
  */
  getStorage(contractAddress) {
    return this.provider.rawCall('getstorage', [contractAddress]);
  }

  /**
   * Returns the transaction receipt given the txid.
   * @param {string} txid The transaction id to look up.
   * @return {Promise} Transaction receipt or Error.
   */
  getTransactionReceipt(txid) {
    return this.provider.rawCall('gettransactionreceipt', [txid]);
  }

  /**
   * Returns an array of deployed contract addresses.
   * @param {number} startingAcctIndex The starting account index.
   * @param {number} maxDisplay Max accounts to list.
   * @return {Promise} Array of contract addresses or Error.
   */
  listContracts(startingAcctIndex = 1, maxDisplay = 20) {
    return this.provider.rawCall('listcontracts', [startingAcctIndex, maxDisplay]);
  }

  /**
  * Returns make a public and private key pair.
  * @return {Promise} Public and private key pair or Error.
  */
  makeKeyPair() {
    return this.provider.rawCall('makekeypair');
  }

  /**
  * Treats a block as if it were received before others with the same work.
  * @param blockHash {String} The block hash.
  * @return {Promise} null or Error.
  */
  preciousBlock(blockHash) {
    return this.provider.rawCall('preciousblock', [blockHash]);
  }

  /**
  * Prune Block Chain.
  * @param heignt {number} The block height.
  * @return {Promise} null or Error.
  */
  pruneBlockchain(heignt) {
    return this.provider.rawCall('pruneblockchain', [heignt]);
  }

  /**
   * Search logs with given filters
   * @param  {number} fromBlock Starting block to search.
   * @param  {number} toBlock Ending block to search. Use -1 for latest.
   * @param  {string or array} addresses One or more addresses to search against
   * @param  {string or array} topics One or more topic hashes to search against
   * @param  {object} contractMetadata Metadata of all contracts and their events with topic hashes
   * @param  {bool} removeHexPrefix Flag to indicate whether to remove the hex prefix (0x) from hex values
   * @return {Promise} Promise containing returned logs or Error
   */
  searchLogs(fromBlock, toBlock, addresses, topics, contractMetadata, removeHexPrefix) {
    if (!isFinite(fromBlock)) {
      throw Error('fromBlock must be a number');
    }
    if (!isFinite(toBlock)) {
      throw Error('toBlock must be a number.');
    }

    const addrObj = { addresses: undefined };
    if (isString(addresses)) {
      addrObj.addresses = [addresses];
    } else if (isArray(addresses)) {
      addrObj.addresses = addresses;
    } else {
      throw Error('addresses must be a string or an array.');
    }

    const topicsObj = { topics: undefined };
    if (isString(topics)) {
      topicsObj.topics = [topics];
    } else if (isArray(topics)) {
      topicsObj.topics = topics;
    } else {
      throw Error('topics must be a string or an array.');
    }

    return this.provider.rawCall('searchlogs', [fromBlock, toBlock, addrObj, topicsObj])
      .then(results => Decoder.decodeSearchLog(results, contractMetadata, removeHexPrefix));
  }

  /**
  * Send a synchronized checkpoint.
  * @param blockHash {String} The block hash.
  * @return {Promise} null or Error.
  */
  sendCheckpoint(blockHash) {
    return this.provider.rawCall('sendcheckpoint', [blockHash]);
  }

  /**
  * Retuen result of verify.
  * @param checkLevel {Number} Check level.
  * @param nblocks {Number} The number of block.
  * @return {Promise} True/False or Error.
  */
  verifyChain(checkLevel = 3, nblocks = 6) {
    return this.provider.rawCall('verifychain', [checkLevel, nblocks]);
  }

  /**
  * @param txoutProof {String} Txout proof.
  * @return {Promise} True/false or Error.
  */
  verifyTxoutProof(txoutProof) {
    return this.provider.rawCall('verifytxoutproof', [txoutProof]);
  }

  /** ******** GENERATING ********* */
  /**
   * Mine up to n blocks immediately (before the RPC call returns) to an address in the wallet.
   * @param {number} blocks How many blocks are generated immediately.
   * @param {number} maxTries How many iterations to try (default = 1000000).
   * @return {array} Hashes of blocks generated.
   */
  generate(blocks, maxTries = 1000000) {
    if (!isFinite(blocks)) {
      throw Error('blocks must be a number.');
    }

    return this.provider.rawCall('generate', [blocks, maxTries]);
  }

  /**
   * Mine blocks immediately to a specified address (before the RPC call returns).
   * @param {number} blocks How many blocks are generated immediately.
   * @param {string} address The address to send the newly generated VIPSTARCOIN to.
   * @param {number} maxTries How many iterations to try (default = 1000000).
   * @return {array} Hashes of blocks generated.
   */
  generateToAddress(blocks, address, maxTries = 1000000) {
    if (!isFinite(blocks)) {
      throw Error('blocks must be a number.');
    }
    if (!isString(address)) {
      throw Error('address must be a string.');
    }

    return this.provider.rawCall('generatetoaddress', [blocks, address, maxTries]);
  }

  /** ******** NETWORK ********* */
  /**
   * Returns data about each connected network node as a json array of objects.
   * @return {Promise} Node info object or Error
   */
  getPeerInfo() {
    return this.provider.rawCall('getpeerinfo');
  }

  /** ******** RAW TRANSACTIONS ********* */
  /**
   * Get the hex address of a VIPSTARCOIN address.
   * @param {string} address VIPSTARCOIN address
   * @return {Promise} Hex string of the converted address or Error
   */
  getHexAddress(address) {
    return this.provider.rawCall('gethexaddress', [address]);
  }

  /**
   * Converts a hex address to VIPSTARCOIN address.
   * @param {string} hexAddress VIPSTARCOIN address in hex format.
   * @return {Promise} VIPSTARCOIN address or Error.
   */
  fromHexAddress(hexAddress) {
    return this.provider.rawCall('fromhexaddress', [hexAddress]);
  }

  /** ******** UTIL ********* */
  /**
   * Validates if a valid VIPSTARCOIN address.
   * @param {string} address VIPSTARCOIN address to validate.
   * @return {Promise} Object with validation info or Error.
   */
  validateAddress(address) {
    return this.provider.rawCall('validateaddress', [address]);
  }

  /** ******** WALLET ********* */
  /**
   * Backs up the wallet.
   * @param {string} destination The destination directory or file.
   * @return {Promise} Success or Error.
   */
  backupWallet(destination) {
    return this.provider.rawCall('backupwallet', [destination]);
  }

  /**
   * Reveals the private key corresponding to the address.
   * @param {string} address The VIPSTARCOIN address for the private key.
   * @return {Promise} Private key or Error.
   */
  dumpPrivateKey(address) {
    return this.provider.rawCall('dumpprivkey', [address]);
  }

  /**
   * Encrypts the wallet for the first time. This will shut down the VIPSTARCOIN server.
   * @param {string} passphrase The passphrase to encrypt the wallet with. Must be at least 1 character.
   * @return {Promise} Success or Error.
   */
  encryptWallet(passphrase) {
    return this.provider.rawCall('encryptwallet', [passphrase]);
  }

  /**
   * Gets the account name associated with the VIPSTARCOIN address.
   * @param {string} address The VIPSTARCOIN address for account lookup.
   * @return {Promise} Account name or Error.
   */
  getAccount(address) {
    return this.provider.rawCall('getaccount', [address]);
  }

  /**
   * Gets the VIPSTARCOIN address based on the account name.
   * @param {string} acctName The account name for the address ("" for default).
   * @return {Promise} VIPSTARCOIN address or Error.
   */
  getAccountAddress(acctName = '') {
    return this.provider.rawCall('getaccountaddress', [acctName]);
  }

  /**
   * Gets the VIPSTARCOIN address with the account name.
   * @param {string} acctName The account name ("" for default).
   * @return {Promise} VIPSTARCOIN address array or Error.
   */
  getAddressesByAccount(acctName = '') {
    return this.provider.rawCall('getaddressesbyaccount', [acctName]);
  }

  /**
   * Gets a new VIPSTARCOIN address for receiving payments.
   * @param {string} acctName The account name for the address to be linked to ("" for default).
   * @return {Promise} VIPSTARCOIN address or Error.
   */
  getNewAddress(acctName = '') {
    return this.provider.rawCall('getnewaddress', [acctName]);
  }

  /**
   * Get transaction details by txid
   * @param {string} txid The transaction id (64 char hex string).
   * @return {Promise} Promise containing result object or Error
   */
  getTransaction(txid) {
    return this.provider.rawCall('gettransaction', [txid]);
  }

  /**
   * Gets the wallet info
   * @return {Promise} Promise containing result object or Error
   */
  getWalletInfo() {
    return this.provider.rawCall('getwalletinfo');
  }

  /**
   * Gets the total unconfirmed balance.
   * @return {Promise} Unconfirmed balance or Error.
   */
  getUnconfirmedBalance() {
    return this.provider.rawCall('getunconfirmedbalance');
  }

  /**
   * Adds an address that is watch-only. Cannot be used to spend.
   * @param {string} address The hex-encoded script (or address).
   * @param {string} label An optional label.
   * @param {boolean} rescan Rescan the wallet for transactions.
   * @return {Promise} Success or Error.
   */
  importAddress(address, label = '', rescan = true) {
    return this.provider.rawCall('importaddress', [address, label, rescan]);
  }

  /**
   * Adds an address by private key.
   * @param {string} privateKey The private key.
   * @param {string} label An optional label.
   * @param {boolean} rescan Rescan the wallet for transactions.
   * @return {Promise} Success or Error.
   */
  importPrivateKey(privateKey, label = '', rescan = true) {
    return this.provider.rawCall('importprivkey', [privateKey, label, rescan]);
  }

  /**
   * Adds an watch-only address by public key. Cannot be used to spend.
   * @param {string} publicKey The public key.
   * @param {string} label An optional label.
   * @param {boolean} rescan Rescan the wallet for transactions.
   * @return {Promise} Success or Error.
   */
  importPublicKey(publicKey, label = '', rescan = true) {
    return this.provider.rawCall('importpubkey', [publicKey, label, rescan]);
  }

  /**
   * Imports keys from a wallet dump file
   * @param {string} filename The wallet file.
   * @return {Promise} Success or Error.
   */
  importWallet(filename) {
    return this.provider.rawCall('importwallet', [filename]);
  }

  /**
   * Lists groups of addresses which have had their common ownership made public by common use as inputs
   *  or as the resulting change in past transactions.
   * @return {Promise} Array of addresses with VIPS balances or Error.
   */
  listAddressGroupings() {
    return this.provider.rawCall('listaddressgroupings');
  }

  /**
   * Lists temporary unspendable outputs.
   * @return {Promise} Array of unspendable outputs or Error
   */
  listLockUnspent() {
    return this.provider.rawCall('listlockunspent');
  }

  /**
   * Lists unspent transaction outputs.
   * @return {Promise} Array of unspent transaction outputs or Error
   */
  listUnspent() {
    return this.provider.rawCall('listunspent');
  }

  /**
   * Lists unspent transaction outputs.
   * @param {string} address Address to send VIPS to.
   * @param {number} amount Amount of VIPS to send.
   * @param {string} comment Comment used to store what the transaction is for.
   * @param {string} commentTo Comment to store name/organization to which you're sending the transaction.
   * @param {boolean} subtractFeeFromAmount The fee will be deducted from the amount being sent.
   * @param {boolean} replaceable Allow this transaction to be replaced by a transaction with higher fees via BIP 125.
   * @param {number} confTarget Confirmation target (in blocks).
   * @param {string} estimateMode The fee estimate mode, must be one of: "UNSET", "ECONOMICAL", "CONSERVATIVE"
   * @param {string} senderAddress The VIPS address that will be used to send money from.
   * @param {boolean} changeToSender Return the change to the sender.
   * @return {Promise} Transaction ID or Error
   */
  sendToAddress(
    address,
    amount,
    comment = '',
    commentTo = '',
    subtractFeeFromAmount = false,
    replaceable = true,
    confTarget = 6,
    estimateMode = 'UNSET',
    senderAddress,
    changeToSender = false,
  ) {
    return this.provider.rawCall('sendtoaddress', [
      address,
      amount,
      comment,
      commentTo,
      subtractFeeFromAmount,
      replaceable,
      confTarget,
      estimateMode,
      senderAddress,
      changeToSender,
    ]);
  }

  /**
   * Set the transaction fee per kB. Overwrites the paytxfee parameter.
   * @param {bumber} amount The transaction fee in VIPS/kB.
   * @return {Promise} True/false for success or Error.
   */
  setTxFee(amount) {
    return this.provider.rawCall('settxfee', [amount]);
  }

  /**
   * Locks the encrypted wallet.
   * @return {Promise} Success or Error.
   */
  walletLock() {
    return this.provider.rawCall('walletlock');
  }

  /**
   * Unlocks the encrypted wallet with the wallet passphrase.
   * @param {string} passphrase The wallet passphrase.
   * @param {number} timeout The number of seconds to keep the wallet unlocked.
   * @param {boolean} stakingOnly Unlock wallet for staking only.
   * @return {Promise} Success or Error.
   */
  walletPassphrase(passphrase, timeout, stakingOnly = false) {
    return this.provider.rawCall('walletpassphrase', [passphrase, timeout, stakingOnly]);
  }

  /**
   * Changes the encrypted wallets passphrase.
   * @param {string} oldPassphrase The old wallet passphrase.
   * @param {string} newPassphrase The new wallet passphrase.
   * @return {Promise} Success or Error.
   */
  walletPassphraseChange(oldPassphrase, newPassphrase) {
    return this.provider.rawCall('walletpassphrasechange', [oldPassphrase, newPassphrase]);
  }
}

module.exports = Vweb3;
