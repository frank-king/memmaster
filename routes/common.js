
exports.parse_word_entry = function(word) {
    word.example = word.example.split(/\n/).map(example => {
        var obj = example.split(/\/r\/n/);
        return {
            sentence: obj[0],
            explanation: obj[1],
        };
    });
    word.meaning = word.meaning.split(/<br>\n/);
    return word;
}