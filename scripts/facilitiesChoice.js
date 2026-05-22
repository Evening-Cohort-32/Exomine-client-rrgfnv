import { setFacility } from "./TransientState.js"

const handleFacilitiesChoice = (event) => {
    // event clicker for picking a facility
    if (event.target.name === "facility") {
        const pickFacility = parseInt(event.target.value)
        setFacility(pickFacility)
    }
}

document.addEventListener("change", handleFacilitiesChoice)

export const facilityOptions = async () => {
    const response = await fetch("http://localhost:8088/miningFacilities")
    const facilities = await response.json()

    let html = `
        <div class="facility-input">
            <label for="facility-select">Choose a facility:</label>

            <select name="facility" id="facility-select">
                <option value="">Select a facility</option>
    `
    const facilitiesHTML = facilities.map(
        (facility) => {
            return `
                <option 
                    value="${facility.id}"
                    ${facility.active ? "" : "disabled"}> 
                    ${facility.name}
                    ${facility.active ? "" : "(Inactive)"}
                </option>
            `
        }
    )
    // Join the array of strings into a single string and add to our HTML
    html += facilitiesHTML.join("")

    html += `
            </select>
        </div>
    `
    
    return html
}