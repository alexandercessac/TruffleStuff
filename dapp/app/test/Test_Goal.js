let Goal = artifacts.require('./Goal')

contract('Goal', function(accounts){

    let contract;
    let creator = accounts[0];
    let assignee = accounts[1];

    const ONE_ETH = 1000000000000000000;
    const GIVEN_NAME = 'testName'

    beforeEach(async function(){
        contract = await Goal.new(
            GIVEN_NAME,
            creator,
            'test description',
            1000,
            {
                from: creator,
                gas: 2000000
            }
        )
    });

    it('... is initialized with correct name', async function() {
        let goalName = await contract.name.call();
        expect(goalName).to.equal(GIVEN_NAME);
    });
})