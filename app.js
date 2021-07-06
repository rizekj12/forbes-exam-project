
const testImages = [
    'https://i.guim.co.uk/img/media/8f02bb49224d9a94699b75213664bf898617c062/0_288_5315_3189/master/5315.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=89721e1224115e05a05203a62cf93f7c',
    'https://i.natgeofe.com/n/53cb5683-66c1-4840-ab1f-bd313840e78f/01-chocolate-lab-nationalgeographic_1154144.jpg',
    'https://styles.redditmedia.com/t5_2qmqq/styles/communityIcon_czbg6kar0h721.jpg', 
    'https://i.natgeofe.com/n/de7be89d-3715-4e89-b83b-ab697ef781b8/thumbnail-cape-buffalo-nationalgeographic_1976203.jpg',
    'https://cdn.britannica.com/22/206222-131-E921E1FB/Domestic-feline-tabby-cat.jpg',
    'https://images.wsj.net/im-187611?width=1280&size=1',
    'https://ichef.bbci.co.uk/news/976/cpsprodpb/1675A/production/_113249919_hi061718491.jpg', 'https://i.guim.co.uk/img/media/9c03bd43c119834ece958f3c370dec83146fe04a/0_200_6000_3602/master/6000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=de1abf11d1a7a961d5fea63f5a8bee55'
]

const dogApi = 'https://dog.ceo/api/breeds/image/random'

const modalBg = document.querySelector('.modal-bg')
const modalClose = document.querySelector('.modal-close')
const modal = document.querySelector('.modal')
const modalImg = document.querySelector('.modal-img')
modalImg.height = '50px'

const listElement = document.getElementById('list')
const paginiationElement = document.getElementById('pagination')
const paginiationBtns = document.getElementById('paginationBtns')
const arrowDiv1 = document.getElementById('arrowDiv1')
const arrowDiv2 = document.getElementById('arrowDiv2')

let currentPage = 1
let rows = 4
let dogData = []


async function getImg(url) {

    try {
        let randomData = await axios.get(url)
        let randomImg = randomData.data.message
        
        return randomImg
    } catch{
        console.log('error')
    }
}

for(i = 0; i < 20; i++){
    let randomDog = getImg(dogApi)
    dogData.push(randomDog)
}


function displayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = ""
    page--

    let start = rows_per_page * page
    let end = start + rows_per_page
    let paginatedItems = items.slice(start, end)

    paginatedItems.forEach((i) => {
        const cardImg = document.createElement('img')
        cardImg.setAttribute('src', i)
        cardImg.style.height = '250px'
        cardImg.style.width = '300px'
        wrapper.appendChild(cardImg)
        cardImg.addEventListener('click', (e) => {
            e.preventDefault()
            modalBg.classList.add('bg-active')
            modalImg.src = cardImg.src
        })
    })
}

function setupPaginiation(items, wrapper, rows_perpage) {
    wrapper.innerHTML = ""

    let pageCount = Math.ceil(items.length / rows_perpage)
    for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationButton(i, items)
        wrapper.appendChild(btn)
    }
}

function paginationButton(page, items) {
    let button = document.createElement('button')
    
    button.className = 'pagButton'
    button.innerText = page

    if (currentPage == page) button.classList.add('active')
    button.addEventListener('click', function () {
        currentPage = page
        displayList(items, listElement, rows, currentPage)
    })
    return button
}

function createArrowButton(){
  let nextButton = document.createElement('button')
  let prevButton = document.createElement('button')
  nextButton.className = 'arrowBtn'
  prevButton.className = 'arrowBtn'

  prevButton.innerText = '<'
  prevButton.addEventListener('click', function(){
      currentPage--
      displayList(testImages, listElement, rows, currentPage)
  })

  nextButton.innerText = '>'
  nextButton.addEventListener('click', function(){
      currentPage++
      displayList(testImages, listElement, rows, currentPage)
  })
  arrowDiv1.appendChild(prevButton)
  arrowDiv2.appendChild(nextButton)

}

modalClose.addEventListener('click', function (e) {
    e.preventDefault()
    modalBg.classList.remove('bg-active')
})

displayList(testImages, listElement, rows, currentPage);
createArrowButton()
setupPaginiation(testImages, paginiationBtns, rows);
getImg(dogApi)






