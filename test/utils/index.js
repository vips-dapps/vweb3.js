require('dotenv').config();

module.exports = {
  /**
   * Returns the default VIPSTARCOIN address.
   * @return {String} Default VIPSTARCOIN address.
   */
  getDefaultVIPSTARCOINAddress: () => {
    if (!process.env.SENDER_ADDRESS) {
      throw Error('Must have SENDER_ADDRESS in .env');
    }
    return String(Buffer.from(process.env.SENDER_ADDRESS));
  },

  /**
   * Returns the VIPSTARCOIN network RPC url.
   * @return {String} The VIPSTARCOIN network RPC url.
   */
  getVIPSTARCOINRPCAddress: () => {
    if (!process.env.VIPS_RPC_ADDRESS) {
      throw Error('Must have VIPS_RPC_ADDRESS in .env');
    }
    return String(Buffer.from(process.env.VIPS_RPC_ADDRESS));
  },

  /**
   * Returns the wallet passphrase to unlock the encrypted wallet.
   * @return {String} The wallet passphrase.
   */
  getWalletPassphrase: () => (process.env.WALLET_PASSPHRASE ? String(Buffer.from(process.env.WALLET_PASSPHRASE)) : ''),

  isWalletEncrypted: async (vweb3) => {
    const res = await vweb3.getWalletInfo();
    return Object.prototype.hasOwnProperty.call(res, 'unlocked_until');
  },
};
