function displayUpsellProducts() {
  var request = new XMLHttpRequest();
  request.open('GET', '/cart.js', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var cartData = JSON.parse(request.responseText);
      var upsellProducts = cartData.items.map(function(item) {
        return item.product_id;
      });

      var productsRequest = new XMLHttpRequest();
      productsRequest.open('GET', '/products.json', true);
      

      productsRequest.onload = function() {
        if (productsRequest.status >= 200 && productsRequest.status < 400) {
          var productsData = JSON.parse(productsRequest.responseText);
          
          
          var randomUpsellProductsData = getRandomProducts(productsData.products, upsellProducts, 3);

          var cartDrawer = document.querySelector('.products-upsell');
          cartDrawer.innerHTML = "";
          var upsellProductsContainer = document.createElement('div');
          upsellProductsContainer.classList.add('upsell-products-container');
          upsellProductsContainer.innerHTML = '<h4>CUSTOMERS WHO BOUGHT THIS ITEM ALSO BOUGHT:</h4>';

          // randomUpsellProductsData.forEach(function(product) {
          //   var productElement = document.createElement('div');
          //   productElement.classList.add('upsell-product');
          //   productElement.innerHTML ='<div class="upsell-img"><img src="' + product.images[0].src + '"></div>' +
          //                             '<div class="upsell-product-info">' +
          //                             '<h3>' + product.title + '</h3>' +
          //                             '<p>' + product.variants[0].price + '</p>' +
          //                             '</div>' +
          //                             '<div class="upsell-atc">' +
          //                             '<product-form class="product-form" data-hide-errors="false">' +
          //                             '<div class="product-form__error-message-wrapper" role="alert" hidden=""><svg aria-hidden="true" focusable="false" class="icon icon-error" viewBox="0 0 13 13"><circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle><circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle><path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path><path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7"></path></svg><span class="product-form__error-message"></span></div>' +
          //                             '<form method="post" action="/cart/add" id="product-form-template--' + product.id + '__main" accept-charset="UTF-8" class="form" enctype="multipart/form-data" data-type="add-to-cart-form" js-product-form=""><input type="hidden" name="form_type" value="product">' +
          //                             '<input type="hidden" name="utf8" value="✓">' +
          //                             '<input type="hidden" name="id" value="' + product.variants[0].id + '" class="product-variant-id">' +  
          //                             '<div class="product-form__buttons">' +
          //                             '<button id="ProductSubmitButton-template--' + product.id + '__main" type="submit" name="add" class="product-form__submit button button--full-width button--secondary" aria-haspopup="dialog">' +
          //                             '<span>Add</span>' +
          //                             '<div class="loading-overlay__spinner hidden">' +
          //                             '<svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
          //                             '<circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>' +
          //                             '</svg>' +
          //                             '</div>' +
          //                             '</button>' +
          //                             '</div>' +
          //                             '</form>' +
          //                             '</div>' +
          //                             '</div>';
          //   upsellProductsContainer.appendChild(productElement);
          // });





          randomUpsellProductsData.forEach(function(product) {
          var productElement = document.createElement('div');
          productElement.classList.add('upsell-product');
          
          var isPersonalized = product.handle.includes('personalized');
          var customNameInput = isPersonalized ? '<p class="line-item-property__field custom_name_label"><label for="name">Name<span class="required">*</span></label><br><input data-required required class="required" id="name" type="text" name="properties[Name]"></p>' : '';
          
          productElement.innerHTML =
              '<div class="upsell-img"><img src="' + product.images[0].src + '"></div>' +
              '<div class="upsell-product-info">' +
              '<h3>' + product.title + '</h3>' +
              '<p>' + product.variants[0].price + '</p>' +
              '</div>' +          
              '<div class="upsell-atc">' +
              '<product-form class="product-form new_product_form" data-hide-errors="false">' +
              '<div class="product-form__error-message-wrapper" role="alert" hidden=""><svg aria-hidden="true" focusable="false" class="icon icon-error" viewBox="0 0 13 13"><circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle><circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle><path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path><path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7"></path></svg><span class="product-form__error-message"></span></div>' +
              '<form method="post" action="/cart/add" id="product-form-template--' + product.id + '__main" accept-charset="UTF-8" class="form" enctype="multipart/form-data" data-type="add-to-cart-form" js-product-form=""><input type="hidden" name="form_type" value="product">' +
              '<input type="hidden" name="utf8" value="✓">' +
              '<input type="hidden" name="id" value="' + product.variants[0].id + '" class="product-variant-id">' +  
              customNameInput +
              '<div class="product-form__buttons">' +
              '<button id="ProductSubmitButton-template--' + product.id + '__main" type="submit" name="add" class="product-form__submit button button--full-width button--secondary" aria-haspopup="dialog">' +
              '<span>Add</span>' +
              '<div class="loading-overlay__spinner hidden">' +
              '<svg aria-hidden="true" focusable="false" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
              '<circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>' +
              '</svg>' +
              '</div>' +
              '</button>' +
              '</div>' +
              '</form>' +
              '</div>' +
              '</div>';
      
              upsellProductsContainer.appendChild(productElement);
          });


          cartDrawer.appendChild(upsellProductsContainer);
        }
      };

      productsRequest.send();
    }
  };

  request.send();
}

function getRandomProducts(allProducts, excludedProducts, count) {
  var availableProducts = allProducts.filter(function(product) {
    return !excludedProducts.includes(product.id);
  });

  var randomProducts = [];

  while (randomProducts.length < count && availableProducts.length > 0) {
    var randomIndex = Math.floor(Math.random() * availableProducts.length);
    var randomProduct = availableProducts.splice(randomIndex, 1)[0];
    randomProducts.push(randomProduct);
  }

  return randomProducts;
}

document.addEventListener('DOMContentLoaded', function() {
  var cartDrawer = document.querySelector('.cart-dd');
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class' && cartDrawer.classList.contains('active')) {
        displayUpsellProducts();
      }
    });
  });

  observer.observe(cartDrawer, { attributes: true });
});
