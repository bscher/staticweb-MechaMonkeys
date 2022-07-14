
const eth = window.ethereum;
const CONTRACT_ADDRESS = "0x1894852504288219fa835Af44528571d543958a1";

let associatedAccount = null;

const attemptEthMint = async () => {
    if (!associatedAccount) {
        throw "No linked Ethereum wallets!"
    }

    try {
        const result = await eth.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: associatedAccount,
                    to: CONTRACT_ADDRESS,
                    value: "0x0",
                    gasPrice: "0xBA43B7400",
                    gas: "0x249F0",
                    data: "0x1249c58b"
                },
            ]
        });
        console.log("Mint success!");
        console.log(result);
    } catch (error) {
        console.log(error);
        return false;
    }

    return true;
};

const connectToEthWallet = async () => {
    if (!eth) {
        alert("Failed to detect the MetaMask plugin. Please install the plugin for your browser and try again.");
        return false;
    } else {
        console.log("Detected 'window.ethereum' support.");
    }

    try {
        const accounts = await eth.request({ method: 'eth_requestAccounts' });
        console.log("Successfully retrieved accounts.");
        if (!eth.isConnected()) {
            alert("Unknown error. Connection to wallet was accepted but there is no connection?");
            throw "CONNECT_FAIL_UNKNOWN";
        }
        associatedAccount = accounts[0];
    } catch (error) {
        if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            return false;
        } else {
            throw "CONNECT_FAIL_UNKNOWN";
        }
    }

    // Check if mainnet, and if not, warn the user and then reload the page.
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (chainId != "0x1") {
        alert("Your Ethereum wallet is not set to 'mainnet'. Please change your wallet's connected network to 'mainnet' and try again.");
        return false;
    }

    return true;
};

export {
    connectToEthWallet,
    attemptEthMint
};