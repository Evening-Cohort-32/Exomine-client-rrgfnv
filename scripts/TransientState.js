const state = {
    governorId: 0,
    facilityId: 0,
    mineralId: 0
}

export const getGovernorChoice = () => {
    return state.governorId
}

export const setGovernor = (governorId) => {
    state.governorId = governorId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setFacility = (chosenFacility) => {
    state.facilityId = chosenFacility
}

export const setMineral = (chosenMineral) => {
    state.mineralId = chosenMineral
}

export const getTransientState = () => {
    return state
}

export const purchaseMineral = () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.

        REsolution:
        export const purchaseMineral = () => {
    // 1. Get the current colony_id from transient state (via the chosen governor)
    // 2. Get the current mineral_id from transient state

    // 3. Look at your permanent state (state.purchases)
    // 4. Try to .find() a purchase object where the colony_id AND mineral_id match your transient state.

    // 5. Did you find one? (Path A)
        // If yes: We need to use the PUT method.
        // - Create a new object with the matched purchase's id, colony_id, mineral_id.
        // - Set its tons to the matched purchase's tons + 1.
        // - Send a PUT request to update that specific object in the database.

    // 6. Did you NOT find one? (Path B)
        // If no: We need to use the POST method.
        // - Create a brand new object with the current colony_id and mineral_id.
        // - Set its tons to exactly 1.
        // - Send a POST request to add this new object to the database.
}
    */



    document.dispatchEvent(new CustomEvent("stateChanged"))
}
