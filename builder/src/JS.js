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

let currentColors = []

const changeColorsToIndex = (index) => {
    const values = paletts[index]
    const colors = values.colors

    document.body.style.backgroundColor = colors[0]
    document.body.style.color = colors[3]
    document.querySelectorAll('a').forEach((a_tag) => {
        a_tag.style.color = colors[2]
    })
    document.querySelectorAll('h1').forEach((a_tag) => {
        a_tag.style.color = colors[1]
    })
    document.querySelectorAll('h2').forEach((a_tag) => {
        a_tag.style.color = colors[1]
    })

    currentColors = permutator(colors)
    for (pi = 0; pi < currentColors.length; pi++) {
        for (si = 0; si < 4; si++) {
            document.getElementById(
                `swatch--${pi}--${si}`
            ).style.backgroundColor = currentColors[pi][si]
        }
    }
}

const doChange = (event) => {
    changeColorsToIndex(parseInt(event.target.value, 10))
}

const changeArrangement = (index) => {
    console.log(index)
    document.body.style.backgroundColor = currentColors[index][0]
    document.body.style.color = currentColors[index][3]
    document.querySelectorAll('a').forEach((a_tag) => {
        a_tag.style.color = currentColors[index][2]
    })
    document.querySelectorAll('h1').forEach((a_tag) => {
        a_tag.style.color = currentColors[index][1]
    })
    document.querySelectorAll('h2').forEach((a_tag) => {
        a_tag.style.color = currentColors[index][1]
    })
}

const handleClick = (event) => {
    const paletteIndex = event.target.dataset.paletteIndex
    const colorArrangement = event.target.dataset.colorArrangement
    if (paletteIndex) {
        changeColorsToIndex(parseInt(paletteIndex, 10))
    } else if (colorArrangement) {
        changeArrangement(colorArrangement)
    }
}

const init = () => {
    console.log('init')
    document.addEventListener('click', handleClick)
    changeColorsToIndex(0)
}

document.addEventListener('DOMContentLoaded', init)
