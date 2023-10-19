
let compress = function(string) {
    let dictionary = []
    let offset = 0
    let endIndex = 0
    let result = '';
    let dict2={}
    dictionary.push('\0');

    while (true) {
        let  currCode = ""
        let index = -1;

        for(let i = offset; i <= endIndex && i<string.length; i++) {
            currCode += string.charAt(i);
            if(dictionary.indexOf(currCode) !== -1 ) {
                endIndex++;
            }

        }
        dict2=createDict(dictionary)
        index = dictionary.indexOf(currCode);

        if(index === -1) {
            dictionary.push(currCode);

            if(currCode.length === 1) {
                result+=(`${getInsuffLen(dictionary.length,'0')}` + [currCode.slice(-1)]);
            } else {
                result+=(`${getInsuffLen(dictionary.length, dict2[currCode.slice(0, currCode.length-1)])}` + [currCode.slice(-1)]);
            }
        }else{
            result+=(`${getInsuffLen(dictionary.length,dict2[currCode])}`);
        }

        offset = ++endIndex;

        if(endIndex >= string.length) break;
    }

    console.log(dict2)
    console.log(result.slice(1))

    return result.slice(1);
}


function createDict(dictionary){
    let resDict={}
    for(let i= 0; i<dictionary.length;i++){
        if(dictionary[i]=== '\x00')
            resDict['']=i.toString(2)
        else
            resDict[dictionary[i]]=i.toString(2)
    }
    return resDict
}

let decompress = function(input) {
    input=getInputArray(input)
    let result = ""
    let dictionary = [];

    dictionary.push('\0');
    for(let entry in input) {
        let entryArray = input[entry].split(', ')
        let buffer = "";

        if(entryArray[0] !== 0) {
            buffer += dictionary[entryArray[0]] + entryArray[1];
            dictionary.push(buffer);
        }  else {
            dictionary.push(entryArray[0]);
            buffer += entryArray[0]
        }

        result += buffer;
    }
    return result;
}

function getInsuffLen(dictLen, code){
    if(dictLen<=2)
        return code
    let supposedLen=Math.ceil(Math.log2(dictLen-1))
    return "0".repeat(supposedLen-code.length) + `${code}`
}
///if input doesn't contain 0 and 1

// function getInputArray(input){
//     let resArr=[]
//     resArr.push('0, '+input[0])
//     input=input.slice(1)
//     let number=''
//     while (input!==''){
//         if (input[0]==='1' ||input[0]==='0')
//             number+=input[0]
//         else {
//             resArr.push(parseInt(number,2)+', '+input[0])
//             number=''
//         }
//         input=input.slice(1)
//     }
//     if (number!=="")
//         resArr.push(parseInt(number,2)+', \0')
//     console.log(resArr)
//     return resArr;
// }
function getInputArray(input){
    let resArr=[]
    resArr.push('0, '+input[0])
    input=input.slice(1)
    let number=''
    while (input!==''){
        let len=getCurrLen(resArr.length+1)
        while(len!==0){
            number+=input[0]
            len--
            input=input.slice(1)
        }
        if(input!==''){
            resArr.push(parseInt(number,2)+', '+input[0])
            number=''
        }


        input=input.slice(1)
    }
    if (number!=="")
        resArr.push(parseInt(number,2)+', \0')
    console.log("here ",resArr)
    return resArr;
}
function getCurrLen(dictLen){
    if(dictLen<=2)
        return 1
    return Math.ceil(Math.log2(dictLen))
}

// console.log(decompress(compress('101100101100001110001001001'))); //AABABCBBCBCDABD
console.log(decompress("010001111100100110110111")); //AABABCBBCBCDABD
console.log(getCurrLen(9))


