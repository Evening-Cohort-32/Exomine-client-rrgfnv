import { getTransientState, purchaseMineral } from "./TransientState.js"

document.addEventListener("click", (event) => {
  if (event.target.id === "purchaseBtn") {
    purchaseMineral()
  }
})

export const SpaceCart = async () => {
  const state = getTransientState()
  let html = `<h2>Space Cart</h2>`

  if (state.mineralId !== 0 && state.facilityId !== 0) {
    const mineralsResponse = await fetch(
      `http://localhost:8088/minerals/${state.mineralId}`,
    )
    const mineral = await mineralsResponse.json()
    const facilityResponse = await fetch(
      `http://localhost:8088/miningFacilities/${state.facilityId}`,
    )
    const facility = await facilityResponse.json()

    html += `<p>1 TON of ${mineral.name} from ${facility.name}</p>`
    html += `<button id="purchaseBtn" class="purchase-btn">Purchase Mineral</button>`
  } else {
    html += `<button id="purchaseBtn" class="purchase-btn" disabled>Purchase Mineral</button>`
  }
  return html
}
