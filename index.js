"Welcome to javascript projects";

function fabnociseries(n) {
  if ((n = 1)) return [0, 1];

  var s = fabnociseries(n - 1);

  s.push(s[s.length - 1] + s[s.length - 2]);

  return s;
}

console.log(fabnociseries(8));
