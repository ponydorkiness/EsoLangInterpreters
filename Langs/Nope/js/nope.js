function nope(inputPrgm){
    // Initialize Variables
    let memorysize = 3000
    let memory = new Array(3000).fill(0);
    inputPrgm = inputPrgm.toLowerCase();
    let words = inputPrgm.split(/[ \n/\\]+/);
    
    let i = 0;
    while (i < words.length) {
        switch(words[i]) {
            case "no_op":
                Function.prototype(); 
            break;
            case "store":
                memory[words[i+1]] = +words[i+2];
                i += 2
            break;
            case "jl":
                if(memory[words[i+1]] <= 0){
                    i = words.indexOf(":" + words[i+2]);
                } else {
                    i += 2
                }
            break;
            case "peek":
                console.log(memory[words[i+1]]);
                i += 1
            break;
            case "no:op_add":
                Function.prototype(); 
                memory[words[i+3]] = memory[words[i+1]] + memory[words[i+2]];
                i += 3
            break;
        }
        i++
    }
}