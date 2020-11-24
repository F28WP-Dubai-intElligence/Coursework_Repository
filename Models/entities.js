class User {
    constructor(id, name, email) {
        this.id = id;
        this.pseudoname = name;
        this.email = email;
    }
}

class Session {
    constructor(id, date) {
        this.id = id;
        this.startDate = date;
    }
}

class Participant {
    constructor(sid, uid, date, score) {
        this.sessionId = sid;
        this.userId = uid;
        this.startDate = date;
        this.endDate = date;
        this.score = score;
    }
}

class Score {
    constructor(username, score) {
        this.username = username;
        this.score = score;
    }
}

module.exports = {
    User,
    Session,
    Participant,
    Score
}