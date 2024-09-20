function aark(inputPrgm){
    // Initialize Variables
    let memorysize = 3000
    let memory = new Array(3000).fill(0);
    let words = inputPrgm.split(/[ \n/\\]+/);
    let memorypointer = 0
    let bm = 0
    let i = 0;
    let instructions = "fnr,bne,peek,poke,ret".split(',')
    while (i < words.length) {
        switch(words[i].toLowerCase()) {
            case "fnr":
                if(memory[memorypointer] == words[i+1]){
                    memory[memorypointer] = ""
                    let wordsearch = i+2
                    while(!instructions.includes(words[wordsearch])){
                        if(words[wordsearch].startsWith(':')) break
                        memory[memorypointer] += words[wordsearch] + " "
                        wordsearch++
                    }
                    memory[memorypointer] = memory[memorypointer].replace(/\s+$/, '');
                }
            break;
            case "bne":
                bm = i
                if(memory[memorypointer] != words[i+1]){
                    i = words.indexOf(":" + words[i+2]);
                } else {
                    i += 2
                }
            break;
            case "peek":
                console.log(memory[memorypointer]);
            break;
            case "poke":
                memorypointer = words[i+1]
                i += 1
            break;
            case "ret":
                i = bm
            break;
            case "inp":
                memory[memorypointer] = prompt("")
            break;
        }
        i++
    }
}