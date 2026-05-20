const handleFacilitiesChoice = (event) => {
    // event clicker for picking a facility
    if (event.target.name === "facility") {
        setFacilityOption(parseInt(event.target.value))
        console.log("Selected facility ID:", event.target.value);
    }
}

export const facilityOptions = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const facilities = await response.json()

    document.addEventListener("change", handleFacilitiesChoice)

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
                    $facility.active ? "" : "disabled"}> 
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