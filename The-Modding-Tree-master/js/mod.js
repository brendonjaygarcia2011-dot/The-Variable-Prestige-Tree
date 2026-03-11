let modInfo = {
	name: "The Leaf Growth Prestige Tree",
	author: "Elitheli",
	pointsName: "Leaves",
	modFiles: ["layers.js", "tree.js"],

	discordName: "s",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.03",
	name: "the leaves are finally alive!",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.03: the leaves are finally alive!</h3><br>
	<h4>3/11/26</h4>
		- Added Falling leaves.<br>
		- Added more upgrades, yippee!<br>
		- Endgame: 1e13 Leaves<br><br>
	<h3>v0.02: fertilizer comes after fruits though</h3><br>
	<h4>3/10/26</h4>
		- Added Fertilizer.<br>
		- Added mroe upgrades.<br>
		- Endgame: 100,000 Leaves<br><br>
	<h3>v0.01: TUTOL???</h3><br>
	<h4>3/10/26</h4>
		- Added Leaves.<br>
		- Added Dead Leaves.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade('DL', 11)) gain = gain.plus(1)
	if (hasUpgrade('DL', 12)) gain = gain.times(2)
	if (hasUpgrade('DL', 13)) gain = gain.times(3)
	if (hasUpgrade('DL', 14)) gain = gain.times(upgradeEffect('DL', 14))
	if (hasUpgrade('DL', 15)) gain = gain.times(upgradeEffect('DL', 15))
	if (hasUpgrade('DL', 23)) gain = gain.times(8)
	if (hasUpgrade('DL', 23)) gain = gain.times(upgradeEffect('DL', 23))
	
	if (hasUpgrade('F', 11)) gain = gain.times(2)
	if (hasUpgrade('F', 12)) gain = gain.times(2.5)
	if (hasUpgrade('F', 13)) gain = gain.times(upgradeEffect('F', 13))

	if (hasUpgrade('FL', 11)) gain = gain.times(upgradeEffect('FL', 11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}