var leet = {
    a: '@'
    , b: '8'
    , c: '('
    , d: '|)'
    , e: '3'
    , f: '|='
    , g: '6'
    , h: '#'
    , i: '!'
    , j: ']'
    , k: '|{'
    , l: '1'
    , m: 'em'
    , n: '[\]'
    , o: '0'
    , p: '|*'
    , q: '0,'
    , r: '|2'
    , s: '$'
    , t: '7'
    , u: '(_)'
    , v: '\/'
    , w: 'vv'
    , x: '%'
    , y: '`/'
    , z: '2'
}

let desc = "bartłomiej osadnik" 
desc = desc.split("").map(c=>leet[c]||c).join("");
console.log(desc);