const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountInfo = document.querySelector(".Account-details");
const adminItems = document.querySelectorAll(".admin");
//condition menu link
const setupUI = (user)=>{
    if(user){
        if (user.admin) {
            adminItems.forEach(item=>item.style.display = "block");
        }
        db.collection("users").doc(user.uid).get().then(doc =>{
            const html = 
            `<div>logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
            <div class="pink-text">${user.admin ? 'Admin' : ""}</div>`
            accountInfo.innerHTML = html;
        })
        loggedInLinks.forEach(item=>item.style.display = 'block');
        loggedOutLinks.forEach(item=>item.style.display = "none");
    }else{
        loggedInLinks.forEach(item=>item.style.display = 'none');
        loggedOutLinks.forEach(item=>item.style.display = "block");
        accountInfo.innerHTML = "";
        adminItems.forEach(item=>item.style.display = "none");
    }
}

const sideNav = document.querySelectorAll(".sidenav");
M.Sidenav.init(sideNav, {});
const sc = document.querySelectorAll(".scrollspy");
M.ScrollSpy.init(sc, {});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    console.log(elems);
     M.Modal.init(elems);
  });
  const items = document.querySelectorAll('.collapsible');
M.Collapsible.init(items);
  const guidelist  = document.querySelector(".projyguides");

  
   const setupGuides  = (data)  =>
   {
       if (data.length) {
        let html  = ``;
        data.forEach(doc => {
           const guide = doc.data();
           console.log(guide);
           const li  = `
           <li>
           <div class="collapsible-header grey-lighten-4">${guide.frontend}</div>
     <div class="collapsible-body white">${guide.backend}</div>
     </li>
           `;
           html += li;
        });
        guidelist.innerHTML = html; 
       }
       else{
           guidelist.innerHTML = 
"<h5 class='center-align'>Login  or signup if its your first time</h5>"
       }
   
   }