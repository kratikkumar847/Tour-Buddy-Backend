
 function postResponse(posts){
    postResponse = [];

    posts.forEach(post =>{
        postResponse.push({

            postID : post._id,
            creator : post.creator,
            description: post.description,
            destination: post.destination,
            noOfPeople: post.noOfPeople,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt

        })
    })
    return postResponse;
}

module.exports = { 
    postResponse ,    
}