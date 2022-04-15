const templateUser = document.querySelector("#users_data_template").content;
const templatePosts = document.querySelector("#posts__data__template").content;
const templateComments = document.querySelector("#comment__data__template").content;

const listUsers = document.querySelector(".users-col");
const listPosts = document.querySelector(".posts-col");
const listComments = document.querySelector(".comment-col");


function renderUsers(data, list){

    const fragment = document.createDocumentFragment()
    data.forEach(user => {
        const clone = templateUser.cloneNode(true);
        
        const userId = clone.querySelector(".data__userId").textContent = user.id;

        const companyName =clone.querySelector(".company__name")
        companyName.textContent = user.company.name;

        const companyCatchPhrase =clone.querySelector(".company__catchPhrase")
        companyCatchPhrase.textContent = user.company.catchPhrase;

        const companyBs =clone.querySelector(".company__bs")
        companyBs.textContent = user.company.bs;

        



        const userName = clone.querySelector(".data__userName");
        userName.textContent = user.username;

        const name = clone.querySelector(".data__name");
        name.textContent = user.name;

        const city = clone.querySelector(".address__city").textContent = user.address.city;
        const strret = clone.querySelector(".address__street").textContent = user.address.street;
        const suite = clone.querySelector(".address__suite").textContent = user.address.suite;
        const zipcode = clone.querySelector(".address__zipcode").textContent = user.address.zipcode;





        const userLocation = clone.querySelector(".data__location");
        userLocation.href =  `https://www.google.com/maps/place/${user.address.geo.lat}, ${user.address.geo.lng}`;

        const userEmail = clone.querySelector(".data__email");
        userEmail.href = `mailto:${user.email}`;

        const userWebsite = clone.querySelector(".data__website");
        userWebsite.href = user.website

        const userPhone = clone.querySelector(".data__phone");
        userPhone.href =  `tell:+ ${user.phone}`  

        const readPostBtn = clone.querySelector(".read-posts");
        readPostBtn.dataset.dataId = user.id;
        const readPostIcon = clone.querySelector(".bi");
        readPostIcon.dataset.dataId = user.id;

        fragment.appendChild(clone);
    });

    list.appendChild(fragment)
}


(
    async function () {
        try{
            const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
            const data = await res.json();
            console.log(data);
            renderUsers(data, listUsers)
        }
        catch(error){
            console.error(error);
        }
       
    }
)();
    function renderPosts(data, list ) {
        list.innerHTML = null;

        const fragment =document.createDocumentFragment();

        data.forEach(post=>{
            const clone = templatePosts.cloneNode(true);
            clone.querySelector(".text__title").textContent = post.title;
            clone.querySelector(".text__body").textContent = post.body;
            clone.querySelector(".post__texts").dataset.dataId = post.id
            fragment.appendChild(clone)
        });
        list.appendChild(fragment)
    };
    
listUsers.addEventListener("click", evt=> {

    if(evt.target.matches(".read-posts")){
        
        const postId = evt.target.dataset.dataId;
        (
            async function () {
                try{
                    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${postId}`);
                    const data = await res.json();
                    console.log(data);
                    renderPosts(data , listPosts);
                }
                catch(error){
                    console.error(error);
                }
               
            }
        )();
    };
    if(evt.target.matches(".bi-chat-left-text")){
        
        const postId = evt.target.dataset.dataId;
        (
            async function () {
                try{
                    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${postId}`);
                    const data = await res.json();
                    console.log(data);
                    renderPosts(data , listPosts);
                }
                catch(error){
                    console.error(error);
                }
               
            }
        )();
    };

})
function renderComments( data , list){
    list.innerHTML =null;
    const fragment = document.createDocumentFragment();
    data.forEach(comment => {
        const clone = templateComments.cloneNode(true);
        clone.querySelector(".text__title").textContent = comment.name
        clone.querySelector(".text__body").textContent = comment.body
        clone.querySelector(".text__email").href = `mailto:${comment.email}`
        fragment.appendChild(clone)
    });
    list.appendChild(fragment);
};


listPosts.addEventListener("click", evt =>{
    if(evt.target.matches(".post__texts")){
        const commentId = evt.target.dataset.dataId;

        (
            async function () {
                try{
                    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${commentId}`);
                    const data = await res.json();
                    console.log(data);
                    renderComments(data, listComments)
                }
                catch(error){
                    console.error(error);
                }
               
            }
        )();
        
    };
})