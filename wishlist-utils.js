function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}


function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}


function addToWishlist(product) {

    let wishlist = getWishlist();

    let exists = wishlist.some(item =>
        item.name === product.name
    );

    if (!exists) {
        wishlist.push(product);
        saveWishlist(wishlist);
    }
}


function removeFromWishlist(name) {

    let wishlist = getWishlist();

    wishlist = wishlist.filter(item =>
        item.name !== name
    );

    saveWishlist(wishlist);
}


function isInWishlist(name) {

    let wishlist = getWishlist();

    return wishlist.some(item =>
        item.name === name
    );
}
