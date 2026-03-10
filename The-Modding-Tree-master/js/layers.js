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
        if (hasUpgrade('DL', 21))mult = mult.times(upgradeEffect('DL', 21))

        if (hasUpgrade('F', 11)) mult = mult.times(1.5)
        if (hasUpgrade('F', 13)) mult = mult.times(upgradeEffect('F', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for Dead Leaves", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
        description: "Leaves boost itself.",
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
        21: {
        title: "Back 2 Leaf Basics",
        description: "Fertilizer boosts Dead Leaf gain.",
        cost: new Decimal(100),
        unlocked() { 
            return hasUpgrade('F', 12) 
        },
        effect() {
        return player["F"].points.add(1).pow(0.65)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
        title: "Fun Fact: I made this in scool",
        description: "Dead Leaf boosts Leaves (again.)",
        cost: new Decimal(250),
        unlocked() { 
            return hasUpgrade('F', 12) 
        },
        effect() {
        return player["DL"].points.add(1).pow(0.30)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
        title: "a million leaves!",
        description: "*8 Leaves, and Fertilizer boosts Leaves.",
        cost: new Decimal(20000),
        unlocked() { 
            return hasUpgrade('F', 12) 
        },
        effect() {
        return player["F"].points.add(1).pow(0.40)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    }
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
    upgrades: {
        11: {
        title: "Dead leaves = Fertilizer",
        description: "*2 Leaves and *1.5 Dead Leaves",
        cost: new Decimal(1),
        },
        12: {
        title: "ITS OVER 500",
        description: "Unlock more upgrades in Dead Leaves, and *2.5 Leaves.",
        cost: new Decimal(1),
        },
        13: {
        title: "Era of Un-Automation",
        description: "Leaves boost Leaves and Dead Leaves.",
        cost: new Decimal(5),
        effect() {
        return player.points.add(1).pow(0.20)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
        title: "fertilizer is really getiin powerful",
        description: "Unlock Fallen Leaves.",
        cost: new Decimal(100),
        },
    }
})

addLayer("FL", {
    name: "Fallen Leaves", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches: ["DL"],
    color: "#0eb80e",
    requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
    resource: "Fallen Leaves", // Name of prestige currency
    baseResource: "Dead Leaves", // Name of resource prestige is based on
    baseAmount() {return player.DL.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 10,
    exponent: 1.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for Fallen Leaves", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return hasUpgrade("F", 14) 
    },
})