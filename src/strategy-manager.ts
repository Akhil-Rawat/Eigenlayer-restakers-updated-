import { Deposit } from "../generated/StrategyManager/StrategyManager"
import { Restaker } from "../generated/schema"

export function handleDeposit(event: Deposit): void {
  let staker = event.params.staker.toHexString()

  let entity = Restaker.load(staker)
  if (!entity) {
    entity = new Restaker(staker)
    // Set default operator to zero address if not delegated yet
    entity.operator = event.params.staker // Will be updated when delegated
  }

  entity.strategy = event.params.strategy
  entity.timestamp = event.block.timestamp
  entity.txHash = event.transaction.hash
  entity.shares = event.params.shares

  entity.save()
}
