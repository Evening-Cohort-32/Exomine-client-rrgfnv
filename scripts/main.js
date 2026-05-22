import { GovernorSelect } from "./Governors.js";
import { Colonies } from "./Colonies.js";
import { facilityOptions } from "./facilitiesChoice.js";
import { mineralOptions } from "./facilityMinerals.js";
import { getTransientState } from "./transientState.js"

const renderAllHTML = async () => {
    const state = getTransientState()
    
    const governorHTML = await GovernorSelect()
    const coloniesHTML = await Colonies()
    const facilitiesHTML = await facilityOptions()

    const mineralsHTML = await mineralOptions(state.facilityId)

    document.querySelector("#facilityOptions").innerHTML = facilitiesHTML
    document.querySelector("#governorSelect").innerHTML = governorHTML
    document.querySelector("#colonyMinerals").innerHTML = coloniesHTML
    document.querySelector("#facilityMinerals").innerHTML = mineralsHTML
}

renderAllHTML()

// Governor Selection Event Listener
document.addEventListener("stateChanged", (event) => {
    renderAllHTML()
})