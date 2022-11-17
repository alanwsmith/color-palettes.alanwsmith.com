// Holder for the state
const state = {
    palette: 1,
    order: 1,
    settings: true,
    side: true,
    top: true,
    textColors: 3,
}

// Holder for the elements
const e = {}

// Holder for colors
const c = [null]

const getRatios = (a, b) => {
    const ratio = (a + 0.05) / (b + 0.05)
    return ratio.toFixed(2)
}

const loadColors = () => {
    palettes.forEach((palette, index) => {
        if (index > 0) {
            const payload = {
                name: palette.name,
                colors: palette.colors,
                lums: palette.lums,
                ratios: [null],
            }
            payload.ratios.push(getRatios(payload.lums[0], payload.lums[1]))
            payload.ratios.push(getRatios(payload.lums[0], payload.lums[2]))
            payload.ratios.push(getRatios(payload.lums[0], payload.lums[3]))
            c.push(payload)
        }
    })
    console.log(c[3])
}

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
const handleClick = (event) => {
    const checkPalette = event.target.dataset.palette
    const checkArrangement = event.target.dataset.arrangement
    if (checkPalette) {
        state.palette = parseInt(checkPalette, 10)
        state.order = 1
    } else if (checkArrangement) {
        state.order = parseInt(checkArrangement, 10)
    }
    updateColors()
}

const decreaseOrder = () => {
    if (state.order == 1) {
        state.order = 24
    } else {
        state.order -= 1
    }
}

const decreasePalette = () => {
    if (state.palette == 1) {
        state.palette = palettes.length - 1
    } else {
        state.palette -= 1
    }
}

const increaseOrder = () => {
    if (state.order == 24) {
        state.order = 1
    } else {
        state.order += 1
    }
}

const increasePalette = () => {
    if (state.palette == palettes.length - 1) {
        state.palette = 1
    } else {
        state.palette += 1
    }
}

const handleKeydown = (event) => {
    const theKey = event.key.toLowerCase()
    if (theKey === 's') {
        event.preventDefault()
        handleToggleSide()
    } else if (theKey === 't') {
        event.preventDefault()
        handleToggleTop()
    } else if (theKey === 'h') {
        event.preventDefault()
        handleToggleSideAndTop()
    } else if (theKey === 'arrowup') {
        event.preventDefault()
        if (19 <= state.order && state.order <= 24) {
            state.order = 13
        } else if (13 <= state.order && state.order <= 18) {
            state.order = 7
        } else if (7 <= state.order && state.order <= 12) {
            state.order = 1
        } else if (1 <= state.order && state.order <= 6) {
            decreasePalette()
            state.order = 19
        }
        updateColors()
    } else if (theKey === 'arrowdown') {
        event.preventDefault()
        if (1 <= state.order && state.order <= 6) {
            state.order = 7
        } else if (7 <= state.order && state.order <= 12) {
            state.order = 13
        } else if (12 <= state.order && state.order <= 18) {
            state.order = 19
        } else if (19 <= state.order && state.order <= 24) {
            increasePalette()
            state.order = 1
        }
        updateColors()
    } else if (theKey === 'arrowleft') {
        event.preventDefault()
        decreaseOrder()
        if (state.order == 24) {
            decreasePalette()
        }
        updateColors()
    } else if (theKey === 'arrowright') {
        event.preventDefault()
        increaseOrder()
        if (state.order == 1) {
            increasePalette()
        }
        updateColors()
    }
}

const updateColors = () => {
    // console.log(state)
    // Get the colors and put them in the display order
    const rawColorSet = permutator(palettes[state.palette].colors)
    const rawLumsSet = permutator(palettes[state.palette].lums)

    const colorOrder = [
        0, 2, 4, 1, 3, 5, 23, 21, 19, 22, 20, 18, 7, 10, 6, 8, 11, 9, 14, 12,
        17, 15, 13, 16,
    ]

    let colorSet = [null]
    let lumsSet = [null]

    colorOrder.forEach((num) => {
        colorSet.push(rawColorSet[num])
        lumsSet.push(rawLumsSet[num])
    })

    // console.log(colorSet)

    // colorSet = [
    //     null,
    //     rawColorSet[0],
    //     rawColorSet[2],
    //     rawColorSet[4],
    //     rawColorSet[1],
    //     rawColorSet[3],
    //     rawColorSet[5],
    //     rawColorSet[23],
    //     rawColorSet[21],
    //     rawColorSet[19],
    //     rawColorSet[22],
    //     rawColorSet[20],
    //     rawColorSet[18],
    //     rawColorSet[7],
    //     rawColorSet[10],
    //     rawColorSet[6],
    //     rawColorSet[8],
    //     rawColorSet[11],
    //     rawColorSet[9],
    //     rawColorSet[14],
    //     rawColorSet[12],
    //     rawColorSet[17],
    //     rawColorSet[15],
    //     rawColorSet[13],
    //     rawColorSet[16],
    // ]

    const colors = [
        colorSet[state.order][0],
        colorSet[state.order][1],
        colorSet[state.order][2],
        colorSet[state.order][3],
    ]

    const contrasts = [{ r1: 0 }, { r1: 2 }, { r1: 4 }]

    if (state.textColors == 2) {
        colors[3] = colorSet[state.order][1]
    } else if (state.textColors == 1) {
        colors[2] = colorSet[state.order][3]
        colors[3] = colorSet[state.order][3]
    }

    document.body.style.backgroundColor = colors[0]
    document.body.style.color = colors[1]
    document.querySelectorAll('h1').forEach((el) => {
        el.style.color = colors[2]
    })
    document.querySelectorAll('h2').forEach((el) => {
        el.style.color = colors[2]
    })
    document.querySelectorAll('a').forEach((el) => {
        el.style.color = colors[3]
    })

    e.toggleSide.style.backgroundColor = colors[0]
    e.toggleSide.style.color = colors[3]
    e.toggleTop.style.backgroundColor = colors[0]
    e.toggleTop.style.color = colors[3]
    e.toggleSettings.style.backgroundColor = colors[0]
    e.toggleSettings.style.color = colors[3]

    // output the orded based swatches
    for (pi = 1; pi < colorSet.length; pi++) {
        for (si = 0; si < 4; si++) {
            document.getElementById(
                `swatch--${pi}--${si}`
            ).style.backgroundColor = colorSet[pi][si]
        }
    }

    e.currentPalette.innerText = palettes[state.palette].name
    e.currentOrder.innerText = state.order

    const styleString = `body { background-color: ${colors[0]}; color: ${colors[1]}; } h1, h2 { color: ${colors[2]}; } a { color: ${colors[3]}; }`

    e.currentStyles.innerText = styleString

    // Switch on the actice order
    document.querySelectorAll('.color-arrangement').forEach((el) => {
        el.classList.remove('color-arrangement-active')
        el.classList.add('color-arrangement-inactive')
    })
    const activeOrder = document.getElementById(
        `color-arrangement-${state.order}`
    )
    activeOrder.classList.remove('color-arrangement-inactive')
    activeOrder.classList.add('color-arrangement-active')

    // Switch on the active palette
    document.querySelectorAll('.palette-wrapper').forEach((el) => {
        el.classList.remove('active-palette')
        el.classList.add('inactive-palette')
    })
    const activePalette = document.getElementById(
        `palette-wrapper-${state.palette}`
    )
    activePalette.classList.remove('inactive-palette')
    activePalette.classList.add('active-palette')
    activePalette.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

    localStorage.setItem(`statePalette`, state.palette)
    localStorage.setItem(`stateOrder`, state.order)
}

const handleToggleSideAndTop = () => {
    if (state.top != state.side) {
        // set both to true so the toggle
        // call turns them both off if
        // they aren't already
        state.top = true
        state.side = true
    }
    handleToggleTop()
    handleToggleSide()
}

const handleToggleTop = () => {
    state.top = state.top ? false : true
    if (state.top) {
        e.arrangements.classList.remove('fade-out')
        e.arrangements.classList.add('fade-in')
        e.toggleTop.innerText = 'top:y'
    } else {
        e.arrangements.classList.remove('fade-in')
        e.arrangements.classList.add('fade-out')
        e.toggleTop.innerText = 'top:n'
    }
}

const handleToggleSide = () => {
    state.side = state.side ? false : true
    if (state.side) {
        e.colorsCol.classList.remove('fade-out')
        e.colorsCol.classList.add('fade-in')
        e.toggleSide.innerText = 'side:y'
    } else {
        e.colorsCol.classList.remove('fade-in')
        e.colorsCol.classList.add('fade-out')
        e.toggleSide.innerText = 'side:n'
    }
}

const handleToggleSettings = () => {
    console.log('a')
    state.settings = state.settings ? false : true
    if (state.settings) {
        e.settingsBody.classList.remove('hideContent')
        e.designAlfaBody.classList.add('hideContent')
    } else {
        e.settingsBody.classList.add('hideContent')
        e.designAlfaBody.classList.remove('hideContent')
    }
}

const handleSwitchTextColors = () => {
    if (state.textColors == 1) {
        state.textColors = 3
    } else {
        state.textColors -= 1
    }
    updateColors()
}

const init = () => {
    loadColors()
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeydown)

    const els = [
        'arrangements',
        'colorsCol',
        'currentOrder',
        'currentPalette',
        'currentStyles',
        'toggleSettings',
        'toggleSide',
        'toggleTop',
        'settingsBody',
        'designAlfaBody',
        'switchTextColors',
        'bodyLums',
        'headerLums',
        'linkLums',
    ]
    els.forEach((name) => {
        e[name] = document.getElementById(name)
    })

    e['toggleSettings'].addEventListener('click', handleToggleSettings)
    e['toggleTop'].addEventListener('click', handleToggleTop)
    e['toggleSide'].addEventListener('click', handleToggleSide)
    e['switchTextColors'].addEventListener('click', handleSwitchTextColors)

    const checkStatePalette = localStorage.getItem('statePalette')
    const checkStateOrder = localStorage.getItem('stateOrder')
    if (checkStatePalette) {
        state.palette = parseInt(checkStatePalette, 10)
    }
    if (checkStateOrder) {
        state.order = parseInt(checkStateOrder, 10)
    }

    updateColors()
}

document.addEventListener('DOMContentLoaded', init)
