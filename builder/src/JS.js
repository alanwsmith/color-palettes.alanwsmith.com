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
}

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

const handleKeydown = (event) => {
    const theKey = event.key.toLowerCase()
    // console.log(theKey)
    if (theKey === 'arrowdown') {
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
        if (state.order > 0) {
            state.order -= 1
            updateColors()
        }
    } else if (theKey === 'arrowright') {
        event.preventDefault()
        if (state.order < 23) {
            state.order += 1
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
    document.body.style.backgroundColor = colorSet[state.order][0]
    document.body.style.color = colorSet[state.order][3]
    document.querySelectorAll('h1').forEach((el) => {
        el.style.color = colorSet[state.order][1]
    })
    document.querySelectorAll('a').forEach((el) => {
        el.style.color = colorSet[state.order][2]
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
    }-${state.order}`

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

const init = () => {
    document.addEventListener('click', handleClick)
    updateColors()
    document.addEventListener('keydown', handleKeydown)
}

document.addEventListener('DOMContentLoaded', init)
