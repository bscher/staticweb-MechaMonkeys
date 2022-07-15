
let gme = null;
let associatedAccount = null;

const CONTRACT_ADDRESS = ""; //0x1894852504288219fa835Af44528571d543958a1";

const attemptGMEMint = async () => {
    if (!associatedAccount) {
        throw "A GameStop wallet is not linked!"
    }

    try {
        const result = await gme.request(
            'eth_sendTransaction',
            [
                {
                    from: associatedAccount,
                    to: CONTRACT_ADDRESS,
                    value: "0x0",
                    gasPrice: "0xBA43B7400",
                    gas: "0x249F0",
                    data: "0x1249c58b"
                },
            ]
        );
        console.log(result);
    } catch (error) {
        console.log(error);
        return false;
    }

    console.log("Mint success!");
    console.log(result);
    return true;
};

const connectToGMEWallet = async () => {
    gme = window.gamestop;
    if (!gme) {
        alert("Failed to detect GameStop plugin. Please install the plugin for your browser and try again.");
        return false;
    } else {
        console.log("Detected 'window.gamestop' support.");
    }

    try {
        const accounts = await gme.enable();
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
    const chainId = await gme.networkVersion();
    if (chainId != "1") {
        alert("Your GameStop wallet is set to a network other than 'mainnet' (layer 1). Please change your wallet's connected network to 'mainnet' and try again.");
        return false;
    }

    return true;
};

export {
    connectToGMEWallet,
    attemptGMEMint
};