
export function getFirstWords(paragraph:string) : string[]{

    let sentences:string[] = paragraph.split('\n');
    let words:string[] = [];

    for(let sentence of sentences) {
        if(sentence.trim().length > 0)
            words.push(sentence.trim().split(' ')[0]);
    }

    return words;
}