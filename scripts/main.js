import { Governors } from "./governors.js";
import { Colonies } from "./colonies.js";

const renderAllHTML = async () => {
    const governorHTML = await Governors()
    const coloniesHTML = await Colonies()

    document.querySelector("#governorSelect").innerHTML = governorHTML
    document.querySelector("#colonyMinerals").innerHTML = coloniesHTML
}

renderAllHTML()


// Governor Selection Event Listener
document.addEventListener("stateChanged", (event) => {
    renderAllHTML()
})