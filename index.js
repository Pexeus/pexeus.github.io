function generatePlayers(count) {
    const players = []

    for (let i = 0; i < count; i++) {
        const player = {
            kills: 0,
            death: false,
            deaths: 0
        }

        player.ID = i
        players.push(player)
    }

    return players
}

function game(players, maxKD, numRounds) {
    log("Spiele " + numRounds + " Runden...", "h1")
    let scores

    for (let i = 0; i < numRounds; i++) {
        log("Spiele Runde " + (i + 1), "h3")
        scores = playRound(players, maxKD)
        
        scores.forEach(player => {
            player.death = false
        })
    }

    return scores
}

function playRound(players, maxKD) {
    players.forEach(activePlayer =>{
        const maxKills = Math.round(Math.random() *  maxKD)
        let kills = 0
        
        players.forEach(player =>{
            if (player.ID != activePlayer.ID && kills < maxKills) {
                if(player.death == false) {
                    log(`Player ${activePlayer.ID} killed Player ${player.ID}`);
                    player.death = true
                    player.deaths += 1
                    activePlayer.kills += 1

                    kills++
                }
            }
        })
    })

    console.log(players);

    return players
}

function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function analyse(players, numDeaths) {
    log("Analysiere Scores...", "h1")

    players = players.sort(dynamicSort("kills")).reverse()
    let avgKDVisualized = "Berechne KD aus:"
    let kFull = 0

    players.forEach(player => {
        log(`[Player ${player.ID}] KD: ${player.kills / player.deaths}`);
    })

    players.forEach(player => {
        avgKDVisualized += `[ ${player.kills}/${player.deaths} ]`
        kFull += player.kills
    })

    log(avgKDVisualized);

    log("Durchschnittliche KD: " + Math.round(kFull / numDeaths), "h1")
}

function log(message, type) {
    const logs = vie.get("#logs")

    if (type == undefined) {
        type = "p"
    }

    const log = vie.new(type, "#log", message)
    logs.appendChild(log)
}

function clearLogs() {
    vie.get("#logs").innerHTML = ""
}

function init() {
    clearLogs()

    const numPlayers = vie.get("#numPlayers").value
    const maxKills = vie.get("#killRange").value
    const numGames = vie.get("#numGames").value
    console.log(maxKills);

    console.log(maxKills + 2);

    const players = generatePlayers(numPlayers)

    const scores = game(players, maxKills, numGames)

    analyse(scores, numGames * numPlayers)
}

function scrollResults() {
    const logs = vie.get("#logs")

    logs.scrollTop = logs.scrollHeight
}