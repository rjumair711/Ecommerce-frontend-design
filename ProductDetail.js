import { productData } from "./productData.js";

// Function to get query parameters from the URL
     function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the selected product ID from URL
    const productId = getQueryParam("id");

// Get product details and update HTML
if (productData[productId]) {
    const product = productData[productId];

    // Update product info
    document.getElementById("product-title").innerText = product.name;

    // Add rating and sales information after the product title
    let ratingHTML = '';
    if (product.rating !== undefined && product.reviews !== undefined && product.sold !== undefined) {
        const filledStars = '★'.repeat(Math.floor(product.rating));
        const emptyStars = '☆'.repeat(5 - Math.floor(product.rating));
        ratingHTML = `<span class="rating">${filledStars}${emptyStars} ${product.rating}</span> <span class="reviews">● ${product.reviews} reviews</span> <span class="sold">● ${product.sold} sold</span>`;
        const productTitleElement = document.getElementById("product-title");
        productTitleElement.insertAdjacentHTML('afterend', `<div class="product-meta">${ratingHTML}</div>`);
    }

    document.getElementById("product-image").src = product.image;

    // Create product details HTML
    let detailsHTML = ``;

    if (product.priceTiers) {
        detailsHTML += `<div class="price-tiers">`;
        product.priceTiers.forEach(tier => {
            detailsHTML += `<div class="price-tier"><strong>${tier.price}</strong><br> ${tier.quantity}</div>`;
        });
        detailsHTML += `</div>`;
    }

    detailsHTML += `<ul id="product-details-list">`; // Added an ID to the ul

    if (product.details) {
        product.details.forEach(detail => {
            let className = "";
            if (detail.label === "Price") {
                className = "price-item"; // Add class for bottom border
            }
            if (detail.label === "Design") {
                className = "design-item"; // Add class for bottom border
            }
            if (detail.label === "Warranty") {
                className = className ? className + " spaced-item" : "spaced-item"; // Add spacing for Warranty
            }

            detailsHTML += `<li class="${className}">
                <span class="detail-label">${detail.label}:</span> <span class="detail-value">${detail.value}</span>
            </li>`;
        });
    }
    detailsHTML += `</ul>`;
    document.getElementById("product-details").innerHTML = detailsHTML;

        // Create thumbnails
        if (product.thumbnails) {
            let thumbnailsHTML = '';
            product.thumbnails.forEach(thumbnail => {
                thumbnailsHTML += `<img src="${thumbnail}" alt="Thumbnail">`;
            });
            document.querySelector('.product-thumbnails').innerHTML = thumbnailsHTML;
        }
    // Update supplier info
const supplierHeaderDiv = document.querySelector(".supplier-header");
const supplierNameSpan = supplierHeaderDiv.querySelector("#supplier-name"); // Find it within the header
const supplierDetailsDiv = document.querySelector(".supplier-details");
const supplierLocationSpan = supplierDetailsDiv.querySelector("#supplier-location");
const flagImg = supplierDetailsDiv.querySelector(".flag-img");

if (product.supplier) {
    supplierNameSpan.textContent = product.supplier.name; // Update the name in the header
    supplierLocationSpan.textContent = product.supplier.location;
    flagImg.src = product.supplier.flag || "/Images/icon.png"; // Use the flag if available, otherwise default
} else {
    supplierNameSpan.textContent = "";
    supplierLocationSpan.textContent = "";
    flagImg.src = "/Images/icon.png"; // Default icon if no supplier info
}
        // Update breadcrumb
        if (product.category) {
            document.getElementById('breadcrumb-category').innerHTML = ` > <a href="${product.category.toLowerCase()}.html">${product.category}</a>`;
        }
        if (product.subcategory) {
            document.getElementById('breadcrumb-subcategory').innerHTML = ` > <a href="${product.subcategory.toLowerCase()}.html">${product.subcategory}</a>`;
        }
        if (product.name) {
            document.getElementById('breadcrumb-product').innerHTML = ` > ${product.name}`;
        }
        const productDescription = document.getElementById('product-description');
        const productDetailsBody = document.getElementById('product-details-body');

  productDescription.textContent = product.description; // Use product.description

  // Dynamically add details to the table
  // Assuming product.details (the array of label-value pairs) should populate the table
  if (product.detail_1) {
    product.detail_1.forEach(detail => {
      const row = document.createElement('tr');
      const labelCell = document.createElement('td');
      const valueCell = document.createElement('td');


      labelCell.textContent = detail.label;
      labelCell.classList.add('detail-label-cell'); // Add class to label cell

      valueCell.textContent = detail.value;
      valueCell.classList.add('detail-value-cell'); // Add class to value cell

      labelCell.textContent = detail.label;
      valueCell.textContent = detail.value;

      row.appendChild(labelCell);
      row.appendChild(valueCell);
      productDetailsBody.appendChild(row);
    });
  } else {
    productDetailsBody.innerHTML = '<tr><td colspan="2">No details available.</td></tr>';
  }


  // Dynamically add features to the list
  const featuresList = document.querySelector('#product-subContainer ul'); // Target the ul in your provided HTML
  if (product.features && featuresList) {
    featuresList.innerHTML = ''; // Clear any existing list items
    product.features.forEach(feature => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa fa-check"></i> ${feature}`;
      featuresList.appendChild(li);
    });
  } else if (featuresList) {
    featuresList.innerHTML = '<li>No features listed.</li>';
  }


    } else {
        document.getElementById("product-container").innerHTML = "<h2>Product not found</h2>";
    }