import {getGovernorChoice, setGovernor} from "./TransientState.js"

document.addEventListener("change", (changeEvent)=> {
    if (changeEvent.target.id === "governorSelect") {
            const chosenGovernorId = parseInt(changeEvent.target.value)
            setGovernor(chosenGovernorId)
    }
})

// HTML Generator Component
export const GovernorSelect = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()

    let chosenHTML = '<label for="governorSelect">Choose a Governor:</label>\n'
    chosenHTML += '<select id="governorSelect">\n'
    chosenHTML += '<option value="0">Select a Governor</option>\n'

//Filter, then Map, then Join
    const activeGovernor = governors.filter(gov => gov.active === true)

    const arrayofSelectOptions = activeGovernor.map(governor => {
    // checks state match to set selected governor on option element
        const isSelected = getGovernorChoice() === governor.id ? "selected" : ""
        return `<option ${isSelected} value="${governor.id}">${governor.name}</option>`
    })
    chosenHTML += arrayofSelectOptions.join("")
    chosenHTML += '</select>'

    return chosenHTML
}