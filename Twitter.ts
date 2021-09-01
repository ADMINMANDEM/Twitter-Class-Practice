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
    replies: Reply[];
    
    constructor(content: string, user: User) {
        this.id = Date.now.toString();
        this.content = content;
        this.time = new Date().toLocaleString();
        this.user = user;
        this.replies = []
    }

    // getReplies(): string[] {
    //     return this.replies
    // }

    replyToTweet(reply: Reply) {
        this.replies.push(reply)
    }
    
}

interface Reply {
    user: User;
    text: string;
}

class ImageTweet extends Tweet {
    link: string;
    constructor(content: string, user: User, link: string) {
        super(content, user);
        this.link = link;
    }
}

class MediaTweet extends Tweet {
    type: string;
    file: FileType;
    link: string;
    constructor(content: string, user: User, type: string, file: FileType, link: string) {
        super(content, user);
        this.link = link;
        this.file = file;
        this.type = type;
    }
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
const mediaTweet = new MediaTweet("Media", account, "video", FileType.Video, "123.com/ex.mp4")
const imageTweet = new ImageTweet("My holiday", account, "myphotos.com/plane.jpg")
account2.createTweet(tweet1)
account.createTweet(mediaTweet)
account.createTweet(imageTweet)
mediaTweet.replyToTweet({user: account2, text: "123"})
console.log(account.getTweets())
console.log(account.getTweets()[0].replies)
console.log(account2.getTweets())
console.log(account.checkPassword("notpassword"))
console.log(account.checkPassword("password123"))
