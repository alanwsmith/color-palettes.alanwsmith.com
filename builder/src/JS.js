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

// let currentColors = []
// let currentPalette = 0
// let currentArrangement = 0

// const changeColorsToIndex = (index) => {
//     currentPalette = index
//     currentArrangement = 0
//     const values = palettes[index]
//     const colors = values.colors
//     document.body.style.backgroundColor = colors[0]
//     document.body.style.color = colors[3]
//     document.querySelectorAll('h1').forEach((a_tag) => {
//         a_tag.style.color = colors[2]
//     })
//     document.querySelectorAll('h2').forEach((a_tag) => {
//         a_tag.style.color = colors[2]
//     })
//     document.querySelectorAll('a').forEach((a_tag) => {
//         a_tag.style.color = colors[1]
//     })
//     currentColors = permutator(colors)
//     for (pi = 0; pi < currentColors.length; pi++) {
//         for (si = 0; si < 4; si++) {
//             document.getElementById(
//                 `swatch--${pi}--${si}`
//             ).style.backgroundColor = currentColors[pi][si]
//         }
//     }
// }

// const doChange = (event) => {
//     changeColorsToIndex(parseInt(event.target.value, 10))
// }

// const changeArrangement = (index) => {
//     document.body.style.backgroundColor = currentColors[index][0]
//     document.body.style.color = currentColors[index][3]
//     document.querySelectorAll('a').forEach((a_tag) => {
//         a_tag.style.color = currentColors[index][2]
//     })
//     document.querySelectorAll('h1').forEach((a_tag) => {
//         a_tag.style.color = currentColors[index][1]
//     })
//     document.querySelectorAll('h2').forEach((a_tag) => {
//         a_tag.style.color = currentColors[index][1]
//     })
// }

// const handleClick_old = (event) => {
//     const paletteIndex = event.target.dataset.paletteIndex
//     const colorArrangement = event.target.dataset.colorArrangement
//     if (paletteIndex) {
//         changeColorsToIndex(parseInt(paletteIndex, 10))
//     } else if (colorArrangement) {
//         changeArrangement(colorArrangement)
//     }
// }

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

    // const paletteIndex = event.target.dataset.paletteIndex
    // const colorArrangement = event.target.dataset.colorArrangement
    // if (paletteIndex) {
    //     changeColorsToIndex(parseInt(paletteIndex, 10))
    // } else if (colorArrangement) {
    //     changeArrangement(colorArrangement)
    // }
}

const handleKeyup = (event) => {
    const theKey = event.key.toLowerCase()
    console.log(theKey)

    if (theKey === 'j') {
        if (state.palette < palettes.length - 2) {
            state.palette += 1
            updateColors()
        }
    } else if (theKey === 'k') {
        if (state.palette > 0) {
            state.palette -= 1
            updateColors()
        }
    } else if (theKey === 'h') {
        if (state.arrangement > 0) {
            state.arrangement -= 1
            updateColors()
        }
    } else if (theKey === 'l') {
        if (state.arrangement < 23) {
            state.arrangement += 1
            updateColors()
        }
    }

    // } else if (theKey === 'k') {
    //     if (currentPalette > 0) {
    //         currentPalette -= 1
    //         changeColorsToIndex(currentPalette)
    //     }
    // } else if (theKey === 'l') {
    //     if (currentArrangement < 24) {
    //         currentArrangement += 1
    //         changeArrangement(currentArrangement)
    //     }
    // } else if (theKey === 'h') {
    //     if (currentArrangement > 0) {
    //         currentArrangement -= 1
    //         changeArrangement(currentArrangement)
    //     }
    // }
}

const updateColors = () => {
    console.log('update colors')
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
}

const init = () => {
    document.addEventListener('click', handleClick)
    updateColors()
    document.addEventListener('keyup', handleKeyup)
}

document.addEventListener('DOMContentLoaded', init)
