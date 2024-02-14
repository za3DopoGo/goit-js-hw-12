import{i as u,a as y,S as E}from"./assets/vendor-64b55ca9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}})();const r={formEl:document.querySelector(".js-search-form"),imgEl:document.querySelector(".js-image-container"),loaderEl:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn")};let s=1,f="";r.formEl&&r.formEl.addEventListener("submit",b);r.loadMoreBtn&&r.loadMoreBtn.addEventListener("click",L);async function b(e){if(e.preventDefault(),s=1,f=e.target.elements.text.value.trim(),!f){u.error({position:"topRight",message:"Please enter a search query!"});return}d(!0);try{const o=await g(f,s);h(o),o.hits.length===0?(d(!1),l(!1)):(l(!0),d(!1),s++)}catch(o){console.error("Error fetching images:",o),d(!1),l(!1),p(),u.error({position:"topRight",message:"Failed to fetch images. Please try again later."})}finally{e.target.elements.text.value=""}}async function L(){try{i(!0);const e=await g(f,s);h(e),i(!1),e.hits.length===0?(l(!1),i(!1),w()):(i(!1),s++)}catch(e){i(!1),console.error("Error fetching more images:",e)}}function w(){const e=document.createElement("p");e.textContent="We're sorry, but you've reached the end of search results.",r.imgEl.insertAdjacentElement("beforebegin",e)}async function g(e,o=1){const a="https://pixabay.com/api/",c="42295751-6e09ed05d50a99192d667c3e9";try{return(await y.get(a,{params:{key:c,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}catch{throw new Error("Failed to fetch images")}}function S(e){return`
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
    `}function h(e){l(!1),s===1&&p(),r.imgEl.innerHTML+=e.hits.map(a=>S(a)).join(""),new E('[data-lightbox="photos"]').refresh(),l(!0),v()}function v(){const e=document.querySelector(".photo-container");if(e){const a=e.getBoundingClientRect().height*2;window.scrollBy({top:a,behavior:"smooth"})}}function p(){r.imgEl.innerHTML=""}function d(e){r.loaderEl.style.display=e?"inline-block":"none",r.loaderEl.style.bottom="50%"}function l(e){r.loadMoreBtn.style.display=e?"block":"none"}function i(e){r.loaderEl.style.display=e?"inline-block":"none",r.loaderEl.style.bottom=e?"0":"50%"}
//# sourceMappingURL=commonHelpers.js.map
