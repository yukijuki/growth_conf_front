
function like_post_api(uuid, comment_id) {
    const url = "https://growthqa.du.r.appspot.com/like_post";
    
    var data = {
        "user_id": uuid,
        "comment_id": comment_id
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                return Promise.resolve(response.json());
            }
        });
}

function likePost(response, comment_id){

    var judge;
    var num_space = "like-num-div2"+comment_id
    var html_num = document.getElementById(num_space).innerHTML;
    var class_like = "btn-like btn btn-group-lg bg-orange btn-block text-white rounded-pill py-1 mt-0"
    
    
    var num = html_num.slice(89)
    console.log("num", num)
    var add_num;

    if (response["action"] == "delete"){
        add_num = Number(num) - 1
    } else {
        add_num = Number(num) + 1
    }

    if(response["action"] == "delete") {
        judge = "Like"
    } else {
        judge = "Unlike"
        class_like = "btn-unlike btn-like btn btn-group-lg bg-orange btn-block text-white rounded-pill py-1 mt-0";
    }

    //ライクの数値を変更
    var target = document.getElementById(num_space);
    target.innerHTML = html_num.slice(0,89) + add_num;

    //ライクの文字を変更
    var like_text = "like-button"+comment_id;
    var like = document.getElementById(like_text);
    like.className = class_like;
    like.id = "like-button"+comment_id;
    like.innerHTML = judge;

}

async function like_post_func(id) {

    login_verification();

    var comment_id = id.slice(11);
    console.log("comment_id for like", comment_id);

    var uuid = localStorage.getItem('uuid')

    const response = await like_post_api(uuid, comment_id)
    console.log("APIresponse", response);
    //location.reload();
    likePost(response, comment_id);
}