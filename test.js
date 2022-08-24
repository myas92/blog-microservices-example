let x = {
    a: "a",
    b: "b"
}

let y = Object.assign({},x)

y.a = "kkkkk";

console.log(x)