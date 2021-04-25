//create admin function
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const admemail = document.querySelector("#admin-email").value;
    console.log(admemail);
    //create call to admin cloud function and send the back the value with it;
    const addAdminRole = functions.httpsCallable("addAdminRole");
    addAdminRole({email:admemail}).then((result)=>{
        console.log(result);
    })
})
//to check user state 
auth.onAuthStateChanged(user=>{
    if(user)
    {
        //detect admin status
        user.getIdTokenResult().then(tecy=>{
            console.log(tecy.claims.admin);
            user.admin = tecy.claims.admin;
            setupUI(user)
        })
       console.log("User logged in:", user); 
       db.collection("projects").onSnapshot((snapshot)=>{
       setupGuides(snapshot.docs);
    })
    }
    else
    {
        console.log("user logged out");
        setupGuides([]);
        setupUI();
    }
});


// const form = document.querySelector("#add-projects");
// //saving data
// form.addEventListener("submit",(e)=>{
// e.preventDefault();
// db.collection("projects").add({
//     frontend:form.frontend.value,
//     backend:form.backend.value
// })
// //clear out values that are inside
// form.frontend.value = "";
// form.backend.value = "";
// }).then(()=>{
//     const mdl = document.querySelector("#modal4");
//     M.Modal.getInstance(mdl.close());
// })
//create new guides
const createForm = document.querySelector(".CreateProj");
createForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    db.collection("projects").add({
        frontend: createForm["frontend"].value,
        backend: createForm["backend"].value
    }).then(()=>{
        const md =  document.querySelector("#modal4");
        M.Modal.getInstance(md).close();
        createForm.reset();
    }).catch(err=>{
        console.log(err.message);
    })
})
//firebase authentication

//userauthenication
let admy = document.querySelector("#signupForm");
console.log(admy);
admy.addEventListener("submit",(e)=>{
    e.preventDefault();
    const signup_email = admy["signup-email"].value
    console.log(signup_email);
    const signup_password = admy["signup-password"].value
    console.log(signup_password);
auth.createUserWithEmailAndPassword(signup_email, signup_password).then(cred=>
    {
        //create a new collection for the bio
      return db.collection("users").doc(cred.user.uid).set({
          bio: admy["signup-bio"].value
      });
    }).then(()=>{
        const md = document.querySelector("#modal1");
        M.Modal.getInstance(md).close();
        admy.reset();
        admy.querySelector(".error").innerHTML = "";
    }).catch((err)=>{
        admy.querySelector(".error").innerHTML = err.message;
    })
})
//logout
const logout = document.querySelectorAll("#logout");
logout.forEach(logy=>{
    logy.addEventListener("click",()=>{
        auth.signOut().then(()=>{
            console.log("user logged out");
        })
    })
})



//login user
const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("user logged in");
    //get userInfo
    const email = loginForm["login-email"].value
    const password = loginForm['login-password'].value
    //connect to db
    auth.signInWithEmailAndPassword(email,password).then(()=>{
        const md = document.querySelector("#modal2");
        M.Modal.getInstance(md).close();
        loginForm.reset();
        loginForm.querySelector(".error").innerHTML = "";
    }).catch(err=>{
        loginForm.querySelector(".error").innerHTML = err.message;
    })
})



 