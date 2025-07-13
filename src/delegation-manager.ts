import { StakerDelegated } from "../generated/DelegationManager/DelegationManager"
import { Restaker } from "../generated/schema"

export function handleStakerDelegated(event: StakerDelegated): void {
  let staker = event.params.staker.toHexString()

  let entity = Restaker.load(staker)
  if (!entity) {
    entity = new Restaker(staker)
  }

  entity.operator = event.params.operator
  entity.timestamp = event.block.timestamp
  entity.txHash = event.transaction.hash

  entity.save()
}
