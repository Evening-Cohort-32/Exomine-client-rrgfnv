import  { getGovernorChoice } from "./TransientState.js"

export const Colonies = async () => {
    const selectedGovernorId = getGovernorChoice()

    //No selected Governor (default Header)
    if (selectedGovernorId === 0) {
        return `<h2>Colony Minerals</h2>
        <p>Please select a governor to view their colony's minerals.</p>`
    }

    //Fetch the chosen governor & expand their colony to display name
    const govResponse = await fetch(`http://localhost:8088/governors/${selectedGovernorId}`)
    const governor = await govResponse.json()

    const colonyResponse = await fetch(`http://localhost:8088/colonies/${governor.colonyId}`)
    const colony = await colonyResponse.json()
  
    let mineralsHTML = `<h2>${colony.name} Minerals </h2>\n`

    const purchasesResponse = await fetch(`http://localhost:8088/purchases?colonyId=${colony.id}`)
    const colonyPurchases = await purchasesResponse.json()
    
    const mineralsResponse = await fetch(`http://localhost:8088/minerals`)
    const minerals = await mineralsResponse.json()

    // Map over the purchases to get the mineral name for each purchase
    const purchasesWithMinerals = colonyPurchases.map(purchase => {
        const mineral = minerals.find(mineral => mineral.id === purchase.mineralId)
        return {
            ...purchase,
            mineral
        }
    })


    //Build HTML List
    if (purchasesWithMinerals.length === 0) {
        mineralsHTML += `<p>No minerals purchased yet.</p>`
    } else {
        mineralsHTML += `<ul>\n`
        
        //Map over purchase to create the list items
        const listItems = purchasesWithMinerals.map(purchase => {
             return `<li>${purchase.tons} tons of ${purchase.mineral?.name ?? "Unknown mineral"}</li>`
        })
  
        mineralsHTML += listItems.join("\n")
        mineralsHTML += `\n</ul>`
    }
    return mineralsHTML
}