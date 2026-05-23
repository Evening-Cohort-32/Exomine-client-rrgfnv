import { setFacility, getTransientState } from "./TransientState.js";
import { mineralOptions } from "./facilityMinerals.js";

const handleFacilitiesChoice = async (event) => {

    if (event.target.name === "facility") {
        const chosenFacility = parseInt(event.target.value)
        setFacility(chosenFacility)
        console.log("Selected facility ID:", chosenFacility)

        const state = getTransientState()

        const mineralsHTML = await mineralOptions(state.facilityId)

        document.querySelector("#facilityMinerals").innerHTML = mineralsHTML
    }
}



document.addEventListener("change", handleFacilitiesChoice)



export const facilityOptions = async () => {

    const transientState = getTransientState()

    const response = await fetch("http://localhost:8088/miningFacilities")
    const facilities = await response.json()

    let html = `
        <div class="facility-input">
            <label for="facility-select">Choose a facility:</label>

            <select name="facility" id="facility-select">
                <option value="">Select a facility</option>
    `

    const facilitiesHTML = facilities.map((facility) => {

        return `
            <option 
                value="${facility.id}"
                ${facility.id === transientState.facilityId ? "selected" : ""}
                ${facility.active ? "" : "disabled"}>
                
                ${facility.name}
                ${facility.active ? "" : "(Inactive)"}
            </option>
        `
    })

    html += facilitiesHTML.join("")

    html += `
            </select>
        </div>
    `

    return html
}