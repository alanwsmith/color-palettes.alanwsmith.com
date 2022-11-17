const permutator = (inputArr) => {
    let result = []
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice()
                let next = curr.splice(i, 1)
                permute(curr.slice(), m.concat(next))
            }
        }
    }
    permute(inputArr)
    return result
}

const state = {
    palette: 0,
    arrangement: 0,
}

const handleClick = (event) => {
    const checkPalette = event.target.dataset.palette
    const checkArrangement = event.target.dataset.arrangement
    if (checkPalette) {
        state.palette = parseInt(checkPalette, 10)
        state.arrangement = 0
    } else if (checkArrangement) {
        state.arrangement = parseInt(checkArrangement, 10)
    }
    updateColors()
}

const handleKeydown = (event) => {
    const theKey = event.key.toLowerCase()
    // console.log(theKey)
    if (theKey === 'arrowdown') {
        if (state.palette < palettes.length - 2) {
            state.palette += 1
            state.arrangement = 0
            event.preventDefault()
            updateColors()
        }
    } else if (theKey === 'arrowup') {
        if (state.palette > 0) {
            state.palette -= 1
            state.arrangement = 0
            event.preventDefault()
            updateColors()
        }
    } else if (theKey === 'arrowleft') {
        if (state.arrangement > 0) {
            state.arrangement -= 1
            event.preventDefault()
            updateColors()
        }
    } else if (theKey === 'arrowright') {
        if (state.arrangement < 23) {
            state.arrangement += 1
            event.preventDefault()
            updateColors()
        }
    }
}

const updateColors = () => {
    // console.log(state)
    // Get the colors and put them in the display order
    const rawColorSet = permutator(palettes[state.palette].colors)
    const colorSet = [
        rawColorSet[2],
        rawColorSet[0],
        rawColorSet[5],
        rawColorSet[3],
        rawColorSet[1],
        rawColorSet[4],
        rawColorSet[23],
        rawColorSet[21],
        rawColorSet[19],
        rawColorSet[22],
        rawColorSet[20],
        rawColorSet[18],
        rawColorSet[9],
        rawColorSet[11],
        rawColorSet[6],
        rawColorSet[8],
        rawColorSet[10],
        rawColorSet[7],
        rawColorSet[15],
        rawColorSet[17],
        rawColorSet[12],
        rawColorSet[14],
        rawColorSet[16],
        rawColorSet[13],
    ]
    document.body.style.backgroundColor = colorSet[state.arrangement][0]
    document.body.style.color = colorSet[state.arrangement][3]
    document.querySelectorAll('h1').forEach((el) => {
        el.style.color = colorSet[state.arrangement][1]
    })
    document.querySelectorAll('a').forEach((el) => {
        el.style.color = colorSet[state.arrangement][2]
    })
    for (pi = 0; pi < colorSet.length; pi++) {
        for (si = 0; si < 4; si++) {
            document.getElementById(
                `swatch--${pi}--${si}`
            ).style.backgroundColor = colorSet[pi][si]
        }
    }
    document.getElementById('color-id').innerText = `${
        palettes[state.palette].name
    }-${state.arrangement}`

    document.querySelectorAll('.palette-wrapper').forEach((el) => {
        el.classList.remove('active-palette')
        el.classList.add('inactive-palette')
    })

    const activePalette = document.getElementById(
        `palette-wrapper-${state.palette}`
    )
    activePalette.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    activePalette.classList.remove('inactive-palette')
    activePalette.classList.add('active-palette')
}

const init = () => {
    document.addEventListener('click', handleClick)
    updateColors()
    document.addEventListener('keydown', handleKeydown)
}

document.addEventListener('DOMContentLoaded', init)
