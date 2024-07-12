import goalAbi from './GoalAbi'

export async function getGoal(w3,address){

    //create contract instance from w3 using address
    let g = new w3.eth.Contract(goalAbi, address);

    let goal = {
        key: g._address,
        address: g._address,
        name : await g.methods.name().call(),
        description: await g.methods.description().call(),
        creator: await g.methods.creator().call(),
        assignedTo: await g.methods.assignedTo().call(),
        complete: await g.methods.complete().call(),
        reward: await g.methods.reward().call()
    }

    return goal;
}