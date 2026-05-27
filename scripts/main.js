import { GovernorSelect } from "./Governors.js"
import { Colonies } from "./Colonies.js"
import { facilityOptions } from "./facilitiesChoice.js"
import { mineralOptions } from "./facilityMinerals.js"
import { getTransientState } from "./TransientState.js"
import { SpaceCart } from "./SpaceCart.js"

const renderAllHTML = async () => {
  const state = getTransientState()

  const governorHTML = await GovernorSelect()
  const coloniesHTML = await Colonies()
  const facilitiesHTML = await facilityOptions()
  const mineralsHTML = await mineralOptions(state.facilityId)
  const cartHTML = await SpaceCart()

  document.querySelector("#facilityOptions").innerHTML = facilitiesHTML
  document.querySelector("#governorSelect").innerHTML = governorHTML
  document.querySelector("#colonyMinerals").innerHTML = coloniesHTML
  document.querySelector("#facilityMinerals").innerHTML = mineralsHTML
  document.querySelector("#spaceCart").innerHTML = cartHTML
}

renderAllHTML()

// Governor Selection Event Listener
document.addEventListener("stateChanged", (event) => {
  renderAllHTML()
})
