import React, { useState, useEffect, useContext } from 'react'
import '@ethersproject/shims'
import { ethers } from 'ethers'
import ERC20ABI from '../../constants/ERC20ABI'
import { CommunityCoinAddress } from '../../constants/Contracts'
import { BlockchainContext } from '../BlockchainProvider'

// Returns balances as { coms: 'x,xxx', pc: 'x,xxx' }
const useBalances = (coin /** coms || pc */) => {
  const { userAddress, provider } = useContext(BlockchainContext)
  const [coinBalances, setCoinBalances] = useState({ coms: null, pc: null })

  const prettify = balance => {
    return ethers.utils.commify(Math.floor(ethers.utils.formatEther(balance)))
  }

  const communityCoinContract = new ethers.Contract(
    CommunityCoinAddress,
    ERC20ABI,
    provider
  )

  useEffect(() => {
    ;(async () => {
      provider
        .getBalance(userAddress)
        .then(comsBalance => {
          communityCoinContract.callStatic
            .balanceOf(userAddress)
            .then(pcBalance =>
              setCoinBalances({
                coms: prettify(comsBalance),
                pc: prettify(pcBalance)
              })
            )
            .catch(error => alert(error))
        })
        .catch(error => alert(error))
    })()
  }, [])

  return coinBalances
}

export { useBalances }
