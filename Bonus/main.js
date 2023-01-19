const posts = [
    {
        id: 1,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/300?image=171",
        author: {
            name: "Phil Mangione",
            image: "https://unsplash.it/300/300?image=15"
        },
        likes: 80,
        created: "2021-06-25"
    },
    {
        id: 2,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=112",
        author: {
            name: "Sofia Perlari",
            image: "https://unsplash.it/300/300?image=10"
        },
        likes: 120,
        created: "2021-09-03"
    },
    {
        id: 3,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=234",
        author: {
            name: "Chiara Passaro",
            image: "https://unsplash.it/300/300?image=20"
        },
        likes: 78,
        created: "2021-05-15"
    },
    {
        id: 4,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=24",
        author: {
            name: "Luca Formicola",
            image: null
        },
        likes: 56,
        created: "2021-04-03"
    },
    {
        id: 5,
        content: "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        media: "https://unsplash.it/600/400?image=534",
        author: {
            name: "Alessandro Sainato",
            image: "https://unsplash.it/300/300?image=29"
        },
        likes: 95,
        created: "2021-03-05"
    }
];

// Stampa i dati di tutti i posts 
console.log("Posts", posts);

// Conterra' gli ID dei post piaciuti
let likedPosts = [];

const postList = document.querySelector(".posts-list");

// Stampa posts nel feed
posts.forEach((postData, index) => {

    // Destructuring  proprieta' "created" degli elementi di "posts"
    const date =  postData.created.split("-");

    const [year, month, day] = date;

    postData.date = {
        year: year,
        month: month,
        day: day
    };


    // Crea nuovo post
    const newPost = document.createElement ("div");
    newPost.classList.add("post");
    
    newPost.innerHTML = 
    `
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                <img class="profile-pic" src="${postData.author.image}" alt="${postData.author.name}">                    
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${postData.author.name}</div>
                <div class="post-meta__time">${postData.date.day}/${postData.date.month}/${postData.date.year}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${postData.content}</div>
    <div class="post__image">
        <img src="${postData.media}">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="##" data-postid="${postData.id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${postData.id}" class="js-likes-counter">${postData.likes}</b> persone
            </div>
        </div> 
    </div>       
    `;

    // Aggiunge nuovo post alla pagina
    postList.append(newPost);

    console.log("Post creato");

    if (postData.author.image === null) {

        // Ricavo le iniziali del nome e cognome dell'utente
        let defaultContent = postData.author.name.split(" ");
        defaultContent = defaultContent[0].charAt(0) + defaultContent[1].charAt(0);

        const defaultProfilePicture = document.querySelector(`.post:nth-child(${index + 1}) .post-meta__icon`);
        defaultProfilePicture.innerHTML = 
        `
        <div class="profile-pic-default">
            <span>${defaultContent}</span>
        </div>
        `;
    }
    


    // Event Listener Pulsante Like
    const newLikeBtn = document.querySelector(`.post:nth-child(${index + 1}) .js-like-button`);
    const newLikesCounter = document.querySelector(`.post:nth-child(${index + 1}) .js-likes-counter`);

    newLikeBtn.addEventListener("click", function() {

        // Se il post non e' gia' stato aggiunto ai post piaciuti...
        if (likedPosts.includes(postData.id)) {
            newLikeBtn.classList.remove("like-button--liked");

            // Decrementa il contatore
            postData.likes--;
            newLikesCounter.innerHTML = postData.likes;

            // Rimuove l'ID del post dall'array dei post piaciuti
            const postIndex = likedPosts.indexOf(postData.id);
            likedPosts.splice(postIndex, 1);
        }
        // ... se il post non e' gia' stato aggiunto ai post piaciuti
        else {
            newLikeBtn.classList.add("like-button--liked");

            // Incrementa il contatore
            postData.likes++;
            newLikesCounter.innerHTML = postData.likes;

            // Aggiunge l'ID del post all'array dei post piaciuti
            likedPosts.push(postData.id)
        }

        console.log("Posts piaciuti:", likedPosts);

    })

});