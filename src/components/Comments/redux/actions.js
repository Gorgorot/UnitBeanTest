var AddComment = newComment=>{
    return {
        type: 'ADD_COMMENT',
        ...newComment
    }
}

export default { AddComment };