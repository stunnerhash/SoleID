let str = 'ab';
const s = str.split('').sort();
let ans = '';
for (let i = 0; i< s.length-1;i++){

    if(s[i] != s[i+1]) ans+= s[i];
    
}

console.log(ans);
