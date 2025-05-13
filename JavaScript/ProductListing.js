import { productData } from "./productData.js"; // Make sure this path is correct

const categories = [
    {
        name: "Clothing",
        subcategories: ["Men's Wear", "Women's Wear", "Kids' Wear"]
    },
    {
        name: "Electronics",
        subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories"]
    },
    {
        name: "Books",
        subcategories: ["Fiction", "Non-Fiction", "Science Fiction", "Mystery"]
    },
    // Add more categories and subcategories as needed
];
document.addEventListener('DOMContentLoaded', () => {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const searchTerm = getQueryParam('search');
    const categoryFromURL = getQueryParam('categories'); // Might be present if they selected a category first

    const breadcrumbContainer = document.querySelector('.breadcrumb');
    const breadcrumbCategorySpan = document.getElementById('breadcrumb-category');
    const breadcrumbSubcategorySpan = document.getElementById('breadcrumb-subcategory');
    const breadcrumbProductSpan = document.getElementById('breadcrumb-product');
    const listingContentDiv = document.getElementById('listing-content');

    breadcrumbContainer.innerHTML = '<a href="./index.html">Home</a>';
    breadcrumbCategorySpan.innerHTML = '';
    breadcrumbSubcategorySpan.innerHTML = '';
    breadcrumbProductSpan.innerHTML = '';

    if (searchTerm) {
        // Try to find if the search term matches a subcategory
        let foundCategory = null;
        let foundSubcategory = null;

        categories.forEach(cat => {
            const subMatch = cat.subcategories.find(sub => sub.toLowerCase() === searchTerm.toLowerCase());
            if (subMatch) {
                foundCategory = cat.name;
                foundSubcategory = subMatch;
            }
        });

        if (foundCategory && foundSubcategory) {
            const categoryLink = `<a href="ProductListing.html?category=${encodeURIComponent(foundCategory)}">${foundCategory}</a>`;
            breadcrumbCategorySpan.innerHTML = ` > ${categoryLink}`;
            const subcategoryLink = `<a href="ProductListing.html?category=${encodeURIComponent(foundCategory)}&subcategory=${encodeURIComponent(foundSubcategory)}">${foundSubcategory}</a>`;
            breadcrumbSubcategorySpan.innerHTML = ` > ${subcategoryLink}`;
            listingContentDiv.textContent = `Showing products in subcategory: ${foundSubcategory} within ${foundCategory} (searched for "${searchTerm}")`;
            // Logic to filter products by foundCategory and foundSubcategory
        } else {
            // If the search term doesn't directly match a subcategory,
            // treat it as a general search
            breadcrumbCategorySpan.innerHTML = ` > Search results for: "${searchTerm}"`;
            listingContentDiv.textContent = `Search results for: "${searchTerm}"`;
            // Logic to filter products based on the general search term
        }
    } else if (categoryFromURL) {
        // If only a category is present (from dropdown selection)
        const categoryLink = `<a href="ProductListing.html?category=${encodeURIComponent(categoryFromURL)}">${categoryFromURL}</a>`;
        breadcrumbCategorySpan.innerHTML = ` > ${categoryLink}`;
        listingContentDiv.textContent = `Showing products in category: ${categoryFromURL}`;
        // Logic to filter products by categoryFromURL
    } else {
        listingContentDiv.textContent = 'All products or use the search bar.';
    }
});

/* Price Range */ 

const minSlider = document.getElementById("min-slider");
        const maxSlider = document.getElementById("max-slider");
        const minPriceInput = document.getElementById("min-price");
        const maxPriceInput = document.getElementById("max-price");
        const sliderTrack = document.querySelector(".slider-track");

        function updateSliderBackground() {
            const minVal = parseInt(minSlider.value);
            const maxVal = parseInt(maxSlider.value);
            const minValuePercentage = (minVal / parseInt(minSlider.max)) * 100;
            const maxValuePercentage = (maxVal / parseInt(maxSlider.max)) * 100;
            sliderTrack.style.background = `linear-gradient(to right, #ccc ${minValuePercentage}%, #007bff ${minValuePercentage}%, #007bff ${maxValuePercentage}%, #ccc ${maxValuePercentage}%)`;
        }

        minSlider.addEventListener("input", () => {
            if (parseInt(minSlider.value) > parseInt(maxSlider.value)) {
                minSlider.value = maxSlider.value;
            }
            minPriceInput.value = minSlider.value;
            updateSliderBackground();
        });

        maxSlider.addEventListener("input", () => {
            if (parseInt(maxSlider.value) < parseInt(minSlider.value)) {
                maxSlider.value = minSlider.value;
            }
            maxPriceInput.value = maxSlider.value;
            updateSliderBackground();
        });

        minPriceInput.addEventListener("input", () => {
            if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
                minPriceInput.value = maxPriceInput.value;
            }
            minSlider.value = minPriceInput.value;
            updateSliderBackground();
        });

        maxPriceInput.addEventListener("input", () => {
            if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
                maxPriceInput.value = minPriceInput.value;
            }
            maxSlider.value = maxPriceInput.value;
            updateSliderBackground();
        });

        updateSliderBackground(); // Initial background update