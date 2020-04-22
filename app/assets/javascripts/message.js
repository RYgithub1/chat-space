$(function () {
  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="listx">
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
                  </div>`;
      return html;
    } else {
      var html = `<div class="listx">
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
        // TODO: formタグ全体を指定で.reset通った！テキストではresetだが、val()でも可能ゆえ残置
        $("form")[0].reset();
        $(".submit-btn").prop("disabled", false);
      })
      .fail(function () {
        window.alert("メッセージ送信失敗");
      });
  });
});
