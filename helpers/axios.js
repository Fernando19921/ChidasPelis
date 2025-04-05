export  const fetchData= async(propm)=>{
    let {url,Success}=propm;

    try{
        let res=await axios.get(url)
        Success(res)
    }catch(errr){
        let message=errr.response?.statusText || "Ocurrio un error al acceder al json";
        document.getElementById("main").innerHTML=`
        <div class="error>
        <p>${errr.message}: ${message}</p>
        </div>`;

        console.error(errr.message);
    }
}