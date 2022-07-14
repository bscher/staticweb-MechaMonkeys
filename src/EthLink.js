
const eth = window.ethereum;

let associatedAccount = null;

const attemptMint = async () => {
    if (!associatedAccount) {
        return;
    }
    console.log("READY TO MINT!");
};

const CONNECT_SUCCESS = 1;
const CONNECT_DECLINED = 2;
const CONNECT_FAIL_UNKNOWN = 3;
const connectToWallet = async () => {
    if (!eth) {
        alert("Failed to detect a wallet plugin. Please install an Ethereum wallet plugin for your browser and try again.");
        window.location.reload();
    } else {
        console.log("Detected 'window.ethereum' support.");
    }

    try {
        const accounts = await eth.request({ method: 'eth_requestAccounts' });
        console.log("Successfully retrieved accounts.");
        if (!eth.isConnected()) {
            alert("Unknown error. Connection to wallet was accepted but there is no connection?");
            return CONNECT_FAIL_UNKNOWN;
        }
        associatedAccount = accounts[0];
    } catch (error) {
        if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            return CONNECT_DECLINED
        } else {
            return CONNECT_FAIL_UNKNOWN;
        }
    }

    // Check if mainnet, and if not, warn the user and then reload the page.
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (chainId != "0x1") {
        alert("Your Ethereum wallet is not set to 'mainnet'. Please change your wallet's connected network to 'mainnet' and try again.");
        window.location.reload();
    }

    return CONNECT_SUCCESS;
};

export {
    connectToWallet,
    CONNECT_SUCCESS,
    CONNECT_DECLINED,
    CONNECT_FAIL_UNKNOWN,
    attemptMint
};