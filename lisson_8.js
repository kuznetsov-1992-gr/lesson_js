// Продумать, где можно применить замыкания для практикума из седьмого урока. 

// переменная счетчик


// a) if (!("a" in window)) {
//     var a = 1;
// }
// alert(a);   если а строка находиться в браузере тогда переменная а = 1 соответственно alert(a) = undefined

// b ) var b = function a(x) {
//     x && a(--x);
// };
// alert(a);   выведит сому функцию

//  с)  function a(x) {
//     return x * 2;
// }
// var a;
// alert(a);  = undefined

// d)  function b(x, y, a) {
//     arguments[2] = 10;
//     alert(a);          = 3
// }
// b(1, 2, 3);