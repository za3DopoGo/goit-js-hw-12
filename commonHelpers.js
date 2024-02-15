import{i as u,a as y,S as b}from"./assets/vendor-64b55ca9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const s={formEl:document.querySelector(".js-search-form"),imgEl:document.querySelector(".js-image-container"),loaderEl:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn"),loaderBottom:document.querySelector(".loadMore")};let l=1,d="";s.formEl&&s.formEl.addEventListener("submit",E);s.loadMoreBtn&&s.loadMoreBtn.addEventListener("click",L);async function E(e){if(e.preventDefault(),l=1,d=e.target.elements.text.value.trim(),!d){u.error({position:"topRight",message:"Please enter a search query!"});return}c(!0);try{const o=await g(d,l);p(o),o.hits.length===0?(c(!1),n(!1)):(n(!0),c(!1),l++)}catch(o){console.error("Error fetching images:",o),c(!1),n(!1),h(),u.error({position:"topRight",message:"Failed to fetch images. Please try again later."})}finally{e.target.elements.text.value=""}}async function L(){try{n(!1),f(!0);const e=await g(d,l);p(e),e.hits.length<15?(f(!1),n(!1),u.show({title:"",message:"We're sorry, but you've reached the end of search results.",color:"red",position:"topRight"})):(n(!0),l++)}catch(e){console.error("Error fetching more images:",e)}}async function g(e,o=1){const a="https://pixabay.com/api/",i="42295751-6e09ed05d50a99192d667c3e9";try{return(await y.get(a,{params:{key:i,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}catch{throw new Error("Failed to fetch images")}}function w(e){return`
        <a href="${e.largeImageURL}" class="photo-container" data-lightbox="photos">
            <img
                src="${e.webformatURL}"
                alt="${e.tags}"
                class="photo"
            />
            
            <div class="photo-body">
                <p class="photo-name">Likes ${e.likes}</p>
                <p class="photo-name">Views ${e.views}</p>
                <p class="photo-name">Comments ${e.comments}</p>
                <p class="photo-name">Downloads ${e.downloads}</p>
            </div>
        </a>
    `}function p(e){l===1&&h(),s.imgEl.innerHTML+=e.hits.map(a=>w(a)).join(""),new b('[data-lightbox="photos"]').refresh(),n(!0),f(!1),v()}function v(){const e=document.querySelector(".photo-container");if(e){const a=e.getBoundingClientRect().height*2;window.scrollBy({top:a,behavior:"smooth"})}}function h(){s.imgEl.innerHTML=""}function c(e){s.loaderEl.style.display=e?"inline-block":"none",s.loaderEl.style.bottom="50%"}function n(e){s.loadMoreBtn.style.display=e?"block":"none"}function f(e){s.loaderBottom.style.display=e?"block":"none"}
//# sourceMappingURL=commonHelpers.js.map
