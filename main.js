const listUsers = document.querySelector('.list-user')
const tableList = document.querySelector('.table-list')
const imgMin = document.querySelector('.img')
const information = document.querySelector('.infor')


var userCurr, listUsersCurr;


// render list of users
function listTableUsers(users) {
    listUsersCurr = users
    var html = users.map(  (user, index) =>{
        return `
        <div class="users" id="${user.id}" data-index="${index}">
            <img class="img" src="${user.img}"></img>
            <div class="css_marA">${user.name}</div>
            <div class="css_marA">${user.role}</div>
            <div class="css_marA">${user.link}</div>
        </div>
        `
    })
    listUsers.innerHTML = html.join('')
}

// render infor users
function handleRenderInfo (users) {
    listUsers.onclick = (e) =>{
        // lấy thông tin khi click vào user
        userCurr = e.target.closest('.users')

        var profile = users[userCurr.dataset.index]
        renderInfo(profile)
    } 
}

function renderInfo(profile) {
    var html = [
        `
        <div class="">
            <div class="avt"> </div>
            <div class="name">${profile.name}</div>
        </div>

        <div class="css-pad">
            <div class="">
                <i class="fa-solid fa-envelope"></i>
                Email
            </div>
        <div class="content">${profile.link}</div>
        </div>

        <div class="css-pad">
            <div class="">
                <i class="fa-solid fa-envelope"></i>
                Slogan
            </div>
            <div class="content">${profile.slogan}</div>
        </div>

        <div class="css-pad">
            <div class=""> 
                <i class="fa-solid fa-shield"></i>
                Roles
            </div>
            <div class="content">${profile.role}</div>
        </div>
    `]
    information.innerHTML = html.join('')
    const avt = document.querySelector('.avt')
    avt.style.backgroundImage = `url(${profile.img})`
}


// create new user
function handleCreateForm() {
    const overlay_1 = document.querySelector('.overlay_1')
    const crearNewUser = document.querySelector('.creat')
    const exit = document.querySelector('.fa-xmark')

    //Xử lí tắt create users
    exit.onclick = () =>{
    overlay_1.classList.remove('open')
    }

    //Xử lí bật create users
    crearNewUser.onclick = () =>{
        overlay_1.classList.add('open')
    }

    // create new user
    const btnCreate = document.querySelector('.btn-ceate')
    btnCreate.onclick = () =>{
        const name = document.getElementById('fullName').value
        const role = document.getElementById('role').value
        const email = document.getElementById('email').value
        const slogan = document.getElementById('slogan').value
        const image = document.getElementById('image').value

        const data = {
            img: image,
            name: name,
            role: role,
            link: email,
            slogan: slogan,
        }
        createUser(data, function(){
            getUser(listTableUsers)
            overlay_1.classList.remove('open')
        })
    }


}

// function bật tắt và gọi đến các option 
function handleOption() {
    const overlay_2 = document.querySelector('.overlay_2')
    const option = document.querySelector('.fa-pen')
    const exit2 = document.querySelector('.exit2')

    // open option
    option.onclick = () => {
        overlay_2.classList.add('open')
    }
    //close option
    exit2.onclick = () =>{
        overlay_2.classList.remove('open')
    }

    //gọi đến hàm delete user
    const deleteBtn = document.querySelector('.deleteBtn')
    deleteBtn.onclick = () => {
        const id = userCurr.id
        DeleteUser(id)
        overlay_2.classList.remove('open')
    }

    // update user
    const btnUpdate = document.querySelector('.btn-update')
    btnUpdate.onclick = () =>{
        const id = userCurr.id

        const name = document.getElementById('fullName1').value
        const role = document.getElementById('role1').value
        const email = document.getElementById('email1').value
        const slogan = document.getElementById('slogan1').value
        const image = document.getElementById('image1').value

        const data = {
            img: image,
            name: name,
            role: role,
            link: email,
            slogan: slogan,
        }
        updateUser(data, id, function(){
            getUser(listTableUsers)
            overlay_2.classList.remove('open')
        })
    }

}

// function delete user
function DeleteUser(id) {
    var option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }
    fetch(api + '/' + id, option)
        .then (response => {
            return response.json()
        })
        .then(function() {
            const userDele = document.getElementById(id)
            if (userDele) {
                userDele.remove()
            }
        })
}

// function update user
function updateUser(data, id, callback) {
    var option = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(api + '/' + id , option)
        .then (response => {
            return response.json()
        })
        .then(callback)
}


function handleFindUser() {
    const btnSearch = document.querySelector('.btnSearch')
    btnSearch.onclick = () =>{
        const userFind = document.querySelector('.find ').value
        listUsersCurr.map((user) =>{
            if( user.name === userFind) {
                renderInfo(user)
            }
        })
    }
}

   

// call API 
var api = 'https://fake-api-production-e336.up.railway.app/users' 
function getUser(callback) {
    fetch(api) 
        .then(Response => {
            return Response.json()
        })

        .then(callback)
}

function createUser(data, callback) {
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(api, option)
        .then (response => {
            return response.json()
        })
        .then(callback)
}


function start() {
    getUser(listTableUsers)
    getUser(handleRenderInfo)
    handleFindUser()
    handleCreateForm()
    handleOption()
}

start()