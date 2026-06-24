"use strict";


document.addEventListener("DOMContentLoaded", (event) => {
  @@include('components/components.js');

  @@include('parts/_animate.js');


  const btnRows = document.getElementById("btn-rows");
  const btnTiles = document.getElementById("btn-tiles");

  function updateProductsView(viewType) {
    updateViewStyles(viewType);

    btnRows.classList.toggle("active", viewType === "rows");
    btnTiles.classList.toggle("active", viewType === "tiles");

    localStorage.setItem("productsView", viewType);
  }

  const currentView = localStorage.getItem("productsView") || "rows";
  updateProductsView(currentView); 

  btnTiles.addEventListener("click", () => updateProductsView("tiles"));
  btnRows.addEventListener("click", () => updateProductsView("rows"));

  let btnLoadMore = document.querySelector(".js-load-cards");
  btnLoadMore.addEventListener("click", (e) => {
    e.preventDefault();
    if (!btnLoadMore.classList.contains("dc-btn--loading")) {
      btnLoadMore.classList.add("dc-btn--loading");
      setTimeout(()=>{
        btnLoadMore.classList.remove("dc-btn--loading");
      }, 2000);
    }
  });
});

