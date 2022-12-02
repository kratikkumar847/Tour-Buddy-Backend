
 function postResponse(posts){
    postResponse = [];

    posts.forEach(post =>{
        postResponse.push({

            postID: post._id,
            creator : post.creator,
            description: post.description,
            destination: post.destination,
            noOfPeople: post.noOfPeople,
            member : post.member,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt

        })
    })
    return postResponse;
}

function postResponseByID ( post ){
    return {
        postID: post._id,
        creator : post.creator,
        description: post.description,
        destination: post.destination,
        noOfPeople: post.noOfPeople,
        member : post.member,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }
}

module.exports = { 
    postResponse ,  
    postResponseByID  
}