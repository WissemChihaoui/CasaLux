'use strict';
function productCard(data){
  return '<div class="col-md-6 col-lg-4 mb-3">'+
          '<div class="card h-100">'+
          '<img class="card-img-top" src="../../../assets/img/elements/'+data.image+'" alt="Card image cap">'+
          '<div class="card-body">'+
          '<a href="viewProduct.html?id='+data.id+'">'+
          '<h5 class="card-title">'+data.product_name+'</h5>'+
          '</a><p class="card-text">'+data.info+'</p>'+
          '<div class="d-flex justify-content-between align-content-center">'+
          '<h4><span class="text-muted fs-5">De </span>'+data.price+'</h4>'+
          '<a href="javascript:void(0)" class="btn btn-outline-primary waves-effect">Ajouter</a>'+
           '</div>'
}
function filterProducts(productsData) {
  const fournisseur = $('#vendor').val().toLowerCase();
    const productName = $('#productName').val().toLowerCase();

    const filteredProducts = productsData.filter(product => {
        return (product.institut_nom.toLowerCase().includes(fournisseur) || fournisseur === '') &&
               (product.product_name.toLowerCase().includes(productName) || productName === '');
    });

    renderProducts(filteredProducts);
  }
function renderProducts(data) {
  const productsListGrid = $('.productsListGrid');
  productsListGrid.empty(); // Clear existing products

  data.forEach(product => {
      const card = productCard(product);
      productsListGrid.append(card);
  });
}

$(document).ready(function () {
  let productsData = []; 
  

  $.ajax({
      url: assetsPath+'json/ecommerce-product-list.json', // Relative path to your JSON file
      dataType: 'json',
      success: function (data) {
        productsData = data.data; // Store original products data
        renderProducts(productsData); // Render initial products
    },
      error: function (xhr, status, error) {
          console.error('Error:', error);
      }
  });
  $('#vendor, #productName').on('input', function() {
    filterProducts(productsData);
  });
});