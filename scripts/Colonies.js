import  { getGovernorChoice } from "./TransientState.js"

export const Colonies = async () => {
    const selectedGovernorId = getGovernorChoice()

    //No selected Governor (default Header)
    if (selectedGovernorId === 0) {
        return `<h2>Colony Minerals</h2>
        <p>Please select a governor to view their colony's minerals.</p>`
    }

    //Fetch the chosen governor & expand their colony to display name
    const govResponse = await fetch(`http://localhost:8088/governors/${selectedGovernorId}?_expand=colony`)
    const governor = await govResponse.json()

    let mineralsHTML = `<h2>${governor.colony.name} Minerals </h2>\n`

    //Fetch purchases for specified colony and expand the mineral to get its name
    const purchasesResponse = await fetch(`http://localhost:8088/purchases?colony_id=${governor.colony.id}&_expand=mineral`)
    const colonyPurchases = await purchasesResponse.json()

    //Build HTML List
    if (colonyPurchases.length === 0) {
        mineralsHTML += `<p>No minerals purchased yet.</p>`
    } else {
        mineralsHTML += `<ul>\n`
        
        //Map over purchase to creat the ilst items
        const listItems = colonyPurchases.map(purchase => {
            return `<li>${purchase.tons} tons of ${purchase.mineral.name}</li>`
        })
  
        mineralsHTML += listItems.join("\n")
        mineralsHTML += `\n</ul>`
    }
    return mineralsHTML
}