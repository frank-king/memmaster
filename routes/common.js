
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

exports.parse_word_list_entry = function(word) {
    word = exports.parse_word_entry(word);
    return [
        word.id,
        word.word,
        word.meaning === undefined ? "" : word.meaning.join('<br/>'),
        word.example === undefined ? ""
            : word.example.map(function (item) {
                return (item.sentence === undefined ? "" : item.sentence) + '<br/>' +
                    (item.explanation === undefined ? "" : item.explanation);
            }).join('<br/>'),
    ];
}

exports.encode_word_entry = function(word) {
    word.meaning.replace(/\n/g, "<br>\n");
    word.example = word.example.split(/\n/)
        .reduce((examples, example, index, array) => {
            if (index % 2 == 0) {
                return examples + example + "/r/n";
            } else {
                return examples + example + "\n";
            }
        }, "").replace(/^\s*$(?:\r\n?|\n)|^\n+|\n+$/gm, '');
    return word;
}