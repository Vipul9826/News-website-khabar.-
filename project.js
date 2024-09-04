const apikey='c60b3fa894644a3da881c0e44a88c71a';
const blogContainer=document.getElementById('blog-container');
const searchField=document.getElementById("search-input");
const searchButton=document.getElementById('search-button');

async function fetchRandomNews(){
    try {
    //    const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apikey}`;
       const apiUrl=`https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=50&apiKey=${apikey}`;
      
       const response=await fetch(apiUrl);
       const data=await response.json();
       return data.articles;
    } catch (error) {
    
        console.error('Error in fetching news',error);  
        return[];

    }
}

 searchButton.addEventListener('click',async()=>{
    const query=searchField.value.trim();
    if(query !== ''){
        try{
        const articles =await fetchNewsQuery(query);
        displayBlogs(articles);
        }catch(error){
            console.log('Error in fetching news !!',error);
        }
    }
 });

 async function fetchNewsQuery(query){
    try {
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=50&apikey=${apikey}`;
        const response=await fetch(apiUrl);
        const data=await response.json();
        return data.articles;
     } catch (error) {
     
         console.error('Error in fetching news',error);  
         return[];
 
     }
 }

function   displayBlogs(articles){
    blogContainer.innerHTML='';
    articles.forEach((article)=>{
    const blogCard=document.createElement('div');

    blogCard.classList.add('blog-card');

    const img=document.createElement('img');

    img.src=article.urlToImage;
    img.alt=article.title;
    const title=document.createElement('h2');

    const truncatedTitle=article.title.length >30
    ?article.title.slice(0,30)+ '....':article.title;
    title.textContent=truncatedTitle;

    const description=document.createElement('p');
    description.textContent=articles.description;
    
     blogCard.appendChild(img);
     blogCard.appendChild(title);
     blogCard.appendChild(description);
     blogCard.addEventListener('click', ()=>{
        window.open(article.url,'_blank');
     });
     blogContainer.appendChild(blogCard);
    } );

}

(async ()=>{
    try {
        const articles=await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error('Error in fetching news',error);  
        
    }
})();