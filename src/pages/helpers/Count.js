const count = (post) =>{

    let allCategorys

    post = post

    console.log(`log de post ${post}`)

    /* coloca o ID da categoria do post dentro de "postCategory" */
    let postCategory = post.categoryId

    console.log(postCategory)

    /* allCategorys recebe todos os Ids de categorias de todos os posts */
    allCategorys.append(postCategory)

    /* retorna allCategorys */
    return allCategorys
    
}

export default count