import { GovernorSelect } from "./Governors.js";
import { Colonies } from "./Colonies.js";
import { facilityOptions } from "./facilitiesChoice.js";

const renderAllHTML = async () => {
    const governorHTML = await GovernorSelect()
    const coloniesHTML = await Colonies()
    const facilitiesHTML = await facilityOptions()

    document.querySelector("#facilityOptions").innerHTML = facilitiesHTML
    document.querySelector("#governorSelect").innerHTML = governorHTML
    document.querySelector("#colonyMinerals").innerHTML = coloniesHTML
}

renderAllHTML()

// Governor Selection Event Listener
document.addEventListener("stateChanged", (event) => {
    renderAllHTML()
})