import * as fs from 'fs'
import { network, ethers } from 'hardhat'
import {
  proposalsFile,
  developmentChains,
  VOTING_PERIOD,
} from '../helper-hardhat-config'
import { moveBlocks } from '../utils/move-blocks'

async function main(proposalIndex : number) {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, 'utf8'))
  const proposalId = proposals[network.config.chainId!][proposalIndex]
  // 0 = Against, 1 = For, 2 = Abstain 
  const voteWay = 1
  const resaon = "NONONAOWDNOAWDN"
  const governor = await ethers.getContract('GovernorContract')
  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    resaon
  )
 await voteTxResponse.wait(1)

 if (developmentChains.includes(network.name)) {
   await moveBlocks(VOTING_PERIOD + 1)
 }
 console.log("Voted! Ready to go")
}

const index = 0
main(index)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
