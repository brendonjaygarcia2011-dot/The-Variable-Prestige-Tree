addLayer("DL", {
    name: "Dead Leaves", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#554433",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Dead Leaves", // Name of prestige currency
    baseResource: "Leaves", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true
    },
    upgrades: {
        11: {
        title: "Leaves = Dead",
        description: "Start gaining Leaves.",
        cost: new Decimal(1),
        },
        12: {
        title: "Dead leaves are technically fertilizer.",
        description: "Double leaf gain.",
        cost: new Decimal(2),
        },
        13: {
        title: "i ate thwe ded levez :(",
        description: "Triple leaf gain.",
        cost: new Decimal(5),
        },
        14: {
        title: "my friend ased for this",
        description: "Dead leaves boost Leaves.",
        cost: new Decimal(10),
        effect() {
        return player[this.layer].points.add(1).pow(0.25)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
        title: "That means, more leaf = more dead leaf = more leaf",
        description: "Double leaf gain.",
        cost: new Decimal(25),
        effect() {
        return player.points.add(1).pow(0.15)
        },
        gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('DL', 15)) mult = mult.times(upgradeEffect('DL', 15))
        return mult
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },

})

addLayer("F", {
    name: "Fertilizer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ["DL"],
    color: "#663607",
    requires: new Decimal(5e2), // Can be a function that takes requirement increases into account
    resource: "Fertilizer", // Name of prestige currency
    baseResource: "Leaves", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Reset for Fertilizer", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true
    },
})