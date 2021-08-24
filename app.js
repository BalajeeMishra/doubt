   const store=document.getElementById("content-id");
   const myinput= document.getElementById("myinput");
   const extraContent=document.getElementById("search");
   const searchNews=async (searchText)=>{
    store.innerHTML='';
    const response = await fetch("https://newsapi.org/v2/everything?q=Apple&from=2021-08-10&sortBy=popularity&apiKey=498b4450101d445bbba6f6d487cc695d");
    const datas = await response.json();
    const newdatas=datas.articles;
    const sortByDate = newdatas => {
   const sorter = (a, b) => {
      return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
   }
   newdatas.sort(sorter);
   newdatas.reverse();
};
sortByDate(newdatas);
// console.log(newdatas);

    let matches= await newdatas.filter(data=>{
        const regex=new RegExp(`^${searchText}`,'gi');
        let { title, description } = data;
        // if(title.includes(searchText)) return title;
        // if(description && description.includes(searchText)) return description;
        // return;

    if (title) {
    const list=data.title.split(" ");
    for(let i=0;i<list.length;i++){
       if(list[i].match(regex)!=null){
          return data.title;
       }
    }
}
    //  else if (description) {
    //   return data.description.match(regex);
    // } 
    else {
      return;
    }
        // return data.title.match(regex)||data.description.match(regex);
    });                           
    
    if(searchText.length==0){
        matches=[];
        extraContent.innerHTML='';
        // window.location.reload(false); 
        newsApi();
    }
     console.log(matches)
    outputHtml(matches);
}
myinput.addEventListener("input",()=>searchNews(myinput.value))
   const outputHtml=matches=>{
       if(matches.length>0){
           
           const html=matches.map(match=>
            ` 
                <div class="card mb-2">
                <div class="news-api">
                <div class="news-api-content">
                     
                     <h6 class="my-2" style="margin-left:1em;">${match.title}</h6>
                    <p>
                        ${match.description}
                    </p>
                    
                    <p class="my-3">${new Date(match.publishedAt)}<p>
                    <a href="http://127.0.0.1:5500/index3.html" class="stretched-link"></a>
                </div>
                <div class="news-api-image">
                    <img width="100%" height="100%" src="${match.urlToImage}">
                </div>
            </div>
                </div>

            `

           ).join(" ")
           extraContent.innerHTML=html;
       }
   }


   

        async function newsApi() {
            const response = await fetch("https://newsapi.org/v2/everything?q=Apple&from=2021-08-10&sortBy=popularity&apiKey=498b4450101d445bbba6f6d487cc695d");
            // const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=498b4450101d445bbba6f6d487cc695d");
            const datas = await response.json();
            
            datas.articles.forEach((data)=>{ 
                const content=`
                <div class="news-api">
                    <div class="news-api-content">
                         
                         <h6 class="my-2" style="margin-left:1em;">${data.title}</h6>
                        <p>
                            ${data.description}
                        </p>
                        <p class="my-3">${data.publishedAt}<p>
                        <a href="http://127.0.0.1:5500/index3.html" class="stretched-link"></a>
                    </div>
                    <div class="news-api-image">
                        <img width="100%" height="100%" src="${data.urlToImage}">
                    </div>
                   
                </div>`               
                store.innerHTML+=content;
                 }) 
            
        }
        newsApi();



