const headline = document.getElementById('Title')
const srchHistory = document.getElementById("prev-srch")
const searchForm = document.querySelector("#search-form")
const curntbox = document.getElementById("crnt-box")
const boxmain = document.getElementById("mn-box")
const Dateinput = document.getElementById("inp-srch")

let presentDate = new Date().toISOString().split("T")[0]


const Heading = document.createElement("h3")
const pic = document.createElement("img")
const Details = document.createElement("p")



window.addEventListener("load", () => {
    headline.textContent = `NASA Picture of The Day`
    getCurrentImageOfTheDay()
})

async function getImageOfTheDay() {

    // fetching data

    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=ZgrzN5vfW20Qcqwj96JbAnrtRfBE0jgwYCzHAWlL&date=${presentDate}`
    )
    const data = await response.json()
    console.log(data)

    // updating image on UI

    const picUrl = data?.url

    // console.log(imgUrl)

    pic.src = picUrl
    pic.classList.add("image")
    boxmain.appendChild(pic)

    // updating title

    const title = data?.title

    Heading.textContent = title
    curntbox.appendChild(Heading)

    // updating content on UI

    const paragraph = data?.explanation

    Details.textContent = paragraph
    curntbox.appendChild(Details)

    boxmain.appendChild(curntbox)
}


async function getCurrentImageOfTheDay() {
    try {
        // fetching data

        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=ZgrzN5vfW20Qcqwj96JbAnrtRfBE0jgwYCzHAWlL&date=${presentDate}`
        )
        const info = await response.json()
        console.log(info)

        // updating image on UI

        const picUrl = info?.url
        
        // console.log(imgUrl)


        pic.src = picUrl
        pic.classList.add("image")
        boxmain.appendChild(pic)

        // updating title

        const title = info?.title
        Heading.textContent = title
        curntbox.appendChild(Heading)

        // updating content on UI

        const para = info?.explanation
        Details.textContent = para
        curntbox.appendChild(Details)

        boxmain.appendChild(curntbox)
    } catch (error) {
        console.log("Error => " + error)
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()

    // const Dateinput = searchForm.elements["inp-srch"]

    if (Dateinput.value) {
        const selectedDate = new Date(Dateinput.value)
        presentDate = selectedDate.toISOString().split("T")[0]
        headline.textContent = `Picture On ${presentDate}`
        getImageOfTheDay()
        saveSearch()
        addSearchToHistory()
    }
})


function addSearchToHistory() {

    const a = document.createElement("a")
    a.href = ''
    const li = document.createElement("li")
    li.textContent = presentDate;
    a.appendChild(li)
    srchHistory.appendChild(a)

    a.addEventListener("click", (event) => {
        event.preventDefault()
        presentDate = li.textContent
        headline.textContent = `Picture On ${presentDate}`;
        getImageOfTheDay();
    });
}


function saveSearch() {
    let ArrayDate = []
    ArrayDate.push(presentDate)
    localStorage.setItem(`Date ${ArrayDate.length}`, presentDate)
}


 
