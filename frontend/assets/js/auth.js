const API_URL = "https://auth-fullstack-clean.onrender.com/api/auth"

const message = document.getElementById("message")

// Auto redirect ถ้ามี token
const token = localStorage.getItem("token")
if(token && window.location.pathname.includes("index.html")){
  window.location.href = "home.html"
}

// LOGIN
const loginForm = document.getElementById("loginForm")
if(loginForm){
  loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const res = await fetch(API_URL+"/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ email,password })
    })

    const data = await res.json()

    if(res.ok){
      localStorage.setItem("token",data.token)
      window.location.href="home.html"
    }else{
      showMessage(data.message,false)
    }
  })
}

// SIGNUP
const signupForm = document.getElementById("signupForm")
if(signupForm){
  signupForm.addEventListener("submit", async (e)=>{
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const res = await fetch(API_URL+"/register",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ email,password })
    })

    const data = await res.json()

    if(res.ok){
      showMessage("สมัครสำเร็จ",true)
      setTimeout(()=>window.location="index.html",1000)
    }else{
      showMessage(data.message,false)
    }
  })
}

// HOME PROTECTION
if(window.location.pathname.includes("home.html")){
  if(!token){
    window.location.href="index.html"
  }
}

function logout(){
  localStorage.removeItem("token")
  window.location.href="index.html"
}

function showMessage(text,success){
  if(!message) return
  message.textContent=text
  message.classList.remove("hidden")
  message.classList.add(success ? "success":"error")
}