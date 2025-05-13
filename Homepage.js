document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const categorySelect = document.querySelector('.search-bar select');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        const selectedCategory = categorySelect.value;

        if (!searchTerm && selectedCategory === 'All category') {
            // Show a message to the user
            alert('Please type a category name or select a category from the dropdown.');
        } else {
            let query = '';

            if (searchTerm) {
                query += `search=${encodeURIComponent(searchTerm)}`;
            }

            if (selectedCategory !== 'All category') {
                if (query) {
                    query += `&category=${encodeURIComponent(selectedCategory)}`;
                } else {
                    query += `category=${encodeURIComponent(selectedCategory)}`;
                }
            }

            if (query) {
                window.location.href = `ProductListing.html?${query}`;
            } else {
                // If only a category is selected (and no search term),
                // still navigate with the category parameter.
                window.location.href = `ProductListing.html?category=${encodeURIComponent(selectedCategory)}`;
            }
        }
    });

    // Optional: Handle Enter key press in the search input
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click(); // Trigger the search button click
        }
    });
});