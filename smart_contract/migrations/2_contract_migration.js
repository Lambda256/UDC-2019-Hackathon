let GiveToken = artifacts.require("./GiveToken.sol")
let GiveBox = artifacts.require("./GiveBox.sol")

module.exports = function(deployer) {
    deployer.deploy(GiveToken)
    deployer.deploy(GiveBox)
}
