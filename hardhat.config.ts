import "hardhat-deploy"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import { HardhatUserConfig } from 'hardhat/types'
import "@typechain/hardhat"

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
  },
  solidity:'0.8.9',
  namedAccounts: {
    deployer: {
      default: 0, 
  
    },
  },
}

export default config