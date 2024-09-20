function ferntape(prgm){
    let reg = 0;
    let i = 0;
    let queue = [];
    let program = prgm.toLowerCase().split(" ");
    while (i <= program.length){
        let instruction = program[i];
        if (instruction == "]") {

            if ((queue[queue.length-1] || 0) == 0) {
                i++;
            } else {
                let depth = 1;
                while (depth > 0) {
                    i--;
                    if (program[i] === "]") {
                        depth++;
                    } else if (program[i] === "[") {
                        depth--;
                    }
                }
            }
        } else if (instruction == "[") {
            if ((queue[queue.length-1] || 0) == 0) {
                let depth = 1;
                while (depth > 0) {
                    i++;
                    if (program[i] === "[") {
                        depth++;
                    } else if (program[i] === "]") {
                        depth--;
                    }
                }
            } else {
                i++;
            }
        } else if (instruction == "inp"){
            var input = prompt("");
            var inputASSCI = input.split('');
            for (let h = 0; h < inputASSCI.length; h++) {
                 queue.splice(0, 0, inputASSCI[h].charCodeAt(0));
            }
            i++
          } else {
            switch(instruction) {
                case "del":
                    queue.splice(queue.length-1, 1);
                break;
                case "copy":
                    reg = queue[0];
                break;
                case "deci":
                    console.log(queue[0])
                break;
                case "asci":
                    console.log(String.fromCharCode(queue[0]));
                break;
                case "repl":
                    queue[queue.length-1] = reg;
                break;
                case "clr":
                    reg = 0;
                break;
                case "inc":
                    if (isNaN(Number(program[i+1])) || typeof program[i+1] === "undefined") {
                        reg += 1
                    } else {
                        reg += Number(program[i+1]);
                        i++
                    }
                break;
                case "dec":
                    if (isNaN(Number(program[i+1])) || typeof program[i+1] === "undefined") {
                        reg -= 1
                    } else {
                        reg -= Number(program[i+1]);
                        i++
                    }
                break;
                case "pop":
                    reg = queue[queue.length-1];
                    queue.splice(queue.length-1, 1);

                break;
                case "push":
                    queue.splice(0, 0, reg);
                    reg = 0;
                break;
                case "pull":
                    queue.splice(0, 0, queue[queue.length-1]);
                    queue.splice(queue.length-1, 1);
                break;
            }
            i++
        }
    }
}
