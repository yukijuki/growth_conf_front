
function comments_post_api(post_id, text, name) {
    const url = "https://growthqa.du.r.appspot.com/comments_post";
    
    var data = {
        "post_id": post_id,
        "text": text,
        "name": name
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

function createComment(response){

    var comment_a = document.createElement("div");
    comment_a.className = "card mx-auto bg-white p-2";
    comment_a.id = response["comment_id"];
    document.getElementById("comment-card").appendChild(comment_a);

    var div = document.createElement("div");
    div.className = "card-body px-1 pb-0";
    div.id = "comment-card-body"+response["comment_id"];
    document.getElementById(response["comment_id"]).appendChild(div);


    var comment_h5 = document.createElement("h5");
    comment_h5.className = "card-title px-4 text-dark";
    comment_h5.id = "comment-card-title"+response["comment_id"];
    document.getElementById("comment-card-body" + response["comment_id"]).appendChild(comment_h5);

    var comment_h5title = document.createTextNode(response["name"]);
    document.getElementById("comment-card-title"+response["comment_id"]).appendChild(comment_h5title);


    var comment_p = document.createElement("p");
    comment_p.className = "card-text px-4 text-dark";
    comment_p.id = "comment-card-text"+response["comment_id"];
    document.getElementById("comment-card-body"+response["comment_id"]).appendChild(comment_p);

    var comment_ptext = document.createTextNode(response["text"]);
    document.getElementById("comment-card-text"+response["comment_id"]).appendChild(comment_ptext);


    var comment_div = document.createElement("div");
    comment_div.className = "like-button-area";
    comment_div.id = "like-button-area"+response["comment_id"];
    document.getElementById(response["comment_id"]).appendChild(comment_div);

    var like_button = document.createElement("button");
    like_button.className = "btn-like btn btn-group-lg bg-orange btn-block text-white rounded-pill py-1 mt-0 mr-3 float-right";
    like_button.id = "like-button"+response["comment_id"];
    document.getElementById("like-button-area"+response["comment_id"]).appendChild(like_button);

    var like_buttontext = document.createTextNode("Like");
    document.getElementById("like-button"+response["comment_id"]).appendChild(like_buttontext);

    //タイトル・コメントカードのコメント数の変更
    var comment_num = document.getElementById("top-card-title_text").innerHTML;
    console.log("comment_num", comment_num)
    var new_comment_num = Number(comment_num) + 1
    var target = document.getElementById("top-card-title_text")
    target.innerHTML = new_comment_num;
}

async function comments_post_func() {

    /// Get parameter for category    
    var params = {};
    var query = window.location.href.split("?")[1];
    if(query) {
        var rawParams = query.split('&');
        rawParams.forEach(function(prm,i){
            var kv = prm.split('=');
            params[kv[0]] = kv[1];
        });
    }

    const post_id = params['post_id'];
    console.log("post_id", post_id);

    var name = document.getElementById("nickname").value;
    var text = document.getElementById("commenttext").value;

    if (!name) {
        name = "匿名"
    }

    console.log(post_id, text, name);

    const response = await comments_post_api(post_id, text, name);
    console.log("APIresponse", response);

    createComment(response);
}