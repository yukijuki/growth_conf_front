
function comments_get_api(post_id, uuid) {
    var url = "https://growthqa.du.r.appspot.com/comments_get?post_id="+post_id+"&user_id="+uuid

    return fetch(url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json"
        }
      })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                return Promise.resolve(response.json());
            }
        });
}

function createComments(response){
    var judge;

    var comment_a = document.createElement("div");
    comment_a.className = "card mx-auto bg-white px-2 pb-2 pt-1";
    comment_a.id = response["comment_id"];
    document.getElementById("comment").appendChild(comment_a);

    var div = document.createElement("div");
    div.className = "card-body px-1 pb-3";
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


    //like container
    var like_container_div = document.createElement("div");
    like_container_div.className = "like-container";
    like_container_div.id = "like-container"+response["comment_id"];
    document.getElementById(response["comment_id"]).appendChild(like_container_div);

    if(response["judge"] == true) {
        judge = "Unlike"
        button_class = "btn-like btn-unlike btn btn-group-lg bg-orange btn-block text-white rounded-pill py-1 mt-0";
    } else {
        judge = "Like"
        button_class = "btn-like btn btn-group-lg bg-orange btn-block text-white rounded-pill py-1 mt-0";
    }


    //SNS button div
    var sns_button_div = document.createElement("div");
    sns_button_div.className = "like-button float-right mr-2";
    sns_button_div.id = "sns-area"+response["comment_id"];
    document.getElementById("like-container" + response["comment_id"]).appendChild(sns_button_div);

    //SNS button div button
    if(response["sns"] == undefined) {
        sns = "#";
        snsClass = "btn-sns btn-sns-none btn btn-group-lg bg-growth btn-block text-white rounded-pill py-1 mt-0 mr-3";
        var SNS_button = document.createElement("p");
    } else if(response["sns"] == "匿名") {
        sns = "#";
        snsClass = "btn-sns btn-sns-none btn btn-group-lg bg-growth btn-block text-white rounded-pill py-1 mt-0 mr-3";
        var SNS_button = document.createElement("p");
    } else {
        sns = response["sns"];
        snsClass = "btn-sns btn btn-group-lg bg-growth btn-block text-white rounded-pill py-1 mt-0 mr-3";
        var SNS_button = document.createElement("a");
    }
    SNS_button.className = snsClass;
    SNS_button.id = "sns-button"+response["comment_id"];
    SNS_button.target = "_blank";
    SNS_button.rel = "noopener noreferrer";
    SNS_button.href = sns; //response["sns"]
    document.getElementById("sns-area"+response["comment_id"]).appendChild(SNS_button);

    var sns = document.createTextNode("Contact"); //like num add here
    document.getElementById("sns-button"+response["comment_id"]).appendChild(sns);

    //like button div
    var lke_button_div = document.createElement("div");
    lke_button_div.className = "like-button float-right mr-2";
    lke_button_div.id = "like-button-area"+response["comment_id"];
    document.getElementById("like-container" + response["comment_id"]).appendChild(lke_button_div);

    //like button div button
    var like_button = document.createElement("button");
    like_button.className = button_class;
    like_button.id = "like-button"+response["comment_id"];
    like_button.setAttribute("onclick", "like_post_func(this.id);");
    document.getElementById("like-button-area"+response["comment_id"]).appendChild(like_button);

    var like_buttontext = document.createTextNode(judge); //like num add here
    document.getElementById("like-button"+response["comment_id"]).appendChild(like_buttontext);


    //like number div
    var like_num_div = document.createElement("div");
    like_num_div.className = "like-count float-right";
    like_num_div.id = "like-num-div"+response["comment_id"];
    document.getElementById("like-container"+response["comment_id"]).appendChild(like_num_div);

    //like number div div
    var like_num_div2 = document.createElement("div");
    like_num_div2.className = "text-orange";
    like_num_div2.id = "like-num-div2"+response["comment_id"];
    document.getElementById("like-num-div"+response["comment_id"]).appendChild(like_num_div2);

    //like number div div
    var like_num_i = document.createElement("i");
    like_num_i.className = "fas fa-thumbs-up pr-1";
    like_num_i.id = "like-num-i"+response["comment_id"];
    document.getElementById("like-num-div2"+response["comment_id"]).appendChild(like_num_i);

    if(response["like"] == undefined){
        response["like"] = 0
    }

    var like_num_ptext = document.createTextNode(response["like"]);
    document.getElementById("like-num-div2"+response["comment_id"]).appendChild(like_num_ptext);
}

async function comments_get_func() {

    login_verification();

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

    var uuid = localStorage.getItem('uuid')

    const response = await comments_get_api(post_id, uuid);
    console.log("APIresponse", response);

    var title = document.createTextNode(response[0]["title"]);
    document.getElementById("comment-text").appendChild(title);

    var text = document.createTextNode(response[0]["text"]);
    document.getElementById("comment-p").appendChild(text);

    //タイトル・コメントカードのコメント数の変更
    var comment_h5 = document.createElement("h5");
    comment_h5.className = "d-inline-block my-auto pl-2 text-orange";
    comment_h5.id = "top-card-title_text";
    document.getElementById("top-card-title").appendChild(comment_h5);

    var text = document.createTextNode(response[0]["comments_num"]);
    document.getElementById("top-card-title_text").appendChild(text);

    for (var i = 1; i < response.length; i++) {
        createComments(response[i]);
    }
}

window.onload = comments_get_func;