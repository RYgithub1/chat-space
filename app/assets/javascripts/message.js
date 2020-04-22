$(function () {
  var reloadMessages = function () {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $(".message:last").data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: "get",
      dataType: "json",
      //dataオプションでリクエストに値を含める
      data: { id: last_message_id },
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          //追加するHTMLの入れ物を作る
          var insertHTML = "";
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message);
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $(".messages").append(insertHTML);
          $(".main-chat__message-list").animate({
            scrollTop: $(".main-chat__message-list")[0].scrollHeight,
          });
        }
      })
      .fail(function () {
        alert("errorーーーーーー");
      });
  };

  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="listx" >
                      <div class="list-upper">
                        <div class="list-upper__user-name">
                          ${message.user_name}
                        </div>
                        <div class="list-upper__date">
                          ${message.created_at}
                        </div>
                        </div>
                        <div class="messagex">
                          <p class="messagex__content">
                            ${message.content}
                          </p>
                      </div>
                      <img src=${message.image} >
                    </div>
                  </div>`;
      return html;
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="listx">
                      <div class="list-upper">
                        <div class="list-upper__user-name">
                          ${message.user_name}
                        </div>
                        <div class="list-upper__date">
                          ${message.created_at}
                        </div>
                        </div>
                        <div class="messagex">
                          <p class="messagex__content">
                            ${message.content}
                          </p>
                      </div>
                    </div>
                  </div>`;
      return html;
    }
  }

  $("#new_message").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })
      .done(function (data) {
        var html = buildHTML(data);
        $(".messages").append(html);
        $(".main-chat__message-list").animate({
          scrollTop: $(".main-chat__message-list")[0].scrollHeight,
        });
        // $("#message_content").val("");
        // $("#imageのセレクタ").val("");
        // formタグ全体を指定で.reset通った！テキストではresetだが、val()でも可能ゆえ残置
        $("form")[0].reset();
        $(".submit-btn").prop("disabled", false);
      })
      .fail(function () {
        window.alert("メッセージ送信失敗");
      });
  });

  //$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
  // 「グループのメッセージ一覧ページ」を表示している時だけ自動更新
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
