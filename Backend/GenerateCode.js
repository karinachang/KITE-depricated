function generateCode(){
    let code = ' ';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let counter = 0;
    while (counter < 6){
        code += chars.charAt(Math.floor(Math.random() * chars.length));
        counter += 1;
    }
    return code;
}

function compareCode(newCode, otherCode){
    while(newCode == otherCode){
        newCode = generateCode();
    }
    return newCode;
}