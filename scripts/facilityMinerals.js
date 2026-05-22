const handleMineralChoice = (event) => {
    if (event.target.name === "minerals") {
        setMineralOption(parseInt(event.target.value))
        console.log("Selected mineral ID:", event.target.value);
    }
}

document.addEventListener("change", handleMineralChoice)

export const mineralOptions = async (selectedFacilityId) => {
    //get join table
    const facilityMineralsResponse = await fetch("http://localhost:8088/facilityMinerals")
    const facilityMinerals = await facilityMineralsResponse.json()

    //get minerals
    const mineralsResponse = await fetch ("http://localhost:8088/minerals")
    const minerals = await mineralsResponse.json()

    //filter minerals from chosen facility
    const matchingFacilityMinerals= facilityMinerals.filter(
        facilityMineral => facilityMineral.facility_id === selectedFacilityId
    )

        let html = `
            <div class="facility-minerals">
                <h3> Facility Minerals </h3>
        `
        //radio buttons
        const mineralsHTML = matchingFacilityMinerals.map(
            (facilityMineral) => {

                //find matching minerals from facility
                const matchingMineral = minerals.find(
                    mineral => mineral.id === facilityMineral.mineral_id
                )

                return `
                    <label>
                        <input type="radio" name="minerals" value="${matchingMineral.id}" /> ${matchingMineral.tons} tons of ${matchingMineral.name}
                    </label>
                `
            }
        )
        // Join the array of strings into a single string and add to our HTML
        html += mineralsHTML.join("")

        html += `
            </div>
        `

        return html
    }
