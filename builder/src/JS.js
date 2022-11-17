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
    order: 0,
    show: true,
    els: {},
    readme: true,
}

const e = {}

const handleClick = (event) => {
    const checkPalette = event.target.dataset.palette
    const checkArrangement = event.target.dataset.arrangement
    if (checkPalette) {
        state.palette = parseInt(checkPalette, 10)
        updateOrder()
    } else if (checkArrangement) {
        state.order = parseInt(checkArrangement, 10)
    }
    updateColors()
}

const updateOrder = () => {
    const order = localStorage.getItem(`palette-${state.palette}-order`)
    if (order) {
        state.order = parseInt(order, 10)
    } else {
        state.order = 0
    }
}

const decreaseOrder = () => {
    if (state.order == 0) {
        state.order = 23
    } else {
        state.order -= 1
    }
}

const decreasePalette = () => {
    if (state.palette == 0) {
        state.palette = palettes.length - 1
    } else {
        state.palette -= 1
    }
}

const increaseOrder = () => {
    if (state.order == 23) {
        state.order = 0
    } else {
        state.order += 1
    }
}

const increasePalette = () => {
    if (state.palette == palettes.length - 1) {
        state.palette = 0
    } else {
        state.palette += 1
    }
}

const handleKeydown = (event) => {
    const theKey = event.key.toLowerCase()
    if (theKey === 'h') {
        event.preventDefault()
        handleShowHide()
    } else if (theKey === 'arrowdown') {
        event.preventDefault()
        if (state.palette < palettes.length - 2) {
            state.palette += 1
            updateOrder()
            updateColors()
        }
    } else if (theKey === 'arrowup') {
        event.preventDefault()
        if (state.palette > 0) {
            state.palette -= 1
            updateOrder()
            updateColors()
        }
    } else if (theKey === 'arrowleft') {
        event.preventDefault()
        decreaseOrder()
        if (state.order == 23) {
            decreasePalette()
        }
        updateColors()
    } else if (theKey === 'arrowright') {
        event.preventDefault()
        increaseOrder()
        if (state.order == 0) {
            increasePalette()
        }
        updateColors()
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

    const colors = [
        colorSet[state.order][0],
        colorSet[state.order][3],
        colorSet[state.order][1],
        colorSet[state.order][2],
    ]

    document.body.style.backgroundColor = colors[0]
    document.body.style.color = colors[1]
    document.querySelectorAll('h1').forEach((el) => {
        el.style.color = colors[2]
    })
    document.querySelectorAll('a').forEach((el) => {
        el.style.color = colors[3]
    })

    e.showHide.style.backgroundColor = colors[0]
    e.showHide.style.color = colors[3]
    e.showReadme.style.backgroundColor = colors[0]
    e.showReadme.style.color = colors[3]

    // output the orded based swatches
    for (pi = 0; pi < colorSet.length; pi++) {
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

    localStorage.setItem(`palette-${state.palette}-order`, state.order)
}

const handleShowHide = () => {
    state.show = state.show ? false : true
    if (state.show) {
        e.arrangements.classList.remove('fade-out')
        e.arrangements.classList.add('fade-in')
        e.colorsCol.classList.remove('fade-out')
        e.colorsCol.classList.add('fade-in')
        e.showHide.innerText = 'hide palettes'
    } else {
        e.arrangements.classList.remove('fade-in')
        e.arrangements.classList.add('fade-out')
        e.colorsCol.classList.remove('fade-in')
        e.colorsCol.classList.add('fade-out')
        e.showHide.innerText = 'show palettes'
    }

    console.log(state.show)
}

const handleShowReadme = () => {
    state.readme = state.readme ? false : true
    console.log(state.readme)

    if (state.readme) {
        document.querySelectorAll('.introText').forEach((el) => {
            console.log(el)
            el.classList.add('hideReadme')
        })
    } else {
        document.querySelectorAll('.introText').forEach((el) => {
            el.classList.remove('hideReadme')
        })
    }
}

const init = () => {
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeydown)
    e['arrangements'] = document.getElementById('arrangements')
    e['colorsCol'] = document.getElementById('colors-col')
    e['currentOrder'] = document.getElementById('currentOrder')
    e['currentPalette'] = document.getElementById('currentPalette')
    e['currentStyles'] = document.getElementById('currentStyles')
    e['showReadme'] = document.getElementById('showReadme')
    e['showReadme'].addEventListener('click', handleShowReadme)
    e['showHide'] = document.getElementById('showHide')
    e['showHide'].addEventListener('click', handleShowHide)
    updateColors()
}

document.addEventListener('DOMContentLoaded', init)
