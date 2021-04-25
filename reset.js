const mailed = document.querySelector("#recovery");
const resetBtn = document.querySelector("#resetbtn");
resetBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    resetPassword();
});
 const resetPassword = ()=>{
     const email = mailed.value;
     if (email != "") {
        auth.sendPasswordResetEmail(email).then(()=>{
            console.log(email,
         "check your email to reset your password");
         window.alert( "check your email to reset your password");
         }).catch(err=>{
             console.log(err);
         })
        console.log("everyting is fine");
     } else {
         window.alert("Enter The Email kindly")
     }
    
 }
