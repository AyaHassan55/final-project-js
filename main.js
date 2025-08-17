
const baseUrl='https://tarmeezacademy.com/api/v1'

function getPosts(){

    axios.get(`${baseUrl}/posts?limit=6`,{

    }).then((response)=>{
        response.data.data.forEach(post => {
            // document.getElementById('posts').innerHTML=''
            let tagsHtml = '';
            post.tags.forEach(tag =>{
                tagsHtml += `<span class="tag">#${tag.name}</span> `;
            })
            let profileImage = (post.author.profile_image && typeof post.author.profile_image === "string")? post.author.profile_image : './profile-pics/announe-profile.jpg';
            let timeline = `
                <div class="card shadow">
                        <div class="card-header">
                            <img class="rounded-circle border border-2" src=${profileImage} alt="" style="height: 40px; width: 40px;">
                            <b>${post.author.username}</b>
                        </div>
                        <div class="card-body">
                            <img class="w-100" src=${post.image} alt="">
                            <h6 style="color: rgb(193,193,193);" class="mt-1">${post.created_at}</h6>
                            <h5>${post.title}</h5>
                            <p>${post.body}</p>
                        </div>
                        <hr>
                        <div class="p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                            </svg>
                            <span>${post.comments_count} Comments</span>
                            <div class="tags">
                                ${tagsHtml}
                            </div>
                        </div>
                    </div>
            `
            document.getElementById('posts').innerHTML +=timeline;
        });
        
        // console.log(Response);
    }).catch((err)=>{
        alert(err);
    })
}
getPosts()

function loginBtnClicked(){
    // alert('hi')
    const username =document.getElementById('username-input').value
    const password =document.getElementById('pass-input').value
    // console.log(username,password)
    const params = {
        "username":username,
        "password":password
    }
    axios.post(`${baseUrl}/login`,params)
    .then((response)=>{
        localStorage.setItem('token',response.data.token)
        // localStorage.setItem('user', response.data.user) // to can store it in localStorage you should convert it to string
        localStorage.setItem('user',JSON.stringify(response.data.user))
        // to close model after login

        

        const loginModel = document.getElementById('login-modal')
        const modal = bootstrap.Modal.getInstance(loginModel)
        modal.hide()
        document.activeElement.blur() // يشيل الفوكس من الزرار

        AlertLoginSuccess()
        setUpUI()
        // alert('Login Success')
    })
    .catch((err)=>{
        alert(err)
    })
}
function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    alert('Logout Success')
    setUpUI()
}

// function AlertLoginSuccess(){
//     const alertPlaceholder = document.getElementById('success-alert')
//     const appendAlert = (message, type) => {
//         const wrapper = document.createElement('div')
//         wrapper.innerHTML = [
//             `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//             `   <div>${message}</div>`,
//             '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//             '</div>'
//         ].join('')

//         alertPlaceholder.append(wrapper)
//     }

//     const alertTrigger = document.getElementById('liveAlertBtn')
//     if (alertTrigger) {
//         alertTrigger.addEventListener('click', () => {
//             appendAlert('Nice, you triggered this alert message!', 'success')
//         })
//     }
// }
function AlertLoginSuccess(){
    const alertPlaceholder = document.getElementById('success-alert')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
        <div class="alert alert-success alert-dismissible" role="alert">
            <div>Login Success 🎉</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
    alertPlaceholder.append(wrapper)
}
function setUpUI(){
    const token = localStorage.getItem('token')
    const loginDiv = document.getElementById('login-div')
    const logoutDiv = document.getElementById('logout-div')

    if(token == null){
        logoutDiv.style.setProperty('display', 'none','important')
        loginDiv.style.setProperty('display', 'flex','important')
        
    }else{
        loginDiv.style.setProperty('display', 'none','important')
        logoutDiv.style.setProperty('display', 'flex','important')
    }
}
