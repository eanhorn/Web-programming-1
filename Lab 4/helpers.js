//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const isUndef = (elem) => {
    return elem === undefined;
}
const isOfType = (elem, type) => {
    return typeof elem === type
}
module.exports = {
    isUndef,
    isOfType
}
