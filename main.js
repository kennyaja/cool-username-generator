let nameInputEl = document.getElementById("nameInput");
let generateBtnEl = document.getElementById("generateBtn");
let nameOutputEl = document.getElementById("nameOutput");

Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
}

String.prototype.capitalizeFirstLetter = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

function getRandom(chance) {
	return (Math.random() <= chance);
}

function getPrefix() {
	let prefixes = [
		"ii",
		"xx",
		"Its",
		"FaZe_",
		"Almighty",
		"Overlord",
		"Hacker",
		"Alpha",
		"Sigma",
		"Skibidi",
		"",
	];

	let prefixHasUnderscoreBlacklist = [
		"ii",
		"FaZe_",
		"AlphaWolf_",
	];

	let prefixHasUnderscoreChance = getRandom(0.2);
	let randomPrefix = prefixes.random();

	if (prefixHasUnderscoreChance && !prefixHasUnderscoreBlacklist.find((prefix) => prefix == randomPrefix)) {
		return randomPrefix + "_";
	}

	return randomPrefix;
}

function getSuffix() {
	let suffixes = [
		"TheDestroyer",
		"TheAssassin",
		"TheGreat",
		"TheGigachad",
		"TheDragonSlayer",
		"TheFirst",
		"Master",
		"Gangster",
		"Spartan",
		"Playz",
		"Plays",
		"Gaming",
		"YT",
		"TTV",
		"_",
	];

	let suffixHasUnderscoreBlacklist = [
		"_",
	]

	let suffixHasUnderscoreChance = getRandom(0.2);
	let randomSuffix = suffixes.random();

	if (suffixHasUnderscoreChance && !suffixHasUnderscoreBlacklist.find((suffix) => suffix == randomSuffix)) {
		return "_" + randomSuffix;
	}

	return randomSuffix;
}

function getNumericSuffix() {
	let commonNumbers = [
		"69",
		"420",
		"1337",
		"88",
		"777",
		"5",
		"13",
		"001",
		"123",
		"727",
		"1234",
		"99",
		"1",
		"3",
		"888",
		"7",
		"42",
		"0",
		"123456789",
		"404",
	];

	let commonNumberChance = getRandom(0.6);

	if (commonNumberChance) {
		return commonNumbers.random();
	}

	return Math.floor(Math.random() * 10 ** (Math.random() * 4));
}

function getWrapper() {
	let wrappers = [
		{
			left: "Xx_",
			right: "_xX",
		},
		{
			left: "xXx",
			right: "xXx",
		},
		{
			left: "_",
			right: "_",
		},
	];

	return wrappers.random();
}

function leetify(str) {
	return str.split("").map((char) => {
		switch (char.toLowerCase()) {
			case "e":
				return "3";
			case "i":
				return "1";
			case "o":
				return "0";
			case "t":
				return "7";
			case "b":
				return "8";
			case "a":
				return "4";
			case "s":
				return "5";
		}

		return char.toUpperCase();
	}).join("");
}

function screwCapitalization(str) {
	return str.split("").map((char) => {
		let upperCaseChance = getRandom(0.5);
		
		return upperCaseChance ? char.toUpperCase() : char.toLowerCase();
	}).join("");
}

function createNewUsername(name) {
	name = name.capitalizeFirstLetter();

	if (name === "") {
		nameOutputEl.innerHTML = "Please insert a name";
		return;
	}

	let prefixChance = getRandom(0.7);
	let suffixChance = getRandom(0.9);
	let wrapperChance = getRandom(0.15);
	let numericSuffixChance = getRandom(0.35);
	let leetifyChance = getRandom(0.15);
	let screwCapitalizationChance = getRandom(0.07);

	let prefixes = [];
	let suffixes = [];

	if (prefixChance) {
		prefixes.push(getPrefix());
	}

	if (suffixChance) {
		suffixes.push(getSuffix());
	}

	if (numericSuffixChance) {
		suffixes.push(getNumericSuffix());
	}

	if (leetifyChance) {
		let leetifyVictims = [
			"prefix",
			"suffix",
			"name",
		];

		let suffixLeetifyWhitelist = [
			"Master",
			"Gangster",
			"Spartan",
			"Playz",
			"Plays",
			"Gaming",
			"YT",
			"TTV",
		]
		
		let leetifyVictim = leetifyVictims.random();

		if (leetifyVictim == "prefix" && prefixes != []) {
			prefixes = prefixes.map((prefix) => leetify(prefix));
		} else if (leetifyVictim == "suffix" && suffixLeetifyWhitelist.find((allowedSuffix) => suffixes.find((suffix) => suffix == allowedSuffix))) {
			suffixes = suffixes.map((suffix) => leetify(suffix));
		} else {
			name = leetify(name);
		}

	}

	let resultUsername = prefixes.join("") + name + suffixes.join("");

	if (wrapperChance) {
		let wrapper = getWrapper();
		resultUsername = wrapper.left + resultUsername + wrapper.right;
	}

	if (screwCapitalizationChance) {
		resultUsername = screwCapitalization(resultUsername);
	}

	nameOutputEl.innerHTML = resultUsername;
}

generateBtnEl.onclick = () => createNewUsername(nameInputEl.value);
nameInputEl.addEventListener('keypress', (event) => {
	if (event.key == "Enter") {
		createNewUsername(nameInputEl.value);
	}
});