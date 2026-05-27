const state = {
  governorId: 0,
  facilityId: 0,
  mineralId: 0,
}

export const getGovernorChoice = () => {
  return state.governorId
}

export const setGovernor = (governorId) => {
  state.governorId = governorId
  document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setFacility = (chosenFacility) => {
  state.facilityId = chosenFacility
  document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineral = (chosenMineral) => {
  state.mineralId = chosenMineral
  document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getTransientState = () => {
  return state
}

export const purchaseMineral = async () => {
  const currentState = getTransientState()

  if (
    currentState.governorId === 0 ||
    currentState.facilityId === 0 ||
    currentState.mineralId === 0
  )
    return

  const govResponse = await fetch(
    `http://localhost:8088/governors/${currentState.governorId}`,
  )
  const governor = await govResponse.json()
  const currentColonyId = governor.colonyId
  const purchasesResponse = await fetch("http://localhost:8088/purchases")
  const purchases = await purchasesResponse.json()
  const existingPurchase = purchases.find(
    (purchase) =>
      purchase.colonyId === currentColonyId &&
      purchase.mineralId === currentState.mineralId,
  )

  if (existingPurchase) {
    const updatedPurchase = {
      colonyId: existingPurchase.colonyId,
      mineralId: existingPurchase.mineralId,
      tons: existingPurchase.tons + 1,
    }
    await fetch(`http://localhost:8088/purchases/${existingPurchase.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPurchase),
    })
  } else {
    const newPurchase = {
      colonyId: currentColonyId,
      mineralId: currentState.mineralId,
      tons: 1,
    }
    await fetch("http://localhost:8088/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPurchase),
    })
  }
  setMineral(0)
}
