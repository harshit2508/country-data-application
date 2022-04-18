function getOffset(currentPage =1, listPerPage){
    return (currentPage - 1) * [listPerPage]
}

function emptyOrRows(rows){
    if(!rows){
        return [];
    }else{
        return rows;
    }
}

module.exports ={
    getOffset, emptyOrRows
}