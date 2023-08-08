const createInitials = function (text) {
    if (!text) return "";
    if (text.length <= 2) return text;
    let parts = text.split(" ");
    let first = parts[0].charAt(0);
    let last = parts[parts.length - 1].charAt(0);
    return (first + last).toUpperCase();
};

module.exports = {
    createInitials
};