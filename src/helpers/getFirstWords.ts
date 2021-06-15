
export function getFirstWords(paragraph:string) : string[]{

    let sentences:string[] = paragraph.split('\n');
    let words:string[] = [];

    for(let sentence of sentences) {
        if(sentence.trim().length > 0){
            let firstWord = sentence.trim().split(' ')[0];
            // Check if constraints
            if(firstWord !== firstWord.toUpperCase()) {
                words.push(sentence.trim().split(' ')[0]);
            }

        }
    }

    return words;
}