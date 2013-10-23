/*
Einen Array mit Objekten anhand einer Eigenschaft des Objektes sortieren.
Anwendung: switchPoints.sort(dynamicSort('start'));

Quelle: http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
*/


function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}        


function dynamicSortReverse(property) {
    var sortOrder = -1;
    if(property[0] === "-") {
        sortOrder = 1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}        
