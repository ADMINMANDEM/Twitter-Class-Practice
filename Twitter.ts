// https://edabit.com/challenge/Nc75jSjR5nuBfx7TK

enum FileType {
    Video,
    Image,
    Other
}
class Tweet {
    id: string;
    content: string;
    time: string;
    user: User;
    constructor(content:string, user: User) {
        this.id = Date.now.toString();
        this.content = content;
        this.time = new Date().toLocaleString();
        this.user = user
    }
}

class ImageTweet extends Tweet {
    link: string;
}

class MediaTweet extends Tweet {
    type: string;
    file: FileType;
    link: string;
}

class User {
    user: string;
    #password: string;
    #tweets: Tweet[]
    constructor(user: string, pass: string) {
        this.user = user
        this.#password = this.encryptPass(pass)
        this.#tweets = []
    }
    encryptPass(str: string): string {
        var hash = 0, i, chr;
        if (str.length === 0) return hash.toString();
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash.toString();
    }
    checkPassword(input: string): boolean {
        return this.encryptPass(input) == this.#password
    }

    createTweet(newTweet: Tweet): void {
        this.#tweets.push(newTweet)
    }

    getTweets(): Tweet[] {
        return this.#tweets
    }
}


const account = new User("Silas", "password123")
const account2 = new User("Joseph", "123")
const tweet1 = new Tweet("Try Goodtill!", account)
account.createTweet(tweet1)
console.log(account.getTweets())
console.log(account.checkPassword("notpassword"))
console.log(account.checkPassword("password123"))

