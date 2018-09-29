function dictionaryFromTxt(num){
    const fs=require('fs')
    let data=fs.readFileSync('data.js','utf8')
    data=data.replace(/"/gi,'')
    let dictionary=data.split(',')
    
    let colectedWords = []

    for(let i = 0; i < dictionary.length; i++){
        if(dictionary[i].length >= num){
            colectedWords.push(dictionary[i])
        }
    }
    return colectedWords
}

function playBoggle(num){
    let mainDictionary = dictionaryFromTxt(4)
    let board = boggleBoard(num)
    let dictionary = ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER']
    let firstWord = findFirstWord(board, mainDictionary)
    let result = []
    console.log(`From ${mainDictionary.length} words : `)
    // console.log(firstWord)
    console.log(board)

    for(let i = 0 ; i < firstWord.length; i++){
        let x = firstWord[i][0]
        let y = firstWord[i][1]
        let word = firstWord[i][2]
        // console.log(word)
        if(checkWord(x, y, word, board)){
            result.push(word)
        }

    }
    // console.log(result)
    if(result.length === 0){
        console.log('not found a word')
    }
    else{
        console.log(`${result.length} words found : , ${'\n'} ${result}`)
    }
    
}

function boggleBoard(num){
    let board = [
        ['D', 'G', 'H', 'I'],
        ['K', 'S', 'P', 'L'],
        ['Y', 'E', 'U', 'T'],
        ['E', 'Q', 'R', 'N']]

    let mainBoard = []

    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for(let i = 0; i < num; i++){
            let tmp = []
            for(let j = 0; j < num; j++){
                tmp.push(alphabet[Math.floor(Math.random() * alphabet.length)])
            }
            mainBoard.push(tmp)
        }

    return mainBoard
    // return board
}
function checkWord(x,y, word, board){
    // console.log(word)
    // console.log(x, y)
    // console.log(board)
    
    let makeDuplicate = []
    let duplicate = makeDuplicate
    let findWord = word[0] + ''

    for(let i = 0; i < board.length; i++){
        let tmp = []
        for(let j = 0; j < board[i].length; j++){
            tmp.push(board[i][j])
        }
        makeDuplicate.push(tmp)
    }
    // console.log(makeDuplicate)
    for(let i = 0; i < word.length; i++){
        if(y-1 >= 0 && duplicate[x][y-1] === word[i]){
            duplicate[x][y] = ' '
            y -= 1
            findWord += word[i]
        }
                    
        if (x-1 >= 0 && duplicate[x-1][y] === word[i]) {
              duplicate[x][y] = ' '
              x-=1
              findWord += word[i]
        }
        if (x-1 >= 0 && y-1 >= 0 && duplicate[x-1][y-1] === word[i]) {
              duplicate[x][y] = ' '
              x-=1
              y-=1
              findWord += word[i]
        }
        if (x-1 >= 0 && y+1 < duplicate.length && duplicate[x-1][y+1] === word[i]) {
              duplicate[x][y] = ' '
              x-=1
              y+=1
              findWord += word[i]
        }

        if (y+1 < duplicate.length && duplicate[x][y+1] === word[i]) {
              duplicate[x][y] = ' '
              y+=1
              findWord += word[i]
        }

        if (x+1 < duplicate.length && y+1 < duplicate.length && duplicate[x+1][y+1] === word[i]) {
              duplicate[x][y] = ' '
              x+=1
              y+=1
              findWord += word[i]
        }

        if (x+1 < duplicate.length && duplicate[x+1][y] === word[i]) {
              duplicate[x][y] = ' '
              x+=1
              findWord += word[i]
        }

        if (x+1 < duplicate.length && y-1 >= 0 && duplicate[x+1][y-1] === word[i]) {
              duplicate[x][y] = ' '
              x+=1
              y-=1
              findWord += word[i]
        }
        
    }
    if(word === findWord){
        return true
    }
    return false
}

function findFirstWord(board, dictionary){
    let foundFirstWord = []
    for(let i = 0 ;  i < board.length; i++){
        for(let a = 0; a < board[i].length; a++){
            for(let j = 0; j < dictionary.length; j++){
                if(board[i][a] === dictionary[j][0]){
                    foundFirstWord.push([i, a, dictionary[j]])
                }
            }
        }
    }
    // console.log(foundFirstWord)
    // console.log(dictionary)
    return foundFirstWord
}

const argv = process.argv.slice(2)
playBoggle(argv)
