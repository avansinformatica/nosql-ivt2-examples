
function createUser(session, user) {
    let queries = []

    // if there are no hobbies we should still add the user alone
    if (user.hobbies.length === 0) {
        queries.push(
            session.run('MERGE (p: Person {name: $name}) ' +
                        'RETURN p',
                        {
                            name: user.name
                        }
            )
        );
    }

    for (let hobby of user.hobbies) {
        queries.push(
            // use separate merges! 
            // a merge tries to match only a full pattern
            // so Person and Hobby would be duplicated otherwise
            session.run('MERGE (p:Person {name: $name}) ' + 
                        'MERGE (h:Hobby {title: $title}) ' +
                        'MERGE (p)-[:HasHobby]->(h) ' + 
                        'RETURN p', 
                        {
                            name: user.name,
                            title: hobby
                        }
                    )
        );
    }

    return Promise.all(queries);
}


function retrieveLikes(session, userName) {
    return session.run(
        'MATCH (p: Person)-[:Likes]->(other: Person) ' + 
        'WHERE p.name = $name ' +
        'RETURN other.name',
        {
            name: userName
        }
    );
}


function addLike(session, userName, otherName) {
    return session.run(
        'MATCH (p: Person {name: $name}), (o:Person {name: $other}) ' + 
        'MERGE (p)-[r:Likes]->(o) ' +
        'RETURN p, r, o',
        {
            name: userName,
            other: otherName
        }
    );
}


function retrieveSuggestions(session, userName) {
    return session.run(
        'MATCH (p: Person {name: $name})-[:HasHobby]->(h: Hobby), ' +
        '(o: Person)-[:HasHobby]->(h)' + 
        'RETURN o.name',
        {
            name: userName
        }
    );
}


module.exports = {
    createUser: createUser,
    retrieveLikes: retrieveLikes,
    addLike: addLike,
    retrieveSuggestions: retrieveSuggestions,
}