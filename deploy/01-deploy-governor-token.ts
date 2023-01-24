import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
  // @ts-ignore
import { ethers } from 'hardhat';

const func: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
    ) {
      // @ts-ignore
      const { getNamedAccounts, deployments, network } = hre
      const { deploy, log } = deployments
      const { deployer } = await getNamedAccounts()
      log('----------------------------------------------------')
      log('Deploying GovernanceToken ')
      const governanceToken = await deploy('GovernanceToken', {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        //   waitConfirmations:
        //     networkConfig[network.name].blockConfirmations || 1,
      })
      log(`GovernanceToken at ${governanceToken.address}`)

      await delegate(governanceToken.address, deployer)
      log('Delegated!')
    };

    const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
        const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
        const tx = await governanceToken.delegate(delegatedAccount)
        await tx.wait(1)
        console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
    }
    
    
export default func
